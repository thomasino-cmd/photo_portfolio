'use client';

import { useEffect, useRef, useState } from 'react';

export default function EasterEgg() {
    const maskRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = /Mobi|Android/i.test(navigator.userAgent);
        setIsMobile(checkMobile);

        const handleMouseMove = (e: MouseEvent) => {
            if (!isMobile && maskRef.current) {
                maskRef.current.style.setProperty('--x', `${e.clientX}px`);
                maskRef.current.style.setProperty('--y', `${e.clientY}px`);
            }
        };

        const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
            if (isMobile && maskRef.current) {
                const gamma = e.gamma || 0; // Inclinazione Destra/Sinistra (-90 to 90)
                let beta = e.beta || 0;   // Inclinazione Avanti/Dietro (-180 to 180)
                // Adjust beta if clamped incorrectly
                if (beta > 90) beta = 90;
                if (beta < -90) beta = -90;

                const x = window.innerWidth / 2 + (gamma / 90) * (window.innerWidth / 1.5);
                const y = window.innerHeight / 2 + (beta / 90) * (window.innerHeight / 1.5);

                maskRef.current.style.setProperty('--x', `${Math.max(0, Math.min(window.innerWidth, x))}px`);
                maskRef.current.style.setProperty('--y', `${Math.max(0, Math.min(window.innerHeight, y))}px`);
            }
        };

        if (checkMobile) {
            window.addEventListener('deviceorientation', handleDeviceOrientation as any);
        } else {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (checkMobile) {
                window.removeEventListener('deviceorientation', handleDeviceOrientation as any);
            } else {
                window.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [isMobile]);

    return (
        <div
            ref={maskRef}
            className="pointer-events-none fixed inset-0 z-40 opacity-[0.03] mix-blend-overlay"
            style={{
                background: 'radial-gradient(circle 400px at var(--x, 50%) var(--y, 50%), rgba(255,255,255,1), transparent)',
                transition: isMobile ? 'background 0.1s ease-out' : 'none'
            }}
        />
    );
}
