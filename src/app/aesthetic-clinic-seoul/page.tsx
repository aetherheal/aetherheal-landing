import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Aesthetic Clinics in Seoul | AetherHeal",
  description:
    "Find physician-verified aesthetic clinics in Seoul. AetherHeal helps international patients navigate skin treatments, anti-aging procedures, and cosmetic dermatology with decision clarity.",
  alternates: { canonical: "https://aetherheal.com/aesthetic-clinic-seoul" },
  openGraph: {
    title: "Aesthetic Clinics in Seoul | AetherHeal",
    description:
      "Physician-verified aesthetic clinics in Seoul. Decision support for skin treatments and cosmetic dermatology.",
    url: "https://aetherheal.com/aesthetic-clinic-seoul",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aesthetic Clinics in Seoul | AetherHeal",
    description:
      "Physician-verified aesthetic clinics in Seoul for international patients.",
  },
}

const tocItems = [
  { id: "why-seoul", label: "Why Seoul for Aesthetic Treatments" },
  { id: "how-we-support", label: "How AetherHeal Supports Your Decision" },
  { id: "treatments-discussed", label: "Treatments Commonly Discussed" },
]

export default function AestheticClinicSeoulPage() {
  return (
    <div className="min-h-full bg-white">
      {/* Editorial Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-brand-navy/[0.02] to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-sm">
              Aesthetic Medicine
            </span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-10 leading-[1.1] tracking-tight">
            Aesthetic Clinics in Seoul: <br className="hidden sm:block" />
            <span className="italic text-brand-gold">Navigate with Confidence</span>
          </h1>
          
          <div className="max-w-3xl space-y-6 text-lg sm:text-xl text-slate-600 font-light leading-[1.8]">
            <p className="text-xl sm:text-2xl font-serif text-brand-navy leading-relaxed">
              Seoul&apos;s Gangnam district alone has thousands of aesthetic
              clinics.
            </p>
            <p>
              The density of options can be overwhelming for international
              patients. AetherHeal provides structured support to help you make
              informed decisions about skin treatments and cosmetic procedures.
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
              <div id="why-seoul" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  Why Seoul for Aesthetic Treatments
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>
                    Korea is recognized globally for its advanced dermatological
                    research and aesthetic technology. Treatments like skin boosters,
                    thread lifting, HIFU, and laser therapy are performed with
                    specialized equipment and protocols developed in Korean clinical
                    settings.
                  </p>
                  <p>
                    Popular brands such as Rejuran, Juvelook, Sculptra, and Ulthera
                    are widely administered by dermatologists with deep specialization.
                  </p>
                  <div className="p-6 sm:p-8 bg-brand-navy/[0.02] border-l-2 border-brand-gold rounded-r-2xl mt-8">
                    <p className="text-base text-slate-700 leading-relaxed italic m-0">
                      The challenge for international patients is identifying which
                      clinic — and which physician — is appropriate for their specific needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div id="how-we-support" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  How AetherHeal Supports Your Decision
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <div className="grid gap-4">
                    {[
                      "Physician-led consultation to clarify treatment goals and skin concerns",
                      "Objective evaluation of procedure options without brand bias",
                      "Matching to partner clinics specializing in your area of interest",
                      "Pre-treatment decision summary with expected outcomes and limitations",
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
              <div id="treatments-discussed" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  Treatments Commonly Discussed
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>
                    Skin boosters and bio-stimulators, thread lifting, HIFU and RF
                    tightening, laser resurfacing, filler and volume restoration, and
                    anti-aging protocols. 
                  </p>
                  <p className="font-medium text-brand-navy border-l-2 border-brand-gold pl-5 py-2">
                    Each treatment plan is discussed with a
                    licensed physician before any clinic contact.
                  </p>
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
                href: "/plastic-surgery-korea",
                label: "Plastic Surgery in Korea",
                desc: "Structured decision support for cosmetic procedures",
              },
              {
                href: "/trust-protocol",
                label: "The AetherHeal Trust Protocol",
                desc: "How we evaluate partner hospitals",
              },
              { 
                href: "/medical-journey", 
                label: "Your Medical Journey",
                desc: "End-to-end coordination from decision to recovery",
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
