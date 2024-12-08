import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Typography, Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../State/Authentication/Action";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(store => store);

    const HandleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <Box 
            className="min-h-[80vh] flex justify-center items-center"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                background: "linear-gradient(135deg, #e0f7fa 30%, #80deea 90%)",
                padding: 4,
                borderRadius: 3,
                boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.2)"
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: "400px",  // Increased width
                    padding: 4,
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0px 5px 20px rgba(0,0,0,0.3)",
                    transform: "translateY(0)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0px 10px 30px rgba(0,0,0,0.4)"
                    }
                }}
            >
                <AccountCircleIcon 
                    sx={{
                        fontSize: "9rem", 
                        color: "#26c6da", 
                        transition: "all 0.3s ease",
                        "&:hover": {
                            color: "#00acc1",
                            transform: "scale(1.1)"
                        }
                    }}
                />
                
                <Typography 
                    variant="h4" 
                    sx={{ fontWeight: "bold", marginTop: 3 }}
                >
                    {auth.user?.fullname || "User Name"}
                </Typography>
                
                <Typography 
                    variant="body1" 
                    sx={{ color: "gray", marginTop: 1 }}
                >
                    {auth.user?.email || "user@example.com"}
                </Typography>
                
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={HandleLogout}
                    sx={{
                        marginTop: 4,
                        padding: "0.75rem 2rem",
                        fontSize: "1rem",
                        background: "#00838f",
                        boxShadow: "0px 4px 15px rgba(0, 131, 143, 0.4)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            background: "#006064",
                            boxShadow: "0px 6px 20px rgba(0, 96, 100, 0.6)"
                        }
                    }}
                >
                    Logout
                </Button>
            </Paper>
        </Box>
    );
};
