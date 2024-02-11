import StudentDashboard from "../pages/Student/StudentDashboard";
import StudentOfferedCourse from "../pages/Student/StudentOfferedCourse";

export const studentRoutes = [
  { name: "Dashboard", path: "dashboard", element: <StudentDashboard /> },
  {
    name: "Offered course",
    path: "offered-course",
    element: <StudentOfferedCourse />,
  },
];
