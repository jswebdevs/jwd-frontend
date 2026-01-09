import { createBrowserRouter } from "react-router-dom";

import Error from "../layout/Error";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import Blog from "../pages/Blog";
import Services from "../pages/Services";
import Reviews from "../pages/Reviews";
import About from "../pages/About"
import AdminRoot from "../admin/AdminRoot";
import AdminDashboard from "../admin/AdminDashboard";
import AdminProjects from "../admin/projects/AdminProjects";
import Login from "../admin/Login";
import ProjectAdding from "../admin/projects/ProjectAdding";
import Media from "../components/media/Media";
import MediaUpload from "../components/media/MediaUpload";



const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "projects",
        element: <Projects></Projects>,
      },
      {
        path: "blog",
        element: <Blog></Blog>,
      },
      {
        path: "services",
        element: <Services></Services>,
      },
      {
        path: "reviews",
        element: <Reviews></Reviews>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },

      {
        path: "admin",
        element: <AdminRoot></AdminRoot>,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "projects",
            element: <AdminProjects></AdminProjects>,
          },
          {
            path: "projects/add",
            element: <ProjectAdding></ProjectAdding>,
          },
          {
            path: "media",
            element: <Media></Media>,
          },
          { path: "media/upload", 
            element: <MediaUpload></MediaUpload> 
          }
        ],
      },
    ],
  },
]);

export default Routes;