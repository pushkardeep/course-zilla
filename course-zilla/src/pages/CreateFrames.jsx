import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from "../components/imageUploader";
import DeletionMenu from "../components/deletionMenu";
import Navigationbar from "../components/navbar";
import Slider from "../components/slider";

import { Label, TextInput, Button } from "flowbite-react";

import { setFlash } from "../redux/slices/flash-slice";
import { imgUploader } from "../services/cloudinary/img-uploader";
import { createFrame } from "../services/post/post.service";

import {
  setFrameImgUrl,
  setTitle,
  discard,
} from "../redux/slices/frames-creation.slice";

function CreatePost() {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.token);
  const { frameImgUrl, title } = useSelector((state) => state.framesCreation);
  const [isFormValid, setIsFormValid] = useState(frameImgUrl && title);

  useEffect(() => {
    setIsFormValid(frameImgUrl && title);
  }, [frameImgUrl, title]);

  const onDiscard = () => {
    dispatch(discard());
  };

  const onImgInputChange = async (e, setIsUploading) => {
    setIsUploading(true);
    const result = await imgUploader(e.target.files[0], dispatch, token);
    if (result.success) {
      dispatch(setFrameImgUrl(result.url));
    }
    setIsUploading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message, frame } = await createFrame(
      {
        title,
        frameImgUrl,
      },
      dispatch,
      token
    );
    if (!success) {
      return dispatch(setFlash({ type: "danger", message }));
    }
    dispatch(
      setFlash({ type: "success", message: "Frame created successfully" })
    );
    dispatch(discard());
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 relative">
      <Navigationbar sliderRef={sliderRef} />
      <div className="flex-1 flex overflow-hidden relative">
        <Slider ref={sliderRef} />

        <div className="flex-1 h-full relative z-10 overflow-hidden">
          <div className="w-full h-full relative flex justify-center items-center p-3 dark:bg-gray-900">
            <div className="absolute top-0 left-0">
              <DeletionMenu
                warning={"Do you really want to discard."}
                method={onDiscard}
              />
            </div>

            <div className="w-full min-[440px]:w-96 shadow-md bg-[#fbfbfb] dark:bg-gray-800 p-2 rounded-lg">
              <ImageUploader
                onChange={onImgInputChange}
                coverImgUrl={frameImgUrl}
              />
              <form
                onSubmit={onSubmit}
                className="w-full flex flex-col mt-2.5 gap-1.5"
              >
                <div>
                  <Label htmlFor="small" value="Title" />
                  <TextInput
                    id="small"
                    type="text"
                    sizing="sm"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className={`w-full mt-1 ${
                    isFormValid ? "bg-blue-600" : "bg-gray-500"
                  }`}
                  color={isFormValid ? "blue" : "gray"}
                  size="sm"
                  disabled={!isFormValid}
                >
                  Publish Course
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
