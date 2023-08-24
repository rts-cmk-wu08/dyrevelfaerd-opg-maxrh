import About from '@/components/about-section';
import Hero from '@/components/hero-section'
import Image from 'next/image'

export default async function Home() {

	const data = await fetch('http://localhost:4000/api/v1/adoptsections')
	const adoptsections = await data.json()
	
	const heroSection = adoptsections.find(section => section.id === 1);

	return (
		<main className="flex min-h-screen flex-col">
			<Hero data={heroSection} />
			<About />

		</main>
	)
}
