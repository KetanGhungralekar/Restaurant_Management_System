import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_CATEGORY_FAILURE, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, GET_ALL_RESTAURANT_FAILURE, GET_ALL_RESTAURANT_REQUEST, GET_ALL_RESTAURANT_SUCCESS, GET_RESTAURANTS_CATEGORIES_FAILURE, GET_RESTAURANTS_CATEGORIES_REQUEST, GET_RESTAURANTS_CATEGORIES_SUCCESS, GET_RESTAURANT_BU_USER_ID_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_SUCCESS } from "./ActionType"

const initialState = {
    restarants:[],
    usersRestaurant:null,
    restarant: null,
    isLoading: false,
    error: null,
    events:[],
    categories:[],
}

export const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CATEGORY_REQUEST:
        case GET_RESTAURANTS_CATEGORIES_REQUEST:
        case GET_ALL_RESTAURANT_REQUEST:
        case UPDATE_RESTAURANT_REQUEST:
        case CREATE_RESTAURANT_REQUEST:
        case DELETE_RESTAURANT_REQUEST:
        case GET_RESTAURANT_BY_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                usersRestaurant: action.payload,
                isLoading: false,
                error: null,
            }
        case GET_ALL_RESTAURANT_SUCCESS:
            return {
                ...state,
                restarants: action.payload,
                isLoading: false,
                error: null,
            }
        case GET_RESTAURANT_BY_ID_SUCCESS:
            return {
                ...state,
                restarant: action.payload,
                isLoading: false,
                error: null,
            }
        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: [...state.categories, action.payload],
                isLoading: false,
                error: null,
            }
        case GET_RESTAURANTS_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                isLoading: false,
                error: null,
            }
        case GET_RESTAURANT_BU_USER_ID_SUCCESS:
        case UPDATE_RESTAURANT_SUCCESS:
        case UPDATE_RESTAURANT_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                usersRestaurant: action.payload,
            }
        case DELETE_RESTAURANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                usersRestaurant: state.usersRestaurant.filter((item) => item.id !== action.payload.id),
                restarants: state.restarants.filter((item) => item.id !== action.payload.id),
            }
        case GET_RESTAURANTS_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                isLoading: false,
                error: null,
            }
        //for all failures
        case CREATE_CATEGORY_FAILURE:
        case CREATE_CATEGORY_FAILURE:
        case GET_ALL_RESTAURANT_FAILURE:
        case UPDATE_RESTAURANT_FAILURE:
        case DELETE_RESTAURANT_FAILURE:
        case DELETE_CATEGORY_FAILURE:
        case GET_RESTAURANT_BY_ID_FAILURE:
        case CREATE_RESTAURANT_FAILURE:
        case GET_RESTAURANTS_CATEGORIES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}