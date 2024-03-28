import React, { FC } from "react";
import AdminNavbar from "./AdminNavbar";

type Props = {
  drawer: boolean;
  setDrawer: (drawer: boolean) => void;
  drawerActive: number;
  setDrawerActive: (drawerActive: number) => void;
};

const AdminHeader = () => {
  return (
    <>
      <AdminNavbar />
    </>
  );
};

export default AdminHeader;
