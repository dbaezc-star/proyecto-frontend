import axios from 'axios';

// URL del backend. En Vercel se configura la variable VITE_API_URL
// (ej. https://donavida-backend.onrender.com/api). En local usa localhost.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const client = axios.create({
    baseURL: API_URL,
    // Render (plan gratis) puede tardar ~1 min en "despertar"
    timeout: 90000,
});

// Agrega el token a cada petición automáticamente
client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Si el token expiró o es inválido, cerrar sesión y volver al login
client.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthCall = error.config?.url?.startsWith('/auth/');
        if (error.response?.status === 401 && !isAuthCall) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.assign('/login');
        }
        return Promise.reject(error);
    }
);

/** Mensaje legible a partir de un error de axios. */
export const getErrorMessage = (error, fallback = 'Ocurrió un error') => {
    if (error.code === 'ECONNABORTED' || !error.response) {
        return 'No se pudo conectar con el servidor. Intenta de nuevo en un momento.';
    }
    return error.response.data?.message || fallback;
};

export default client;
