import React, { useState } from 'react';
import { useFiles } from '../../contexts/FileContext';
import { Snackbar, Alert } from '@mui/material';
import '../../styles/componentsStyles/UploadFiles.css'

const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const { handleUploadFiles, isUploading } = useFiles();

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setSnackbar({ open: true, message: 'No files selected!', severity: 'warning' });
      return;
    }

    try {
      await handleUploadFiles(selectedFiles);
      setSnackbar({ open: true, message: 'Files uploaded successfully!', severity: 'success' });
      setSelectedFiles([]); // تفريغ الملفات بعد الرفع
    } catch (error) {
      setSnackbar({ open: true, message: 'File upload failed!', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <div className="upload-file-container">
      <h2>Upload Files</h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <button
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UploadFiles;
