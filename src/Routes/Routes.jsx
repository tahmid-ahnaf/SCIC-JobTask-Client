import { createBrowserRouter} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path:"/",
            element: <PrivateRoutes><Home></Home></PrivateRoutes>,
            loader: () => fetch('https://scic-job-task-server-lyart.vercel.app/productCount')
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
    ],
  },
]);

export default router;