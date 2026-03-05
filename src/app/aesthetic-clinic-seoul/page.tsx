import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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

export default function AestheticClinicSeoulPage() {
  return (
    <div className="min-h-full">
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">
            Aesthetic Medicine
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-6 leading-tight">
            Aesthetic Clinics in Seoul:{" "}
            <span className="italic text-brand-gold">
              Navigate with Confidence
            </span>
          </h1>
          <p className="text-text-body text-lg leading-relaxed">
            Seoul&apos;s Gangnam district alone has thousands of aesthetic
            clinics. The density of options can be overwhelming for international
            patients. AetherHeal provides structured support to help you make
            informed decisions about skin treatments and cosmetic procedures.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-3xl mx-auto space-y-16">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              Why Seoul for Aesthetic Treatments
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              Korea is recognized globally for its advanced dermatological
              research and aesthetic technology. Treatments like skin boosters,
              thread lifting, HIFU, and laser therapy are performed with
              specialized equipment and protocols developed in Korean clinical
              settings.
            </p>
            <p className="text-text-body leading-relaxed">
              Popular brands such as Rejuran, Juvelook, Sculptra, and Ulthera
              are widely administered by dermatologists with deep specialization.
              The challenge for international patients is identifying which
              clinic — and which physician — is appropriate for their needs.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">
              How AetherHeal Supports Your Decision
            </h2>
            <ul className="space-y-3">
              {[
                "Physician-led consultation to clarify treatment goals and skin concerns",
                "Objective evaluation of procedure options without brand bias",
                "Matching to partner clinics specializing in your area of interest",
                "Pre-treatment decision summary with expected outcomes and limitations",
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
              Treatments Commonly Discussed
            </h3>
            <p className="text-text-body leading-relaxed">
              Skin boosters and bio-stimulators, thread lifting, HIFU and RF
              tightening, laser resurfacing, filler and volume restoration, and
              anti-aging protocols. Each treatment plan is discussed with a
              licensed physician before any clinic contact.
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
                href: "/hair-transplant-korea",
                label: "Hair Transplant in Korea",
              },
              {
                href: "/plastic-surgery-korea",
                label: "Plastic Surgery in Korea",
              },
              {
                href: "/hospital-verification",
                label: "Hospital Verification Process",
              },
              { href: "/medical-journey", label: "Your Medical Journey" },
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
