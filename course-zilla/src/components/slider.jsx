import { forwardRef } from "react";
import { Link } from "react-router-dom";

import { HiUser, HiViewBoards, HiHome } from "react-icons/hi";
import { IoCreate, IoLogIn } from "react-icons/io5";
import { GiArchiveRegister } from "react-icons/gi";
import { MdFilterFrames } from "react-icons/md";

import Searchbar from "./searchbar";
import { useSelector } from "react-redux";

const Slider = forwardRef((props, ref) => {
  const { token } = useSelector((state) => state.token);

  return (
    <div
      ref={ref}
      className="w-full h-full z-20 absolute min-[400px]:w-60 sm:w-64 md:static transition-all -translate-x-[100%] md:-translate-x-[0%]"
    >
      <aside className="w-full h-full border-r-2 border-gray-200 dark:border-gray-700">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="w-full h-fit md:hidden">
            <Searchbar sliderRef={props.sliderRef} />
          </div>
          <ul className="space-y-2 mt-2 md:mt-0 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiHome className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/feed"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiViewBoards className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Feeds</span>
              </Link>
            </li>
            <li>
              <Link
                to="/frames"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdFilterFrames className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Frames</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiUser className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/create_post"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoCreate className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Create Post
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/create_frames"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoCreate className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Create Frame
                </span>
              </Link>
            </li>
            {!token && (
              <>
                <li>
                  <Link
                    to="/sign_in"
                    className="sm:hidden flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <IoLogIn className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Log In
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="sm:hidden flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <GiArchiveRegister className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Sign Up
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
});

export default Slider;
