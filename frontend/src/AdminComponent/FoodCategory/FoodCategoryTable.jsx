import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateFoodCategoryForm } from "./CreateFoodCategoryFrom";
import { get_restaurants_categories } from "../../Components/State/Restaurant/Action";
import { fetch_restaurant_orders } from "../../Components/State/RestaurantOrder/Action";

// Style for modal box
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export const FoodCategoryTable = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);

  useEffect(() => {
    dispatch(get_restaurants_categories({
      token: localStorage.getItem("token"),
      id: restaurant.usersRestaurant?.id,
    }));
    dispatch(fetch_restaurant_orders({
      restautant_id: restaurant.usersRestaurant?.id,
      orderStatus: "pending",
      token: localStorage.getItem("token"),
    }));
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Card
        sx={{
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          borderRadius: 3,
          overflow: "hidden",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.01)",
            boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="add-category">
              <CreateIcon />
            </IconButton>
          }
          title={<Typography variant="h6">Food Categories</Typography>}
          sx={{ backgroundColor: "#1F2937", color: "#FFFFFF", py: 2 }}
        />
        
        <TableContainer component={Paper}>
          <Table aria-label="food category table">
            <TableHead sx={{ backgroundColor: "#1F2937" }}>
              <TableRow>
                <TableCell sx={{ color: "#FFFFFF" }}>ID</TableCell>
                <TableCell sx={{ color: "#FFFFFF" }}>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories.map((item) => (
                <TableRow
                key={item.id}
                sx={{
                  color: "#000000", // Default text color set to black
                  transition: "transform 0.3s, background-color 0.3s, color 0.3s",
                }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Modal for Creating Food Category */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <CreateFoodCategoryForm handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};
