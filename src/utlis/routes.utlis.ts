// export const adminRoutes = [
//   {
//     name: "Dashboard",
//     path: "dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     name: "User-Management",
//     children: [
//       {
//         name: "Create-Admin",
//         path: "create-admin",
//         element: <CreateAdmin />,
//       },
//       {
//         name: "Create-Faculty",
//         path: "create-faculty",
//         element: <CreateFaculty />,
//       },
//       {
//         name: "Create-Student",
//         path: "create-student",
//         element: <CreateStudent />,
//       },
//     ],
//   },
// ];

import { ReactNode } from "react";

type TItems = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TItems[];
};

type TRoute = {
  path: string;
  element: ReactNode;
};

export const getGenratedRoutes = (itmes: TItems[]) => {
  const routes = itmes?.reduce((previous: TRoute[], current) => {
    if (current?.path && current?.element) {
      previous.push({
        path: current?.path,
        element: current?.element,
      });
    }
    if (current?.children) {
      current?.children.forEach((child) => {
        previous.push({
          path: child.path!,
          element: child?.element,
        });
      });
    }
    return previous;
  }, []);
  return routes;
};
