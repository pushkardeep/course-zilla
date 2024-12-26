import { setLoading } from "../../redux/slices/loading-slice";
import { removeToken } from "../../redux/slices/token-slice";
import {
  removeUser,
  setUser,
  changeImage,
} from "../../redux/slices/user-slice";
import { setCreator } from "../../redux/slices/watching-slice";

import { fetch } from "../../utils/fetch";
import { imgUploader } from "../cloudinary/img-uploader";
import { endpoints } from "../endpoints";

export const profile = async (dispatch, token) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(
      undefined,
      import.meta.env.VITE_SERVER_URI,
      endpoints.USER_PROFILE_API,
      "POST",
      undefined,
      undefined,
      token
    );

    if (!response.success) {
      dispatch(setLoading(false));
      dispatch(removeToken());
      dispatch(removeUser());
      return { success: false, message: response.message || "User not found" };
    }
    dispatch(setUser(response.user));
    dispatch(setLoading(false));
    return { success: true };
  } catch (error) {
    dispatch(removeToken());
    dispatch(removeUser());
    return { success: false, message: error.message || "Something went wrong" };
  }
};

export const handleFollowers = async (data, dispatch, token) => {
  try {
    const response = await fetch(
      data,
      import.meta.env.VITE_SERVER_URI,
      endpoints.HANDLE_FOLLOWERS_API,
      "POST",
      undefined,
      undefined,
      token
    );

    if (!response.success) {
      return { success: false, message: response.message || "User not found" };
    }

    dispatch(setCreator(response.creator));
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};

export const changeDp = async (file, dispatch, token) => {
  try {
    if (!file) return { success: false, message: "File not found" };
    const { success, message, url } = await imgUploader(file);

    if (!success) {
      return {
        success: false,
        message: message || "Uploading error, try again",
      };
    }

    const response = await fetch(
      { imgUrl: url },
      import.meta.env.VITE_SERVER_URI,
      endpoints.CHANGE_DP_API,
      "POST",
      undefined,
      undefined,
      token
    );

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Uploading error, try again",
      };
    }

    dispatch(changeImage(response?.user?.dp));
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};
