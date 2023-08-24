import Volunteer from '@/components/volunteer-section'
import About from '@/components/about-section'
import Hero from '@/components/hero-section'
import Footer from '@/components/footer'
import Rescue from '@/components/rescue-section'
import Newsletter from '@/components/newsletter-section'
import Adopt from '@/components/adopt-section'


export default async function Home() {

	const data = await fetch('http://localhost:4000/api/v1/adoptsections')
	const adoptsections = await data.json()

	const heroSection = adoptsections.find(section => section.id === 1);
	const rescueSection = adoptsections.find(section => section.id === 2);
	const adoptSection = adoptsections.find(section => section.id === 3);

	return (
		<main className="flex min-h-screen flex-col">
			<Hero data={heroSection} />
			<About />
			<Volunteer />
			<Rescue data={rescueSection} />
			<Newsletter />
			<Adopt data={adoptSection} />
			<Footer />
		</main>
	)
}
