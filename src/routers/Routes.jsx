import { createBrowserRouter } from "react-router-dom";

import Error from "../layout/Error";
import Root from "../layout/Root";
import Home from "../pages/Home";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Home/>
            }
        ]
    }
])

export default Routes;