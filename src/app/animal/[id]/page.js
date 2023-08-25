import Image from 'next/image'
import Link from "next/link"

export default async function Animal({ params }) {

    async function getData() {
        const res = await fetch(`http://localhost:4000/api/v1/animals/${params.id}`)
        if (!res.ok) { throw new Error('Failed to fetch data') }
        return res.json()
    }

    const item = await getData()

    return (
        <main className="flex min-h-screen flex-col">
            <section className="animal-section border-t">
                <div className="container max-w-6xl mx-auto py-12 px-6">
                    
                    { item ? (
                        <article 
                            className="flex bg-white rounded overflow-hidden shadow-lg" 
                        >
                            <div className="w-1/3">
                                <Image className="w-full h-full object-cover" width="600" height="330" src={`${item?.asset.url}`} alt="Sunset in the mountains" />
                            </div>
                            <div className="flex-1 px-16 py-14">
                                <h2 className="text uppercase mb-4 font-bold tracking-wider">{item?.name}</h2>
                                <p className="mb-6 whitespace-pre-wrap">{item?.description}</p>
                                <p className='text-sm text-gray-500'>Age: {item?.age}</p>
                            </div>
                        </article>
                    ) : (
                        <div className=''>
                            <p className='mb-6'>Animal not found</p>
                            <Link 
                                href="/" 
                                className="inline-block text-sm bg-blue-900 hover:bg-blue-700 text-white py-3 px-5 rounded focus:outline-none focus:shadow-outline"
                            >
                                Back to home
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}