"use client"

import useSWR from "swr"
import Loading from "./loading"
import { useEffect, useState } from "react"
import TabsForm from "./tabsForm"
import useAuth from "../hooks/useAuth"

export default function TabsContent({ endpoint }) {
    const [items, setItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const auth = useAuth()

    // We use a custom fetcher function to send the auth token with the request

    const fetcher = (url) => fetch(url, { 
        headers: { Authorization: `Bearer ${auth.user.accessToken}` } 
    }).then((r) => r.json())

    const { data, error, isValidating, mutate } = useSWR(`http://localhost:4000/api/v1/${endpoint}`, fetcher)

    // We use a useEffect hook to update the items state when the server data changes

    useEffect(() => {
        if (data) { setItems(data) }
        if (error) { throw new Error('Failed to fetch data') }
    }, [data, error])

    // We use mutate to update the data on the server when the items state updates, so UI gets refreshed with new data immediately

    const handleDataUpdate = () => { mutate() }

    // In case same item is selected twice in a row, we reset selectedId to null and then back to animalId, this insures child component prop still update

    const handleEdit = (id) => {
        if (selectedId === id) {
            setSelectedId(null);
            setTimeout(() => {
                setSelectedId(id);
            }, 0);
        } else {
            setSelectedId(id);
        }
    }

    // We sort the items by createdAt date, usually API whould have sort and filter options

    const sortedItems = items.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    // We check if there is data in a column, if not we don't render the column

    const hasData = (key) => sortedItems.some((item) => item[key])

    // We define the table columns and their classes

    const columnConfigs = [
        { key: 'asset', label: 'Image', theadClass: '', tBodyClass: '' },
        { key: 'name', label: 'Name', theadClass: '', tBodyClass: 'font-medium'   },
        { key: 'title', label: 'Title', theadClass: '', tBodyClass: 'font-medium'   },
        { key: 'email', label: 'Email', theadClass: '', tBodyClass: ''   },
        { key: 'age', label: 'Age', theadClass: '', tBodyClass: ''   },
        { key: 'description', label: 'Description', theadClass: 'w-full text-left', tBodyClass: 'text-left' },
        { key: 'content', label: 'Content', theadClass: 'w-2/3 text-left', tBodyClass: 'text-left'   },
        { key: 'extra', label: 'Extra', theadClass: 'w-1/3 text-left', tBodyClass: ' text-left'   },
    ];

    return (
        <>
            <div className="dashboard-form mb-10">
                <TabsForm items={items} selectedId={selectedId} onDataUpdate={handleDataUpdate} endpoint={endpoint} hasData={hasData} />
            </div>
            {isValidating ? ( <Loading /> ) : (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-center">
                            {columnConfigs.map((columnConfig, index) => (
                                hasData(columnConfig.key) && (
                                    <th key={index} className={`p-4 bg-slate-100 ${columnConfig.theadClass}`}>
                                        {columnConfig.label}
                                    </th>
                                )
                            ))}
                            <th className="p-4 bg-slate-100 rounded-tr-md">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedItems?.map((item) => (
                            <tr key={item?.id} className="border-t text-center">
                                {columnConfigs.map((columnConfig) => (
                                    hasData(columnConfig.key) ? (
                                        <td
                                            key={columnConfig.key}
                                            className={`p-4 ${columnConfig.tBodyClass}`}
                                        >
                                            {columnConfig.key === 'asset' ? (
                                                <div className="rounded-full overflow-hidden w-20 h-20">
                                                    <img
                                                        src={item.asset?.url}
                                                        width={200}
                                                        height={200}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                item[columnConfig.key] 
                                            )}
                                        </td>
                                    ) : null
                                ))}
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <button
                                            onClick={() => handleEdit(item?.id)}
                                            className="text-blue-900 hover:text-blue-400"
                                        >
                                            Edit
                                        </button>
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