import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "How to Choose a Hospital Abroad | AetherHeal",
  description:
    "A structured guide for international patients choosing a hospital abroad. Learn the key factors — physician verification, decision clarity, and journey planning — that reduce medical travel risk.",
  alternates: {
    canonical: "https://aetherheal.com/how-to-choose-hospital-abroad",
  },
  openGraph: {
    title: "How to Choose a Hospital Abroad | AetherHeal",
    description:
      "A structured guide for choosing a hospital abroad. Reduce risk with physician-led decision support.",
    url: "https://aetherheal.com/how-to-choose-hospital-abroad",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Choose a Hospital Abroad | AetherHeal",
    description:
      "Reduce medical travel risk with structured decision support.",
  },
}

export default function HowToChooseHospitalAbroadPage() {
  return (
    <div className="min-h-full">
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">
            Patient Guide
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-6 leading-tight">
            How to Choose a Hospital Abroad:{" "}
            <span className="italic text-brand-gold">
              A Framework for Safer Decisions
            </span>
          </h1>
          <p className="text-text-body text-lg leading-relaxed">
            Choosing a hospital in another country is one of the highest-stakes
            decisions a patient can make. Without local knowledge, language
            fluency, or clinical context, the risk of a poor outcome increases
            significantly. This guide outlines the key factors to consider.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-3xl mx-auto space-y-16">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              1. Clarify Your Decision Before Choosing a Hospital
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              Most patients start by comparing hospitals. This is backwards. The
              first step should be structuring your medical decision: What
              exactly do you need? What are the risks? What are your
              constraints?
            </p>
            <p className="text-text-body leading-relaxed">
              A structured decision summary — ideally prepared with physician
              support — becomes the foundation for evaluating any hospital. Without
              it, you are comparing marketing, not clinical suitability.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              2. Verify the Hospital&apos;s Clinical Specialization
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              A hospital that performs many types of surgery is not necessarily
              the right choice for your specific procedure. Look for depth of
              specialization: How many of this exact procedure does the surgeon
              perform per year? What are the revision rates?
            </p>
            <p className="text-text-body leading-relaxed">
              In Korea, many clinics specialize narrowly — which is an advantage
              if you match correctly, and a risk if you do not.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              3. Understand the Full Cost of Poor Decisions
            </h2>
            <p className="text-text-body leading-relaxed">
              The cost of a medical procedure abroad is not just the quoted
              price. It includes revision surgery risk, recovery complications,
              travel costs for follow-up, and the psychological burden of a
              decision made under pressure. Structured preparation reduces all of
              these costs.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              4. Ensure Post-Treatment Continuity
            </h2>
            <p className="text-text-body leading-relaxed">
              What happens after you leave the country? Who monitors your
              recovery? How do you reach your surgeon if complications arise?
              These questions must be answered before you travel — not after.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              How AetherHeal Addresses These Challenges
            </h2>
            <p className="text-text-body leading-relaxed">
              AetherHeal was built specifically to solve this problem. Our
              physician-led process structures your decision first, matches you
              to verified hospitals second, and coordinates your entire journey
              from arrival to follow-up. No shortcuts, no pressure, no
              commission-driven recommendations.
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
                href: "/hospital-verification",
                label: "Hospital Verification Process",
              },
              { href: "/medical-journey", label: "Your Medical Journey" },
              {
                href: "/hair-transplant-korea",
                label: "Hair Transplant in Korea",
              },
              {
                href: "/plastic-surgery-korea",
                label: "Plastic Surgery in Korea",
              },
              {
                href: "/aesthetic-clinic-seoul",
                label: "Aesthetic Clinics in Seoul",
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
