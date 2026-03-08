"use client";

import React from "react";
import { motion } from "motion/react";
import LiquidGlass from "liquid-glass-react";

/* ─── Apple Glass Card ─── */
export function AppleGlassCard({ children, className = "", style = {} }: { children: React.ReactNode, className?: string, style?: any }) {
    return (
        <LiquidGlass
            displacementScale={50}
            blurAmount={0.06}
            saturation={130}
            elasticity={0.3}
            cornerRadius={16}
            style={{ width: "100%", height: "100%", display: "block" }}
        >
            <div
                className={`relative overflow-hidden w-full h-full ${className}`}
                style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    ...style
                }}
            >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                {children}
            </div>
        </LiquidGlass>
    );
}

/* ─── Apple Glass Button ─── */
export function AppleGlassButton({ children, onClick, className = "", style, active = false }: { children: React.ReactNode, onClick?: () => void, className?: string, style?: React.CSSProperties, active?: boolean }) {
    return (
        <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
        >
            <LiquidGlass
                displacementScale={30}
                blurAmount={0.04}
                saturation={120}
                elasticity={0.4}
                cornerRadius={12}
            >
                <div
                    onClick={onClick}
                    className={`relative overflow-hidden cursor-pointer h-full ${className}`}
                    style={{
                        background: active
                            ? "linear-gradient(145deg, rgba(0,255,148,0.2) 0%, rgba(0,255,148,0.05) 100%)"
                            : "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                        border: active ? "1px solid rgba(0,255,148,0.3)" : "1px solid rgba(255,255,255,0.15)",
                        ...style,
                    }}
                >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                    {children}
                </div>
            </LiquidGlass>
        </motion.div>
    );
}
