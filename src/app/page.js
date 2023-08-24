import Volunteer from '@/components/volunteer-section'
import AboutSection from '@/components/aboutSection'
import HeroSection from '@/components/heroSection'
import Footer from '@/components/footer'
import Newsletter from '@/components/newsletter-section'


export default function Home() {

	return (
		<main className="flex min-h-screen flex-col">
			<HeroSection id={1}/>
			<AboutSection />
			<Volunteer />
			<HeroSection id={2}/>
			<Newsletter />
			<HeroSection id={3}/>
			<Footer />
		</main>
	)
}
