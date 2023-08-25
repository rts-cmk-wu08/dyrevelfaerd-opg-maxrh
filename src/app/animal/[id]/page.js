import Image from 'next/image'
import Link from "next/link"

export default async function Animal({ params }) {

    async function getAllAnimals() {
        const res = await fetch('http://localhost:4000/api/v1/animals');
        if (!res.ok) { throw new Error('Failed to fetch data') }
        const animals = await res.json();
        return animals;
    }

    const allAnimals = await getAllAnimals();
    const currentIndex = allAnimals.findIndex(animal => animal.id === parseInt(params.id));

    const item = allAnimals[currentIndex];

    const prevItem = currentIndex > 0 ? allAnimals[currentIndex - 1] : null;
    const nextItem = currentIndex < allAnimals.length - 1 ? allAnimals[currentIndex + 1] : null;

    return (
        <main className="flex min-h-screen flex-col border-t">
            <section className="animal-section">
                <div className="container max-w-6xl mx-auto py-12 px-6">
                    
                    { item ? (
                        <>
                            <article 
                                className="flex bg-white rounded overflow-hidden shadow-lg z-10 relative" 
                            >
                                <div className="w-1/3">
                                    <Image className="w-full h-full object-cover" width="600" height="330" src={`${item?.asset.url}`} alt="Sunset in the mountains" />
                                </div>
                                <div className="flex-1 px-16 py-14">
                                    <span className="absolute top-0 right-0 py-3 px-6 text-xs tracking-wider">
                                        {currentIndex + 1} / {allAnimals.length}
                                    
                                    </span>
                                    <h2 className="text uppercase mb-4 font-bold tracking-wider">{item?.name}</h2>
                                    <p className="mb-6 whitespace-pre-wrap">{item?.description}</p>
                                    <p className='text-sm text-gray-500'>Age: {item?.age}</p>
                                </div>
                            </article>

                            <div className="flex mt-4">
                                {prevItem && (
                                    <Link href={`/animal/${prevItem.id}`} className="text-blue-900 hover:text-blue-500 py-4 px-6 flex items-center mr-auto">
                                        &lt; Forrige
                                    </Link>
                                )}
                                {nextItem && (
                                    <Link href={`/animal/${nextItem.id}`} className="text-blue-900 hover:text-blue-500 py-4 px-6 ml-auto">
                                        Næste &gt;
                                    </Link>
                                )}
                            </div>
                        </>


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