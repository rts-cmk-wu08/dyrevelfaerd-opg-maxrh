import VolunteerSection from '@/components/volunteerSection'
import AboutSection from '@/components/aboutSection'
import HeroSection from '@/components/heroSection'
import NewsletterSection from '@/components/newsletterSection'
import AnimalsSection from '@/components/animalsSection'

export default function Home() {

	return (
		<main className="flex min-h-screen flex-col">
			<HeroSection id={1} titleSize={'text-6xl'} anchor="hero" />
			<AboutSection />
			<VolunteerSection />
			<HeroSection id={2} anchor="rescue" />
			<NewsletterSection />
			<HeroSection id={3} anchor="adopt" />
			<AnimalsSection />

		</main>
	)
}
