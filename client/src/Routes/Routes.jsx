import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Registration from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/LogIn";
import Home from "../Pages/Home/Home";
import JobDetails from "../Pages/Job/JObDetails";
import AddJob from "../Pages/Job/AddJob";
import MyPostedJobs from "../Pages/Job/MyPostedJobs";
import UpdateJob from "../Pages/Job/UpdateJob";
import PrivateRoute from "./PrivateRoute";
import MyBids from "../Pages/Job/MyBids";
import BidRequests from "../Pages/Job/BidRequests";
import AllJobs from "../Pages/Job/AllJobs";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children:
            [
                {
                    index: true,
                    element: <Home></Home>,
                    // loader: () => fetch(`${import.meta.env.VITE_API_URL}/jobs`)
                },
                {
                    path: '/registration',
                    element: <Registration></Registration>,
                },
                {
                    path: '/login',
                    element: <Login></Login>,
                },
                {
                    path: '/job/:id',
                    element: <PrivateRoute>
                        <JobDetails></JobDetails>
                    </PrivateRoute>,
                    // loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
                    // loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
                    loader: ({ params }) =>
                        fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`),
                },
                {
                    path: '/update/:id',
                    element: <PrivateRoute>
                        <UpdateJob></UpdateJob>
                    </PrivateRoute>,
                    loader: ({ params }) =>
                        fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`),
                },
                {
                    path: '/add-job',
                    element: <PrivateRoute>
                        <AddJob></AddJob>
                    </PrivateRoute>,
                },
                {
                    path: '/my-posted-jobs',
                    element:
                        <PrivateRoute>
                            <MyPostedJobs></MyPostedJobs>
                        </PrivateRoute>,
                },
                {
                    path: '/my-bids',
                    element:
                        <PrivateRoute>
                            <MyBids></MyBids>
                        </PrivateRoute>,
                },
                {
                    path: '/bid-requests',
                    element:
                        <PrivateRoute>
                            <BidRequests></BidRequests>
                        </PrivateRoute>,
                },
                {
                    path: '/jobs',
                    element:
                        <PrivateRoute>
                            <AllJobs></AllJobs>
                        </PrivateRoute>,
                },
            ]
    }
]);


export default Routes;