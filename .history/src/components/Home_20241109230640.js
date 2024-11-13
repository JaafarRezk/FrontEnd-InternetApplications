// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the File Management System</h1>
      <p className={styles.description}>
        This platform allows users to upload files, manage their status, assign them to groups, and add users.
        Please log in or register to continue.
      </p>

      <div className={styles.buttonsContainer}>
        <Link to="/login">
          <button className={styles.button}>Login</button>
        </Link>
        <Link to="/register" className={styles.registerLink}>
          <button className={styles.button}>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
