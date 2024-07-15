import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (serverAccessToken, githubAccessToken, githubId) => {
    const userData = { githubId, serverAccessToken, githubAccessToken };
    setUser(userData);

    localStorage.setItem('serverAccessToken', serverAccessToken); // 서버 접근 토큰 저장
    localStorage.setItem('githubAccessToken', githubAccessToken); // 깃허브 접근 토큰 저장
    localStorage.setItem('githubId', githubId); // 깃허브 ID 저장
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // 토큰 삭제
    localStorage.removeItem('serverAccessToken'); // 서버 접근 토큰 삭제
    localStorage.removeItem('githubAccessToken'); // 깃허브 접근 토큰 삭제
    localStorage.removeItem('user'); // 사용자 정보 삭제
    localStorage.removeItem('githubId'); // 깃허브 ID 삭제
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
