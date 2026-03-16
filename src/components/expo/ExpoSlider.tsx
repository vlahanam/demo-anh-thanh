"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay, FreeMode } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";
import { SLIDES } from "@/data/slides";

import "swiper/css";

function applyExpoTransform(swiper: SwiperType) {
  const isVertical = swiper.params.direction === "vertical";
  for (let i = 0; i < swiper.slides.length; i++) {
    const el = swiper.slides[i] as HTMLElement;
    const progress = (el as unknown as { progress: number }).progress;
    const abs = Math.abs(progress);

    const scale = Math.max(0.65, 1 - abs * 0.15);
    const opacity = Math.max(0.25, 1 - abs * 0.4);
    const blur = Math.min(abs * 3, 6);

    if (isVertical) {
      const translateY = progress * 25;
      const rotateX = progress * 6;
      el.style.transform = `perspective(1200px) translateY(${translateY}%) rotateX(${rotateX}deg) scale(${scale})`;
    } else {
      const translateZ = -abs * 120;
      const translateX = progress * 35;
      const rotateY = progress * -8;
      el.style.transform = `perspective(1200px) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
    }

    el.style.opacity = String(opacity);
    el.style.filter = abs < 0.1 ? "none" : `blur(${blur}px)`;
    el.style.zIndex = String(100 - Math.round(abs * 10));
  }
}

function applyTransition(swiper: SwiperType, duration: number) {
  for (let i = 0; i < swiper.slides.length; i++) {
    (swiper.slides[i] as HTMLElement).style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), filter ${duration}ms ease-out`;
  }
}

export default function ExpoSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let holdTimer: ReturnType<typeof setInterval> | null = null;
    let holdKey: string | null = null;
    let repeatCount = 0;

    const slide = (key: string) => {
      if (!swiperRef.current) return;
      if (key === "ArrowRight" || key === "ArrowDown") {
        swiperRef.current.slideNext();
      } else {
        swiperRef.current.slidePrev();
      }
    };

    const getInterval = (count: number) => {
      if (count < 3) return 400;
      if (count < 6) return 250;
      if (count < 10) return 150;
      return 80;
    };

    const scheduleNext = () => {
      if (!holdKey) return;
      repeatCount++;
      holdTimer = setTimeout(() => {
        slide(holdKey!);
        scheduleNext();
      }, getInterval(repeatCount));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const isArrow = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key);
      if (!isArrow) return;
      holdKey = e.key;
      repeatCount = 0;
      slide(e.key);
      scheduleNext();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === holdKey) {
        holdKey = null;
        if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (holdTimer) clearTimeout(holdTimer);
    };
  }, []);

  const currentSlide = SLIDES[activeSlide] || SLIDES[0];

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1a0e0a 0%, #12090a 25%, #0c0c14 55%, #080810 100%)",
      }}
    >
      {/* ── Background: dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Background: trống đồng SVG — pinned to top, large, partially cropped ── */}
      <motion.div
        className="absolute pointer-events-none z-0"
        style={{
          width: "50vw",
          height: "50vw",
          left: "50%",
          top: "-18vw",
          marginLeft: "-25vw",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full opacity-[0.08]"
          style={{
            backgroundImage: "url(/trongdong.svg)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </motion.div>

      {/* ── Warm vignette top ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse at 50% -10%, rgba(180,100,50,0.06) 0%, transparent 50%)",
        }}
      />

      {/* ── Background: accent glow ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          className="absolute inset-0 pointer-events-none z-[1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${currentSlide.accent}08 0%, transparent 60%)`,
          }}
        />
      </AnimatePresence>

      {/* ── Top info ── */}
      <div className="absolute top-6 left-0 right-0 z-30 text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-white/25 font-mono">
              {String(activeSlide + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Swiper — centered full page ── */}
      <div className={`absolute inset-0 flex items-center justify-center z-10 ${isMobile ? "px-4" : ""}`}
        style={isMobile ? { top: "10vh", bottom: "10vh", height: "80vh" } : undefined}
      >
        <Swiper
          key={isMobile ? "v" : "h"}
          direction={isMobile ? "vertical" : "horizontal"}
          onSwiper={(s) => { swiperRef.current = s; applyExpoTransform(s); }}
          onProgress={(s) => applyExpoTransform(s)}
          onSetTransition={(s, d) => applyTransition(s, d)}
          onSlideChange={(s) => { setActiveSlide(s.realIndex); applyExpoTransform(s); }}
          centeredSlides
          loop
          grabCursor
          speed={900}
          watchSlidesProgress
          modules={[Mousewheel, Autoplay, FreeMode]}
          freeMode={{ enabled: true, sticky: true, momentumRatio: 0.25, momentumBounceRatio: 0.3, momentumVelocityRatio: 0.6 }}
          mousewheel={{ sensitivity: 0.6, forceToAxis: true, thresholdDelta: 8, releaseOnEdges: true }}
          touchRatio={1}
          longSwipesRatio={0.3}
          longSwipesMs={200}
          followFinger
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={isMobile ? {
            0: { slidesPerView: 2.2, spaceBetween: 14 },
            480: { slidesPerView: 2.5, spaceBetween: 16 },
          } : {
            0: { slidesPerView: 1.05, spaceBetween: 12 },
            640: { slidesPerView: 1.2, spaceBetween: 16 },
            1024: { slidesPerView: 1.6, spaceBetween: 24 },
            1400: { slidesPerView: 2, spaceBetween: 32 },
          }}
          className="w-full"
          style={{ overflow: "visible", ...(isMobile ? { height: "100%" } : {}) }}
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer group">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <div
                    className="w-10 h-[1px] mb-4 transition-all duration-500 group-hover:w-16"
                    style={{ background: slide.accent }}
                  />
                  <h3
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-wide leading-snug"
                    style={{
                      fontFamily: "var(--font-serif), Georgia, serif",
                      textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                    }}
                  >
                    {slide.title}
                  </h3>
                  <p
                    className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl text-white/70 tracking-wider max-w-lg"
                    style={{ fontFamily: "var(--font-sans), sans-serif" }}
                  >
                    {slide.subtitle}
                  </p>
                  <div
                    className="w-10 h-[1px] mt-4 transition-all duration-500 group-hover:w-16"
                    style={{ background: slide.accent }}
                  />
                </div>
                <div
                  className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold backdrop-blur-sm"
                  style={{ background: `${slide.accent}25`, color: slide.accent, border: `1px solid ${slide.accent}40` }}
                >
                  {String(slide.id).padStart(2, "0")}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Bottom info ── */}
      <div className="absolute bottom-10 left-0 right-0 z-30 text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-1"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              {currentSlide.title}
            </h2>
            <p className="text-sm md:text-base text-white/40">{currentSlide.subtitle}</p>
            <div className="mx-auto mt-3 w-12 h-0.5 rounded-full" style={{ background: currentSlide.accent }} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Pagination dots ── */}
      <div className={`absolute z-30 flex gap-1.5 ${
        isMobile ? "hidden" : "bottom-4 left-1/2 -translate-x-1/2 flex-row"
      }`}>
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className="transition-all duration-300"
            aria-label={`Slide ${i + 1}`}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === activeSlide ? 20 : 6,
                height: 6,
                background: i === activeSlide ? currentSlide.accent : "rgba(255,255,255,0.15)",
                boxShadow: i === activeSlide ? `0 0 8px ${currentSlide.accent}60` : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        className="absolute z-30 text-white/15 text-[10px] tracking-wider uppercase"
        style={isMobile ? { bottom: 50, left: "50%", transform: "translateX(-50%)" } : { bottom: 16, right: 20 }}
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {isMobile ? "↓ Vuốt" : "Scroll →"}
      </motion.div>
    </div>
  );
}
