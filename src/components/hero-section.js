import Image from 'next/image'

export default function Hero({ data }) {

    const title = data.title
    const content = data.content
    const imageUrl = data.asset.url
    
    const heroStyle = { backgroundImage: `url('${imageUrl}')` };

    return (
        <section className="hero w-full bg-no-repeat bg-center py-8 px-4 lg:py-16 lg:px-12" style={heroStyle}>
            <div className="container max-w-6xl mx-auto text-white">
                <h1 className="text-4xl font-bold mb-2">{title}</h1>
                <p>{content}</p>
            </div>
        </section>
    )
}