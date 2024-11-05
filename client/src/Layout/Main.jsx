import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Main = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar></Navbar>
            {/* outlet */}
            <Outlet></Outlet>
            {/* footer */}
        </div>
    );
};

export default Main;