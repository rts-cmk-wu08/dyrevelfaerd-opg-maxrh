"use client"

import Link from "next/link"
import Image from "next/image"

export default function Header() {

    return (
        <header className="main-header">
            <div className="container max-w-6xl mx-auto">
                <nav className="main-nav flex items-center justify-between flex-wrap px-6 py-4">
                    <div className="site-logo flex items-center flex-shrink-0 mr-6">
                        <Link href="/" className="flex items-center hover:text-blue-900">
                            <Image src="/images/logo.png" alt="logo" width={40} height={40} className="mr-4" />
                            Forening for dyrevelfærd
                        </Link>
                    </div>
                    <div className="block md:hidden">
                        <button
                            className="flex items-center px-3 py-2 border rounded text-blue-900 border-blue-200 hover:text-blue-900 hover:border-blue-300"
                            onClick={() => {
                                const menu = document.querySelector(".main-menu");
                                menu.classList.toggle("hidden");
                            }}
                        >
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V9zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </button>
                    </div>
                    <div className="main-menu w-full md:flex md:items-center md:w-auto hidden p-6 md:p-0">
                        <div className="md:flex-grow text-gray-600 md:flex md:space-x-4">
                            <Link href="/" className="block mt-2 md:inline-block md:mt-0 hover:text-blue-900">Hjem</Link>
                            <Link href="/#about" className="block mt-2 md:inline-block md:mt-0 hover:text-blue-900">Om os</Link>
                            <Link href="/#volunteer" className="block mt-2 md:inline-block md:mt-0 hover:text-blue-900">Bliv Frivillig</Link>
                            <Link href="/#rescue" className="block mt-2 md:inline-block md:mt-0 hover:text-blue-900">Dyr i nød?</Link>
                            <Link href="/#adopt" className="block mt-2 md:inline-block md:mt-0 hover:text-blue-900">Adopter et dyr</Link>
                        </div>
                        <div>
                            <Link
                                href="/dashboard"
                                className="inline-block text-xs px-4 py-2 leading-none tracking-widest uppercase border rounded text-blue-900 border-blue-200 hover:border-blue-300 mt-6 md:mt-0 -ml-2 md:ml-4"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

