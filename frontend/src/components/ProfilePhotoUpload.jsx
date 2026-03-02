import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { HiCamera, HiTrash, HiUpload, HiX } from 'react-icons/hi';

/**
 * Profile photo upload component — LinkedIn-style circular avatar
 * with drag-and-drop, preview, crop, and remove support.
 */
export default function ProfilePhotoUpload() {
    const { user, setUser } = useAuth();
    const fileRef = useRef(null);
    const canvasRef = useRef(null);

    const [preview, setPreview] = useState(null);     // base64 preview
    const [rawFile, setRawFile] = useState(null);      // original File
    const [uploading, setUploading] = useState(false);
    const [dragging, setDragging] = useState(false);

    /* ---- Pick / validate file ---- */
    const processFile = (file) => {
        if (!file) return;
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            toast.error('Only JPG, PNG and WEBP images are allowed');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be under 5 MB');
            return;
        }
        setRawFile(file);

        // Read and create square crop preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                const size = Math.min(img.width, img.height);
                const sx = (img.width - size) / 2;
                const sy = (img.height - size) / 2;
                canvas.width = 400;
                canvas.height = 400;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, sx, sy, size, size, 0, 0, 400, 400);
                setPreview(canvas.toDataURL('image/jpeg', 0.9));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    /* ---- Drag & drop handlers ---- */
    const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
    const onDragLeave = () => setDragging(false);
    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        processFile(e.dataTransfer.files[0]);
    };

    /* ---- Upload to server ---- */
    const handleUpload = async () => {
        if (!rawFile) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('profileImage', rawFile);
            const { data } = await API.post('/api/users/profile-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUser((prev) => ({ ...prev, profileImage: data.profileImage }));
            toast.success('Profile photo updated!');
            setPreview(null);
            setRawFile(null);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    /* ---- Remove photo ---- */
    const handleRemove = async () => {
        if (!user?.profileImage) return;
        setUploading(true);
        try {
            await API.delete('/api/users/profile-image');
            setUser((prev) => ({ ...prev, profileImage: '' }));
            toast.success('Photo removed');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Remove failed');
        } finally {
            setUploading(false);
        }
    };

    const cancelPreview = () => { setPreview(null); setRawFile(null); };

    const currentImage = preview || user?.profileImage;

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Hidden canvas for cropping */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Avatar */}
            <div
                className={`relative group cursor-pointer rounded-full transition-all duration-300 ${dragging ? 'ring-4 ring-primary-400 ring-offset-2 dark:ring-offset-surface-900 scale-105' : ''
                    }`}
                onClick={() => fileRef.current?.click()}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                {/* Image / placeholder */}
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-500/20 dark:to-primary-700/20 border-4 border-white dark:border-surface-700 shadow-lg">
                    {currentImage ? (
                        <img
                            src={currentImage}
                            alt="Profile"
                            className="w-full h-full object-cover transition-opacity duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-4xl select-none">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Camera overlay */}
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <HiCamera className="text-white" size={28} />
                </div>

                {/* Uploading spinner */}
                {uploading && (
                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                        <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* Hidden file input */}
            <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => processFile(e.target.files[0])}
            />

            {/* Action buttons */}
            {preview ? (
                <div className="flex items-center gap-2 animate-fadeIn">
                    <button onClick={handleUpload} disabled={uploading}
                        className="btn-primary py-2 px-4 text-sm">
                        <HiUpload size={16} /> {uploading ? 'Uploading...' : 'Save Photo'}
                    </button>
                    <button onClick={cancelPreview}
                        className="btn-secondary py-2 px-4 text-sm">
                        <HiX size={16} /> Cancel
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <button onClick={() => fileRef.current?.click()}
                        className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center gap-1">
                        <HiCamera size={16} /> {user?.profileImage ? 'Change Photo' : 'Add Photo'}
                    </button>
                    {user?.profileImage && (
                        <button onClick={handleRemove} disabled={uploading}
                            className="text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center gap-1">
                            <HiTrash size={14} /> Remove
                        </button>
                    )}
                </div>
            )}

            {/* Drag-and-drop hint */}
            <p className="text-xs text-surface-400 dark:text-surface-500 text-center">
                Drag & drop or click to upload · JPG, PNG, WEBP · Max 5 MB
            </p>
        </div>
    );
}
