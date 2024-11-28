import React, { createContext, useContext, useState } from 'react';
import { fetchGroups, addFilesToGroup, addUserToGroup,createGroup  } from '../api/groups';

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const getGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const groupsData = await fetchGroups();
      setGroups(groupsData);  // استخدام البيانات المستلمة لتحديث الحالة
    } catch (err) {
      setError(err.message || 'Failed to fetch groups.');
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleCreateGroup = async (groupName) => {
    setLoading(true);
    try {
      const response = await createGroup(groupName);
      if (response.success) {
        setGroups((prevGroups) => [...prevGroups, response.data]);
        alert('Group created successfully!');
      } else {
        throw new Error('Failed to create group');
      }
    } catch (err) {
      setError(err.message || 'Failed to create group.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  




  const handleAddFilesToGroup = async (groupId, fileIds) => {
    setLoading(true);
    try {
      const response = await addFilesToGroup(groupId, fileIds);
      if (response.success) {
        // إذا كانت العملية ناجحة، نقوم بتحديث المجموعات أو نقوم بعمل أي إجراءات أخرى
        alert('Files added to the group successfully!');
        // ربما نقوم بتحديث مجموعة الملفات هنا إذا لزم الأمر
      } else {
        throw new Error('Failed to add files to the group');
      }
    } catch (err) {
      setError(err.message || 'Failed to add files to the group.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleAddUserToGroup = async (groupId, email) => {
    try {
      const updatedGroup = await addUserToGroup(groupId, email);
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? { ...group, users: updatedGroup.users } : group
        )
      );
      alert('User added to group successfully.');
    } catch (error) {
      alert(error.message || 'Failed to add user to the group.');
    }
  };

  return (
    <GroupContext.Provider
      value={{
        groups,
        loading,
        error,
        getGroups,
        handleCreateGroup,
        selectedGroup,
        setSelectedGroup,
        handleAddFilesToGroup,
        handleAddUserToGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => useContext(GroupContext);
export default GroupContext;