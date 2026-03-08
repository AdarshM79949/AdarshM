"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useState } from "react";
import {
    ArrowLeft, Play, Code2, Github, Linkedin, Mail,
    Star, Award, Clock, Eye,
} from "lucide-react";

/* ── Images ── */
const HERO_BG = "https://images.unsplash.com/photo-1596729235333-ab2c2ecb5410?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2luZW1hJTIwZmlsbSUyMGVkaXRpbmclMjBjb2xvciUyMGdyYWRpbmclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcyOTY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const WORK_IMG_1 = "https://images.unsplash.com/photo-1730890754666-fbffee87d65b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRvciUyMHJlZWwlMjBjaW5lbWF0aWMlMjBzaG9ydCUyMGZpbG18ZW58MXx8fHwxNzcyOTY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const WORK_IMG_2 = "https://images.unsplash.com/photo-1637249833216-c8f15709e50a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBtb3Rpb24lMjBncmFwaGljcyUyMHJlZWx8ZW58MXx8fHwxNzcyOTY5ODU3fDA&ixlib=rb-4.1.0&q=80&w=1080";
const WORK_IMG_3 = "https://images.unsplash.com/photo-1527792931932-443873b57953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGNvbW1lcmNpYWwlMjBtdXNpYyUyMHZpZGVvJTIwZWRpdCUyMHBvcnRmb2xpb3xlbnwxfHx8fDE3NzI5Njk4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080";
const WORK_IMG_4 = "https://images.unsplash.com/photo-1684158759586-802e2b47e354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudGFyeSUyMHNob3J0JTIwZmlsbSUyMHBvcnRmb2xpbyUyMHByb2plY3R8ZW58MXx8fHwxNzcyOTY5ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080";

/* ─── Apple Glass Button component ─── */
interface AGBtnProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "default" | "primary" | "outline";
    className?: string;
}

function AppleGlassButton({ children, onClick, variant = "default", className = "" }: AGBtnProps) {
    const styles = {
        default: {
            background: "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)",
            backdropFilter: "blur(32px) saturate(2)",
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.1)",
        },
        primary: {
            background: "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 100%)",
            backdropFilter: "blur(40px) saturate(2)",
            border: "1px solid rgba(255,255,255,0.30)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.12)",
        },
        outline: {
            background: "transparent",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        },
    };

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className={`relative overflow-hidden rounded-xl cursor-pointer ${className}`}
            style={{ ...styles[variant] }}
        >
            {/* Specular top edge */}
            <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.55) 60%, transparent 95%)" }}
            />
            {children}
        </motion.button>
    );
}

/* ─── Work items ─── */
const WORKS = [
    {
        id: 1, title: "Social Media Edits", category: "Short-form", duration: "< 1 min",
        views: "10K+", img: WORK_IMG_1,
        tools: ["Premiere Pro", "After Effects"],
        desc: "Fast-paced, beat-synced edits designed for Instagram Reels and YouTube Shorts with dynamic transitions.",
    },
    {
        id: 2, title: "Motion Graphics Sequences", category: "Motion Design", duration: "1-2 min",
        views: "5K+", img: WORK_IMG_2,
        tools: ["After Effects"],
        desc: "Animated titles, logos, and visual effects enhancements creating engaging motion sequences.",
    },
    {
        id: 3, title: "Cinematic Edits", category: "Cinematic", duration: "3 min",
        views: "8K+", img: WORK_IMG_3,
        tools: ["Premiere Pro", "After Effects"],
        desc: "Cinematic-style edits focusing on dramatic pacing, storytelling, and smooth visual transitions.",
    },
];

/* ─── Skills ─── */
const SKILLS = [
    { name: "After Effects", level: 85 },
    { name: "Premiere Pro", level: 80 },
    { name: "Photoshop", level: 60 },
    { name: "Media Encoder", level: 75 },
];

/* ─── Stats ─── */
const STATS = [
    { icon: Star, value: "Creative", label: "Edits" },
    { icon: Eye, value: "Social", label: "Media" },
    { icon: Award, value: "VFX", label: "Motion" },
    { icon: Clock, value: "1+ yr", label: "Experience" },
];

export default function EditorPortfolio() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("All");
    const filters = ["All", "Short-form", "Motion Design", "Cinematic"];

    const filtered = activeFilter === "All" ? WORKS : WORKS.filter((w) => w.category === activeFilter);

    return (
        <div
            className="min-h-screen"
            style={{
                backgroundColor: "#2D2D2D",
                color: "#F4F3F1",
            }}
        >
            {/* ══════════ HERO ══════════ */}
            <section className="relative min-h-screen flex flex-col overflow-hidden">
                {/* BG image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${HERO_BG})` }}
                />
                <div className="absolute inset-0" style={{
                    background: "linear-gradient(to bottom, rgba(8,8,16,0.55) 0%, rgba(8,8,16,0.4) 40%, rgba(8,8,16,0.85) 85%, #080810 100%)"
                }} />

                {/* Nav bar */}
                <div className="relative z-20 flex items-center justify-between pl-6 pr-24 py-5">
                    {/* Back — Apple glass button */}
                    <AppleGlassButton onClick={() => router.push("/")} variant="default" className="flex items-center gap-2 px-3 py-2 text-white/75 text-sm">
                        <ArrowLeft size={14} />
                        <span>Home</span>
                    </AppleGlassButton>

                    <div className="flex items-center gap-2">
                        {/* Switch to backend — Apple glass */}
                        <AppleGlassButton onClick={() => router.push("/about")} variant="default" className="flex items-center gap-2 px-3 py-2 text-white/60 text-sm">
                            <Code2 size={14} />
                            <span>About me</span>
                        </AppleGlassButton>
                    </div>
                </div>

                {/* Hero text */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-4">Video Editor & Motion Designer</p>
                        <h1
                            className="text-white mb-5 font-bold tracking-tight"
                            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.05 }}
                        >
                            Adarsh M<br />
                            <span style={{ color: "rgba(255,255,255,0.45)" }}>Video Portfolio</span>
                        </h1>
                        <p className="text-white/45 text-base max-w-md mx-auto mb-10 leading-relaxed font-sans">
                            Video editor and motion graphics enthusiast specializing in cinematic content and engaging social media edits.
                        </p>

                        {/* CTA buttons — Apple glass */}
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <AppleGlassButton variant="primary" className="flex items-center gap-2.5 px-6 py-3 text-white">
                                <Play size={15} fill="white" />
                                <span style={{ fontWeight: 500 }}>Watch Reel</span>
                            </AppleGlassButton>
                            <AppleGlassButton variant="outline" className="flex items-center gap-2 px-6 py-3 text-white/70">
                                <span>View Work</span>
                            </AppleGlassButton>
                        </div>
                    </motion.div>
                </div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative z-10 mx-6 mb-8 rounded-2xl px-2 py-4 grid grid-cols-4"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)",
                        backdropFilter: "blur(40px) saturate(1.8)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        boxShadow: "0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                >
                    {STATS.map(({ icon: Icon, value, label }) => (
                        <div key={label} className="flex flex-col items-center gap-1 py-1">
                            <Icon size={14} className="text-white/40 mb-0.5" />
                            <span className="text-white" style={{ fontSize: "1.3rem", fontWeight: 700, lineHeight: 1 }}>{value}</span>
                            <span className="text-white/40 text-xs">{label}</span>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* ══════════ WORK ══════════ */}
            <section className="px-6 py-20 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-2">Selected Work</p>
                    <h2 className="text-white font-bold mb-6" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
                        Recent Projects
                    </h2>

                    {/* Filter pills — Apple glass */}
                    <div className="flex flex-wrap gap-2">
                        {filters.map((f) => (
                            <AppleGlassButton
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                variant={activeFilter === f ? "primary" : "outline"}
                                className="px-4 py-1.5 text-sm"
                            >
                                <span className={activeFilter === f ? "text-white" : "text-white/50"}>{f}</span>
                            </AppleGlassButton>
                        ))}
                    </div>
                </motion.div>

                {/* Works grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filtered.map((work, i) => (
                        <motion.div
                            key={work.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.08 }}
                        >
                            <WorkCard work={work} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══════════ SKILLS ══════════ */}
            <section className="px-6 py-20 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-2">Expertise</p>
                    <h2 className="text-white font-bold" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
                        Tools & Skills
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SKILLS.map((skill, i) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.07 }}
                            className="rounded-xl p-4"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.07)",
                            }}
                        >
                            <div className="flex justify-between mb-2.5">
                                <span className="text-white/80 text-sm">{skill.name}</span>
                                <span className="text-white/35 text-sm">{skill.level}%</span>
                            </div>
                            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 + i * 0.06, ease: "easeOut" }}
                                    className="h-full rounded-full"
                                    style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3))" }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══════════ CONTACT ══════════ */}
            <section className="px-6 py-20 max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-2">Get In Touch</p>
                    <h2 className="text-white font-bold mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
                        Let's Work Together
                    </h2>
                    <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto leading-relaxed font-sans">
                        Looking to collaborate on a film, commercial, or creative project? I'm open to new opportunities.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        <AppleGlassButton variant="primary" className="flex items-center gap-2 px-6 py-3 text-white" onClick={() => window.location.href = "mailto:adarshm80517@gmail.com"}>
                            <Mail size={15} />
                            <span style={{ fontWeight: 500 }}>adarshm80517@gmail.com</span>
                        </AppleGlassButton>
                        <AppleGlassButton variant="default" className="flex items-center gap-2 px-5 py-3 text-white/70" onClick={() => window.open('https://github.com/AdarshM79949', '_blank')}>
                            <Github size={15} />
                        </AppleGlassButton>
                        <AppleGlassButton variant="default" className="flex items-center gap-2 px-5 py-3 text-white/70" onClick={() => window.open('https://www.linkedin.com/in/adarsh-m-b52ab13b5', '_blank')}>
                            <Linkedin size={15} />
                        </AppleGlassButton>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer
                className="text-center py-8 text-white/20 text-xs border-t"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
                © 2026 Adarsh M · Video Editor Portfolio
            </footer>
        </div>
    );
}

/* ─── Work Card ─── */
function WorkCard({ work }: { work: typeof WORKS[0] }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer"
            style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            {/* Thumbnail */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={work.img}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Play button — Apple glass */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{
                            background: "linear-gradient(145deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)",
                            backdropFilter: "blur(24px)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
                        }}
                    >
                        <Play size={20} className="text-white ml-0.5" fill="white" />
                    </div>
                </motion.div>

                {/* Duration badge */}
                <div
                    className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg text-white/80 text-xs"
                    style={{
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    {work.duration}
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <span
                            className="inline-block px-2 py-0.5 rounded-md text-xs mb-1.5"
                            style={{
                                background: "rgba(255,255,255,0.08)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.5)",
                            }}
                        >
                            {work.category}
                        </span>
                        <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>{work.title}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-white/30 text-xs shrink-0">
                        <Eye size={11} />
                        {work.views}
                    </div>
                </div>
                <p className="text-white/40 text-xs leading-relaxed mb-3">{work.desc}</p>
                <div className="flex gap-1.5">
                    {work.tools.map((t) => (
                        <span key={t} className="text-xs text-white/35 px-2 py-0.5 rounded"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
