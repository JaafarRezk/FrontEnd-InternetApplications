import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/auth";

const register = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, formData);
  if (response.data.success) {
    const userData = response.data.data.user; 
    const token = response.data.data.token;  
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  return response.data;
};
}

const login = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/logIn`, formData);
  if (response.data.success) {
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
  }
  return response.data;
};

const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, user is not logged in.");
  }

  const response = await axios.post(
    `${API_BASE_URL}/logOut`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return response.data;
};

const authService = { register, login, logout };

export default authService;
