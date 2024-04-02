import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CgSearch } from "react-icons/cg";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex lg:w-[90%] w-full  xl:w-[80%] gap-10 md:pr-10  m-auto  h-full md:h-[88vh]">
      <div className="flex w-full justify-center items-center  flex-col md:flex-row  ">
        {/* banner image section */}
        <div className="md:flex-1 flex justify-center   items-center ">
          <div className="flex relative  md:w-[70vh] md:h-[70vh] w-[35vh] h-[35vh] mt-10 md:mt-0 rounded-full p-10 hero_animation bg-blue-950">
            <Image
              src={require("../../public/banner-img-1.png")}
              alt="Banner Image for Learning  Platfrom"
              className="object-contain w-full h-full absolute p-4 top-0 left-0 right-0"
            />
          </div>
        </div>

        {/* banner text section */}
        <div className="md:flex-1 w-full pt-15   ">
          <div className="flex  flex-col px-10 ">
            <div className="flex ">
              <p className="xl:text-[44px] lg:text-[40px] md:text-[35px] text-[30px] text-black dark:text-white p-0 m-0 font-[700] font-Poppins">
                Improve Your Online Learning Experince Better instantly
              </p>
            </div>
            <div className="flex">
              <p className="text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px]  font-[600] text-black dark:text-white font-Josefin">
                We have 40k+ Online course & 500k+ registered students. Find
                your desire course from them
              </p>
            </div>
            <div className="flex min-w-full dark:border-[#000000] border-[1px] h-[40px] rounded-sm overflow-hidden flex-row justify-center items-center text-[16px] font-[600] w-11/12 mt-5 ">
              <input
                type="search"
                placeholder="Search Courses.."
                className="flex justify-center items-center text-black dark:text-white placeholder:dark:text-white placeholder:text-black  focus:outline-none focus:border-none active:outline-none active:border-none p-2 w-full h-full"
              />
              <CgSearch
                size={20}
                className="w-[10%] text-black dark:text-white bg-blue-600 h-full p-[6px]"
              />
            </div>
            <div className="flex mt-6 gap-5 flex-row md:flex-row ">
              <div className="flex relative h-[45px] w-[150px] ">
                <img
                  width={50}
                  height={50}
                  className="w-[45px] absolute border-[2px] border-white h-[45px] rounded-full object-cover"
                  src={
                    "https://i.pinimg.com/564x/85/22/34/8522346c05525356198706df30c7ebe0.jpg"
                  }
                  alt="User Png"
                />
                <img
                  width={50}
                  height={50}
                  className="w-[45px] absolute left-[25px] border-[2px] border-white h-[45px] rounded-full object-cover"
                  src={
                    "https://i.pinimg.com/564x/85/22/34/8522346c05525356198706df30c7ebe0.jpg"
                  }
                  alt="User Png"
                />
                <img
                  width={50}
                  height={50}
                  className="w-[45px] border-[2px] absolute left-[50px] border-white h-[45px] rounded-full object-cover"
                  src={
                    "https://i.pinimg.com/564x/85/22/34/8522346c05525356198706df30c7ebe0.jpg"
                  }
                  alt="User Png"
                />
              </div>

              <div className="flex w-full items-center ">
                <p className="h-full font-[700] text-black dark:text-white my-3 text-[14px]  md:text-[16px]">
                  500k+ User join our courses.{" "}
                  <Link
                    href={"/courses"}
                    passHref
                    className=" underline text-green-700 "
                  >
                    View Course
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
