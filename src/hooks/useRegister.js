import { useState } from "react";
import authService from "../services/authService";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const register = async (formData) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await authService.register(formData);

      if (response.success) {
        setUser(response.user);
        setMessage(response.message);
        return true;
      } else {
        setMessage(response.message || "Registration failed. Please try again.");
        return false;
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      setMessage(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, message, user };
};

export default useRegister;
