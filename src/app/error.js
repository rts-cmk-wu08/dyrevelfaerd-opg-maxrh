'use client' 
 
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    
    return (
        <main className="min-h-[calc(100vh-72px)] flex flex-col">
            <section className="flex-1 dashboard-section flex items-center">
                <div className="container max-w-6xl mx-auto py-12 px-6 text-center mb-16">
                    <h1 className='text-6xl uppercase font-bold tracking-wider mb-6'>Don't Panic!</h1>
                    <p className='text-2xl mb-8'>Something went wrong but we are working on it.</p>
                    <button onClick={() => reset()} className="bg-blue-900 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded mt-4">Try again</button>
                </div>
            </section>
        </main>
    )
}