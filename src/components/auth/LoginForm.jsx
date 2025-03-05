import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Alert,
} from "@mui/material";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Here you would implement actual authentication logic
        console.log("Login values:", values);
        // Simulate successful login
        localStorage.setItem(
          "user",
          JSON.stringify({ email: values.email, role: "user" })
        );
        navigate("/");
      } catch (err) {
        setError("Invalid email or password. Please try again.");
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Login to ReTech
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>

      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body2">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link to="/forgot-password">Forgot password?</Link>
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }}>OR</Divider>

      <SocialLogin />
    </Box>
  );
};

export default LoginForm;
