import Image from "next/image";

const partners = [
  {
    name: "Ceysys",
    href: "https://ceysys.com",
    logoSrc: "/Ceysys.png",
  },
  {
    name: "NEEDLU",
    href: "https://needlu.com",
    logoSrc: "/Needlu.png",
  },
  {
    name: "PrimePilot",
    href: "https://primepilot.ai",
    logoSrc: "/Primepilot.png",
  },
] as const;

export function PartnerEcosystemStrip() {
  return (
    <div className="w-full min-w-0 max-w-full">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        Partner Ecosystem
      </p>
      <div className="mt-3 rounded-2xl border border-slate-200/90 bg-white px-3 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:px-4">
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
          {partners.map((p) => (
            <li key={p.href} className="min-w-0">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[4.25rem] flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-3 transition duration-150 hover:border-slate-300 hover:bg-white hover:shadow-[0_4px_14px_-4px_rgba(15,23,42,0.12)] sm:min-h-[4rem]"
                aria-label={`${p.name} (opens in a new tab)`}
              >
                <span className="relative flex h-10 w-full max-w-[9.5rem] items-center justify-center sm:h-9">
                  <Image
                    src={p.logoSrc}
                    alt=""
                    width={180}
                    height={48}
                    className="max-h-9 w-auto max-w-full object-contain object-center opacity-[0.92] transition duration-150 group-hover:opacity-100"
                    sizes="(max-width: 640px) 200px, 160px"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
