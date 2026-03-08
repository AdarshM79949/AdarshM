"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

interface DockItem {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

interface DockProps {
    items: DockItem[];
    panelHeight?: number;
    baseItemSize?: number;
    magnification?: number;
    className?: string;
}

export default function Dock({
    items,
    panelHeight = 80,
    baseItemSize = 60,
    magnification = 80,
    className = "",
}: DockProps) {
    const mouseX = useMotionValue(Infinity);

    return (
        <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end gap-4 p-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl ${className}`}
            onMouseMove={(e) => mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            style={{ height: panelHeight }}
        >
            {items.map((item, index) => (
                <DockIcon
                    key={index}
                    mouseX={mouseX}
                    item={item}
                    baseSize={baseItemSize}
                    magnification={magnification}
                />
            ))}
        </div>
    );
}

function DockIcon({
    mouseX,
    item,
    baseSize,
    magnification,
}: {
    mouseX: any;
    item: DockItem;
    baseSize: number;
    magnification: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    // Calculate distance from mouse to the center of this icon
    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Calculate icon size based on distance
    const widthSync = useTransform(distance, [-150, 0, 150], [baseSize, magnification, baseSize]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <div className="relative flex items-end justify-center group h-full cursor-pointer">
            {/* Tooltip */}
            {hovered && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute -top-12 px-3 py-1.5 bg-black/80 border border-white/20 text-white text-xs rounded-md whitespace-nowrap z-50"
                >
                    {item.label}
                </motion.div>
            )}

            {/* Icon Container */}
            <motion.div
                ref={ref}
                style={{ width, height: width }}
                className="flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-lg group-hover:bg-white/10 group-active:bg-white/20 transition-colors"
                onClick={item.onClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="text-white">
                    {item.icon}
                </div>
            </motion.div>
        </div>
    );
}
