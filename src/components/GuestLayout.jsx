import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Logo from "../../src/logo.png";

export default function GuestLayout() {

    const { currentUser, userToken } = useStateContext();

    if(userToken) {
        return <Navigate to="/appointments" />
    }

    return (
        <div>
            <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-6">
                    <div>
                        <img
                            className="mx-auto h-20 w-auto"
                            src={Logo}
                            alt="Egészségügyi Központ Logo"
                        />
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
