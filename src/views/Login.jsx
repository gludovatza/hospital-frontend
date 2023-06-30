import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ __html: "" });

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });

        axiosClient
            .post("/login", {
                email,
                password,
            })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
            })
            .catch((error) => {
                if (error.response) {
                    setError({ __html: error.response.data.error })
                }
            });
    };

    return (
        <>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 normal-case">
                Bejelentkezés
            </h2>

            {error.__html && (
                <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>
            )}

            <form onSubmit={onSubmit} className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm">
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            E-mail
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            className="my-0 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            placeholder="E-mail cím"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Jelszó
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            placeholder="Jelszó"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-xl border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon
                                className="h-5 w-5 text-green-500 group-hover:text-green-400"
                                aria-hidden="true"
                            />
                        </span>
                        Belépés
                    </button>
                </div>

                <p className="mt-2 text-center text-sm text-gray-600">
                    Nincs még fiókja?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-green-600 hover:text-green-500 px-0"
                    >
                        Regisztráció
                    </Link>
                </p>

                <p className="mt-2 text-center text-sm text-gray-600">
                    <Link
                        to="/"
                        className="font-medium text-green-600 hover:text-green-500"
                    >
                        Vissza a főoldalra
                    </Link>
                </p>

            </form>
        </>
    );
}
