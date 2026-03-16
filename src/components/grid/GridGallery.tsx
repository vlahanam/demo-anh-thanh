"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDES } from "@/data/slides";

type FlyDir = "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

const FLY_DIRECTIONS: FlyDir[] = [
  "top-left", "top", "top-right", "right",
  "bottom-right", "bottom", "bottom-left", "left",
];

const FLY_OFFSETS: Record<FlyDir, { x: number; y: number }> = {
  top:          { x: 0,    y: -120 },
  bottom:       { x: 0,    y: 120 },
  left:         { x: -120, y: 0 },
  right:        { x: 120,  y: 0 },
  "top-left":   { x: -100, y: -100 },
  "top-right":  { x: 100,  y: -100 },
  "bottom-left":{ x: -100, y: 100 },
  "bottom-right":{ x: 100, y: 100 },
};

// Grid area names for each item
const AREA_NAMES = ["a", "b", "c", "d", "e", "f", "g", "h"];

const GRID_ITEMS = SLIDES.map((slide, i) => ({
  ...slide,
  flyDir: FLY_DIRECTIONS[i % FLY_DIRECTIONS.length],
  area: AREA_NAMES[i],
}));

const EASE = [0.22, 1, 0.36, 1] as const;

export default function GridGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = useCallback((id: number) => {
    setSelected((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selectedSlide = GRID_ITEMS.find((s) => s.id === selected);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* ── Grid ── */}
      <div
        className="h-screen p-3 md:p-5"
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "1fr 2fr 2fr 1fr",
          gridTemplateRows: "1.2fr 1fr 1.2fr",
          gridTemplateAreas: `
            "a b c c"
            "e b d f"
            "e g g h"
          `,
        }}
      >
        {GRID_ITEMS.map((item, i) => {
          const off = FLY_OFFSETS[item.flyDir];
          const isOther = selected !== null && selected !== item.id;

          return (
            <motion.div
              key={item.id}
              layoutId={`grid-img-${item.id}`}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              style={{ gridArea: item.area, zIndex: selected === item.id ? 50 : 1 }}
              initial={{ opacity: 0, x: `${off.x}vw`, y: `${off.y}vh` }}
              animate={
                isOther
                  ? { opacity: 0, x: `${off.x}vw`, y: `${off.y}vh`, transition: { duration: 0.5, ease: EASE } }
                  : { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: EASE } }
              }
              onClick={() => handleSelect(item.id)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <h3
                  className="text-sm md:text-lg font-semibold text-white leading-tight"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
                >
                  {item.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Fullscreen overlay ── */}
      <AnimatePresence>
        {selectedSlide && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(null)}
            />

            {/* Fullscreen image */}
            <motion.div
              layoutId={`grid-img-${selectedSlide.id}`}
              className="fixed inset-4 md:inset-8 lg:inset-12 z-50 rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setSelected(null)}
            >
              <img
                src={selectedSlide.image}
                alt={selectedSlide.title}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Info overlay */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="w-12 h-px mb-5" style={{ background: selectedSlide.accent }} />
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-wide"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
                >
                  {selectedSlide.title}
                </h2>
                <p
                  className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl text-white/75 tracking-wider max-w-lg"
                  style={{ fontFamily: "var(--font-sans), sans-serif" }}
                >
                  {selectedSlide.subtitle}
                </p>
                <div className="w-12 h-px mt-5" style={{ background: selectedSlide.accent }} />
              </motion.div>

              {/* Close button */}
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); setSelected(null); }}
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
