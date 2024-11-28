import React, { useEffect, useState } from 'react';
import useFileManagement from '../../hooks/useFileManagement';
import FileTable from './FileTable';
import Actions from './Actions';
import FileDetails from './FileDetails';
import AddFilesModal from '../Groups/modal/AddFilesModal';
import Notification from '../Shared/Notification';
import LoadingSpinner from '../Shared/LoadingSpinner';
import ErrorMessage from '../Shared/ErrorMessage';
import '../../styles/componentsStyles/AllFiles.css';
import { useGroups } from '../../contexts/GroupContext';

const MyFiles = () => {
  const {
    myFiles,
    myFilesPagination,
    error,
    selectedFiles,
    handleSelectFile,
    handleCheckIn,
    handleCheckOut,
    fetchMyFiles,
  } = useFileManagement();

  const { groups, getGroups, handleAddFilesToGroup } = useGroups();

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFileIds, setSelectedFileIds] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchMyFiles(currentPage)
      .catch(() => setNotification({ type: 'error', message: 'Failed to load files.' }))
      .finally(() => setLoading(false));
    getGroups().catch(() => setNotification({ type: 'error', message: 'Failed to load groups.' }));
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

  const handleAddFiles = async (groupId, selectedFileIds) => {
    setLoading(true);
    try {
      if (selectedFileIds.length === 0) {
        setNotification({ type: 'error', message: 'Please select at least one file.' });
        return;
      }

      await handleAddFilesToGroup(groupId, selectedFileIds);
      setNotification({ type: 'success', message: 'Files added successfully!' });
      setShowAddModal(false);
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to add files.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (groupId, selectedFileIds) => {
    if (!groupId) {
      setNotification({ type: 'error', message: 'Please select a group.' });
      return;
    }
    if (selectedFileIds.length === 0) {
      setNotification({ type: 'error', message: 'Please select at least one file.' });
      return;
    }

    handleAddFiles(groupId, selectedFileIds);
  };

  const handleFileSelection = (fileId) => {
    setSelectedFileIds((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId) // إزالة الملف إذا كان محددًا مسبقًا
        : [...prev, fileId] // إضافة الملف إذا لم يكن محددًا
    );
  };

  return (
    <div className="file-container">
      <h2>My Files</h2>

      {/* مكون التحميل */}
      {loading && <LoadingSpinner message="Loading files, please wait..." />}

      {/* مكون الإشعار */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* مكون الخطأ */}
      {error && <ErrorMessage message={error} />}

      {/* عرض الملفات */}
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
            onClick={() => setShowAddModal(true)}
          >
            Add to Group
          </button>

          {/* مكون التصفح */}
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

          {/* عرض تفاصيل الملف */}
          {selectedFile && (
            <FileDetails file={selectedFile} onClose={handleCloseDetails} />
          )}

          {/* عرض مودال إضافة الملفات */}
          {showAddModal && (
            <AddFilesModal
              groups={groups}
              files={myFiles}
              selectedFileIds={selectedFileIds}
              onFileSelect={handleFileSelection}
              onClose={() => setShowAddModal(false)}
              onSubmit={handleSubmit}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MyFiles;
