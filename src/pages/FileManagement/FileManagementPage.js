import React, { useState } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';  // Import Sidebar
import Header from '../../components/Dashboard/Header';
import ToolBar from '../../components/Dashboard/ToolBar';
import MyFiles from '../../components/Files/MyFiles';
import AllFiles from '../../components/Files/AllFiles';
import UploadFiles from '../../components/Files/UploadFiles';
import { FileProvider } from '../../contexts/FileContext';
import '../../styles/Pages/FileManagement.css';
import { Container } from '@mui/material';

const FileManagementPage = () => {
    const [selectedView, setSelectedView] = useState('myFiles');
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    const handleSelectFile = (fileId) => {
        setSelectedFiles((prevSelected) =>
            prevSelected.includes(fileId)
                ? prevSelected.filter((id) => id !== fileId)
                : [...prevSelected, fileId]
        );
    };

    const handleCheckInSelected = () => {
        console.log('Checked in files:', selectedFiles);
        setSelectedFiles([]); // Clear selected files after check-in
    };

    return (
        <FileProvider>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <div style={{ display: 'flex', flex: 1 }}>
                    <Sidebar onViewChange={handleViewChange} />

                    <div style={{ flex: 1, marginLeft: '250px' }}>
                        <Container className="file-management-container">
                            <h1 className="page-title">File Management</h1>
                            <ToolBar 
                                handleCheckInSelected={handleCheckInSelected} 
                                selectedFiles={selectedFiles} 
                            />
                            {selectedView === 'myFiles' && (
                                <MyFiles 
                                    selectedFiles={selectedFiles} 
                                    handleSelectFile={handleSelectFile} 
                                    handleCheckInSelected={handleCheckInSelected} 
                                />
                            )}
                            {selectedView === 'allFiles' && <AllFiles />}
                            {selectedView === 'upload' && <UploadFiles />}
                        </Container>
                    </div>
                </div>
            </div>
        </FileProvider>
    );
};

export default FileManagementPage;
