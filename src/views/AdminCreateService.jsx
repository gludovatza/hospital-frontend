import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import axiosClient from "../axios";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminCreateService() {

    const [name, setName] = useState("");
    const [length, setLength] = useState(0);
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const navigate = useNavigate();
    const { showToast } = useStateContext();

    const onSubmit = (evt) => {
        evt.preventDefault();

        const payload = {
            name,
            length,
            price
        };

        if (id) {
            payload.id = id;
        }

        let res = null;
        if (id) {
            res = axiosClient.put(`/service/${id}`, payload);
        } else {
            res = axiosClient.post("/service", payload);
        }

        res.then(() => {
            navigate("/admin/services");
            if (id) {
                showToast("Szolgáltatás sikeresen módosítva");
            } else {
                showToast("Szolgáltatás sikeresen létrehozva");
            }
        }).catch((err) => {
            if (err && err.response) {
                setError(err.response.data.message);
            }
            console.log(err, err.response);
        });
    }

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/service/${id}`)
                .then((res) => {
                    setName(res.data.name);
                    setLength(res.data.length);
                    setPrice(res.data.price);
                    setLoading(false);
                })
                .catch((err) => {
                    if (err && err.response) {
                        setError(err.response.data.message);
                    }
                    console.log(err, err.response);
                });
        }
    }, []);

    return (
        <PageComponent title={id ? "Szolgáltatás módosítása" : "Szolgáltatás hozzáadása"}>
            <form action="#" method="post" onSubmit={onSubmit} className="px-4 py-4">
                {!loading ? (
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="px-4 py-4 bg-white space-y-6 sm:p-6">

                            {/*Név*/}
                            <div className="col-span-6 sm:col-span-3 space-y-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-bold text-gray-700"
                                >
                                    Név
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(evt) => setName(evt.target.value)}
                                    value={name ? name : ""}
                                    placeholder="Szolgáltatás neve"
                                    required
                                />
                            </div>
                            {/*Név*/}

                            {/*Hossz*/}
                            <div className="col-span-6 sm:col-span-3 space-y-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-bold text-gray-700"
                                >
                                    Hossz (perc)
                                </label>
                                <input
                                    type="number"
                                    min={5}
                                    step={5}
                                    name="length"
                                    id="length"
                                    className="mt-3 w-36 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(evt) => setLength(evt.target.value)}
                                    value={length ? length : 30}
                                    required
                                />
                            </div>
                            {/*Hossz*/}

                            {/*Ár*/}
                            <div className="space-y-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-bold text-gray-700"
                                >
                                    Ár (Ft)
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    step={100}
                                    name="price"
                                    id="price"
                                    className="mt-3 w-36 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(evt) => setPrice(evt.target.value)}
                                    value={price ? price : 10000}
                                    required
                                />
                            </div>
                            {/*Ár*/}

                            <div className="flex gap-4 py-3">
                                <TButton color="green">Mentés</TButton>
                                <TButton color="gray" onClick={() => navigate("/admin/services")}>Mégse</TButton>
                            </div>

                        </div>
                    </div>
                ) : "Betöltés..." }
            </form>
        </PageComponent>
    )
}
