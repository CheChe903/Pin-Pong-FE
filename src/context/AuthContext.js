import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const githubId = localStorage.getItem('githubId');
    const serverAccessToken = localStorage.getItem('serverAccessToken');
    const githubAccessToken = localStorage.getItem('githubAccessToken');

    if (githubId && serverAccessToken && githubAccessToken) {
      return { githubId, serverAccessToken, githubAccessToken };
    }

    return null;
  });

  useEffect(() => {
    const githubId = localStorage.getItem('githubId');
    const serverAccessToken = localStorage.getItem('serverAccessToken');
    const githubAccessToken = localStorage.getItem('githubAccessToken');

    if (githubId && serverAccessToken && githubAccessToken) {
      setUser({ githubId, serverAccessToken, githubAccessToken });
    }
  }, []);

  const login = (serverAccessToken, githubAccessToken, githubId) => {
    const userData = { githubId, serverAccessToken, githubAccessToken };
    setUser(userData);
    localStorage.setItem('serverAccessToken', serverAccessToken);
    localStorage.setItem('githubAccessToken', githubAccessToken);
    localStorage.setItem('githubId', githubId);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('serverAccessToken');
    localStorage.removeItem('githubAccessToken');
    localStorage.removeItem('githubId');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
