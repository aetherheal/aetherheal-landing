import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Hospital Verification Process | AetherHeal",
  description:
    "How AetherHeal verifies partner hospitals in Seoul. Our physician-led evaluation ensures clinical standards, ethical practices, and specialization alignment for international patients.",
  alternates: { canonical: "https://aetherheal.com/hospital-verification" },
  openGraph: {
    title: "Hospital Verification Process | AetherHeal",
    description:
      "How AetherHeal verifies and curates partner hospitals in Seoul for international patients.",
    url: "https://aetherheal.com/hospital-verification",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospital Verification Process | AetherHeal",
    description:
      "Physician-led hospital verification for international patients.",
  },
}

export default function HospitalVerificationPage() {
  return (
    <div className="min-h-full">
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">
            Trust & Verification
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-6 leading-tight">
            How AetherHeal Verifies{" "}
            <span className="italic text-brand-gold">Partner Hospitals</span>
          </h1>
          <p className="text-text-body text-lg leading-relaxed">
            Not every hospital in Seoul meets our standards. AetherHeal operates
            a selective partner network where each institution is evaluated on
            clinical merit, ethical practices, and cross-border care capability.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-3xl mx-auto space-y-16">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              Verification Criteria
            </h2>
            <p className="text-text-body leading-relaxed mb-6">
              Each partner hospital is assessed across multiple dimensions before
              joining the AetherHeal network:
            </p>
            <ul className="space-y-3">
              {[
                "Clinical expertise and surgeon specialization depth",
                "Facility standards and equipment certification",
                "Ethical practice history and patient complaint records",
                "Cross-border patient experience and language support",
                "Alignment with AetherHeal's decision-first philosophy",
                "Post-treatment follow-up and continuity protocols",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-text-body"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              What This Means for Patients
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              When AetherHeal matches you with a partner hospital, that match is
              based on your specific clinical profile and decision summary — not
              on commission structures or marketing partnerships.
            </p>
            <p className="text-text-body leading-relaxed">
              Hospitals in our network have agreed to operate within our
              structured process: receiving the decision summary before
              consultation, conducting a feasibility review, and coordinating
              through AetherHeal for scheduling and follow-up.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-brand-navy mb-4">
              Ongoing Accountability
            </h3>
            <p className="text-text-body leading-relaxed">
              Verification is not a one-time event. AetherHeal maintains ongoing
              review of partner institutions through patient feedback, clinical
              outcome monitoring, and periodic re-evaluation. Partners that do
              not maintain standards are removed from the network.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl text-brand-navy mb-8">
            Related Pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                href: "/how-to-choose-hospital-abroad",
                label: "How to Choose a Hospital Abroad",
              },
              { href: "/medical-journey", label: "Your Medical Journey" },
              { href: "/trust-protocol", label: "Trust & Safety Protocol" },
              { href: "/how-it-works", label: "How AetherHeal Works" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-xl text-sm font-medium text-brand-navy hover:bg-bg-light hover:border-brand-gold/40 transition-all"
              >
                {link.label}
                <ArrowRight className="w-4 h-4 text-brand-gold" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
