import Image from 'next/image'

export default function Rescue({ data }) {

    const title = data.title
    const content = data.content
    const imageUrl = data.asset.url
    
    const bgImage = { backgroundImage: `url('${imageUrl}')` };

    return (
        <section className="hero h-80 bg-no-repeat bg-center bg-cover" style={bgImage}>
            <div className="container max-w-6xl mx-auto text-white py-16 px-6">
                <h1 className="text-6xl mb-6">{title}</h1>
                <p className='text-xl'>{content}</p>
            </div>
        </section>
    )
}