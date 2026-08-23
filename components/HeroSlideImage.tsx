"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { heroSlides } from "@/components/hero-slides";
import { useHeroSlide } from "@/components/hero-slide-context";

const IMAGE_TRANSITION = { duration: 0.45, ease: "easeOut" as const };

/**
 * Full-bleed hero visual: fills its parent (absolute inset), object-cover,
 * no card chrome / large radius — edge-aligned enterprise treatment.
 */
export function HeroSlideImage() {
  const { activeIndex } = useHeroSlide();
  const slide = heroSlides[activeIndex];
  const reduceMotion = useReducedMotion();
  const imageTransition = reduceMotion ? { duration: 0 } : IMAGE_TRANSITION;

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-200">
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={activeIndex}
          src={slide.imageSrc}
          alt={slide.imageAlt}
          className="absolute inset-0 h-full w-full rounded-none object-cover"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={imageTransition}
        />
      </AnimatePresence>
    </div>
  );
}
