import OfferedCourse from "../pages/Student/OfferedCourse";
import StudentDashboard from "../pages/Student/StudentDashboard";

export const studentRoutes = [
  { name: "Dashboard", path: "dashboard", element: <StudentDashboard /> },
  {
    name: "Offered course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
];
