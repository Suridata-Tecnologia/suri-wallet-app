export const isAutheticate = () => localStorage.getItem("token") !== null;
export const getToken = () => localStorage.getItem("token");
export const login = (token) => {
  localStorage.setItem("token", String(token));
};
export const logout = () => {
  localStorage.clear();
};