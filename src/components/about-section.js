
export default async function About() {

    const response = await fetch('http://localhost:4000/api/v1/abouts')
	const abouts = await response.json()

    return (
        <section className="about-section" >
            <div className="container max-w-6xl mx-auto py-16 px-6">
                <div className="flex -m-4">
                    {abouts.map((about) => (
                        <article key={about.id} className="flex-1 mx-4">
                            <h1 className="text-2xl font-bold mb-3">{about.title}</h1>
                            <p>{about.content}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}