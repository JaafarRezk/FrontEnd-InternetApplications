import React, { useEffect, useState } from "react";
import "../styles/MainSection.css";
import useLogin from "../hooks/useLogin";
import useGetMyFiles from "../hooks/useGetMyFiles";
import useUploadFiles from "../hooks/useUploadFiles";
import useCheckInMultipleFiles from "../hooks/useCheckInMultipleFiles";
import useCheckout from "../hooks/useCheckout"; // استيراد hook الـ checkout الجديد

const MainSection = ({ currentView, isSidebarHovered }) => {
  const { user } = useLogin();
  const { files, loading, error, fetchFiles, currentPage, totalPages, nextPageUrl, prevPageUrl } = useGetMyFiles();
  const { uploadedFiles, isLoading: uploading, error: uploadError, handleFileUpload } = useUploadFiles();
  const { checkInMultipleFiles, loading: checkInLoading, error: checkInError, success: checkInSuccess } = useCheckInMultipleFiles();
  const { checkout, loading: checkoutLoading, error: checkoutError, success: checkoutSuccess } = useCheckout(); // استخدام hook الـ checkout الجديد

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFileForCheckout, setSelectedFileForCheckout] = useState(null); // حالة لحفظ الملف الذي سيُرفع كبديل
  const [newFile, setNewFile] = useState(null); // حالة لحفظ الملف الذي سيرتفع

  useEffect(() => {
    if (user && currentView === "myFiles" && files.length === 0) {
      fetchFiles();
    }
  }, [user, currentView, files, fetchFiles]);

  // Functions for pagination
  const prevPage = () => {
    if (prevPageUrl) fetchFiles(prevPageUrl);
  };

  const nextPage = () => {
    if (nextPageUrl) fetchFiles(nextPageUrl);
  };

  // تعديل دالة التعامل مع الاختيارات لتسمح باختيار عدة ملفات
  const handleFileSelect = (file) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.includes(file.id)
        ? prevSelectedFiles.filter((id) => id !== file.id)
        : [...prevSelectedFiles, file.id]
    );
  };

  // دالة الـ CheckIn لعدة ملفات
  const handleCheckInMultiple = () => {
    checkInMultipleFiles(selectedFiles);
  };

  // دالة الـ Checkout لرفع الملف البديل
  const handleCheckout = (file) => {
    setSelectedFileForCheckout(file); // تعيين الملف المحجوز الذي سيتم رفع بديل له
  };

  // دالة عند اختيار الملف الجديد
  const handleFileChange = (e) => {
    setNewFile(e.target.files[0]); // حفظ الملف الجديد الذي سيتم رفعه
  };

  // دالة لإرسال الملف الجديد إلى الـ API بعد اختيار الملف
  const submitCheckout = () => {
    if (newFile && selectedFileForCheckout) {
      checkout(selectedFileForCheckout.id, newFile); // إرسال الملف الجديد مع الملف المحجوز
    } else {
      alert("Please select a new file to upload.");
    }
  };

  // File action handlers
  const handleView = (file) => {
    alert(`Viewing file: ${file.name}`);
  };

  const handleDownload = (file) => {
    alert(`Downloading file: ${file.name}`);
  };

  const handleDelete = (file) => {
    if (window.confirm(`Are you sure you want to delete ${file.name}?`)) {
      alert(`File ${file.name} deleted.`);
    }
  };

  const onFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  // Render content based on current view
  const renderContent = () => {
    if (currentView === "myFiles") {
      return (
        <>
          {uploading && <p>Uploading files...</p>}
          {uploadError && <p className="error-message">{uploadError}</p>}
          {loading && <p>Loading your files...</p>}
          {error && <p className="error-message">{error}</p>}
          {checkInLoading && <p>Processing CheckIn...</p>}
          {checkInError && <p className="error-message">{checkInError}</p>}
          {checkInSuccess && <p className="success-message">{checkInSuccess}</p>}
          {checkoutLoading && <p>Processing Checkout...</p>}
          {checkoutError && <p className="error-message">{checkoutError}</p>}
          {checkoutSuccess && <p className="success-message">{checkoutSuccess}</p>}

          <div className="files-list">
            {files.length > 0 || uploadedFiles.length > 0 ? (
              [...files, ...uploadedFiles].map((file) => (
                <div key={file.id} className="file-item">
                  <p><strong>Name:</strong> {file.name}</p>
                  <p><strong>Size:</strong> {file.size} bytes</p>
                  <p><strong>Type:</strong> {file.mime_type}</p>
                  <p><strong>Path:</strong> {file.path}</p>
                  <div className="file-actions">
                    <button onClick={() => handleView(file)}>View</button>
                    <button onClick={() => handleDownload(file)}>Download</button>
                    <button onClick={() => handleDelete(file)} className="danger">Delete</button>

                    {/* عرض زر Checkout بجانب مربع الاختيار */}
                    {file.checked === 1 && (
                      <div className="checkout-actions">
                        <button onClick={() => handleCheckout(file)} className="checkout-button">
                          Checkout
                        </button>
                        <input
                          type="checkbox"
                          onChange={() => handleCheckout(file)} // تخصيص الإجراء عند تغيير الاختيار
                        />
                      </div>
                    )}

                    {/* عرض زر Select for CheckIn إذا كان الملف غير محجوز */}
                    {file.checked === 0 && (
                      <button onClick={() => handleFileSelect(file)}>
                        {selectedFiles.includes(file.id) ? "Deselect" : "Select"} for Check In
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No files found.</p>
            )}
          </div>

          {/* عرض مربع حوار لاختيار الملف البديل بعد الضغط على Checkout */}
          {selectedFileForCheckout && (
            <div className="checkout-modal">
              <h3>Upload new file for checkout</h3>
              <input type="file" onChange={handleFileChange} />
              <button onClick={submitCheckout} className="submit-checkout">
                Submit Checkout
              </button>
            </div>
          )}

          {/* زر "Check In Multiple" يظهر عند تحديد ملفات */}
          <div className="checkin-multiple">
            {selectedFiles.length > 0 && (
              <button onClick={handleCheckInMultiple} className="checkin-button">
                Check In Selected Files
              </button>
            )}
          </div>

          <div className="pagination-controls">
            <button onClick={prevPage} disabled={!prevPageUrl}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={nextPage} disabled={!nextPageUrl}>
              Next
            </button>
          </div>

          <div className="upload-files">
            <h3>Upload New Files</h3>
            <input type="file" multiple onChange={onFileChange} />
          </div>
        </>
      );
    }

    return <p>Please select an option from the sidebar to view content.</p>;
  };

  return (
    <main className={`main-section ${isSidebarHovered ? "expanded" : ""}`}>
      <h2>Welcome {user ? user.name : "User"}</h2>
      {renderContent()}
    </main>
  );
};

export default MainSection;
