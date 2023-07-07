import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ChatUiPage from "./ChatUiPage";
import { AuthContext } from "../Contexts/AuthContext";

const LoginPage = () => {
  const { isLoggedIn, loginError, handleLogin } = useContext(AuthContext);
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/chat"); // Redirect to ChatUiPage if user is logged in
    }
  }, [isLoggedIn, navigate]);
  const onSubmit = async (values) => {
    try {
      await handleLogin(values.email, values.password); // Call the handleLogin function from the AuthContext
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const { values, touched, errors, handleChange, handleSubmit } = formik;

  const handleMoveToSignup = () => {
    navigate("/registration");
  };

  if (isLoggedIn) {
    return <ChatUiPage />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={500}
          alignItems={"center"}
          justifyContent={"center"}
          margin="auto"
          marginTop={3}
          padding={2}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h4" padding={2} textAlign={"center"}>
            Login
          </Typography>
          <TextField
            onChange={handleChange}
            name="email"
            value={values.email}
            error={touched.email && (errors.email || loginError)}
            helperText={touched.email && errors.email}
            margin="normal"
            type="email"
            variant="outlined"
            placeholder="Email"
          />
          <TextField
            onChange={handleChange}
            name="password"
            value={values.password}
            error={touched.password && errors.password}
            helperText={touched.password && errors.password}
            margin="normal"
            type="password"
            variant="outlined"
            placeholder="Password"
          />
          <Button
            endIcon={<LockOpenOutlinedIcon />}
            type="submit"
            sx={{ marginTop: 2, borderRadius: 3 }}
            variant="contained"
            color="warning"
          >
            Login
          </Button>
          <Button
            endIcon={<LockOpenOutlinedIcon />}
            onClick={handleMoveToSignup}
            sx={{ marginTop: 2, borderRadius: 3 }}
          >
            MOVE TO Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginPage;
