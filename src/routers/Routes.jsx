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


const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "contact",
                element: <Contact></Contact>,
            },
            {
                path: "projects",
                element: <Projects></Projects>
            },
            {
                path: "blog",
                element: <Blog></Blog>
            },
            {
                path: "services",
                element: <Services></Services>
            },
            {
                path: "reviews",
                element: <Reviews></Reviews>
            },
          {
            path: "about",
            element: <About></About>
          }
        ]
    }
])

export default Routes;