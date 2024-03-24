"use client";
import CourseEditComponent from "@/app/components/admin/course/CourseEditComponent";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../AdminLayout";

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
    courseData: [],
    ratings: 0,
    purchased: 0,
  });
  const [editPage, setEditPage] = useState(0);
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [videoContent, setVideoContent] = useState([
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
      link: [{ title: "", url: "" }],
    },
  ]);

  useEffect(() => {
    setCourse((prevCourse: any) => ({
      ...prevCourse,
      courseData: videoContent,
    }));
  }, [videoContent]);
  useEffect(() => {
    setCourse((prevCourse: any) => ({
      ...prevCourse,
      benefits: benefits,
    }));
  }, [benefits]);
  useEffect(() => {
    setCourse((prevCourse: any) => ({
      ...prevCourse,
      prerequisites: prerequisites,
    }));
  }, [prerequisites]);
  return (
    <>
      <AdminLayout>
        <div className="flex w-full mt-2 overflow-hidden ">
          <CourseEditComponent
            editPage={editPage}
            setEditPage={setEditPage}
            course={course}
            setCourse={setCourse}
            componentType={"create"}
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            videoContent={videoContent}
            setVideoContent={setVideoContent}
          />
        </div>
      </AdminLayout>
    </>
  );
};

export default page;
