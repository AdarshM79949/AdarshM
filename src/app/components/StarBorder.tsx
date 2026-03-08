"use client";

import React from "react";

type StarBorderProps<T extends React.ElementType> = {
    as?: T;
    className?: string;
    color?: string;
    speed?: string;
    children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export default function StarBorder<T extends React.ElementType = "button">({
    as,
    className = "",
    color = "white",
    speed = "6s",
    children,
    ...rest
}: StarBorderProps<T>) {
    const Component = (as || "button") as any;

    return (
        <Component
            className={`relative inline-block py-[1px] overflow-hidden rounded-[20px] ${className}`}
            {...rest}
        >
            <div
                className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] -z-10 animate-star-movement-bottom opacity-20"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div
                className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] -z-10 animate-star-movement-top opacity-20"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div className="relative z-10 w-full rounded-[20px]">
                {children}
            </div>
        </Component>
    );
}
