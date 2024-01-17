import {
  Layout,
  Menu,
  // MenuProps,
  //  theme
} from "antd";
import Sider from "antd/es/layout/Sider";
import {
  // NavLink,
  Outlet,
} from "react-router-dom";
import { getSidebarRoutes } from "../../utlis/routes.utlis";
import { adminRoutes } from "../../routes/admin.routes";
// import { adminSidebarRoutes } from "../../routes/admin.routes";
// import { Content, Footer, Header } from "antd/es/layout/layout";
// import {
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
// import { createElement } from "react";

const { Header, Content, Footer } = Layout;

// const items = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   UserOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: createElement(icon),
//   label: `nav ${index + 1}`,
// }));

// const items: MenuProps["items"] = [
//   {
//     key: "Dashboard",
//     label: <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>,
//   },
//   {
//     key: "User Management",
//     label: "User Management",
//     children: [
//       {
//         key: "Create Admin",
//         label: <NavLink to={"/admin/create-admin"}>Create Admin</NavLink>,
//       },
//       {
//         key: "Create Faculty",
//         label: <NavLink to={"/admin/create-faculty"}>Create Faculty</NavLink>,
//       },
//       {
//         key: "Create Student",
//         label: <NavLink to={"/admin/create-student"}>Create Student</NavLink>,
//       },
//     ],
//   },
// ];

const MainLayout = () => {
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
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
          items={getSidebarRoutes(adminRoutes, "admin")}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            //  background: colorBgContainer
          }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
            }}
          >
            <h1 style={{ fontSize: "20px", color: "blue" }}>
              This is where we have to show our content
            </h1>

            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
