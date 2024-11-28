import React from 'react';
 import '../../styles/componentsStyles/AllFiles.css';
 
const FileDetails = ({ file, onClose }) => {
  return (
    <div className="file-details-modal">
      <div className="file-details-content">
        <h3>File Details</h3>
        <p><strong>Name:</strong> {file.name}</p>
        <p><strong>Path:</strong> {file.path}</p>
        <p><strong>Type:</strong> {file.mime_type}</p>
        <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
        <p><strong>Created At:</strong> {new Date(file.created_at).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(file.updated_at).toLocaleString()}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FileDetails;
