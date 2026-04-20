import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | AIORIE",
  description:
    "Terms governing use of the AIORIE website and informational content for consulting and software visitors.",
};

const nav = ["Services", "Industries", "Cognitum APS", "About", "Contact"];

export default function TermsPage() {
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
                href={`/#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="/#contact"
            className="shrink-0 rounded-xl bg-blue-600 px-2.5 py-2 text-[11px] font-semibold leading-tight text-white shadow-sm transition hover:bg-blue-700 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            Request Consultation
          </a>
        </div>
      </header>

      <main className="min-w-0 w-full max-w-full flex-1">
        <div className="mx-auto min-w-0 max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Terms of Use
          </h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: January 2026</p>

          <div className="mt-10 space-y-10 text-base leading-7 text-slate-600">
            <section>
              <h2 className="text-lg font-semibold text-slate-950">1. Introduction</h2>
              <p className="mt-3">
                These Terms of Use (“Terms”) apply to your access and use of this website operated by AIORIE
                Pty Ltd (“AIORIE”, “we”, “us”). By using the site, you agree to these Terms. If you do not
                agree, please do not use the website.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950">2. Use of Content</h2>
              <p className="mt-3">
                Content on this website is provided for general information and marketing purposes related to
                our consulting and software-related services. It does not constitute professional, legal, or
                technical advice unless we expressly agree otherwise in writing.
              </p>
              <p className="mt-3">
                You may not copy, reproduce, distribute, modify, or create derivative works from site content
                without our prior written permission, except where allowed by law (for example, fair dealing
                for personal use). You must not use the site in any way that could damage, disable, or impair
                it or interfere with others’ use.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950">3. No Warranty</h2>
              <p className="mt-3">
                Information on this website is provided “as is” and “as available.” We do not warrant that
                content is complete, accurate, or up to date, or that the site will be uninterrupted or
                error-free. Any reliance on site content is at your own discretion.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950">4. Limitation of Liability</h2>
              <p className="mt-3">
                To the maximum extent permitted by law, AIORIE and its directors, employees, and contractors
                are not liable for any indirect, incidental, special, or consequential loss or damage arising
                from your use of or inability to use this website, including loss of data, profit, or business
                opportunity, even if we have been advised of the possibility of such loss.
              </p>
              <p className="mt-3">
                Where liability cannot be excluded, our total liability arising from these Terms or your use of
                the site is limited to the fullest extent permitted by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950">5. External Links</h2>
              <p className="mt-3">
                This website may link to third-party websites or services. Those sites are not under our
                control. We are not responsible for their content, privacy practices, or availability. A link
                does not imply endorsement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950">6. Intellectual Property</h2>
              <p className="mt-3">
                Unless otherwise stated, text, graphics, logos, and other materials on this site are owned by
                AIORIE or used with permission. Third-party names, logos, and trademarks are the property of
                their respective owners and are used for identification only.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950">7. Changes</h2>
              <p className="mt-3">
                We may update these Terms from time to time. The “Last updated” date at the top of this page
                will change when we do. Continued use of the website after changes constitutes acceptance of
                the revised Terms. We encourage you to review this page periodically.
              </p>
            </section>
          </div>

          <p className="mt-12">
            <Link
              href="/"
              className="text-sm font-medium text-blue-700 transition hover:text-blue-800"
            >
              ← Back to home
            </Link>
          </p>
        </div>
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
            <Link href="/terms" className="text-slate-900 transition hover:text-slate-700">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
