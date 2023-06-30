import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import axiosClient from "../axios";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import './Calendar.css';

export default function AdminCreateAppointment() {

    const [service, setService] = useState(null);
    const [services, setServices] = useState([]);
    const [employee, setEmployee] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const navigate = useNavigate();
    const { showToast } = useStateContext();

    const onSubmit = (evt) => {
        evt.preventDefault();

        const payload = {
            "service_id": service,
            "employee_id": employee,
            "date": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`
        };

        if (id) {
            payload.id = id;
        }

        let res = null;
        if (id) {
            res = axiosClient.put(`/appointment/${id}`, payload);
        } else {
            res = axiosClient.post("/appointment", payload);
        }

        res.then((res) => {
                console.log(res);
                navigate("/admin/appointments");
                if (id) {
                    showToast("Időpont sikeresen módosítva");
                } else {
                    showToast("Időpont sikeresen létrehozva");
                }
            })
            .catch((err) => {
                if (err && err.response) {
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });

    }

    const onDateChange = (evt) => {
        let newDate = new Date(evt);
        newDate.setHours(date.getHours());
        newDate.setMinutes(0);
        setDate(newDate);
        console.log(newDate);
    }

    const getServices = () => {
        axiosClient.get("/service")
            .then((res) => {
                setServices(res.data);
            }
            );
    }

    const getEmployees = () => {
        axiosClient.get("/employee")
            .then((res) => {
                setEmployees(res.data);
            }
            );
    }

    useEffect(() => {
        getServices();
        getEmployees();
        if (id) {
            setLoading(true);
            axiosClient.get(`/appointment/${id}`)
                .then((res) => {
                    setService(res.data.service_id);
                    setEmployee(res.data.employee_id);
                    setDate(new Date(res.data.date));
                    setLoading(false);
                }
                );
        }
    }, []);

    return (
        <PageComponent title={id ? "Időpont szerkesztése" : "Időpont hozzáadása"}>
            <form action="#" method="post" onSubmit={onSubmit} className="px-4 py-4">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    {!loading ? (
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
                                    onChange={(evt) => setService(evt.target.value)}
                                    value={service ? service : ""}
                                    required
                                >
                                    <option value="">-</option>
                                    {services.map((service) => (
                                        <option value={service.id} key={service.id}>
                                            {service.name}
                                        </option>
                                    ))}

                                </select>
                            </div>
                            {/*Szolgáltatás*/}

                            {/*Dolgozó*/}
                            <div className="col-span-6 sm:col-span-3 space-y-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-bold text-gray-700"
                                >
                                    Szakdolgozó
                                </label>
                                <select
                                    name="employee"
                                    id="employee"
                                    className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(evt) => setEmployee(evt.target.value)}
                                    value={employee ? employee : ""}
                                    required
                                >
                                    <option value="">-</option>
                                    {employees.map((employee) => (
                                        <option value={employee.id} key={employee.id}>
                                            {employee.name}
                                        </option>
                                    ))}

                                </select>
                            </div>
                            {/*Dolgozó*/}

                            {/*Időpont*/}
                            <div className="col-span-6 sm:col-span-3 space-y-3">
                                <label
                                    htmlFor="date"
                                    className="block text-sm font-bold text-gray-700"
                                >
                                    Időpont
                                </label>

                                <div className="flex flex-row items-center justify-start gap-2">
                                    <Calendar
                                        onChange={(evt) => onDateChange(evt)}
                                        value={date}
                                        locale="hu-HU"
                                        minDate={new Date()}
                                        className={"text-base"}
                                    />
                                    <div>
                                        <input
                                            type="number"
                                            name="hour"
                                            id="hour"
                                            value={date.getHours()}
                                            min={7}
                                            max={22}
                                            className="w-16 p-2 m-1 ml-6"
                                            onChange={(evt) => {
                                                setDate(new Date(date.setHours(evt.target.value)));
                                                console.log(date);
                                            }}
                                        />
                                        {" óra"}
                                        <input
                                            type="number"
                                            name="minute"
                                            id="minute"
                                            step={5}
                                            min={0}
                                            max={55}
                                            value={
                                                date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
                                            }
                                            className="w-16 p-2 m-1 ml-6"
                                            onChange={(evt) => {
                                                setDate(new Date(date.setMinutes(evt.target.value)));
                                                console.log(date);
                                            }}
                                        />
                                        {" perc"}
                                    </div>
                                </div>



                                {/* <input
                                    type="datetime-local"
                                    name="date"
                                    id="date"
                                    className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(evt) => setDate(evt.target.value)}
                                /> */}

                            </div>
                            {/*Időpont*/}

                            <div className="flex gap-4 py-3">
                                <TButton color="green">Mentés</TButton>
                                <TButton color="gray" onClick={() => navigate("/admin/appointments")}>Mégse</TButton>
                            </div>

                        </div>
                    ) : 'Betöltés...'}
                </div>
            </form>
        </PageComponent>
    )
}
