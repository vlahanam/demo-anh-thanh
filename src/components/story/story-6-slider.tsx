"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STORY_6_SLIDES } from "@/data/story-6-slides";
import { type Direction, getRandomDirection, makeVariants } from "./story-6-transition";
import { LAYOUTS } from "./story-6-layouts";
import Story6TextContent from "./story-6-text-content";

const TOTAL = STORY_6_SLIDES.length;
const AUTOPLAY_DELAY = 4000;

export default function Story6Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>("left");
  const dirRef = useRef<Direction>("left");
  const [isPaused, setIsPaused] = useState(false);

  const current = STORY_6_SLIDES[activeIndex] ?? STORY_6_SLIDES[0];
  const layout = LAYOUTS[activeIndex % LAYOUTS.length];
  const variants = makeVariants(direction);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, index));
    if (clamped === activeIndex) return;
    const newDir = getRandomDirection(dirRef.current);
    dirRef.current = newDir;
    setDirection(newDir);
    setActiveIndex(clamped);
  }, [activeIndex]);

  const pauseAndResume = useCallback(() => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const t = setTimeout(() => {
      goTo(activeIndex === TOTAL - 1 ? 0 : activeIndex + 1);
    }, AUTOPLAY_DELAY);
    return () => clearTimeout(t);
  }, [activeIndex, isPaused, goTo]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  { pauseAndResume(); goTo(activeIndex - 1); }
      if (e.key === "ArrowRight") { pauseAndResume(); goTo(activeIndex + 1); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, goTo, pauseAndResume]);

  const touchStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = touchStart.current.x - e.changedTouches[0].clientX;
    const dy = touchStart.current.y - e.changedTouches[0].clientY;
    if (Math.abs(dx) < 40 && Math.abs(dy) < 40) return;
    pauseAndResume();
    goTo(Math.abs(dx) >= Math.abs(dy)
      ? (dx > 0 ? activeIndex + 1 : activeIndex - 1)
      : (dy > 0 ? activeIndex + 1 : activeIndex - 1));
  }, [activeIndex, goTo, pauseAndResume]);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Trình chiếu câu chuyện"
    >
      {/* Layer 0: Static dark gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, #1a1a2e 0%, #0d0d0d 50%, #000000 100%)",
        }}
      />

      {/* Layer 1: Slide unit */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute z-10"
          style={{
            width: layout.imgWidth,
            height: layout.imgHeight,
            left: layout.imgLeft,
            top: layout.imgTop,
          }}
        >
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover"
            style={{ borderRadius: "4px" }}
            draggable={false}
          />

          {layout.textSide === "overlay-left" && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" style={{ borderRadius: "4px" }} />
              <div className="absolute inset-0 flex items-center pointer-events-none" style={{ paddingLeft: "6%" }}>
                <Story6TextContent slide={current} maxWidth="55%" />
              </div>
            </>
          )}

          {layout.textSide === "overlay-bottom" && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" style={{ borderRadius: "4px" }} />
              <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ padding: "6% 8%" }}>
                <Story6TextContent slide={current} maxWidth="100%" />
              </div>
            </>
          )}
        </motion.div>

        {/* Text panel for "right" layout — outside image box */}
        {layout.textSide === "right" && (
          <motion.div
            key={`text-${activeIndex}`}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-10 flex items-center pointer-events-none"
            style={{
              left: `calc(${layout.imgLeft} + ${layout.imgWidth} + 3vw)`,
              top: layout.imgTop,
              height: layout.imgHeight,
              maxWidth: "26vw",
            }}
          >
            <Story6TextContent slide={current} maxWidth="100%" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer 2: UI chrome */}
      <div className="absolute top-6 right-6 md:right-10 z-20">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-mono">
          {String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </p>
      </div>

      <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {STORY_6_SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { pauseAndResume(); goTo(i); }}
            className="flex items-center justify-center w-6 h-6"
            aria-label={`Slide ${i + 1}`}
            aria-current={i === activeIndex ? "true" : undefined}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: 5,
                height: i === activeIndex ? 20 : 5,
                background: i === activeIndex ? current.accent : "rgba(255,255,255,0.2)",
                boxShadow: i === activeIndex ? `0 0 8px ${current.accent}60` : "none",
              }}
            />
          </button>
        ))}
      </div>

      {!isPaused && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/5">
          <motion.div
            key={activeIndex}
            className="h-full"
            style={{ background: current.accent }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
}
