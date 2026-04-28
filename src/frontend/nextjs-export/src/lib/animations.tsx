"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import type { Easing, Variants } from "motion/react";
import { type ReactNode, useCallback, useEffect, useRef } from "react";

const easeOut: Easing = "easeOut";
const premiumEase: Easing = [0.33, 0.66, 0.66, 1] as unknown as Easing;
const springEase: Easing = [0.34, 1.56, 0.64, 1] as unknown as Easing;

// ─── Animation Variants ───────────────────────────────────────────────────────

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: springEase },
  },
};

/** Spring physics variants for CTAs and card interactions */
export const springVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.035,
    y: -4,
    transition: {
      type: "spring",
      damping: 8,
      mass: 0.5,
      stiffness: 200,
    },
  },
  tap: {
    scale: 0.97,
    transition: { type: "spring", damping: 12, stiffness: 300 },
  },
};

export const cardHoverVariants = {
  rest: { y: 0, boxShadow: "0 4px 20px rgba(45,27,105,0.1)" },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(45,27,105,0.25)",
    transition: { type: "spring", damping: 8, mass: 0.5, stiffness: 200 },
  },
};

export const sectionLabelClass =
  "text-brand-gold text-xs font-mono uppercase tracking-widest";

// ─── ScrollProgressBar ────────────────────────────────────────────────────────

export function ScrollProgressBar() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  if (prefersReduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50 pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #D4A017 0%, #F0C040 60%, #D4A017 100%)",
        boxShadow:
          "0 0 8px 1px rgba(212,160,23,0.7), 0 0 16px 2px rgba(212,160,23,0.35)",
      }}
    />
  );
}

// ─── MagneticCTA ─────────────────────────────────────────────────────────────

interface MagneticCTAProps {
  children: ReactNode;
  className?: string;
  radius?: number;
  strength?: number;
}

export function MagneticCTA({
  children,
  className,
  radius = 50,
  strength = 8,
}: MagneticCTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 10, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 10, mass: 0.5 });

  // Disable on touch/mobile — no hover events
  const isTouch =
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || isTouch || prefersReduced) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const factor = (1 - dist / radius) * strength;
        x.set((dx / dist) * factor);
        y.set((dy / dist) * factor);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [x, y, radius, strength, isTouch, prefersReduced],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    if (isTouch || prefersReduced) return;
    window.addEventListener("mousemove", handleMouseMove);
    const el = ref.current;
    el?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, isTouch, prefersReduced]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        !isTouch && !prefersReduced ? { x: springX, y: springY } : undefined
      }
      whileHover={!isTouch && !prefersReduced ? "hover" : undefined}
      whileTap={!isTouch && !prefersReduced ? "tap" : undefined}
      variants={springVariants}
      initial="rest"
    >
      {children}
    </motion.div>
  );
}

// ─── SplitHeadline ────────────────────────────────────────────────────────────

interface SplitHeadlineProps {
  text: string;
  className?: string;
  lineClassName?: string;
}

export function SplitHeadline({
  text,
  className,
  lineClassName,
}: SplitHeadlineProps) {
  const prefersReduced = useReducedMotion();

  // Split on explicit newlines, or auto-split at word boundaries into 3 roughly-equal lines
  const lines = text.includes("\n")
    ? text.split("\n")
    : splitIntoLines(text, 3);

  if (prefersReduced) {
    return (
      <div className={className}>
        {lines.map((line) => (
          <div key={line} className={lineClassName}>
            {line}
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {lines.map((line) => (
        <motion.div
          key={line}
          className={lineClassName}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: premiumEase },
            },
          }}
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}

function splitIntoLines(text: string, numLines: number): string[] {
  const words = text.split(" ");
  if (words.length <= numLines) return words;
  const perLine = Math.ceil(words.length / numLines);
  const lines: string[] = [];
  for (let i = 0; i < numLines; i++) {
    const chunk = words.slice(i * perLine, (i + 1) * perLine).join(" ");
    if (chunk) lines.push(chunk);
  }
  return lines;
}

// ─── ScrollReveal ─────────────────────────────────────────────────────────────

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const variantMap = {
    up: fadeUpVariants,
    left: slideInLeftVariants,
    right: slideInRightVariants,
    scale: scaleInVariants,
  };

  const selectedVariants = variantMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={selectedVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
