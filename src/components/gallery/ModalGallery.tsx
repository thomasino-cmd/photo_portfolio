'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Maximize, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { CMSProject } from '@/lib/cmsData';

interface ModalGalleryProps {
    projects: CMSProject[];
    initialIndex: number;
    onClose: () => void;
}

export default function ModalGallery({ projects, initialIndex, onClose }: ModalGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const activeProject = projects[currentIndex];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') nextProject();
            if (e.key === 'ArrowLeft') prevProject();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, projects.length]);

    // Reset video state on project change
    useEffect(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.pause();
        }
    }, [currentIndex]);

    const nextProject = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
    const prevProject = () => setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) setDuration(videoRef.current.duration);
    };

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            }
        }
    };

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div
            className="fixed inset-0 z-[200] flex"
            style={{ padding: 'var(--frame-padding)', backgroundColor: '#DFDFDF' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full text-black border-[2px] border-black overflow-hidden relative flex"
                style={{ backgroundColor: activeProject.bgColor, transition: 'background-color 0.5s ease' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button Mobile/Responsive */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 md:hidden p-2 hover:opacity-70"
                    aria-label="Close"
                >
                    <X size={32} strokeWidth={1} />
                </button>

                {/* 2-Column Grid */}
                <div className="w-full h-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x border-black" style={{ borderRightWidth: '1px' }}>

                    {/* Left Column: Media Area */}
                    <div className="flex-1 w-full relative flex items-center justify-center p-4 md:p-6 lg:p-8 h-[60vh] md:h-full">
                        {/* Title overlay in top left */}
                        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10 pointer-events-none">
                            <h2 className="font-serif font-black text-3xl md:text-5xl tracking-tighter uppercase mix-blend-difference text-white" style={{ transform: 'scaleY(1.3)', transformOrigin: 'top left' }}>
                                {activeProject.title}
                            </h2>
                        </div>

                        {/* Media Container without fixed white box */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="relative flex items-center justify-center w-full h-full"
                            >
                                {activeProject.mediaType === 'image' ? (
                                    <img
                                        src={activeProject.mediaUrl}
                                        alt={activeProject.title}
                                        className="max-w-full max-h-full object-contain border border-black bg-white"
                                    />
                                ) : (
                                    <div className="relative w-full h-full flex flex-col bg-black border border-black">
                                        <video
                                            ref={videoRef}
                                            src={activeProject.mediaUrl}
                                            className="w-full h-full object-contain"
                                            onTimeUpdate={handleTimeUpdate}
                                            onLoadedMetadata={handleLoadedMetadata}
                                            onEnded={() => setIsPlaying(false)}
                                            playsInline
                                        />

                                        {/* Custom Video Controls */}
                                        <div className="absolute bottom-0 left-0 w-full h-12 bg-inherit border-t border-black flex items-center px-4 gap-4" style={{ backgroundColor: activeProject.bgColor }}>
                                            <button onClick={togglePlay} className="hover:opacity-70 transition-opacity">
                                                {isPlaying ? <Pause size={20} fill="black" strokeWidth={0} /> : <Play size={20} fill="black" strokeWidth={0} />}
                                            </button>

                                            <div className="flex-1 h-2 bg-black/20 rounded-full relative overflow-hidden">
                                                <div
                                                    className="absolute top-0 left-0 h-full bg-black"
                                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                                />
                                            </div>

                                            <span className="text-sm font-mono font-medium">{formatTime(duration - currentTime)}</span>

                                            <button onClick={toggleFullscreen} className="hover:opacity-70 transition-opacity">
                                                <Maximize size={20} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Info Area */}
                    <div className="w-full md:w-[350px] lg:w-[450px] h-full flex flex-col relative border-l border-black overflow-y-auto">

                        {/* Desktop Close Button */}
                        <div className="hidden md:flex justify-end p-8">
                            <button onClick={onClose} className="hover:opacity-70 transition-opacity">
                                <X size={48} strokeWidth={1} />
                            </button>
                        </div>

                        {/* Description */}
                        <div className="flex-1 px-8 md:px-12 py-8 md:py-0 overflow-y-auto w-full md:mt-24">
                            <p
                                className="text-lg md:text-xl font-medium leading-relaxed font-space tracking-tight"
                                style={{ fontFamily: 'var(--font-space), sans-serif' }}
                            >
                                {activeProject.description}
                            </p>
                        </div>

                        {/* Navigation Footer */}
                        <div className="w-full p-8 flex items-center justify-between border-t border-black md:border-t-0 mt-auto">
                            <button onClick={prevProject} className="hover:text-black/50 transition-colors">
                                <ArrowLeft size={48} strokeWidth={1} />
                            </button>

                            <div className="font-serif font-black text-5xl tracking-tighter" style={{ transform: 'scaleY(1.3)' }}>
                                {currentIndex + 1} / {projects.length}
                            </div>

                            <button onClick={nextProject} className="hover:text-black/50 transition-colors">
                                <ArrowRight size={48} strokeWidth={1} />
                            </button>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
}
