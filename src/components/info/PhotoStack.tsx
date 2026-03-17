'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const photos = [
    {
        id: 'fotografo',
        src: '/ABOUT/FOTOGRAFO.jpg',
        alt: 'Thomas Sterlini - Fotografo',
        label: 'FOTOGRAFO',
    },
    {
        id: 'laureato',
        src: '/ABOUT/LAUREATO.jpeg',
        alt: 'Thomas Sterlini - Laureato',
        label: 'LAUREATO',
    },
    {
        id: 'portapizze',
        src: '/ABOUT/PORTAPIZZE.jpeg',
        alt: 'Thomas Sterlini - Portapizze',
        label: 'PORTAPIZZE',
    },
];

export default function PhotoStack() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextPhoto = () => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
    };

    const prevPhoto = () => {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    return (
        <div className="relative w-full max-w-md mx-auto aspect-[3/4] flex flex-col items-center justify-center group">
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                    {photos.map((photo, index) => {
                        // Calculate relative index for stacking
                        const relativeIndex = (index - currentIndex + photos.length) % photos.length;
                        const isFront = relativeIndex === 0;

                        // Back photos should be visible but offset
                        if (relativeIndex > 2) return null;

                        return (
                            <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, scale: 0.8, x: 20, rotate: 5 }}
                                animate={{
                                    opacity: 1,
                                    scale: isFront ? 1 : 0.95 - relativeIndex * 0.05,
                                    x: relativeIndex * 15,
                                    y: relativeIndex * -10,
                                    rotate: isFront ? -2 : 2 + relativeIndex * 3,
                                    zIndex: photos.length - relativeIndex,
                                }}
                                exit={{ opacity: 0, scale: 0.5, x: -100, rotate: -15 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="absolute w-full h-full border-2 border-black bg-white p-2 shadow-xl"
                                style={{ originX: 0.5, originY: 0.5 }}
                            >
                                <div className="relative w-full h-full overflow-hidden">
                                    <Image
                                        src={photo.src}
                                        alt={photo.alt}
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority={isFront}
                                    />
                                </div>
                                {isFront && (
                                    <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-space tracking-widest uppercase">
                                        {photo.label}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <div className="flex gap-8 mt-12 z-10">
                <button
                    onClick={prevPhoto}
                    className="p-3 border-2 border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                    aria-label="Previous photo"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextPhoto}
                    className="p-3 border-2 border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                    aria-label="Next photo"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}
