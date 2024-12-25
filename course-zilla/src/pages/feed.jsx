import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navigationbar from "../components/navbar";
import Slider from "../components/slider";
import VideoCard from "../components/videoCard";

import { fetchCourses } from "../services/post/post.service";

import { setFlash } from "../redux/slices/flash-slice";
import { setLoading } from "../redux/slices/loading-slice";

function Feed() {
  const dispatch = useDispatch();

  const sliderRef = useRef(null);

  const { user } = useSelector((state) => state.user);
  const { courses } = useSelector((state) => state.courses);
  const { token } = useSelector((state) => state.token);

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

  useEffect(() => {
    if (user && !courses) {
      fetchPosts();
    }
  }, [user]);

  return (
    <div className="h-screen flex flex-col justify-center dark:bg-gray-900 relative ">
      <Navigationbar sliderRef={sliderRef} />
      <div className="flex-1 flex overflow-hidden relative">
        <Slider ref={sliderRef} />

        {/* video placer  */}
        <div className="flex-1 h-full z-10 overflow-y-auto">
          <div className="max-w-[1320px] h-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-2 p-3">
            {courses &&
              courses.map((e, i) => (
                <VideoCard
                  key={i}
                  course={e}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;