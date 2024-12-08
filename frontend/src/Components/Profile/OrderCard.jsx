import { Button, Card } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const OrderCard = ({ item, order }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/my-profile/orders/details/${order.id}`);
    };

    return (
        <Card 
            className="p-5 flex justify-between items-center cursor-pointer" 
            onClick={handleCardClick}
            sx={{
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)"
                }
            }}
        >
            <div className="flex items-center space-x-5">
                <img className="object-cover h-16 w-16" src={item.food.images[0]} alt={item.food.name} />
                <div>
                    <p>{item.food.name}</p>
                    <p>${item.totalPrice}</p>
                </div>
            </div>
            <div>
                <Button 
                    className="cursor-not-allowed" 
                    sx={{ pointerEvents: "none" }}
                >
                    {order.status}
                </Button>
            </div>
        </Card>
    );
};
