// import { Card, Chip, IconButton, Box, Typography } from "@mui/material";
// import React from "react";
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Addtofavourites } from "../State/Authentication/Action";
// import { isPresentinFavourites } from "../config/logic";

// export const RestaurantCard = ({ item }) => {
//     const auth = useSelector((store) => store.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const token = localStorage.getItem("token");

//     const handleAddToFavourite = () => {
//         dispatch(Addtofavourites({ token, restaurantId: item.id }));
//     };

//     const handleNavigatetoRestaurant = () => {
//         if (item.open) {
//             navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
//         }
//     };

//     return (
//         <Card
//             onClick={handleNavigatetoRestaurant}
//             className={`m-5 w-[17rem] ${item.open ? 'cursor-pointer' : 'cursor-not-allowed'}`}
//             sx={{
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                 "&:hover": item.open && {
//                     transform: "translateY(-10px) scale(1.03)",
//                     boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
//                 },
//             }}
//         >
//             {/* Image & Status */}
//             <Box
//                 className="relative"
//                 sx={{
//                     position: "relative",
//                     height: "10rem",
//                     overflow: "hidden",
//                     borderRadius: "4px 4px 0 0",
//                 }}
//             >
//                 <img
//                     src={item.images[0]}
//                     alt={item.name}
//                     className="w-full h-full object-cover"
//                     style={{
//                         filter: item.open ? "none" : "grayscale(100%)",
//                         opacity: item.open ? 1 : 0.7,
//                     }}
//                 />
//                 <Chip
//                     size="small"
//                     className="absolute top-2 left-2"
//                     color={item.open ? "success" : "error"}
//                     label={item.open ? "Open" : "Closed"}
//                 />
//             </Box>

//             {/* Info & Favorite Icon */}
//             <Box className="p-4 flex justify-between items-start">
//                 <Box sx={{ flex: 1, cursor: item.open ? "pointer" : "default" }}>
//                     <Typography variant="h6" fontWeight="bold" gutterBottom>
//                         {item.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                         {item.description}
//                     </Typography>
//                 </Box>
//                 <IconButton
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         handleAddToFavourite();
//                     }}
//                 >
//                     {isPresentinFavourites(auth.favourites, item) ? (
//                         <FavoriteIcon sx={{ color: "red" }} />
//                     ) : (
//                         <FavoriteBorderIcon />
//                     )}
//                 </IconButton>
//             </Box>
//         </Card>
//     );
// };
import React from "react";
import { Card, Chip, IconButton, Box, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Addtofavourites } from "../State/Authentication/Action";
import { isPresentinFavourites } from "../config/logic";

export const RestaurantCard = ({ item }) => {
    const auth = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const handleAddToFavourite = () => {
        dispatch(Addtofavourites({ token, restaurantId: item.id }));
    };

    const handleNavigatetoRestaurant = () => {
        if (item.open) {
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
        }
    };

    return (
        <Card
            onClick={handleNavigatetoRestaurant}
            className={`m-5 w-[20rem] ${item.open ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            sx={{
                borderRadius: "8px",
                overflow: "hidden",
                backdropFilter: "blur(6px)",
                backgroundColor: "rgba(15, 23, 42, 0.3)", // Blue-900/30 equivalent
                border: "1px solid rgba(30, 58, 138, 0.5)", // Blue-800/50 equivalent
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(37, 99, 235, 0.2)", // Blue-500/20 shadow
                },
            }}
        >
            {/* Image & Overlay */}
            <Box
                sx={{
                    position: "relative",
                    height: "12rem",
                    overflow: "hidden",
                }}
            >
                <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    style={{
                        filter: item.open ? "none" : "grayscale(100%)",
                        opacity: item.open ? 1 : 0.6,
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent)",
                        opacity: 0.6,
                    }}
                />
                <Chip
                    size="small"
                    label={item.open ? "Open" : "Closed"}
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        backgroundColor: item.open ? "success.main" : "error.main",
                        color: "white",
                    }}
                />
            </Box>

            {/* Restaurant Info & Favorite Icon */}
            <Box className="p-4 flex justify-between items-start">
                <Box sx={{ flex: 1, cursor: item.open ? "pointer" : "default" }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
                        {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(209, 213, 219, 1)" }}>
                        {item.cuisine}
                    </Typography>
                </Box>
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddToFavourite();
                    }}
                    sx={{
                        color: isPresentinFavourites(auth.favourites, item) ? "red" : "rgba(209, 213, 219, 1)",
                        transition: "transform 0.2s ease",
                        "&:hover": {
                            transform: "scale(1.2)",
                        },
                    }}
                >
                    {isPresentinFavourites(auth.favourites, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </Box>
        </Card>
    );
};

