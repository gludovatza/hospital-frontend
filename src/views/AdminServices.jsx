import { PlusCircleIcon, XCircleIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useNavigate } from "react-router-dom";
import DeleteConfirm from "../components/DeleteConfirm";

export default function AdminServices() {

    const [services, setServices] = useState([]);
    const [serviceId, setServiceId] = useState(0);
    const { getCurrentUser } = useStateContext();
    const [loading, setLoading] = useState(true);
    const { showToast } = useStateContext();
    const navigate = useNavigate();
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    if (getCurrentUser().role !== "admin") {
        navigate("/dashboard");
    }

    const getServices = () => {
        setLoading(true);
        axiosClient.get("/service")
            .then((res) => {
                const keys = Object.keys(res.data);
                const values = Object.values(res.data);
                const data = keys.map((key, index) => {
                    return {
                        id: key,
                        ...values[index]
                    }
                });
                setServices(data);
                setLoading(false);
            }
            )
    }

    const onDelete = (id) => {
        axiosClient.delete(`/service/${id}`)
            .then(() => {
                setDeleteConfirm(false);
                showToast("Szolgáltatás sikeresen törölve");
                getServices();
            })
    }

    useEffect(() => {
        getServices();
    }, []);

    return (
        <div>
            <PageComponent
                title="Szolgáltatások"
                buttons={(
                    <TButton color="green" to="/admin/services/create">
                        <PlusCircleIcon className="h-6 w-6 mr-2" />
                        Szolgáltatás hozzáadása
                    </TButton>
                )}>

                { deleteConfirm &&
                    <DeleteConfirm
                        title="Biztosan törölni szeretné a szolgáltatást?"
                        onDelete={() => onDelete(serviceId)}
                        onCancel={() => setDeleteConfirm(false)}
                    />
                }

                {!loading && services.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="table-auto w-full text-base text-center">
                            <thead className="text-s uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                                <tr>
                                    <th scope="col" className="col-span-3 px-6 py-3">
                                        Név
                                    </th>
                                    <th scope="col" className="col-span-3 px-6 py-3">
                                        Hossz
                                    </th>
                                    <th scope="col" className="col-span-3 px-6 py-3">
                                        Ár
                                    </th>
                                    <th scope="col" className="col-span-3 px-6 py-3">
                                        Műveletek
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service) => (
                                    <tr key={service.id} className="bg-white border-b dark:bg-white dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            {service.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {service.length} perc
                                        </td>
                                        <td className="px-6 py-4">
                                            {service.price} Ft
                                        </td>
                                        <td className="flex flex-row gap-2 px-6 py-4 justify-center">
                                            <TButton
                                                color="edit"
                                                to={`/admin/services/${service.id}`}
                                            >
                                                <PencilSquareIcon className="h-6 w-6 mr-2" />
                                                Szerkesztés
                                            </TButton>
                                            <TButton
                                                color="delete"
                                                onClick={() => {
                                                    setServiceId(service.id);
                                                    setDeleteConfirm(true);
                                                }
                                                }
                                            >
                                                <XCircleIcon className="h-6 w-6 mr-2" />
                                                Törlés
                                            </TButton>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (loading ? 'Betöltés...' : 'Nincs szolgáltatás az adatbázisban.')
                }

            </PageComponent>
        </div>
    )
}
