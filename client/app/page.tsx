"use client";

import React, { FC, useState } from "react";
import Head from "./utils/Header";
import Header from "./components/Header";
import Hero from "./components/Hero";
interface props {}
const Page: FC<props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div>
      <Head
        title="Easy learn"
        description="This is Learn platform build for learning"
        keywords="learning,coding,MERN Stack,programing,machine Learning"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
      <Hero />
    </div>
  );
};

export default Page;
