import DashboardAnimals from "./dashboardAnimals"

import { useState } from 'react'
import Link from "next/link"

export default function Tabs() {
    const [activeTab, setActiveTab] = useState('animals')
    const handleTabClick = (tab) => { setActiveTab(tab) }
    const tabs = ['animals', 'subscribers', 'volunteers', 'abouts', 'heroes']

    return (

        <>
            <ul className="dashboard-tabs flex text-sm mb-10">
                {tabs.map((tab, index) => (
                    <li className="mr-3" key={index}>
                        <Link href="#" className={`inline-block rounded py-2 px-4 hover:bg-slate-100 hover:text-black capitalize ${activeTab === tab ? 'bg-slate-100' : 'bg-white text-gray-500'}`}
                            onClick={() => handleTabClick(tab)}
                        >{tab}</Link>
                    </li>
                ))}
            </ul>

            <div className="dashboard-content flex flex-col mt-8">

                { activeTab === 'animals' && <DashboardAnimals /> }
                { activeTab === 'subscribers' && <p>this is subscribers</p> }
                { activeTab === 'volunteers' && <p>this is volunteers</p> }
                { activeTab === 'abouts' && <p>this is abouts</p> }
                { activeTab === 'heroes' && <p>this is heroes</p> }

            </div>
        </>
    )
}