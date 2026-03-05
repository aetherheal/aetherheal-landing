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

export default function MedicalJourneyPage() {
  return (
    <div className="min-h-full">
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">
            Journey Coordination
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-6 leading-tight">
            Your Medical Journey to Seoul:{" "}
            <span className="italic text-brand-gold">
              Coordinated from Start to Finish
            </span>
          </h1>
          <p className="text-text-body text-lg leading-relaxed">
            Traveling abroad for medical care involves more than booking a flight
            and a clinic. AetherHeal structures the entire process — from your
            first consultation to post-treatment follow-up — so nothing falls
            through the cracks.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-3xl mx-auto space-y-16">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
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
              ].map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center text-brand-gold font-bold text-xs">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-brand-navy font-bold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-body leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              What Makes This Different
            </h2>
            <p className="text-text-body leading-relaxed">
              Unlike medical tourism agencies that prioritize volume and
              commission, AetherHeal operates on a decision-first model. No
              hospital is contacted until your decision is structured and
              confirmed. This separation ensures that clinical suitability — not
              sales pressure — drives the process.
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
              {
                href: "/hospital-verification",
                label: "Hospital Verification Process",
              },
              { href: "/how-it-works", label: "How AetherHeal Works" },
              { href: "/explore", label: "Explore Framework" },
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
