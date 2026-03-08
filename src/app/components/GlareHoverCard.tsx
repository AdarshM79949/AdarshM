"use client";

import React, { useRef } from 'react';

interface GlareHoverCardProps {
    children: React.ReactNode;
    className?: string;
}

const GlareHoverCard: React.FC<GlareHoverCardProps> = ({ children, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        ref.current.style.setProperty('--tx', `${x}%`);
        ref.current.style.setProperty('--ty', `${y}%`);
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.setProperty('--tx', '50%');
        ref.current.style.setProperty('--ty', '50%');
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden group ${className}`}
            style={{
                '--tx': '50%',
                '--ty': '50%',
            } as React.CSSProperties}
        >
            <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: 'radial-gradient(circle at var(--tx) var(--ty), rgba(255,255,255,0.15) 0%, transparent 40%, transparent 100%)',
                }}
            />
            {children}
        </div>
    );
};

export default GlareHoverCard;
