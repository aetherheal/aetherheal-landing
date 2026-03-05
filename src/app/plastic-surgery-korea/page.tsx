import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

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

const tocItems = [
  { id: "common-procedures", label: "Procedures Commonly Considered" },
  { id: "risk-of-unstructured", label: "The Risk of Unstructured Decisions" },
  { id: "how-aetherheal-helps", label: "How AetherHeal Helps" },
]

export default function PlasticSurgeryKoreaPage() {
  return (
    <div className="min-h-full bg-white">
      {/* Editorial Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-brand-navy/[0.02] to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-sm">
              Plastic Surgery
            </span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-10 leading-[1.1] tracking-tight">
            Plastic Surgery in Korea: <br className="hidden sm:block" />
            <span className="italic text-brand-gold">Structure Your Decision First</span>
          </h1>
          
          <div className="max-w-3xl space-y-6 text-lg sm:text-xl text-slate-600 font-light leading-[1.8]">
            <p className="text-xl sm:text-2xl font-serif text-brand-navy leading-relaxed">
              Korea performs more cosmetic procedures per capita than nearly any
              other country.
            </p>
            <p>
              For international patients, this creates both
              opportunity and complexity. AetherHeal helps you navigate that
              complexity with physician-led decision support — before you contact
              any hospital.
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Article Layout */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Desktop Sidebar (TOC) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 p-6 bg-slate-50/80 border border-slate-100 rounded-2xl">
              <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">
                Contents
              </h2>
              <nav>
                <ol className="space-y-4">
                  {tocItems.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="flex items-start gap-3 text-sm text-slate-600 font-medium hover:text-brand-gold transition-colors leading-snug"
                      >
                        <span className="text-brand-gold/60 font-bold shrink-0 w-4 text-right">
                          {i + 1}.
                        </span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          {/* Article Body */}
          <div className="flex-1 min-w-0 max-w-3xl">
            
            {/* Mobile TOC */}
            <div className="block lg:hidden mb-16 p-6 sm:p-8 bg-slate-50 border border-slate-100 rounded-2xl">
              <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">
                Table of Contents
              </h2>
              <ol className="space-y-4">
                {tocItems.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-start gap-3 text-sm text-slate-600 font-medium hover:text-brand-gold transition-colors leading-snug"
                    >
                      <span className="text-brand-gold/60 font-bold shrink-0 w-4 text-right">
                        {i + 1}.
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-24">
              
              {/* Section 1 */}
              <div id="common-procedures" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  Procedures Commonly Considered
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>
                    Rhinoplasty (nose reshaping and revision), blepharoplasty (double
                    eyelid surgery and ptosis correction), facial contouring (V-line
                    jaw reduction, cheekbone reduction), breast augmentation, body
                    contouring, and fat grafting are among the most frequently
                    discussed procedures.
                  </p>
                  <p className="font-medium text-brand-navy border-l-2 border-brand-gold pl-5 py-2">
                    Each procedure carries specific risks and recovery requirements.
                    Understanding these before committing to a clinic is not optional —
                    it is essential.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div id="risk-of-unstructured" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  The Risk of Unstructured Decisions
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>
                    Many patients choose clinics based on social media reviews, price
                    comparisons, or agency referrals. These methods rarely account for
                    clinical suitability, surgeon specialization, or revision risk.
                  </p>
                  <div className="p-6 sm:p-8 bg-brand-navy/[0.02] border border-slate-100 rounded-2xl">
                    <p className="text-slate-700 m-0">
                      AetherHeal addresses this gap by providing a physician-led
                      evaluation of your case <strong className="text-brand-navy">before any hospital introduction.</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div id="how-aetherheal-helps" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  How AetherHeal Helps
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <div className="grid gap-4">
                    {[
                      "Physician consultation to define realistic expectations and constraints",
                      "Decision summary with procedure-specific risk documentation",
                      "Partner hospital matching based on surgical specialization",
                      "Full journey support including post-operative follow-up coordination",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                        <span className="text-brand-navy font-medium text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif text-3xl text-brand-navy mb-10 text-center">
            Continue Reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                href: "/hair-transplant-korea",
                label: "Hair Transplant in Korea",
                desc: "Physician-led guidance for hair restoration",
              },
              {
                href: "/aesthetic-clinic-seoul",
                label: "Aesthetic Clinics in Seoul",
                desc: "Navigate skin treatments and dermatology",
              },
              {
                href: "/how-to-choose-hospital-abroad",
                label: "How to Choose a Hospital Abroad",
                desc: "A framework for safer decisions",
              },
              { 
                href: "/how-it-works", 
                label: "How AetherHeal Works",
                desc: "The system behind physician-led decision support",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group block p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-gold/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                    {link.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-brand-gold shrink-0" />
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
