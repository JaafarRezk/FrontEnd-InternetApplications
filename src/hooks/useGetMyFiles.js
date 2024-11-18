import { useState, useEffect } from "react";
import fileService from "../services/fileService";

const useGetMyFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);

  const fetchFiles = async (pageUrl = 'http://127.0.0.1:8000/api/file/getMyFiles?page=1') => {
    setLoading(true);
    setError(null);

    try {
      const response = await fileService.getMyFiles(pageUrl); 
      if (response.success) {
        setFiles(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.last_page); 
        setNextPageUrl(response.data.next_page_url);
        setPrevPageUrl(response.data.prev_page_url);
      } else {
        setError("No files found.");
      }
    } catch (err) {
      setError("Error fetching files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
    if (shouldFetch) {
      fetchFiles(currentPage);
      setShouldFetch(false);
    }

    const intervalId = setInterval(() => {
      fetchFiles(currentPage);  
    }, 60000); 

    return () => clearInterval(intervalId);
  }, [currentPage, shouldFetch]);

  return { files, loading, error, fetchFiles, currentPage, totalPages, nextPageUrl, prevPageUrl };
};

export default useGetMyFiles;
