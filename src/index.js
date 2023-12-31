import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./Contexts/AuthContext";
import { CssBaseline } from "@mui/material";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <React.StrictMode>
    <CssBaseline />
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
