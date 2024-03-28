"use client";

import { ColumnDef } from "@tanstack/react-table";
import Avatar from "../../../public/user (1).png";
import Image from "next/image";
import moment from "moment";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Course } from "@/app/interface/AllInterface";
import { BsPencil } from "react-icons/bs";
import { redirect } from "next/navigation";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "thumbnail.url",
    header: "Thumbnail",
    cell: ({ row }) => {
      return (
        <Image
          width={40}
          height={40}
          src={
            row.original.thumbnail?.url ? row.original.thumbnail?.url : Avatar
          }
          alt={row.original.name}
          className="w-[120px] object-contain h-[70px] rounded-sm"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "purchased",
    header: "Purchased",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className="flex w-full">
          <p className="text-sm">
            {moment(row.original.createdAt).format("DD-MMMM-YYYY HH:MM")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "Actions",
    header: "Actions",
    cell: ({ row }) => {
      const course = row.original;

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
            <DropdownMenuItem>
              <Link href={`/admin/course/edit/${course._id}`}>Edit Course</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
