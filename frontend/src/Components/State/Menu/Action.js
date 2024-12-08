import { API_URL, api } from "../../config/api";
import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_ITEMS_FAILURE, SEARCH_MENU_ITEMS_REQUEST, SEARCH_MENU_ITEMS_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, UPDATE_MENU_ITEM_FAILURE, UPDATE_MENU_ITEM_REQUEST, UPDATE_MENU_ITEM_SUCCESS } from "./ActionType";

export const createMenuItem = ({menu,token}) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_MENU_ITEM_REQUEST });
        const { data } = await api.post(`/api/admin/food`, menu, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
    }
}
export const deleteMenuItem = ({id,token}) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_MENU_ITEM_REQUEST });
        const { data } = await api.delete(`/api/admin/food/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("delete menu item" + data);
        dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
    }
}
export const getMenuItemsByRestaurantId = ({reqData}) => async (dispatch) => {
    try {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
        console.log("reqData" + reqData);
        const { data } = await api.get(`/api/food/getByRestaurant/${reqData.id}`, {
            params:{
                isVeg:reqData.isVeg,
                isNonveg:reqData.isNonveg,
                isSeasonal:reqData.isSeasonal,
                foodCategory:reqData.foodCategory,
            },
            headers: {
                Authorization: `Bearer ${reqData.token}`,
            },
        });
        console.log("data" + data);
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
    }
}

export const searchMenuItem = ({keyword,token}) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_MENU_ITEMS_REQUEST });
        const { data } = await api.get(`/api/food/search?keyword=${keyword}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("search menu items" + data);
        dispatch({ type: SEARCH_MENU_ITEMS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SEARCH_MENU_ITEMS_FAILURE, payload: error });
    }
}
export const updateMenuItemsAvailability = ({id,token}) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
        const { data } = await api.put(`/api/admin/food/update_availability/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("update menu items availability" + data);
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload: error });
    }
}