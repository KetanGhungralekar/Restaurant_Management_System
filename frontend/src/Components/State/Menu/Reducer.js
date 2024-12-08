import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_ITEMS_FAILURE, SEARCH_MENU_ITEMS_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, UPDATE_MENU_ITEM_FAILURE, UPDATE_MENU_ITEM_REQUEST } from "./ActionType"

const initialState = {
    menuItems: [],
    error: null,
    loading: false,
    search:[],
    message:null
}

export const menuReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_MENU_ITEM_REQUEST:
        case GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case DELETE_MENU_ITEM_REQUEST:
        case UPDATE_MENU_ITEM_REQUEST:
        case UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message:null
            }
        case CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                menuItems: [...state.menuItems, action.payload],
                loading: false,
                error: null,
                message:"Menu Item Created Successfully"
            }
        case GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return {
                ...state,
                menuItems: action.payload,
                loading: false,
                error: null,
                message:null
            }
        case DELETE_MENU_ITEM_SUCCESS:
            const updatedMenuItems = state.menuItems.filter(item => item.id !== action.payload);
            console.log("deleted menu items" + action.payload);
            console.log("updated menu items" + updatedMenuItems);
            return {
                ...state,
                menuItems: updatedMenuItems,
                loading: false,
                error: null,
                message:"Menu Item Deleted Successfully"
            }
        case UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
            console.log("update items id" + action.payload.id);
            return {
                ...state,
                loading: false,
                error: null,
                menuItems: state.menuItems.map(item => item.id === action.payload.id ? action.payload : item),
                message:"Menu Item Updated Successfully"
            }
        case SEARCH_MENU_ITEMS_SUCCESS:
            return {
                ...state,
                search: action.payload,
                loading: false,
                error: null,
                message:null
            }
        case CREATE_MENU_ITEM_FAILURE:
        case GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case DELETE_MENU_ITEM_FAILURE:
        case UPDATE_MENU_ITEM_FAILURE:
        case SEARCH_MENU_ITEMS_FAILURE:
        case UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message:null
            }
        default:
            return state
    }
}