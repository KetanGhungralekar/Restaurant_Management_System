import axios from "axios";
import { API_URL, api } from "../../config/api";
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_EVENT_REQUEST, CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_CATEGORY_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, GET_ALL_RESTAURANT_REQUEST, GET_ALL_RESTAURANT_SUCCESS, GET_FOOD_BY_RESTAURANT_ID_FAILURE, GET_FOOD_BY_RESTAURANT_ID_REQUEST, GET_FOOD_BY_RESTAURANT_ID_SUCCESS, GET_RESTAURANTS_CATEGORIES_FAILURE, GET_RESTAURANTS_CATEGORIES_REQUEST, GET_RESTAURANTS_CATEGORIES_SUCCESS, GET_RESTAURANT_BU_USER_ID_FAILURE, GET_RESTAURANT_BU_USER_ID_REQUEST, GET_RESTAURANT_BU_USER_ID_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_STATUS_FAILURE, UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_SUCCESS } from "./ActionType";

export const get_all_restaurants = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
    const { data } = await api.get(`/api/restaurants/getAll`,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
    console.log("data", data);
    dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_RESTAURANT_FAILURE", payload: error });
  }
};
export const get_restaurant_by_id = ({token, id}) => async (dispatch) => {
    try {
        dispatch({ type:GET_RESTAURANT_BY_ID_REQUEST });
        const { data } = await api.get(`/api/restaurants/get/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        console.log("data", data);
        dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
    }
}
export const get_restaurants_by_user_id = (token) => async (dispatch) => {
    try {
        dispatch({ type: GET_RESTAURANT_BU_USER_ID_REQUEST });
        const response = await api.get(`/api/restaurants/getByUser`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        dispatch({ type: GET_RESTAURANT_BU_USER_ID_SUCCESS, payload: response.data });
    }
    catch (error) {
        dispatch({ type: GET_RESTAURANT_BU_USER_ID_FAILURE, payload: error });
    }
}

export const create_restaurant = (reqData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_RESTAURANT_REQUEST });
        const { data } = await api.post(`/api/admin/restaurants`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.token}`,
            },
        });
        dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
    }
}
export const update_restaurant = ({Restaurant_id,restaurantData,token}) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_RESTAURANT_REQUEST });
        const res = await api.put(`/api/admin/restaurants/update/${Restaurant_id}`, restaurantData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
    }
}
export const delete_restaurant = (token, id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_RESTAURANT_REQUEST });
        const res = await api.delete(`/api/admin/restaurants/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
    }
}
export const update_restaurant_status = ({Restaurant_id,token}) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
        const res = await api.put(`/api/admin/restaurants/updateStatus/${Restaurant_id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
}
export const create_Event_Action = ({data,token,resId}) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_EVENT_REQUEST});
        const res = await api.post(`/api/admin/events/${resId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: "CREATE_EVENT_SUCCESS", payload: res.data });
    } catch (error) {
        dispatch({ type: "CREATE_EVENT_FAILURE", payload: error });
    }
}
export const get_restaurants_food = ({token,id}) => async (dispatch) => {
    try {
        dispatch({ type: GET_FOOD_BY_RESTAURANT_ID_REQUEST });
        const res = await api.get(`/api/food/getByRestaurant/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: GET_FOOD_BY_RESTAURANT_ID_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_FOOD_BY_RESTAURANT_ID_FAILURE, payload: error });
    }
}
export const create_categoryAction = ({data,token}) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CATEGORY_REQUEST });
        const res = await api.post(`/api/admin/category`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("res", res.data);
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
}
export const get_restaurants_categories = ({token,id}) => async (dispatch) => {
    try {
        dispatch({ type: GET_RESTAURANTS_CATEGORIES_REQUEST });
        const res = await api.get(`/api/category/restaurant/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: GET_RESTAURANTS_CATEGORIES_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_RESTAURANTS_CATEGORIES_FAILURE, payload: error });
    }
}