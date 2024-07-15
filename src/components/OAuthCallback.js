import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { useAuth } from '../context/AuthContext';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    console.log('OAuthCallback component loaded');

    const fetchUserData = async () => {
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

        const { serverAccessToken, githubAccessToken, githubId } = response.data;
        console.log('Received serverAccessToken:', serverAccessToken);
        console.log('Received githubAccessToken:', githubAccessToken);
        console.log('Received githubId:', githubId);


        // 사용자 정보를 AuthContext에 저장
        login(serverAccessToken, githubAccessToken, githubId);

        // 토큰을 받은 후 루트 경로로 이동
        navigate('/');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, [navigate, searchParams, login]);

  return <div>Redirecting...</div>;
};

export default OAuthCallback;
