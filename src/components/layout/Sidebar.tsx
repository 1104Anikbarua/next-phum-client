import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { getSidebarRoutes } from "../../utlis/routes.utlis";
import { adminRoutes } from "../../routes/admin.routes";
import { facultyRoutes } from "../../routes/faculty.routes";
import { studentRoutes } from "../../routes/student.routes";

const Sidebar = () => {
  const userRole = {
    Admin: "admin",
    Faculty: "faculty",
    Student: "student",
  };

  const role = "student";
  let sideBarRoutes;

  switch (role) {
    case userRole.Admin:
      sideBarRoutes = getSidebarRoutes(adminRoutes, role);
      break;
    case userRole.Faculty:
      sideBarRoutes = getSidebarRoutes(facultyRoutes, role);
      break;
    case userRole.Student:
      sideBarRoutes = getSidebarRoutes(studentRoutes, role);
      break;
    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      {/* <div className="demo-logo-vertical" /> */}
      <div>
        <h3
          style={{
            color: "whitesmoke",
            fontSize: "20px",
            height: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Dashboard
        </h3>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={sideBarRoutes}
      />
    </Sider>
  );
};

export default Sidebar;
