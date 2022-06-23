import axios from 'axios';
import env from "react-dotenv";

function getLocalAccessToken() {
  const accessToken = localStorage.getItem("token");
  return accessToken;
}
function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem('rt');
  return refreshToken;
}


const BASE_URL = env.SURI_WALLET_API;
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    headers: {'access': localStorage.getItem("rules")}
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["access"] = localStorage.getItem("rules");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {    
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await refreshToken();
          const { accessToken } = rs.data;
          localStorage.setItem("token", accessToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          api.defaults.headers.common["access"] = localStorage.getItem("rules");
          return api(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

function refreshToken() {
  return api.post("/refresh-token", {
    refreshToken: getLocalRefreshToken(),
  });
}

export default api;
