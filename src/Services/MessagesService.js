import axios from "axios";

const API_BASE_URL = "https://ping-ul-backend.loca.lt/api";

export const createMessage = async (conversationGroupId, text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/messages`, {
      conversation_group_id: conversationGroupId,
      text,
    });

    return response.data;
  } catch (error) {
    console.log("Create message failed:", error);
    console.log("Response:", error.response);
    throw new Error("Create message failed");
  }
};

export const getMessages = async (conversationGroupId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/messages/${conversationGroupId}`
    );

    return response.data;
  } catch (error) {
    console.log("Get messages failed:", error);
    console.log("Response:", error.response);
    throw new Error("Get messages failed");
  }
};

export const deleteMessage = async (messageId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/messages/${messageId}`
    );

    return response.data;
  } catch (error) {
    console.log("Delete message failed:", error);
    console.log("Response:", error.response);
    throw new Error("Delete message failed");
  }
};
