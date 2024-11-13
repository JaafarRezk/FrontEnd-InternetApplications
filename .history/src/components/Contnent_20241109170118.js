import React from 'react';
import styles from '../styles/Content.module.css';

const Content = ({ users, files, error, loading }) => {
  return (
    <div className={styles.content}>
      <div className={styles.cardContainer}>
        {/* Users Section */}
        {users && users.length > 0 ? (
          <div className={styles.card}>
            <h3>Users:</h3>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <strong>{user.name}</strong> - {user.email}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No users available.</p>
        )}
      </div>

      {/* Files Section */}
      <div className={styles.cardContainer}>
        {files && files.length > 0 ? (
          <div className={styles.card}>
            <h3>My Files:</h3>
            <ul>
              {files.map((file) => (
                <li key={file.id}>
                  <strong>{file.name}</strong> {/* You can add more file details here */}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No files available.</p>
        )}
      </div>

      {/* Error Handling */}
      {error && <p className={styles.error}>{error}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Content;
