import axios from 'axios';
const token = localStorage.getItem('token');

let rules = localStorage.getItem("rules") || '';
if(rules !== ''){
  rules = rules.split(',');
}
const api = axios.create({
  baseURL: 'https://suri-wallet-api-k7z65.ondigitalocean.app/',
  headers: {'Authorization': `Bearer ${token}`, 'access': rules}
});

export default api;
