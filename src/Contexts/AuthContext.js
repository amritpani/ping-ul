import React, { createContext, useEffect, useState } from "react";
import { signIn } from "../Services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const token = await signIn(email, password);
      localStorage.setItem("token", token); // Save token in localStorage
      setIsLoggedIn(true);
      setLoginError(false);
    } catch (error) {
      console.log("Login failed:", error.message);
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loginError,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
