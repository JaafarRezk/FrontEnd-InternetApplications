import React, { createContext, useContext, useState, useEffect } from 'react';
import { logIn, logOut, register,fetchNotifications } from '../api/auth';

// إنشاء سياق المصادقة والإشعارات
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0); // عدد الإشعارات غير المقروءة
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // مصادقة المستخدم
  const handleLogIn = async (userData) => {
    const response = await logIn(userData);
    const token = response.data.data.token;
    const user = response.data.data.user;

    setUser(user);
    setToken(token);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  // التسجيل
  const handleRegister = async (userData) => {
    const response = await register(userData);
    const token = response.data.token;

    setUser(response.data.user);
    setToken(token);
    localStorage.setItem('token', token);
  };

  // تسجيل الخروج
  const handleLogOut = async () => {
    await logOut();
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  };

  // جلب الإشعارات
  const getNotifications = async () => {
    setLoading(true); // بدء التحميل
    setError(null);   // إعادة تعيين الخطأ
  
    try {
      const notificationsData = await fetchNotifications(); // استدعاء API لجلب الإشعارات
  
      // التحقق من أن البيانات مستلمة بشكل صحيح وأنها مصفوفة
      const notificationsArray = Array.isArray(notificationsData.data) ? notificationsData.data : [];
  
      // تحديث قائمة الإشعارات
      const updatedNotifications = notificationsArray.map((notification) => ({
        ...notification,
        read: true, // تعيين جميع الإشعارات كـ "تم قراءتها"
      }));
      setNotifications(updatedNotifications);
  
      // إعادة تعيين عدد الإشعارات غير المقروءة إلى 0
      setUnreadCount(0);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(err.message || "Failed to fetch notifications"); // تعيين الخطأ
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  };
  
  
  
  

  useEffect(() => {
    if (token) {
      getNotifications(); // جلب الإشعارات عند وجود التوكن
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        logIn: handleLogIn,
        logOut: handleLogOut,
        register: handleRegister,
        notifications,
        unreadCount,
        loading,
        error,
        getNotifications, // إرجاع دالة جلب الإشعارات
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook للوصول إلى السياق
export const useAuth = () => useContext(AuthContext);
