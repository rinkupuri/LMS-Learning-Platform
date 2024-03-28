"use client";
import { Avatar, UserDocument } from "@/app/interface/AllInterface";
import { DataTable } from "@/components/ui/data-table";
import { useGetAllUsersAdminQuery, userAPI } from "@/redux/features/user/api";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { cloneDeep } from "lodash";
import AdminLayout from "../AdminLayout";

type Props = {
  _id: string;
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: Avatar;
  isVerified: boolean;
  purchased: number;
  createdAt: string;
  updatedAt: string;
};

const page = (props: Props) => {
  const [users, setUsers] = useState<Array<Props>>();
  const { data, isLoading, isError, isSuccess } = useGetAllUsersAdminQuery(
    undefined,
    { skip: users ? true : false }
  );
  useEffect(() => {
    if (!data?.users) return;
    const user: Array<Props> = cloneDeep(data?.users);
    user &&
      setUsers(
        user?.map((e) => {
          return {
            ...e,
            id: e._id,
          };
        })
      );
  }, [isError, isSuccess]);
  return (
    <>
      <AdminLayout>
        <div className="flex overflow-y-scroll flex-col items-center">
          {users && (
            <div className="flex w-full">
              <div className="flex w-full py-4 justify-center items-center flex-col">
                <DataTable columns={columns} data={users} />
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default page;
