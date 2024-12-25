import { createSlice } from "@reduxjs/toolkit";

const watchingSlice = createSlice({
  name: "watch",
  initialState: {
    course: undefined,
    creator: undefined,
  },
  reducers: {
   setCourse: (state, action)=>{
    state.course = action.payload;
   },

   setCreator: (state, action)=>{
    state.creator = action.payload;
   }
  },
});

export const { setCourse, setCreator } = watchingSlice.actions;

export default watchingSlice.reducer;
