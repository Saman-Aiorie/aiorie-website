/** Wider enterprise shell — header + main sections share the same horizontal rhythm. */
export const PAGE_SHELL =
  "mx-auto w-full min-w-0 max-w-[1440px] px-6 lg:px-10 xl:px-16";

/** Legal and secondary pages use a slightly narrower shell. */
export const LEGAL_PAGE_SHELL = "mx-auto min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8";

/** Override with NEXT_PUBLIC_SITE_URL in `.env.local` when deploying. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.aiorie.com";
