import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { profile } from "../services/user/user.service";
import { setFlash } from "../redux/slices/flash-slice";

function UserFetcher() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.user);

  const fetchUser = async () => {
    const response = await profile(dispatch, token);
    if (!response.success) {
      dispatch(setFlash({ type: "danger", message: response.message }));
    }
  };

  useEffect(() => {
    if (!user && token) {
      fetchUser();
    }
  }, [token, user]);
}

export default UserFetcher;
