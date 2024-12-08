import { API_URL, api } from "../../config/api";
import { ADD_TO_CART_FAILURE, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_FAILURE, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCCESS, REMOVE_FROM_CART_FAILURE, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType";

export const findCart = (token) => {
    return async (dispatch) => {
        dispatch({ type: FIND_CART_REQUEST });
        try {
            const response = await api.get(`api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("response", response.data);
            dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FIND_CART_FAILURE, payload: error.response.data });
        }
    };
}
export const addToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_TO_CART_REQUEST });
        try {
            const response = await api.post(`api/cart-item/add`, reqData.cartItem, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: ADD_TO_CART_FAILURE, payload: error.message});
        }
    };
}
export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CART_ITEM_REQUEST });
        try {
            const response = await api.put(`api/cart-item/update`, reqData.cartItem, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            console.log("response", response.data);
            dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message});
        }
    };

}
export const get_all_cart_items = (reqData) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
        const { data } = await api.get(`/api/cart/getAll`, {
            headers: {
                Authorization: `Bearer ${reqData.token}`,
            },
        });
        console.log("data", data);
        dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error });
    }
}
export const removeCartitem =({id,token})=>async(dispatch)=>{
    try{
        dispatch({type:REMOVE_FROM_CART_REQUEST});
        const {data} = await api.delete(`/api/cart-item/remove/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({type:REMOVE_FROM_CART_SUCCESS,payload:id});
    }catch(error){
        console.log("error",error);
        dispatch({type:REMOVE_FROM_CART_FAILURE,payload:error.message});
    }
}
export const clearCart = (token) => {
    return async (dispatch) => {
        dispatch({ type: CLEAR_CART_REQUEST });
        try {
            const response = await api.delete(`api/cart/clear`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: CLEAR_CART_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: CLEAR_CART_FAILURE, payload: error.message});
        }
    };
}