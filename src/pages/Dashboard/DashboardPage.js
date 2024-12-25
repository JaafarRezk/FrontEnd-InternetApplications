import React, { useContext, useState,useCallback } from "react";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import ToolBar from "../../components/Dashboard/ToolBar";
import Content from "../../components/Dashboard/Content";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Notifications from "../../components/Notification/Notifications"; 

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const handleNotificationClick = () => {
    setUnreadNotifications(0); 
  };

  const handleNewNotification = useCallback((notification) => {
    console.log("New notification data:", notification); 
  
    if (!notification || !notification.message || !notification.id) {
      console.error("Invalid notification data:", notification);
      return;
    }
  
    setNotifications((prev) => {
      const exists = prev.some((notif) => notif.id === notification.id);
      if (exists) return prev; 
      return [notification, ...prev]; 
    });
  
    if (!notification.read) {
      setUnreadNotifications((prev) => prev + 1);
    }
  
    toast.info(`New Notification: ${notification.message}`);
  }, []);
  
  
  

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <ToastContainer />
      <Notifications 
        userId={user.id} 
        onNewNotification={handleNewNotification} 
      />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          <ToolBar
            onNotificationClick={handleNotificationClick}
            unreadNotificationsCount={unreadNotifications}
            notifications={notifications}
          />
          <Content />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
