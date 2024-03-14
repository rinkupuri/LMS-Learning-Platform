import React, { useState } from "react";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";

type Props = {};

const Profile = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [avatar, setAvatar] = useState(
    "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1710358314~exp=1710361914~hmac=1326ed069883aac900b23adcf37a95cde14a3ce04dbb8a796c85a5f734c6ee7b"
  );
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
