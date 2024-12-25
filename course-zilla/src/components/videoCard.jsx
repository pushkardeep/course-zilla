import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const VideoCard = ({ course }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/video?_id=${course._id}`);
  };

  return (
    <div
      onClick={handleNavigation}
      className="cursor-pointer w-full max-h-fit bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 hover:dark:bg-gray-700 transition-all"
    >
      <div className="relative">
        <img
          className="w-full aspect-video object-cover rounded-t-lg"
          src={course?.coverUrl}
          alt="Video Thumbnail"
        />

        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md">
          12:34
        </div>
      </div>

      <div className="w-full flex p-2 overflow-hidden">
        <img
          className="w-10 h-10 rounded-full"
          src={course?.creator?.dp || "https://placehold.co/400"}
          alt="Channel Logo"
        />

        <div className="flex-1 ml-3 overflow-hidden">
          <h5 className="max-w-56 text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
            {course?.title || "Video Title Goes Here"}
          </h5>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {course?.creator?.username || "Channel Name"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {course?.createdAt && formatDistanceToNow(new Date(course.createdAt))} ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
