import { style } from "@/app/styles/style";

import React, { FC } from "react";
import { BiUser } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { MdOutlineNotifications } from "react-icons/md";
import SideBar from "../admin/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Check, LogOut, TicketCheck } from "lucide-react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const AdminNavbar = () => {
  return (
    <div className="flex w-full h-[80px]">
      <div
        className={`flex items-center  justify-center dark:bg-opacity-50 bg-no-repeat  dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] shadow-xl transition duration-500 z-[80] dark:border-b dark:border-[#ffffff1c]`}
      >
        <div className="flex w-11/12 h-full justify-between  items-center">
          <div className="flex justify-center items-center gap-3">
            <SideBar />
            <h1 className={`${style.title}`}>Admin Dashboard</h1>
            <div className="flex h-[23px] justify-end items-end">
              <p className="text-[12px] font-Poppins text-slate-600">(V 1.0)</p>
            </div>
          </div>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BiUser className="cursor-pointer" title="User" size={20} />
              </DropdownMenuTrigger>
              <Card>
                <DropdownMenuContent className="flex flex-col z-[9999999]">
                  <DropdownMenuItem className="flex">
                    <BiUser className="mx-1" size={20} />
                    <Link href="/admin/user">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex">
                    <LogOut className="mx-1" size={20} />
                    <Link href="/admin/user">Log Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </Card>
            </DropdownMenu>

            <CiSettings className="cursor-pointer" title="Settings" size={20} />
            <Separator orientation="vertical" className="w-[2px] h-[20px]" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MdOutlineNotifications
                  className="cursor-pointer"
                  title="Notifiaction"
                  size={20}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[350px] p-0 m-0 !mr-8 flex justify-center items-center">
                <Card className="w-full h-full border-none rounded-sm">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      You 3 unread notifications
                    </CardDescription>
                    <Separator className="w-full" />
                    <Separator className="w-full" />
                    <Button className="  mt-3 flex gap-1 justify-center items-center">
                      <Check size={15} className="mt-1" />
                      Mark all Read
                    </Button>
                  </CardHeader>
                </Card>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
