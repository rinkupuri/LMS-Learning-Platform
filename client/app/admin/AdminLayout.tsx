import React, { use, useEffect, useState } from "react";
import AdminHeader from "../components/admin/AdminHeader";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { UserDocument } from "../interface/AllInterface";

type Props = {};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [drawer, setDrawer] = useState(false);
  const [drawerActive, setDrawerActive] = useState(0);
  const { user }: { user: UserDocument } = useSelector(
    (state: any) => state.auth
  );
  useEffect(() => {
    if (user) {
      user.role !== "admin" && redirect("/");
    }
  }, [user]);
  return (
    <>
      <div className="flex w-full flex-col h-[100vh] overflow-hidden">
        <div className="flex w-full flex-col ">
          <AdminHeader />
        </div>
        {user.role === "admin" && children}
      </div>
    </>
  );
};

export default AdminLayout;
