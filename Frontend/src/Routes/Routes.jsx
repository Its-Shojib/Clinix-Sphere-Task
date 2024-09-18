import { createBrowserRouter } from "react-router-dom";
import DashBoard from "../Layouts/DashBoard";
import Records from "../Pages/Records/Records";
import AddNewRecord from "../Pages/New-Record/AddNewRecord";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoute";
const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoutes><DashBoard></DashBoard></PrivateRoutes>,
        children: [
            {
                index: true,
                element: <Records />
            },
            {
                path: "/new-records",
                element: <AddNewRecord />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);

export default router;