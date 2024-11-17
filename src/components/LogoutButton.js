import React from "react";
import useLogin from "../hooks/useLogin";

const LogoutButton = () => {
  const { logout, loading, message } = useLogin();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LogoutButton;
