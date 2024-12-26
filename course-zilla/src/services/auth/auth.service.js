import { fetch } from "../../utils/fetch";
import { endpoints } from "../endpoints";

import { setToken, removeToken } from "../../redux/slices/token-slice";
import { setLoading } from "../../redux/slices/loading-slice";

export const register = async (data, dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(
      data,
      import.meta.env.VITE_SERVER_URI,
      endpoints.USER_SIGNUP_API,
      "POST"
    );

    if (!response.success) {
      dispatch(setLoading(false));
      return {
        success: false,
        message: response.message || "Something went wrong",
      };
    }

    dispatch(setToken(response.token));
    dispatch(setLoading(false));
    return { success: true };
  } catch (error) {
    dispatch(setLoading(false));
    return { success: false, message: error.message || "Something went wrong" };
  }
};

export const logIn = async (data, dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(
      data,
      import.meta.env.VITE_SERVER_URI,
      endpoints.USER_SIGNIN_API,
      "POST"
    );

    if (!response.success) {
      dispatch(setLoading(false));
      return {
        success: false,
        message: response.message || "Something went wrong",
      };
    }

    dispatch(setToken(response.token));
    dispatch(setLoading(false));
    return { success: true };
  } catch (error) {
    dispatch(setLoading(false));
    return { success: false, message: error.message || "Something went wrong" };
  }
};

export const logOut = async (dispatch) => {
  dispatch(removeToken());
};
