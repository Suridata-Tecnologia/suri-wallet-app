import axios from 'axios';

const api = axios.create({
  baseURL: process.env.SURI_WALLET_API,
});

export default api;
