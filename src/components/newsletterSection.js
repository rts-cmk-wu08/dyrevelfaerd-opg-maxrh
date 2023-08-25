
import NewsletterForm from "./newsletterForm"

export default function NewsletterSection() {

    return (
        <section className="hero h-80 bg-blue-100" >
            <div className="container max-w-6xl mx-auto py-16 px-6 flex">
                <div className="flex-1">
                    <h1 className="text-3xl mb-6 text-blue-900">Tilmeld vores nyhedsbrev</h1>
                    <p className='mb-6 whitespace-pre-wrap'>Få inspiration og nyheder om dyrevelfærd og vores arbejde, direkte i din indbakke.</p>
                </div>
                <div className="flex-1">
                    <NewsletterForm />
                </div>

            </div>
        </section>
    )
}

