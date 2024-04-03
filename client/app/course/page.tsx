"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useGetAllCourseForUserQuery } from "@/redux/features/course/api";
import { Course } from "../interface/AllInterface";
import { cloneDeep } from "lodash";
import CourseCard from "./CourseCard";

type Props = {};

const Page = () => {
  const [coursesData, setCoursesData] = useState<Array<Course>>();
  const { data, isLoading, isSuccess, isError } = useGetAllCourseForUserQuery(
    undefined,
    {}
  );

  useEffect(() => {
    if (isSuccess) {
      const newData = cloneDeep(data.courses);
      setCoursesData([...newData]);
    }
  }, [data, isSuccess, isLoading]);
  return (
    <>
      <div className="flex flex-col  h-screen">
        <Header activeItem={1} />
        <div className="flex justify-center items-center">
          <div className="grid w-11/12 my-5 sm:grid-cols-4 md:grid-cols-6 gap-5">
            {coursesData?.map((course, index) => (
              <CourseCard key={index} coursesData={course} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
