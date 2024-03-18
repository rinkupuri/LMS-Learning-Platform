import { style } from "@/app/styles/style";
import { useLogoutMutation } from "@/redux/features/api/apislicer";
import { signOut } from "next-auth/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgPassword } from "react-icons/cg";
import { FaFileInvoice } from "react-icons/fa";
import {
  MdAdminPanelSettings,
  MdOutlineAdminPanelSettings,
  MdPayment,
  MdSecurity,
} from "react-icons/md";
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
  const [logout] = useLogoutMutation();
  const handellogout = () => {
    logout({}).then(() => {
      signOut({ callbackUrl: "/" });
    });
  };

  return (
    <div className="flex-[1] md:flex-[1.5]   w-full  justify-center items-center">
      <div className="flex w-[60px] md:w-10/12 xl:w-8/12 h-[80%] items-center rounded-md shadow-md border-[1px] dark:border-slate-800 flex-col">
        <div
          onClick={() => setActive(0)}
          className={`flex cursor-pointer ${
            active === 0 ? "dark:bg-slate-900 bg-slate-300 " : ""
          } justify-center flex-col pb-2  items-center w-full`}
        >
          <Image
            width={80}
            height={80}
            onClick={() => setActive(0)}
            className={`mt-5 mb-5   md:mb-0 w-10 rounded-full h-10 800px:w-[90px] 800px:h-[90px] object-cover`}
            alt="Profile Image"
            src={user?.avatar?.url ? user.avatar.url : avatar}
          />
          <h1 className={`${style.title}   hidden md:block `}>{user.name}</h1>
        </div>
        <div
          onClick={() => setActive(1)}
          className={`flex cursor-pointer ${
            active === 1 ? "dark:bg-slate-900 bg-slate-300 " : ""
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
          onClick={() => setActive(2)}
          className={`flex cursor-pointer ${
            active === 2 ? "dark:bg-slate-900 bg-slate-300" : ""
          } justify-center mt-2 h-[60px] items-center w-full`}
        >
          <div
            className={`flex justify-center  md:justify-start gap-3  items-center w-10/12 `}
          >
            <MdSecurity size={20} className="text-black dark:text-white" />
            <h1 className="md:block hidden">Change Password</h1>
          </div>
        </div>
        <div
          onClick={() => setActive(3)}
          className={`flex cursor-pointer ${
            active === 3 ? "dark:bg-slate-900 bg-slate-300" : ""
          } justify-center mt-2 h-[60px] items-center w-full`}
        >
          <div
            className={`flex justify-center  md:justify-start gap-3  items-center w-10/12 `}
          >
            <FaFileInvoice size={20} className="text-black dark:text-white" />
            <h1 className="md:block hidden">Payment History</h1>
          </div>
        </div>
        <Link
          href={"/admin"}
          onClick={() => setActive(4)}
          className={`flex cursor-pointer ${
            active === 4 ? "dark:bg-slate-900 bg-slate-300" : ""
          } justify-center mt-2 h-[60px] items-center w-full`}
        >
          <div
            className={`flex justify-center  md:justify-start gap-3  items-center w-10/12 `}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              className="text-black dark:text-white"
            />
            <h1 className="md:block hidden">Access Admin</h1>
          </div>
        </Link>
        <div
          onClick={handellogout}
          className={`flex cursor-pointer ${
            active === 5 ? "dark:bg-slate-900 bg-slate-300" : ""
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
