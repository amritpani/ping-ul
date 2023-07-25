import React, { createContext, useEffect, useState } from "react";
import { signIn, validateToken } from "../Services/AuthService";
import { getUser, searchUsers } from "../Services/UsersService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedPingUser, setSelectedPingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // New state for selected user

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateUserToken(token);
    }
  }, []);

  const getUserData = async (token) => {
    try {
      const user = await getUser(token);
      setLoggedInUserId(user._id);
    } catch (error) {
      console.log("Failed to get user data:", error.message);
    }
  };

  const validateUserToken = async (token) => {
    try {
      const userData = await validateToken(token);
      setIsLoggedIn(true);
      setLoggedInUser(userData);
    } catch (error) {
      // Handle error
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const data = await signIn(email, password);
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setLoginError(false);
      setLoggedInUser(data.user);
    } catch (error) {
      console.log("Login failed:", error.message);
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setLoggedInUserId(null);
  };

  const handleSearchUsers = async (pingId) => {
    try {
      const users = await searchUsers(pingId);
      setSelectedPingUser(users[0]); // Set the selected user as the first user from the search results
    } catch (error) {
      console.log("Search users failed:", error.message);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user); // Set the selected user
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loginError,
        loggedInUserId,
        loggedInUser,
        selectedPingUser,
        selectedUser, // Add selectedUser to the context
        handleLogin,
        handleLogout,
        handleSearchUsers,
        handleSelectUser, // Add handleSelectUser to the context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
