import React, { useState } from 'react';

const AddFilesModal = ({ groups, files, selectedFileIds, onFileSelect, onClose, onSubmit }) => {
  // حالة لتخزين معرّف المجموعة المختارة
  const [selectedGroupId, setSelectedGroupId] = useState("");

  // تحديث معرّف المجموعة عند الاختيار
  const handleGroupChange = (event) => {
    setSelectedGroupId(event.target.value);
  };

  const handleSubmit = () => {
    if (!selectedGroupId) {
      alert('Please select a group.');
      return;
    }
    if (selectedFileIds.length === 0) {
      alert('Please select at least one file.');
      return;
    }

    // تنفيذ الدالة مع البيانات المختارة
    onSubmit(selectedGroupId, selectedFileIds);
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Files to Group</h3>

        {/* اختيار المجموعة */ }
        <label htmlFor="group-select">Select Group:</label>
        <select id="group-select" value={ selectedGroupId } onChange={ handleGroupChange }>
          <option value="">-- Select Group --</option>
          { groups.map((group) => (
            <option key={ group.id } value={ group.id }>
              { group.name }
            </option>
          )) }
        </select>

        {/* اختيار الملفات */ }
        <h4>Select Files:</h4>
        <ul className="file-list">
          { files.map((file) => (
            <li key={ file.id }>
              <label>
                <input
                  type="checkbox"
                  value={ file.id }
                  checked={ selectedFileIds.includes(file.id) }
                  onChange={ () => onFileSelect(file.id) } // تحديد/إلغاء تحديد الملف
                />
                { file.name }
              </label>
            </li>
          )) }
        </ul>

        <div className="modal-actions">
          <button
            onClick={ handleSubmit }
            disabled={ !selectedGroupId || selectedFileIds.length === 0 }
          >
            Submit ({ selectedFileIds.length } Files)
          </button>
          <button onClick={ onClose }>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddFilesModal;
