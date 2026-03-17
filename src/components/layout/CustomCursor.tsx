'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Nascondi il cursore custom su mobile
        if (/Mobi|Android/i.test(navigator.userAgent)) return;

        const updateMousePos = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePos);
        return () => window.removeEventListener('mousemove', updateMousePos);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 rounded-full mix-blend-difference bg-white pointer-events-none z-[300] hidden md:flex items-center justify-center"
            animate={{
                x: position.x - 8,
                y: position.y - 8,
            }}
            transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
        />
    );
}
