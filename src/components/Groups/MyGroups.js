import React, { useEffect, useState } from 'react';
import { useGroups } from '../../contexts/GroupContext';
import GroupsTable from './GroupsTable';
import CreateGroupModal from '../modal/CreateGroupModal';
import AddFilesModal from '../modal/AddFilesModal'; // استيراد المودال

const MyGroups = () => {
  const { groups, getGroups, loading, error, setSelectedGroup,handleAddFilesToGroup } = useGroups();
  const [modalOpen, setModalOpen] = useState(false);
  const [addFilesModalOpen, setAddFilesModalOpen] = useState(false); // فتح المودال لإضافة الملفات
  const [selectedGroupId, setSelectedGroupId] = useState(null); // تحديد المجموعة التي سيتم إضافة الملفات إليها

  useEffect(() => {
    getGroups(); // تحميل المجموعات مرة واحدة عند تحميل الصفحة
  }, [getGroups]);

  const handleAddFilesClick = (groupId) => {
    setSelectedGroupId(groupId);
    setSelectedGroup(groups.find((group) => group.id === groupId)); // تعيين المجموعة المحددة
    setAddFilesModalOpen(true); // فتح المودال
  };

  return (
    <div>
      <h2>My Groups</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <GroupsTable
        groups={groups}
        onAddFiles={handleAddFilesClick} // عند النقر على إضافة الملفات
      />

      <button onClick={() => setModalOpen(true)}>Create New Group</button>

      <CreateGroupModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <AddFilesModal
        groupId={selectedGroupId}
        isOpen={addFilesModalOpen}
        onClose={() => setAddFilesModalOpen(false)}
        onSubmit={handleAddFilesToGroup} // دالة إرسال الملفات للمجموعة
      />
    </div>
  );
};

export default MyGroups;
