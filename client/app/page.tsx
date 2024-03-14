"use client";

import React, { FC, useState } from "react";
import Head from "./utils/Header";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "@/redux/features/api/apislicer";
interface props {}
const Page: FC<props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const { user } = useSelector((state: any) => state.auth);
  return (
    <>
      <div>
        <Head
          title="Easy learn"
          description="This is Learn platform build for learning"
          keywords="learning,coding,MERN Stack,programing,machine Learning"
        />
        <Header open={open} setOpen={setOpen} activeItem={activeItem} />
        <Hero />
      </div>
    </>
  );
};

export default Page;
