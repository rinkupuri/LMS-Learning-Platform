"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./colums";
import { useGetAllCourseForAdminQuery } from "@/redux/features/course/api";
import { Course } from "@/app/interface/AllInterface";

type Props = {};

const page = (props: Props) => {
  const [allCourseData, setAllCourseData] = useState<Array<Course>>();
  const { data, isLoading, isSuccess, refetch } = useGetAllCourseForAdminQuery(
    {},
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      setAllCourseData(data?.courses);
    }
    return () => {};
  }, [isLoading, isSuccess, data]);

  return (
    <AdminLayout>
      <div className="flex w-full justify-center items-center flex-col my-3">
        {allCourseData && <DataTable columns={columns} data={allCourseData} />}
      </div>
    </AdminLayout>
  );
};

export default page;
