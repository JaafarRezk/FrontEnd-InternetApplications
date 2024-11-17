import { useState } from "react";
import fileService from "../services/fileService";

const useCheckIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const checkIn = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fileService.checkIn(id);
      setSuccess("File checked in successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    checkIn,
    loading,
    error,
    success
  };
};

export default useCheckIn;
