// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Auth.module.css';
import { useNavigate } from 'react-router-dom'; // استخدام useNavigate بدلاً من useHistory

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // استخدام useNavigate بدلاً من useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // تحقق من أن كلمة المرور والتأكيد متطابقتان
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register', {
        name,
        email,
        password,
      });

      if (response.data.success) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        // توجيه المستخدم إلى صفحة تسجيل الدخول بعد نجاح التسجيل
        setTimeout(() => {
          navigate('/login'); // استخدام navigate للتوجيه بدلاً من history.push
        }, 2000); // التأخير قبل التوجيه
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during registration.');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Register</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default Register;
