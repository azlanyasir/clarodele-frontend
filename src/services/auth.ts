import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    async signup(userData: {
        email: string;
        password: string;
        full_name: string;
        user_type?: 'free' | 'premium';
    }) {
        const response = await api.post('/signup', userData);
        return response.data;
    },

    async login(email: string, password: string) {
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        
        const response = await api.post('/token', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
        }
        
        return response.data;
    },

    async getCurrentUser() {
        const response = await api.get('/users/me');
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
    },
};