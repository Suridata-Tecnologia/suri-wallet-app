export const isAutheticate = () => localStorage.getItem("token") !== null;
export const getToken = () => localStorage.getItem("token");
export const setRules = (rules) => {
  localStorage.setItem("rules", String(rules));
};
export const isAdmin = () => {
  return localStorage.getItem("rules").split(",");
};
export const login = (token) => {
  localStorage.setItem("token", String(token));
};
export const logout = () => {
  localStorage.clear();
};