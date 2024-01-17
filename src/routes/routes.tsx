import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Login from "../pages/Login";
// import AdminLayout from "../components/layout/AdminLayout";
import { getGenratedRoutes } from "../utlis/routes.utlis";
import { adminRoutes } from "./admin.routes";
import StudentDashboard from "../pages/Student/StudentDashboard";
import OfferedCourse from "../pages/Student/OfferedCourse";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <About /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    //to reduce routes in root route we have create seperate route for specefic routes(e.g:admin)
    children: getGenratedRoutes(adminRoutes),
  },

  {
    path: "/faculty",
    element: <App />,
    children: [{ path: "dashboard", element: <FacultyDashboard /> }],
  },

  {
    path: "/student",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "offered-course",
        element: <OfferedCourse />,
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
