import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const uploadFiles = async (files) => {
  const formData = new FormData();
  const filesArray = Array.from(files);

  filesArray.forEach((file) => formData.append("files[]", file));

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, user is not logged in.");
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/file/uploadFiles`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to upload files.");
    }
  } catch (error) {
    console.error("Error uploading files:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};



const getMyFiles = async (pageUrl = `${API_BASE_URL}/file/getMyFiles?page=1`) => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    throw new Error("No token found, user is not logged in.");
  }

  try {
    const response = await axios.get(pageUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;

  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching files");
  }
};


// Fetch files with pagination
const getAllFiles = async (pageUrl = `${API_BASE_URL}/file/getAllFiles?page=1`) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, user is not logged in.");
  }

  try {
    const response = await axios.get(pageUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;

  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching files");
  }
};

const checkInMultipleFiles = async (fileIds) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, user is not logged in.");
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/file/checkInMultipleFiles`, { fileIds }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to check-in files.");
    }
  } catch (error) {
    console.error("Error checking in files:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

const checkoutFile = async (fileId, newFile) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, user is not logged in.");
  }

  const formData = new FormData();
  formData.append("id", fileId);
  formData.append("file", newFile);

  try {
    const response = await axios.post(`${API_BASE_URL}/file/checkOut`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to checkout file.");
    }
  } catch (error) {
    console.error("Error checking out file:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};


const fileService = { getMyFiles, uploadFiles, checkInMultipleFiles,checkoutFile ,getAllFiles};

export default fileService;