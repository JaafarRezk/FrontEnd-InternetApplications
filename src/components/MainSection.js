import React, { useEffect, useState } from "react";
import "../styles/MainSection.css";
import useLogin from "../hooks/useLogin";
import useGetMyFiles from "../hooks/useGetMyFiles";
import useGetAllFiles from "../hooks/useGetAllFiles";
import FileList from "./FileList";
import FileUpload from "./FileUpload"; 
import FileCheckIn from "./FileCheckIn"; 
import FileCheckOut from "./FileCheckOut"; 

const MainSection = ({ currentView, isSidebarHovered }) => {
  const { user } = useLogin();

  const {
    files: myFiles,
    loading: myFilesLoading,
    error: myFilesError,
    fetchFiles: fetchMyFiles,
    currentPage: myFilesPage,
    totalPages: myFilesTotalPages,
    nextPageUrl: myFilesNextPageUrl,
    prevPageUrl: myFilesPrevPageUrl,
  } = useGetMyFiles();

  const {
    allFiles,
    isLoading: allFilesLoading,
    fetchError: allFilesError,
    fetchAllFiles,
    currentPage: allFilesPage,
    totalPages: allFilesTotalPages,
    nextPageUrl: allFilesNextPageUrl,
    prevPageUrl: allFilesPrevPageUrl,
  } = useGetAllFiles();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFileForCheckout, setSelectedFileForCheckout] = useState(null);

  useEffect(() => {
    if (user && currentView) {
      if (currentView === "myFiles" && myFiles.length === 0) {
        console.log("Fetching My Files...");
        fetchMyFiles();
      }
      if (currentView === "allFiles" && allFiles.length === 0) {
        console.log("Fetching All Files...");
        fetchAllFiles();
      }
    }
  }, [user, currentView]);

  const handleFileSelect = (file) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.includes(file.id)
        ? prevSelectedFiles.filter((id) => id !== file.id)
        : [...prevSelectedFiles, file.id]
    );
  };

  const renderContent = () => {
    const isMyFiles = currentView === "myFiles";
    const files = isMyFiles ? myFiles : allFiles;
    const loading = isMyFiles ? myFilesLoading : allFilesLoading;
    const error = isMyFiles ? myFilesError : allFilesError;
    const nextPageUrl = isMyFiles ? myFilesNextPageUrl : allFilesNextPageUrl;
    const prevPageUrl = isMyFiles ? myFilesPrevPageUrl : allFilesPrevPageUrl;
    const fetchFiles = isMyFiles ? fetchMyFiles : fetchAllFiles;

    return (
      <>
        <FileList
          files={files}
          loading={loading}
          error={error}
          selectedFiles={selectedFiles}
          onFileSelect={handleFileSelect}
          onView={(file) => alert(`Viewing file: ${file.name}`)}
          onDownload={(file) => alert(`Downloading file: ${file.name}`)}
          onDelete={(file) => alert(`Deleting file: ${file.name}`)}
          onCheckout={(file) => setSelectedFileForCheckout(file)}
        />

        <div className="pagination-controls">
          <button onClick={() => fetchFiles(prevPageUrl)} disabled={!prevPageUrl}>
            Previous
          </button>
          <span>
            Page {isMyFiles ? myFilesPage : allFilesPage} of{" "}
            {isMyFiles ? myFilesTotalPages : allFilesTotalPages}
          </span>
          <button onClick={() => fetchFiles(nextPageUrl)} disabled={!nextPageUrl}>
            Next
          </button>
        </div>
      </>
    );
  };

  return (
    <main className={`main-section ${isSidebarHovered ? "expanded" : ""}`}>
      <h2>Welcome {user ? user.name : "User"}</h2>
      {renderContent()}

      <FileUpload/>

      <FileCheckIn selectedFiles={selectedFiles} />

      <FileCheckOut selectedFile={selectedFileForCheckout} />
    </main>
  );
};

export default MainSection;
