import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import { restaurantReducer } from "./Restaurant/Reducer";
import { menuReducer } from "./Menu/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { OrderReducer } from "./Order/Reducer";
import { restaurantOrderReducer } from "./RestaurantOrder/Reducer";
import { ingredientReducer } from "./Ingredients/Reducer";

const rooteReducer = combineReducers({
    auth:authReducer,
    restaurant:restaurantReducer,
    menu:menuReducer,
    cart:cartReducer,
    order:OrderReducer,
    RestaurantOrder:restaurantOrderReducer,
    ingredient:ingredientReducer,
});

export const store=legacy_createStore(rooteReducer,applyMiddleware(thunk));