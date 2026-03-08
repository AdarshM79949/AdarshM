"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    sequential?: boolean;
    revealDirection?: "start" | "end" | "center";
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    parentClassName?: string;
    encryptedClassName?: string;
    animateOn?: "view" | "hover";
}

const DecryptedText: React.FC<DecryptedTextProps> = ({
    text,
    speed = 40,
    maxIterations = 10,
    sequential = false,
    revealDirection = "start",
    useOriginalCharsOnly = false,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
    className = "",
    parentClassName = "",
    encryptedClassName = "",
    animateOn = "hover",
    ...props
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [isScrambling, setIsScrambling] = useState(false);
    const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let currentIteration = 0;

        const scramble = () => {
            if (currentIteration >= maxIterations) {
                clearInterval(intervalRef.current!);
                setDisplayText(text);
                setIsScrambling(false);
                return;
            }

            const nextText = text.split("").map((char, index) => {
                if (char === " ") return " ";

                let shouldReveal = false;
                if (sequential) {
                    if (revealDirection === "start" && index < (currentIteration / maxIterations) * text.length) shouldReveal = true;
                    if (revealDirection === "end" && index > text.length - (currentIteration / maxIterations) * text.length) shouldReveal = true;
                    if (revealDirection === "center") {
                        const mid = text.length / 2;
                        const distance = Math.abs(mid - index);
                        if (distance < (currentIteration / maxIterations) * mid) shouldReveal = true;
                    }
                }

                if (shouldReveal || revealedIndices.has(index)) {
                    setRevealedIndices(prev => new Set(prev).add(index));
                    return text[index];
                }

                if (useOriginalCharsOnly) {
                    const shuffled = text.replace(/ /g, '').split('').sort(() => 0.5 - Math.random());
                    return shuffled[Math.floor(Math.random() * shuffled.length)];
                }

                return characters[Math.floor(Math.random() * characters.length)];
            }).join("");

            setDisplayText(nextText);
            currentIteration++;
        };

        if (isHovering && !isScrambling) {
            setIsScrambling(true);
            setRevealedIndices(new Set());
            intervalRef.current = setInterval(scramble, speed);
        } else if (!isHovering && animateOn === "hover") {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setDisplayText(text);
            setIsScrambling(false);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isHovering, text, speed, maxIterations, sequential, revealDirection, useOriginalCharsOnly, characters, animateOn, isScrambling, revealedIndices]);

    return (
        <motion.span
            className={`inline-block whitespace-pre-wrap ${parentClassName}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            {...props}
        >
            <span className={className}>
                {displayText.split("").map((char, index) => {
                    const isRevealedOrOriginal = char === text[index];
                    return (
                        <span key={index} className={isRevealedOrOriginal ? "" : encryptedClassName}>
                            {char}
                        </span>
                    )
                })}
            </span>
        </motion.span>
    );
};

export default DecryptedText;
