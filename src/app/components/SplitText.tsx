"use client"
import { useSprings, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    animationFrom?: any;
    animationTo?: any;
    easing?: string;
    threshold?: number;
    rootMargin?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
    text,
    className = '',
    delay = 50,
    animationFrom = { opacity: 0, transform: 'translate3d(0,20px,0)' },
    animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
    easing = 'easeOutCubic',
    threshold = 0.1,
    rootMargin = '-50px',
    textAlign = 'left',
    onLetterAnimationComplete,
}) => {
    const words = text.split(' ').map(word => word.split(''));
    const letters = words.flat();
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);
    const animatedCount = useRef(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const springs = useSprings(
        letters.length,
        letters.map((_, i) => ({
            from: animationFrom,
            to: inView
                ? async (next: any) => {
                    await next(animationTo);
                    animatedCount.current += 1;
                    if (animatedCount.current === letters.length && onLetterAnimationComplete) {
                        onLetterAnimationComplete();
                    }
                }
                : animationFrom,
            delay: i * delay,
            config: { easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t) }, // approx easeOutExpo
        }))
    );

    return (
        <p
            ref={ref}
            className={`inline-block whitespace-normal ${className}`}
            style={{ textAlign }}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {word.map((letter, letterIndex) => {
                        const index = words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + letterIndex;
                        return (
                            <animated.span
                                key={index}
                                style={springs[index]}
                                className="inline-block transform transition-opacity will-change-transform"
                            >
                                {letter}
                            </animated.span>
                        );
                    })}
                    <span className="inline-block">&nbsp;</span>
                </span>
            ))}
        </p>
    );
};

export default SplitText;
