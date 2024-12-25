import { fetch } from "../../utils/fetch";
import { endpoints } from "../endpoints";
import { discard } from "../../redux/slices/post-creation-slice";
import { setLoading } from "../../redux/slices/loading-slice";
import { setCourses } from "../../redux/slices/post-slice";

export const createPost = async (data, dispatch, token) => {
  if (!data) return { success: false, message: "All fields are required" };

  try {
    dispatch(setLoading(true));
    const { success, message } = await fetch(
      data,
      import.meta.env.VITE_SERVER_URI,
      endpoints.CREATE_POST_API,
      "POST",
      undefined,
      undefined,
      token
    );

    if (!success) {
      dispatch(setLoading(false));
      return { success: false, message: message || "Something went wrong" };
    }

    dispatch(setLoading(false));
    dispatch(discard());
    return { success: true };
  } catch (error) {
    dispatch(setLoading(false));
    return { success: false, message: error.message || "Something went wrong" };
  }
};

export const fetchCourses = async (dispatch, token) => {
  try {
    const { success, message, courses } = await fetch(
      undefined,
      import.meta.env.VITE_SERVER_URI,
      endpoints.COURSES_API,
      "POST",
      undefined,
      undefined,
      token
    );

    if (!success) {
      return { success: false, message: message || "Something went wrong" };
    }
    dispatch(setCourses(courses));
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};

export const fetchVideo = async (id, token) => {
  try {
    const { success, message, course, creator } = await fetch(
      { postId: id },
      import.meta.env.VITE_SERVER_URI,
      endpoints.VIDEO_API,
      "POST",
      undefined,
      undefined,
      token
    );
    if (!success) {
      return {
        success: false,
        message: message || "Something went wrong",
      };
    }

    return { success: true, course, creator };
  } catch (error) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};
