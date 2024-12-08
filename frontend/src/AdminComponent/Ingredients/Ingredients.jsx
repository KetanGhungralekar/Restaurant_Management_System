import { Grid } from "@mui/material"
import { IngredientTable } from "./IngredientTable"
import { IngredientCategoryTable } from "./IngredientCategoryTable"
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsOfRestaurant, getRestaurantsIngredientCategories } from "../../Components/State/Ingredients/Action";
import { useEffect } from "react";

export const Ingredients = () => {
    const dispatch = useDispatch();
    const {restaurant} = useSelector(store=>store);
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={8}>
                    <IngredientTable/>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <IngredientCategoryTable/>
                </Grid>
            </Grid>
        </div>
    )
}