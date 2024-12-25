import React from "react";
import { useSelector } from "react-redux";

import { Spinner } from "flowbite-react";

function Loader() {
  const { loading } = useSelector((state) => state.loading);
  return (
    <>
      {loading && (
        <div className="w-full min-h-screen flex justify-center items-center fixed top-0 left-0 backdrop-blur-md bg-white/50 dark:bg-gray-800/50 z-50">
          <Spinner aria-label="Loading..." size="xl" />
        </div>
      )}
    </>
  );
}

export default Loader;
