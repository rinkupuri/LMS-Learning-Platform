import React, { FC } from "react";
import Sidebar from "./sidebar";
import AdminNavbar from "./AdminNavbar";

type Props = {
  drawer: boolean;
  setDrawer: (drawer: boolean) => void;
  drawerActive: number;
  setDrawerActive: (drawerActive: number) => void;
};

const AdminHeader: FC<Props> = ({
  setDrawer,
  drawer,
  setDrawerActive,
  drawerActive,
}) => {
  return (
    <>
      <AdminNavbar drawer={drawer} setDrawer={setDrawer} />
      {drawer && (
        <Sidebar
          setDrawerActive={setDrawerActive}
          drawerActive={drawerActive}
          setDrawer={setDrawer}
          drawer={drawer}
        />
      )}
    </>
  );
};

export default AdminHeader;
