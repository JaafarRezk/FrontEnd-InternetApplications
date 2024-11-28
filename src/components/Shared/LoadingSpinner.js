import React from 'react';
import '../../styles/componentsStyles/LoadingSpinner.css';

const LoadingSpinner  = ({ message }) => (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
  
export default LoadingSpinner;
