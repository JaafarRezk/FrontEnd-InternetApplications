import React, { createContext, useContext, useState } from 'react';
import { logIn, logOut, register } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  

  const handleLogIn = async (userData) => {
    const response = await logIn(userData);
    const token = response.data.data.token;
    const user = response.data.data.user;

    setUser(user);
    setToken(token);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };


  
  const handleRegister = async (userData) => {
    const response = await register(userData);
    const token = response.data.token;

    setUser(response.data.user);
    setToken(token);
    localStorage.setItem('token', token);
    
  };

  const handleLogOut = async () => {
    await logOut();
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        logIn: handleLogIn,
        logOut: handleLogOut,
        register: handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
