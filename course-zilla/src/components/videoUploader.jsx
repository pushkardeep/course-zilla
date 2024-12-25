import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useBeforeunload } from "react-beforeunload";

import { Button } from "flowbite-react";

import { Progressbar } from "./progressbar";

import { chunkedUpload } from "../services/cloudinary/chunk-uploader";

import { setVideoUrl } from "../redux/slices/post-creation-slice";
import { setFlash } from "../redux/slices/flash-slice";

function VideoUploader() {
  const dispatch = useDispatch();

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();

  // Prevent the user from leaving the page during upload
  useBeforeunload((event) => {
    if (isUploading) {
      event.preventDefault();
    }
  });

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const result = await chunkedUpload(file, setProgress);
    if (result.success) {
      if (result.url) {
        dispatch(setVideoUrl(result.url));
        dispatch(
          setFlash({ type: "success", message: "Video Uploaded Succesfully" })
        );
      }
    } else {
      dispatch(setFlash({ type: "danger", message: result.message }));
    }
    setIsUploading(false);
  };

  return (
    <div className="absolute w-full h-full min-h-fit backdrop-blur-sm bg-slate-600 bg-opacity-75 flex justify-center items-center z-20 px-2">
      <div className="shadow-md bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Upload Your Video
        </h3>

        {!isUploading ? (
          <form onSubmit={onSubmit} className="w-full">
            <div>
              <label
                htmlFor="video"
                className="block text-sm text-gray-700 dark:text-gray-300 mb-2"
              >
                Choose a "mp4" video file under "80mb".
              </label>
              <input
                onChange={onChange}
                type="file"
                id="video"
                name="video"
                accept="video/*"
                className="block w-full text-sm text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md p-2"
                required
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Upload
              </Button>
            </div>
          </form>
        ) : (
          <Progressbar value={progress} />
        )}
      </div>
    </div>
  );
}

export default VideoUploader;
