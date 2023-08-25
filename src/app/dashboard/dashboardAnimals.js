"use client"

import { useEffect, useState } from 'react';
import Image from "next/image"

export default function DashboardAnimals() {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await fetch('http://localhost:4000/api/v1/animals');
            if (!res.ok) { throw new Error('Failed to fetch data') }
            const animals = await res.json()
            setAnimals(animals)
        }

        getData();

    }, []);


    const handleDelete = async (id) => {
        try {
            // You can implement the delete API call here
            console.log('Deleting animal with ID:', id);

        } catch (error) {
            console.error('Failed to delete animal:', error);
        }
    };

    const handleEdit = (id) => {
        // Implement your edit logic here, e.g., navigate to an edit page
        console.log('Editing animal with ID:', id);
    };

    return (
        <div>
            This is the dashboard animals

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200 text-left text-sm">
                        <th className="border p-4">Name</th>
                        <th className="border p-4">Age</th>
                        <th className="border p-4">Image</th>
                        <th className="border p-4">Description</th>
                        <th className="border p-4">Actions</th>

                    </tr>
                </thead>

                <tbody>
                    <tr><td colSpan="5">
                        <button className="w-full text-blue-900 hover:text-blue-400 py-4 px-2 font-medium">New</button>
                    </td></tr>
                    {animals.map(animal => (
                        <tr key={animal?.id} className="odd:bg-gray-100 text-sm">
                            <td className="border p-4">{animal?.name}</td>
                            <td className="border p-4">{animal?.age}</td>
                            <td className="border"><Image src={`${animal?.asset.url}`} width={300} height={300} alt={animal?.name} className="w-full h-full object-cover"/></td>
                            <td className="border p-4">{animal?.description}</td>
                            <td className="border p-4">
                                <button onClick={() => handleEdit(animal?.id)} className="text-blue-900 hover:text-blue-400 mb-1">Edit</button>
                                <button onClick={() => handleDelete(animal?.id)} className="text-blue-900 hover:text-blue-400 mb-1">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}