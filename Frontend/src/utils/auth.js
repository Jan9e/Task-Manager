export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
  };