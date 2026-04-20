import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | AIORIE",
  description:
    "How AIORIE collects, uses, and protects personal information in connection with consulting and software services.",
};

const nav = ["Services", "Industries", "Cognitum APS", "About", "Contact"];

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: January 2026</p>

          <div className="mt-10 space-y-10 text-base leading-7 text-slate-600">
            <section>
              <h2 className="text-lg font-semibold text-slate-950">1. Introduction</h2>
              <p className="mt-3">
                AIORIE Pty Ltd (“AIORIE”, “we”, “us”) respects your privacy. This policy describes how we
                handle personal information in connection with our consulting services, software-related
                activities, and website. We are committed to protecting personal information and handling it
                responsibly and in line with applicable Australian privacy principles.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950">2. Information We Collect</h2>
              <p className="mt-3">
                We may collect information that you provide directly, such as:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Name and job title</li>
                <li>Email address and phone number</li>
                <li>Company name and other details you include in enquiries or contact forms</li>
                <li>Messages and other content you send when communicating with us</li>
              </ul>
              <p className="mt-3">
                We do not aim to collect sensitive information unless you choose to provide it and it is
                reasonably necessary for the services discussed.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950">3. How We Use Information</h2>
              <p className="mt-3">We use personal information to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Respond to enquiries and provide requested information or proposals</li>
                <li>Deliver and improve our consulting and related services</li>
                <li>Communicate with you about projects, follow-up, or legitimate business matters</li>
                <li>Operate, maintain, and improve our website and internal processes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950">4. Data Sharing</h2>
              <p className="mt-3">
                We do not sell personal information. We may share information only where necessary to deliver
                services (for example, with trusted service providers who assist our operations under
                appropriate confidentiality arrangements), or where required by law, regulation, or a lawful
                request from authorities.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950">5. Data Security</h2>
              <p className="mt-3">
                We take reasonable steps to protect personal information from misuse, interference, loss, and
                unauthorised access, modification, or disclosure. No method of transmission over the internet
                is completely secure; we encourage you to use discretion when sending sensitive information by
                email or web forms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950">6. Cookies</h2>
              <p className="mt-3">
                Our website may use cookies or similar technologies to support basic functionality, analytics,
                or preferences. You can control cookies through your browser settings. If our use of cookies
                expands materially, we will update this policy accordingly.
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
            <Link href="/privacy" className="text-slate-900 transition hover:text-slate-700">
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
