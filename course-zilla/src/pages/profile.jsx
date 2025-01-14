import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IoMdCamera } from "react-icons/io";
import { Spinner } from "flowbite-react";

import { changeDp } from "../services/user/user.service";
import { setFlash } from "../redux/slices/flash-slice";

import { logOut } from "../services/auth/auth.service";

const Profile = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };

  const handleChange = async (e) => {
    setLoading(true);
    const response = await changeDp(e.target.files[0], dispatch, token);
    if (!response.success) {
      setLoading(false);
      return dispatch(
        setFlash({
          type: "danger",
          message: response.message || "Uploadtion error",
        })
      );
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center dark:bg-gray-900 px-2 py-2">
      <div className="w-full max-w-sm relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            onClick={toggleDropdown}
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div
              id="dropdown"
              className="absolute top-14 z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul className="py-2" aria-labelledby="dropdownButton">
                <li>
                  <button
                    onClick={() => {
                      logOut(dispatch);
                    }}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center pb-10">
          <div
            className={`w-24 h-24 mb-3 rounded-full shadow-lg flex justify-center items-center relative ${
              loading ? "bg-gray-600" : null
            }`}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={user?.dp || "https://placehold.co/400"}
                  alt="Bonnie image"
                />
                <span
                  onClick={handleClick}
                  className="cursor-pointer absolute top-16 left-16 text-white bg-blue-700 hover:bg-blue-600 p-2 rounded-full shadow-lg"
                >
                  <IoMdCamera />
                </span>
              </>
            )}
            <input
              onChange={handleChange}
              ref={inputRef}
              hidden
              type="file"
              accept="image/*"
            />
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user?.username}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email}
          </span>
          <div className="flex gap-2 mt-4 md:mt-6">
            <Link
              to={"/create_post"}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Course
            </Link>
            <Link
              to={"/create_frames"}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Frames
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
