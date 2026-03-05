import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Plastic Surgery in Korea | AetherHeal",
  description:
    "Considering plastic surgery in Korea? AetherHeal offers physician-led decision support for rhinoplasty, facial contouring, blepharoplasty, and more — structured guidance before hospital contact.",
  alternates: { canonical: "https://aetherheal.com/plastic-surgery-korea" },
  openGraph: {
    title: "Plastic Surgery in Korea | AetherHeal",
    description:
      "Physician-led decision support for international patients considering plastic surgery in Seoul.",
    url: "https://aetherheal.com/plastic-surgery-korea",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plastic Surgery in Korea | AetherHeal",
    description:
      "Structured decision support for plastic surgery in Seoul.",
  },
}

export default function PlasticSurgeryKoreaPage() {
  return (
    <div className="min-h-full">
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">
            Plastic Surgery
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-6 leading-tight">
            Plastic Surgery in Korea:{" "}
            <span className="italic text-brand-gold">
              Structure Your Decision First
            </span>
          </h1>
          <p className="text-text-body text-lg leading-relaxed">
            Korea performs more cosmetic procedures per capita than nearly any
            other country. For international patients, this creates both
            opportunity and complexity. AetherHeal helps you navigate that
            complexity with physician-led decision support — before you contact
            any hospital.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-3xl mx-auto space-y-16">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              Procedures Commonly Considered
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              Rhinoplasty (nose reshaping and revision), blepharoplasty (double
              eyelid surgery and ptosis correction), facial contouring (V-line
              jaw reduction, cheekbone reduction), breast augmentation, body
              contouring, and fat grafting are among the most frequently
              discussed procedures.
            </p>
            <p className="text-text-body leading-relaxed">
              Each procedure carries specific risks and recovery requirements.
              Understanding these before committing to a clinic is not optional —
              it is essential.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              The Risk of Unstructured Decisions
            </h2>
            <p className="text-text-body leading-relaxed">
              Many patients choose clinics based on social media reviews, price
              comparisons, or agency referrals. These methods rarely account for
              clinical suitability, surgeon specialization, or revision risk.
              AetherHeal addresses this gap by providing a physician-led
              evaluation of your case before any hospital introduction.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              How AetherHeal Helps
            </h2>
            <ul className="space-y-3">
              {[
                "Physician consultation to define realistic expectations and constraints",
                "Decision summary with procedure-specific risk documentation",
                "Partner hospital matching based on surgical specialization",
                "Full journey support including post-operative follow-up coordination",
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
                href: "/hair-transplant-korea",
                label: "Hair Transplant in Korea",
              },
              {
                href: "/aesthetic-clinic-seoul",
                label: "Aesthetic Clinics in Seoul",
              },
              {
                href: "/how-to-choose-hospital-abroad",
                label: "How to Choose a Hospital Abroad",
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
