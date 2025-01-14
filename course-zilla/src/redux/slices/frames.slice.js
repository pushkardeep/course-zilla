import { createSlice } from "@reduxjs/toolkit";

const framesSlice = createSlice({
  name: "frames",
  initialState: {
    frames: [],
  },
  reducers: {
    setFrames: (state, action) => {
      state.frames = action.payload;
    },
    updateFrame: (state, action) => {
      state.frames = [...state.frames, action.payload];
    },
  },
});

export const { setFrames, updateFrame } = framesSlice.actions;

export default framesSlice.reducer;
