import React, { useState } from "react";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import avatarImage from "../../../public/user (1).png";

type Props = {};

const Profile = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [avatar, setAvatar] = useState(avatarImage);
  const [active, setActive] = useState(0);
  return (
    <div className="flex w-full h-screen justify-center mt-5 items-center">
      <div className="800px:w-[83%] flex w-[90%] h-screen">
        <SideBar
          avatar={avatar}
          setAvatar={setAvatar}
          user={user}
          setActive={setActive}
          active={active}
        />
        <div className="flex flex-[3]">Profile</div>
      </div>
    </div>
  );
};

export default Profile;
