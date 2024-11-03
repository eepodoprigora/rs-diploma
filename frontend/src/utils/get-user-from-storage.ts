export const getUserFromSessionStorage = () => {
  const userData = sessionStorage.getItem("userData");
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};
