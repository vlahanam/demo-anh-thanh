"use client";

import { motion } from "framer-motion";
import { STORY_5_SLIDES } from "@/data/story-5-slides";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  targetIndex: number;
  onComplete: () => void;
}

export default function Story5GridOverlay({ targetIndex, onComplete }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {/* Grid of all slides */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 md:gap-3 w-[85vw] h-[75vh]">
        {STORY_5_SLIDES.map((slide, i) => (
          <motion.div
            key={slide.id}
            className="relative rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              i === targetIndex
                ? {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.4, delay: 0.3, ease: EASE },
                  }
                : {
                    opacity: 0.4,
                    scale: 1,
                    transition: { duration: 0.4, delay: i * 0.04, ease: EASE },
                  }
            }
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/30" />
            {/* Slide number */}
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/60">
              {String(i + 1).padStart(2, "0")}
            </div>
            {/* Highlight border for target */}
            {i === targetIndex && (
              <motion.div
                className="absolute inset-0 rounded-lg"
                initial={{ boxShadow: "inset 0 0 0 0px transparent" }}
                animate={{
                  boxShadow: `inset 0 0 0 3px ${slide.accent}`,
                }}
                transition={{ duration: 0.3, delay: 0.5, ease: EASE }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* After grid shows, zoom into target slide */}
      <motion.div
        className="fixed inset-0 z-[51] overflow-hidden rounded-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2, ease: EASE }}
        onAnimationComplete={onComplete}
      >
        <img
          src={STORY_5_SLIDES[targetIndex].image}
          alt={STORY_5_SLIDES[targetIndex].title}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/20" />
      </motion.div>
    </motion.div>
  );
}
