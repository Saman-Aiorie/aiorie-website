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

const IFS_CAPABILITY_TILES = [
  {
    title: "Planning & Optimisation",
    items: [
      "Manufacturing Scheduling & Optimisation (MSO)",
      "Advanced Planning Board (APB)",
      "Master Scheduling",
    ],
    icon: "planning",
  },
  {
    title: "Visual Manufacturing Planning",
    items: ["Manufacturing Visual Planning", "Visual Capacity Requirements Planning"],
    icon: "visual",
  },
  {
    title: "Materials & Flow",
    items: ["Material Requirements Planning (MRP)", "Kanban"],
    icon: "materials",
  },
  {
    title: "Order & Project Manufacturing",
    items: ["Project-Based Manufacturing", "Dynamic Order Processing (DOP)"],
    icon: "order",
  },
  {
    title: "Quality & Shop Floor",
    items: ["Quality Management", "Shop Floor Reporting"],
    icon: "quality",
  },
  {
    title: "Cost & Performance",
    items: ["Product Costing"],
    icon: "cost",
  },
] as const;

const CAPABILITY_TILE_PURPLE = "#6D28D9";

function CapabilityTileIcon({ name }: { name: (typeof IFS_CAPABILITY_TILES)[number]["icon"] }) {
  const iconClass = "h-5 w-5";

  switch (name) {
    case "planning":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 3.5v3M16 3.5v3M4.75 7.5h14.5v12.75H4.75zM5 11h14" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14h4M7.5 17h2.5M13.5 14h3.5" />
        </svg>
      );
    case "visual":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.75h5.5v14.5h-5.5zM10.25 4.75h3.5v8.5h-3.5zM16.75 4.75h3.5v11.5h-3.5z" />
        </svg>
      );
    case "materials":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.75">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5ZM12 12l8-4M12 12v8.5M12 12 4 8"
          />
        </svg>
      );
    case "order":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 4.5h7v2.5h-7zM6.5 6.25h11v13.25h-11zM9 11h6M9 14.25h6M9 17.5h4" />
        </svg>
      );
    case "quality":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.75">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3.5 19.25 6.5v5.25c0 4.15-2.95 7.2-7.25 8.75-4.3-1.55-7.25-4.6-7.25-8.75V6.5L12 3.5Z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2.1 2.1L15.25 10" />
        </svg>
      );
    case "cost":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V10M10 19V5.5M16 19v-7M20.5 19H3.5" />
        </svg>
      );
  }
}

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
            className={`${PAGE_SHELL} grid items-start gap-10 pb-16 pt-10 xl:grid-cols-2 xl:items-center xl:gap-12 xl:pb-20 xl:pt-12`}
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

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {IFS_CAPABILITY_TILES.map((tile) => (
                  <article
                    key={tile.title}
                    className="flex h-full min-h-[10.5rem] flex-col rounded-lg p-3.5 shadow-sm sm:p-4"
                    style={{ backgroundColor: CAPABILITY_TILE_PURPLE }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center text-white" aria-hidden>
                      <CapabilityTileIcon name={tile.icon} />
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-snug tracking-tight text-white">
                      {tile.title}
                    </p>
                    <ul className="mt-2 flex-1 space-y-1 text-xs leading-5 text-white/80">
                      {tile.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex min-w-0 max-w-full flex-col gap-5">
              <Image
                src="/consultancy.png"
                alt="IFS.ai manufacturing consulting and operational planning"
                width={1568}
                height={1003}
                className="h-auto w-full rounded-lg shadow-xl"
                sizes="(max-width: 1280px) 100vw, 50vw"
                priority
              />
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
