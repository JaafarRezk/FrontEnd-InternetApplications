import React, { useState } from 'react';

const InviteUserModal = ({ groupId, users, onClose, onSubmit }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [fetchedUsers, setFetchedUsers] = useState(users);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = () => {
    if (fetchedUsers.length > 0) return;

    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token'); // قراءة التوكين

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
          setFetchedUsers(data.data);
        } else {
          throw new Error('Invalid response structure');
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const handleInvite = () => {
    if (selectedUser) {
      onSubmit(groupId, selectedUser);
    } else {
      alert('Please select a user to invite.');
    }
  };

  return (
    <div className="invite-user-modal">
      <h3>Invite User to Group</h3>
      {loading && <p>Loading users...</p>}
      {error && <p className="error-message">{error}</p>}

      <select
        value={selectedUser}
        onClick={fetchUsers} // جلب المستخدمين عند الضغط
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Select a user</option>
        {fetchedUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>

      <button onClick={handleInvite}>Send Invitation</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default InviteUserModal;
