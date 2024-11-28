import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Pages/Home.css'; // If you want to add specific styles for the Home page

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome to the File Management System</h1>
      {!user ? (
        <div className="auth-options">
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      ) : (
        <div className="welcome-message">
          <p>Welcome, {user.name}!</p>
        
        </div>
      )}
    </div>
  );
};

export default Home;
