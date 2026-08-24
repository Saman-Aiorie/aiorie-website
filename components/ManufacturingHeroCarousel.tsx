"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type FocusEvent } from "react";

export const MANUFACTURING_HERO_SLIDES = [
  {
    src: "/images/manufacturing/factory-team.png",
    width: 1692,
    height: 929,
    alt: "Factory professionals collaborating with automated machinery and a robotic arm on a modern manufacturing floor.",
  },
  {
    src: "/images/manufacturing/cnc-operator.png",
    width: 1672,
    height: 941,
    alt: "A CNC operator in safety glasses adjusting a milling machine while a precision metal part is machined inside.",
  },
  {
    src: "/images/manufacturing/welding-operator.png",
    width: 1613,
    height: 975,
    alt: "A welding operator in protective gear joining a metal assembly, with a bright welding arc visible.",
  },
  {
    src: "/images/manufacturing/jet-engine-inspection.png",
    width: 1779,
    height: 884,
    alt: "Technicians inspecting a jet engine turbine on a stand while reviewing data on tablets.",
  },
  {
    src: "/images/manufacturing/motorcycle-qr-scan.png",
    width: 1693,
    height: 929,
    alt: "A technician scanning a chassis QR code on a motorcycle during factory assembly.",
  },
] as const;

const SLIDE_COUNT = MANUFACTURING_HERO_SLIDES.length;
const DWELL_MS = 7500;
const FADE_MS = 2000;
/** Tallest source frame, so every slide can sit fully visible without cropping. */
const STAGE_ASPECT = `${MANUFACTURING_HERO_SLIDES[2].width} / ${MANUFACTURING_HERO_SLIDES[2].height}`;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function wrapIndex(index: number) {
  return ((index % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;
}

export function ManufacturingHeroCarousel() {
  const labelId = useId();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [incomingOpaque, setIncomingOpaque] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const loadedRef = useRef(new Set<number>([0]));
  const loadWaitersRef = useRef(new Map<number, Array<() => void>>());
  const abortRef = useRef(0);
  const fadeTimerRef = useRef<number | null>(null);

  const clearFadeTimer = useCallback(() => {
    if (fadeTimerRef.current !== null) {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const markLoaded = useCallback((index: number) => {
    loadedRef.current.add(index);
    const waiters = loadWaitersRef.current.get(index);
    if (!waiters) return;
    loadWaitersRef.current.delete(index);
    waiters.forEach((resolve) => resolve());
  }, []);

  const ensureLoaded = useCallback((index: number) => {
    if (loadedRef.current.has(index)) return Promise.resolve();

    return new Promise<void>((resolve) => {
      const waiters = loadWaitersRef.current.get(index) ?? [];
      waiters.push(resolve);
      loadWaitersRef.current.set(index, waiters);
    });
  }, []);

  const showSlide = useCallback(
    async (index: number) => {
      const next = wrapIndex(index);
      const token = ++abortRef.current;

      if (next === currentIndex && incomingIndex === null) {
        setPendingIndex(null);
        return;
      }

      setPendingIndex(next);
      await ensureLoaded(next);
      if (token !== abortRef.current) return;
      setPendingIndex((current) => (current === next ? null : current));

      if (reduceMotion) {
        clearFadeTimer();
        setIncomingIndex(null);
        setIncomingOpaque(false);
        setCurrentIndex(next);
        return;
      }

      clearFadeTimer();
      setIncomingOpaque(false);
      setIncomingIndex(next);

      fadeTimerRef.current = window.setTimeout(() => {
        if (token !== abortRef.current) return;
        setCurrentIndex(next);
        setIncomingIndex(null);
        setIncomingOpaque(false);
        fadeTimerRef.current = null;
      }, FADE_MS);
    },
    [clearFadeTimer, currentIndex, ensureLoaded, incomingIndex, reduceMotion],
  );

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (incomingIndex === null) return;

    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => setIncomingOpaque(true));
    });
    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
    };
  }, [incomingIndex]);

  useEffect(() => {
    if (reduceMotion || paused || incomingIndex !== null) return;

    const dwell = window.setTimeout(() => {
      void showSlide(currentIndex + 1);
    }, DWELL_MS);

    return () => window.clearTimeout(dwell);
  }, [currentIndex, incomingIndex, paused, reduceMotion, showSlide]);

  useEffect(() => {
    return () => {
      abortRef.current += 1;
      if (fadeTimerRef.current !== null) {
        window.clearTimeout(fadeTimerRef.current);
      }
    };
  }, []);

  const pause = useCallback(() => {
    setPaused(true);
  }, []);

  const resume = useCallback(() => {
    setPaused(false);
  }, []);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      const next = event.relatedTarget;
      if (next instanceof Node && event.currentTarget.contains(next)) return;
      resume();
    },
    [resume],
  );

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      className="relative w-full min-w-0"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={handleBlur}
    >
      <p id={labelId} className="sr-only">
        Manufacturing photography
      </p>

      <div className="relative w-full" style={{ aspectRatio: STAGE_ASPECT }}>
        {MANUFACTURING_HERO_SLIDES.map((slide, index) => {
          const isCurrent = index === currentIndex;
          const isIncoming = index === incomingIndex;
          const isPending = index === pendingIndex;
          if (!isCurrent && !isIncoming && !isPending) return null;

          const visible = isCurrent || (isIncoming && incomingOpaque);
          const useDrift = !reduceMotion && (isCurrent || isIncoming);

          return (
            <div
              key={slide.src}
              className={`absolute inset-0 ${useDrift ? "manufacturing-hero-drift" : ""}`}
              style={{
                opacity: visible ? 1 : 0,
                transition: reduceMotion ? "none" : `opacity ${FADE_MS}ms ease-in-out`,
                zIndex: isIncoming ? 2 : isCurrent ? 1 : 0,
              }}
            >
              <Image
                src={slide.src}
                alt={isCurrent ? slide.alt : ""}
                fill
                priority={index === 0}
                sizes="(max-width: 1280px) min(100vw, 1100px), min(52vw, 760px)"
                className="object-contain object-center"
                onLoad={() => markLoaded(index)}
                onError={() => markLoaded(index)}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {MANUFACTURING_HERO_SLIDES.map((slide, index) => {
          const selected = index === (incomingIndex ?? currentIndex);

          return (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show manufacturing image ${index + 1}`}
              aria-current={selected ? "true" : undefined}
              aria-pressed={selected}
              onClick={() => {
                void showSlide(index);
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
            >
              <span
                className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                  selected ? "w-4 bg-slate-600" : "w-1.5 bg-slate-300"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
