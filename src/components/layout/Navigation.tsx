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
        <nav className="absolute top-0 left-0 w-full z-50 text-black p-6 md:px-12 md:py-8 flex justify-between items-start md:items-center flex-col md:flex-row pointer-events-none">
            <Link href="/" className="font-serif font-black text-4xl md:text-5xl uppercase tracking-tighter pointer-events-auto mb-4 md:mb-0" style={{ transform: 'scaleY(1.3)' }}>
                Portfolio
            </Link>
            <ul className="flex flex-wrap gap-4 md:gap-8 text-sm md:text-md font-bold font-serif uppercase tracking-tighter" style={{ transform: 'scaleY(1.3)', transformOrigin: 'top center' }}>
                {categories.map((cat) => {
                    const isActive = pathname === cat.path;
                    return (
                        <li key={cat.path} className="pointer-events-auto relative">
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
