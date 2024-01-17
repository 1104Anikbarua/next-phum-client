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
import { facultyRoutes } from "./faculty.routes";
import { studentRoutes } from "./student.routes";

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
    children: getGenratedRoutes(facultyRoutes),
  },

  {
    path: "/student",
    element: <App />,
    children: getGenratedRoutes(studentRoutes),
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
