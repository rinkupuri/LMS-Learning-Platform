"use client";
import React, { useState } from "react";
import Protected from "../components/hooks/Protected";
import Header from "../components/Header";
import ProfileComponent from "../components/Profile/Profile";

type Props = {};

const Profile = (props: Props) => {
  const [activeItem, setActiveItem] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <Protected>
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
      <ProfileComponent />
    </Protected>
  );
};

export default Profile;
