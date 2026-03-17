"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Story5Slide } from "@/data/story-5-slides";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  slide: Story5Slide;
}

export default function Story5SlideContent({ slide }: Props) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center" style={{ left: "8vw" }}>
      <div className="w-full pr-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
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
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-serif), Georgia, serif", textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}
            >
              {slide.title}
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/85 leading-relaxed max-w-2xl"
              style={{ fontFamily: "var(--font-sans), sans-serif" }}
            >
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
