import axios from 'axios';

const API_URL = 'api/user/';

const register = async (userData) => {
  const config = {
    onUploadProgress: (progressEvent) => {
      console.log(
        'Upload Progress: ' +
          Math.round((progressEvent.loaded / progressEvent.total) * 100) +
          '%'
      );
    },
  };

  const response = await axios.post(API_URL + 'register', userData, config);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  console.log(response);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};
const authService = {
  register,
  logout,
  login,
};

export default authService;
