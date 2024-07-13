// src/services/api.js
import axiosInstance from './axiosInstance';

export const getGithubLoginUrl = async () => {
  const loginUrl = '/api/v1/login';
  console.log(`Request URL: ${axiosInstance.defaults.baseURL}${loginUrl}`);

  try {
    const response = await axiosInstance.get(loginUrl);
    const data = response.data;
    console.log('First Response:', response);

    if (data.code === 'success') {
      return data.data.url;
    } else {
      console.error('Error during social login:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error during social login:', error);
    return null;
  }
};
