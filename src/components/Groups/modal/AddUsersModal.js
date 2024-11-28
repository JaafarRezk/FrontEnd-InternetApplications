import React, { useState } from 'react';

const AddUsersModal = ({ groupId, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!email) {
      alert('Please enter an email.');
      return;
    }
    onSubmit(groupId, email);
    onClose();
  };

  return (
    <div className="modal">
      <h3>Add User to Group</h3>
      <input
        type="email"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddUsersModal;
