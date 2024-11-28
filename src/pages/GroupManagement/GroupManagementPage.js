import React, { useState, useEffect } from 'react';
import { useGroups } from '../../contexts/GroupContext';
import GroupsTable from '../../components/Groups/GroupsTable';
import AddFilesModal from '../../components/Groups/modal/AddFilesModal';
import AddUsersModal from'../../components/Groups/modal/AddUsersModal';
import GroupDetails from '../../components/Groups/GroupDetails';
import '../../styles/Pages/GroupManagementPage.css';

const GroupManagementPage = () => {
  const { groups, getGroups, loading, error, handleAddFilesToGroup, handleAddUserToGroup } = useGroups();
  const [currentPage, setCurrentPage] = useState(1); // لإدارة الصفحات إذا كانت البيانات مجزأة
  const [selectedGroup, setSelectedGroup] = useState(null); // المجموعة المحددة للتفاصيل أو الإجراء
  const [showAddFiles, setShowAddFiles] = useState(false); // لإظهار نموذج إضافة الملفات
  const [showAddUsers, setShowAddUsers] = useState(false); // لإظهار نموذج إضافة المستخدمين

  useEffect(() => {
    getGroups(currentPage); // تحميل المجموعات عند فتح الصفحة أو تغيير الصفحة
  }, [currentPage]);


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

          {selectedGroup && typeof selectedGroup === 'object' && (
            <GroupDetails group={selectedGroup} onClose={() => setSelectedGroup(null)} />
          )}
        </>
      )}

     
    </div>
  );
};

export default GroupManagementPage;
