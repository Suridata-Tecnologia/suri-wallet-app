import axios from 'axios';
const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: 'https://suri-wallet-api-k7z65.ondigitalocean.app/',
  headers: {'Authorization': `Bearer ${token}`, 'access': localStorage.getItem("rules").split(",")}
});

export default api;
