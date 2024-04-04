"use client";
import CourseEditComponent from "@/app/components/admin/course/CourseEditComponent";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../AdminLayout";
import CourseComponent from "../../CourseComponent";

type Props = {};

const page = () => {
  return (
    <>
      <AdminLayout>
        <CourseComponent componentType="new" />
      </AdminLayout>
    </>
  );
};

export default page;
