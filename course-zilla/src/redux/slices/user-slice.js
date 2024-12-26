import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { username, email, dp, _id } = action.payload;
      state.user = { username, email, dp, _id };
    },

    removeUser: (state) => {
      state.user = null;
    },

    changeImage: (state, action) => {
      state.user.dp = action.payload;
    },
  },
});

export const { setUser, removeUser, changeImage } = userSlice.actions;

export default userSlice.reducer;
