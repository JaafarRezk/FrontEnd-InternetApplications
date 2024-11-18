import React from "react";
import useCheckInMultipleFiles from "../hooks/useCheckInMultipleFiles";

const FileCheckIn = ({ selectedFiles }) => {
  const { checkInMultipleFiles, isLoading, error } = useCheckInMultipleFiles();

  const handleCheckIn = () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to check in.");
      return;
    }
    checkInMultipleFiles(selectedFiles);
  };

  return (
    <div className="file-checkin">
      <h3>Check In Files</h3>
      <button onClick={handleCheckIn} disabled={isLoading}>
        {isLoading ? "Processing..." : "Check In"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FileCheckIn;
