"use client";

import React, { useMemo, useRef, useState, useEffect } from 'react';

// --- Type definition for SVG path strings (simplified) ---
// Just a helper to keep things tidy
const createPath = (width: number, height: number, cpPrc: number) => {
    return `M 0 0 Q ${width / 2} ${height * cpPrc} ${width} 0`;
};

interface GooeyNavItem {
    label: string;
    href: string;
}

interface GooeyNavProps {
    items?: GooeyNavItem[];
    particleCount?: number;
    particleDistances?: number[];
    particleR?: number;
    initialActiveIndex?: number;
    animationTime?: number;
    timeVariance?: number;
    colors?: (number | null)[];
}

export default function GooeyNav({
    items = [
        { label: "Home", href: "#" },
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
    ],
    particleCount = 15,
    particleDistances = [90, 10],
    particleR = 100,
    initialActiveIndex = 0,
    animationTime = 600,
    timeVariance = 300,
    colors = [1, 2, 3, 1, 2, 3, 1, 4]
}: GooeyNavProps) {
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

    // Animation state
    const navRef = useRef<HTMLDivElement>(null);
    const [particles, setParticles] = useState<any[]>([]);
    const [controlPoint, setControlPoint] = useState(0);

    // SVG dimensions
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const vh = typeof window !== 'undefined' ? Math.max(window.innerHeight / 2, 400) : 400;

    // Generate particles based on config
    useEffect(() => {
        if (!navRef.current) return;

        const newParticles = [];
        for (let i = 0; i < particleCount; i++) {
            // Randomize
            const r = Math.random() * particleR;
            const dist = particleDistances[Math.floor(Math.random() * particleDistances.length)];
            const dur = animationTime + Math.random() * timeVariance;
            const cx = 50 + (Math.random() * 40 - 20); // Center around 50%

            newParticles.push({
                id: i,
                r,
                dur,
                colorIndex: colors[i % colors.length] || 1,
                startX: `${cx}%`,
                endX: `${cx}%`, // Simple straight down for now
                endY: dist,
                delay: Math.random() * 200,
            });
        }
        setParticles(newParticles);
    }, [particleCount, particleDistances, particleR, animationTime, timeVariance, colors]);

    const handleClick = (index: number) => {
        setActiveIndex(index);

        // Simulate gooey animation
        setControlPoint(0.5);
        setTimeout(() => setControlPoint(0), animationTime);
    };

    return (
        <div className="relative w-full h-[150px] overflow-visible">
            {/* SVG Filters for gooey effect */}
            <svg className="absolute w-0 h-0 hidden">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <nav ref={navRef} className="absolute inset-x-0 top-0 flex items-center justify-center h-[60px] bg-[#060010] z-20" style={{ filter: "url(#goo)" }}>
                <ul className="flex items-center gap-12 m-0 p-0 list-none text-white relative z-10">
                    {items.map((item, i) => (
                        <li key={i} className="relative z-10 view-cursor">
                            <a
                                href={item.href}
                                onClick={(e) => { e.preventDefault(); handleClick(i); }}
                                className={`text-lg font-bold transition-all duration-300 ${activeIndex === i ? 'text-neon-green opacity-100' : 'text-white/60 opacity-60 hover:opacity-100'}`}
                            >
                                {item.label}
                            </a>

                            {/* Active Indicator dot */}
                            {activeIndex === i && (
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neon-green" />
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Gooey Drip Surface */}
            <div className="absolute top-[60px] left-0 w-full h-full pointer-events-none" style={{ filter: "url(#goo)" }}>
                <svg width="100%" height="100%" viewBox={`0 0 ${vw} ${vh}`} preserveAspectRatio="none">
                    <path
                        d={createPath(vw, vh, controlPoint)}
                        fill="#060010"
                        style={{ transition: `d ${animationTime}ms cubic-bezier(0.4, 0, 0.2, 1)` }}
                    />
                </svg>

                {/* Particles bouncing */}
                <div className="absolute top-0 w-full flex justify-center pointer-events-none pb-[100px]">
                    {particles.map(p => (
                        <div
                            key={p.id}
                            className="absolute rounded-full bg-[#060010]"
                            style={{
                                width: p.r,
                                height: p.r,
                                left: p.startX,
                                top: 0,
                                transform: `translate(-50%, ${controlPoint > 0 ? p.endY : 0}px)`,
                                transition: `transform ${p.dur}ms cubic-bezier(0.175, 0.885, 0.32, 1.275) ${p.delay}ms`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
