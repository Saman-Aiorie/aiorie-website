"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { heroSlides } from "@/components/hero-slides";
import { useHeroSlide } from "@/components/hero-slide-context";

const IMAGE_TRANSITION = { duration: 0.45, ease: "easeOut" as const };

export function HeroSlideImage() {
  const { activeIndex } = useHeroSlide();
  const slide = heroSlides[activeIndex];
  const reduceMotion = useReducedMotion();
  const imageTransition = reduceMotion ? { duration: 0 } : IMAGE_TRANSITION;

  return (
    <section className="flex w-full justify-center bg-gray-50 py-20">
      <div className="w-full max-w-6xl px-6">
        {/* Fixed aspect prevents vertical layout shift when slides use different image dimensions */}
        <div className="relative aspect-[5/3] w-full overflow-hidden rounded-2xl shadow-xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={activeIndex}
              src={slide.imageSrc}
              alt={slide.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
              transition={imageTransition}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
