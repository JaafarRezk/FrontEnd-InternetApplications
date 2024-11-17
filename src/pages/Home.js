import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">

      <div className="home-content">
        <div className="home-buttons">
          <Link to="/login" className="home-btn">Login</Link>
          <Link to="/register" className="home-btn">Register</Link>
        </div>
        <main>
          <h2>Welcome to Your Dashboard</h2>
          <p>Your gateway to managing your account efficiently and securely.</p>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
