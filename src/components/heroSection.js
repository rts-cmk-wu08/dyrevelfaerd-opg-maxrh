
export default async function HeroSection({ id, titleSize, anchor }) {

    async function getData() {
        const res = await fetch(`http://localhost:4000/api/v1/adoptsections/${id}`)
        if (!res.ok) { throw new Error('Failed to fetch data') }
        return res.json()
    }

    const item = await getData()
    
    const bgImage = { 
        backgroundImage: `url('${item.asset.url}')`
    }

    return (
        
        <section id={`${anchor}`} className="hero h-80 bg-gray-100 selection:bg-no-repeat bg-center bg-cover" style={bgImage}>
            
            <div className="container max-w-6xl mx-auto text-white py-16 px-6">

                <h1 className={`${titleSize ? titleSize : 'text-5xl'} mb-6`}>{item.title}</h1>
                <p className='text-xl'>{item.content}</p>
                
            </div>
            
        </section>
       
        
    )
}