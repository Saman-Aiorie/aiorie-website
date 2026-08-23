import Link from "next/link";

import { PAGE_SHELL } from "@/components/site-constants";

export function SiteFooter() {
  return (
    <footer className="w-full max-w-full border-t border-slate-200 bg-white">
      <div
        className={`${PAGE_SHELL} flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between lg:py-8`}
      >
        <p className="max-w-3xl text-xs leading-relaxed text-slate-500">
          © 2026 AIORIE Pty Ltd · ABN 47 694 210 056 · All rights reserved
        </p>
        <div className="flex shrink-0 gap-6 text-sm text-slate-500">
          <Link href="/privacy" className="transition hover:text-slate-700">
            Privacy
          </Link>
          <Link href="/terms" className="transition hover:text-slate-700">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
