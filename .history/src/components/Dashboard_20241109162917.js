import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Dashboard.module.css';

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
        <div className={styles.container}>
            <h1 className={styles.header}>Welcome to Your Dashboard</h1>
            <p className={styles.subHeader}>Your central hub for managing users and files.</p>

            <div className={styles.buttonContainer}>
                <button
                    onClick={fetchUsers}
                    className={`${styles.button} ${styles.usersButton}`}
                    disabled={loading}
                >
                    {loading ? 'Loading Users...' : 'Show All Users'}
                </button>
                <button
                    onClick={fetchFiles}
                    className={`${styles.button} ${styles.filesButton}`}
                    disabled={loading}
                >
                    {loading ? 'Loading Files...' : 'Show My Files'}
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.dataContainer}>
                {users.length > 0 && (
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Users:</h3>
                        <ul className={styles.list}>
                            {users.map((user) => (
                                <li key={user.id} className={styles.listItem}>
                                    {user.name} - {user.email}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {files.length > 0 && (
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>My Files:</h3>
                        <ul className={styles.list}>
                            {files.map((file) => (
                                <li key={file.id} className={styles.listItem}>
                                    {file.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {users.length === 0 && files.length === 0 && !loading && (
                    <p>No data available. Please try again later.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
