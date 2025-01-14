import React, { useRef, useEffect } from "react";
import Navigationbar from "../components/navbar";
import Slider from "../components/slider";
import FrameCard from "../components/frameCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchFrames } from "../services/post/post.service";
import { setFlash } from "../redux/slices/flash-slice";

function Frames() {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  const { frames } = useSelector((state) => state.frames);
  const { token } = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.user);

  const getFrames = async () => {
    const { success, message } = await fetchFrames(dispatch, token);
    if (!success) {
      dispatch(setFlash({ message, type: "danger" }));
    }
  };

  useEffect(() => {
    if (user) {
      getFrames();
    }
  }, [user]);

  return (
    <div className="h-screen flex flex-col justify-center dark:bg-gray-900 relative">
      <Navigationbar sliderRef={sliderRef} />
      <div className="flex-1 flex overflow-hidden relative">
        <Slider sliderRef={sliderRef} ref={sliderRef} />
        <div className="flex-1 flex flex-col h-full z-10">
          {frames && frames.length > 0 ? (
            <>
              <h1 className="text-2xl font-medium text-center text-black dark:text-white my-4">
                Frames
              </h1>

              <div className="flex-1 overflow-y-auto">
                <div className="masonary-grid max-w-[1320px] mx-auto px-[15px] pb-[15px]">
                  {frames.map((frame) => (
                    <FrameCard key={frame._id} frame={frame} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-xs font-medium text-center text-black dark:text-white my-4 opacity-50">
                No frames found
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Frames;
