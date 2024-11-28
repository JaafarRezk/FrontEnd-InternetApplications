import React from 'react';

const FileTable = ({ files, selectedFiles, onCheckOut, onSelectFile, onShowDetails }) => {
  return (
    <table className="file-table">
      <thead>
        <tr>
          <th>Select</th>
          <th>ID</th>
          <th>Name</th>
          <th>Size (KB)</th>
          <th>Checked</th>
          <th>Actions</th>
          <th>Created At</th>
          <th>Details</th> 
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <tr key={file.id}>
            <td>
              <input
                type="checkbox"
                disabled={file.checked === 1}
                checked={selectedFiles.includes(file.id)}
                onChange={() => onSelectFile(file.id)}
              />
            </td>
            <td>{file.id}</td>
            <td>{file.name}</td>
            <td>{(file.size / 1024).toFixed(2)}</td>
            <td>{file.checked === 1 ? 'Checked In' : 'Not Checked In'}</td>
            <td>
              <button
                disabled={file.checked !== 1}
                onClick={() => onCheckOut(file.id, file.name)}
              >
                Check Out
              </button>
            </td>
            <td>{new Date(file.created_at).toLocaleDateString()}</td>
            <td>
              <button onClick={() => onShowDetails(file.id)}>
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileTable;
