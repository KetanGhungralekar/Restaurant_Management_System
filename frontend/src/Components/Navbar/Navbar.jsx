import { Avatar, Badge, Box, IconButton, Button } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Navbar.css";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
    const { auth, cart } = useSelector((store) => store);
    const navigate = useNavigate();
    const handleAvatar = () => {
        navigate("/my-profile");
    };
    return (
        <Box
            className="px-5 sticky top-0 z-50 py-[0.8rem] bg-[#111827] lg:px-20 flex justify-between"
            sx={{
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)", 
            }}
        >
            {/* Logo Section */}
            <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
                <li
                    onClick={() => { navigate("/"); }}
                    className="logo font-semibold text-gray-300 text-2xl"
                    style={{
                        fontFamily: "'Roboto', sans-serif",
                    }}
                >
                    FeastFinder Hub
                </li>
            </div>

            {/* Right Side Icons (Search, Avatar, Cart, Role-Based Button) */}
            <div className='flex items-center space-x-2 lg:space-x-10'>
                {/* Search Icon */}
                <IconButton
                    sx={{
                        color: "#FFFFFF", 
                        "&:hover": { 
                            backgroundColor: "#4B5563", 
                            borderRadius: "50%" 
                        }
                    }}
                >
                    <SearchIcon sx={{ fontSize: "1.5rem" }} />
                </IconButton>

                {/* Role-Based Navigation Button */}
                {auth.user?.role === "ROLE_ADMIN" && (
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/admin")}
                        sx={{
                            padding: "0.75rem",
                            fontWeight: "bold",
                            backgroundColor: "#1976d2",
                            boxShadow: "0px 5px 15px rgba(25, 118, 210, 0.4)",
                            borderRadius: "8px",
                            "&:hover": {
                                backgroundColor: "#115293",
                                boxShadow: "0px 8px 20px rgba(17, 82, 147, 0.6)",
                            },
                        }}
                    >
                        Admin Panel
                    </Button>
                )}
                {auth.user?.role === "ROLE_RESTAURANT_OWNER" && (
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/admin/restaurants")}
                        sx={{
                            padding: "0.75rem",
                            fontWeight: "bold",
                            backgroundColor: "#1976d2",
                            boxShadow: "0px 5px 15px rgba(25, 118, 210, 0.4)",
                            borderRadius: "8px",
                            "&:hover": {
                                backgroundColor: "#115293",
                                boxShadow: "0px 8px 20px rgba(17, 82, 147, 0.6)",
                            },
                        }}
                    >
                        Owner Dashboard
                    </Button>
                )}

                {/* Avatar or Login */}
                {auth.user ? (
                    <Avatar
                        onClick={handleAvatar}
                        sx={{
                            bgcolor: "#2D3748",
                            color: "#FFFFFF",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "#374151",
                            },
                        }}
                    >
                        {auth.user?.fullname[0].toUpperCase()}
                    </Avatar>
                ) : (
                    <IconButton onClick={() => navigate("account/login")}>
                        <Person sx={{ color: "#FFFFFF" }} />
                    </IconButton>
                )}

                {/* Shopping Cart Icon */}
                <IconButton
                    onClick={() => navigate("/cart")}
                    sx={{
                        color: "#FFFFFF", 
                        "&:hover": { 
                            backgroundColor: "#4B5563", 
                            borderRadius: "50%" 
                        }
                    }}
                >
                    <Badge color="secondary" badgeContent={cart.cartItems.length}>
                        <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
                    </Badge>
                </IconButton>
            </div>
        </Box>
    );
};
