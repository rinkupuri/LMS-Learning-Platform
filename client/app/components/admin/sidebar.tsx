"use client";
import React from "react";
import { useSelector } from "react-redux";
import { BiUser } from "react-icons/bi";
import Link from "next/link";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { BookMarked, FilePlus2, LogOut, User, Users } from "lucide-react";

type IUser = {
  name: string;
  email: string;
  avatar: {
    url: string;
  };
  role: string;
};

const sidebar = () => {
  const { user }: { user: IUser } = useSelector((state: any) => state.auth);
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <HiMenuAlt3 className="cursor-pointer" title="Menu" size={35} />
        </SheetTrigger>
        <SheetContent className="opacity-100 w-[350px] z-[9999]" side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <Card className="rounded-sm w-full flex items-center justify-between  p-2 mt-5">
                <Avatar className="ml-5">
                  <AvatarImage src={""} />
                  <AvatarFallback>NM</AvatarFallback>
                </Avatar>
                <div className="flex ml-3 flex-col">
                  <h1 className={`m-0 p-0`}>Noman</h1>

                  <Badge
                    className={`m-0 p-2 rounded-sm h-[16px]  w-fit text-[10px] justify-center items-center font-[600]`}
                  >
                    Admin
                  </Badge>
                </div>
                <Card className="rounded-sm">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <p className="text-[12px]  px-2">Menu</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="z-[9999999]">
                      <DropdownMenuItem>
                        <BiUser size={20} className="mx-1" />
                        <Link passHref href="/admin/user">
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LogOut size={20} className="mx-1" />

                        <Link passHref href="/admin/course">
                          Log Out
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Card>
              </Card>
            </SheetTitle>
          </SheetHeader>
          <Card className="rounded-sm px-2 py-3 flex flex-col mt-1">
            <Link
              href={"/admin/user"}
              className="flex py-2 px-3 cursor-pointer mt-1 rounded-md hover:bg-gray-900 "
            >
              <Users size={20} className="mr-2" />
              <Link href="/admin/user">Users</Link>
            </Link>
            <Link
              href="/admin/course/new"
              className="flex py-2 px-3 cursor-pointer mt-1 rounded-md hover:bg-gray-900 "
            >
              <FilePlus2 size={20} className="mr-2" />
              <Link href="/admin/course/new">New Courses</Link>
            </Link>
            <Link
              href="/admin/course"
              className="flex py-2 px-3 cursor-pointer mt-1 rounded-md hover:bg-gray-900 "
            >
              <BookMarked size={20} className="mr-2" />
              <Link href="/admin/course">Courses</Link>
            </Link>
          </Card>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default sidebar;
