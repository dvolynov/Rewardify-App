import axios from 'axios';
import Cookies from 'js-cookie';


const API_BASE = process.env.REACT_APP_API_BASE;;


export const authenticate = async (formType, formData) => {
    const endpoint = formType === 'login' ? 'login' : 'register';
    const response = await axios.post(`${API_BASE}/auth/${endpoint}`, formData);
    return response.data;
};

export const apiClient = axios.create({
    baseURL: API_BASE,
});

apiClient.interceptors.request.use((config) => {
    const token = Cookies.get('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});