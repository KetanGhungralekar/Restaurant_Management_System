import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, Paper, Box } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/Action";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("Form Values", values);
    dispatch(registerUser({ userData: values, navigate }));
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e3f2fd 30%, #90caf9 90%)",
        padding: 3,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 5,
          borderRadius: "16px", // Rounded corners for Paper
          maxWidth: 1000, // Increased width of the card
          width: "100%",
          boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)", // Stronger shadow for Paper
        }}
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", pb: 3 }}>
          Register
        </Typography>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  name="fullname"
                  as={TextField}
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: "8px", // Rounded input fields
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                    "& .MuiInputLabel-root": {
                      fontWeight: "500",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: "8px", // Rounded input fields
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                    "& .MuiInputLabel-root": {
                      fontWeight: "500",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  sx={{
                    borderRadius: "8px", // Rounded input fields
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                    "& .MuiInputLabel-root": {
                      fontWeight: "500",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Field
                    as={Select}
                    labelId="role-label"
                    id="role"
                    name="role"
                    label="Role"
                    sx={{
                      borderRadius: "8px", // Rounded select box
                    }}
                  >
                    <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                    <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Owner</MenuItem>
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: "0.75rem",
                    fontWeight: "bold",
                    backgroundColor: "#1976d2",
                    boxShadow: "0px 5px 15px rgba(25, 118, 210, 0.4)",
                    borderRadius: "8px", // Rounded button
                    "&:hover": {
                      backgroundColor: "#115293",
                      boxShadow: "0px 8px 20px rgba(17, 82, 147, 0.6)",
                    },
                  }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>

        <Typography variant="body2" align="center" sx={{ mt: 2, color: "gray" }}>
          Already have an account?
        </Typography>

        <Button
          fullWidth
          onClick={() => navigate("/account/login")}
          sx={{
            marginTop: 1,
            color: "#1976d2",
            fontWeight: "500",
            "&:hover": {
              color: "#0d47a1", // Darker shade of blue for hover
              textDecoration: "underline",
            },
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};
