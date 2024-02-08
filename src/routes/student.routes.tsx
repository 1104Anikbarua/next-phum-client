import OfferedCourse from "../pages/Admin/courseManagement/OfferedCourse";
import StudentDashboard from "../pages/Student/StudentDashboard";

export const studentRoutes = [
  { name: "Dashboard", path: "dashboard", element: <StudentDashboard /> },
  {
    name: "Offered course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
];
