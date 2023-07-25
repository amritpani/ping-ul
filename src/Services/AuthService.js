//AuthService.js
import axios from "axios";

const API_BASE_URL = "https://ping-ul-backend.loca.lt/api";

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signIn`, {
      email,
      password,
    });
    const token = response.data;
    return token;
  } catch (error) {
    throw new Error("Signin failed");
  }
};

export const signUp = async (name, gender, email, password, contactNumber) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signUp`, {
      name,
      gender,
      email,
      password,
      contactNumber,
    });
    const token = response.data.token;

    // Save token in localStorage
    localStorage.setItem("token", token);

    return token;
  } catch (error) {
    console.log("Signup failed:", error);
    console.log("Response:", error.response);
    throw new Error("Signup failed");
  }
};

export const validateToken = async (token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/validateToken`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Token validation failed");
  }
};
