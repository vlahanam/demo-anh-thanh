"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Story5Slide } from "@/data/story-5-slides";

const EASE = [0.22, 1, 0.36, 1] as const;

// Each variant defines how label, title, and description animate in
const CONTENT_VARIANTS = [
  // 0: slide up (default feel)
  {
    container: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -30 } },
    label:     { initial: { opacity: 0, x: -24 }, animate: { opacity: 1, x: 0 }, delay: 0.1 },
    title:     { initial: { opacity: 0, y: 30 },  animate: { opacity: 1, y: 0 }, delay: 0.2 },
    desc:      { initial: { opacity: 0, y: 20 },  animate: { opacity: 1, y: 0 }, delay: 0.35 },
  },
  // 1: slide from right
  {
    container: { initial: { opacity: 0, x: 80 },  animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -40 } },
    label:     { initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 }, delay: 0.1 },
    title:     { initial: { opacity: 0, x: 40 },  animate: { opacity: 1, x: 0 }, delay: 0.2 },
    desc:      { initial: { opacity: 0, x: 24 },  animate: { opacity: 1, x: 0 }, delay: 0.35 },
  },
  // 2: fade + scale
  {
    container: { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.04 } },
    label:     { initial: { opacity: 0, scale: 0.8 },  animate: { opacity: 1, scale: 1 }, delay: 0.08 },
    title:     { initial: { opacity: 0, scale: 0.9 },  animate: { opacity: 1, scale: 1 }, delay: 0.18 },
    desc:      { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, delay: 0.3 },
  },
  // 3: stagger slide down
  {
    container: { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 30 } },
    label:     { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, delay: 0.05 },
    title:     { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 }, delay: 0.15 },
    desc:      { initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 }, delay: 0.28 },
  },
  // 4: reveal from left with blur
  {
    container: { initial: { opacity: 0, x: -80, filter: "blur(8px)" }, animate: { opacity: 1, x: 0, filter: "blur(0px)" }, exit: { opacity: 0, x: 40, filter: "blur(4px)" } },
    label:     { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, delay: 0.1 },
    title:     { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, delay: 0.2 },
    desc:      { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, delay: 0.32 },
  },
  // 5: rotate + fade
  {
    container: { initial: { opacity: 0, rotate: -3, y: 30 }, animate: { opacity: 1, rotate: 0, y: 0 }, exit: { opacity: 0, rotate: 2, y: -20 } },
    label:     { initial: { opacity: 0, rotate: -6 }, animate: { opacity: 1, rotate: 0 }, delay: 0.08 },
    title:     { initial: { opacity: 0, rotate: -4, y: 20 }, animate: { opacity: 1, rotate: 0, y: 0 }, delay: 0.18 },
    desc:      { initial: { opacity: 0, y: 16 },  animate: { opacity: 1, y: 0 }, delay: 0.3 },
  },
] as const;

interface Props {
  slide: Story5Slide;
}

export default function Story5SlideContent({ slide }: Props) {
  const v = CONTENT_VARIANTS[(slide.id - 1) % CONTENT_VARIANTS.length];

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center" style={{ left: "8vw" }}>
      <div className="w-full pr-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={v.container.initial}
            animate={v.container.animate}
            exit={v.container.exit}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-3xl"
          >
            <motion.span
              initial={v.label.initial}
              animate={v.label.animate}
              transition={{ duration: 0.5, delay: v.label.delay, ease: EASE }}
              className="inline-block text-sm md:text-base tracking-[0.3em] uppercase font-mono mb-5"
              style={{ color: slide.accent }}
            >
              {slide.label}
            </motion.span>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="h-0.5 mb-6"
              style={{ background: slide.accent }}
            />
            <motion.h2
              initial={v.title.initial}
              animate={v.title.animate}
              transition={{ duration: 0.55, delay: v.title.delay, ease: EASE }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-serif), Georgia, serif", textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}
            >
              {slide.title}
            </motion.h2>
            <motion.p
              initial={v.desc.initial}
              animate={v.desc.animate}
              transition={{ duration: 0.55, delay: v.desc.delay, ease: EASE }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/85 leading-relaxed max-w-2xl"
              style={{ fontFamily: "var(--font-sans), sans-serif" }}
            >
              {slide.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
