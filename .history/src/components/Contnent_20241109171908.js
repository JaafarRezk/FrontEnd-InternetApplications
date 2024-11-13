import React from 'react';
import styles from '../styles/Content.module.css';

const Content = ({ users, files, error, loading }) => {
  return (
    <div className={styles.content}>
      <div className={styles.cardContainer}>
        {/* قسم المستخدمين */}
        {users && users.length > 0 ? (
          <div className={styles.card}>
            <h3>المستخدمين:</h3>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <strong>{user.name}</strong> - {user.email}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>لا توجد مستخدمين متاحين.</p>
        )}
      </div>

      {/* قسم الملفات */}
      <div className={styles.cardContainer}>
        {files && files.length > 0 ? (
          <div className={styles.card}>
            <h3>ملفاتي:</h3>
            <ul>
              {files.map((file) => (
                <li key={file.id}>
                  <strong>{file.name}</strong><br />
                  نوع الملف: {file.mime_type}<br />
                  الحجم: {file.size} بايت
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>لا توجد ملفات متاحة.</p>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {loading && <p>..</p>}
    </div>
  );
};

export default Content;
