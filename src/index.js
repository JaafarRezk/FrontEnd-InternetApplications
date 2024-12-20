import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FileProvider } from './contexts/FileContext';
import { GroupProvider } from './contexts/GroupContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <GroupProvider> 
    <FileProvider>
        <App />
    </FileProvider>
    </GroupProvider>

  </React.StrictMode>,
);


reportWebVitals();



/*
import React, { useEffect, useState } from 'react';
import useFileManagement from '../../hooks/useFileManagement';
import FileTable from './FileTable';
import Actions from './Actions';
import FileDetails from './FileDetails';
import AddFilesModal from '../Groups/modal/AddFilesModal';
import '../../styles/componentsStyles/AllFiles.css';
import { useGroups } from '../../contexts/GroupContext';

const MyFiles = () => {
  const {
    myFiles,
    myFilesPagination,
    loading,
    error,
    selectedFiles,
    handleSelectFile,
    handleCheckIn,
    handleCheckOut,
    fetchMyFiles,
  } = useFileManagement();

  const { groups, getGroups, handleAddFilesToGroup } = useGroups();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchMyFiles(currentPage);
    getGroups(); // جلب المجموعات عند تحميل الصفحة
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= myFilesPagination?.lastPage) {
      setCurrentPage(newPage);
    }
  };

  const handleShowDetails = (fileId) => {
    const file = myFiles.find((f) => f.id === fileId);
    setSelectedFile(file);
  };

  const handleCloseDetails = () => {
    setSelectedFile(null);
  };

  const handleAddFiles = async (groupId, files) => {
    await handleAddFilesToGroup(groupId, files); // استدعاء وظيفة الإضافة
    setShowAddModal(false); // إغلاق النافذة بعد الإرسال
  };

  return (
    <div className="file-container">
      <h2>My Files</h2>
      {loading && <p>Loading files...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && myFiles && (
        <>
          <FileTable
            files={myFiles}
            selectedFiles={selectedFiles}
            onCheckOut={handleCheckOut}
            onSelectFile={handleSelectFile}
            onShowDetails={handleShowDetails}
          />
          <Actions
            onCheckIn={handleCheckIn}
            disableCheckIn={selectedFiles.length === 0}
          />
          <button
            className="add-files-btn"
            onClick={() => setShowAddModal(true)} // السماح بفتح المودال دائمًا
          >
            Add to Group
          </button>

          {myFilesPagination && (
            <div className="pagination-container">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {myFilesPagination.lastPage}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === myFilesPagination.lastPage}
              >
                Next
              </button>
            </div>
          )}

          {selectedFile && (
            <FileDetails file={selectedFile} onClose={handleCloseDetails} />
          )}

          {showAddModal && (
            <AddFilesModal
              groups={groups} // تمرير المجموعات إلى المودال
              files={myFiles} // تمرير جميع الملفات إلى المودال
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAddFiles}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MyFiles;


*/