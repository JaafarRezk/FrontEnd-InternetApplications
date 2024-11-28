import React, { useState } from 'react';
import CreateGroupModal from '../Groups/modal/CreateGroupModal'; // استيراد مكون الـ modal

const GroupsTable = ({ groups, onCreateGroup ,onAddFiles }) => {
  const [modalOpen, setModalOpen] = useState(false); // حالة التحكم بالـ Modal

  const handleGroupCreation = async (groupName) => {
    console.log("Creating group:", groupName);
    if (onCreateGroup) {
      await onCreateGroup(groupName); 
      setModalOpen(false); 
    } else {
      console.error("onCreateGroup is not defined!"); 
    }
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Create New Group</button>

      <CreateGroupModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)} 
        onCreateGroup={handleGroupCreation} 
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Creator ID</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.name}</td>
              <td>{group.creator_id}</td>
              <td>{group.created_at ? new Date(group.created_at).toLocaleString() : 'N/A'}</td>
              <td>
                <button onClick={() => onAddFiles(group.id)}>Add Files</button>
              </td>
            
            </tr>

            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupsTable;
