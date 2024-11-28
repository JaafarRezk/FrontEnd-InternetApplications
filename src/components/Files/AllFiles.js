import React, { useState } from 'react';
import useFileManagement from '../../hooks/useFileManagement';
import FileTable from './FileTable';
import Actions from './Actions';
import Pagination from './Pagination';
import FileDetails from './FileDetails';

const AllFiles = () => {
  const {
    allFiles,
    allFilesPagination,
    loading,
    error,
    selectedFiles,
    handleSelectFile,
    handleCheckIn,
    handleCheckOut,
    fetchFiles,
  } = useFileManagement();

  const [selectedFile, setSelectedFile] = useState(null);

  const handlePageChange = (page) => fetchFiles(page);

  const handleShowDetails = (fileId) => {
    const file = allFiles.find((f) => f.id === fileId);
    setSelectedFile(file); 
  };

  const handleCloseDetails = () => {
    setSelectedFile(null);
  };

  return (
    <div className="file-container">
      <h2>All Files</h2>
      { loading && <p>Loading files...</p> }
      { error && <p className="error-message">{ error }</p> }

      { !loading && !error && (
        <>
          <FileTable
            files={ allFiles }
            selectedFiles={ selectedFiles }
            onCheckOut={ handleCheckOut }
            onSelectFile={ handleSelectFile }
            onShowDetails={ handleShowDetails } 
          />
          <Actions
            onCheckIn={ handleCheckIn }
            disableCheckIn={ selectedFiles.length === 0 }
          />
          { allFilesPagination && (
            <Pagination
              pagination={allFilesPagination}
              onPageChange={handlePageChange}
            />
          )}

          {selectedFile && (
            <FileDetails file={selectedFile} onClose={handleCloseDetails} />
          )}
        </>
      )}
    </div>
  );
};

export default AllFiles;
