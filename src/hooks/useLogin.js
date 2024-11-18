import { useState, useEffect } from "react";
import authService from "../services/authService"; 

const useLogin = () => {
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState(""); 
  const [user, setUser] = useState(null); 

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
  
      if (storedUser && token) {
        setUser(JSON.parse(storedUser)); 
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error parsing user data:", error.message);
      setUser(null); 
    }
  }, []);
  

  const login = async (formData) => {
    setLoading(true);
    try {
      const response = await authService.login(formData);
      if (response.success) {
        const userData = response.data.user; // كائن المستخدم
        const token = response.data.token;
  
        localStorage.setItem("token", token); // تخزين التوكن
        localStorage.setItem("user", JSON.stringify(userData)); // تخزين المستخدم كسلسلة نصية
  
        setUser(userData); // تحديث حالة المستخدم
        setMessage("Login successful!");
        return true;
      } else {
        setMessage("Login failed. Please try again.");
        return false;
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setMessage(errorMessage);
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
