import { createBrowserRouter } from "react-router-dom";
import DashBoard from "../Layouts/DashBoard";
import Records from "../Pages/Records/Records";
import AddNewRecord from "../Pages/New-Record/AddNewRecord";
const router = createBrowserRouter([
    {
        path: '/',
        element: <DashBoard></DashBoard>,
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
    }
]);

export default router;