// في الملف hooks/useCheckInMultipleFiles.js
import { useState } from "react";
import fileService from "../services/fileService";

const useCheckInMultipleFiles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const checkInMultipleFiles = async (fileIds) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fileService.checkInMultipleFiles(fileIds);
      setSuccess("Files checked in successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    checkInMultipleFiles,
    loading,
    error,
    success
  };
};

export default useCheckInMultipleFiles;
