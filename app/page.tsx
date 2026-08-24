import type { Metadata } from "next";
import Image from "next/image";

import { CALENDLY_URL, mailtoHref } from "@/components/contact-links";
import { PartnerEcosystemStrip } from "@/components/PartnerEcosystemStrip";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PAGE_SHELL } from "@/components/site-constants";

export const metadata: Metadata = {
  title: "AIORIE | IFS.ai Manufacturing Consulting & Optimization",
  description:
    "AIORIE provides IFS.ai manufacturing consulting for planning, scheduling, MSO, upgrades, integration and manufacturing optimization.",
};

const CONSULTING_SERVICES = [
  {
    title: "IFS.ai Manufacturing Consulting",
    description:
      "Support the design, configuration and improvement of IFS.ai manufacturing processes based on real operational requirements.",
    capabilities: [
      "Manufacturing process configuration",
      "Project and engineer-to-order manufacturing",
      "Production structures and operational flows",
      "Manufacturing master data",
      "Supply-chain and production alignment",
      "Process and system improvement",
    ],
  },
  {
    title: "Manufacturing Planning & Scheduling",
    description:
      "Improve how manufacturing demand, capacity, materials and operational priorities are converted into practical plans and schedules.",
    capabilities: [
      "Master scheduling",
      "Material and capacity planning",
      "Finite scheduling",
      "Work-centre and resource analysis",
      "Bottleneck identification",
      "Sequencing and priority rules",
      "Planning and execution alignment",
    ],
  },
  {
    title: "IFS.ai MSO Support",
    description:
      "Support Manufacturing Scheduling and Optimization requirements within the broader IFS.ai manufacturing environment.",
    capabilities: [
      "Scheduling requirements analysis",
      "Manufacturing-data readiness",
      "Resource and capacity structures",
      "Scheduling-rule alignment",
      "Planning-process integration",
      "Operational adoption and support",
    ],
  },
  {
    title: "IFS.ai Upgrades & Implementation Support",
    description:
      "Help manufacturing organisations preserve operational requirements and improve process alignment during implementation and upgrade programmes.",
    capabilities: [
      "Manufacturing requirement definition",
      "Solution review and process alignment",
      "Upgrade-impact assessment",
      "Configuration support",
      "Testing and validation",
      "Data and integration considerations",
      "Operational readiness",
    ],
  },
  {
    title: "Manufacturing Optimization Advisory",
    description:
      "Examine manufacturing constraints, capacity, workload and planning rules to identify practical opportunities for improving operational performance.",
    capabilities: [
      "Constraint and capacity analysis",
      "Load-versus-capacity assessment",
      "Bottleneck analysis",
      "Scenario evaluation",
      "Planning-rule improvement",
      "Decision-support approaches",
    ],
  },
  {
    title: "IFS Integration & Process Automation",
    description:
      "Improve the flow of information and operational actions between IFS.ai ERP and connected manufacturing processes.",
    capabilities: [
      "Manufacturing-system integration",
      "Workflow and alert design",
      "Data validation",
      "Approval and exception processes",
      "Operational reporting",
      "Reduction of repetitive manual work",
    ],
  },
] as const;

const MANUFACTURING_ENVIRONMENTS = [
  "Discrete manufacturing",
  "Engineer-to-order manufacturing",
  "Project-based manufacturing",
  "Repetitive manufacturing",
  "High-mix and capacity-constrained operations",
] as const;

const ENGAGEMENT_STEPS = [
  {
    title: "Understand",
    description:
      "Review the manufacturing process, operational challenges, current IFS.ai environment and desired outcomes.",
  },
  {
    title: "Analyse",
    description:
      "Examine configuration, data, planning rules, capacity structures, workflows and system interactions.",
  },
  {
    title: "Align",
    description:
      "Define practical improvements that connect IFS.ai functionality with manufacturing requirements.",
  },
  {
    title: "Support",
    description:
      "Assist with configuration, testing, implementation, adoption and continuous improvement as required.",
  },
] as const;

const sectionEyebrowClass =
  "text-sm font-semibold uppercase tracking-[0.22em] text-blue-700";

export default function Home() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900">
      <SiteHeader onHomepage shellClassName={PAGE_SHELL} />

      <main className="w-full min-w-0 max-w-full">
        {/* Hero */}
        <section className="relative w-full max-w-full overflow-hidden">
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

          <div
            className={`${PAGE_SHELL} grid gap-10 pb-16 pt-10 lg:grid-cols-2 lg:gap-12 lg:pb-20 lg:pt-12`}
          >
            <div className="relative z-10 min-w-0 max-w-full">
              <div className="inline-flex max-w-full items-center rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
                <span className="text-pretty">
                  Manufacturing Expertise for an <span className="whitespace-nowrap">AI-Enabled</span> Future
                </span>
              </div>

              <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-[2.35rem]">
                AIORIE delivers specialist IFS.ai manufacturing expertise at every stage of your ERP journey.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
                Manufacturing value is created by making products—not by managing ERP screens. AIORIE
                helps manufacturers apply IFS.ai automation capabilities to streamline data capture,
                automate routine processes and reduce unnecessary manual interaction.
              </p>

              <div className="mt-8 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <a
                  href="#contact"
                  className="group flex aspect-square min-h-[12.5rem] flex-col justify-between rounded-lg bg-blue-600 p-5 text-white shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 focus-visible:ring-offset-2"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-white"
                    aria-hidden
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h10M4 17h16M9 7v10" />
                    </svg>
                  </div>
                  <span className="text-base font-semibold leading-snug tracking-tight">
                    Discuss Your IFS.ai Requirements
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/95">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </a>
                <a
                  href="#services"
                  className="group flex aspect-square min-h-[12.5rem] flex-col justify-between rounded-lg bg-[#6D28D9] p-5 text-white shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#5b21b6] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]/50 focus-visible:ring-offset-2"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-white"
                    aria-hidden
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5M20 19V9M12 19V3" />
                    </svg>
                  </div>
                  <span className="text-base font-semibold leading-snug tracking-tight">
                    Explore Consulting Services
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/95">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            <div className="relative z-10 flex min-w-0 max-w-full flex-col gap-5">
              <div className="w-full bg-gray-50 py-20">
                <div className="relative aspect-[5/3] w-full overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src="/consultancy.png"
                    alt="IFS.ai manufacturing consulting and operational planning"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 640px"
                    priority
                  />
                </div>
              </div>
              <PartnerEcosystemStrip />
            </div>
          </div>
        </section>

        {/* Why AIORIE */}
        <section className="border-t border-slate-200/80 bg-white py-16 lg:py-20">
          <div className={`${PAGE_SHELL} max-w-3xl`}>
            <div className={sectionEyebrowClass}>Why AIORIE</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              IFS.ai Expertise Grounded in Manufacturing Operations
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              An ERP system creates value when its configuration, data and workflows reflect how
              manufacturing actually operates.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              AIORIE works across manufacturing processes, planning, scheduling, projects and supply
              chains to help organisations use IFS.ai ERP more effectively.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Our approach begins with the operational requirement. We examine how orders, operations,
              resources, materials, capacity, labour and planning rules interact before recommending
              system or process changes.
            </p>
          </div>
        </section>

        {/* Consulting services */}
        <section
          id="services"
          className="border-y border-slate-200 bg-slate-50/80 py-16 lg:py-20"
        >
          <div className={PAGE_SHELL}>
            <div className="max-w-3xl">
              <div className={sectionEyebrowClass}>Consulting Services</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Practical IFS.ai Consulting for Manufacturing Operations
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {CONSULTING_SERVICES.map((service) => (
                <article
                  key={service.title}
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-slate-950">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                  <ul className="mt-5 space-y-2.5 text-sm leading-6 text-slate-600">
                    {service.capabilities.map((capability) => (
                      <li key={capability} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" aria-hidden />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing environments */}
        <section id="industries" className="py-16 lg:py-20">
          <div className={PAGE_SHELL}>
            <div className="max-w-3xl">
              <div className={sectionEyebrowClass}>Manufacturing Environments</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Support for Complex Manufacturing Operations
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                AIORIE&apos;s experience is most relevant in manufacturing environments where planning,
                resource constraints, project structures and execution quality directly influence delivery
                performance.
              </p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MANUFACTURING_ENVIRONMENTS.map((environment) => (
                <li
                  key={environment}
                  className="rounded-3xl border border-slate-200 bg-white p-6 text-base font-medium text-slate-900 shadow-sm"
                >
                  {environment}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Engagement approach */}
        <section className="border-y border-slate-200 bg-slate-50/80 py-16 lg:py-20">
          <div className={PAGE_SHELL}>
            <div className="max-w-3xl">
              <div className={sectionEyebrowClass}>How We Work</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                From Operational Requirement to Practical IFS.ai Improvement
              </h2>
            </div>

            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ENGAGEMENT_STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-950">{step.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-16 lg:py-20">
          <div className={`${PAGE_SHELL} max-w-3xl`}>
            <div className={sectionEyebrowClass}>About AIORIE</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Manufacturing and IFS.ai Knowledge in One Consulting Practice
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              AIORIE provides consulting at the intersection of manufacturing operations, enterprise
              systems, planning, scheduling and optimization.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              We focus on practical alignment between IFS.ai ERP and the way manufacturing organisations
              plan, execute and improve their operations.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The objective is to help customers make better use of their systems while keeping
              recommendations grounded in operational reality.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-slate-200 bg-blue-600 py-16 text-white lg:py-20">
          <div className={PAGE_SHELL}>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-10">
              <div className="min-w-0 max-w-full">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Discuss Your IFS.ai Manufacturing Requirements
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50">
                  Talk to AIORIE about IFS.ai manufacturing, planning and scheduling, MSO support,
                  upgrades, implementation, integration or manufacturing optimization.
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
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
                >
                  Book a Consultation
                </a>
                <a
                  href={mailtoHref("IFS.ai Manufacturing Consultation Enquiry")}
                  className="rounded-xl border border-blue-300 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
                >
                  Contact AIORIE
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
