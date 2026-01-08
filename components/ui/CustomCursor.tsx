import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        // Mobile check
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        if (isMobile) return;

        // Initial setup
        gsap.set([cursorRef.current, followerRef.current], {
            xPercent: -50,
            yPercent: -50,
            opacity: 0
        });

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                opacity: 1,
                ease: "power2.out"
            });

            gsap.to(followerRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                opacity: 1,
                ease: "power3.out"
            });
        };

        const handleMouseEnter = () => setIsHidden(false);
        const handleMouseLeave = () => setIsHidden(true);

        // Event delegation for hover detection
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.matches('a, button, input, [role="button"], .cursor-pointer, [data-cursor="pointer"]') ||
                target.closest('a, button, input, [role="button"], .cursor-pointer, [data-cursor="pointer"]');
            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', moveCursor);
        document.body.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', checkMobile);
        };
    }, [isMobile]);

    // Animate cursor state changes
    useEffect(() => {
        if (isMobile) return;

        gsap.to(followerRef.current, {
            scale: isHovering ? 2.5 : 1,
            backgroundColor: isHovering ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
            borderColor: isHovering ? 'rgba(34, 197, 94, 0.6)' : 'rgba(255, 255, 255, 0.2)',
            duration: 0.4,
            ease: "power2.out"
        });

        gsap.to(cursorRef.current, {
            scale: isHovering ? 0.5 : 1,
            backgroundColor: isHovering ? '#22c55e' : '#ffffff',
            duration: 0.3,
            ease: "power2.out"
        });
    }, [isHovering, isMobile]);

    // Hide cursor when leaving window
    useEffect(() => {
        if (isMobile) return;

        gsap.to([cursorRef.current, followerRef.current], {
            opacity: isHidden ? 0 : 1,
            duration: 0.3
        });
    }, [isHidden, isMobile]);

    // Don't render on mobile
    if (isMobile) return null;

    return (
        <>
            {/* Dot Cursor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ willChange: 'transform' }}
            />
            {/* Follower Ring */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-12 h-12 border border-white/20 rounded-full pointer-events-none z-[9998]"
                style={{ willChange: 'transform' }}
            />
        </>
    );
};

export default CustomCursor;
