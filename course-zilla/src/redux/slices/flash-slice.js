import { createSlice } from "@reduxjs/toolkit";

const flashSlice = createSlice({
  name: "flash",
  initialState: {
    messages: [],
  },
  reducers: {
    setFlash: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setFlash } = flashSlice.actions;

export default flashSlice.reducer;
