import React from "react";
import "../styles/FileList.css";

const FileList = ({
  files,
  loading,
  error,
  selectedFiles,
  onFileSelect,
  onView,
  onDownload,
  onDelete,
  onCheckout,
}) => {
  if (loading) return <p>Loading files...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (files.length === 0) return <p>No files found.</p>;

  return (
    <div className="files-list">
      {files.map((file) => (
        <div key={file.id} className="file-item">
          <p><strong>Name:</strong> {file.name}</p>
          <p><strong>Size:</strong> {file.size} bytes</p>
          <p><strong>Type:</strong> {file.mime_type}</p>
          <p><strong>Path:</strong> {file.path}</p>
          <div className="file-actions">
            <button onClick={() => onView(file)}>View</button>
            <button onClick={() => onDownload(file)}>Download</button>
            <button onClick={() => onDelete(file)} className="danger">Delete</button>

            {file.checked === 1 && (
              <button onClick={() => onCheckout(file)} className="checkout-button">Checkout</button>
            )}

            {file.checked === 0 && (
              <button onClick={() => onFileSelect(file)}>
                {selectedFiles.includes(file.id) ? "Deselect" : "Select"} for Check In
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileList;
