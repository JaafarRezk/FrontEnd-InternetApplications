// src/components/Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);  // لتخزين المستخدمين
  const [files, setFiles] = useState([]);  // لتخزين الملفات
  const [error, setError] = useState('');  // لتخزين الأخطاء
  const [loading, setLoading] = useState(false);  // لتحديد حالة التحميل

  // دالة لجلب جميع المستخدمين
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/allUsers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      setError('Failed to load users.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // دالة لجلب جميع الملفات المرتبطة بالمستخدم
  const fetchFiles = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/file/getMyFiles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles(response.data);
    } catch (error) {
      setError('Failed to load files.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard! Here you can manage your users and files.</p>

      <div>
        <button onClick={fetchUsers} disabled={loading}>
          {loading ? 'Loading Users...' : 'Show All Users'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* عرض المستخدمين بعد جلبهم */}
        {users.length > 0 && (
          <div>
            <h3>Users:</h3>
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.name} - {user.email}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={fetchFiles} disabled={loading}>
          {loading ? 'Loading Files...' : 'Show My Files'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* عرض الملفات بعد جلبها */}
        {files.length > 0 && (
          <div>
            <h3>My Files:</h3>
            <ul>
              {files.map((file) => (
                <li key={file.id}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
