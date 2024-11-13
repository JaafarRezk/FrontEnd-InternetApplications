import axios from 'axios';

export const registerUser = async (userData) => {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/register', userData);
    return response.data;
};
