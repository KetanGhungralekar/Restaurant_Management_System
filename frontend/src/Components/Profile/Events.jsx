import React from "react";
import { EventCard } from "./EventCard";
import { RestaurantCard } from "../Restaurant/RestaurantCard";

export const Events = () => {
    return(
        <div className="mt-5 px-5 flex justify-center flex-wrap gap-5">
            {
                [1,1,1].map((item)=><EventCard/>)
            }
        </div>
    )
}