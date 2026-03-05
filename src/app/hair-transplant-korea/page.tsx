import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

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

const tocItems = [
  { id: "why-korea", label: "Why Patients Choose Korea" },
  { id: "what-we-offer", label: "What AetherHeal Offers" },
  { id: "common-procedures", label: "Common Procedures Covered" },
]

export default function HairTransplantKoreaPage() {
  return (
    <div className="min-h-full bg-white">
      {/* Editorial Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-brand-navy/[0.02] to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-sm">
              Hair Transplantation
            </span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-10 leading-[1.1] tracking-tight">
            Hair Transplant in Korea: <br className="hidden sm:block" />
            <span className="italic text-brand-gold">What to Know Before You Decide</span>
          </h1>
          
          <div className="max-w-3xl space-y-6 text-lg sm:text-xl text-slate-600 font-light leading-[1.8]">
            <p className="text-xl sm:text-2xl font-serif text-brand-navy leading-relaxed">
              Korea is one of the most sought-after destinations for hair
              transplantation.
            </p>
            <p>
              With advanced FUE techniques, experienced surgeons,
              and competitive pricing, Seoul has become a global hub. But choosing
              the right clinic requires more than a Google search.
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
              <div id="why-korea" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  Why Patients Choose Korea for Hair Transplants
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>
                    Korean clinics are known for precision in follicular unit
                    extraction (FUE) and robotic-assisted procedures. Surgeons in Seoul
                    often specialize exclusively in hair restoration, performing
                    thousands of procedures annually.
                  </p>
                  <p>
                    However, not all clinics operate at the same standard. Marketing
                    can obscure clinical quality, and language barriers complicate
                    pre-operative evaluation. A structured decision process matters.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div id="what-we-offer" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  What AetherHeal Offers
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>
                    AetherHeal does not perform hair transplants. Instead, we provide
                    physician-led decision support that helps you clarify your goals,
                    understand the trade-offs of different techniques, and connect with
                    verified partner clinics based on your specific case.
                  </p>
                  
                  <div className="grid gap-4 pt-4">
                    {[
                      "1:1 consultation with a licensed Korean physician",
                      "Decision summary covering graft count, donor area assessment, and technique comparison",
                      "Matching to a partner clinic based on your clinical profile",
                      "Journey coordination from arrival to follow-up",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                        <span className="text-brand-navy font-medium text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div id="common-procedures" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  Common Procedures Covered
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>
                    FUE (Follicular Unit Extraction), DHI (Direct Hair Implantation),
                    scalp micropigmentation, hairline design consultation, and revision
                    cases. 
                  </p>
                  <div className="p-6 sm:p-8 bg-brand-navy text-white rounded-2xl shadow-lg mt-8">
                    <p className="text-xl font-serif text-brand-gold mb-2">Individual Evaluation</p>
                    <p className="text-white/90">
                      Each case is evaluated individually. We ensure no cookie-cutter recommendations are made.
                    </p>
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
                href: "/trust-protocol",
                label: "The AetherHeal Trust Protocol",
                desc: "How we evaluate partner hospitals",
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
