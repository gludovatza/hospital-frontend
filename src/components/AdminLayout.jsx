import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import { UserIcon } from '@heroicons/react/20/solid'
import Logo from '../logo.png'
import axiosClient from '../axios'
import Toast from './Toast'

const navigation = [
    { name: 'Időpontok', to: '/admin/appointments' },
    { name: 'Dolgozók', to: '/admin/employees' },
    { name: 'Szolgáltatások', to: '/admin/services' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AdminLayout() {

    const { getCurrentUser, userToken, setCurrentUser, setUserToken } = useStateContext();

    const logout = (evt) => {
        evt.preventDefault();
        axiosClient.post("/logout").then((response) => {
            setCurrentUser(null);
            setUserToken(null);
        }).catch((error) => {
            console.error(error);
        });
    };

    if (!userToken) {
        return <Navigate to="/login" />
    };

    if (getCurrentUser().role !== 'admin') {
        return <Navigate to="/appointments" />
    };

    return (
        <>
            <div className="min-h-full">

                <Toast />

                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8"
                                                src={Logo}
                                                alt="Your Company"
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <NavLink
                                                        key={item.name}
                                                        to={item.to}
                                                        className={({ isActive }) => classNames(
                                                            isActive
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-base font-medium'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            {/* Legördülő menü */}

                                            <Menu as="div" className="relative ml-3">

                                                <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800">
                                                    <span className="sr-only">Felhasználói menü</span>
                                                    <div className="text-lg font-medium leading-none text-white mr-2">{getCurrentUser().name}</div>
                                                    <UserIcon className='w-8 text-white bg-gray rounded-full' />
                                                </Menu.Button>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            <a
                                                                href="#"
                                                                onClick={(evt) => logout(evt)}
                                                                className='block px-4 py-3 text-base text-gray-700'
                                                            >
                                                                Kijelentkezés
                                                            </a>
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Főmenü</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            as="a"
                                            to={item.to}
                                            className={({ isActive }) => classNames(
                                                isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pt-4 pb-3">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <UserIcon className='w-8 text-white' />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{getCurrentUser().name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{getCurrentUser().email}</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        <Disclosure.Button
                                            as="a"
                                            href="#"
                                            onClick={(evt) => logout(evt)}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            Kijelentkezés
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <Outlet />

            </div>
        </>
    )
}
