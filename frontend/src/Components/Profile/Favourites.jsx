import React from "react";
import { RestaurantCard } from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";
import { store } from "../State/Store";

export const Favourites = () => {
    const auth = useSelector(store=>store.auth);
    console.log(auth.favourites);
    return(
        <div>
            <h1 className="py-2 text-xl font-semibold text-center">Favourites</h1>
            <div className="flex justify-center flex-wrap">
                {
                    auth.favourites.map((item)=><RestaurantCard item={item}/>)
                }
            </div>
        </div>
    )
}