import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LogOut = () => {
  const { logOut } = useAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
      alert('Successfully logged out!');
    } catch (error) {
      console.error('Logout failed:', error.response.data.message);
      alert('Logout failed!');
    }
  };

  return <button onClick={handleLogOut}>Log Out</button>;
};

export default LogOut;
