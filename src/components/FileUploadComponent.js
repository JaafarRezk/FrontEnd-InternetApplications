import React, { useRef } from "react";
import useUploadFiles from "../hooks/useUploadFiles";
import '../styles/FileUpload.css';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; 

const FileUploadComponent = () => {
  const { isLoading, uploadedFiles, error, handleFileUpload } = useUploadFiles();
  const fileInputRef = useRef();

  const onFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const files = fileInputRef.current.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Files</h2>

      <form onSubmit={handleSubmit}>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={onFileChange}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>Upload</button>
      </form>

      {isLoading && <p>Uploading...</p>}

      {error && <p className="error-message">{error}</p>}

      {uploadedFiles.length > 0 && (
        <div>
          <h3>Uploaded Files</h3>
          <ul>
            {uploadedFiles.map((file) => (
              <li key={file.id}>
                <strong>{file.name}</strong>
                <p>{file.size} bytes</p>
                <a href={`${API_BASE_URL}/storage/${file.path}`} target="_blank" rel="noopener noreferrer">Download</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
