"use client";

import React, { useState } from "react";
import AdminHeader from "../components/admin/AdminHeader";
import CourseEditComponent from "../components/admin/course/CourseEditComponent";

type Props = {};

const page = (props: Props) => {
  const [course, setCourse] = useState({
    name: "",
    description: "",
    price: 0,
    estimatedprice: 0,
    thumbnail: {
      public_id: "",
      url: "",
    },
    tags: "",
    level: "",
    demoUrl: "",
    benefits: [],
    prerequisites: [],
    reviews: [],
    courseData: [
      {
        videoUrl: "",
        title: "",
        description: "",
        videoThumbnail: {
          public_id: "",
          url: "",
        },
        videoSection: "",
        videolength: 0,
        videoplayer: "",
        links: [],
        suggestion: "",
        question: [],
      },
    ],
    ratings: 0,
    purchased: 0,
  });
  const [drawer, setDrawer] = useState(false);
  const [editPage, setEditPage] = useState(0);
  const [drawerActive, setDrawerActive] = useState(0);
  return (
    <>
      <div className="flex w-full h-[100vh] overflow-hidden">
        <div className="flex w-full flex-col ">
          <AdminHeader
            drawerActive={drawerActive}
            setDrawerActive={setDrawerActive}
            setDrawer={setDrawer}
            drawer={drawer}
          />

          <div className="flex w-full mt-4 overflow-hidden ">
            <CourseEditComponent
              editPage={editPage}
              setEditPage={setEditPage}
              course={course}
              setCourse={setCourse}
              componentType={"create"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
