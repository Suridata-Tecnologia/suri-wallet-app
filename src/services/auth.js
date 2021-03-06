export const isAutheticate = () => {
  return localStorage.getItem("token") !== null;
};
export const getToken = () => localStorage.getItem("token");
export const setRules = (rules) => {
  localStorage.setItem("rules", String(rules));
};
export const isAdmin = () => {
  return localStorage.getItem("rules").split(",");
};
export const login = token => {
  localStorage.setItem("token", token);
};

export const refreshToken = token => {
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.clear();

};