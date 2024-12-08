import React from "react";
import { ProfileNavigation } from "./ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import { UserProfile } from "./UserProfile";
import { Orders } from "./Orders";
import { Favourites } from "./Favourites";
import { Address } from "./Address";
import { Events } from "./Events";
import { OrderDetails } from "./OrderDetails";

export const Profile = () =>{
    const [open, setOpen] = React.useState(false);
    return (
        <div className="lg:flex justify-between">
            <div className=" sticky h-[80vh] lg:w-[20%]"> 
                <ProfileNavigation open={open}/>
            </div>
            <div className="lg:w-[80%]">
                <Routes>
                <Route path='/' element={<UserProfile/>}/>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/favourites' element={<Favourites/>}/>
                <Route path='/address' element={<Address/>}/>
                <Route path='/events' element={<Events/>}/>
                <Route path='/orders/details/:id' element={<OrderDetails/>}/>
                </Routes>
            </div>
        </div>
    )
}