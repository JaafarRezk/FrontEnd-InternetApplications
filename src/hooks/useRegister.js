// src/hooks/useRegister.js
import { useState } from "react";
import authService from "../services/authService";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const register = async (formData) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await authService.register(formData);

      setMessage(response.message || "Registration successful.");
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      setMessage(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, message };
};

export default useRegister;
