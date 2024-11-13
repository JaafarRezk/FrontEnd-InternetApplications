import React, { useState } from 'react';
import axios from 'axios';
//import styles from '../styles/FileUpload.module.css'; // استيراد تنسيقات الـ CSS

const FileUpload = ({ fetchFiles }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select files to upload.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files[]', selectedFiles[i]);
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/file/uploadFiles', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        fetchFiles(); 
      } else {
        setError('Failed to upload files.');
      }
    } catch (error) {
      setError('An error occurred while uploading files.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={//styles.container}>
      <h3 className={styles.heading}>Upload Files</h3>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className={styles.inputFile}
      />
      <button 
        onClick={handleUpload} 
        disabled={loading} 
        className={styles.button}
      >
        {loading ? 'Uploading...' : 'Upload Files'}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FileUpload;
