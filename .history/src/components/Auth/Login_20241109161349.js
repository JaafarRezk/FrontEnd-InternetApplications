// src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../././';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [users, setUsers] = useState([]);  // تخزين المستخدمين
  const [files, setFiles] = useState([]);  // تخزين الملفات
  const navigate = useNavigate(); // لاستخدام التوجيه بعد التسجيل

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

        // جلب البيانات بعد تسجيل الدخول
        fetchData(token);
      }
    } catch (error) {
      setError('Invalid credentials or user does not exist.');
      console.error(error);
    }
  };

  const fetchData = async (token) => {
    try {
      // جلب المستخدمين
      const usersResponse = await axios.get('http://127.0.0.1:8000/api/allUsers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(usersResponse.data);

      // جلب الملفات
      const filesResponse = await axios.get('http://127.0.0.1:8000/api/file/getMyFiles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles(filesResponse.data);

      // التوجيه إلى الصفحة الرئيسية بعد النجاح
      navigate('/dashboard');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data.');
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
        <p>Don't have an account? <Link to="/register" className={styles.link}>Sign up here</Link></p>
      </div>

      {/* عرض المستخدمين والملفات بعد تسجيل الدخول بنجاح */}
      {users.length > 0 && (
        <div className={styles.dataSection}>
          <h3>Users:</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name} - {user.email}</li>
            ))}
          </ul>
        </div>
      )}

      {files.length > 0 && (
        <div className={styles.dataSection}>
          <h3>My Files:</h3>
          <ul>
            {files.map((file) => (
              <li key={file.id}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
