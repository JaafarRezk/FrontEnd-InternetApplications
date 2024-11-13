import React from 'react';
import styles from '../styles/Toolbar.module.css';

const Toolbar = ({ fetchUsers, fetchFiles, loading }) => {
  return (
    <div className={styles.toolbar}>
      <button onClick={fetchUsers} className={styles.button} disabled={loading}>
        {loading ? 'Loading Users...' : 'Show All Users'}
      </button>
      <button onClick={fetchFiles} className={styles.button} disabled={loading}>
        {loading ? 'Loading Files...' : 'Show My Files'}
      </button>
    </div>
  );
};

export default Toolbar;
