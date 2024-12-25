import { createSlice } from "@reduxjs/toolkit";

const postCreationSlice = createSlice({
  name: "postCreation",
  initialState: {
    videoUrl: null,
    coverUrl: null,
    title: "",
    description: "",
  },
  reducers: {
    setVideoUrl: (state, action) => {
      state.videoUrl = action.payload;
    },
    setCoverUrl: (state, action) => {
      state.coverUrl = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    discard: (state, action) => {
      state.videoUrl = null;
      state.coverUrl = null;
      state.title = "";
      state.description = "";
    },
  },
});

export const { setVideoUrl, setCoverUrl, setTitle, setDescription, discard } =
  postCreationSlice.actions;

export default postCreationSlice.reducer;
