import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { DarkThemeToggle } from "flowbite-react";
import { HiMenu, HiOutlineArrowRight } from "react-icons/hi";

import ProfileDropdown from "./profileDropdown";
import Searchbar from "./searchbar";

function Navigationbar({ sliderRef }) {
  const { token } = useSelector((state) => state.token);

  const toggleMenu = () => {
    if (sliderRef.current) {
      sliderRef.current.classList.toggle("-translate-x-[100%]");
      sliderRef.current.classList.toggle("-translate-x-[0%]");
    }
  };

  return (
    <nav className="w-full bg-white border-b-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4">
      <div className="w-full flex flex-col min-[350px]:flex-row items-center justify-between">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/images/logo.png" className="h-10" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Course Zilla
          </span>
        </a>

        <div className="flex items-center gap-1.5">
          <DarkThemeToggle />
          <div className="hidden md:block">
            <Searchbar sliderRef={sliderRef} />
          </div>
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center p-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <HiMenu className="w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400" />
          </button>
          {token ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link
                to="/sign_in"
                className="hidden sm:block text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="hidden sm:flex items-center gap-1 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                Sign Up
                <HiOutlineArrowRight className="h-full" />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigationbar;
