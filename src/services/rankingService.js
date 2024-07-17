// src/services/rankingService.js
import axiosInstance from './axiosInstance';

export const getRankingData = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/member/ranking');
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch ranking data');
  }
};
