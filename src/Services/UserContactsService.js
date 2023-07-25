//UserContactsService.js
import axios from "axios";

const API_BASE_URL = "https://ping-ul-amrit-backend.loca.lt/api";
const access_token = localStorage.getItem("token");
export const getContacts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contacts`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Get contacts failed:", error);
    console.log("Response:", error.response);
    throw new Error("Get contacts failed");
  }
};

export const updateUserContact = async (userId, contactData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/contacts/${userId}`,
      contactData
    );

    return response.data;
  } catch (error) {
    console.log("Update user contact failed:", error);
    console.log("Response:", error.response);
    throw new Error("Update user contact failed");
  }
};
