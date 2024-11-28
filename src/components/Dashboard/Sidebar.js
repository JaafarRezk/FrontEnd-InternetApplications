import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFileAlt, FaUsers, FaUpload, FaCheckCircle, FaDownload } from 'react-icons/fa';

const Sidebar = ({ onViewChange }) => {
  const location = useLocation();

  const getSidebarLinks = () => {
    if (location.pathname.startsWith('/file-management')) {
      return (
        <>
          <li onClick={() => onViewChange('upload')}style={{ cursor: 'pointer', color: 'white' }}>
            <FaUpload /> Upload file
          </li>
       
          <li onClick={() => onViewChange('allFiles')} style={{ cursor: 'pointer', color: 'white' }}>
            <FaFileAlt /> Fetch All Files
          </li>
          <li onClick={() => onViewChange('myFiles')} style={{ cursor: 'pointer', color: 'white' }}>
            <FaFileAlt /> Fetch My Files
          </li>
        </>
      );
    }

    // روابط Dashboard و Group Management إذا كانت الصفحة الرئيسية
    return (
      <>
        <li><Link to="/dashboard" style={{ color: 'white' }}><FaHome /> Dashboard</Link></li>
        <li><Link to="/file-management" style={{ color: 'white' }}><FaFileAlt /> File Management</Link></li>
        <li><Link to="/group-management" style={{ color: 'white' }}><FaUsers /> Group Management</Link></li>
      </>
    );
  };

  return (
    <aside style={{ width: '250px', padding: '20px', backgroundColor: '#333', color: 'white' }}>
      <ul>
        {getSidebarLinks()}
      </ul>
    </aside>
  );
};

export default Sidebar;
