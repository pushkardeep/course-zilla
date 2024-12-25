import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import VideoJS from "../components/videojs";
import Navigationbar from "../components/navbar";
import Slider from "../components/slider";
import Recomendations from "../components/Recomendations";
import VideoActions from "../components/videoActions";

import { Spinner } from "flowbite-react";
import { fetchVideo } from "../services/post/post.service";

import { setFlash } from "../redux/slices/flash-slice";
import { setCourse, setCreator } from "../redux/slices/watching-slice";

const Video = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef(null);
  const sliderRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const { token } = useSelector((state) => state.token);
  const { course } = useSelector((state) => state.watch);
  const { creator } = useSelector((state) => state.watch);

  const videoParam = new URLSearchParams(location.search);
  const videoQuery = videoParam.get("_id");

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: course?.videoUrl
      ? [
          {
            src: course?.videoUrl,
            type: "application/x-mpegURL", // Assuming HLS video format
          },
        ]
      : [],
  };



  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => console.log("Player is waiting"));
    player.on("dispose", () => console.log("Player will dispose"));
  };

  // Fetch video details
  const getVideo = async () => {
    setLoading(true);
    const { success, course, creator, message } = await fetchVideo(
      videoQuery,
      token
    );
    if (!success) {
      dispatch(
        setFlash({
          type: "danger",
          message: message || "Error fetching video details",
        })
      );
    }
    if (success) {
      dispatch(setCourse(course));
      dispatch(setCreator(creator));
    }
    setLoading(false);
  };

  // Fetch video data on component mount or query change
  useEffect(() => {
    getVideo();
  }, [videoQuery]);

  // Loading Spinner JSX
  const renderLoading = (
    <div className="w-full h-fit px-2 mt-2">
      <div className="w-full aspect-video flex items-center justify-center border-2 rounded-md border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white px-2 py-3">
        <Spinner size="xl" />
      </div>
    </div>
  );

  // Main Video JSX
  const renderVideoPlayer = (
    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
  );

  return (
    <div className="h-screen flex flex-col justify-center dark:bg-gray-900 relative">
      <Navigationbar sliderRef={sliderRef} />
      <div className="flex-1 flex overflow-hidden relative">
        <Slider ref={sliderRef} />

        {/* Video Player Section */}
        <div className="flex-1 h-full z-10 md:p-4 overflow-y-auto">
          {loading ? renderLoading : renderVideoPlayer}

          {/* Video Actions Section */}
          <VideoActions
            loading={loading}
          />

          {/* Recommendations Section (Mobile view) */}
          <div className="w-full h-fit lg:hidden px-2 border-white">
            <Recomendations />
          </div>
        </div>

        {/* Recommendations Section (Desktop view) */}
        <div className="hidden lg:block">
          <Recomendations />
        </div>
      </div>
    </div>
  );
};

export default Video;
