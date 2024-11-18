import { useState } from "react";
import fileService from "../services/fileService";

const useUploadFiles = () => {
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل العامة
  const [uploadedFiles, setUploadedFiles] = useState([]); // الملفات التي تم رفعها بنجاح
  const [fileStatus, setFileStatus] = useState({}); // حالة كل ملف (نجاح أو فشل)
  const [error, setError] = useState(null); // الأخطاء العامة
  const [successMessage, setSuccessMessage] = useState(null); // رسائل النجاح العامة

  const handleFileUpload = async (files) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    setFileStatus({}); // إعادة تعيين الحالة

    try {
      const filesArray = Array.from(files); // تحويل الملفات إلى مصفوفة للتكرار عليها

      // إنشاء وعود لرفع الملفات
      const uploadPromises = filesArray.map(async (file) => {
        try {
          const result = await fileService.uploadFiles([file]); // رفع ملف واحد
          setUploadedFiles((prev) => [...prev, ...result.data]);
          setFileStatus((prev) => ({
            ...prev,
            [file.name]: { success: true, message: "Uploaded successfully" },
          }));
        } catch (err) {
          console.error("Error uploading file:", file.name, err);

          // تحديد الخطأ الخاص بالملف
          const errorMessage = err.response?.data?.message || "Failed to upload file.";
          setFileStatus((prev) => ({
            ...prev,
            [file.name]: { success: false, message: errorMessage },
          }));
        }
      });

      // انتظار كل الوعود الموزعة عبر الملفات
      await Promise.all(uploadPromises);

      setSuccessMessage("Files uploaded successfully, check status for each file.");
    } catch (err) {
      console.error("Unexpected error during file upload:", err);
      setError("An unexpected error occurred while uploading files.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    uploadedFiles,
    fileStatus,
    error,
    successMessage,
    handleFileUpload,
  };
};

export default useUploadFiles;
