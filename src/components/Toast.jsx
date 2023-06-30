import { useStateContext } from "../contexts/ContextProvider";
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function Toast() {
    const { toast } = useStateContext();

    return (
        <>
            {/* {toast.show && ( */}
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-50"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    show={toast.show}
                >
                    <div className="flex justify-center items-center ring ring-emerald-600 fixed top-20 left-[50%] translate-x-[-50%] text-white">
                        <p className="text-emerald-600 py-3 px-6 text-center">
                            <CheckCircleIcon className="h-7 w-7 inline-block m-0 p-0 mr-4" />
                            {toast.message}
                        </p>
                    </div>
                </Transition>
            {/* )} */}
        </>
    );
}
