import {
    ADD_TO_FAVOURITES_FAILURE,
  ADD_TO_FAVOURITES_REQUEST,
  ADD_TO_FAVOURITES_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
import { isPresentinFavourites } from "../../config/logic";

const initialState = {
  user: null,
  token: null,
  error: null,
  favourites: [],
  success: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case GET_USER_REQUEST:
    case ADD_TO_FAVOURITES_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isLoading: false,
        error: null,
        success: "Registration Successful",
      };
    case ADD_TO_FAVOURITES_SUCCESS:
      return {
        ...state,
        favourites: isPresentinFavourites(state.favourites, action.payload)
          ? state.favourites.filter((item) => item.id !== action.payload.id)
          : [...state.favourites, action.payload],
        isLoading: false,
        error: null,
        success: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
        success: true,
        favourites: action.payload.favourites,
      };
    case REGISTER_FAILURE:
    case GET_USER_FAILURE:
    case ADD_TO_FAVOURITES_FAILURE:
    case LOGIN_FAILURE:
        return {
            ...state,
            isLoading: false,
            error: action.payload,
            success: false,
        };
    case LOGOUT:
      return initialState
    default:
      return state;
  }
};
