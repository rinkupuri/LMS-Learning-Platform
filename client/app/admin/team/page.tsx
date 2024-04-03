"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import {
  useGetAllAdminQuery,
  useUpdateRoleMutation,
} from "@/redux/features/user/api";
import { UserDocument } from "@/app/interface/AllInterface";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./colums";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";

type Props = {};

const Page = (props: Props) => {
  const [users, setUsers] = useState<Array<UserDocument>>();
  const [role, setRole] = useState<string>("user");
  const [email, setEmail] = useState<string>("");
  const [
    updateRole,
    {
      isLoading: roleLoading,
      isSuccess: roleSuccess,
      data: roleData,
      isError: roleError,
    },
  ] = useUpdateRoleMutation();
  const handelSubmit = () => {
    if (role && email) {
      updateRole({ email, role }).then(() => {
        refetch();
      });
    }
  };
  const { data, refetch, isLoading, isError, isSuccess } = useGetAllAdminQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      const usersData = data?.users as Array<UserDocument>;

      setUsers(
        usersData.map((e) => {
          return {
            ...e,
            id: e._id,
          };
        })
      );
    }
  }, [data, isLoading, isSuccess]);
  return (
    <AdminLayout>
      <div className="flex flex-col gap-3 items-center mt-3">
        <div className="flex w-11/12 justify-end items-end">
          <Dialog>
            <DialogTrigger>
              <Button>Update Role</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogHeader>Change User Role</DialogHeader>
                <DialogDescription>
                  Here you can change user role to give and take access from
                  users
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center mt-3 w-full">
                <Label className="w-9/12 " htmlFor="email">
                  Email
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    className="mt-2  rounded-sm w-full"
                    placeholder="Enter email"
                  />
                </Label>
              </div>
              <div className="flex justify-center mt-1 w-full">
                <Label className="w-9/12 flex flex-col gap-1" htmlFor="select">
                  <span className="mb-2">Select</span>

                  <Select onValueChange={(e) => setRole(e)}>
                    <SelectTrigger>
                      <SelectValue
                        className="mt-2"
                        placeholder="Select user Role"
                      />
                    </SelectTrigger>
                    <SelectContent id="select" className="mt-2">
                      <SelectGroup>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Label>
              </div>
              <div className="flex justify-center mt-1 w-full">
                <DialogClose className="w-full h-full p-0 m-0">
                  <Button onClick={handelSubmit} className="w-9/12">
                    Update
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {users && <DataTable columns={columns} data={users} />}
      </div>
    </AdminLayout>
  );
};

export default Page;
