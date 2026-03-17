import type { Variants } from "framer-motion";

type TransitionEffect = {
  name: string;
  variants: Variants;
};

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const SLIDE_TRANSITIONS: TransitionEffect[] = [
  {
    name: "slideDown",
    variants: {
      enter: { y: "-100%", opacity: 0 },
      center: { y: 0, opacity: 1, transition: { duration: 1.2, ease: EASE } },
      exit: { y: "100%", opacity: 0, transition: { duration: 0.8, ease: EASE } },
    },
  },
  {
    name: "slideUp",
    variants: {
      enter: { y: "100%", opacity: 0 },
      center: { y: 0, opacity: 1, transition: { duration: 1.2, ease: EASE } },
      exit: { y: "-100%", opacity: 0, transition: { duration: 0.8, ease: EASE } },
    },
  },
  {
    name: "slideLeft",
    variants: {
      enter: { x: "100%", opacity: 0 },
      center: { x: 0, opacity: 1, transition: { duration: 1.2, ease: EASE } },
      exit: { x: "-100%", opacity: 0, transition: { duration: 0.8, ease: EASE } },
    },
  },
  {
    name: "slideRight",
    variants: {
      enter: { x: "-100%", opacity: 0 },
      center: { x: 0, opacity: 1, transition: { duration: 1.2, ease: EASE } },
      exit: { x: "100%", opacity: 0, transition: { duration: 0.8, ease: EASE } },
    },
  },
  {
    name: "flipHorizontal",
    variants: {
      enter: { rotateY: 90, opacity: 0 },
      center: { rotateY: 0, opacity: 1, transition: { duration: 1.4, ease: EASE } },
      exit: { rotateY: -90, opacity: 0, transition: { duration: 0.8, ease: EASE } },
    },
  },
  {
    name: "flipVertical",
    variants: {
      enter: { rotateX: -90, opacity: 0 },
      center: { rotateX: 0, opacity: 1, transition: { duration: 1.4, ease: EASE } },
      exit: { rotateX: 90, opacity: 0, transition: { duration: 0.8, ease: EASE } },
    },
  },
  {
    name: "zoomFade",
    variants: {
      enter: { scale: 0.6, opacity: 0 },
      center: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: EASE } },
      exit: { scale: 1.2, opacity: 0, transition: { duration: 0.8, ease: EASE } },
    },
  },
  {
    name: "crossfade",
    variants: {
      enter: { opacity: 0 },
      center: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
      exit: { opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    },
  },
  {
    name: "diagonal",
    variants: {
      enter: { x: "40%", y: "-40%", opacity: 0, scale: 0.9 },
      center: { x: 0, y: 0, opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE } },
      exit: { x: "-40%", y: "40%", opacity: 0, scale: 0.9, transition: { duration: 0.8, ease: EASE } },
    },
  },
];

let lastUsed = -1;

export function getRandomTransition(): TransitionEffect {
  let idx = Math.floor(Math.random() * SLIDE_TRANSITIONS.length);
  if (idx === lastUsed) idx = (idx + 1) % SLIDE_TRANSITIONS.length;
  lastUsed = idx;
  return SLIDE_TRANSITIONS[idx];
}
