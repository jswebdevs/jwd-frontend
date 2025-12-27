import { createBrowserRouter } from "react-router-dom";

import Error from "../layout/Error";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";

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
            }
        ]
    }
])

export default Routes;