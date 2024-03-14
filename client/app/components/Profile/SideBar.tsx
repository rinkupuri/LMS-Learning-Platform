import { style } from "@/app/styles/style";
import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaFileInvoice } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { SiCoursera } from "react-icons/si";

type Props = {
  avatar: StaticImageData;
  setAvatar: (avatar: StaticImageData) => void;
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
    <div className="flex-[1.5]  w-full  justify-center items-center">
      <div className="flex w-[80px] md:w-10/12 xl:w-8/12 h-[80%] items-center rounded-md shadow-md border-[1px] dark:border-slate-800 flex-col">
        <Image
          width={80}
          height={80}
          className="mt-5 w-10 h-10 800px:w-[90px] 800px:h-[90px] object-cover"
          alt="Profile Image"
          src={user?.avatar?.url ? user.avatar.url : avatar}
        />
        <h1 className={`${style.title}`}>{user.name}</h1>
        <div
          onClick={() => setActive(0)}
          className={`flex cursor-pointer ${
            active === 0 ? "dark:bg-slate-900" : ""
          } justify-center mt-2 h-[60px] items-center w-full`}
        >
          <div
            className={`flex justify-center  md:justify-start gap-3  items-center w-10/12 `}
          >
            <SiCoursera size={20} className="text-black dark:text-white" />
            <h1 className="md:block hidden">Couses</h1>
          </div>
        </div>
        <div
          onClick={() => setActive(1)}
          className={`flex cursor-pointer ${
            active === 1 ? "dark:bg-slate-900" : ""
          } justify-center mt-2 h-[60px] items-center w-full`}
        >
          <div
            className={`flex justify-center  md:justify-start gap-3  items-center w-10/12 `}
          >
            <MdPayment size={20} className="text-black dark:text-white" />
            <h1 className="md:block hidden">Saved Cards</h1>
          </div>
        </div>
        <div
          onClick={() => setActive(2)}
          className={`flex cursor-pointer ${
            active === 2 ? "dark:bg-slate-900" : ""
          } justify-center mt-2 h-[60px] items-center w-full`}
        >
          <div
            className={`flex justify-center  md:justify-start gap-3  items-center w-10/12 `}
          >
            <FaFileInvoice size={20} className="text-black dark:text-white" />
            <h1 className="md:block hidden">Payment History</h1>
          </div>
        </div>
        <div
          onClick={() => setActive(3)}
          className={`flex cursor-pointer ${
            active === 3 ? "dark:bg-slate-900" : ""
          } justify-center mt-2 h-[60px] items-center w-full`}
        >
          <div
            className={`flex justify-center  md:justify-start gap-3  items-center w-10/12 `}
          >
            <BiLogOut size={20} className="text-black dark:text-white" />
            <h1 className="md:block hidden">Log Out</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
