import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios.js";

export default function Signup() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [born, setBorn] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [zip_code, setZipCode] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [insurance_number, setInsuranceNumber] = useState("");
    const [error, setError] = useState({ __html: "" });

    const onSubmit = (evt) => {
        evt.preventDefault();

        setError({ __html: "" });

        if(fullName.includes(" ") === false) {
            setError({ __html: "Kérem adja meg a teljes nevét!" });
            return;
        }

        if(password.length < 8) {
            setError({ __html: "A jelszónak legalább 8 karakter hosszúnak kell lennie." });
            return;
        }

        if(password !== passwordConfirmation) {
            setError({ __html: "A megadott jelszavak nem egyeznek meg." });
            return;
        }

        axiosClient
            .post("/signup", {
                name: fullName,
                email,
                password,
                password_confirmation: passwordConfirmation,
                born,
                city,
                address,
                zip_code,
                phone_number,
                insurance_number
            })
            .then(({ data }) => {
                console.log(data)
                setCurrentUser(data.user)
                setUserToken(data.token)
            })
            .catch((error) => {
                if (error.response) {
                    const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
                    console.log(finalErrors)
                    setError({ __html: finalErrors.join('<br>') })
                }
                console.error(error)
            });
    };

    return (
        <>
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 normal-case">
                Fiók létrehozása
            </h2>

            {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white text-base" dangerouslySetInnerHTML={error}>
            </div>)}

            <form
                onSubmit={onSubmit}
                className="space-y-4"
                action="#"
                method="POST"
            >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md">
                    <div className="flex flex-row items-center">
                        <label htmlFor="full-name" className="text-sm w-40">
                            Teljes név:
                        </label>
                        <input
                            id="full-name"
                            name="name"
                            type="text"
                            required
                            value={fullName}
                            onChange={evt => setFullName(evt.target.value)}
                            className="my-0 relative block w-full appearance-none rounded-none rounded-t-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <label htmlFor="email" className="text-sm w-40">
                            E-mail cím:
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            className="my-0 relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <label htmlFor="password" className="text-sm w-40">
                            Jelszó:
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="my-0 relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <label htmlFor="password" className="text-sm w-40">
                            Jelszó újra:
                        </label>
                        <input
                            id="password-confirmation"
                            name="password_confirmation"
                            type="password"
                            required
                            value={passwordConfirmation}
                            onChange={evt => setPasswordConfirmation(evt.target.value)}
                            className="my-0 relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <label htmlFor="born" className="text-sm w-40">
                            Születési dátum:
                        </label>
                        <input
                            id="born"
                            name="born"
                            type="date"
                            required
                            value={born}
                            onChange={evt => setBorn(evt.target.value)}
                            className="my-0 relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <label htmlFor="zip_code" className="text-sm w-40">
                            Irányítószám:
                        </label>
                        <input
                            id="zip_code"
                            name="zip_code"
                            type="text"
                            required
                            value={zip_code}
                            onChange={evt => setZipCode(evt.target.value)}
                            className="my-0 relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <label htmlFor="city" className="text-sm w-40">
                            Város:
                        </label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            required
                            value={city}
                            onChange={evt => setCity(evt.target.value)}
                            className="my-0 relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <label htmlFor="address" className="text-sm w-40">
                            Utca, házszám:
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            required
                            value={address}
                            onChange={evt => setAddress(evt.target.value)}
                            className="my-0 relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <label htmlFor="phone_number" className="text-sm w-40">
                            Telefonszám:
                        </label>
                        <input
                            id="phone_number"
                            name="phone_number"
                            type="text"
                            required
                            value={phone_number}
                            onChange={evt => setPhoneNumber(evt.target.value)}
                            className="my-0 relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <label htmlFor="password" className="text-sm w-40">
                            TAJ-szám:
                        </label>
                        <input
                            id="insurance_number"
                            name="insurance_number"
                            type="text"
                            required
                            value={insurance_number}
                            onChange={evt => setInsuranceNumber(evt.target.value)}
                            className="my-0 relative block w-full appearance-none rounded-none rounded-b-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
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
                        Regisztráció
                    </button>
                </div>

                <p className="text-center text-sm text-gray-600">
                    Van már fiókja?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-green-600 hover:text-green-500 px-0"
                    >
                        Belépés
                    </Link>
                </p>

                <p className="text-center text-sm text-gray-600">
                    <Link
                        to="/"
                        className="font-medium text-green-600 hover:text-green-500 my-0 py-0"
                    >
                        Vissza a főoldalra
                    </Link>
                </p>

            </form>
        </>
    );
}
