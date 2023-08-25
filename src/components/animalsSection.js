"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AnimalsSection() {
    const [items, setItems] = useState([]);
    const [displayCount, setDisplayCount] = useState(8); // Initial number of items to display
    const [numItems, setNumItems] = useState(0);

    async function getData() {
        const res = await fetch('http://localhost:4000/api/v1/animals')
        if (!res.ok) { throw new Error('Failed to fetch data') }
        const data = await res.json();
        setItems(data);
        setNumItems(data.length);
    }

    if (items.length === 0) {
        getData()
        return <p>Loading...</p>
    }
    
    const displayedItems = items.slice(0, displayCount)
    
    const loadMore = () => {
        setDisplayCount(displayCount + 4) // Increment the number of items to display
    }
    
    return (
        <>
            <section className="about-section">
                <div className="container max-w-6xl mx-auto py-12 px-6">
                    <h1 className="text-5xl mb-6 text-blue-900">Dyr hos os</h1>
                    <p className='mb-10'>Antal: <span className='font-bold'>{numItems}</span></p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-10">
                        {displayedItems.map((item) => (
                            <Link 
                                href={`/animal/${item.id}`} 
                                key={item.id} 
                                className="flex bg-white rounded overflow-hidden shadow-lg cursor-pointer" 
                                scroll={true}
                            >
                                <div className="w-1/3">
                                    <Image className="w-full h-full object-cover" width="600" height="330" src={`${item.asset.url}`} alt="Sunset in the mountains" />
                                </div>
                                <div className="flex-1 px-6 py-4">
                                    <h2 className="text uppercase mb-4 font-bold tracking-wider">{item.name}</h2>
                                    <p className="text-sm mb-6 whitespace-pre-wrap">{item.description}</p>
                                    <p className='text-xs text-gray-500'>Age: {item.age}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {displayCount < numItems ? (
                        <div className="text-center">
                            <button
                                className="bg-blue-900 hover:bg-blue-700 text-white py-3 px-5 rounded focus:outline-none focus:shadow-outline"
                                onClick={loadMore}
                            >
                                Load More
                            </button>
                        </div>
                        ) : (
                            <div className="text-center">
                                <span className="bg-gray-200 py-3 px-5 rounded">
                                    No more animals :(
                                </span>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}