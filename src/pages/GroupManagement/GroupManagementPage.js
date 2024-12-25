import React, { useState, useEffect } from 'react';
import { useGroups } from '../../contexts/GroupContext';
import GroupsTable from '../../components/Groups/GroupsTable';
import AddFilesModal from '../../components/Groups/modal/AddFilesModal';
import AddUsersModal from '../../components/Groups/modal/AddUsersModal';
import InviteUserModal from '../../components/Groups/modal/InviteUserModal';
import GroupDetails from '../../components/Groups/GroupDetails';
import '../../styles/Pages/GroupManagementPage.css';

const GroupManagementPage = () => {
  const { groups, getGroups, loading, error, handleAddFilesToGroup, handleAddUserToGroup } = useGroups();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showAddFiles, setShowAddFiles] = useState(false);
  const [showAddUsers, setShowAddUsers] = useState(false);
  const [showInviteUser, setShowInviteUser] = useState(false);

  useEffect(() => {
    getGroups(currentPage);

    const token = localStorage.getItem('token');

    fetch('http://127.0.0.1:8000/api/allUsers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          throw new Error('Invalid response structure');
        }
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, [currentPage]);


  const SendGroupInvitation = (groupId, invitedUserId) => {
    const token = localStorage.getItem('token'); // قراءة التوكين
  
    return fetch('http://localhost:8000/api/send-invitation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        group_id: groupId,
        invited_user_id: invitedUserId,
      }),
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.message || 'Failed to send invitation');
        });
      }
      return response.json();
    });
  };
  
  const handleInviteUser = (groupId, invitedUserId) => {
    SendGroupInvitation(groupId, invitedUserId)
      .then(() => {
        alert('Invitation sent successfully!');
        setShowInviteUser(false);
      })
      .catch((error) => {
        alert('Failed to send invitation: ' + error.message);
      });
  };

  return (
    <div className="group-management-page">
      <h2>Group Management</h2>

      {loading && <p>Loading groups...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && groups && (
        <>
          <GroupsTable
            groups={groups}
            onAddFiles={(groupId) => {
              setSelectedGroup(groupId);
              setShowAddFiles(true);
            }}
            onAddUsers={(groupId) => {
              setSelectedGroup(groupId);
              setShowAddUsers(true);
            }}
            onInviteUser={(groupId) => {
              setSelectedGroup(groupId);
              setShowInviteUser(true);
            }}
            onShowDetails={(groupId) => {
              const group = groups.find((g) => g.id === groupId);
              setSelectedGroup(group);
            }}
          />

          {showAddFiles && (
            <AddFilesModal
              groupId={selectedGroup}
              onClose={() => setShowAddFiles(false)}
              onSubmit={handleAddFilesToGroup}
            />
          )}

          {showAddUsers && (
            <AddUsersModal
              groupId={selectedGroup}
              onClose={() => setShowAddUsers(false)}
              onSubmit={handleAddUserToGroup}
            />
          )}

          {showInviteUser && (
            <InviteUserModal
              groupId={selectedGroup}
              users={users}
              onClose={() => setShowInviteUser(false)}
              onSubmit={handleInviteUser}
            />
          )}

          {selectedGroup && typeof selectedGroup === 'object' && (
            <GroupDetails group={selectedGroup} onClose={() => setSelectedGroup(null)} />
          )}
        </>
      )}
    </div>
  );
};

export default GroupManagementPage;
