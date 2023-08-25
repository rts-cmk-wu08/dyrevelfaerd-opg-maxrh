import Image from 'next/image'

export default async function VolunteerSection() {

    async function getData() {
        const res = await fetch('http://localhost:4000/api/v1/volunteers')
       
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
       
        return res.json()
    }

    const items = await getData()
    
    return (
        <section className="about-section bg-blue-100">
            <div className="container max-w-6xl mx-auto py-12 px-6">
            <h1 className="text-3xl mb-10 text-blue-900">Bliv frivillig</h1>

                <div className="flex -mx-4">
                    {items.map((item) => (
                        <article key={item.id} className="flex-1 flex flex-col mx-4 max-w-sm bg-white rounded overflow-hidden shadow-lg">
                            <div className="px-6 py-4">
                                <h2 className="text uppercase text-gray-600">{item.title}</h2>
                            </div>
                            <Image className="w-full " width="600" height="330" src={`${item.asset.url}`} alt="Sunset in the mountains" />
                            <div className="px-6 py-6">
                                <p className="text-sm mb-6 whitespace-pre-wrap">{item.content}</p>
                            </div>
                            <div className="border-t border-gray-200 px-6 py-4 mt-auto">
                                <p className="text-xs italic whitespace-pre-wrap mb-1">{item.extra}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}