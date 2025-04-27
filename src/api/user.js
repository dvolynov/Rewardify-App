import { apiClient } from './auth';
import Cookies from 'js-cookie';

export const fetchUserData = async () => {
    const response = await apiClient.get('/user/');
    return response.data;
};

export const deleteUser = async () => {
    await apiClient.delete('/user/delete');
    Cookies.remove('auth_token');
    Cookies.remove('user_data');
};

export const updateUser = async (payload) => {
    const response = await apiClient.patch('/user/update', payload);
    const { name, email, country } = response.data;
    const updatedData = { name, email, country };
    Cookies.set('user_data', JSON.stringify(updatedData), { expires: 7 });
    return updatedData;
};