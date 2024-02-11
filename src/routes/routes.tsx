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
import RequireAuth from "../components/shared/authentication/RequireAuth/RequireAuth";
import ChangePassword from "../pages/ChangePassword";
// import RequireAuth from "../components/shared/authentication/RequireAuth/RequireAuth";

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
    element: (
      <RequireAuth role="Admin">
        <App />
      </RequireAuth>
    ),
    // <RequireAuth>
    // </RequireAuth>
    //to reduce routes in root route we have create seperate route for specefic routes(e.g:admin)
    children: getGenratedRoutes(adminRoutes),
  },

  {
    path: "/faculty",
    element: (
      <RequireAuth role="Faculty">
        <App />
      </RequireAuth>
    ),
    children: getGenratedRoutes(facultyRoutes),
  },

  {
    path: "/student",
    element: (
      <RequireAuth role="Student">
        <App />
      </RequireAuth>
    ),
    children: getGenratedRoutes(studentRoutes),
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/change-password", element: <ChangePassword /> },
]);

export default router;
