import { CREATE_CATEGORY_FAILURE, GET_RESTAURANTS_CATEGORIES_FAILURE, GET_RESTAURANTS_CATEGORIES_SUCCESS } from "../Restaurant/ActionType"
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORIES_FAILURE, GET_INGREDIENT_CATEGORIES_SUCCESS, UPDATE_STOCK } from "./ActionType"

const initialState = {
    ingredients: [],
    categories: [],
    update :null,
    error: null,
}

export const ingredientReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload,
            }
        case GET_INGREDIENT_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
            }
        case CREATE_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: [...state.categories, action.payload],
            }
        case CREATE_INGREDIENT_SUCCESS:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
            }
        case UPDATE_STOCK:
            return {
                ...state,
                update: action.payload,
                ingredients: state.ingredients.map(ingredient => ingredient.id === action.payload.id ? action.payload : ingredient),
            }
        case GET_INGREDIENT_CATEGORIES_FAILURE:
        case CREATE_CATEGORY_FAILURE:
        case CREATE_INGREDIENT_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
}