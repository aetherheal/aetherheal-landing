import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Your Medical Journey to Seoul | AetherHeal",
  description:
    "From decision to recovery — AetherHeal coordinates your entire medical journey to Seoul. Physician-led planning, hospital matching, travel logistics, and post-treatment follow-up.",
  alternates: { canonical: "https://aetherheal.com/medical-journey" },
  openGraph: {
    title: "Your Medical Journey to Seoul | AetherHeal",
    description:
      "End-to-end medical journey coordination for international patients traveling to Seoul.",
    url: "https://aetherheal.com/medical-journey",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Medical Journey to Seoul | AetherHeal",
    description:
      "End-to-end medical journey coordination to Seoul.",
  },
}

const tocItems = [
  { id: "how-journey-works", label: "How the Journey Works" },
  { id: "what-makes-different", label: "What Makes This Different" },
]

export default function MedicalJourneyPage() {
  return (
    <div className="min-h-full bg-white">
      {/* Editorial Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-brand-navy/[0.02] to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-sm">
              Journey Coordination
            </span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-10 leading-[1.1] tracking-tight">
            Your Medical Journey to Seoul: <br className="hidden sm:block" />
            <span className="italic text-brand-gold">Coordinated from Start to Finish</span>
          </h1>
          
          <div className="max-w-3xl space-y-6 text-lg sm:text-xl text-slate-600 font-light leading-[1.8]">
            <p className="text-xl sm:text-2xl font-serif text-brand-navy leading-relaxed">
              Traveling abroad for medical care involves more than booking a flight
              and a clinic.
            </p>
            <p>
              AetherHeal structures the entire process — from your
              first consultation to post-treatment follow-up — so nothing falls
              through the cracks.
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
              <div id="how-journey-works" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  How the Journey Works
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      step: "01",
                      title: "Decision Preparation",
                      desc: "Share your goals and concerns. A licensed Korean physician helps you structure the decision before any hospital contact.",
                    },
                    {
                      step: "02",
                      title: "Hospital Matching",
                      desc: "Based on your decision summary, AetherHeal connects you with partner hospitals that match your clinical profile.",
                    },
                    {
                      step: "03",
                      title: "Pre-Arrival Coordination",
                      desc: "Scheduling, document preparation, travel logistics, and accommodation guidance — handled by your dedicated concierge.",
                    },
                    {
                      step: "04",
                      title: "In-Seoul Support",
                      desc: "Airport pickup, hospital accompaniment, translation support, and real-time concierge availability throughout your stay.",
                    },
                    {
                      step: "05",
                      title: "Post-Treatment Follow-Up",
                      desc: "Recovery monitoring, physician check-ins, and long-term continuity of care after you return home.",
                    },
                  ].map((item, index) => (
                    <div key={item.step} className="flex flex-col sm:flex-row gap-5 sm:gap-8 p-6 sm:p-8 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center text-brand-gold font-bold text-sm">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl text-brand-navy font-bold mb-3">
                          {item.title}
                        </h3>
                        <p className="text-base text-slate-600 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2 */}
              <div id="what-makes-different" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  What Makes This Different
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>
                    Unlike medical tourism agencies that prioritize volume and
                    commission, AetherHeal operates on a decision-first model. 
                  </p>
                  <div className="p-6 sm:p-8 bg-brand-navy text-white rounded-2xl shadow-lg my-8">
                    <p className="text-xl font-serif text-brand-gold mb-2">No hospital is contacted</p>
                    <p className="text-white/90">
                      until your decision is structured and confirmed. This separation ensures that clinical suitability — not sales pressure — drives the process.
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
