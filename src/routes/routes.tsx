import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Login from "../pages/Login";
// import AdminLayout from "../components/layout/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <App />,
    children: [
      { index: true, element: <About /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  //   {
  //     path: "/admin",
  //     element: <AdminLayout />,
  //     children: [
  //       {
  //         path: "create-student",
  //         element: (
  //           <>
  //             <h1>Please create student</h1>
  //           </>
  //         ),
  //       },
  //       {
  //         path: "create-teacher",
  //         element: (
  //           <>
  //             <h1>Please create Teacher</h1>
  //           </>
  //         ),
  //       },
  //     ],
  //   },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
