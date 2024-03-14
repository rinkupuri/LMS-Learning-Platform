import Image from "next/image";
import React, { FC } from "react";

type Props = {
  avatar: string;
  setAvatar: (avatar: string) => void;
  user: {
    name: string;
    email: string;
    avatar: {
      url: string;
    };
  };
  active: number;
  setActive: (active: number) => void;
};

const SideBar: FC<Props> = ({ avatar, setAvatar, user, setActive, active }) => {
  return (
    <div className="flex-[1.5] w-full items-center">
      <div className="flex w-10/12 h-fit flex-col">
        <Image
          width={150}
          height={150}
          className="w-[150px] h-[150px] object-cover"
          alt="Profile Image"
          src={`${avatar}`}
        />
        <h1>{user.name}</h1>
      </div>
    </div>
  );
};

export default SideBar;
