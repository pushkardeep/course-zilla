import React, { useState } from "react";
import { Spinner } from "flowbite-react";
import { FaBell } from "react-icons/fa";
import { handleFollowers } from "../services/user/user.service";
import { useDispatch, useSelector } from "react-redux";

function VideoActions({ loading }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { creator } = useSelector((state) => state.watch);
  const { course } = useSelector((state) => state.watch);
  const [followLoading, setFollowLoading] = useState(false);

  const onFollow = async () => {
    setFollowLoading(true);
    const response = await handleFollowers(
      { creatorId: creator._id },
      dispatch,
      token
    );
    setFollowLoading(false);
  };
  return (
    <div className="w-full mt-2">
      {loading ? (
        <div className="w-full h-fit px-2">
          <div className="w-full h-fit flex items-center justify-center border-2 rounded-md border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white px-2 py-3">
            <Spinner size="xl" />
          </div>
        </div>
      ) : (
        <div className="w-full h-fit px-2">
          <div className="flex justify-between items-center gap-y-2 flex-wrap">
            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 object-cover rounded-full"
                src={creator?.dp || "https://placehold.co/400"}
                alt="Channel Logo"
              />
              <div className="min-w-fit leading-4">
                <p className="truncate text-[15px] font-medium text-gray-900 dark:text-white">
                  {creator?.username || "Channel name"}
                </p>
                <p className="truncate text-[10px] text-gray-500 dark:text-gray-400">
                  {creator?.followers.length || 0} subscribers
                </p>
              </div>
            </div>

            <button className=" text-white dark:text-black bg-black border hover:bg-[#0c0c0c] focus:outline-none font-medium rounded-full text-sm px-3.5 py-2 dark:bg-zinc-300 dark:hover:bg-zinc-400">
              {followLoading ? (
                "Loading"
              ) : (
                <div onClick={onFollow} className="flex items-center gap-2">
                  <FaBell className="h-full" />
                  Subscribe
                </div>
              )}
            </button>
          </div>

          <div className="w-full mt-3 border-2 rounded-md border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white px-2 py-2">
            <h1 className="text-md text-gray-900 dark:text-white mb-1 leading-tight">
              {course?.title || "Video Title"}
            </h1>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {course?.description ||
                "This is a video description placeholder."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoActions;
