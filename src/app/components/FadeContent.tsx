"use client";

import { useRef, useEffect, useState } from 'react';

interface FadeContentProps {
    children: React.ReactNode;
    blur?: boolean;
    duration?: number;
    initialOpacity?: number;
    threshold?: number;
    delay?: number;
    className?: string;
}

const FadeContent: React.FC<FadeContentProps> = ({
    children,
    blur = false,
    duration = 1000,
    initialOpacity = 0,
    threshold = 0.1,
    delay = 0,
    className = ''
}) => {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: inView ? 1 : initialOpacity,
                filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none',
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, filter ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
                willChange: 'opacity, filter, transform'
            }}
        >
            {children}
        </div>
    );
};

export default FadeContent;
