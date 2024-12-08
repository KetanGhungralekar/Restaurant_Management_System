import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { Category } from "@mui/icons-material";
import { categoriseIngredients } from "../utills/categoriseIngredients";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartItem } from "../State/Cart/Action";
const ingredients = [
  {
    Category: "Nuts and Seeds",
    ingredients: ["Almonds", "Cashew", "Pistachio"],
  },
  {
    Category: "Bread",
    ingredients: ["Whole Wheat Bread", "White Bread", "Brown Bread"],
  },
  {
    Category: "Protein",
    ingredients: ["Protein"],
  },
];

export const MenuCard = ({item}) => {
  const dispatch = useDispatch()
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { cart, auth } = useSelector((store) => store);
  const HandleCheckBoxChange = (item) => {
    //add this to selected ingredients
    if (selectedIngredients.includes(item)) {
      setSelectedIngredients(selectedIngredients.filter((ingredient) => ingredient !== item));
    } else {
      setSelectedIngredients([...selectedIngredients, item]);
    }
  };
  const handleAddtoCart = (e) => {
    e.preventDefault();
    const reqData = {
      token: localStorage.getItem("token"),
      cartItem:{
        foodid:item.id,
        quantity:1,
        ingredients:selectedIngredients
      }
    }
    console.log("reqData", reqData);
    dispatch(addToCart(reqData));
  }
  // const handleAddtoCart = (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("token");

  //   const existingCartItem = cart.cartItems.find((cartItem) => cartItem.foodid === item.id);
  //   console.log("existingCartItem", existingCartItem);

  //   const reqData = {
  //     token,
  //     cartItem: {
  //       cartitemId: item.id,
  //       quantity: existingCartItem ? existingCartItem.quantity + 1 : 1,
  //     },
  //   };

  //   if (existingCartItem) {
  //     // Update the existing cart item
  //     dispatch(updateCartItem(reqData));
  //   } else {
  //     // Add a new item to the cart
  //     dispatch(addToCart(reqData));
  //   }
  // };
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="lg:flex items-center justify-between gap-5">
            <div className="lg:flex items-center lg:gap-5">
              <img
                src={item?.images[0]}
                alt=""
                className="w-[9rem] h-[9rem] object-cover"
              />
            </div>
            <div className="space-y-2 lg:space-y-7 lg:max-w-2xl">
              <p className=" font-semibold text-xl">{item?.name}</p>
              <p>${item?.price}</p>
              <p>{item?.description}</p>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddtoCart}>
            <div className="flex gap-5 flex-wrap">
              {Object.keys(categoriseIngredients(item.ingredients)).map((category) => (
                <div>
                  <p>{category}</p>
                  <FormGroup>
                    {categoriseIngredients(item.ingredients)[category].map((item) => (
                      <FormControlLabel key={item.id} control={
                          <Checkbox
                            onChange={() => HandleCheckBoxChange(item.name)}
                          />
                        }
                        label={item.name}
                      />
                    ))}
                  </FormGroup>
                </div>
              ))}
            </div>
            <div className="pt-5">
              <Button type="submit" variant="contained" disabled={item.available?false:true}>
                {item?.available ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
