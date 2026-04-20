import Image from "next/image";
import Link from "next/link";

import { CognitumPreview } from "@/components/CognitumPreview";
import { PartnerEcosystemStrip } from "@/components/PartnerEcosystemStrip";

/** Override with NEXT_PUBLIC_CALENDLY_URL in `.env.local` if the booking link changes. */
const DEFAULT_CALENDLY_URL = "https://calendly.com/saman-aiorie/30min";
const FREE_SESSION_HREF =
  process.env.NEXT_PUBLIC_CALENDLY_URL &&
  /^https?:\/\//i.test(process.env.NEXT_PUBLIC_CALENDLY_URL)
    ? process.env.NEXT_PUBLIC_CALENDLY_URL
    : DEFAULT_CALENDLY_URL;

export default function Home() {
  const consultingServices = [
    {
      title: "IFS.ai Cloud ERP Consulting",
      points: [
        "IFS manufacturing, project and supply chain expertise",
        "IFS.ai MSO Manufacturing Scheduling and Optimization - support",
        "IFS.ai upgrade expertise",
        "IFS Integration and Configuration",
      ],
    },
    {
      title: "Manufacturing Planning & Scheduling Advisory",
      points: [
        "Master Scheduling and S&OP support",
        "Finite scheduling and APS design",
        "Constraint modelling and resource analysis",
        "Bottleneck identification and schedule reliability improvement",
      ],
    },
    {
      title: "Optimization & Custom Solutions",
      points: [
        "Operational optimization modelling",
        "Scenario-based planning approaches",
        "Decision-support solution design",
        "Targeted solutions where standard ERP functionality falls short",
      ],
    },
  ];

  const industries = [
    "Discrete Manufacturing",
    "Project-Based Manufacturing",
    "Engineer-to-Order Manufacturing",
    "Repetitive Manufacturing",
  ];

  const strengths = [
    "Deep IFS and manufacturing systems knowledge",
    "Practical planning and scheduling expertise",
    "Optimization-focused thinking",
    "Solutions grounded in real operational constraints",
  ];

  const nav = ["Services", "Industries", "Cognitum APS", "About", "Contact"];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900">
      <header className="sticky top-0 z-50 w-full max-w-full border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex min-w-0 max-w-7xl items-center justify-between gap-2 px-4 py-4 sm:gap-4 sm:px-6 lg:px-8">
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

          <nav className="hidden min-w-0 items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="shrink-0 rounded-xl bg-blue-600 px-2.5 py-2 text-[11px] font-semibold leading-tight text-white shadow-sm transition hover:bg-blue-700 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            Request Consultation
          </a>
        </div>
      </header>

      <main className="w-full min-w-0 max-w-full">
        <section className="relative w-full max-w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-blue-50 to-slate-100" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.18),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.12),_transparent_40%)]" />
        
        <div className="mx-auto grid min-w-0 max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pb-20 lg:pt-12">
            <div className="relative z-10 min-w-0 max-w-full">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 backdrop-blur px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
  AI • Operations Research • Industrial Engineering
</div>

              <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                Manufacturing Systems, Planning & Scheduling Expertise
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                AIORIE helps organizations improve manufacturing planning, scheduling, and ERP-driven operations — combining deep IFS expertise with advanced optimization capabilities.
              </p>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
                We bring together practical manufacturing knowledge, enterprise systems experience, and advanced scheduling insight to address planning challenges that standard approaches often fail to resolve effectively. We also provide the expertise and tools required to solve complex manufacturing operational challenges.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                {[
                  {
                    title: "IFS.ai Cloud ERP Consulting",
                    cardClass: "border-[#360065]/35 bg-[#f5f2fa]",
                    titleClass: "text-[#360065]",
                  },
                  {
                    title: "Planning & Scheduling Advisory",
                    cardClass: "border-emerald-200 bg-emerald-50",
                    titleClass: "text-emerald-950",
                  },
                  {
                    title: "NEEDLU Solution Integrator",
                    cardClass: "border-indigo-200 bg-indigo-50",
                    titleClass: "text-indigo-950",
                  },
                  {
                    title: "Cognitum APS",
                    href: "#cognitum-aps",
                    cardClass: "border-sky-200 bg-sky-50 hover:border-sky-300 hover:bg-sky-100",
                    titleClass: "text-sky-950",
                  },
                ].map((item) =>
                  item.href ? (
                    <a
                      key={item.title}
                      href={item.href}
                      className={`block rounded-2xl border px-4 py-4 shadow-sm transition ${item.cardClass}`}
                    >
                      <div className={`text-sm font-semibold ${item.titleClass}`}>{item.title}</div>
                    </a>
                  ) : (
                    <div key={item.title} className={`rounded-2xl border px-4 py-4 shadow-sm ${item.cardClass}`}>
                      <div className={`text-sm font-semibold ${item.titleClass}`}>{item.title}</div>
                    </div>
                  ),
                )}
              </div>

              {/* Editorial credibility — no card; light typography + left accent */}
              <div className="mt-8 border-t border-slate-200/80 pt-8 lg:mt-10 lg:pt-10">
                <div className="border-l-2 border-blue-600/35 pl-5 sm:pl-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Why AIORIE
                  </p>
                  <h2 className="mt-2 max-w-xl text-xl font-semibold tracking-tight text-slate-950 sm:text-[1.35rem] sm:leading-snug">
                    Built on Practical Manufacturing, Planning, and ERP Experience
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                    AIORIE is shaped by a practical understanding of manufacturing operations, planning,
                    enterprise systems, and implementation reality. The focus is not only on what systems
                    can do in theory, but on how planning, scheduling, and decision making actually work in
                    live operational environments.
                  </p>
                  <div className="mt-5 max-w-xl divide-y divide-slate-200/90 border-t border-slate-200/90">
                    {[
                      "Engineering-grounded understanding of manufacturing environments",
                      "Practical planning and scheduling perspective",
                      "Long-term ERP and enterprise systems experience",
                      "Delivery-focused thinking shaped by real implementation contexts",
                    ].map((line) => (
                      <p
                        key={line}
                        className="py-2.5 text-[13px] leading-snug text-slate-600 first:pt-0 last:pb-0"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex min-w-0 max-w-full flex-col gap-5">
              <div className="max-w-full rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_80px_-20px_rgba(15,23,42,0.18)]">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">AIORIE Capability Snapshot</div>
                      <div className="text-xs text-slate-500">Consulting, scheduling, optimization, and products</div>
                    </div>
                    <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      Enterprise Focus
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                          Consulting
                        </div>
                        <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                          <li>IFS advisory</li>
                          <li>Manufacturing process alignment</li>
                          <li>Scheduling strategy and design</li>
                          <li>Constraint and capacity analysis</li>
                        </ul>
                      </div>

                      <div className="max-w-full rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                          Planning Outcomes
                        </div>
                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {[
                            ["Reliability", "Higher"],
                            ["Nervousness", "Lower"],
                            ["Visibility", "Improved"],
                            ["Control", "Stronger"],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-xl bg-slate-50 p-3">
                              <div className="text-xs text-slate-500">{label}</div>
                              <div className="mt-1 text-base font-semibold text-slate-900">{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                      <div className="text-sm font-semibold text-slate-900">Cognitum APS</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Our flagship APS product brings visual scheduling, scenario analysis, and optimization-focused workflow into a modern browser-based workbench.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <CognitumPreview />
              <PartnerEcosystemStrip />
            </div>
          </div>
        </section>

        <section
          id="services"
          className="border-y border-slate-200 bg-slate-50/80 py-16 lg:py-20"
        >
          <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
                Services
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Consulting and solution capabilities designed for real manufacturing complexity.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                AIORIE supports manufacturers and operations teams with practical expertise across ERP, planning, scheduling, and optimization-driven improvement.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {consultingServices.map((service) => (
                <div key={service.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-950">{service.title}</h3>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" className="py-16 lg:py-20">
          <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
                Industries
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Designed for industries with high manufacturing and delivery complexity.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Our work is most valuable in environments where planning decisions, resource constraints, and execution quality directly shape business performance.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((industry) => (
                <div key={industry} className="rounded-3xl border border-slate-200 bg-white p-6 text-lg font-medium text-slate-900 shadow-sm">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cognitum-aps" className="bg-slate-950 py-16 text-white lg:py-20">
          <div className="mx-auto grid min-w-0 max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-8">
            <div className="min-w-0 max-w-full">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
                Interactive Finite Optimization Platform
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                <span className="inline-flex items-center gap-3">
                  <Image
                    src="/aiorie-symbol-dark.png"
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-sm bg-white p-0.5 object-contain"
                    aria-hidden
                  />
                  <span>Cognitum APS</span>
                </span>
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                A next-generation, browser-based Advanced Planning & Scheduling workbench designed for real-world manufacturing complexity.
              </p>
              <p className="mt-3 text-base leading-7 text-slate-400">
                Cognitum APS is one of AIORIE’s core product investments. It extends our consulting and optimization capability into a modern planning platform built for visibility, control, and scenario-driven decision support.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  "Visual scheduling workspace",
                  "Scenario planning",
                  "Optimization-first approach",
                  "Future-ready APS platform",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="min-w-0 max-w-full rounded-[28px] border border-slate-800 bg-slate-900 p-6 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.45)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Visual Workspace", "Context-driven planning surface"],
                  ["Scenario Editing", "Safe what-if analysis"],
                  ["Optimization", "Solver-backed schedule improvement"],
                  ["Planner Control", "Fast, fluid browser interaction"],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-2xl bg-slate-800 p-5">
                    <div className="text-base font-semibold text-white">{title}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-300">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 lg:py-20">
          <div className="mx-auto grid min-w-0 max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
            <div className="min-w-0 max-w-full">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
                About AIORIE
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Practical expertise grounded in enterprise manufacturing reality.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                AIORIE was founded to solve a persistent problem: the gap between what enterprise systems promise and what operations actually need. We focus on practical outcomes across ERP, scheduling, planning, and optimization — especially in environments where complexity cannot be simplified away.
              </p>
            </div>

            <div className="grid min-w-0 max-w-full gap-4 sm:grid-cols-2">
              {strengths.map((value) => (
                <div key={value} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-lg font-semibold text-slate-900">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-slate-200 bg-blue-600 py-16 text-white lg:py-20">
          <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-10">
              <div className="min-w-0 max-w-full">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100">
                  Contact
                </div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Ready to improve your manufacturing planning capability?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50">
                  Talk to AIORIE about IFS consulting, planning and scheduling improvement, optimization-led solution design, and Cognitum APS.
                </p>

                <address className="mt-7 max-w-md not-italic text-sm leading-7 text-blue-100">
                  <div className="font-semibold text-white">AIORIE Pty Ltd</div>
                  <div>1/14 Ingram Avenue</div>
                  <div>Glen Waverley VIC 3150</div>
                  <div>Australia</div>
                </address>
              </div>

              <div className="flex min-w-0 max-w-full flex-wrap gap-4 lg:justify-end">
                <a
                  href={FREE_SESSION_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Free Session
                </a>
                <a
                  href="mailto:saman@aiorie.com?subject=Cognitum%20APS%20Enquiry"
                  className="rounded-xl border border-blue-300 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full max-w-full border-t border-slate-200 bg-white">
        <div className="mx-auto flex min-w-0 max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-8">
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
    </div>
  );
}