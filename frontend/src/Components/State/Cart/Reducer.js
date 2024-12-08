import { LOGOUT } from "../Authentication/ActionType"
import { ADD_TO_CART_SUCCESS, CLEAR_CART_SUCCESS, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_REQUEST, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"

export const initialState ={
    cart:null,
    cartItems:[],
    isLoading:false,
    error:null,
}

export const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case FIND_CART_REQUEST:
        case GET_ALL_CART_ITEMS_REQUEST:
        case REMOVE_FROM_CART_REQUEST:
        case UPDATE_CART_ITEM_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case FIND_CART_SUCCESS:
        case CLEAR_CART_SUCCESS:
            return {
                ...state,
                cart: action.payload,
                isLoading: false,
                cartItems: action.payload.cartItems,
            }
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cartItems: [...state.cartItems, action.payload],
            }
        case UPDATE_CART_ITEM_SUCCESS:
            const updatedCartItems = state.cartItems.map(item =>
                item.id === action.payload.id ? action.payload : item
            );
            const updatedCart = {
                ...state.cart,
                // Add logic to update the cart based on your needs. For example:
                cartItems: updatedCartItems,
                totalPrice: updatedCartItems.reduce((acc, item) => acc + item.totaPrice, 0),
            };
            return {
                ...state,
                cart: updatedCart,
                isLoading: false,
                cartItems: state.cartItems.map(item => item.id === action.payload.id ? action.payload : item),
            }
        case REMOVE_FROM_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
            }
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                cart: null,
                cartItems: [],
            }
        default:
            return state;
    }
}