/**
 * Shared layout tokens: full-width surfaces vs controlled inner content.
 *
 * Outer sections stay `w-full` (backgrounds edge-to-edge).
 * Inner shells use modest edge padding only — no max-width centering,
 * so wide desktops do not grow huge empty side gutters.
 * Constrain readable prose with max-w-3xl / max-w-[720px] on the text itself.
 */
export const CONTENT_SHELL =
  "w-full min-w-0 px-5 sm:px-8 lg:px-10 xl:px-12";

/** Hero text column: same horizontal inset as CONTENT_SHELL so logo ↔ headline align. */
export const HERO_TEXT_PAD =
  "px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16 xl:px-12";
