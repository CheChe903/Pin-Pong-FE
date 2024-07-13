// src/services/postService.js
import axiosInstance from './axiosInstance';

// Function to add a new post
export const addPost = async (post) => {
  const url = '/api/v1/posts';
  try {
    const response = await axiosInstance.post(url, post);
    const data = response.data;
    if (data.code === 'success') {
      return data.data; // Assuming the response contains the added post data
    } else {
      console.error('Error adding post:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error adding post:', error);
    return null;
  }
};
