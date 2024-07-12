// src/services/socialLoginService.js
import axios from 'axios';

export const onClickGithubLogin = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const url = '/api/v1/login';
  const fullUrl = `${baseURL}${url}`;
  console.log(`Request URL: ${fullUrl}`);

  axios.get(fullUrl, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420',
    }
  })
  .then((response) => {
    const data = response.data;
    console.log('Response:', response);
    if (data.code === "success") {
      window.open(data.data.url, "_blank", "noopener, noreferrer");
    } else {
      console.error('Error during social login:', data.message);
    }
  })
  .catch((error) => {
    console.error('Error during social login:', error);
  });
};
