import axios from 'axios';

const API_URL = "http://localhost:5000/api";

export const uploadReceipt = (formData) => axios.post(`${API_URL}/upload`, formData);
export const validateReceipt = (fileId) => axios.post(`${API_URL}/validate`, { fileId });
export const processReceipt = (fileId) => axios.post(`${API_URL}/process`, { fileId });
export const getReceipts = () => axios.get(`${API_URL}/receipts`);
export const deleteReceipt = (fileId) => axios.delete(`${API_URL}/delete/${fileId}`);


