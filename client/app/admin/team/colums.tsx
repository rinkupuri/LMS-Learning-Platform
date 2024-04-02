"use client";

import { ColumnDef } from "@tanstack/react-table";
import Avatar from "../../../public/user (1).png";
import Image from "next/image";
import moment from "moment";
import RemoveUser from "./usedComponents/removeUser";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  name: string;
  avatar: {
    url: string;
  };
  email: string;
  role: string;
  createdAt: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "avatar.url",
    header: "Avatar",
    cell: ({ row }) => {
      return (
        <Image
          width={40}
          height={40}
          src={row.original.avatar?.url ? row.original.avatar?.url : Avatar}
          alt={row.original.name}
          className="w-10 h-10 rounded-full"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className="flex w-full">
          <p className="text-sm">
            {moment(row.original.createdAt).format("DD-MMMM-YYYY")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "Actions",
    header: "Actions",
    cell: ({ row }) => {
      console.log(row.original);
      const data: User = row.original;
      return <RemoveUser row={data} />;
    },
  },
];
