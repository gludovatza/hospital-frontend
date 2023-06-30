import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import DeleteConfirm from "../components/DeleteConfirm";
import emailjs from '@emailjs/browser';

export default function Appointments() {

    const [reservations, setReservations] = useState([]);
    const [reservationId, setReservationId] = useState(0);
    const { getCurrentUser } = useStateContext();
    const [loading, setLoading] = useState(true);
    const { showToast } = useStateContext();
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const getReservations = () => {
        setLoading(true);
        axiosClient.get("/reservation", getCurrentUser().id)
            .then((res) => {
                const keys = Object.keys(res.data);
                const values = Object.values(res.data);
                const data = keys.map((key, index) => {
                    return {
                        id: key,
                        ...values[index]
                    }
                });

                setReservations(data);
                setLoading(false);
            }
            )
    }

    const onDelete = (id) => {
        axiosClient.delete(`/reservation/${id}`)
            .then((res) => {
                let data = res.data[0];
                let toSend = {
                    "title": "Foglalás törölve",
                    "message": "Az alábbi időpont foglalása törölve lett",
                    "user_name": getCurrentUser().name,
                    "user_email": getCurrentUser().email,
                    "user_phone": getCurrentUser().phone_number,
                    "service_name": data.appointment.service.name,
                    "appointment_date": data.appointment.date,
                    "employee_name": data.appointment.employee.name,
                    "employee_email": data.appointment.employee.email,
                };
                emailjs.send('service_nx2twmi', 'template_6dcwiy8', toSend, '7RvRiJyTmfqCFnocI')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
                setDeleteConfirm(false);
                showToast("Foglalás sikeresen törölve");
                getReservations();
            })
    }

    useEffect(() => {
        getReservations();
    }, []);

    return (
        <div>

            <PageComponent
                title="Időpontok"
                buttons={(
                    <TButton color="green" to="/appointments/create">
                        <PlusCircleIcon className="h-5 w-5 mr-2" />
                        Időpontfoglalás
                    </TButton>

                )}>

                {deleteConfirm &&
                    <DeleteConfirm
                        title="Biztosan törölni szeretné a foglalást?"
                        onDelete={() => onDelete(reservationId)}
                        onCancel={() => setDeleteConfirm(false)}
                    />
                }

                {!loading && reservations.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-base text-left">
                            <thead className="text-s uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Szolgáltatás
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Szakdolgozó
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Dátum
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Időtartam
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {true && reservations.map((reservation) => (
                                    <tr key={reservation.id} className="bg-white border-b dark:bg-white dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            {reservation.appointment.service.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.appointment.employee.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.appointment.date.replaceAll(" ", ". ").replaceAll("-", ". ").substring(0, 19)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.appointment.service.length} perc
                                        </td>
                                        <td className="flex flex-row gap-2 px-6 py-4">
                                            <TButton
                                                color="delete"
                                                onClick={() => {
                                                    setReservationId(reservation.id)
                                                    setDeleteConfirm(true);
                                                }
                                                }
                                            >
                                                <XCircleIcon className="h-6 w-6 mr-2" />
                                                Lemondás
                                            </TButton>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (loading ? 'Betöltés...' : 'Önnek még nincs foglalt időpontja.')
                }

            </PageComponent>
        </div>
    )
}
