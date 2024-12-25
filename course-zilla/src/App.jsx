import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import Feed from "./pages/feed";
import CreatePost from "./pages/createPost";
import Profile from "./pages/profile";
import  Video  from "./pages/video";

import Protected from "./components/protected";
import OpenRoutes from "./components/openRoutes";
import UserFetcher from "./components/userFetcher";
import Loader from "./components/spinner";
import FlashMessages from "./components/flashMessages";

function App() {
  return (
    <BrowserRouter>
      <FlashMessages />
      <UserFetcher />
      <Routes>
        <Route index element={<Index />} />
        <Route
          path="/register"
          element={
            <OpenRoutes>
              <SignUp />
            </OpenRoutes>
          }
        />
        <Route
          path="/sign_in"
          element={
            <OpenRoutes>
              <SignIn />
            </OpenRoutes>
          }
        />
        <Route
          path="/feed"
          element={
            <Protected>
              <Feed />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/create_post"
          element={
            <Protected>
              <CreatePost />
            </Protected>
          }
        />
        <Route
          path="/video"
          element={
            <Protected>
              <Video />
            </Protected>
          }
        />
      </Routes>
      <Loader />
    </BrowserRouter>
  );
}

export default App;
