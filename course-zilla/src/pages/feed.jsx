import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Navigationbar from "../components/navbar";
import Slider from "../components/slider";
import VideoCard from "../components/videoCard";

import { fetchCourses, searchCourse } from "../services/post/post.service";
import { setFlash } from "../redux/slices/flash-slice";
import { setLoading } from "../redux/slices/loading-slice";

const Feed = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const sliderRef = useRef(null);

  const { user } = useSelector((state) => state.user);
  const { courses } = useSelector((state) => state.courses);
  const { token } = useSelector((state) => state.token);

  const searchParams = new URLSearchParams(location.search);
  const courseQuery = searchParams.get("search");

  const fetchPosts = async () => {
    dispatch(setLoading(true));
    const { success, message } = await fetchCourses(dispatch, token);
    if (!success) {
      dispatch(
        setFlash({
          type: "danger",
          message: message || "Courses fetching error",
        })
      );
    }
    dispatch(setLoading(false));
  };

  const fetchSearchedPosts = async (query) => {
    dispatch(setLoading(true));
    const { success, message } = await searchCourse(query, dispatch, token);
    if (!success) {
      dispatch(
        setFlash({
          type: "danger",
          message: message || "Error in finding Courses.",
        })
      );
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (user && !courses && !courseQuery) {
      fetchPosts();
    }

    if (user && !courseQuery && courses) {
      fetchPosts();
    }
  }, [user, courseQuery]);

  useEffect(() => {
    if (courseQuery) fetchSearchedPosts(courseQuery);
  }, [location.search]);

  return (
    <div className="h-screen flex flex-col justify-center dark:bg-gray-900 relative">
      <Navigationbar sliderRef={sliderRef} />
      <div className="flex-1 flex overflow-hidden relative">
        <Slider sliderRef={sliderRef} ref={sliderRef} />
        <div className="flex-1 h-full z-10 overflow-y-auto">
          {courses && courses.length > 0 ? (
            <div className="max-w-[1320px] h-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-2 p-3">
              {courses.map((course, index) => (
                <VideoCard key={index} course={course} />
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-black dark:text-white">
              <h1>No courses available</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
