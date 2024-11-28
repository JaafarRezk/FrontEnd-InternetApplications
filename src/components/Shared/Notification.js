import React from 'react';
import '../../styles/componentsStyles/Notification.css';

const Notification = ({ type, message, onClose }) => {
  const typeClass = type === 'success' ? 'notification-success' : 'notification-error';

  return (
    <div className={`notification ${typeClass}`}>
      <p>{message}</p>
      <button onClick={onClose}>×</button>
    </div>
  );
};

export default Notification;
