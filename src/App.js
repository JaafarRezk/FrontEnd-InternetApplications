import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import LogInPage from './pages/AuthPages/LoginPage';
import RegisterPage from './pages/AuthPages/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import FileManagementPage from './pages/FileManagement/FileManagementPage';
import GroupManagementPage from './pages/GroupManagement/GroupManagementPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />

              </ProtectedRoute>
            }
          />
            <Route path="/file-management" element={<FileManagementPage />} />
            <Route path="/group-management" element={<GroupManagementPage />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
