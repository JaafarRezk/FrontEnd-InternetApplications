import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import Toolbar from './Toolbar';
import Content from './Content';
import styles from '../styles/Dashboard.module.css'; 
import SidebarStyles from '../styles/Sidebar.module.css';
import HeaderStyles from '../styles/Header.module.css';
import ToolbarStyles from '../styles/Toolbar.module.css'; // Toolbar styles

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      setUsers(response.data.data);
    } catch (error) {
      setError('Failed to load users.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className={styles.dashboard}>
      <div className={SidebarStyles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.mainContent}>
        <div className={HeaderStyles.header}>
          <Header />
        </div>
        <div className={ToolbarStyles.toolbar}>
          <Toolbar fetchUsers={fetchUsers} fetchFiles={fetchFiles} loading={loading} />
        </div>
        <Content users={users} files={files} error={error} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;
