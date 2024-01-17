// import { ReactNode } from "react";
// import { NavLink } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/CreateAdmin";
import CreateFaculty from "../pages/Admin/CreateFaculty";
import CreateStudent from "../pages/Admin/CreateStudent";

export const adminRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User-Management",
    children: [
      {
        name: "Create-Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create-Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create-Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];

// export const admninChildrenRoutes = [
//   {
//     path: "dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "create-admin",
//     element: <CreateAdmin />,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFaculty />,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent />,
//   },
// ];

// type TRoutes = {
//   //   name: string;
//   path: string;
//   element: ReactNode;
// };

// type TSidebarRoutes = {
//   key: string;
//   label: ReactNode;
//   children?: TSidebarRoutes[];
// };

// generate admin routes from adminRoutes
// export const adminChildrenRoutes = adminRoutes.reduce(
//   (previous: TRoutes[], current) => {
//     //   console.log({ previous }, { current });
//     if (current?.path && current?.element) {
//       previous?.push({
//         path: current?.path,
//         element: current?.element,
//       });
//     }
//     if (current?.children) {
//       //   console.log("inside children", current.children);
//       current?.children?.forEach((child) => {
//         previous.push({
//           path: child?.path,
//           element: child?.element,
//         });
//       });
//     }
//     return previous;
//   },
//   []
// );

// export const adminSidebarRoutes = adminRoutes.reduce(
//   (previous: TSidebarRoutes[], current) => {
//     if (current?.name && current?.path) {
//       previous.push({
//         key: current?.name,
//         label: (
//           <NavLink to={`/admin/${current?.path}`}>{current?.name}</NavLink>
//         ),
//       });
//     }
//     if (current?.children) {
//       previous.push({
//         key: current.name,
//         label: current.name,
//         children: current.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }
//     return previous;
//   },
//   []
// );
