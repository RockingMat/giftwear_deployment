import { emailApi } from './api';

export const saveEmail = async (email: string) => {
    try {
        const response = await emailApi.post('/add', { email });
        return response.data;
    } catch (error) {
        console.error('Error saving email:', error);
        throw error;
    }
};
