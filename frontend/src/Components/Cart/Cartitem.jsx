import { Chip, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findCart, removeCartitem, updateCartItem } from "../State/Cart/Action";
import { store } from "../State/Store";
export const Cartitem = ({item}) => {
  const {auth,cart} = useSelector((store)=>store);   
  console.log(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleRemoveFromCart = ()=>{
    dispatch(removeCartitem({id:item.id,token:token}));
  }
  const handleUpdateCart = (value)=>{
    if (value == -1 && item.quantity == 1) {
      handleRemoveFromCart();
    }
    else{
      const data = {
        cartitemId:item.id,quantity:item.quantity+value
      }
      dispatch(updateCartItem({token:token,cartItem:data}))
    }
  }
  console.log(item);
  console.log(cart);
  return (
    <div className="px-5">
      <div className="lg:flex items-center lg:space-x-5">
        <div>
          <img
            className="w-[5rem] h-[5rem] object-cover"
            src={
              item.food?.images[0]
            }
            alt=""
          />
        </div>
        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full">
            <p>{item.food.name}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <IconButton onClick={()=>handleUpdateCart(-1)} color="primary">
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <div className="w-5 h-5 text-xs flex items-center justify-center">
                  {item?.quantity}
                </div>
                <IconButton onClick={()=>handleUpdateCart(1)} color="primary">
                  <AddCircleOutlineIcon/>
                </IconButton>
              </div>
            </div>
          </div>
          <p>${item.totaPrice}</p>
        </div>
      </div>
      <div className="pt-3 space-x-2">
          {item?.ingredients.map((item) => (
            <Chip label={item}/>
          ))}
        </div>
    </div>
  );
};
