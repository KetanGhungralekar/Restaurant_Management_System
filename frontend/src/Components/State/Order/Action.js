import { api } from "../../config/api";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFICATION_REQUEST, GET_USERS_NOTIFICATION_SUCCESS } from "./ActionType";

export const createOrder = (ReqData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        try {
            const response = await api.post(`api/order`, ReqData.data, {
                headers: {
                    Authorization: `Bearer ${ReqData.token}`,
                },
            });
            console.log("order", response.data);
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
        }
    }
}
export const get_users_orders = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_ORDERS_FAILURE });
        try {
            const response = await api.get(`api/getOrders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("orders", response.data);
            dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_ORDERS_FAILURE, payload: error.message });
        }
    }
}
export const get_order_by_id = (ReqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_ORDER_REQUEST });
        try {
            const response = await api.get(`api/getOrder/${ReqData.id}`, {
                headers: {
                    Authorization: `Bearer ${ReqData.token}`,
                },
            });
            console.log("order", response.data);
            dispatch({ type: GET_ORDER_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_ORDER_FAILURE, payload: error.message });
        }
    }
}