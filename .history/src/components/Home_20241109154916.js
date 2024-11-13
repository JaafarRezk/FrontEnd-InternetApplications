// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the File Management System</h1>
      <p>
        This platform allows users to upload files, manage their status, assign them to groups, and add users.
        Please log in or register to continue.
      </p>

      <div style={{ marginTop: '20px' }}>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register" style={{ marginLeft: '10px' }}>
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
