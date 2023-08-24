"use client"

import { useEffect, useState } from 'react'

export default function HeroSection({ id }) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:4000/api/v1/adoptsections/${id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const fetchedData = await response.json()
                setData(fetchedData)
                setIsLoading(false) 
            } catch (error) {
                console.error('Error fetching hero data:', error);
                setError(error)
                setIsLoading(false) 
            }
        }
        fetchData()
    }, [])
    
    const bgImage = { 
        backgroundImage: error ? 'none' : `url('${data?.asset.url}')`
    }

    return (
        <section className="hero h-80 bg-gray-100 selection:bg-no-repeat bg-center bg-cover" style={bgImage}>
            
            {(isLoading || error) ? (
                <div className="container max-w-6xl mx-auto py-16 px-6">

                    { isLoading && <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div> }
                    { error && <p>Error loading section</p> }

                </div>
            ) : (
                <div className="container max-w-6xl mx-auto text-white py-16 px-6">

                    <h1 className="text-6xl mb-6">{data?.title}</h1>
                    <p className='text-xl'>{data?.content}</p>
                    
                </div>
            )}
            
        </section>
    )
}