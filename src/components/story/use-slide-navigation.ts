import { useState, useRef, useEffect, useCallback } from "react";
import { getRandomTransition, SLIDE_TRANSITIONS } from "./story-5-transitions";

const INITIAL_TRANSITION = SLIDE_TRANSITIONS[0];

export function useSlideNavigation(total: number, autoplayDelay: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [transition, setTransition] = useState(INITIAL_TRANSITION);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollLock = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  const goTo = useCallback((idx: number) => {
    const wrapped = ((idx % total) + total) % total;
    if (wrapped === activeIndex || scrollLock.current) return;
    scrollLock.current = true;
    setTransition(getRandomTransition());
    setActiveIndex(wrapped);
    setTimeout(() => { scrollLock.current = false; }, 1300);
  }, [activeIndex, total]);

  const startTimer = useCallback(() => {
    clearTimer();
    if (isPaused) return;
    timerRef.current = setTimeout(() => goTo((activeIndex + 1) % total), autoplayDelay);
  }, [clearTimer, isPaused, activeIndex, total, goTo, autoplayDelay]);

  useEffect(() => { startTimer(); return clearTimer; }, [startTimer, clearTimer]);

  const pauseAndResume = useCallback(() => {
    clearTimer();
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  }, [clearTimer]);

  // Mousewheel
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 30) return;
      pauseAndResume();
      if (e.deltaY > 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [activeIndex, goTo, pauseAndResume]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { pauseAndResume(); goTo(activeIndex + 1); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") { pauseAndResume(); goTo(activeIndex - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, goTo, pauseAndResume]);

  return { activeIndex, isPaused, transition, goTo, pauseAndResume };
}
