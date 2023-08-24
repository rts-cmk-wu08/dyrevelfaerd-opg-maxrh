import Image from 'next/image'

export default function Hero({ data }) {

    const title = data.title
    const content = data.content
    const imageUrl = data.asset.url
    
    const heroStyle = { backgroundImage: `url('${imageUrl}')` };

    return (
        <section className="hero h-80 bg-no-repeat bg-center bg-cover" style={heroStyle}>
            <div className="container max-w-6xl mx-auto text-white py-16 px-6">
                <h1 className="text-4xl font-bold mb-3">{title}</h1>
                <p>{content}</p>
            </div>
        </section>
    )
}