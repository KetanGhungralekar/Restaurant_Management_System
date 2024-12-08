import React from "react"
import { CreateRestaurantForm } from "../AdminComponent/CreateRestaurantForm/CreateRestaurantForm"
import { Admin } from "../AdminComponent/Admin/Admin"
import { Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"


export const AdminRoute = () => {
    const {restaurant} = useSelector(store=>store);
    console.log(restaurant.usersRestaurant)
    return (
        <Routes>
            <Route path="/*" element={restaurant.usersRestaurant?<Admin/>:<CreateRestaurantForm />} />
        </Routes>
    )
}