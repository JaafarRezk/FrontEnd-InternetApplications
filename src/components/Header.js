import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin"; 



const Header = () => {

  const {  logout } = useLogin();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); 
  };
  return (
    <header className="header-container">
      <nav>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/settings" className="nav-link">Settings</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>
    </header>
  );
};

export default Header;
