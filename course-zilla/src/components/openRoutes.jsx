import React from "react";

// hooks
import { useSelector } from "react-redux";

// buildin components
import { Navigate } from "react-router-dom";

function OpenRoutes({ children }) {
  const { token } = useSelector((state) => state.token);

  return <>{token ? <Navigate to={"/feed"} /> : children}</>;
}

export default OpenRoutes;
