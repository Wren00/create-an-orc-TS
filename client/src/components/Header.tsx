import {useState} from "react";


export const SiteHeader  = () => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-purple-900 border border-gray-300 text-white shadow-md flex items-center justify-between">

            <h1 className="absolute left-1/2 transform -translate-x-1/2 font-bold text-xl z-10">
                Orc Generator
            </h1>

            <div className="relative inline-block text-left z-20">
                <button
                    onClick={() => setOpen(!open)}
                    className="inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-purple-900 text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    aria-haspopup="true"
                    aria-expanded={open}
                >
                    Menu
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {open && (
                    <div
                        className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-purple-800 ring-1 ring-black ring-opacity-50 z-100"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex={-1}
                    >
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-white hover:bg-purple-700"
                            role="menuitem"
                            tabIndex={-1}
                            id="menu-item-0"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-white hover:bg-purple-700"
                            role="menuitem"
                            tabIndex={-1}
                            id="menu-item-1"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-white hover:bg-purple-700"
                            role="menuitem"
                            tabIndex={-1}
                            id="menu-item-2"
                        >
                            Contact
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
}