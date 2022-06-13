import axios from 'axios';
const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {'Authorization': `Bearer ${token}`, 'access': localStorage.getItem("rules").split(",")}
});

export default api;
