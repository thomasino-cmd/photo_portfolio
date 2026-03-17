'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Link from 'next/link';
import { CMSProject } from '@/lib/cmsData';
import ModalGallery from './ModalGallery';
import { getPhotoMetadata } from '@/lib/photo_metadata';

export interface Photo {
    id: string;
    url: string;
    width: number;
    height: number;
    alt: string;
    category?: string;
}

export default function MasonryGrid({ photos, enableLinks }: { photos: Photo[], enableLinks?: boolean }) {
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

    const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#FF7F50', '#32CD32', '#9370DB', '#FF4500', '#00FF7F'];

    // Map basic photos to the CMSProject format expected by ModalGallery
    const modalProjects: CMSProject[] = photos.map((p, index) => {
        const metadata = getPhotoMetadata(p.url);
        return {
            id: p.id,
            mediaUrl: p.url,
            mediaType: 'image',
            bgColor: colors[index % colors.length],
            title: p.category ? p.category.replace(/-/g, ' ') : 'Portfolio',
            description: metadata.description
        };
    });

    return (
        <>
            <div className="flex flex-col md:flex-row gap-16 md:gap-8 lg:gap-24 justify-center items-center md:items-start pt-24 pb-32">
                {[0, 1, 2].map(colIndex => (
                    <div key={colIndex} className={clsx("flex flex-col gap-24 lg:gap-40 w-full md:w-1/3",
                        colIndex === 0 ? "md:mt-0" : colIndex === 1 ? "md:mt-32" : "md:mt-16"
                    )}>
                        {photos.map((photo, index) => {
                            // Only render items meant for this column
                            if (index % 3 !== colIndex) return null;

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
                                            onClick={() => setSelectedPhotoIndex(index)}
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
                {selectedPhotoIndex !== null && (
                    <ModalGallery
                        projects={modalProjects}
                        initialIndex={selectedPhotoIndex}
                        onClose={() => setSelectedPhotoIndex(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
