"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "motion/react";
import { useRouter } from "next/navigation";

interface ChromaItem {
    image?: string;
    icon?: React.ElementType; // Instead of image, support lucide icons
    title: string;
    subtitle: string;
    handle?: string;
    borderColor: string;
    gradient: string;
    url?: string;
}

interface ChromaGridProps {
    items: ChromaItem[];
    radius?: number;
    damping?: number;
    fadeOut?: number;
    ease?: string;
    className?: string;
}

export default function ChromaGrid({
    items,
    radius = 300,
    damping = 0.45,
    fadeOut = 0.6,
    ease = "power3.out",
    className = "",
}: ChromaGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Use raw mouse position for high performance, no smoothing
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative group ${className}`}
        >
            {items.map((item, index) => (
                <ChromaCard
                    key={index}
                    item={item}
                    mousePos={mousePos}
                    isHovering={isHovering}
                    radius={radius}
                    damping={damping}
                    fadeOut={fadeOut}
                />
            ))}
        </div>
    );
}

function ChromaCard({
    item,
    mousePos,
    isHovering,
    radius,
    damping,
    fadeOut,
}: {
    item: ChromaItem;
    mousePos: { x: number; y: number };
    isHovering: boolean;
    radius: number;
    damping: number;
    fadeOut: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardCenter, setCardCenter] = useState({ x: 0, y: 0 });
    const [distance, setDistance] = useState(1000);
    const router = useRouter();

    useEffect(() => {
        const updateCenter = () => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const parentRect = cardRef.current.parentElement?.getBoundingClientRect();

            if (parentRect) {
                setCardCenter({
                    x: rect.left - parentRect.left + rect.width / 2,
                    y: rect.top - parentRect.top + rect.height / 2,
                });
            }
        };

        updateCenter();
        window.addEventListener("resize", updateCenter);
        return () => window.removeEventListener("resize", updateCenter);
    }, []);

    useAnimationFrame(() => {
        if (!isHovering) {
            setDistance(1000);
            return;
        }

        const dx = mousePos.x - cardCenter.x;
        const dy = mousePos.y - cardCenter.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        setDistance(dist);
    });

    // Calculate effect intensity based on distance
    const intensity = isHovering ? Math.max(0, 1 - distance / radius) : 0;

    return (
        <motion.div
            ref={cardRef}
            onClick={() => item.url && router.push(item.url)}
            className="relative rounded-2xl overflow-hidden cursor-pointer h-full border border-white/5 bg-white/[0.02]"
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
                boxShadow: `0 8px 32px rgba(0,0,0,0.4)`
            }}
        >
            {/* Dynamic Background Glow */}
            <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
                style={{
                    opacity: intensity * fadeOut,
                    background: item.gradient,
                }}
            />

            {/* Border Highlight Effect */}
            <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                    boxShadow: `inset 0 0 0 1px ${item.borderColor}`,
                    opacity: intensity,
                }}
            />

            <div className="relative z-10 p-6 flex flex-col h-full bg-void-900/40 backdrop-blur-xl m-[1px] rounded-[15px]">
                {/* Header with image or icon */}
                <div className="flex items-center gap-4 mb-5">
                    {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 rounded-full object-cover border border-white/10"
                        />
                    ) : item.icon ? (
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10" style={{ background: `linear-gradient(135deg, ${item.borderColor}30, ${item.borderColor}10)` }}>
                            {/* @ts-ignore */}
                            <item.icon size={22} style={{ color: item.borderColor }} />
                        </div>
                    ) : null}

                    <div>
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                        {item.handle && <p className="text-white/40 text-xs font-mono">{item.handle}</p>}
                    </div>
                </div>

                {/* Content */}
                <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                    {item.subtitle}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span
                        className="text-xs font-mono transition-colors"
                        style={{ color: intensity > 0.1 ? item.borderColor : "rgba(255,255,255,0.4)" }}
                    >
                        View Details
                    </span>
                    <span
                        className="text-lg leading-none"
                        style={{
                            color: intensity > 0.1 ? item.borderColor : "rgba(255,255,255,0.2)",
                            transform: `translateX(${intensity * 4}px)`,
                            transition: "transform 0.2s ease-out, color 0.2s ease-out"
                        }}
                    >
                        →
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
