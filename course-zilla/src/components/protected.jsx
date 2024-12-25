import React from "react";

// hooks
import { useSelector } from "react-redux";

// buildin components
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const { token } = useSelector((state) => state.token);

  return <>{token ? children : <Navigate to={"/sign_in"} />}</>;
}

export default Protected;
