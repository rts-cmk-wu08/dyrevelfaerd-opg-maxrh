
export default async function About() {

    const response = await fetch('http://localhost:4000/api/v1/abouts')
	const abouts = await response.json()

    return (
        <section className="about-section" >
            <div className="container max-w-6xl mx-auto py-16 px-6">
                <div className="flex -mx-6">
                    {abouts.map((about) => (
                        <article key={about.id} className="flex-1 mx-6">
                            <h1 className="text-3xl mb-6 text-blue-900">{about.title}</h1>
                            <p className="text-sm mb-6 whitespace-pre-wrap">{about.content}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}