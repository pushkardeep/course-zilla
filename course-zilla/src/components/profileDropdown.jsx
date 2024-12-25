// hooks etc
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Avatar, Dropdown } from "flowbite-react";

function ProfileDropdown() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const onClick = () => {};
  return (
    <Dropdown
      className="z-40"
      arrowIcon={false}
      inline
      label={
        <Avatar
          alt="User settings"
          img={user?.dp || "https://placehold.co/400"}
          rounded
        />
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">{user && user.username}</span>
        <span className="block truncate text-sm font-medium">
          {user && user.email}
        </span>
      </Dropdown.Header>
      <Link to={"/profile"}>
        <Dropdown.Item>Profile</Dropdown.Item>
      </Link>
      <Link to={"/create_post"}>
        <Dropdown.Item>Create Post</Dropdown.Item>
      </Link>
      <Dropdown.Divider />
      <Dropdown.Item onClick={onClick}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}

export default ProfileDropdown;
