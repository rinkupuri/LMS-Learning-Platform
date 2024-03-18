"use client";
import Image from "next/image";
import React, { FC } from "react";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import avatar from "../../../public/user (1).png";
import { SiCoursera } from "react-icons/si";
import { IoCreate } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";

type IUser = {
  name: string;
  email: string;
  avatar: {
    url: string;
  };
  role: string;
};

type Props = {
  drawer: boolean;
  setDrawer: (drawer: boolean) => void;
  drawerActive: number;
  setDrawerActive: (drawerActive: number) => void;
};

const sidebar: FC<Props> = ({
  drawer,
  setDrawer,
  drawerActive,
  setDrawerActive,
}) => {
  const { user }: { user: IUser } = useSelector((state: any) => state.auth);
  return (
    <>
      <div
        onClick={() => setDrawer(!drawer)}
        className="flex fixed top-0 bg-[#00000080] left-0 w-full h-screen"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex w-[300px] flex-col bg-black opacity-100 h-full"
        >
          <div className="flex flex-col w-full h-fit  mt-5 justify-center items-center">
            <Image
              src={user?.avatar?.url ? user?.avatar?.url : avatar}
              width={100}
              height={100}
              alt="logo"
            />
            <h1 className="text-white text-2xl font-bold">{user.name}</h1>
          </div>

          {/* create course Menu */}
          <div
            className={`flex mt-2 justify-center items-center h-[60px] w-full `}
          >
            <Link
              href={"/admin/editcourse"}
              onClick={() => setDrawerActive(0)}
              className={`flex items-center p-2 gap-2 cursor-pointer rounded-sm hover:bg-slate-900   h-full w-10/12 ${
                drawerActive === 0 ? "bg-slate-900" : ""
              }`}
            >
              <IoCreate size={20} /> Create Course
            </Link>
          </div>
          {/* edit Course menu */}
          <div
            className={`flex  mt-2 justify-center items-center h-[60px] w-full `}
          >
            <Link
              href={"/admin/editcourse"}
              onClick={() => setDrawerActive(1)}
              className={`flex items-center p-2 gap-2 cursor-pointer rounded-sm hover:bg-slate-900   h-full w-10/12 ${
                drawerActive === 1 ? "bg-slate-900" : ""
              }`}
            >
              <BiEdit size={20} /> Edit Course
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default sidebar;
