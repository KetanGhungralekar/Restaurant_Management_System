import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_categoryAction } from "../../Components/State/Restaurant/Action";

export const CreateFoodCategoryForm = ({handleClose}) => {
  const {restaurant} = useSelector(store=>store);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        CategoryName: "",restaurantId: ""
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        name: formData.CategoryName,
        restaurantId: {
            id:restaurant.usersRestaurant?.id
        }
    }
    dispatch(create_categoryAction({
        data : data,
        token: localStorage.getItem("token")
    }))
    handleClose();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]:value });
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
          <Button variant="contained" type="submit">
            Create Food Category
          </Button>
        </form>
      </div>
    </div>
  );
};
