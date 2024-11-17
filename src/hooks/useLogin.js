import { useState, useEffect } from "react";
import authService from "../services/authService"; 

const useLogin = () => {
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState(""); 
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token"); 

    if (storedUser && token) {
      setUser(JSON.parse(storedUser)); 
    } else {
      setUser(null); 
    }
  }, []);

  const login = async (formData) => {
    setLoading(true); 
    try {
      const response = await authService.login(formData); 
      if (response.success) {
        const userData = response.data.user; 
        const token = response.data.token; 

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        setMessage("Login successful!"); 
        return true;
      } else {
        setMessage("Login failed. Please try again.");
        return false;
      }
    } catch (error) {
      setMessage("Login failed. Please try again."); 
      return false;
    } finally {
      setLoading(false); 
    }
  };

  const logout = async () => {
    try {
      await authService.logout(); 
      setUser(null); 
      localStorage.removeItem("user");
      localStorage.removeItem("token"); 
      setMessage("Logout successful!"); 
    } catch (error) {
      setMessage("Logout failed!"); 
    }
  };

  return { 
    login,     
    logout,   
    loading, 
    message,  
    user        
  };
};

export default useLogin;
