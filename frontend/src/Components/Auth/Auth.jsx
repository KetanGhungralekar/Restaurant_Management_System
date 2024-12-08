import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { initialValues, style } from "../Cart/Cart";
import { Field, Form, Formik } from "formik";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./Register";


export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleOnclose = () => {
    navigate("/");
  }
  return (
    <>
      <Modal
        open={
          location.pathname === "/account/login" ||
          location.pathname === "/account/register"
        }
        onClose={handleOnclose}
        className=""
      >
        <Box sx={style}>
            {location.pathname === "/account/login" ? <LoginForm/> : <RegisterForm/>}
        </Box>
      </Modal>
    </>
  );
};
