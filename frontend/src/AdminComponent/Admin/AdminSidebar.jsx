import { Dashboard, ShoppingBag } from "@mui/icons-material";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Drawer, Typography, useMediaQuery, Box } from "@mui/material";
import { logout } from "../../Components/State/Authentication/Action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const menu = [
    { title: "Dashboard", icon: <Dashboard />, path: "/" },
    { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
    { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
    { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
    { title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
    { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
    { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

export const AdminSidebar = ({ handleClose }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            dispatch(logout());
            navigate("/");
        } else {
            navigate(`/admin/restaurants${item.path}`);
        }
    };

    return (
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
    );
};
