import client from './client';

export const login = async (email, password) => {
    const response = await client.post('/auth/login', { email, password });
    return response.data;
};

export const register = async (userData) => {
    const response = await client.post('/auth/register', userData);
    return response.data;
};
