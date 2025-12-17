import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    // Use environment variable or fallback to localhost
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
