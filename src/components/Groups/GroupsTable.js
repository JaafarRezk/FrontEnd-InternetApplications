import React, { useState } from 'react';
import CreateGroupModal from '../Groups/modal/CreateGroupModal'; // استيراد مكون الـ Modal

const GroupsTable = ({ groups, onCreateGroup, onAddFiles, onInviteUser }) => {
  const [modalOpen, setModalOpen] = useState(false); // حالة التحكم بالـ Modal

  const handleGroupCreation = async (groupName) => {
    if (onCreateGroup) {
      await onCreateGroup(groupName); // استدعاء الدالة الرئيسية لإنشاء المجموعة
      setModalOpen(false); // إغلاق الـ Modal بعد الإنشاء
    } else {
      console.error("onCreateGroup is not defined!");
    }
  };

  return (
    <div>
      {/* زر إنشاء مجموعة جديدة */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setModalOpen(true)}>Create New Group</button>
      </div>

      {/* نافذة إنشاء المجموعة */}
      <CreateGroupModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreateGroup={handleGroupCreation}
      />

      {/* جدول عرض المجموعات */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Creator ID</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.name}</td>
              <td>{group.creator_id}</td>
              <td>{group.created_at ? new Date(group.created_at).toLocaleString() : 'N/A'}</td>
              <td>
                {/* زر إضافة الملفات */}
                <button onClick={() => onAddFiles(group.id)}>Add Files</button>

                {/* زر دعوة المستخدمين */}
                {onInviteUser && (
                  <button onClick={() => onInviteUser(group.id)}>Invite User</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupsTable;
