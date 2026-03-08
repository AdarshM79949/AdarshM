"use client";

import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import {
    Terminal, Database, Globe, Layers, Code2, ArrowLeft, ArrowRight,
    Github, Linkedin, Mail, MapPin, ExternalLink, Cpu, Sparkles,
    GitBranch, Monitor, Send, ChevronDown, Star
} from "lucide-react";
import StaggeredMenu from "../components/StaggeredMenu";
import GlassIcons from "../components/GlassIcons";
import SplashCursor from "../components/SplashCursor";
import Magnet from "../components/Magnet";
import FadeContent from "../components/FadeContent";
import SplitText from "../components/SplitText";
import StarBorder from "../components/StarBorder";
import TiltedCard from "../components/TiltedCard";
import DecryptedText from "../components/DecryptedText";
import GlareHoverCard from "../components/GlareHoverCard";
import ShinyText from "../components/ShinyText";
import TrueFocus from "../components/TrueFocus";

/* ═══════════════════════════════════════════════════════════════
   UTILITY: Animated counter
   ═══════════════════════════════════════════════════════════════ */
function CountUp({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const startTime = performance.now();
                    const animate = (now: number) => {
                        const elapsed = (now - startTime) / 1000;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.round(eased * end));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   UTILITY: Scroll-triggered fade in
   ═══════════════════════════════════════════════════════════════ */
function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   UTILITY: Typing text
   ═══════════════════════════════════════════════════════════════ */
function TypingText({ texts, className = "" }: { texts: string[]; className?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = texts[currentIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setDisplayText(current.slice(0, displayText.length + 1));
                if (displayText.length === current.length) {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                setDisplayText(current.slice(0, displayText.length - 1));
                if (displayText.length === 0) {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? 40 : 80);
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentIndex, texts]);

    return (
        <span className={className}>
            {displayText}
            <span className="animate-pulse">|</span>
        </span>
    );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION: Hero
   ═══════════════════════════════════════════════════════════════ */
function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated grid bg */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(rgba(49,113,198,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(49,113,198,0.06) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F4F3F1]/50 to-[#F4F3F1]" />
            </div>

            {/* Floating code snippets */}
            <div className="absolute top-24 left-10 font-mono text-sm pointer-events-none" style={{ color: "#3171C660" }}>
                <DecryptedText text="<Developer />" speed={80} maxIterations={10} animateOn="hover" />
            </div>
            <div className="absolute top-44 right-20 font-mono text-xs pointer-events-none" style={{ color: "#3171C650" }}>
                <DecryptedText text="func main() {}" speed={100} maxIterations={12} animateOn="hover" />
            </div>
            <div className="absolute bottom-40 left-20 font-mono text-sm pointer-events-none" style={{ color: "#3171C640" }}>
                <DecryptedText text="go build -o app" speed={60} maxIterations={15} animateOn="hover" />
            </div>
            <div className="absolute bottom-24 right-10 font-mono text-xs pointer-events-none" style={{ color: "#3171C650" }}>
                <DecryptedText text="System.Design()" speed={90} maxIterations={10} animateOn="hover" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
                    style={{ backgroundColor: "rgba(49,113,198,0.08)", borderColor: "rgba(49,113,198,0.2)" }}
                >
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#3171C6" }} />
                    <span className="text-sm font-mono" style={{ color: "#3171C6" }}>Hello, World!</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="flex flex-col items-center mb-6"
                >
                    <div className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight flex flex-wrap justify-center items-center gap-x-4 gap-y-2" style={{ color: "#1a1a1a" }}>
                        <SplitText text="I'm" delay={60} animationFrom={{ opacity: 0, transform: 'translate3d(0,30px,0)' }} animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }} easing="easeOutExpo" />
                        <ShinyText
                            text="Adarsh M"
                            className="whitespace-nowrap"
                            speed={3}
                            color="#3171C6"
                            shineColor="#4a90d9"
                            spread={120}
                            direction="left"
                            yoyo={true}
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl sm:text-2xl mb-8 font-light"
                    style={{ color: "#555" }}
                >
                    <TypingText
                        texts={["Go Developer", "System Design Enthusiast", "AI & ML Student", "Backend Engineer"]}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Magnet padding={50} disabled={false} magnetStrength={3}>
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(49,113,198,0.4)]"
                            style={{ backgroundColor: "#3171C6" }}
                        >
                            <Code2 size={20} />
                            View My Work
                        </a>
                    </Magnet>
                    <Magnet padding={50} disabled={false} magnetStrength={3}>
                        <StarBorder as="div" color="#3171C6" speed="4s" className="inline-block p-0">
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:bg-[rgba(49,113,198,0.05)] w-full relative z-10 bg-white"
                                style={{ border: "1px solid rgba(49,113,198,0.1)", color: "#2D2D2D" }}
                            >
                                <Send size={20} />
                                Get In Touch
                            </a>
                        </StarBorder>
                    </Magnet>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <ChevronDown size={24} style={{ color: "#aaa" }} />
            </motion.div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION: About
   ═══════════════════════════════════════════════════════════════ */
function AboutSection() {
    const interests = [
        { icon: <Layers size={18} />, label: "System Design" },
        { icon: <Database size={18} />, label: "Backend Development" },
        { icon: <Globe size={18} />, label: "Web Development" },
        { icon: <Terminal size={18} />, label: "Developer Tools" },
        { icon: <Sparkles size={18} />, label: "AI Applications" },
    ];

    return (
        <section id="about" className="relative py-24 overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #3171C6, transparent)" }} />

            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <FadeContent blur={true} duration={800} initialOpacity={0} threshold={0.2} delay={100}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                                style={{ backgroundColor: "rgba(49,113,198,0.08)", borderColor: "rgba(49,113,198,0.2)" }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#3171C6" }} />
                                <span className="text-sm font-mono" style={{ color: "#3171C6" }}>About Me</span>
                            </div>
                        </FadeContent>

                        <FadeContent blur={true} duration={800} initialOpacity={0} threshold={0.2} delay={200}>
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6 flex flex-wrap gap-2" style={{ color: "#1a1a1a" }}>
                                Building the <TrueFocus sentence="Future" manualMode={false} blurAmount={4} borderColor="#3171C6" glowColor="rgba(49, 113, 198, 0.6)" animationDuration={0.8} pauseBetweenAnimations={2} /> with Code
                            </h2>
                        </FadeContent>

                        <ScrollReveal delay={0.2}>
                            <div className="space-y-4 leading-relaxed" style={{ color: "#555" }}>
                                <p>
                                    I'm an AI and Machine Learning engineering student at{" "}
                                    <span className="font-medium" style={{ color: "#1a1a1a" }}>MGM College, Kerala</span>,
                                    under APJ Abdul Kalam Technological University (KTU).
                                </p>
                                <p>
                                    My passion lies in <span style={{ color: "#3171C6" }}>system design</span>,{" "}
                                    <span style={{ color: "#3171C6" }}>backend engineering</span>, and building tools
                                    that help developers work more efficiently. Go (Golang) is my primary programming language.
                                </p>
                                <p>
                                    Through projects, hackathons, and self-learning, I continuously work to improve my
                                    technical and problem-solving skills.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3}>
                            <div className="mt-8">
                                <h3 className="font-semibold mb-4" style={{ color: "#1a1a1a" }}>Areas of Interest</h3>
                                <div className="flex flex-wrap gap-3">
                                    {interests.map((interest, i) => (
                                        <Magnet padding={20} magnetStrength={3} key={i}>
                                            <motion.div
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg border cursor-default transition-colors"
                                                style={{
                                                    backgroundColor: "rgba(49,113,198,0.04)",
                                                    borderColor: "rgba(49,113,198,0.15)",
                                                    color: "#555",
                                                }}
                                            >
                                                <span style={{ color: "#3171C6" }}>{interest.icon}</span>
                                                <span className="text-sm">{interest.label}</span>
                                            </motion.div>
                                        </Magnet>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Code editor visual */}
                    <ScrollReveal delay={0.2}>
                        <div className="relative">
                            <div className="rounded-2xl overflow-hidden border"
                                style={{ backgroundColor: "#1a1a2e", borderColor: "rgba(255,255,255,0.08)" }}>
                                {/* Window controls */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    <span className="ml-3 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>main.go</span>
                                </div>

                                {/* Code content */}
                                <div className="p-5 font-mono text-sm leading-relaxed space-y-0.5 overflow-x-auto">
                                    <div><span className="text-purple-400">type</span> <span className="text-yellow-400">Developer</span> <span className="text-purple-400">struct</span> <span className="text-white">{"{"}</span></div>
                                    <div className="pl-4"><span className="text-blue-400">Name</span>   <span className="text-white">string</span></div>
                                    <div className="pl-4"><span className="text-blue-400">Role</span>   <span className="text-white">string</span></div>
                                    <div className="pl-4"><span className="text-blue-400">Skills</span> <span className="text-white">[]</span><span className="text-yellow-400">Skill</span></div>
                                    <div className="text-white">{"}"}</div>
                                    <div className="mt-3"><span className="text-purple-400">func</span> <span className="text-yellow-400">main</span><span className="text-white">() {"{"}</span></div>
                                    <div className="pl-4"><span className="text-white">adarsh :=</span> <span className="text-yellow-400">Developer</span><span className="text-white">{"{"}</span></div>
                                    <div className="pl-8"><span className="text-blue-400">Name:</span> <span className="text-green-400">"Adarsh M"</span><span className="text-white">,</span></div>
                                    <div className="pl-8"><span className="text-blue-400">Role:</span> <span className="text-green-400">"Go Developer"</span><span className="text-white">,</span></div>
                                    <div className="pl-8"><span className="text-blue-400">Skills:</span> <span className="text-white">[]</span><span className="text-yellow-400">Skill</span><span className="text-white">{"{"}</span></div>
                                    <div className="pl-12"><span className="text-green-400">"System Design"</span><span className="text-white">,</span></div>
                                    <div className="pl-12"><span className="text-green-400">"Backend"</span><span className="text-white">,</span></div>
                                    <div className="pl-12"><span className="text-green-400">"Go"</span><span className="text-white">,</span></div>
                                    <div className="pl-8"><span className="text-white">{"}"},</span></div>
                                    <div className="pl-4"><span className="text-white">{"}"}</span></div>
                                    <div className="pl-4"><span className="text-white">adarsh.</span><span className="text-yellow-400">BuildAwesomeSystems</span><span className="text-white">()</span></div>
                                    <div className="text-white">{"}"}</div>
                                </div>
                            </div>
                            {/* Glow */}
                            <div className="absolute -inset-4 rounded-2xl blur-2xl -z-10 opacity-20" style={{ backgroundColor: "#3171C6" }} />
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION: Skills
   ═══════════════════════════════════════════════════════════════ */
function SkillBar({ name, level, icon, delay = 0 }: { name: string; level: number; icon: React.ReactNode; delay?: number }) {
    return (
        <ScrollReveal delay={delay}>
            <div className="group">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 group-hover:text-[#3171C6] transition-colors" style={{ color: "#555" }}>
                        {icon}
                        <span className="text-sm font-medium">{name}</span>
                    </div>
                    <span className="text-xs font-mono" style={{ color: "#999" }}>{level}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(49,113,198,0.08)" }}>
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #3171C6, #4a90d9)" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </div>
        </ScrollReveal>
    );
}

function SkillsSection() {
    const skillCategories = [
        {
            title: "Programming Languages",
            skills: [
                { name: "Go", level: 90, icon: <Terminal size={16} /> },
                { name: "HTML", level: 85, icon: <Code2 size={16} /> },
                { name: "CSS", level: 80, icon: <Layers size={16} /> },
                { name: "JavaScript", level: 75, icon: <Sparkles size={16} /> },
            ],
        },
        {
            title: "Tools & Technologies",
            skills: [
                { name: "Git", level: 85, icon: <GitBranch size={16} /> },
                { name: "GitHub", level: 85, icon: <Github size={16} /> },
                { name: "Linux", level: 70, icon: <Monitor size={16} /> },
                { name: "VS Code", level: 90, icon: <Code2 size={16} /> },
            ],
        },
        {
            title: "Concepts & Areas",
            skills: [
                { name: "System Design", level: 75, icon: <Database size={16} /> },
                { name: "Backend Dev", level: 80, icon: <Cpu size={16} /> },
                { name: "Web Development", level: 78, icon: <Globe size={16} /> },
                { name: "Developer Tools", level: 70, icon: <Terminal size={16} /> },
            ],
        },
    ];

    return (
        <section id="skills" className="relative py-24 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #3171C6, transparent)" }} />

            <div className="max-w-6xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                            style={{ backgroundColor: "rgba(49,113,198,0.08)", borderColor: "rgba(49,113,198,0.2)" }}>
                            <Cpu size={16} style={{ color: "#3171C6" }} />
                            <span className="text-sm font-mono" style={{ color: "#3171C6" }}>Skills & Expertise</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "#1a1a1a" }}>
                            Tech <span style={{ color: "#3171C6" }}>Stack</span>
                        </h2>
                        <p style={{ color: "#888" }} className="max-w-2xl mx-auto">
                            Technologies and tools I work with to build scalable and efficient systems.
                        </p>
                    </div>
                </ScrollReveal>

                {/* GlassIcons showcase */}
                <ScrollReveal delay={0.15}>
                    <div className="flex justify-center mb-16">
                        <GlassIcons
                            items={[
                                { icon: <Terminal size={24} />, color: "blue", label: "Go" },
                                { icon: <Database size={24} />, color: "purple", label: "System Design" },
                                { icon: <GitBranch size={24} />, color: "green", label: "Git" },
                                { icon: <Monitor size={24} />, color: "orange", label: "Linux" },
                                { icon: <Globe size={24} />, color: "indigo", label: "Web Dev" },
                                { icon: <Cpu size={24} />, color: "red", label: "Backend" },
                            ]}
                            className="max-w-xl"
                        />
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, catIndex) => (
                        <ScrollReveal key={catIndex} delay={catIndex * 0.1}>
                            <div
                                className="rounded-2xl p-6 border transition-colors hover:border-[#3171C6]/30"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.6)",
                                    backdropFilter: "blur(20px)",
                                    borderColor: "rgba(0,0,0,0.06)",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                                }}
                            >
                                <h3 className="font-semibold text-lg mb-6 flex items-center gap-2" style={{ color: "#1a1a1a" }}>
                                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                                        style={{ backgroundColor: "rgba(49,113,198,0.12)", color: "#3171C6" }}>
                                        {catIndex + 1}
                                    </span>
                                    {category.title}
                                </h3>
                                <div className="space-y-5">
                                    {category.skills.map((skill, skillIndex) => (
                                        <SkillBar
                                            key={skillIndex}
                                            name={skill.name}
                                            level={skill.level}
                                            icon={skill.icon}
                                            delay={catIndex * 0.1 + skillIndex * 0.05}
                                        />
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION: Projects
   ═══════════════════════════════════════════════════════════════ */
function ProjectsSection() {
    return (
        <section id="projects" className="relative py-24 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[160px] opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #3171C6, transparent)" }} />

            <div className="max-w-6xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                            style={{ backgroundColor: "rgba(49,113,198,0.08)", borderColor: "rgba(49,113,198,0.2)" }}>
                            <Layers size={16} style={{ color: "#3171C6" }} />
                            <span className="text-sm font-mono" style={{ color: "#3171C6" }}>Projects</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "#1a1a1a" }}>
                            Featured <span style={{ color: "#3171C6" }}>Work</span>
                        </h2>
                        <p style={{ color: "#888" }} className="max-w-2xl mx-auto">
                            Projects I've built to solve real-world problems and enhance developer productivity.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Vermos Project Card */}
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="rounded-2xl overflow-hidden border"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.7)",
                                backdropFilter: "blur(20px)",
                                borderColor: "rgba(0,0,0,0.06)",
                                boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
                            }}
                        >
                            {/* Project header hover card */}
                            <TiltedCard
                                imageSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop"
                                altText="Vermos Project Snippet"
                                containerHeight="224px" // h-56 equiv
                                containerWidth="100%"
                                imageHeight="100%"
                                imageWidth="100%"
                                rotateAmplitude={12}
                                scaleOnHover={1.02}
                                showTooltip={false}
                                displayOverlayContent={true}
                                overlayContent={
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                        <div className="flex items-center gap-2">
                                            <span className="px-3 py-1 rounded-full text-xs font-mono border backdrop-blur-md"
                                                style={{ backgroundColor: "rgba(49,113,198,0.35)", color: "#fff", borderColor: "rgba(49,113,198,0.5)" }}>
                                                Developer Tools
                                            </span>
                                            <span className="px-3 py-1 rounded-full text-xs font-mono backdrop-blur-md border border-white/10"
                                                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white" }}>
                                                Platform
                                            </span>
                                        </div>
                                    </div>
                                }
                            />

                            {/* Project content */}
                            <div className="p-6 sm:p-8">
                                <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "#1a1a1a" }}>
                                    Vermos
                                </h3>
                                <p className="mb-6 leading-relaxed" style={{ color: "#666" }}>
                                    A platform designed to help developers discover useful tools for building websites
                                    and software applications. Provides a centralized library of development tools
                                    that improves productivity.
                                </p>

                                {/* Features */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider" style={{ color: "#1a1a1a" }}>
                                        Key Features
                                    </h4>
                                    <ul className="grid sm:grid-cols-2 gap-2">
                                        {[
                                            "Curated collection of development tools",
                                            "Categorized tools for easier discovery",
                                            "Simple and clean interface",
                                            "Fast navigation to explore resources",
                                        ].map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#666" }}>
                                                <span style={{ color: "#3171C6" }} className="mt-0.5">•</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tech Stack */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider" style={{ color: "#1a1a1a" }}>
                                        Technologies Used
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["HTML", "CSS", "JavaScript"].map((tech, i) => (
                                            <span key={i} className="px-3 py-1 rounded-lg text-sm border"
                                                style={{ backgroundColor: "rgba(49,113,198,0.04)", borderColor: "rgba(49,113,198,0.15)", color: "#555" }}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-4">
                                    <Magnet padding={40} magnetStrength={3} wrapperClassName="inline-block">
                                        <a
                                            href="https://github.com/AdarshM79949"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                                            style={{ backgroundColor: "#3171C6" }}
                                        >
                                            <Github size={18} />
                                            View on GitHub
                                        </a>
                                    </Magnet>
                                    <Magnet padding={40} magnetStrength={3} wrapperClassName="inline-block">
                                        <a
                                            href="https://vermos-vert.vercel.app/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:bg-[rgba(49,113,198,0.05)]"
                                            style={{ border: "2px solid rgba(49,113,198,0.2)", color: "#2D2D2D" }}
                                        >
                                            <ExternalLink size={18} />
                                            Live Demo
                                        </a>
                                    </Magnet>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION: Education
   ═══════════════════════════════════════════════════════════════ */
function EducationSection() {
    return (
        <section id="education" className="relative py-24 overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #3171C6, transparent)" }} />

            <div className="max-w-6xl mx-auto px-6">
                <FadeContent blur={true} duration={800} initialOpacity={0} threshold={0.2} delay={100}>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                            style={{ backgroundColor: "rgba(49,113,198,0.08)", borderColor: "rgba(49,113,198,0.2)" }}>
                            <Monitor size={16} style={{ color: "#3171C6" }} />
                            <span className="text-sm font-mono" style={{ color: "#3171C6" }}>Education & Experience</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "#1a1a1a" }}>
                            Learning <span style={{ color: "#3171C6" }}>Journey</span>
                        </h2>
                    </div>
                </FadeContent>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Education */}
                    <div>
                        <ScrollReveal>
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3" style={{ color: "#1a1a1a" }}>
                                <span className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: "rgba(49,113,198,0.12)" }}>
                                    <Sparkles size={20} style={{ color: "#3171C6" }} />
                                </span>
                                Education
                            </h3>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <GlareHoverCard className="rounded-2xl">
                                <div className="p-6 border transition-colors hover:border-[#3171C6]/30"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.6)",
                                        backdropFilter: "blur(20px)",
                                        borderColor: "rgba(0,0,0,0.06)",
                                        boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                                    }}>
                                    <div className="flex items-start gap-4 flex-col sm:flex-row">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: "rgba(49,113,198,0.12)" }}>
                                            <Sparkles size={24} style={{ color: "#3171C6" }} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1" style={{ color: "#1a1a1a" }}>
                                                B.Tech — AI and Machine Learning
                                            </h4>
                                            <p className="text-sm mb-2" style={{ color: "#3171C6" }}>MGM College</p>
                                            <p className="text-sm mb-1" style={{ color: "#888" }}>APJ Abdul Kalam Technological University (KTU)</p>
                                            <p className="text-sm mb-3" style={{ color: "#aaa" }}>Kerala, India</p>
                                            <div className="flex items-center gap-2 text-sm" style={{ color: "#999" }}>
                                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#3171C6" }} />
                                                2025 – Present
                                            </div>
                                            <p className="text-sm mt-4 leading-relaxed" style={{ color: "#666" }}>
                                                Studying AI, Machine Learning, Programming, Data Structures, and Software Engineering.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </GlareHoverCard>
                        </ScrollReveal>
                    </div>

                    {/* Hackathons & GitHub */}
                    <div>
                        <ScrollReveal>
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3" style={{ color: "#1a1a1a" }}>
                                <span className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: "rgba(49,113,198,0.12)" }}>
                                    <Code2 size={20} style={{ color: "#3171C6" }} />
                                </span>
                                Hackathons
                            </h3>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <GlareHoverCard className="rounded-2xl mb-6">
                                <div className="p-6 border transition-colors hover:border-[#3171C6]/30"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.6)",
                                        backdropFilter: "blur(20px)",
                                        borderColor: "rgba(0,0,0,0.06)",
                                        boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                                    }}>
                                    <div className="flex items-start gap-4 flex-col sm:flex-row">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: "rgba(49,113,198,0.12)" }}>
                                            <Code2 size={24} style={{ color: "#3171C6" }} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-2" style={{ color: "#1a1a1a" }}>Hackathon Participant</h4>
                                            <p className="text-sm mb-4 leading-relaxed" style={{ color: "#666" }}>
                                                Participated in two hackathons focused on building innovative software solutions.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {["Rapid prototyping", "Team collaboration", "Problem solving", "Technical presentation"].map((skill, i) => (
                                                    <span key={i} className="px-3 py-1 rounded-full text-xs border"
                                                        style={{ backgroundColor: "rgba(49,113,198,0.04)", borderColor: "rgba(49,113,198,0.15)", color: "#666" }}>
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </GlareHoverCard>
                        </ScrollReveal>

                        {/* GitHub Stats */}
                        <ScrollReveal delay={0.2}>
                            <div className="rounded-2xl p-6 border transition-colors hover:border-[#3171C6]/30"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.6)",
                                    backdropFilter: "blur(20px)",
                                    borderColor: "rgba(0,0,0,0.06)",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                                }}>
                                <h4 className="font-semibold mb-4 flex items-center gap-2" style={{ color: "#1a1a1a" }}>
                                    <Github size={20} style={{ color: "#3171C6" }} />
                                    GitHub Activity
                                </h4>
                                <p className="text-sm mb-4" style={{ color: "#666" }}>
                                    I use GitHub to publish projects and explore ideas related to backend systems,
                                    developer tools, and web applications.
                                </p>
                                <a
                                    href="https://github.com/AdarshM79949"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                                    style={{ color: "#3171C6" }}
                                >
                                    <ExternalLink size={16} />
                                    View GitHub Profile
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION: Contact
   ═══════════════════════════════════════════════════════════════ */
function ContactSection() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you for reaching out! I will get back to you soon.");
    };

    return (
        <section id="contact" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(49,113,198,0.2), transparent 70%)" }} />

            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                                style={{ backgroundColor: "rgba(49,113,198,0.08)", borderColor: "rgba(49,113,198,0.2)" }}>
                                <Mail size={16} style={{ color: "#3171C6" }} />
                                <span className="text-sm font-mono" style={{ color: "#3171C6" }}>Get In Touch</span>
                            </div>

                            <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: "#1a1a1a" }}>
                                Let's Work <span style={{ color: "#3171C6" }}>Together</span>
                            </h2>

                            <p className="mb-8 leading-relaxed" style={{ color: "#666" }}>
                                Have a project in mind or want to collaborate? Feel free to reach out.
                                I'm always open to discussing new opportunities and interesting ideas.
                            </p>
                        </ScrollReveal>

                        <div className="space-y-6">
                            {[
                                { icon: <Mail size={20} />, label: "Email", value: "adarshm80517@gmail.com", href: "mailto:adarshm80517@gmail.com" },
                                { icon: <MapPin size={20} />, label: "Location", value: "Kerala, India" },
                                { icon: <Github size={20} />, label: "GitHub", value: "github.com/AdarshM79949", href: "https://github.com/AdarshM79949" },
                                { icon: <Linkedin size={20} />, label: "LinkedIn", value: "linkedin.com/in/adarsh-m-b52ab13b5", href: "https://linkedin.com/in/adarsh-m-b52ab13b5" },
                            ].map((contact, i) => (
                                <ScrollReveal key={i} delay={i * 0.1}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: "rgba(49,113,198,0.12)" }}>
                                            <span style={{ color: "#3171C6" }}>{contact.icon}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm" style={{ color: "#999" }}>{contact.label}</p>
                                            {contact.href ? (
                                                <a href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined}
                                                    rel="noopener noreferrer"
                                                    className="transition-colors hover:opacity-80" style={{ color: "#1a1a1a" }}>
                                                    {contact.value}
                                                </a>
                                            ) : (
                                                <p style={{ color: "#1a1a1a" }}>{contact.value}</p>
                                            )}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <ScrollReveal delay={0.2}>
                        <form onSubmit={handleSubmit} className="rounded-2xl p-8 space-y-6 border"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.7)",
                                backdropFilter: "blur(20px)",
                                borderColor: "rgba(0,0,0,0.06)",
                                boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
                            }}>
                            {[
                                { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                                { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                            ].map((field) => (
                                <div key={field.id}>
                                    <label htmlFor={field.id} className="block text-sm font-medium mb-2" style={{ color: "#1a1a1a" }}>
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        id={field.id}
                                        name={field.id}
                                        required
                                        className="w-full px-4 py-3 rounded-lg text-sm transition-colors focus:outline-none"
                                        placeholder={field.placeholder}
                                        style={{
                                            backgroundColor: "rgba(0,0,0,0.03)",
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            color: "#1a1a1a",
                                        }}
                                    />
                                </div>
                            ))}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: "#1a1a1a" }}>
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full px-4 py-3 rounded-lg text-sm transition-colors resize-none focus:outline-none"
                                    placeholder="Your message..."
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0.03)",
                                        border: "1px solid rgba(0,0,0,0.08)",
                                        color: "#1a1a1a",
                                    }}
                                />
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all"
                                style={{ backgroundColor: "#3171C6" }}
                            >
                                <Send size={18} />
                                Send Message
                            </motion.button>
                        </form>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION: Footer
   ═══════════════════════════════════════════════════════════════ */
function FooterSection() {
    return (
        <footer className="relative py-12 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <span className="text-2xl font-bold" style={{ color: "#1a1a1a" }}>
                            Adarsh<span style={{ color: "#3171C6" }}>.</span>
                        </span>
                        <p className="text-sm mt-2" style={{ color: "#999" }}>
                            AI & ML Student | Go Developer | System Design Enthusiast
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {[
                            { icon: <Github size={20} />, href: "https://github.com/AdarshM79949" },
                            { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/adarsh-m-b52ab13b5" },
                            { icon: <Mail size={20} />, href: "mailto:adarshm80517@gmail.com" },
                        ].map((social, i) => (
                            <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                                style={{ backgroundColor: "rgba(49,113,198,0.08)", color: "#888" }}>
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-8 text-center text-sm" style={{ borderTop: "1px solid rgba(0,0,0,0.04)", color: "#bbb" }}>
                    © {new Date().getFullYear()} Adarsh M. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function BackendPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen relative" style={{ backgroundColor: "#F4F3F1", color: "#2D2D2D" }}>
            {/* Navigation */}
            <StaggeredMenu
                position="right"
                items={[
                    { label: "Home", ariaLabel: "Go to home page", link: "/" },
                    { label: "Video Editor", ariaLabel: "View video editor", link: "/editor" },
                    { label: "About", ariaLabel: "About page", link: "/about" },
                ]}
                displayItemNumbering={true}
                menuButtonColor="#2D2D2D"
            />

            {/* Back button */}
            <nav className="fixed top-0 inset-x-0 z-40 p-6 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto">
                    <Magnet padding={40} magnetStrength={4}>
                        <motion.button
                            onClick={() => router.push("/")}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.7)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(0,0,0,0.06)",
                                color: "#555",
                            }}
                        >
                            <ArrowLeft size={16} />
                            Back
                        </motion.button>
                    </Magnet>
                </div>
            </nav>

            {/* In-page navigation */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-1 px-2 py-1.5 rounded-full"
                    style={{
                        backgroundColor: "rgba(255,255,255,0.85)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(0,0,0,0.06)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    }}
                >
                    {["About", "Skills", "Projects", "Education", "Contact"].map((label) => (
                        <a
                            key={label}
                            href={`#${label.toLowerCase()}`}
                            className="px-4 py-1.5 rounded-full text-sm transition-colors hover:bg-[#3171C6]/10"
                            style={{ color: "#555" }}
                        >
                            {label}
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* Sections */}
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <EducationSection />
            <ContactSection />
            <FooterSection />
        </main>
    );
}
