import { PlusCircleIcon, XCircleIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useNavigate } from "react-router-dom";
import DeleteConfirm from "../components/DeleteConfirm";

export default function AdminEmployees() {

    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState(0);
    const { getCurrentUser } = useStateContext();
    const [loading, setLoading] = useState(true);
    const { showToast } = useStateContext();
    const navigate = useNavigate();
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    if (getCurrentUser().role !== "admin") {
        navigate("/dashboard");
    }

    const getEmployees = () => {
        setLoading(true);
        axiosClient.get("/employee")
            .then((res) => {
                const keys = Object.keys(res.data);
                const values = Object.values(res.data);
                const data = keys.map((key, index) => {
                    return {
                        id: key,
                        ...values[index]
                    }
                });
                setEmployees(data);
                setLoading(false);
            }
            )
    }

    const onDelete = (id) => {
        axiosClient.delete(`/employee/${id}`)
            .then(() => {
                setDeleteConfirm(false);
                showToast("Dolgozó sikeresen törölve");
                getEmployees();
            })
    }

    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <div>
            <PageComponent
                title="Dolgozók"
                buttons={(
                    <TButton color="green" to="/admin/employees/create">
                        <PlusCircleIcon className="h-6 w-6 mr-2" />
                        Dolgozó hozzáadása
                    </TButton>
                )}>

                {deleteConfirm &&
                    <DeleteConfirm
                        title="Biztosan törölni szeretné a dolgozót?"
                        onDelete={() => onDelete(employeeId)}
                        onCancel={() => setDeleteConfirm(false)}
                    />
                }

                {!loading && employees.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-base text-center">
                            <thead className="text-s uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Név
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        E-mail cím
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id} className="bg-white border-b dark:bg-white dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            {employee.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {employee.email}
                                        </td>
                                        <td className="flex flex-row gap-2 px-6 py-4 justify-center">
                                            <TButton
                                                color="edit"
                                                to={`/admin/employees/${employee.id}`}
                                            >
                                                <PencilSquareIcon className="h-6 w-6 mr-2" />
                                                Szerkesztés
                                            </TButton>
                                            <TButton
                                                color="delete"
                                                onClick={() => {
                                                    setEmployeeId(employee.id)
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
                ) : (loading ? 'Betöltés...' : 'Nincs dolgozó az adatbázisban.')
                }

            </PageComponent>
        </div>
    )
}
