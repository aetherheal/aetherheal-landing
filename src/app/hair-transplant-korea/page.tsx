import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Hair Transplant in Korea | AetherHeal",
  description:
    "Considering a hair transplant in Korea? AetherHeal provides physician-led decision support to help you evaluate clinics, understand procedures, and plan your journey to Seoul.",
  alternates: { canonical: "https://aetherheal.com/hair-transplant-korea" },
  openGraph: {
    title: "Hair Transplant in Korea | AetherHeal",
    description:
      "Physician-led decision support for international patients considering hair transplantation in Seoul.",
    url: "https://aetherheal.com/hair-transplant-korea",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hair Transplant in Korea | AetherHeal",
    description:
      "Physician-led decision support for hair transplantation in Seoul.",
  },
}

export default function HairTransplantKoreaPage() {
  return (
    <div className="min-h-full">
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">
            Hair Transplantation
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-6 leading-tight">
            Hair Transplant in Korea:{" "}
            <span className="italic text-brand-gold">
              What to Know Before You Decide
            </span>
          </h1>
          <p className="text-text-body text-lg leading-relaxed">
            Korea is one of the most sought-after destinations for hair
            transplantation. With advanced FUE techniques, experienced surgeons,
            and competitive pricing, Seoul has become a global hub. But choosing
            the right clinic requires more than a Google search.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-3xl mx-auto space-y-16">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              Why Patients Choose Korea for Hair Transplants
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              Korean clinics are known for precision in follicular unit
              extraction (FUE) and robotic-assisted procedures. Surgeons in Seoul
              often specialize exclusively in hair restoration, performing
              thousands of procedures annually.
            </p>
            <p className="text-text-body leading-relaxed">
              However, not all clinics operate at the same standard. Marketing
              can obscure clinical quality, and language barriers complicate
              pre-operative evaluation. A structured decision process matters.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              What AetherHeal Offers
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              AetherHeal does not perform hair transplants. Instead, we provide
              physician-led decision support that helps you clarify your goals,
              understand the trade-offs of different techniques, and connect with
              verified partner clinics based on your specific case.
            </p>
            <ul className="space-y-3">
              {[
                "1:1 consultation with a licensed Korean physician",
                "Decision summary covering graft count, donor area assessment, and technique comparison",
                "Matching to a partner clinic based on your clinical profile",
                "Journey coordination from arrival to follow-up",
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
            <h3 className="font-serif text-xl sm:text-2xl text-brand-navy mb-4">
              Common Procedures Covered
            </h3>
            <p className="text-text-body leading-relaxed">
              FUE (Follicular Unit Extraction), DHI (Direct Hair Implantation),
              scalp micropigmentation, hairline design consultation, and revision
              cases. Each case is evaluated individually — no cookie-cutter
              recommendations.
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
                href: "/aesthetic-clinic-seoul",
                label: "Aesthetic Clinics in Seoul",
              },
              {
                href: "/how-to-choose-hospital-abroad",
                label: "How to Choose a Hospital Abroad",
              },
              {
                href: "/hospital-verification",
                label: "Hospital Verification Process",
              },
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
