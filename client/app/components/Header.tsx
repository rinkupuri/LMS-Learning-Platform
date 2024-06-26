import Link from "next/link";
import React, { FC, useState } from "react";
import Navbar from "../components/Navbar";
import ThemeSwitcher from "../utils/themeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import ModelComponent from "../components/ModelComponent";
import Login from "../components/Login";
import SignIn from "./SignIn";
import VerifyOTP from "./Auth/VerifyOTP";
import { style } from "../styles/style";
import { logoDark, logoLight } from "./LogoSvg/logo";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  activeItem: number;
};

const Header: FC<Props> = (props) => {
  const { theme } = useTheme();
  const { user } = useSelector((state: any) => state.auth);
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
          <div className="flex  h-full justify-center items-center ">
            <ThemeSwitcher />
            {/* Only For Mobile  */}
            <div className="md:hidden">
              <HiOutlineMenuAlt3
                onClick={() => setOpenDrawer(!openDrawer)}
                className="text-[30px] ml-5 text-black dark:text-white cursor-pointer"
              />
            </div>
            {!user ? (
              <HiOutlineUserCircle
                onClick={() => {
                  setOpen(true);
                  setRoute("Login");
                }}
                className="text-[30px] ml-5 md:block hidden text-black dark:text-white cursor-pointer"
              />
            ) : user?.avatar?.url ? (
              <Link href={"/profile"}>
                <img
                  src={user.avatar.url}
                  className="object-cover ml-5 rounded-full md:block hidden w-[45px] h-[45px]"
                  alt="Profile Image"
                />
              </Link>
            ) : (
              <Link href={"/profile"}>
                <img
                  src={
                    "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1710358314~exp=1710361914~hmac=1326ed069883aac900b23adcf37a95cde14a3ce04dbb8a796c85a5f734c6ee7b"
                  }
                  className="object-cover ml-5 md:block hidden rounded-full w-[45px] h-[45px]"
                  alt="Profile Image"
                />
              </Link>
            )}
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
              <div className="flex w-[120px] h-[120px]">
                {theme === "light" ? logoLight() : logoDark()}
              </div>
            </Link>
            <div className="flex  w-full justify-start items-start px-8 flex-col">
              <Navbar activeItem={props.activeItem} isMobile={true} />
            </div>
            <br />
            <br />
            <div className="flex w-full justify-start items-center px-8">
              {!user ? (
                <HiOutlineUserCircle
                  onClick={() => {
                    setOpen(true);
                    setRoute("Login");
                  }}
                  className="text-[30px] md:hidden block  text-black dark:text-white cursor-pointer"
                />
              ) : user?.avatar?.url ? (
                <Link href={"/profile"}>
                  <img
                    src={user.avatar.url}
                    className="object-cover rounded-full w-[45px] h-[45px]"
                    alt="Profile Image"
                  />
                </Link>
              ) : (
                <Link href={"/profile"}>
                  <img
                    src={require("../../public/user (1).png")}
                    className="object-cover rounded-full w-[45px] h-[45px]"
                    alt="Profile Image"
                  />
                </Link>
              )}
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
