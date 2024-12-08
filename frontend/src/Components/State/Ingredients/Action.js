import { api } from "../../config/api";
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_FAILURE, CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORIES_FAILURE, GET_INGREDIENT_CATEGORIES_REQUEST, GET_INGREDIENT_CATEGORIES_SUCCESS, UPDATE_STOCK } from "./ActionType";

export const getIngredientsOfRestaurant = ({id, token}) => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: GET_INGREDIENTS, payload: response.data });
        }
        catch (error) {
            dispatch({ type: "GET_INGREDIENTS_OF_RESTAURANT_FAILURE", payload: error });
        }
    }
}
export const createIngredient = ({data, token}) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CREATE_INGREDIENT_REQUEST });
            const response = await api.post(`/api/admin/ingredients/item`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
        }
        catch (error) {
            dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: error });
        }
    }
}
export const createIngredientCategory = ({data, token}) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
            const response = await api.post(`/api/admin/ingredients/category`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("data:"+ response.data);
            dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
        }
        catch (error) {
            dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: error });
        }
    }
}
export const getIngredientCategories = ({id,token}) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_INGREDIENT_CATEGORIES_REQUEST });
            const response = await api.get(`/api/admin/ingredients/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("data:"+ response.data);
            dispatch({ type: GET_INGREDIENT_CATEGORIES_SUCCESS, payload: response.data });
        }
        catch (error) {
            dispatch({ type: GET_INGREDIENT_CATEGORIES_FAILURE, payload: error });
        }
    }
}
export const getRestaurantsIngredientCategories = ({id,token}) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_INGREDIENT_CATEGORIES_REQUEST });
            const response = await api.get(`/api/admin/ingredients/restaurant/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("data:"+ response.data);
            dispatch({ type: GET_INGREDIENT_CATEGORIES_SUCCESS, payload: response.data });
        }
        catch (error) {
            dispatch({ type: GET_INGREDIENT_CATEGORIES_FAILURE, payload: error });
        }
    }
}
export const updateIngredientStock = ({id,stock,token}) => {
    return async (dispatch) => {
        try {
            const response = await api.put(`/api/admin/ingredients/stock/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("data:"+ response.data);
            dispatch({ type: UPDATE_STOCK, payload: response.data });
        }
        catch (error) {
            console.log("error:"+ error);
        }
    }
}