
export default async function About() {

    const response = await fetch('http://localhost:4000/api/v1/abouts')
	const abouts = await response.json()

    return (
        <section className="about-section" >
            <div className="container max-w-6xl mx-auto py-16 px-6">
                <div className="flex -mx-6">
                    {abouts.map((about) => (
                        <article key={about.id} className="flex-1 mx-6">
                            <h1 className="text-2xl mb-3">{about.title}</h1>
                            <p className="text-sm/relaxed">{about.content}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}