import React from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";

const menu = [
    {title : "Orders", icon:<ShoppingBagIcon/>},
    {title : "Favourites", icon:<FavoriteIcon/>},
    {title : "Address", icon:<HomeIcon/>},
    {title : "Events", icon:<EventIcon/>},
    {title : "Logout", icon:<LogoutIcon/>},
]
export const ProfileNavigation = ({open,handleClose}) => {
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleNavigate = (item)=>{
        console.log(item.title);
        if(item.title === "Logout"){
            dispatch(logout());
            navigate('/');
        }
        else
        navigate(`/my-profile/${item.title.toLowerCase()}`)
    }
    return(
        <div className="">
            <Drawer
            variant={isSmallScreen ? "temporary" : "permanent"}
            open={true}
            onClose={handleClose}
            anchor="left"
            sx={{
                zIndex: 1,
                "& .MuiDrawer-paper": {
                    backgroundColor: "#1F2937",
                    color: "#FFFFFF",
                    width: isSmallScreen ? "50vw" : "20vw",
                    boxShadow: "3px 0 5px rgba(0, 0, 0, 0.2)",
                    borderRight: "none",
                    overflow: "hidden",
                    pt: "64px",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    justifyContent: "space-between",
                    py: 4,
                }}
            >
                <Box sx={{ flex: 1 }}>
                    {menu.slice(0, menu.length - 1).map((item, i) => (
                        <Box key={i} sx={{ mb: 2 }}>
                            <Box
                                onClick={() => handleNavigate(item)}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    px: 3,
                                    py: 1.5,
                                    cursor: "pointer",
                                    borderRadius: 2,
                                    transition: "transform 0.3s, background-color 0.3s",
                                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                    "&:hover": {
                                        backgroundColor: "#374151",
                                        transform: "translateY(-4px)",
                                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        backgroundColor: "#4B5563",
                                        mr: 2,
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {item.title}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Box sx={{ mb: 2 }}>
                    {/* Logout Option */}
                    <Box
                        onClick={() => handleNavigate(menu[menu.length - 1])}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            px: 3,
                            py: 1.5,
                            cursor: "pointer",
                            borderRadius: 2,
                            transition: "transform 0.3s, background-color 0.3s",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            "&:hover": {
                                backgroundColor: "#374151",
                                transform: "translateY(-4px)",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                backgroundColor: "#4B5563",
                                mr: 2,
                            }}
                        >
                            <LogoutIcon />
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Logout
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Drawer>
            
            {/* <Drawer variant={isSmallScreen?"temporary":"permanent"} open={isSmallScreen?open:true} onClose={handleClose} anchor='left' sx={{zIndex:-1}}>
                <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-7 pt-16">
                    {menu.map((item,i)=>
                        <>
                            <div onClick={() => handleNavigate(item)} className="flex-col justify-start space-x-5 px-5 cursor-pointer">
                            {item.icon}
                            <span>{item.title}</span>
                             </div>
                         {i != menu.length-1 && <Divider/>}
                        </>
                    )}
                </div>
            </Drawer> */}
        </div>
    )
}