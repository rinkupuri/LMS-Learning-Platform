import { style } from "@/app/styles/style";
import React, { FC } from "react";
import { BiUser } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";

type Props = {
  drawer: boolean;
  setDrawer: (drawer: boolean) => void;
};

const AdminNavbar: FC<Props> = ({ drawer, setDrawer }) => {
  return (
    <div className="flex w-full h-[80px]">
      <div
        className={`flex items-center  justify-center dark:bg-opacity-50 bg-no-repeat  dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] shadow-xl transition duration-500 z-[80] dark:border-b dark:border-[#ffffff1c]`}
      >
        <div className="flex w-11/12 h-full justify-between  items-center">
          <div className="flex justify-center items-center gap-3">
            <HiMenuAlt3
              onClick={() => setDrawer(!drawer)}
              className="cursor-pointer"
              title="Menu"
              size={35}
            />
            <h1 className={`${style.title}`}>Admin Dashboard</h1>
            <div className="flex h-[23px] justify-end items-end">
              <p className="text-[12px] font-Poppins text-slate-600">(V 1.0)</p>
            </div>
          </div>
          <div className="flex gap-4">
            <BiUser className="cursor-pointer" title="User" size={20} />
            <CiSettings className="cursor-pointer" title="Settings" size={20} />
            <MdOutlineNotifications
              className="cursor-pointer"
              title="Notifiaction"
              size={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
