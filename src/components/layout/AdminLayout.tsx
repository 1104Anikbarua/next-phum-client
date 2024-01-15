// import React from "react";

import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <h1>This is Admin Layout</h1>
      <h1>This is admin sidebar</h1>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
