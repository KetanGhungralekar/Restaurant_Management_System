import React, { useEffect } from "react";
import { OrderCard } from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get_users_orders } from "../State/Order/Action";
import { Typography, Box, Paper } from "@mui/material";

export const Orders = () => {
    const dispatch = useDispatch();
    const { cart, auth, order } = useSelector((store) => store);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(get_users_orders(token));
    }, [auth.token]);

    return (
        <Box 
            className="min-h-screen flex flex-col items-center py-10" 
            sx={{
                background: "linear-gradient(145deg, #e0f2f1, #b2ebf2)",
                padding: 4,
            }}
        >
            <Typography 
                variant="h4" 
                sx={{
                    fontWeight: "bold", 
                    color: "#00695c", 
                    mb: 4,
                    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)"
                }}
            >
                My Orders
            </Typography>
            
            <Box 
                className="w-full lg:w-1/2" 
                sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: 3 
                }}
            >
                {order.orders.map((order) =>
                    order.orderItems.map((item) => (
                        <Paper
                            key={item.id}
                            elevation={6}
                            sx={{
                                padding: 3,
                                borderRadius: "15px",
                                background: "#ffffff",
                                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
                                transform: "translateY(0)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
                                },
                            }}
                        >
                            <OrderCard order={order} item={item} />
                        </Paper>
                    ))
                )}
            </Box>
        </Box>
    );
};
