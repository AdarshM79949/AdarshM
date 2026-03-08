"use client";

import React from "react";
import { AppleGlassButton } from "../components/GlassComponents";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import StaggeredMenu from "../components/StaggeredMenu";

export default function AboutPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: "#F4F3F1", color: "#2D2D2D" }}>
            <StaggeredMenu
                position="right"
                items={[
                    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
                    { label: 'Video Editor', ariaLabel: 'View video editor', link: '/editor' }
                ]}
                displayItemNumbering={true}
                menuButtonColor="#2D2D2D"
            />

            <nav className="fixed top-0 inset-x-0 z-50 p-6 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto">
                    <AppleGlassButton onClick={() => router.push("/")} className="px-4 py-2 flex items-center gap-2">
                        <ArrowLeft size={16} style={{ color: "#2D2D2D99" }} />
                        <span className="text-sm font-medium" style={{ color: "#2D2D2D99" }}>Back</span>
                    </AppleGlassButton>
                </div>
            </nav>

            {/* Ambient glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #3171C6, transparent)" }} />

            <div className="relative z-10 text-center max-w-2xl px-6">
                <h1 className="text-6xl font-bold mb-6 tracking-tight">Adarsh M</h1>
                <p className="text-xl leading-relaxed font-light" style={{ color: "#2D2D2D99" }}>
                    B.Tech AI & ML Student | System Design & Backend Enthusiast | Video Editor
                </p>
                <p className="mt-6 text-sm leading-relaxed" style={{ color: "#2D2D2D80" }}>
                    AI & Machine Learning student at MGM College, Kerala (KTU). Passionate about system design, backend engineering with Go, and building developer productivity tools.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-8">
                    {["Go", "System Design", "Backend Dev", "HTML/CSS/JS", "Git", "Linux"].map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full text-xs" style={{ color: "#2D2D2D99", border: "1px solid rgba(45,45,45,0.15)", backgroundColor: "rgba(45,45,45,0.05)" }}>{tag}</span>
                    ))}
                </div>
            </div>
        </main>
    );
}
