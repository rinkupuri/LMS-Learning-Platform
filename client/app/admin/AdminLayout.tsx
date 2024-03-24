import React, { useState } from "react";
import AdminHeader from "../components/admin/AdminHeader";

type Props = {};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [drawer, setDrawer] = useState(false);
  const [drawerActive, setDrawerActive] = useState(0);
  return (
    <>
      <div className="flex w-full flex-col h-[100vh] overflow-hidden">
        <div className="flex w-full flex-col ">
          <AdminHeader
            drawerActive={drawerActive}
            setDrawerActive={setDrawerActive}
            setDrawer={setDrawer}
            drawer={drawer}
          />
        </div>
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
