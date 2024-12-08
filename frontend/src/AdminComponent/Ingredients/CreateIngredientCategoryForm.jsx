import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { IngredientCategoryTable } from "./IngredientCategoryTable";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientCategory } from "../../Components/State/Ingredients/Action";

export const CreateIngredientCategoryForm = ({
    handleClose
}) => {
    const [formData, setFormData] = useState({
        name: ""
    });
    const {restaurant} = useSelector(store=>store);
    const dispatch = useDispatch();
  const handleSubmit = (e) => {
    const data = {
      ingredientsname: formData.name,
      restaurantid: restaurant.usersRestaurant?.id
    }
    dispatch(createIngredientCategory({
      data: data,
      token: localStorage.getItem("token")
    }
    ))
    handleClose();
  };
  const handleInputChange = (e) => {
    const {name, value } = e.target;
    setFormData({ ...formData, [name]:value });
  };
  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingredient Category
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            id="CategoryName"
            name="name"
            label="CategoryName"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          ></TextField>
          <Button variant="contained" type="submit">
            Create Ingredient Category
          </Button>
        </form>
      </div>
    </div>
  );
};
