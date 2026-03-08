"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LiquidGlass from "liquid-glass-react";

interface MenuItem {
    label: string;
    ariaLabel: string;
    link: string;
}

interface SocialItem {
    label: string;
    link: string;
}

interface StaggeredMenuProps {
    position?: "left" | "right";
    items: MenuItem[];
    socialItems?: SocialItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    changeMenuColorOnOpen?: boolean;
    colors?: string[];
    logoUrl?: string;
    accentColor?: string;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
}

export default function StaggeredMenu({
    position = "right",
    items,
    socialItems = [],
    displaySocials = false,
    displayItemNumbering = true,
    menuButtonColor = "#ffffff",
    openMenuButtonColor = "#000000",
    changeMenuColorOnOpen = true,
    colors = ["#B19EEF", "#5227FF"],
    logoUrl,
    accentColor = "#5227FF",
    onMenuOpen,
    onMenuClose,
}: StaggeredMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        if (isOpen) {
            setIsOpen(false);
            onMenuClose?.();
        } else {
            setIsOpen(true);
            onMenuOpen?.();
        }
    };

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const buttonColor = isOpen && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor;

    return (
        <>
            {/* Menu Toggle Button */}
            <button
                onClick={toggleMenu}
                className={`fixed top-6 z-50 p-3 rounded-full overflow-hidden transition-all duration-300 ${position === "right" ? "right-6" : "left-6"
                    }`}
                style={{
                    color: buttonColor,
                    background: isOpen ? "transparent" : "rgba(255,255,255,0.05)",
                    border: isOpen ? "none" : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: isOpen ? "none" : "0 4px 12px rgba(0,0,0,0.2)",
                }}
                aria-label="Toggle Menu"
            >
                {!isOpen && (
                    <div className="absolute inset-0 pointer-events-none" style={{ backdropFilter: "blur(12px) saturate(1.5)" }} />
                )}
                <div className="relative z-10">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </button>

            {/* Fullscreen Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { delay: 0.3, duration: 0.4 } }}
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-auto"
                        style={{ background: "linear-gradient(135deg, #1a3a6e 0%, #3171C6 40%, #2563eb 70%, #1e40af 100%)" }}
                    >
                        {/* LiquidGlass geometric decors */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <LiquidGlass
                                displacementScale={100}
                                blurAmount={0.2}
                                saturation={110}
                                elasticity={0.5}
                                cornerRadius={50}
                                style={{ position: 'absolute', top: '-10%', right: '-5%', width: '50vw', height: '50vw', opacity: 0.15 }}
                            >
                                <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1] ?? colors[0]})` }} />
                            </LiquidGlass>
                            <LiquidGlass
                                displacementScale={80}
                                blurAmount={0.15}
                                saturation={100}
                                elasticity={0.4}
                                cornerRadius={100}
                                style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: '60vw', height: '60vw', opacity: 0.1 }}
                            >
                                <div className="w-full h-full" style={{ background: `linear-gradient(45deg, ${colors[1] ?? colors[0]}, ${colors[0]})` }} />
                            </LiquidGlass>
                        </div>

                        {/* Content Container */}
                        <div className="w-full max-w-4xl px-8 flex flex-col md:flex-row justify-between relative z-10 h-full py-32 md:py-0 md:items-center">

                            {/* Logo Box */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30, transition: { duration: 0.2 } }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mb-16 md:mb-0"
                            >
                                {logoUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={logoUrl} alt="Logo" className="h-12 w-auto mb-4" />
                                ) : (
                                    <div className="text-4xl font-mono font-bold mb-4" style={{ color: accentColor }}>AM_</div>
                                )}
                                <p className="text-white/40 text-sm max-w-xs font-sans">
                                    System Architecture & Full-stack Engineering
                                </p>
                            </motion.div>

                            {/* Navigation Links */}
                            <nav className="flex flex-col gap-6 md:text-right">
                                {items.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 30, rotateX: -15 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        exit={{ opacity: 0, y: -20, transition: { duration: 0.2, delay: index * 0.05 } }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: 0.15 + (index * 0.08)
                                        }}
                                    >
                                        <Link
                                            href={item.link}
                                            onClick={() => setIsOpen(false)}
                                            className="group flex items-center md:justify-end gap-6 text-4xl md:text-6xl font-bold tracking-tight"
                                            aria-label={item.ariaLabel}
                                        >
                                            {displayItemNumbering && position === "right" && (
                                                <span className="text-sm font-mono text-white/20 group-hover:text-white/40 mb-auto mt-2 transition-colors">
                                                    0{index + 1}
                                                </span>
                                            )}

                                            <span className="text-white/70 group-hover:text-white transition-colors duration-300">
                                                {item.label}
                                            </span>

                                            {displayItemNumbering && position === "left" && (
                                                <span className="text-sm font-mono text-white/20 group-hover:text-white/40 mb-auto mt-2 transition-colors">
                                                    0{index + 1}
                                                </span>
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </div>

                        {/* Social Links Footer */}
                        {displaySocials && socialItems.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="absolute bottom-10 left-0 w-full px-12 flex justify-between items-center z-10"
                            >
                                <div className="text-white/30 text-xs tracking-widest uppercase">
                                    Connect
                                </div>
                                <div className="flex gap-6">
                                    {socialItems.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/50 hover:text-white text-sm transition-colors"
                                        >
                                            {social.label}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
