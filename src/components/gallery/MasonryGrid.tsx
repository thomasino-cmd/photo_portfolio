'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Link from 'next/link';

export interface Photo {
    id: string;
    url: string;
    width: number;
    height: number;
    alt: string;
    category?: string;
}

export default function MasonryGrid({ photos, enableLinks }: { photos: Photo[], enableLinks?: boolean }) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <>
            <div className="flex flex-col md:flex-row gap-16 md:gap-8 lg:gap-24 justify-center items-center md:items-start pt-24 pb-32">
                {/* Divide photos into 3 columns for desktop manually or just map if using flex wrap. Let's use a 3 column layout */}
                {[0, 1, 2].map(colIndex => (
                    <div key={colIndex} className={clsx("flex flex-col gap-24 lg:gap-40 w-full md:w-1/3",
                        colIndex === 0 ? "md:mt-0" : colIndex === 1 ? "md:mt-32" : "md:mt-16"
                    )}>
                        {photos.filter((_, i) => i % 3 === colIndex).map((photo, index) => {

                            // Bright and happy colors for the frames
                            const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#FF7F50', '#32CD32', '#9370DB', '#FF4500', '#00FF7F'];
                            const frameColor = colors[index % colors.length];

                            return (
                                <div key={photo.id} className="relative break-inside-avoid px-8 md:px-0">
                                    {/* Flat Pop Color Frame */}
                                    <div
                                        className="absolute inset-0 border border-black z-0 pointer-events-none"
                                        style={{
                                            backgroundColor: frameColor,
                                            transform: 'translate(16px, 16px)'
                                        }}
                                    />

                                    {/* The Main Image Container */}
                                    {enableLinks && photo.category ? (
                                        <Link href={`/${photo.category.toLowerCase().replace(/ /g, '-')}`} className="block relative z-10 outline-none">
                                            <motion.div
                                                layoutId={`img-container-${photo.id}`}
                                                className="relative overflow-hidden border border-black bg-white cursor-pointer"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: "tween", duration: 0.2 }}
                                            >
                                                <Image
                                                    src={photo.url}
                                                    alt={photo.alt}
                                                    width={photo.width}
                                                    height={photo.height}
                                                    className="w-full h-auto object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                                                    placeholder="blur"
                                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                                    priority={index < 4}
                                                    unoptimized={photo.url.startsWith('http')}
                                                />
                                            </motion.div>
                                        </Link>
                                    ) : (
                                        <motion.div
                                            layoutId={`img-container-${photo.id}`}
                                            className="relative overflow-hidden z-10 border border-black bg-white cursor-pointer"
                                            onClick={() => setSelectedId(photo.id)}
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: "tween", duration: 0.2 }}
                                        >
                                            <Image
                                                src={photo.url}
                                                alt={photo.alt}
                                                width={photo.width}
                                                height={photo.height}
                                                className="w-full h-auto object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                                                placeholder="blur"
                                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                                priority={index < 4}
                                                unoptimized={photo.url.startsWith('http')}
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center cursor-none"
                        onClick={() => setSelectedId(null)}
                    >
                        {photos.filter(p => p.id === selectedId).map(photo => (
                            <motion.div
                                layoutId={`img-container-${photo.id}`}
                                key="fullscreen-img"
                                className="relative w-full h-full max-w-[95vw] max-h-[95vh] m-auto"
                            >
                                <Image
                                    src={photo.url}
                                    alt={photo.alt}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                    unoptimized={photo.url.startsWith('http')}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
