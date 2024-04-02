import {
  useGetAllAdminQuery,
  useUpdateRoleMutation,
} from "@/redux/features/user/api";
import React, { FC, useState } from "react";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "../colums";

type Props = {
  row: User;
};

const removeUser: FC<Props> = ({ row }) => {
  const { refetch } = useGetAllAdminQuery(
    {},
    {
      refetchOnFocus: true,
    }
  );
  const [updateUserRole, { isLoading, isSuccess, isError, data }] =
    useUpdateRoleMutation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            updateUserRole({
              email: row.email,
              role: "user",
            }).then((res) => {
              refetch();
            });
          }}
        >
          Remove User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default removeUser;
