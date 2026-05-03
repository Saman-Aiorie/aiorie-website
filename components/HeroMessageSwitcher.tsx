"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { heroSlides } from "@/components/hero-slides";
import { useHeroSlide } from "@/components/hero-slide-context";

const TEXT_TRANSITION = { duration: 0.35, ease: "easeOut" as const };

export function HeroMessageSwitcher() {
  const { activeIndex, setActiveIndex } = useHeroSlide();
  const reduceMotion = useReducedMotion();
  const slide = heroSlides[activeIndex];
  const textTransition = reduceMotion ? { duration: 0 } : TEXT_TRANSITION;

  return (
    <>
      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={textTransition}
            className="w-full"
          >
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{slide.description}</p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">{slide.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Hero message ${index + 1} of ${heroSlides.length}`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={`h-3 w-3 shrink-0 rounded-full transition-all duration-300 ease-out ${
              activeIndex === index
                ? "scale-110 bg-blue-600"
                : "scale-100 bg-gray-300 hover:bg-gray-400/90"
            }`}
          />
        ))}
      </div>
    </>
  );
}
