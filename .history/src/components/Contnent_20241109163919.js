import React from 'react';
import styles from '../styles/Content.module.css';

const Content = ({ users, files, error, loading }) => {
  return (
    <div className={styles.content}>
      {error && <p className={styles.error}>{error}</p>}

      {loading && <p>Loading...</p>}

      {users.length > 0 && (
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h3>Users:</h3>
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.name} - {user.email}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h3>My Files:</h3>
            <ul>
              {files.map((file) => (
                <li key={file.id}>{file.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {users.length === 0 && files.length === 0 && !loading && (
        <p>No data available. Please try again later.</p>
      )}
    </div>
  );
};

export default Content;
