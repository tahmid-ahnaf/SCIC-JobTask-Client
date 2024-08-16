import { createBrowserRouter} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path:"/",
            element:<Home></Home>,
            loader: () => fetch('http://localhost:5000/productCount')
        },
    ],
  },
]);

export default router;