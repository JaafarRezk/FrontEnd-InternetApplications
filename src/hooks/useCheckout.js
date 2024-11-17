// useCheckout.js

import { useState } from "react";
import fileService from "../services/fileService"; // تأكد من إعداد خدمة `fileService`

const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const checkout = async (fileId, newFile) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // إرسال الملف الجديد عبر الـ API
      const response = await fileService.checkoutFile(fileId, newFile);
      setSuccess("File checked out successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    checkout,
    loading,
    error,
    success,
  };
};

export default useCheckout;
