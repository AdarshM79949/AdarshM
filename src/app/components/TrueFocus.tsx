"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface TrueFocusProps {
    sentence?: string;
    manualMode?: boolean;
    blurAmount?: number;
    borderColor?: string;
    glowColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
    sentence = "True Focus",
    manualMode = false,
    blurAmount = 5,
    borderColor = "#3171C6",
    glowColor = "rgba(49, 113, 198, 0.6)",
    animationDuration = 0.5,
    pauseBetweenAnimations = 1,
}) => {
    const words = sentence.split(" ");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

    useEffect(() => {
        if (!manualMode) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % words.length);
            }, (animationDuration + pauseBetweenAnimations) * 1000);

            return () => clearInterval(interval);
        }
    }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

    useEffect(() => {
        if (currentIndex === null || currentIndex === -1) return;

        if (!wordRefs.current[currentIndex] || !containerRef.current) return;

        const parentRect = containerRef.current.getBoundingClientRect();
        const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

        setFocusRect({
            x: activeRect.left - parentRect.left,
            y: activeRect.top - parentRect.top,
            width: activeRect.width,
            height: activeRect.height,
        });
    }, [currentIndex, words.length]);

    const handleMouseEnter = (index: number) => {
        if (manualMode) {
            setLastActiveIndex(currentIndex);
            setCurrentIndex(index);
        }
    };

    const handleMouseLeave = () => {
        if (manualMode) {
            setLastActiveIndex(currentIndex);
            setCurrentIndex(-1);
        }
    };

    return (
        <div className="relative flex justify-center items-center gap-4 flex-wrap" ref={containerRef}>
            {words.map((word, index) => {
                const isActive = index === currentIndex;
                return (
                    <span
                        key={index}
                        ref={(el) => {
                            if (el) wordRefs.current[index] = el;
                        }}
                        className="relative cursor-pointer text-3xl sm:text-4xl md:text-5xl font-black transition-all duration-300"
                        style={{
                            filter: manualMode
                                ? (isActive ? `blur(0px)` : `blur(${blurAmount}px)`)
                                : (isActive ? `blur(0px)` : `blur(${blurAmount}px)`),
                            color: isActive ? "#fff" : "#555",
                            opacity: isActive ? 1 : 0.6,
                            textShadow: isActive ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}` : 'none',
                            transform: isActive ? 'scale(1.05)' : 'scale(1)',
                            zIndex: isActive ? 10 : 1,
                        }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {word}
                    </span>
                );
            })}

            {(currentIndex !== -1) && (
                <motion.div
                    className="absolute top-0 left-0 pointer-events-none box-border"
                    style={{
                        border: `2px solid ${borderColor}`,
                        borderRadius: "12px",
                        boxShadow: `0 0 20px ${glowColor}`,
                    }}
                    initial={false}
                    animate={{
                        x: focusRect.x - 8,
                        y: focusRect.y - 4,
                        width: focusRect.width + 16,
                        height: focusRect.height + 8,
                        opacity: currentIndex >= 0 ? 1 : 0,
                    }}
                    transition={{
                        duration: animationDuration,
                        ease: "easeInOut",
                    }}
                />
            )}
        </div>
    );
};

export default TrueFocus;
