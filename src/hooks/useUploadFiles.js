import { useState } from "react";
import fileService from "../services/fileService";


const useUploadFiles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = async (files) => {
    setIsLoading(true);
    setError(null);

    try {
      // تأكد من إرسال الملفات بشكل صحيح إلى API
      const result = await fileService.uploadFiles(files);
      setUploadedFiles(result.data); 
    } catch (err) {
      // عرض رسالة الخطأ بالتفصيل في الكونسول لمزيد من الفهم
      console.error("Error uploading files:", err);

      // معالجة الخطأ بناءً على الرسالة القادمة من API
      if (err.response) {
        setError(err.response.data.message || "Error uploading files.");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    uploadedFiles,
    error,
    handleFileUpload,
  };
};

export default useUploadFiles;
