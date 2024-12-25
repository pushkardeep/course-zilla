import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FileInput, Label } from "flowbite-react";
import { Spinner } from "flowbite-react";

import { imgUploader } from "../services/cloudinary/img-uploader";

import { setCoverUrl } from "../redux/slices/post-creation-slice";
import { setFlash } from "../redux/slices/flash-slice";

import { useBeforeunload } from "react-beforeunload";

function ImageUploader() {
  const dispatch = useDispatch();

  const [isUploading, setIsUploading] = useState(false);
  const { coverUrl } = useSelector((state) => state.postCreation);

  useBeforeunload((event) => {
    if (isUploading) {
      event.preventDefault();
    }
  });

  const onChange = async (e) => {
    setIsUploading(true);
    const result = await imgUploader(e.target.files[0]);
    if (result.success) {
      dispatch(setCoverUrl(result.url));
      dispatch(
        setFlash({ type: "success", message: "Image Uploaded Succesfully" })
      );
    } else {
      dispatch(setFlash({ type: "danger", message: result.message }));
    }
    setIsUploading(false);
  };

  return (
    <div className="flex w-full items-center justify-center">
      {!isUploading ? (
        coverUrl ? null : (
          <Label
            htmlFor="dropzone-file"
            className="flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG or JPEG (MAX. 5MB)
              </p>
            </div>
            <FileInput
              onChange={onChange}
              required
              id="dropzone-file"
              className="hidden"
            />
          </Label>
        )
      ) : (
        <div className="flex h-52 w-full flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
          <Spinner aria-label="Loading..." size="xl" />
        </div>
      )}
      {coverUrl && (
        <div className="flex h-52 w-full flex-col items-center justify-center rounded-lg overflow-hidden border-2 border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
          <img
            className="w-full h-full object-cover"
            src={coverUrl}
            alt="cover url"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
