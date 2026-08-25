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
    logoSrc: "/needlu_logo.png",
  },
  {
    name: "PrimePilot",
    href: "https://primepilot.ai",
    logoSrc: "/Primepilot.png",
  },
  {
    name: "IERI",
    href: "https://ieriresearch.com/",
    logoSrc: "/ieri.jpg",
  },
] as const;

export function PartnerEcosystemStrip() {
  return (
    <div className="w-full min-w-0 max-w-full">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        Partners
      </p>
      <div className="mt-2.5 rounded-xl border border-slate-200/90 bg-white px-2.5 py-2.5 sm:px-3 sm:py-3">
        <ul className="grid grid-cols-2 gap-2">
          {partners.map((p) => (
            <li key={p.href} className="min-w-0">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[3.25rem] flex-col items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50/80 px-2 py-2 transition duration-150 hover:border-slate-300 hover:bg-white sm:min-h-[3.5rem]"
                aria-label={`${p.name} (opens in a new tab)`}
              >
                <span className="relative flex h-8 w-full max-w-[8.5rem] items-center justify-center">
                  <Image
                    src={p.logoSrc}
                    alt=""
                    width={180}
                    height={48}
                    className={
                      p.name === "NEEDLU"
                        ? "h-8 object-contain opacity-70 transition hover:opacity-100"
                        : "max-h-8 w-auto max-w-full object-contain object-center opacity-[0.92] transition duration-150 group-hover:opacity-100"
                    }
                    sizes="(max-width: 640px) 160px, 140px"
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
