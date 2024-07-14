import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = () => {
    const userData = {
      githubId: 'cheche903',
      githubImage: 'https://via.placeholder.com/150',
      pins: 5,
      techStacks: ['React', 'JavaScript', 'Node.js'],
    };
    setUser(userData);
    localStorage.setItem('token', 'dummyToken'); // 임시 토큰 설정
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // 토큰 삭제
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
