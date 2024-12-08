import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from "@mui/icons-material";
import { CreateIngredientCategoryForm } from "./CreateIngredientCategoryForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsIngredientCategories } from "../../Components/State/Ingredients/Action";
const orders = [1,1,1,1,1,1]
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const IngredientCategoryTable = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {ingredient} = useSelector(store=>store);
  const {restaurant} = useSelector(store=>store);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getRestaurantsIngredientCategories({
        token: localStorage.getItem("token"),
        id: restaurant.usersRestaurant?.id
    }))
},[])
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader action={
          <IconButton onClick={handleOpen} aria-label="settings">
            <CreateIcon />
          </IconButton>
        } title={"Ingredient Category"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">id</TableCell>
                <TableCell align="left">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredient.categories.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
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
          <CreateIngredientCategoryForm handleClose={handleClose}/>
        </Box>
      </Modal>
    </Box>
  );
};
