"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../../../AdminLayout";
import { courseAPI, useGetCourseQuery } from "@/redux/features/course/api";
import { store } from "@/redux/Store";
import { apiSlice } from "@/redux/features/api/apislicer";
import CourseComponent from "@/app/admin/CourseComponent";
import toast from "react-hot-toast";

type Props = {};

const CourseEdit = ({ params }: { params: { slug: string } }) => {
  const [course, setCourse] = useState();
  const { data, isSuccess, isLoading } = useGetCourseQuery(params.slug);
  useEffect(() => {
    store
      .dispatch(courseAPI.endpoints.getCourse.initiate(params.slug))
      .then((res: any) => {
        setCourse(res.data.course);
      })
      .catch((err: any) => {
        toast.error(err.data.message);
      });
  }, [params, data, isLoading, isSuccess]);
  return (
    <AdminLayout>
      <CourseComponent componentType={"edit"} courseData={course} />
    </AdminLayout>
  );
};

export default CourseEdit;
