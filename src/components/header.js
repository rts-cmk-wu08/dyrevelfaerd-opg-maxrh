import Link from "next/link"

export default function Header() {

    return (
        <header className="main-header">
            <div className="container max-w-6xl mx-auto">
                <nav className="main-nav flex items-center justify-between flex-wrap p-6">
                    <div className="logo flex items-center flex-shrink-0 mr-6">Logo</div>
                    <div className="block lg:hidden">
                        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                        </button>
                    </div>
                    <div className="w-full block lg:flex lg:items-center lg:w-auto">
                        <div className="text-sm lg:flex-grow">
                            <Link href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 mr-4">Hjem</Link>
                            <Link href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 mr-4">Om os</Link>
                            <Link href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 mr-4">Bliv Frivillig</Link>
                            <Link href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 mr-4">Dyr i nød?</Link>
                            <Link href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0">Adopter et dyr</Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

