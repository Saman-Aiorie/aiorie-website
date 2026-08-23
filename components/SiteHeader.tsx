"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { NAV_ITEMS, isLabsSubmenu, productHref, sectionHref, type NavItem } from "@/components/nav-links";

const NAV_LINK_CLASS =
  "rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 ease-out hover:-translate-y-px hover:bg-[rgba(37,99,235,0.12)] hover:text-slate-900 hover:shadow-[0_4px_14px_-4px_rgba(37,99,235,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/35 focus-visible:ring-offset-2";

const SUBMENU_LINK_CLASS =
  "block rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-[rgba(37,99,235,0.08)] hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/35 focus-visible:ring-inset";

const CTA_CLASS =
  "shrink-0 rounded-xl bg-blue-600 px-2.5 py-2 text-[11px] font-semibold leading-tight text-white shadow-[0_6px_18px_rgba(37,99,235,0.25)] transition-all duration-300 ease-out hover:-translate-y-px hover:bg-blue-700 hover:shadow-[0_10px_26px_rgba(37,99,235,0.38)] sm:px-4 sm:py-2.5 sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/45 focus-visible:ring-offset-2";

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type SiteHeaderProps = {
  /** When true, section links (Services, About, etc.) use in-page anchors. */
  onHomepage?: boolean;
  shellClassName: string;
};

export function SiteHeader({ onHomepage = false, shellClassName }: SiteHeaderProps) {
  const [labsOpen, setLabsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLabsOpen, setMobileLabsOpen] = useState(false);
  const labsContainerRef = useRef<HTMLDivElement>(null);
  const labsTriggerRef = useRef<HTMLButtonElement>(null);
  const labsMenuRef = useRef<HTMLDivElement>(null);
  const labsMenuId = useId();
  const mobileMenuId = useId();

  const contactHref = sectionHref("contact", onHomepage);

  const closeLabs = useCallback(() => setLabsOpen(false), []);
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileLabsOpen(false);
  }, []);

  useEffect(() => {
    if (!labsOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (labsContainerRef.current?.contains(event.target as Node)) return;
      closeLabs();
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [labsOpen, closeLabs]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (labsOpen) {
          event.preventDefault();
          closeLabs();
          labsTriggerRef.current?.focus();
        }
        if (mobileOpen) closeMobile();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [labsOpen, mobileOpen, closeLabs, closeMobile]);

  const toggleLabs = () => setLabsOpen((open) => !open);

  const focusFirstLabsItem = () => {
    requestAnimationFrame(() => {
      labsMenuRef.current?.querySelector<HTMLElement>("a[role='menuitem']")?.focus();
    });
  };

  const onLabsTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (labsOpen) {
        closeLabs();
      } else {
        setLabsOpen(true);
        focusFirstLabsItem();
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!labsOpen) setLabsOpen(true);
      focusFirstLabsItem();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeLabs();
    }
  };

  const onLabsMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeLabs();
      labsTriggerRef.current?.focus();
    }
  };

  const onMobileLabsKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setMobileLabsOpen((open) => !open);
    }
  };

  const renderDesktopItem = (item: NavItem) => {
    if (isLabsSubmenu(item)) {
      return (
        <div
          key={item.label}
          ref={labsContainerRef}
          className="relative"
          onFocusCapture={() => setLabsOpen(true)}
          onBlurCapture={(event) => {
            const next = event.relatedTarget as Node | null;
            if (next && labsContainerRef.current?.contains(next)) return;
            closeLabs();
          }}
        >
          <button
            ref={labsTriggerRef}
            type="button"
            id={`${labsMenuId}-trigger`}
            aria-haspopup="true"
            aria-expanded={labsOpen}
            aria-controls={labsMenuId}
            aria-label="AIORIE Labs products menu"
            onClick={toggleLabs}
            onKeyDown={onLabsTriggerKeyDown}
            className={`inline-flex items-center gap-1 ${NAV_LINK_CLASS}`}
          >
            AIORIE Labs
            <ChevronDown open={labsOpen} />
          </button>
          {labsOpen ? (
            <div
              ref={labsMenuRef}
              id={labsMenuId}
              role="menu"
              aria-labelledby={`${labsMenuId}-trigger`}
              onKeyDown={onLabsMenuKeyDown}
              className="absolute left-0 top-full z-50 mt-1 min-w-[12.5rem] rounded-lg border border-slate-200/90 bg-white py-1 shadow-sm"
            >
              {item.submenu.map((link) => (
                <a
                  key={link.segment}
                  role="menuitem"
                  href={productHref(link.segment)}
                  className={SUBMENU_LINK_CLASS}
                  onClick={closeLabs}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <a key={item.label} href={sectionHref(item.segment, onHomepage)} className={NAV_LINK_CLASS}>
        {item.label}
      </a>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full max-w-full border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className={`${shellClassName} flex items-center justify-between gap-2 py-4 sm:gap-4`}>
        <Link
          href="/"
          className="flex min-w-0 max-w-full flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3"
        >
          <Image
            src="/AIORIE.jpeg"
            alt="AIORIE"
            width={384}
            height={256}
            className="h-8 w-auto max-w-[min(100%,7.5rem)] object-contain object-left sm:h-9 sm:max-w-[min(100%,12rem)] md:max-w-[13.5rem]"
            priority
            sizes="(max-width: 640px) 120px, 216px"
          />
          <span className="max-w-full break-words text-[11px] leading-snug text-slate-500 sm:max-w-[11rem] sm:border-l sm:border-slate-200 sm:pl-3 md:max-w-none">
            Manufacturing Systems & Optimization
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center gap-6 lg:gap-8 md:flex" aria-label="Main">
          {NAV_ITEMS.map(renderDesktopItem)}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/35 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path strokeLinecap="round" d="M4 7h16" />
                  <path strokeLinecap="round" d="M4 12h16" />
                  <path strokeLinecap="round" d="M4 17h16" />
                </>
              )}
            </svg>
          </button>

          <a href={contactHref} className={CTA_CLASS}>
            Request Consultation
          </a>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          id={mobileMenuId}
          aria-label="Main mobile"
          className="border-t border-slate-200/80 bg-white md:hidden"
        >
          <div className={`${shellClassName} flex flex-col gap-1 py-3`}>
            {NAV_ITEMS.map((item) => {
              if (isLabsSubmenu(item)) {
                const panelId = `${mobileMenuId}-labs-panel`;
                return (
                  <div key={item.label} className="min-w-0">
                    <button
                      type="button"
                      aria-expanded={mobileLabsOpen}
                      aria-haspopup="true"
                      aria-controls={panelId}
                      aria-label="AIORIE Labs products menu"
                      className="flex w-full min-w-0 items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/35"
                      onClick={() => setMobileLabsOpen((open) => !open)}
                      onKeyDown={onMobileLabsKeyDown}
                    >
                      AIORIE Labs
                      <ChevronDown open={mobileLabsOpen} />
                    </button>
                    {mobileLabsOpen ? (
                      <div id={panelId} className="mb-1 flex flex-col gap-0.5 pl-3">
                        {item.submenu.map((link) => (
                          <a
                            key={link.segment}
                            href={productHref(link.segment)}
                            className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/35"
                            onClick={closeMobile}
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={sectionHref(item.segment, onHomepage)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/35"
                  onClick={closeMobile}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
