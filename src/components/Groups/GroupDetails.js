import React from 'react';

const GroupDetails = ({ group, onClose }) => (
  <div className="details-container">
    <h3>Group Details</h3>
    <p>ID: {group.id}</p>
    <p>Name: {group.name}</p>
    <p>Created At: {group.created_at}</p>
    <button onClick={onClose}>Close</button>
  </div>
);

export default GroupDetails;
