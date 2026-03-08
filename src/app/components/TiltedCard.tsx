"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "motion/react";

interface TiltedCardProps {
    imageSrc: string;
    altText?: string;
    captionText?: string;
    containerHeight?: string;
    containerWidth?: string;
    imageHeight?: string;
    imageWidth?: string;
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showMobileWarning?: boolean;
    showTooltip?: boolean;
    displayOverlayContent?: boolean;
    overlayContent?: React.ReactNode;
}

const TiltedCard: React.FC<TiltedCardProps> = ({
    imageSrc,
    altText = "Tilted card image",
    captionText = "",
    containerHeight = "250px",
    containerWidth = "100%",
    imageHeight = "250px",
    imageWidth = "100%",
    scaleOnHover = 1.05,
    rotateAmplitude = 15,
    showMobileWarning = true,
    showTooltip = true,
    displayOverlayContent = false,
    overlayContent = null,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="relative flex items-center justify-center flex-col perspective-1000">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: scaleOnHover }}
                className="relative w-full rounded-[15px] overflow-hidden transition-shadow"
            >
                <div
                    className="relative w-full h-full"
                    style={{ width: containerWidth, height: containerHeight }}
                >
                    <img
                        src={imageSrc}
                        alt={altText}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                        style={{ width: imageWidth, height: imageHeight }}
                    />
                    {displayOverlayContent && overlayContent && (
                        <div className="absolute inset-0 z-10">{overlayContent}</div>
                    )}
                </div>
            </motion.div>

            {captionText && (
                <p className="mt-4 text-sm text-gray-500">{captionText}</p>
            )}
        </div>
    );
};

export default TiltedCard;
