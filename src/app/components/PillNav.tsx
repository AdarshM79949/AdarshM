"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import LiquidGlass from "liquid-glass-react";

interface PillNavItem {
    label: string;
    href: string;
}

interface PillNavProps {
    logo?: string;
    logoAlt?: string;
    items: PillNavItem[];
    activeHref: string;
    className?: string;
    ease?: string;
    baseColor?: string;
    pillColor?: string;
    hoveredPillTextColor?: string;
    pillTextColor?: string;
    theme?: "light" | "dark";
    initialLoadAnimation?: boolean;
}

export default function PillNav({
    logo,
    logoAlt = "Logo",
    items,
    activeHref,
    className = "",
    ease = "power2.easeOut",
    baseColor = "#000000",
    pillColor = "#ffffff",
    hoveredPillTextColor = "#ffffff",
    pillTextColor = "#000000",
    theme = "light",
    initialLoadAnimation = false,
}: PillNavProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const isDark = theme === "dark";
    const navBg = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)";
    const navBorder = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)";

    return (
        <LiquidGlass
            displacementScale={30}
            blurAmount={0.05}
            saturation={140}
            elasticity={0.4}
            cornerRadius={32}
            style={{
                display: "inline-block",
                margin: "16px auto",
            }}
        >
            <nav
                className={`flex items-center gap-2 p-1.5 rounded-full ${className}`}
                style={{
                    background: navBg,
                    border: `1px solid ${navBorder}`,
                    backdropFilter: "blur(24px) saturate(1.5)",
                    boxShadow: isDark
                        ? "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)"
                        : "0 4px 24px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
                }}
            >
                {logo && (
                    <div className="pl-4 pr-2 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={logo} alt={logoAlt} className="h-6 w-auto" />
                    </div>
                )}

                {items.map((item, index) => {
                    const isActive = activeHref === item.href;
                    const isHovered = hoveredIndex === index;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                            style={{
                                color: isHovered || isActive ? hoveredPillTextColor : (isDark ? "rgba(255,255,255,0.7)" : pillTextColor),
                                zIndex: 10,
                            }}
                        >
                            {isHovered && !isActive && (
                                <motion.div
                                    layoutId="pillNavHover"
                                    className="absolute inset-0 rounded-full"
                                    style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", zIndex: -1 }}
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}

                            {isActive && (
                                <motion.div
                                    layoutId="pillNavActive"
                                    className="absolute inset-0 rounded-full"
                                    style={{ background: pillColor, zIndex: -1, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}

                            <span className="relative z-10">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </LiquidGlass>
    );
}
