import React from "react";
import useCheckout from "../hooks/useCheckout";

const FileCheckOut = ({ selectedFile }) => {
  const { checkout, isLoading, error } = useCheckout();

  const handleCheckOut = () => {
    if (!selectedFile) {
      alert("Please select a file to check out.");
      return;
    }
    checkout(selectedFile.id);
  };

  return (
    <div className="file-checkout">
      <h3>Check Out File</h3>
      <button onClick={handleCheckOut} disabled={isLoading}>
        {isLoading ? "Processing..." : "Check Out"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FileCheckOut;
