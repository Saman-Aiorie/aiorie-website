import type { Metadata } from "next";
import Link from "next/link";

import { CALENDLY_URL, mailtoHref } from "@/components/contact-links";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PAGE_SHELL, SITE_URL } from "@/components/site-constants";

const PAGE_TITLE = "MRP Planner Assistant | AIORIE Labs";
const PAGE_DESCRIPTION =
  "Prioritise MRP action proposals, review suggested follow-ups and track planner decisions across planning runs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/mrp-planner-assistant`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/mrp-planner-assistant`,
    type: "website",
  },
};

const CAPABILITY_THEMES = [
  "Group shortages, late supply and excess orders",
  "Prioritise exceptions and override suggested urgency",
  "Review the facts behind each suggested follow-up",
  "See earlier decisions when proposals reappear after MRP",
] as const;

export default function MrpPlannerAssistantPage() {
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
                MRP Planner Assistant
              </h1>
              <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                In Development
              </span>
            </div>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              MRP Planner Assistant helps manufacturing planners decide which material requirements planning (MRP) exceptions to review first. A planning lobby groups proposals by issue, and a review queue brings the suggested follow-up, planning facts and decision history together.
            </p>
            <Link
              href="/mrp-planner-assistant/demo"
              className="mt-7 inline-flex rounded-xl bg-[#192e62] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-900 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              MVP Demo
            </Link>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className={PAGE_SHELL}>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              Planner Workflow
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
              The current prototype demonstrates the planner workflow using sample data. Live IFS Cloud integration is in development.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-blue-600 py-16 text-white lg:py-20">
          <div className={`${PAGE_SHELL} max-w-3xl`}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Discuss MRP Planner Assistant</h2>
            <p className="mt-4 text-lg leading-8 text-blue-50">
              Talk to AIORIE about your MRP exception workload and request a walkthrough of the prototype.
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
                href={mailtoHref("MRP Planner Assistant Enquiry")}
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
