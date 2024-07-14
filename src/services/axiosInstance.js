// src/services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // 환경 변수를 사용하여 baseURL 설정
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

// Add a request interceptor to include tokens in the headers
axiosInstance.interceptors.request.use(
  config => {
    const serverAccessToken = localStorage.getItem('serverAccessToken');
    const githubAccessToken = localStorage.getItem('githubAccessToken');

    if (serverAccessToken) {
      config.headers['Authorization'] = `Bearer ${serverAccessToken}`;
    }

    if (githubAccessToken) {
      config.headers['Github-Token'] = githubAccessToken;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
