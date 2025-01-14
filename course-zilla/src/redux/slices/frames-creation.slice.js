import { createSlice } from "@reduxjs/toolkit";

const framesCreationSlice = createSlice({
  name: "framesCreation",
  initialState: {
    frameImgUrl: null,
    title: "",
  },
  reducers: {
    setFrameImgUrl: (state, action) => {
      state.frameImgUrl = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    discard: (state, action) => {
      state.frameImgUrl = null;
      state.title = "";
    },
  },
});

export const { setFrameImgUrl, setTitle, discard } =
  framesCreationSlice.actions;

export default framesCreationSlice.reducer;
