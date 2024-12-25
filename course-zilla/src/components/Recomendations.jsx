import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "flowbite-react";
import { fetchCourses } from "../services/post/post.service";

import VideoCard from "./videoCard";

function Recomendations() {
  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.courses);
  const { token } = useSelector((state) => state.token);

  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const { success, message } = await fetchCourses(dispatch, token);
    if (!success) {
      dispatch(
        setFlash({
          type: "danger",
          message: message || "Courses fetching error",
        })
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!courses) {
      fetchPosts();
    }
  }, []);
  return (
    <div className="w-full lg:w-80 xl:w-96 h-fit lg:h-full rounded-md lg:rounded-none flex flex-col gap-2 z-20 border-2 lg:border-0 lg:border-l-2  border-gray-200 bg-gray-50 dark:bg-gray-800 px-3 py-4 dark:border-gray-700 lg:overflow-y-auto mt-2 lg:mt-0">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center ">
          <Spinner size="xl" />
        </div>
      ) : (
        <>
          {courses && !courses.length === 0 && (
            <div className="w-full bg-blue-600 dark:bg-blue-800 rounded-lg flex items-center justify-center shadow-lg py-2">
              <span className="text-md font-medium text-gray-100">
                Recommendations
              </span>
            </div>
          )}

          {courses && courses.length > 0 ? (
            courses.map((e, i) => <VideoCard key={i} course={e} />) // Render VideoCard for each course
          ) : (
            <div className="w-full h-full flex items-center justify-center ">
              <h1 className="text-black dark:text-white font-medium">
                Nothing available
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Recomendations;
