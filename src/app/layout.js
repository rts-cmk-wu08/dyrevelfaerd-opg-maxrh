import './globals.css'
import { Oswald, Poppins } from 'next/font/google'
import Header from '@/components/header'

const oswald = Oswald({ 
	weight: ['400'],
	styles: ['normal'],
	variable: '--font-oswald',
	subsets: ['latin'],
	display: 'swap',
})

const poppins = Poppins({ 
	weight: ['400', '500', '600', '700'],
	styles: ['normal', 'italic'],
	variable: '--font-poppins',
	subsets: ['latin'],
	display: 'swap',
})

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${oswald.variable} ${poppins.variable}`} suppressHydrationWarning>
			<body>
				<Header />
				{children}
			</body>
		</html>
	)
}
