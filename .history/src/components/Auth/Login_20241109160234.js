// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Auth.module.css';
import { Link } from 'react-router-dom'; // إضافة رابط للتوجيه إلى صفحة التسجيل

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/logIn', {
        email,
        password,
      });

      if (response.data.success) {
        setSuccessMessage('Login successful!');
        const token = response.data.data.token;
        localStorage.setItem('token', token);
      }
    } catch (error) {
      setError('Invalid credentials or user does not exist.');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <p>Don't have an account? <Link to="/register" className={styles.link}>Sign up here</Link></p> {/* رابط للتوجه إلى صفحة Register */}
      </div>
    </div>
  );
};

export default Login;
