import { combineReducers } from "redux";

import userSlice from "../slices/user-slice";
import tokenSlice from "../slices/token-slice";
import postCreationSlice from "../slices/post-creation-slice";
import loadingSlice from "../slices/loading-slice";
import flashSlice from "../slices/flash-slice";
import postSlice from "../slices/post-slice";
import watchingSlice from "../slices/watching-slice";
import framesCreationSlice from "../slices/frames-creation.slice";
import framesSlice from "../slices/frames.slice";

export const rootReducer = combineReducers({
  user: userSlice,
  token: tokenSlice,
  loading: loadingSlice,
  flashMessage: flashSlice,
  courses: postSlice,
  frames: framesSlice,
  watch: watchingSlice,
  postCreation: postCreationSlice,
  framesCreation: framesCreationSlice,
});
