"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Code2, Film, ArrowRight } from "lucide-react";
import ShinyText from "./components/ShinyText";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
      style={{
        backgroundColor: "#3171C6",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, #4a90d9 0%, #3171C6 60%, #2a62ad 100%)",
      }}
    >
      {/* Ambient orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #F4F3F1, transparent)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #1a4a8a, transparent)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.1] pointer-events-none"
        style={{ background: "radial-gradient(circle, #F4F3F1, transparent)" }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-pattern" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border bg-white/[0.08] backdrop-blur-sm"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#F4F3F1" }} />
          <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.8)" }}>Portfolio</span>
        </motion.div>

        <h1
          className="mb-3 tracking-tight font-bold"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", lineHeight: 1.1 }}
        >
          <ShinyText
            text="Adarsh M"
            speed={3}
            color="#FFFFFF"
            shineColor="#F4F3F1"
            spread={120}
            direction="left"
            yoyo={true}
          />
        </h1>
        <p className="text-xs max-w-xs mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
          Choose a portfolio to explore
        </p>
      </motion.div>

      {/* Two portfolio cards */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 w-full max-w-2xl">

        {/* ── Card 1: Backend Engineer — Glass Icon Button ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 w-full"
        >
          <GlassIconCard
            icon={Code2}
            title="Go Developer & System Design"
            description="Building robust backend systems and developer productivity tools."
            tags={["Go", "Linux", "Git", "API"]}
            iconColor="from-blue-400 to-blue-500"
            accentColor="rgba(255, 255, 255, 0.1)"
            borderColor="rgba(255, 255, 255, 0.2)"
            onClick={() => router.push("/backend")}
          />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="hidden sm:block w-px self-stretch bg-gradient-to-b from-transparent via-white/15 to-transparent"
        />
        <div className="sm:hidden text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>or</div>

        {/* ── Card 2: Video Editor — Apple Glass Button ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 w-full"
        >
          <AppleGlassCard
            icon={Film}
            title="Video Editor"
            description="Cinematic cuts, color grading, motion graphics & reels."
            tags={["Premiere Pro", "After Effects", "DaVinci", "Color"]}
            onClick={() => router.push("/editor")}
          />
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative z-10 mt-14 text-xs text-center"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        Available for freelance & full-time opportunities
      </motion.p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Glass Icon Button Card (Backend)
───────────────────────────────────────────── */
interface GlassCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
  iconColor: string;
  accentColor: string;
  borderColor: string;
  onClick: () => void;
}

function GlassIconCard({
  icon: Icon, title, description, tags, iconColor, accentColor, borderColor, onClick,
}: GlassCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.025, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative w-full text-left rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: `linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)`,
        backdropFilter: "blur(20px)",
        border: `1px solid ${borderColor}`,
        boxShadow: `0 4px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)`,
        padding: "28px 24px",
      }}
    >
      {/* Hover accent glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 120%, ${accentColor} 0%, transparent 60%)` }}
      />
      {/* Top edge shimmer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Icon */}
      <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5
        bg-gradient-to-br ${iconColor}
        shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]`}
      >
        {/* @ts-ignore */}
        <Icon size={22} className="text-white" />
      </div>

      <h2 className="text-white relative z-10 mb-2" style={{ fontSize: "1.15rem", fontWeight: 600 }}>
        {title}
      </h2>
      <p className="text-white/50 text-sm relative z-10 mb-5 leading-relaxed">{description}</p>

      {/* Tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5 mb-5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md text-xs"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 flex items-center gap-1.5 text-white/60 text-sm group-hover:text-white/90 transition-colors duration-200">
        View Portfolio
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          className="inline-block"
        >
          <ArrowRight size={14} />
        </motion.span>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   Apple Glass Button Card (Video Editor)
───────────────────────────────────────────── */
interface AppleGlassCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
  onClick: () => void;
}

function AppleGlassCard({ icon: Icon, title, description, tags, onClick }: AppleGlassCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.025, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative w-full text-left rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.08) 100%)",
        backdropFilter: "blur(40px) saturate(1.8)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: [
          "0 4px 32px rgba(0,0,0,0.2)",
          "inset 0 1px 0 rgba(255,255,255,0.25)",
          "inset 0 -1px 0 rgba(0,0,0,0.1)",
        ].join(", "),
        padding: "28px 24px",
      }}
    >
      {/* Apple glass specular top highlight */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.5) 60%, transparent 95%)" }}
      />
      {/* Soft inner glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(ellipse at 60% -20%, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
      />

      {/* Icon — Apple glass pill */}
      <div
        className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.22)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
      >
        {/* @ts-ignore */}
        <Icon size={22} className="text-white/90" />
      </div>

      {/* Text */}
      <h2 className="text-white relative z-10 mb-2" style={{ fontSize: "1.15rem", fontWeight: 600 }}>
        {title}
      </h2>
      <p className="text-white/50 text-sm relative z-10 mb-5 leading-relaxed">{description}</p>

      {/* Tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5 mb-5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md text-xs"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 flex items-center gap-1.5 text-white/60 text-sm group-hover:text-white/90 transition-colors duration-200">
        View Portfolio
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          className="inline-block"
        >
          <ArrowRight size={14} />
        </motion.span>
      </div>
    </motion.button>
  );
}
