import axios from 'axios';

const API_URL = '/api/auth/';

export const signup = async (email, password) => {
  const { data } = await axios.post(API_URL + 'signup', { email, password });
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const login = async (email, password) => {
  const { data } = await axios.post(API_URL + 'login', { email, password });
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const logout = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    await axios.post(
      API_URL + 'logout',
      {},
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
  }
  localStorage.removeItem('user');
};