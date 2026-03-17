'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const categories = [
    { name: 'Drones', path: '/drones' },
    { name: 'Food & Drink', path: '/food-&-drink' },
    { name: 'Landscape', path: '/landscape' },
    { name: 'Nature', path: '/nature' },
    { name: 'Nightclubs', path: '/nightclubs' },
    { name: 'Portrait', path: '/portrait' },
    { name: 'Still Life', path: '/still-life' },
    { name: 'Street', path: '/street' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Info / Contact', path: '/info' },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="absolute top-0 left-0 w-full z-50 text-black px-6 py-4 md:px-12 md:py-6 flex justify-between items-center flex-col md:flex-row pointer-events-none gap-y-6">
            <Link href="/" className="font-serif font-black text-2xl md:text-3xl uppercase tracking-tighter pointer-events-auto whitespace-nowrap mr-6 shrink-0 leading-[0.8] text-center" style={{ transform: 'scaleY(1.3)', transformOrigin: 'center center' }}>
                Thomas <br /> Sterlini
            </Link>
            <ul className="flex flex-wrap justify-center md:justify-end gap-x-3.5 md:gap-x-6 gap-y-3 text-sm md:text-[17px] font-bold font-serif uppercase tracking-tighter pointer-events-auto" style={{ transform: 'scaleY(1.3)', transformOrigin: 'top center' }}>
                {categories.map((cat) => {
                    const isActive = pathname === cat.path;
                    return (
                        <li key={cat.path} className="relative">
                            <Link href={cat.path} className="hover:opacity-70 transition-opacity">
                                {cat.name}
                            </Link>
                            {isActive && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-black"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
