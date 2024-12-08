import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { IngredientCategoryTable } from "./IngredientCategoryTable";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../../Components/State/Ingredients/Action";

export const CreateIngredientsForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    ingredientCategoryId: "",
  });
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);
  const { ingredient } = useSelector((store) => store);
  const handleSubmit = (e) => {
    const data = {
      ingredientsname: formData.CategoryName,
      ingredientCategoryId: formData.ingredientCategoryId,
      restaurantid: restaurant.usersRestaurant?.id,
    };
    dispatch(
      createIngredient({
        data: data,
        token: localStorage.getItem("token"),
      })
    );
    handleClose();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Food Category
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            id="CategoryName"
            name="CategoryName"
            label="CategoryName"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.CategoryName}
          ></TextField>
          <FormControl fullWidth>
            <InputLabel id="Category">Category</InputLabel>
            <Select
              labelId="IngredientCategory"
              name="ingredientCategoryId"
              id="IngredientCategory"
              value={formData.ingredientCategoryId}
              label="IngredientCategory"
              onChange={handleInputChange}
            >
              {ingredient.categories.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            Create Ingredient
          </Button>
        </form>
      </div>
    </div>
  );
};
