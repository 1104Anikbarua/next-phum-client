// import { ReactNode } from "react";
// import { NavLink } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/CreateAdmin";
import CreateFaculty from "../pages/Admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/Admin/userManagement/CreateStudent";
import AcademicDepartment from "../pages/Admin/academicSemesterManagement/AcademicDepartment";
import AcademicFaculty from "../pages/Admin/academicSemesterManagement/AcademicFaculty";
import AcademicSemester from "../pages/Admin/academicSemesterManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/Admin/academicSemesterManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/Admin/academicSemesterManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/Admin/academicSemesterManagement/CreateAcademicSemester";
import StudentTable from "../pages/Admin/userManagement/StudentTable";

export const adminRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create-AD-Semester",
        path: "create-ad-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create-AD-Department",
        path: "create-ad-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
      {
        name: "Create-AD-Faculty",
        path: "create-ad-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create-Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "students",
        element: <StudentTable />,
      },
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
