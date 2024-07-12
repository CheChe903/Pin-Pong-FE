// src/services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // 환경 변수를 사용하여 baseURL 설정
});

export default axiosInstance;
