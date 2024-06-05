import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Замените на URL вашего сервера
});

export const fetchBills = () => api.get('/bills');
export const createBill = (bill) => api.post('/bills', bill);
export const distributeBills = () => api.post('/distribute');

export default api;
