import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Appointments from "./views/Appointments";
import AppointmentView from "./views/AppointmentView";
import Site from "./components/Site";
import AdminLayout from "./components/AdminLayout";
import AdminAppointments from "./views/AdminAppointments";
import AdminEmployees from "./views/AdminEmployees";
import AdminServices from "./views/AdminServices";
import AdminCreateAppointment from "./views/AdminCreateAppointment";
import AdminCreateEmployee from "./views/AdminCreateEmployee";
import AdminCreateService from "./views/AdminCreateService";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Site />
    },
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/appointments",
                element: <Appointments />,
            },
            {
                path: "/appointments/create",
                element: <AppointmentView />,
            }
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin/appointments",
                element: <AdminAppointments />,
            },
            {
                path: "/admin/appointments/create",
                element: <AdminCreateAppointment />,
            },
            {
                path: "/admin/appointments/:id",
                element: <AdminCreateAppointment />,
            },
            {
                path: "/admin/employees",
                element: <AdminEmployees />,
            },
            {
                path: "/admin/employees/create",
                element: <AdminCreateEmployee />,
            },
            {
                path: "/admin/employees/:id",
                element: <AdminCreateEmployee />,
            },
            {
                path: "/admin/services",
                element: <AdminServices />,
            },
            {
                path: "/admin/services/create",
                element: <AdminCreateService />,
            },
            {
                path: "/admin/services/:id",
                element: <AdminCreateService />,
            },
        ],
    },
])

export default router;
