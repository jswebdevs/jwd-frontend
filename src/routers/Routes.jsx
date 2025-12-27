import { createBrowserRouter } from "react-router-dom";

import Error from "../layout/Error";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
<<<<<<< HEAD
import Blog from "../pages/Blog";
import Services from "../pages/Services";
import Reviews from "../pages/Reviews";
=======
import About from "../pages/About";
>>>>>>> e1aeb1b2c417692e594e534864b374a658e25d5d

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "contact",
                element: <Contact></Contact>
            },
            {
                path: "projects",
                element: <Projects></Projects>
            },
            {
<<<<<<< HEAD
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
            }
=======
                path: "about",
                element: <About></About>
            },
>>>>>>> e1aeb1b2c417692e594e534864b374a658e25d5d
        ]
    }
])

export default Routes;