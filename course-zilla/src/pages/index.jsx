import React, { useRef } from "react";

import Navigationbar from "../components/navbar";
import BodyFooter from "../components/footer";
import Slider from "../components/slider";
import { Link } from "react-router-dom";

function Index() {
  const sliderRef = useRef();
  return (
    <div className="h-screen flex flex-col justify-center dark:bg-gray-900 relative ">
      <Navigationbar sliderRef={sliderRef} />
      <div className="flex-1 flex overflow-hidden relative">
        <Slider ref={sliderRef} />

        <div className="flex-1 h-full z-10 relative overflow-hidden">
          <img
            className="w-full h-full object-cover opacity-25 dark:opacity-10"
            src="/images/index.jpg"
            alt=""
          />
          <section className="w-full absolute top-0">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                We invest in the world’s potential
              </h1>
              <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                Here at course zilla we focus on markets where technology,
                innovation, and capital can unlock long-term value and drive
                economic growth.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                <Link
                 to={"/register"}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                  Get started
                  <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <BodyFooter />
    </div>
  );
}

export default Index;
