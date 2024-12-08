import { GET_RESTAURANT_ORDER_FAILURE, GET_RESTAURANT_ORDER_REQUEST, GET_RESTAURANT_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType";
import { API_URL, api } from "../../config/api";

export const update_order_status = ({order_id,orderStatus,token}) => {
    return async (dispatch) => {
        try {
            dispatch({type:UPDATE_ORDER_STATUS_REQUEST});
            const response = await api.put(`${API_URL}/api/admin/order/update/${order_id}/${orderStatus}`,{},{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });
            const updatedOrder = response.data;
            console.log("updated Order " + updatedOrder);
            dispatch({type:UPDATE_ORDER_STATUS_SUCCESS,payload:updatedOrder});
        }
        catch(error){
            dispatch({type:UPDATE_ORDER_STATUS_FAILURE,payload:error});
        }
    }
}
export const fetch_restaurant_orders = ({restautant_id,orderStatus,token}) => {
    return async (dispatch) => {
        try{
            dispatch({type:GET_RESTAURANT_ORDER_REQUEST});
            const response = await api.get(`${API_URL}/api/admin/order/restaurants/${restautant_id}`,{
                params:{status:orderStatus},
                headers:{
                    Authorization:`Bearer ${token}`,
                }});
            const orders = response.data;
            console.log("orders:",orders);
            dispatch({type:GET_RESTAURANT_ORDER_SUCCESS,payload:orders});
        }
        catch (error){
            dispatch({type:GET_RESTAURANT_ORDER_FAILURE,payload:error});
        }
    }
}