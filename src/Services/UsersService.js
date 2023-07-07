import axios from "axios";

const API_BASE_URL = "https://ping-ul-backend.loca.lt/api";

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);

    return response.data;
  } catch (error) {
    console.log("Get user failed:", error);
    console.log("Response:", error.response);
    throw new Error("Get user failed");
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/${userId}`,
      userData
    );

    return response.data;
  } catch (error) {
    console.log("Update user failed:", error);
    console.log("Response:", error.response);
    throw new Error("Update user failed");
  }
};

export const searchUsers = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/search/${userId}`);

    return response.data;
  } catch (error) {
    console.log("Search users failed:", error);
    console.log("Response:", error.response);
    throw new Error("Search users failed");
  }
};
