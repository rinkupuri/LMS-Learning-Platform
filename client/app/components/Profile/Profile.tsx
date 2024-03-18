import React, { useState } from "react";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import avatarImage from "../../../public/user (1).png";
import Header from "@/app/utils/Header";
import ProfilePageContent from "./ProfilePageContent";

type Props = {
  activeItem: number;
};

const Profile = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [avatar, setAvatar] = useState(avatarImage);
  const [active, setActive] = useState(0);
  return (
    <div className="flex *:text-black *:dark:text-white w-full h-screen justify-center mt-5 items-center">
      <Header
        title={`${user.name} - Profile`}
        description={`${user.name}'s Profile Detail Page`}
        keywords="LMS panel,easy learn,learning"
      />
      <div className="800px:w-[83%] flex w-[90%] h-screen">
        <SideBar
          avatar={avatar}
          setAvatar={setAvatar}
          user={user}
          setActive={setActive}
          active={active}
        />
        <div className="flex flex-col flex-[3]">
          <ProfilePageContent activeItem={active} user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
