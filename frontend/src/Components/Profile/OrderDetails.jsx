import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { get_order_by_id } from "../State/Order/Action";

export const OrderDetails = () => {
    const { id } = useParams();
    const [order1, setOrder] = useState(null);
    const dispatch = useDispatch();
    const { order } = useSelector((store) => store);
    const token = localStorage.getItem("token");
    console.log(order);
    useEffect(() => {
        const fetchOrderDetails = async () => {
            const mockOrder = {
                id,
                status: "Delivered",
                totalPrice: 42.99,
                items: [
                    {
                        id: 1,
                        food: { name: "Pizza", images: ["https://example.com/pizza.jpg"] },
                        quantity: 2,
                        price: 10.99
                    },
                    {
                        id: 2,
                        food: { name: "Burger", images: ["https://example.com/burger.jpg"] },
                        quantity: 1,
                        price: 5.99
                    }
                ],
            };
            setOrder(mockOrder);
            dispatch(get_order_by_id({id : id,
                token: token
            }))
        };
        fetchOrderDetails();
    }, [id]);

    if (!order1) return <Typography>Loading...</Typography>;

    return (
        <Box 
            sx={{
                minHeight: "100vh",
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "linear-gradient(145deg, #e0f2f1, #b2ebf2)"
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#00695c", mb: 4 }}>
                Order Details
            </Typography>
            
            <Paper
                sx={{
                    padding: 4,
                    width: "100%",
                    maxWidth: "600px",
                    borderRadius: "15px",
                    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>Order ID: {order1.id}</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>Status: {order1.status}</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>Total Price: ${order1.totalPrice.toFixed(2)}</Typography>

                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Items:</Typography>
                {order1.items.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                            padding: 2,
                            borderRadius: "8px",
                            backgroundColor: "#fafafa",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <img 
                            src={item.food.images[0]} 
                            alt={item.food.name} 
                            style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px", marginRight: "16px" }}
                        />
                        <Box>
                            <Typography variant="body1">{item.food.name}</Typography>
                            <Typography variant="body2">Quantity: {item.quantity}</Typography>
                            <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
                        </Box>
                    </Box>
                ))}

                <Button 
                    variant="contained" 
                    sx={{ mt: 3, backgroundColor: "#00695c" }}
                    onClick={() => alert("Reorder functionality to be implemented.")}
                >
                    Reorder
                </Button>
            </Paper>
        </Box>
    );
};
