import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import axiosClient from "../axios";
import { useParams, useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

export default function AppointmentView() {

    const { getCurrentUser } = useStateContext();
    const [services, setServices] = useState([]);
    const [appointments, setAppointments] = useState(null);
    const [appointment_id, setAppointmentId] = useState(null);
    const [reserved_appointments, setReservedAppointments] = useState([]);
    const [length, setLength] = useState(0);
    const [price, setPrice] = useState(0);
    const [employee, setEmployee] = useState("");
    const navigate = useNavigate();
    const { showToast } = useStateContext();


    const onSubmit = (evt) => {
        evt.preventDefault();

        const payload = {
            "user_id": getCurrentUser().id,
            "appointment_id": appointment_id
        };

        axiosClient.post("/reservation", payload)
            .then((res) => {
                let data = res.data[0];
                let toSend = {
                    "title": "Új időpontfoglalás",
                    "message": "Az alábbi időpontjára foglalás érkezett",
                    "user_name": getCurrentUser().name,
                    "user_email": getCurrentUser().email,
                    "user_phone": getCurrentUser().phone_number,
                    "service_name": data.appointment.service.name,
                    "appointment_date": data.appointment.date,
                    "employee_name": data.appointment.employee.name,
                    "employee_email": data.appointment.employee.email
                };
                emailjs.send('service_nx2twmi', 'template_6dcwiy8', toSend, '7RvRiJyTmfqCFnocI')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
                navigate("/appointments");
                showToast("Időpont sikeresen lefoglalva");
            }
            );
    }

    const getReservations = () => {
        axiosClient.get(`/getAllReservations`)
            .then((res) => {
                const keys = Object.keys(res.data);
                const values = Object.values(res.data);
                const data = keys.map((key, index) => {
                    return {
                        id: key,
                        ...values[index]
                    }
                });
                setReservedAppointments([]);
                let reserved = [];
                data.map((reservation) => {
                    reserved.push(reservation.appointment_id);
                });
                setReservedAppointments(reserved);
            }
            );
    }

    const getServices = () => {
        axiosClient.get("/service")
            .then((res) => {
                setServices(res.data);
            }
            );
    }

    const filterAppointments = (evt) => {
        const serviceId = evt.target.value;
        const service = services.find(x => x.id == serviceId);
        setLength(service.length);
        setPrice(service.price);
        if (serviceId) {
            axiosClient.get(`/appointment?service_id=${serviceId}`)
                .then((res) => {
                    setAppointments(res.data);
                }
                );
        }
    }

    const onAppointmentChange = (evt) => {
        setAppointmentId(evt.target.value);
        let employeeName = appointments.find((appointment) => appointment.id == evt.target.value).employee.name;
        setEmployee(employeeName);
    }

    useEffect(() => {
        getServices();
        getReservations();
    }, []);


    return (
        <PageComponent title="Időpontfoglalás">
            <form action="#" method="post" onSubmit={onSubmit} className="px-4 py-4">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    {services && services.length > 0 ? (
                        <div className="px-4 py-4 bg-white space-y-6 sm:p-6">

                            {/*Szolgáltatás*/}
                            <div className="col-span-6 sm:col-span-3 space-y-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-bold text-gray-700"
                                >
                                    Szolgáltatás
                                </label>
                                <select
                                    name="service"
                                    id="service"
                                    className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={filterAppointments}
                                    required
                                >
                                    <option value="">-</option>
                                    {services.map((service) => (
                                        <option value={service.id} key={service.id}>
                                            {service.name}
                                        </option>
                                    ))}

                                </select>
                                {(length && price) ? (
                                    <div className="flex flex-col gap-2 w-64">
                                        <div className="flex flex-row justify-between">
                                            <p className="text-sm text-gray-700">Kezelés hossza:</p>
                                            <p className="text-sm text-gray-700">{length} perc</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p className="text-sm text-gray-700">Ár:</p>
                                            <p className="text-sm text-gray-700">{price} Ft</p>
                                        </div>
                                    </div>
                                ) : ''}
                            </div>
                            {/*Szolgáltatások*/}

                            {/*Időpontok*/}
                            {appointments && (
                                <div className="col-span-6 sm:col-span-3 space-y-3">
                                    <label
                                        htmlFor="appointments"
                                        className="block text-sm font-bold text-gray-700"
                                    >
                                        Időpont
                                    </label>
                                    <select
                                        name="appointments"
                                        id="appointments"
                                        className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        onChange={(evt) => onAppointmentChange(evt)}
                                        required
                                    >
                                        <option value="">-</option>
                                        {appointments.map((appointment) => {
                                            let reserved = reserved_appointments.includes(appointment.id);
                                            if (!reserved) {
                                                return (
                                                    <option value={appointment.id} key={appointment.id}>
                                                        {appointment.date.replaceAll(" ", ". ").replaceAll("-", ". ").substring(0, 19)}
                                                    </option>
                                                )
                                            }
                                        })}

                                    </select>
                                    {employee ? (
                                        <div className="flex flex-col gap-3 w-64 mt-0">
                                            <div className="flex flex-row justify-between">
                                                <p className="text-sm text-gray-700">Szakdolgozó:</p>
                                                <p className="text-sm text-gray-700">{employee}</p>
                                            </div>
                                        </div>
                                    ) : ''}
                                </div>
                            )}
                            {/*Időpontok*/}

                            <div className="flex gap-4 py-3">
                                <TButton color="green">Foglalás</TButton>
                                <TButton color="gray" onClick={() => navigate("/appointments")}>Mégse</TButton>
                            </div>

                        </div>
                    ) : 'Betöltés...'}
                </div>
            </form>
        </PageComponent>
    )
}
