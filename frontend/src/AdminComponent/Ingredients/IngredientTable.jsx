import {
  Box,
  Button,
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
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useEffect, useState } from "react";
import { CreateFoodCategoryForm } from "../FoodCategory/CreateFoodCategoryFrom";
import { CreateIngredientsForm } from "./CreateIngredients";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsOfRestaurant, updateIngredientStock } from "../../Components/State/Ingredients/Action";
const orders = [1, 1, 1, 1, 1, 1];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const IngredientTable = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { ingredient } = useSelector((store) => store);
  console.log(ingredient);
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleUpdateStock = (id) => {
    dispatch(
      updateIngredientStock({
        token: localStorage.getItem("token"),
        id: id,
      })
    );
  };
  useEffect(()=>{
    dispatch(getIngredientsOfRestaurant({
        token: localStorage.getItem("token"),
        id: restaurant.usersRestaurant?.id
    }))
},[])
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          onClick={handleOpen}
          action={
            <IconButton aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title={"All Ingredients"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredient.ingredients.map((ingredient) => (
                <TableRow
                  key={ingredient.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {ingredient.id}
                  </TableCell>
                  <TableCell align="right">{ingredient.name}</TableCell>
                  <TableCell align="right">
                    {ingredient.category.name}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color={ingredient.instock ? "primary" : "secondary"}
                      id={ingredient.id}
                      onClick={() => handleUpdateStock(ingredient.id)}
                    >
                      {ingredient.instock ? "In Stock" : "Out of Stock"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientsForm handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};
