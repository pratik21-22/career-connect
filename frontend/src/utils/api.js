import axios from 'axios';

/**
 * Pre-configured Axios instance.
 * In development, Vite's proxy forwards /api to the backend.
 * In production, set VITE_API_URL to the deployed backend URL.
 */
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '',
});

// Attach JWT token to every request if it exists
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
