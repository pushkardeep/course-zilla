import React from "react";
import { formatDistanceToNow } from "date-fns";

function FrameCard({ frame }) {
  console.log(frame);
  return (
    <div className="masonary-grid-item cursor-pointer w-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 hover:dark:bg-gray-700 transition-all overflow-hidden">
      <img
        src={frame?.frameImgUrl}
        alt="frame"
        className="w-full h-full shadow-md object-cover"
      />
      <div className="w-full py-2 px-4 overflow-hidden">
        <h1 className="text-black dark:text-white text-sm">
          {frame?.title || "Creator"}
        </h1>
        <div className="flex items-center gap-1.5 mt-1.5">
          <img
            src={frame?.user?.dp}
            alt="user"
            className="w-5 h-5 rounded-full shadow-md"
          />
          <div className="w-full flex items-center justify-between">
            <h1 className="text-black dark:text-white text-xs">
              {frame?.user?.username}
            </h1>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {frame?.createdAt &&
                formatDistanceToNow(new Date(frame.createdAt))}{" "}
              ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrameCard;
