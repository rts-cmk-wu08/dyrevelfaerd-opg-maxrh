"use client"

import useSWR from "swr"
import Loading from "./loading"
import { useEffect, useState } from "react"
import AnimalsForm from "./animalsForm"

export default function DashboardAnimals() {
    const [animals, setAnimals] = useState([]);
    const [selectedAnimalId, setSelectedAnimalId] = useState(null);

    const fetcher = url => fetch(url).then(r => r.json())
    const { data, error, isValidating, mutate } = useSWR("http://localhost:4000/api/v1/animals", fetcher)

    // We use a useEffect hook to update the animals state when the server data changes

    useEffect(() => {
        if (data) { setAnimals(data) }
        if (error) { throw new Error('Failed to fetch data') }
    }, [data, error])

    // We use mutate to update the data on the server when the animals state updates, so UI gets refreshed with new data immediately

    const handleDataUpdate = () => { mutate() }

    // In case same animal is selected twice in a row, we reset selectedAnimalId to null and then back to animalId, this insures child component prop still update

    const handleEdit = (id) => {
        if (selectedAnimalId === id) {
            setSelectedAnimalId(null);
            setTimeout(() => {
                setSelectedAnimalId(id);
            }, 0);
        } else {
            setSelectedAnimalId(id);
        }
    }

    // We sort the animals by createdAt date, usually API whould have sort and filter options

    const sortedAnimals = animals.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <>
            <div className="dashboard-form mb-10">
                <AnimalsForm items={animals} selectedId={selectedAnimalId} onDataUpdate={handleDataUpdate} />
            </div>
            {isValidating ? ( <Loading /> ) : (
                <table className="w-full text-sm">
                    <thead>
                        <tr className=" text-center">
                            <th className="p-4 bg-slate-100 rounded-tl-md">Image</th>
                            <th className="p-4 bg-slate-100">Name</th>
                            <th className="p-4 bg-slate-100">Age</th>
                            <th className="p-4 bg-slate-100 text-left">Description</th>
                            <th className="p-4 bg-slate-100 rounded-tr-md">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAnimals?.map(animal => (
                            <tr key={animal?.id} className="border-t text-center">
                                <td className="p-4 ">
                                    <div className="rounded-full overflow-hidden w-20 h-20">
                                        <img src={`${animal.asset?.url}`} width={200} height={200} alt={animal.name} className="w-full h-full object-cover" /> 
                                    </div>
                                </td>
                                <td className="p-4 font-medium">{ animal?.name }</td>
                                <td className="p-4">{ animal?.age }</td>
                                <td className="p-4 text-left w-full">{ animal?.description }</td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <button onClick={() => handleEdit(animal?.id)} className="text-blue-900 hover:text-blue-400">Edit</button> 
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}