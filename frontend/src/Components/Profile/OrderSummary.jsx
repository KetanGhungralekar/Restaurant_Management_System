import React, { useEffect } from "react";
import { OrderCard } from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get_users_orders } from "../State/Order/Action";

export const Orders = () => {
    const dispatch = useDispatch();
    const {cart,auth,order} = useSelector((store)=>store);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(()=>{
    dispatch(get_users_orders(token));
    },[auth.token])
    return(
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center py-7">My Orders</h1>
            <div className="space-y-5 w-full lg:w-1/2">
                {
                    order.orders.map((order)=>order.orderItems.map((item)=><OrderCard order={order} item={item}/>))
                }
            </div>
        </div>
    )
}