import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const API_URL = 'http://localhost:3000';

export const fetchBills = () => api.get('/bills');
export const createBill = (bill) => api.post('/bills', bill);
export const distributeBills = () => api.post('/distribute');
export const fetchForecast = () => api.get('/forecast');
export const fetchDistributionObjects = () => api.get('/distribution-objects');
export const createDistributionObject = (object) => api.post('/distribution-objects', object);
export const updateDistributionObject = (id, object) =>
  api.put(`/distribution-objects/${id}`, object);
export const deleteDistributionObject = (id) => api.delete(`/distribution-objects/${id}`);

export const processML = () => api.post('/ml');

export default api;
