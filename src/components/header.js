

export default function Header() {

    return (
        <header className="main-header ">

            <div className="container max-w-6xl mx-auto">

                <nav className="main-nav flex items-center justify-between flex-wrap bg-gray-200 p-6">
                    <div className="logo flex items-center flex-shrink-0 mr-6">
                        <img src="https://via.placeholder.com/150" alt="logo" />
                    </div>
                    <div class="block lg:hidden">
                        <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                        </button>
                    </div>
                    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                        <div class="text-sm lg:flex-grow">
                            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 mr-4">Hjem</a>
                            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 mr-4">Om os</a>
                            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 mr-4">Bliv Frivillig</a>
                            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 mr-4">Dyr i nød?</a>
                            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0">Adopter et dyr</a>
                        </div>
                    </div>
                </nav>

            </div>
        </header>
    )
}

