"use client";

import { useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { STORY_5_SLIDES } from "@/data/story-5-slides";
import { useSlideNavigation } from "./use-slide-navigation";
import Story5SlideContent from "./story-5-slide-content";

const TOTAL = STORY_5_SLIDES.length;
const AUTOPLAY_DELAY = 3000;

export default function Story5Slider() {
  const {
    activeIndex, isPaused, transition,
    goTo, pauseAndResume,
  } = useSlideNavigation(TOTAL, AUTOPLAY_DELAY);

  const shouldReduceMotion = useReducedMotion();
  const current = STORY_5_SLIDES[activeIndex] || STORY_5_SLIDES[0];

  // Touch swipe
  const touchStart = useRef(0);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) < 50) return;
    pauseAndResume();
    if (diff > 0) goTo(activeIndex + 1);
    else goTo(activeIndex - 1);
  }, [activeIndex, goTo, pauseAndResume]);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-black"
      style={{ perspective: "1200px" }}
      role="region"
      aria-label="Trình chiếu câu chuyện"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slide with random transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          variants={transition.variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={current.image}
            alt={current.title}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content overlay */}
      <Story5SlideContent slide={current} />

      {/* Slide counter */}
      <div className="absolute top-6 right-6 md:right-16 z-20">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeIndex}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="text-xs tracking-[0.3em] uppercase text-white/30 font-mono"
          >
            {String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {STORY_5_SLIDES.map((s, i) => (
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
                width: 6,
                height: i === activeIndex ? 20 : 6,
                background: i === activeIndex ? current.accent : "rgba(255,255,255,0.2)",
                boxShadow: i === activeIndex ? `0 0 8px ${current.accent}60` : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* Autoplay progress bar */}
      {!isPaused && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.75 bg-white/5">
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

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/20 text-[10px] tracking-widest uppercase font-mono"
        animate={shouldReduceMotion ? {} : { opacity: [0.2, 0.5, 0.2] }}
        transition={shouldReduceMotion ? {} : { duration: 2.5, repeat: Infinity }}
      >
        ↓ Cuộn xuống
      </motion.div>

    </div>
  );
}
