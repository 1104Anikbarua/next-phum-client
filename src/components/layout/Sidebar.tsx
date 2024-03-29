import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { getSidebarRoutes } from "../../utlis/routes.utlis";
import { adminRoutes } from "../../routes/admin.routes";
import { facultyRoutes } from "../../routes/faculty.routes";
import { studentRoutes } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { getDecodedUser } from "../../utlis/decodeUser.utlis";
import { IUser } from "../../redux/features/auth/authSlice";

const Sidebar = () => {
  const { token } = useAppSelector((state) => state.auth);

  // With this admin,faculty,student cannot view each other routes
  let user;
  if (token) {
    user = getDecodedUser(token);
  }
  const userRole = {
    Admin: "Admin",
    Faculty: "Faculty",
    Student: "Student",
  };

  let sideBarRoutes;

  switch ((user as IUser)?.role) {
    case userRole.Admin:
      sideBarRoutes = getSidebarRoutes(
        adminRoutes,
        userRole.Admin.toLowerCase()
      );
      break;
    case userRole.Faculty:
      sideBarRoutes = getSidebarRoutes(
        facultyRoutes,
        userRole.Faculty.toLowerCase()
      );
      break;
    case userRole.Student:
      sideBarRoutes = getSidebarRoutes(
        studentRoutes,
        userRole.Student.toLowerCase()
      );
      break;
    default:
      break;
  }

  return (
    <Sider
      style={{
        position: "sticky",
        height: "100vh",
        top: 0,
        left: 0,
        bottom: 0,
        overflow: "auto",
      }}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        // console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        // console.log(collapsed, type);
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
