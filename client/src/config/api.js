import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors globally 
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // You can handle 401 errors here (e.g., redirect to login)
        if (error.response && error.response.status === 401) {
            // Optional: Logout user if token is invalid
            // localStorage.removeItem('adminToken');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
