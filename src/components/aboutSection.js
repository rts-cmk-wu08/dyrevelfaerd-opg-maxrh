
export default async function AboutSection() {

    async function getData() {
        const res = await fetch('http://localhost:4000/api/v1/abouts')
        if (!res.ok) { throw new Error('Failed to fetch data') }
        return res.json()
    }

    const items = await getData()

    return (
        <section id="about" className="about-section">

            <div className="container max-w-6xl mx-auto py-12 px-6">
                <div className="flex -mx-6">
                    {items.map((item) => (
                        <article key={item.id} className="flex-1 mx-6">

                            <h1 className="text-3xl mb-6 text-blue-900">{item.title}</h1>
                            <p className="text-sm mb-6 whitespace-pre-wrap">{item.content}</p>
                            
                        </article>
                    ))}
                </div>
            </div>
            
        </section>
    )
}