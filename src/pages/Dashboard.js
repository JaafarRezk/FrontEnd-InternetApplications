import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import MainSection from "../components/MainSection";
import FileUploadComponent from "../components/FileUploadComponent";  // Import the component
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("welcome");
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const handleMyFilesClick = () => setCurrentView("myFiles");
  const handleGroupsClick = () => setCurrentView("groups");
  const handleUploadClick = () => setCurrentView("upload");
  const handleManageUsersClick = () => setCurrentView("manageUsers");

  const menuItems = [
    { label: "My Files", onClick: handleMyFilesClick },
    { label: "Groups", onClick: handleGroupsClick },
    { label: "Upload Files", onClick: handleUploadClick },
    { label: "Manage Users", onClick: handleManageUsersClick },
  ];

  const handleMouseEnterSidebar = () => {
    setIsSidebarHovered(true);
  };

  const handleMouseLeaveSidebar = () => {
    setIsSidebarHovered(false);
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-body">
        <Sidebar
          menuItems={menuItems}
          onMouseEnter={handleMouseEnterSidebar}
          onMouseLeave={handleMouseLeaveSidebar}
        />
        <div className="main-content">
          {currentView === "upload" ? (
            <FileUploadComponent />
          ) : (
            <MainSection currentView={currentView} isSidebarHovered={isSidebarHovered} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
