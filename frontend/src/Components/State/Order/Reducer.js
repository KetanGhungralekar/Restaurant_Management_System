import { GET_USER_REQUEST } from "../Authentication/ActionType"
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS } from "./ActionType"

const initialState = {
    orders: [],
    loading: false,
    error: null,
    order1 : null,
}
export const OrderReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_ORDER_REQUEST:
        case GET_ORDERS_REQUEST:
        case GET_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                loading: false,
                error: null,
            }
        case GET_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                order1: action.payload,
                loading: false,
                error: null,
            }
        default:
            return state;
    }
}