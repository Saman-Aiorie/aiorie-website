import type { Metadata } from "next";
import Link from "next/link";

import { CALENDLY_URL, mailtoHref } from "@/components/contact-links";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PAGE_SHELL, SITE_URL } from "@/components/site-constants";

const PAGE_TITLE = "Cognitum QMAN | Manufacturing Quality Direction | AIORIE";
const PAGE_DESCRIPTION =
  "Cognitum QMAN is AIORIE’s emerging manufacturing quality-management solution direction for connected quality workflows across operations and enterprise systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/cognitum-qman`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/cognitum-qman`,
    type: "website",
  },
};

const CAPABILITY_THEMES = [
  "Inspection and control workflows",
  "Non-conformance management",
  "Corrective and preventive action support",
  "Manufacturing traceability",
  "Quality checkpoints and alerts",
  "ERP-connected quality processes",
] as const;

export default function CognitumQmanPage() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900">
      <SiteHeader shellClassName={PAGE_SHELL} />

      <main className="w-full min-w-0 max-w-full">
        <section className="border-b border-slate-200 bg-slate-50/60 py-16 lg:py-20">
          <div className={`${PAGE_SHELL} max-w-3xl`}>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              AIORIE Labs • Product Development
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Cognitum QMAN
              </h1>
              <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                In Development
              </span>
            </div>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Cognitum QMAN is AIORIE’s emerging manufacturing quality-management solution direction,
              focused on connected quality workflows across manufacturing operations and enterprise systems.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className={PAGE_SHELL}>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              Capability Direction
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITY_THEMES.map((theme) => (
                <li
                  key={theme}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 text-slate-700 shadow-sm"
                >
                  {theme}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-3xl text-sm leading-6 text-slate-500">
              Cognitum QMAN remains in early product development. Capability themes describe intended
              direction — not currently available commercial functionality.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-blue-600 py-16 text-white lg:py-20">
          <div className={`${PAGE_SHELL} max-w-3xl`}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Discuss Cognitum QMAN</h2>
            <p className="mt-4 text-lg leading-8 text-blue-50">
              Talk to AIORIE about manufacturing quality workflows, traceability requirements or the
              Cognitum QMAN product direction.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
              >
                Book a Discovery Session
              </a>
              <a
                href={mailtoHref("Cognitum QMAN Enquiry")}
                className="rounded-xl border border-blue-300 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
              >
                Contact AIORIE
              </a>
            </div>
            <p className="mt-6 text-sm text-blue-100">
              <Link href="/" className="underline decoration-blue-200/70 underline-offset-2 hover:text-white">
                Return to AIORIE homepage
              </Link>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
