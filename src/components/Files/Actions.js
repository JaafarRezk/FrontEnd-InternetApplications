import React from 'react';

const Actions = ({ onCheckIn, disableCheckIn }) => (
  <div className="actions">
    <button
      onClick={onCheckIn}
      disabled={disableCheckIn}
      className="action-button"
    >
      Check In Selected Files
    </button>
  </div>
);

export default Actions;
