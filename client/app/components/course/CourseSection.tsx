import { useGetAllCourseForUserQuery } from "@/redux/features/course/api";
import React, { FC } from "react";

const CourseSection = () => {
  const { data, refetch } = useGetAllCourseForUserQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex w-full">
        <div className="flex justify-center items-center flex-col w-full">
          <h1 className="text-2xl font-bold">
            Best Oppurtuity to grow with us{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CourseSection;
