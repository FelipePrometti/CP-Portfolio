import Link from 'next/link';
import { CiCirclePlus } from "react-icons/ci";

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-cor-1 to-cor-2 shadow-lg py-4">
            <nav className="container mx-auto flex justify-between items-center px-6">
                <div className="text-3xl font-extrabold text-cor-6">
                    <Link href="/" className="hover:opacity-90 transition-opacity duration-300">
                        CP de Front-End
                    </Link>
                </div>

                <ul className="flex space-x-8">
                    <li>
                        <Link href="/" className="text-cor-6 text-lg hover:text-cor-3 transition-colors duration-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/checkpoints" className="text-cor-6 text-lg hover:text-cor-3 transition-colors duration-300">
                            CheckPoints
                        </Link>
                    </li>
                    <li>
                        <Link href="/globalsolution" className="text-cor-6 text-lg hover:text-cor-3 transition-colors duration-300">
                            Global Solution
                        </Link>
                    </li>
                    <li>
                        <Link href="/challengersprint" className="text-cor-6 text-lg hover:text-cor-3 transition-colors duration-300">
                            Challenger Sprints
                        </Link>
                    </li>
                    <li>
                        <Link href="/adicionar" className="text-cor-6 text-lg hover:text-cor-3 transition-colors duration-300 h-full">
                            <CiCirclePlus />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
