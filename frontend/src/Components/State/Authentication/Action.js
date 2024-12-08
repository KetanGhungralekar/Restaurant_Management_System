import axios from "axios";
import { API_URL, api } from "../../config/api";
import { ADD_TO_FAOURITES_SUCCESS, ADD_TO_FAVOURITES_FAILURE, ADD_TO_FAVOURITES_REQUEST, ADD_TO_FAVOURITES_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

export const registerUser = (reqData)=>async(dispatch)=>{
    try{
        dispatch({type:REGISTER_REQUEST});
        const {data} = await axios.post(`${API_URL}/auth/signup`,reqData.userData);
        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        if (data.role == "ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurants");
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:REGISTER_SUCCESS,payload:data.token});
    }catch(error){
        dispatch({type:REGISTER_FAILURE,payload:error});
        console.log("error",error);
    }
}
export const LoginUser = (reqData)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST});
        const {data} = await axios.post(`${API_URL}/auth/signin`,reqData.userData);
        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        if (data.role == "ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurants");
        }
        else{
            reqData.navigate("/")
        }
        console.log("login successfull",data.token);
        dispatch({type:LOGIN_SUCCESS,payload:data});
    }catch(error){
        dispatch({type:LOGIN_SUCCESS,payload:error});
        console.log("error",error);
    }
}
export const getUser = (token)=>async(dispatch)=>{
    try{
        dispatch({type:GET_USER_REQUEST});
        const {data} = await api.get(`/api/users/profile`,
            {headers:{
                Authorization: `Bearer ${token}`,
            }}
        )
        dispatch({type:GET_USER_SUCCESS,payload:data});
        console.log("get user successfull",data);
    }catch(error){
        dispatch({type:GET_USER_FAILURE,payload:error});
        console.log("error",error);
    }
}

export const Addtofavourites = ({token,restaurantId})=>async(dispatch)=>{
    try{
        dispatch({type:ADD_TO_FAVOURITES_REQUEST});
        const {data} = await api.put(`/api/restaurants/add_to_favourites/${restaurantId}`,{},
            {headers:{
                Authorization: `Bearer ${token}`,
            }}
        )
        dispatch({type:ADD_TO_FAVOURITES_SUCCESS,payload:data});
        console.log("added to favourites successfull");
    }catch(error){
        dispatch({type:ADD_TO_FAVOURITES_FAILURE,payload:error});
        console.log("error",error);
    }
}
export const logout = ()=>async(dispatch)=>{
    try{
        dispatch({type:LOGOUT});
        localStorage.clear();
        console.log("logout successfull");
    }catch(error){
        console.log("error",error);
    }
}