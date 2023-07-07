import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
//
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { signUp } from "../Services/AuthService";
import ChatUiPage from "./ChatUiPage";

const RegistrationPage = () => {
  const initialValues = {
    name: "",
    gender: "",
    email: "",
    password: "",
    contactNumber: "",
  };
  const [isSignup, setisSignup] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [emailMismatchError, setEmailMismatchError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await signUp(
        values.name,
        values.gender,
        values.email,
        values.password,
        values.contactNumber
      );
    } catch (error) {
      console.log("Signup failed:", error);
      if (error.message === "Email is not correct") {
        setEmailMismatchError(true);
      } else {
        console.log("Unexpected error occurred");
      }
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    if (!values.gender) {
      errors.gender = "Gender is required";
    }

    if (!values.contactNumber) {
      errors.contactNumber = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(values.contactNumber)) {
      errors.contactNumber = "Mobile Number must be a 10-digit number";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const { values, touched, errors, handleChange, handleSubmit } = formik;

  const resetState = () => {
    setisSignup(!isSignup);
    formik.resetForm();
  };

  const handleMoveToLogin = () => {
    navigate("/");
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
            Signup
          </Typography>
          <TextField
            onChange={handleChange}
            name="name"
            value={values.name}
            error={touched.name && errors.name}
            helperText={touched.name && errors.name}
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Name"
          />
          <RadioGroup
            name="gender"
            value={values.gender}
            onChange={handleChange}
            padding={100}
            row
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel
              value="others"
              control={<Radio />}
              label="Others"
            />
          </RadioGroup>
          <TextField
            onChange={handleChange}
            name="email"
            value={values.email}
            error={touched.email && (errors.email || emailMismatchError)}
            helperText={touched.email && errors.email}
            margin="normal"
            type={"email"}
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
            type={"password"}
            variant="outlined"
            placeholder="Password"
          />
          <TextField
            onChange={handleChange}
            name="contactNumber"
            value={values.contactNumber}
            error={touched.contactNumber && errors.contactNumber}
            helperText={touched.contactNumber && errors.contactNumber}
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Mobile Number"
          />
          <Button
            endIcon={<HowToRegOutlinedIcon />}
            type="submit"
            sx={{ marginTop: 2, borderRadius: 3 }}
            variant="contained"
            color="warning"
          >
            Signup
          </Button>
          <Button
            endIcon={<HowToRegOutlinedIcon />}
            onClick={handleMoveToLogin}
            sx={{ marginTop: 2, borderRadius: 3 }}
          >
            MOVE TO Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default RegistrationPage;
