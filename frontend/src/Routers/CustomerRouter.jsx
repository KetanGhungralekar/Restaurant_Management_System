import React from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Components/HomePage/Home";
import { RestaurantDetails } from "../Components/Restaurant/RestaurantDetails";
import { Cart } from "../Components/Cart/Cart";
import { Profile } from "../Components/Profile/Profile";
import { Auth } from "../Components/Auth/Auth";

export const CustomerRouter = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element = {<Home/>}/>
                <Route path='/account/:register' element = {<Home/>}/>
                <Route path='/restaurant/:city/:title/:id' element = {<RestaurantDetails/>}/>
                <Route path='/cart' element = {<Cart/>}/>
                <Route path='/my-profile/*' element = {<Profile/>}/>
            </Routes>
            <Auth/>
        </div>
    )
}