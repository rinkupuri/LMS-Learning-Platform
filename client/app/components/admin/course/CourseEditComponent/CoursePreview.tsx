"use client";

import React, { FC, useEffect, useState } from "react";
import CoursePlayer from "../../course/CourseComponent/CoursePlayer";
import { Course } from "@/app/interface/AllInterface";
import { style } from "@/app/styles/style";
import toast from "react-hot-toast";
import {
  courseAPI,
  useCreateCourseMutation,
  useGetCourseQuery,
  useUpdateCourseMutation,
} from "@/redux/features/course/api";
import { redirect } from "next/navigation";
import { isEqual } from "lodash";

type Props = {
  course: Course;
  editPage: number;
  componentType: string;
  setEditPage: (editPage: number) => void;
  videoData: string;
};

const CoursePreview: FC<Props> = ({
  componentType,
  course,
  setEditPage,
  editPage,
  videoData,
}) => {
  const [createCourse, { isLoading, isSuccess, data, error, isError }] =
    useCreateCourseMutation();
  const { refetch } = useGetCourseQuery(course._id as any, {
    refetchOnFocus: true,
  });
  const [
    updateCourse,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      data: updateData,
      error: updateError,
      isError: updateIsError,
    },
  ] = useUpdateCourseMutation();

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Course Updated Successfully");
    }
    if (updateIsError) {
      const err = updateError as any;
      toast.error(err?.data?.message as string);
    }
  }, [updateLoading, updateSuccess, updateError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Created Successfully");
      redirect(`/admin/course/edit/${data?.course._id}`);
    }
    if (isError) {
      const err = error as any;
      toast.error(err?.data?.message as string);
    }
  }, [isLoading, data, isSuccess, isError]);
  return (
    <div className="flex flex-col items-center  overflow-y-scroll w-full  ">
      <div className="flex flex-col justify-center items-center w-[48vw]">
        <CoursePlayer videoId={course.demoUrl} />
        <div className="flex w-full mt-3 justify-between items-center">
          <div className="flex py-3 px-1">
            <span className={`${style.title} px-2`}> {course.price} $</span>{" "}
            <span>{course.estimatedprice} $</span>
            <span className={`${style.title} px-2`}>
              {course.price &&
                course.estimatedprice &&
                (course.price / course.estimatedprice) * 100}
              % Off
            </span>
          </div>
          <div className="flex">
            <button className="py-2 px-6 bg-red-600 rounded-full">
              Buy Now {course.price} $
            </button>
          </div>
        </div>
        <div className="flex mt-3 w-[60%]">
          <div className="flex gap-5 justify-between items-center">
            <input
              placeholder="Discount Coupon"
              className={`!py-2 !px-4 text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white`}
              type="discount"
              name="discount"
            />
            <button className="py-2 px-6 bg-blue-500 rounded-full">
              Apply
            </button>
          </div>
        </div>
        <div className="flex w-full mt-3 justify-center items-center">
          <h1 className={`${style.title}`}>{course.name}</h1>
        </div>
        <div className="flex w-full mt-3 items-center">
          <p className={`py-3`}>{course.description}</p>
        </div>
        <div className="flex  w-[45vw] mt-3 justify-between items-center">
          <div className="flex h-full">
            <ul className="list-disc">
              {course.benefits?.map((benefit, index) => (
                <li key={index}>{benefit.title}</li>
              ))}
            </ul>
          </div>
          <div className="flex h-full">
            <ul className="list-disc">
              {course.prerequisites?.map((benefit, index) => (
                <li key={index}>{benefit.title}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex w-full justify-end items-end">
          <div className="flex justify-between items-center gap-3 w-full">
            <button
              onClick={() => setEditPage(editPage - 1)}
              className="cursor-pointer !py-2 w-[90px] !px-4 mt-4 justify-center items-center  flex hover:bg-black text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white"
            >
              Previous
            </button>
            {componentType === "edit" ? (
              <button
                disabled={isEqual(JSON.parse(videoData), course)}
                onClick={async (e) => {
                  e.preventDefault();

                  delete course.createdAt;
                  delete course.updatedAt;
                  delete course.__v;
                  course.courseData.map((data) => {
                    delete data._id;
                    delete data.question;
                  });
                  await updateCourse(course);
                  await refetch();
                  updateSuccess && toast.success("Course Updated successfully");
                }}
                className="cursor-pointer disabled:cursor-not-allowed !py-2 !px-4 mt-4 justify-center items-center  flex hover:bg-black text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white"
              >
                Update Course
              </button>
            ) : (
              <button
                onClick={() => {
                  createCourse(course).then(
                    () =>
                      isSuccess && toast.success("Course created successfully")
                  );
                }}
                className="cursor-pointer !py-2 !px-4 mt-4 justify-center items-center  flex hover:bg-black text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white"
              >
                Create Course
              </button>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CoursePreview;
