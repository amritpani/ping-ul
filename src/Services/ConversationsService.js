//ConversationService.js
import axios from "axios";

const API_BASE_URL = "https://ping-ul-amrit-backend.loca.lt/api";
const access_token = localStorage.getItem("token");
export const createConversation = async (type, users) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/conversations`, {
      type,
      users,
    });

    return response.data;
  } catch (error) {
    console.log("Create conversation failed:", error);
    console.log("Response:", error.response);
    throw new Error("Create conversation failed");
  }
};

export const getConversations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/conversations`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Get conversations failed:", error);
    console.log("Response:", error.response);
    throw new Error("Get conversations failed");
  }
};
