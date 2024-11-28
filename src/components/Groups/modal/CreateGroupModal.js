import React, { useState } from 'react';
import { useGroups } from '../../../contexts/GroupContext'; 

const CreateGroupModal = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const { handleCreateGroup } = useGroups(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (groupName.trim() === '') {
      alert('Please enter a valid group name.');
      return;
    }
    try {
      await handleCreateGroup(groupName);
      setGroupName('');
      onClose();
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create New Group</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Create Group</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
