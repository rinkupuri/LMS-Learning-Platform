import Link from "next/link";
import React, { FC, useState } from "react";
import Navbar from "../components/Navbar";
import ThemeSwitcher from "../utils/themeSwitcher";
import {
  HiOutlineMenuAlt3,
  HiOutlineUser,
  HiOutlineUserCircle,
} from "react-icons/hi";
import ModelComponent from "../components/ModelComponent";
import Login from "../components/Login";
import SignIn from "./SignIn";
import VerifyOTP from "./Auth/VerifyOTP";
import { style } from "../styles/style";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};

const Header: FC<Props> = (props) => {
  const [active, setActive] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("");
  return (
    <div className={`w-full h-[80px] bg-no-repeat `}>
      <div
        className={`flex items-center  justify-center ${
          active
            ? "dark:bg-opacity-50 bg-no-repeat  dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] shadow-xl transition duration-500 z-[80] dark:border-b dark:border-[#ffffff1c]"
            : "w-full border-b dark:border-[#ffffff1c] fixed top-0 left-0 h-[80px] shadow-xl bg-no-repeat  "
        }`}
      >
        <div className="w-11/12 font-[500] text-black dark:text-white flex justify-between items-center">
          <Link href={"/"} className={`text-[20px] font-[500] ${style.title}`}>
            RP Dev
          </Link>
          <Navbar activeItem={props.activeItem} isMobile={false} />
          <div className="flex gap-5 h-full justify-center items-center ">
            <ThemeSwitcher />
            {/* Only For Mobile  */}
            <div className="800px:hidden">
              <HiOutlineMenuAlt3
                onClick={() => setOpenDrawer(!openDrawer)}
                className="text-[30px] text-black dark:text-white cursor-pointer"
              />
            </div>
            <HiOutlineUserCircle
              onClick={() => {
                setOpen(true);
                setRoute("Login");
              }}
              className="text-[30px] 800px:block hidden text-black dark:text-white cursor-pointer"
            />
          </div>
        </div>
        {route === "Login" && (
          <ModelComponent
            Component={Login}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
          />
        )}
        {route === "SignIn" && (
          <ModelComponent
            Component={SignIn}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
          />
        )}
        {route === "verify" && (
          <ModelComponent
            Component={VerifyOTP}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
          />
        )}
      </div>
      {/* Drawer Menu  */}
      {openDrawer && (
        <div
          className="fixed top-0  left-0 w-full h-screen dark:bg-[unset] bg-[#00000024] z-[9999999]"
          id="screen"
          onClick={() => setOpenDrawer(false)}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="absolute  top-0 right-0 w-[73%] bg-white bg-opacity-100 dark:bg-slate-900 h-full dark:bg-opacity-90 z-[99999999999] "
          >
            <Link
              href={"/"}
              className={`text-[20px]  py-8 flex items-center mt-4 justify-center font-[500] !text-black dark:!text-white ${style.title}`}
            >
              RP Dev
            </Link>
            <div className="flex  w-full justify-start items-start px-8 flex-col">
              <Navbar activeItem={props.activeItem} isMobile={true} />
            </div>
            <br />
            <br />
            <div className="flex w-full justify-start items-center px-8">
              <HiOutlineUserCircle
                onClick={() => {
                  setOpen(true);
                  setRoute("Login");
                }}
                size={30}
                className="text-black dark:text-white cursor-pointer"
              />
            </div>
            <div className="flex text-[16px] p-8 text-black dark:text-white">
              Copyrighted @2024 Rinku
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
