import React, { createContext, useContext, useState } from 'react';
import { uploadFiles, fetchMyFiles ,fetchAllFiles ,checkInFiles,checkOutFile  } from '../api/files';


const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [pagination, setPagination] = useState(null);
    const [myFiles, setMyFiles] = useState([]);
    const [allFiles, setAllFiles] = useState([]);
    const [allFilesPagination, setAllFilesPagination] = useState(null);
  
    const handleSuccessMessage = (message) => {
        alert(message); // أو استخدم مكتبة إشعارات مثل Toastr
      };

      const handleApiError = (error) => {
        if (error.response && error.response.data) {
          return error.response.data.message || 'Server error occurred.';
        }
        if (error.message) {
          return `Network error: ${error.message}`;
        }
        return 'An unexpected error occurred.';
      };
      
      

    const handleUploadFiles = async (selectedFiles) => {
        try {
            setIsUploading(true);
            const response = await uploadFiles(selectedFiles);
            console.log('Uploaded Files:', response);
            setFiles((prevFiles) => [...prevFiles, ...response]);
        } catch (error) {
            console.error('Error uploading files:', error);
            throw error;
        } finally {
            setIsUploading(false);
        }
    };


    const getMyFiles = async (page = 1) => {
      try {
          const data = await fetchMyFiles(page);
          setMyFiles(data.data);
          setPagination({
              currentPage: data.current_page,
              total: data.total,
              perPage: data.per_page,
              lastPage: data.last_page,
          });
      } catch (error) {
          console.error('Error fetching my files:', error);
      }
  };

  const getAllFiles = async (page = 1) => {
      try {
          const data = await fetchAllFiles(page);
          setAllFiles(data.files || []); // قائمة الملفات
          setAllFilesPagination(data.pagination || null); // بيانات الصفحات
      } catch (error) {
          console.error('Error fetching all files:', error);
          throw error; // رمي الخطأ ليتم التعامل معه لاحقًا
      }
  };
    

    const handleCheckInFiles = async (fileIds) => {
        try {
          // فلترة الملفات القابلة للـ Check-In
          const validFileIds = allFiles
            .filter((file) => file.checked === 0 && fileIds.includes(file.id))
            .map((file) => file.id);
      
          if (validFileIds.length === 0) {
            throw new Error('No valid files to check in. Ensure the files are not already checked in.');
          }
      
          // استدعاء الـ API
          const updatedFiles = await checkInFiles(validFileIds);
      
          // تحديث الملفات في الواجهة
          setAllFiles((prevFiles) =>
            prevFiles.map((file) =>
              validFileIds.includes(file.id)
                ? { ...file, checked: 1, ...updatedFiles.find((f) => f.id === file.id) }
                : file
            )
          );
      
          // إظهار رسالة نجاح
          handleSuccessMessage('Files checked in successfully.');
        } catch (error) {
          console.error('Error checking in files:', error);
          throw new Error(handleApiError(error)); // معالجة الخطأ باستخدام التابع الموحد
        }
      };
      

      const handleCheckOutFile = async (id) => {
        try {
          // طلب من المستخدم اختيار ملف من جهازه
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = '*/*'; // السماح بجميع أنواع الملفات
      
          fileInput.onchange = async (event) => {
            const file = event.target.files[0];
            if (!file) {
              alert('No file selected.');
              return;
            }
      
            // تنفيذ عملية Check-Out
            try {
              const updatedFile = await checkOutFile(id, file);
              setAllFiles((prevFiles) =>
                prevFiles.map((f) => (f.id === id ? updatedFile : f))
              );
              alert('File checked out successfully.');
            } catch (error) {
              alert(handleApiError(error)); // عرض رسالة الخطأ
            }
          };
      
          fileInput.click(); // فتح نافذة اختيار الملف
        } catch (error) {
          console.error('Error during check-out:', error);
          alert(handleApiError(error));
        }
      };
      
      
    
      


    return (
        <FileContext.Provider value={
            {
                files,
                isUploading,
                handleUploadFiles,
                myFiles,
                pagination,
                getMyFiles,
                allFiles, 
                allFilesPagination, 
                getAllFiles,
                handleCheckInFiles,
                handleCheckOutFile
            } 
            }>

            { children }
        </FileContext.Provider>
    );
};

export const useFiles = () => useContext(FileContext);