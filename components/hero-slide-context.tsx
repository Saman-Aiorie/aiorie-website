"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { heroSlides } from "@/components/hero-slides";

/** Industry-typical dwell before advancing (inactivity / post-interaction). */
const AUTO_DELAY = 6000;

type HeroSlideContextValue = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const HeroSlideContext = createContext<HeroSlideContextValue | null>(null);

export function HeroSlideProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const id = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, AUTO_DELAY);

    return () => {
      window.clearTimeout(id);
    };
  }, [activeIndex, isPaused]);

  const value = useMemo(
    () => ({
      activeIndex,
      setActiveIndex,
    }),
    [activeIndex],
  );

  return (
    <HeroSlideContext.Provider value={value}>
      <div
        className="min-w-0 w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {children}
      </div>
    </HeroSlideContext.Provider>
  );
}

export function useHeroSlide() {
  const ctx = useContext(HeroSlideContext);
  if (!ctx) {
    throw new Error("useHeroSlide must be used within HeroSlideProvider");
  }
  return ctx;
}
