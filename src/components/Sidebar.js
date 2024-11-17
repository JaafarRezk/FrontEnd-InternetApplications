import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ menuItems, onMouseEnter, onMouseLeave }) => {
  return (
    <aside
      className="sidebar-container"
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave} 
    >
      {/* Logo Section */}
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      {/* Navigation Links */}
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <button className="sidebar-link" onClick={item.onClick}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Footer Section */}
      <div className="footer">
        &copy; {new Date().getFullYear()} Your App
      </div>
    </aside>
  );
};

export default Sidebar;
