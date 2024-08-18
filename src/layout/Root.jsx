import { Outlet } from "react-router-dom";
import NavigationBar from "../Pages/Shared/NavigationBar/NavigationBar";
import Footer from "../Pages/Shared/FooterComp/FooterComp";

const Root = () => {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;