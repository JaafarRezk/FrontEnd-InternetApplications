import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const getAllUsers = async () => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      throw new Error("No token found, user is not logged in.");
    }
  
    const response = await axios.get(`${API_BASE_URL}/allUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

const userService = { getAllUsers };
export default userService;
