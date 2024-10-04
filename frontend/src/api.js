import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust based on your server URL

export const registerUser = async (username, password) => {
    return await axios.post(`${API_URL}/auth/register`, { username, password });
};

export const loginUser = async (username, password) => {
    return await axios.post(`${API_URL}/auth/login`, { username, password });
};

export const createTask = async (token, title) => {
    return await axios.post(`${API_URL}/tasks`, { title }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getTasks = async (token) => {
    return await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateTask = async (token, id, data) => {
    return await axios.put(`${API_URL}/tasks/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteTask = async (token, id) => {
    return await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
