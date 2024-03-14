"use client";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  activeItem: Number;
  isMobile: boolean;
};

const Navbar: FC<Props> = (props) => {
  const navData = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "FAQ", link: "/faq" },
  ];
  return (
    <>
      <div className="hidden 800px:flex">
        {navData?.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.link}
              passHref
              className={`p-4 font-Poppins font-[400] text-[18px] ${
                index === props.activeItem
                  ? "dark:text-[#37a39a] text-[crimson]"
                  : "dark:text-white text-black"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      {props.isMobile
        ? navData?.map((item, index) => {
            return (
              <div key={index} className="flex justify-center items-center">
                <Link
                  key={index}
                  href={item.link}
                  passHref
                  className={`p-4 font-Poppins font-[400] text-[18px] ${
                    index === props.activeItem
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            );
          })
        : null}
    </>
  );
};

export default Navbar;
