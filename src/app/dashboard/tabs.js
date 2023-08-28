import TabsContent from "./tabsContent"

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

                { activeTab === 'animals' && <TabsContent endpoint="animals"/> }
                { activeTab === 'subscribers' &&  <TabsContent endpoint="subscribers"/> }
                { activeTab === 'volunteers' && <TabsContent endpoint="volunteers"/> }
                { activeTab === 'abouts' && <TabsContent endpoint="abouts"/> }
                { activeTab === 'heroes' && <TabsContent endpoint="adoptsections"/> }

            </div>
        </>
    )
}