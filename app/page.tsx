import Image from "next/image";
import Link from "next/link";

import { CognitumPreview } from "@/components/CognitumPreview";
import { CALENDLY_URL, mailtoHref } from "@/components/contact-links";
import { HeroMessageSwitcher } from "@/components/HeroMessageSwitcher";
import { HeroSlideImage } from "@/components/HeroSlideImage";
import { HeroSlideProvider } from "@/components/hero-slide-context";
import { PartnerEcosystemStrip } from "@/components/PartnerEcosystemStrip";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PAGE_SHELL } from "@/components/site-constants";

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

  /** Wider enterprise shell (SAP-style) — header + homepage sections share the same horizontal rhythm. */

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900">
      <SiteHeader onHomepage shellClassName={PAGE_SHELL} />

      <main className="w-full min-w-0 max-w-full">
        <section className="relative w-full max-w-full overflow-hidden">
        {/* Hero-only backdrop: layered amethyst gradients (top → bottom stack in CSS order) */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundColor: "#f2eef9",
            backgroundImage: [
              "radial-gradient(ellipse 110% 80% at 92% -5%, rgba(124, 58, 237, 0.2), transparent 52%)",
              "radial-gradient(ellipse 90% 70% at -8% 102%, rgba(99, 102, 241, 0.14), transparent 56%)",
              "linear-gradient(135deg, rgba(124, 58, 237, 0.16) 0%, rgba(167, 139, 250, 0.09) 32%, rgba(255, 255, 255, 0) 62%)",
              "linear-gradient(305deg, rgba(99, 102, 241, 0.1) 0%, rgba(255, 255, 255, 0) 48%)",
              "linear-gradient(180deg, #fdfcff 0%, #f4effb 42%, #f8f5fc 78%, #faf8ff 100%)",
            ].join(", "),
          }}
        />
        
        <HeroSlideProvider>
        <div className={`${PAGE_SHELL} grid gap-10 pb-16 pt-10 lg:grid-cols-2 lg:gap-12 lg:pb-20 lg:pt-12`}>
            <div className="relative z-10 min-w-0 max-w-full">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 backdrop-blur px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
  AI • Operations Research • Industrial Engineering
</div>

              <HeroMessageSwitcher />

              {/* Editorial credibility — no card; light typography + left accent */}
              <div className="mt-10 border-t border-slate-200/80 pt-8 lg:mt-12 lg:pt-10">
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
              <HeroSlideImage />

              <CognitumPreview />
              <PartnerEcosystemStrip />
            </div>
          </div>
        </HeroSlideProvider>
        </section>

        <section
          id="services"
          className="border-y border-slate-200 bg-slate-50/80 py-16 lg:py-20"
        >
          <div className={PAGE_SHELL}>
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
          <div className={PAGE_SHELL}>
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

        <section id="labs" className="border-t border-slate-200 bg-slate-950 py-16 text-white lg:py-20">
          <div className={PAGE_SHELL}>
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
                AIORIE Labs
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Product development across planning and quality
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                AIORIE Labs brings together emerging product directions in manufacturing scheduling and
                quality management — developed with the same practical manufacturing context as our consulting work.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
                <div className="flex items-center gap-3">
                  <Image
                    src="/aiorie-symbol-dark.png"
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-sm bg-white p-0.5 object-contain"
                    aria-hidden
                  />
                  <h3 className="text-xl font-semibold text-white">Cognitum APS</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Browser-based Advanced Planning and Scheduling workbench direction for complex manufacturing
                  environments — visual constraints, scenario exploration and planner-controlled interaction.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Visual workspace", "Scenario direction", "Finite-capacity planning"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/cognitum-aps"
                  className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  Explore Cognitum APS
                </Link>
              </article>

              <article className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
                <h3 className="text-xl font-semibold text-white">Cognitum QMAN</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  In Development
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Emerging quality-management solution direction for inspections, non-conformances, corrective
                  actions and traceability within connected manufacturing operations.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Quality workflows", "Traceability", "ERP-connected processes"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/cognitum-qman"
                  className="mt-6 inline-flex rounded-xl border border-slate-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  Explore Cognitum QMAN
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 lg:py-20">
          <div className={`${PAGE_SHELL} grid gap-8 lg:grid-cols-2 lg:gap-10`}>
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
          <div className={PAGE_SHELL}>
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
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Free Session
                </a>
                <a
                  href={mailtoHref("Cognitum APS Enquiry")}
                  className="rounded-xl border border-blue-300 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}