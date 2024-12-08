import {
  Box,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteMenuItem,
  getMenuItemsByRestaurantId,
} from "../../Components/State/Menu/Action";
const orders = [1, 1, 1, 1, 1, 1];
export const MenuTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);
  const { menu } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  console.log(menu);
  const handleDelete = async (id) => {
    dispatch(deleteMenuItem({ id, token }));
    console.log(id); // This will run after the delete is complete
  };
  useEffect(() => {
    const data = {
      token: localStorage.getItem("token"),
      id: restaurant.usersRestaurant?.id,
    };
    dispatch(
      getMenuItemsByRestaurantId({
        reqData: data,
      })
    );
  }, [dispatch, restaurant.usersRestaurant?.id, token]);
  return (
    // <Box>
    //   <Card className="mt-1">
    //     <CardHeader
    //       action={
    //         <IconButton
    //           onClick={() => {
    //             navigate("/admin/restaurants/menu/create");
    //           }}
    //           aria-label="settings"
    //         >
    //           <CreateIcon />
    //         </IconButton>
    //       }
    //       title={"Menu"}
    //       sx={{ pt: 2, alignItems: "center" }}
    //     />
    //     <TableContainer component={Paper}>
    //       <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //         <TableHead>
    //           <TableRow>
    //             <TableCell align="left">image</TableCell>
    //             <TableCell align="left">Title</TableCell>
    //             <TableCell align="left">Ingredients</TableCell>
    //             <TableCell align="left">Price</TableCell>
    //             <TableCell align="left">Availability</TableCell>
    //             <TableCell align="left">Delete</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {menu.menuItems.map((row, index) => (
    //             <TableRow
    //               key={row.id}
    //               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //             >
    //               <TableCell component="th" scope="row">
    //                 {index + 1}
    //               </TableCell>

    //               <TableCell align="left">
    //                 {row.images && row.images.length > 0
    //                   ? row.images.map((image, imgIndex) => (
    //                       <img
    //                         key={imgIndex}
    //                         src={image}
    //                         alt={`menu-item-${row.id}-image-${imgIndex}`}
    //                         style={{ width: 50, height: 50, marginRight: 5 }}
    //                       />
    //                     ))
    //                   : "No Image"}
    //               </TableCell>

    //               <TableCell align="left">{row.description}</TableCell>
    //               <TableCell align="left">{row.price}</TableCell>
    //               <TableCell align="left">
    //                 {row.foodcategory ? row.foodcategory.name : "N/A"}
    //               </TableCell>

    //               <TableCell align="left">
    //                 <IconButton onClick={() =>handleDelete(row.id)}>
    //                   <Delete />
    //                 </IconButton>
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </Card>
    // </Box>
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton
              onClick={() => {
                navigate("/admin/restaurants/menu/create");
              }}
              aria-label="settings"
            >
              <CreateIcon />
            </IconButton>
          }
          title={"Menu"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Ingredients</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* Displaying the image(s) */}
                  <TableCell align="left">
                    {row.images && row.images.length > 0
                      ? row.images.map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={image}
                            alt={`menu-item-${row.id}-image-${imgIndex}`}
                            style={{
                              width: 50,
                              height: 50,
                              marginRight: 5,
                              borderRadius: "50%", // Makes the image rounded
                            }}
                          />
                        ))
                      : "No Image"}
                  </TableCell>

                  {/* Displaying the title */}
                  <TableCell align="left">{row.description}</TableCell>

                  {/* Displaying the ingredients as Chips */}
                  <TableCell align="left">
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {row.ingredients && row.ingredients.length > 0
                        ? row.ingredients.map((ingredient, ingIndex) => (
                            <Chip
                              key={ingIndex}
                              label={ingredient.name}
                              variant="filled" // Matching the style to "renderValue"
                              size="medium" // Same size as in renderValue
                            />
                          ))
                        : "No Ingredients"}
                    </Box>
                  </TableCell>

                  {/* Displaying the price */}
                  <TableCell align="left">{row.price}</TableCell>

                  {/* Displaying the food category */}
                  <TableCell align="left">
                    {row.foodcategory ? row.foodcategory.name : "N/A"}
                  </TableCell>

                  {/* Delete button */}
                  <TableCell align="left">
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};
