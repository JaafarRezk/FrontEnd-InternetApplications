import React from 'react';
import styles from '../styles/Content.module.css';

const Content = ({ users, files, error, loading }) => {
  return (
    <div className={styles.content}>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {files && files.length > 0 ? (
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h3>My Files</h3>
            <ul>
              {files.map((file) => (
                <li key={file.id}>
                  <strong>{file.name}</strong> {/* You can add other file details here */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>No files available.</p>
      )}
      
      {users.length > 0 && (
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h3>Users:</h3>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
