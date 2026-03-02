/**
 * Full-screen loader — modern pulsing dots animation.
 */
export default function Loader() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2">
                    <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-3 h-3 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-3 h-3 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <p className="text-surface-400 dark:text-surface-500 text-sm font-medium">Loading...</p>
            </div>
        </div>
    );
}
