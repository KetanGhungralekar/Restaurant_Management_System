import React, { useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { Orders } from "../Orders/Orders";
import { Menu } from "../Menu/Menu";
import { FoodCategory } from "../FoodCategory/FoodCategory";
import { Ingredients } from "../Ingredients/Ingredients";
import { Events } from "../Events/events";
import { RestaurantDetails } from "./RestaurantDetails";
import { CreateMenuForm } from "../Menu/CreateMenuForm";
import { useDispatch, useSelector } from "react-redux";
import { get_restaurant_by_id, get_restaurants_categories, get_restaurants_food } from "../../Components/State/Restaurant/Action";
import { get_users_orders } from "../../Components/State/Order/Action";
import { fetch_restaurant_orders } from "../../Components/State/RestaurantOrder/Action";

export const Admin = () => {
    const dispatch = useDispatch();
    const {restaurant} = useSelector(store=>store);
    const handleClose = () => {
        console.log("close")
    }
    useEffect(() => {
        dispatch(get_restaurants_categories(
            {
                token: localStorage.getItem("token"),
                id : restaurant.usersRestaurant?.id
            }
        ));
        dispatch(fetch_restaurant_orders({
            restautant_id:restaurant.usersRestaurant?.id,
            orderStatus:"pending",
            token:localStorage.getItem("token")
        }))
        // dispatch(get_restaurants_food())
        // dispatch(get_restaurant_by_id())
    },[])
    return (
        <div className="lg:flex justify-between">
            <div>
                <AdminSidebar handleClose={handleClose}/>
            </div>
            <div className="lg:w-[80%]">
                <Routes>
                    <Route path='/' element={<Dashboard/>}/>
                    <Route path='/orders' element={<Orders/>}/>
                    <Route path='/menu' element={<Menu/>}/>
                    <Route path='/category' element={<FoodCategory/>}/>
                    <Route path='/ingredients' element={<Ingredients/>}/>
                    <Route path='/event' element={<Events/>}/>
                    <Route path='/details' element={<RestaurantDetails/>}/>
                    <Route path='/menu/create' element={<CreateMenuForm/>}/>
                </Routes>
            </div>
        </div>
    )
}