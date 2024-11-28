import { useState, useEffect } from 'react';
import { useFiles } from '../contexts/FileContext';

const useFileManagement = () => {
  const {
    allFiles,
    allFilesPagination,
    getAllFiles,
    handleCheckInFiles,
    handleCheckOutFile,
    myFiles,
    pagination: myFilesPagination,
    getMyFiles,
  } = useFiles();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFiles = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      await getAllFiles(page);
    } catch (err) {
      setError('Error fetching files. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyFiles = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      await getMyFiles(page);
    } catch (err) {
      setError('Error fetching files. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFile = (fileId) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]
    );
  };

  const handleCheckIn = async () => {
    try {
      await handleCheckInFiles(selectedFiles);
      setSelectedFiles([]);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleCheckOut = async (fileId, selectedFileName) => {
    const file = allFiles.find((f) => f.id === fileId);
    if (!file) throw new Error('File not found.');
  
    // استخراج الامتداد من اسم الملف
    const getFileExtension = (fileName) => fileName.split('.').pop().toLowerCase();
  
    const originalFileExtension = getFileExtension(file.name);
    const selectedFileExtension = getFileExtension(selectedFileName);
  
    // التحقق من الامتداد
    if (originalFileExtension !== selectedFileExtension) {
      throw new Error(
        `Invalid file selected. Please choose a file with the name "${file.name}".`
      );
    }
  
    try {
      setSelectedFile(fileId);
      await handleCheckOutFile(fileId);
    } finally {
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return {
    allFiles,
    allFilesPagination,
    myFilesPagination,
    myFiles,
    loading,
    error,
    selectedFiles,
    selectedFile,
    handleSelectFile,
    handleCheckIn,
    handleCheckOut,
    fetchFiles,
    fetchMyFiles
  };
};

export default useFileManagement;
