// src/components/auth/OAuthCallback.js
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log('OAuthCallback component loaded');

    const fetchToken = async () => {
      const code = searchParams.get('code');
      if (!code) {
        console.error('No code found in URL');
        return;
      }

      console.log(`Code found in URL: ${code}`);

      try {
        const response = await axiosInstance.get('/api/v1/oauth/github/callback', {
          params: { code }
        });

        console.log('API response:', response); // 응답 로그

        const token = response.data.token;
        console.log('Received token:', token);

        // 여기서 토큰을 이용하여 원하는 작업을 수행할 수 있습니다.
        // 예: localStorage에 저장하거나, 다른 API 호출 등
        localStorage.setItem('token', token);

        // 토큰을 받은 후 루트 경로로 이동
        navigate('/');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchToken();
  }, [navigate, searchParams]);

  return <div>Redirecting...</div>;
};

export default OAuthCallback;
