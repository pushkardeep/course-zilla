import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import ImageUploader from "../components/imageUploader";
import DeletionMenu from "../components/deletionMenu";
import VideoUploader from "../components/videoUploader";
import Navigationbar from "../components/navbar";
import Slider from "../components/slider";

import { Label, Textarea, TextInput, Button } from "flowbite-react";

import { createPost } from "../services/post/post.service";

import { discard, setDescription, setTitle } from "../redux/slices/post-creation-slice";
import { setFlash } from "../redux/slices/flash-slice";

function CreatePost() {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  const { token } = useSelector((state) => state.token);
  const { title, description, videoUrl, coverUrl } = useSelector((state) => state.postCreation);

  const isFormValid = title && description && videoUrl && coverUrl;

  const onDiscard = () => {
    dispatch(discard());
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!videoUrl || !coverUrl || !title || !description) {
      dispatch(
        setFlash({
          type: "danger",
          message: "Please fill out all required fields!",
        })
      );
      return;
    }

    const response = await createPost(
      { title, description, videoUrl, coverUrl },
      dispatch,
      token
    );

    if (!response.success) {
      dispatch(setFlash({ type: "danger", message: response.message }));
      return;
    }

    dispatch(setFlash({ type: "success", message: "Course Published Successfully!" }));
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 relative">
      <Navigationbar sliderRef={sliderRef} />
      <div className="flex-1 flex overflow-hidden relative">
        <Slider ref={sliderRef} />

        <div className="flex-1 h-full relative z-10 overflow-hidden">
          <div className="w-full h-full relative flex justify-center items-center p-3 dark:bg-gray-900">
            {!videoUrl && <VideoUploader />}

            <div className="absolute top-0 left-0">
              <DeletionMenu warning={"Do you really want to discard."} method={onDiscard} />
            </div>

            <div className="w-full min-[440px]:w-96 shadow-md bg-[#fbfbfb] dark:bg-gray-800 p-2 rounded-lg">
              <ImageUploader />
              <form onSubmit={onSubmit} className="w-full flex flex-col mt-2.5 gap-1.5">
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

                <div className="max-w-md">
                  <Label htmlFor="comment" value="Description" />
                  <Textarea
                    id="comment"
                    placeholder="Write the description...."
                    value={description}
                    onChange={(e) => dispatch(setDescription(e.target.value))}
                    required
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className={`w-full mt-1 ${isFormValid ? "bg-blue-600" : "bg-gray-500"}`}
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
