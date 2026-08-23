/**
 * Shared layout tokens: full-width surfaces vs controlled inner content.
 * Outer sections should be `w-full` (backgrounds edge-to-edge).
 * Inner content uses CONTENT_SHELL so header / body / footer align.
 */
export const CONTENT_SHELL =
  "mx-auto w-full min-w-0 max-w-[1600px] px-6 sm:px-8 lg:px-12 2xl:px-16";

/** Left-column padding that aligns with CONTENT_SHELL on ultra-wide viewports. */
export const HERO_TEXT_PAD =
  "px-6 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16 xl:px-16 2xl:pl-[max(4rem,calc((100vw-1600px)/2))] 2xl:pr-12";
