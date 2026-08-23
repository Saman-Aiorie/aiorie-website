import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CognitumPreview } from "@/components/CognitumPreview";
import { CALENDLY_URL, mailtoHref } from "@/components/contact-links";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PAGE_SHELL, SITE_URL } from "@/components/site-constants";

const PAGE_TITLE = "Cognitum APS | Manufacturing Scheduling & Optimization | AIORIE";
const PAGE_DESCRIPTION =
  "Explore Cognitum APS, AIORIE’s emerging browser-based planning and scheduling workbench for manufacturing constraints, scenarios and optimization-focused workflows.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/cognitum-aps`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/cognitum-aps`,
    type: "website",
    images: [
      {
        url: "/aps.png",
        alt: "Cognitum APS advanced planning and scheduling workbench",
      },
    ],
  },
};

const CAPABILITY_CARDS = [
  {
    title: "Visual Scheduling Workspace",
    description:
      "Explore manufacturing orders, operations, resources and timing within a responsive planning surface.",
  },
  {
    title: "Finite-Capacity Planning",
    description:
      "Represent capacity limits, calendars and resource availability within the scheduling context.",
  },
  {
    title: "Constraint Visibility",
    description:
      "Make conflicts, dependencies, bottlenecks and competing requirements easier to identify.",
  },
  {
    title: "Scenario Planning",
    description:
      "Explore changes and compare possible scheduling outcomes without immediately changing the base plan.",
  },
  {
    title: "Planner-Controlled Interaction",
    description:
      "Allow planners to select, inspect, move, compare and evaluate scheduling objects within the workspace.",
  },
  {
    title: "Optimization-Focused Direction",
    description:
      "Develop toward schedule evaluation and improvement using manufacturing rules, heuristics and appropriate optimization methods.",
  },
] as const;

const OBJECT_MODEL = [
  "Production orders",
  "Operations",
  "Work centres",
  "Machines and resources",
  "Labour classes and people",
  "Tool classes and tools",
  "Calendars",
  "Resource assignments",
  "Dependencies",
  "Capacity and availability constraints",
] as const;

const WORKSPACE_PARTS = [
  {
    title: "Master Navigator",
    description:
      "The broader manufacturing object structure used to find orders, resources, labour, tools and supporting data.",
  },
  {
    title: "Scheduling Workspace",
    description:
      "The active planning context, combining hierarchical rows with a time-based scheduling surface.",
  },
  {
    title: "Inspector and Decision Support",
    description:
      "Selected-object details, relevant KPIs, conflict visibility and contextual actions.",
  },
] as const;

const SCENARIO_STEPS = [
  "Visualise the current planning context",
  "Identify conflicts and bottlenecks",
  "Create a safe planning scenario",
  "Test operational changes",
  "Compare schedule effects",
  "Apply optimization methods where appropriate",
  "Review and accept changes deliberately",
] as const;

const PRINCIPLES = [
  "Behaviour before decoration",
  "Interaction before static visualisation",
  "Simulation before uncontrolled change",
  "Manufacturing context before generic project planning",
  "Planner control before opaque automation",
  "Constraint visibility before false precision",
  "Modular development before premature complexity",
] as const;

const STATUS_ITEMS = [
  "Product direction defined",
  "Browser-based interaction concept established",
  "Visual scheduling demonstration available",
  "Manufacturing object model under development",
  "Scenario-management direction defined",
  "Optimization-engine integration planned",
] as const;

export default function CognitumApsPage() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900">
      <SiteHeader shellClassName={PAGE_SHELL} />

      <main className="w-full min-w-0 max-w-full">
        {/* 1. Product hero */}
        <section className="border-b border-slate-200 bg-slate-50/60">
          <div className={`${PAGE_SHELL} grid gap-10 py-12 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-16`}>
            <div className="min-w-0">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
                AIORIE Labs • Product Development
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.35rem] lg:leading-tight">
                  Modern Manufacturing Scheduling with Cognitum APS
                </h1>
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  In Development
                </span>
              </div>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                Cognitum APS is AIORIE’s emerging browser-based Advanced Planning and Scheduling
                workbench for complex manufacturing environments.
              </p>
              <p className="mt-3 text-base leading-7 text-slate-600">
                It is designed to help planners visualise constraints, explore scenarios and improve
                production schedules through a fast, interactive and planner-controlled workspace.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(37,99,235,0.25)] transition hover:-translate-y-px hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/45 focus-visible:ring-offset-2"
                >
                  Discuss Cognitum APS
                </a>
                <a
                  href="#product-direction"
                  className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/35 focus-visible:ring-offset-2"
                >
                  Explore Product Direction
                </a>
              </div>
            </div>

            <div className="min-w-0">
              <div className="relative aspect-[5/3] w-full overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/aps.png"
                  alt="Cognitum APS scheduling workbench visual"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 640px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive workbench */}
        <section className="border-b border-slate-200 py-16 lg:py-20" aria-labelledby="workbench-heading">
          <div className={PAGE_SHELL}>
            <div className="max-w-3xl">
              <h2 id="workbench-heading" className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Explore the Cognitum APS Scheduling Workbench
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                A visual demonstration of how planners can examine manufacturing resources, operations,
                timing, utilisation and scheduling pressure in a shared workspace.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Demonstration data only — not customer or production schedules. Interactions illustrate
                intended product direction; displayed outcomes do not represent completed solver optimization.
              </p>
            </div>

            <div className="mt-8 min-w-0 max-w-full overflow-x-auto">
              <CognitumPreview />
            </div>
          </div>
        </section>

        {/* 3. Product purpose */}
        <section id="product-direction" className="border-b border-slate-200 bg-slate-50/80 py-16 lg:py-20">
          <div className={`${PAGE_SHELL} max-w-3xl`}>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              Product Purpose
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              A Scheduling Workbench Built Around Planner Decisions
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Cognitum APS is intended to support the decisions manufacturing planners make when demand,
              finite capacity, sequencing, labour, tooling, calendars and operational priorities interact.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              It is not intended to be a generic Gantt chart. The product direction is an interactive
              planning environment in which users can understand scheduling context, test alternatives and
              retain control over operational decisions.
            </p>
          </div>
        </section>

        {/* 4. Capability direction */}
        <section className="border-b border-slate-200 py-16 lg:py-20">
          <div className={PAGE_SHELL}>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Cognitum APS Capability Direction
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITY_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-slate-950">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Planning object model */}
        <section className="border-b border-slate-200 bg-slate-950 py-16 text-white lg:py-20">
          <div className={`${PAGE_SHELL} grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start`}>
            <div className="min-w-0">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Manufacturing Context, Not Just Timeline Bars
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                The product direction is to let planners move between order, operation, resource, labour,
                tooling and calendar perspectives without losing scheduling context.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {OBJECT_MODEL.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. Workspace model */}
        <section className="border-b border-slate-200 py-16 lg:py-20">
          <div className={PAGE_SHELL}>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              A Contextual Planning Workspace
            </h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {WORKSPACE_PARTS.map((part) => (
                <div key={part.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-950">{part.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{part.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Scenario and optimization direction */}
        <section className="border-b border-slate-200 bg-slate-50/80 py-16 lg:py-20">
          <div className={`${PAGE_SHELL} grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start`}>
            <div className="min-w-0 max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                From Visual Planning to Scenario-Based Optimization
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Cognitum APS is being developed toward a workflow in which planners can create scenarios,
                evaluate constraints, compare schedule quality and request improvement without losing
                control of the planning process.
              </p>
            </div>
            <ol className="space-y-3">
              {SCENARIO_STEPS.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="leading-6">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 8. Product principles */}
        <section className="border-b border-slate-200 py-16 lg:py-20">
          <div className={PAGE_SHELL}>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Product Principles
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {PRINCIPLES.map((principle) => (
                <li
                  key={principle}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-700"
                >
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 9. Development status */}
        <section className="border-b border-slate-200 bg-slate-50/80 py-16 lg:py-20">
          <div className={`${PAGE_SHELL} grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start`}>
            <div className="min-w-0 max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Current Product Status
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Cognitum APS is currently in development. The existing website workbench demonstrates the
                intended visual and interaction direction. Product architecture, manufacturing data
                integration, scheduling behaviour and optimization capabilities will be developed and
                validated progressively.
              </p>
            </div>
            <ul className="space-y-3">
              {STATUS_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 10. Contact CTA */}
        <section className="bg-blue-600 py-16 text-white lg:py-20">
          <div className={`${PAGE_SHELL} max-w-3xl`}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Discuss a Manufacturing Scheduling Challenge
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-50">
              Talk to AIORIE about manufacturing scheduling requirements, finite-capacity planning,
              constraint visibility, scenario workflows or the Cognitum APS product direction.
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
                href={mailtoHref("Cognitum APS Enquiry")}
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
