import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  GraduationCap,
  Brain,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"
import { assertPatientLocale } from "@/i18n/assert-locale"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { cn } from "@/lib/utils"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const t = dict.physician
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `https://aetherheal.com/${locale}/doctors/dr-jee-hoon-ju`,
      languages: Object.fromEntries(
        locales.map((l) => [
          l,
          `https://aetherheal.com/${l}/doctors/dr-jee-hoon-ju`,
        ])
      ),
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://aetherheal.com/${locale}/doctors/dr-jee-hoon-ju`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
  }
}

const credentialIcons = [GraduationCap, ShieldCheck, Brain]
const verificationModeStyles = {
  embedded: "border-brand-gold/30 bg-brand-gold/10",
  network: "border-slate-200 bg-slate-50/80",
}

export default async function PhysicianPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const t = dict.physician
  const prefix = `/${locale}`

  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": ["Person", "Physician"],
    name: "Dr. Jee Hoon Ju",
    alternateName: "주지훈",
    jobTitle: "Founder & Representative Director",
    worksFor: {
      "@type": "MedicalOrganization",
      name: "AetherHeal",
      url: "https://aetherheal.com",
    },
    affiliation: {
      "@type": "MedicalClinic",
      name: "Apgujeong Tune Clinic",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "University of Debrecen, Faculty of Medicine",
      },
      {
        "@type": "EducationalOrganization",
        name: "MIT Sloan School of Management",
      },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Medical Degree (MD)",
        recognizedBy: { "@type": "EducationalOrganization", name: "University of Debrecen" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "ABAM Certified — Aesthetic Medicine",
        recognizedBy: { "@type": "Organization", name: "American Board of Aesthetic Medicine" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Executive Education — AI in Health Care",
        recognizedBy: { "@type": "EducationalOrganization", name: "MIT Sloan School of Management" },
      },
    ],
    medicalSpecialty: [
      "Aesthetic Medicine",
      "Dermatology",
      "Hair Transplantation",
    ],
    knowsLanguage: ["English", "Korean", "Hungarian"],
    description:
      "Physician-operator who verified partner hospitals by working inside them as a practicing doctor. Founder of AetherHeal.",
    image: "https://aetherheal.com/assets/physician/dr-jee-hoon-ju-portrait.png",
  }

  return (
    <div className="min-h-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
      />

      {/* Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-brand-navy/[0.02] to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:gap-12">
            <div className="flex-1">
              <div className="mb-8">
                <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-sm">
                  {t.hero.badge}
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-6 leading-[1.1] tracking-tight">
                {t.hero.name}
              </h1>
              <p className="text-xl sm:text-2xl font-serif text-brand-gold leading-relaxed mb-6">
                {t.hero.title}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
                {t.hero.intro}
              </p>
            </div>
            <div className="mt-10 md:mt-0 shrink-0">
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] border border-slate-100">
                <Image
                  src="/assets/physician/dr-jee-hoon-ju-portrait.png"
                  alt="Dr. Jee Hoon Ju"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 224px, 256px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl text-brand-navy mb-10">
            {t.credentials.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.credentials.items.map((item: { label: string; credential: string; detail: string }, idx: number) => {
              const Icon = credentialIcons[idx % credentialIcons.length]
              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.08)]"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
                    {item.label}
                  </p>
                  <h3 className="font-serif text-lg text-brand-navy font-semibold mb-2">
                    {item.credential}
                  </h3>
                  <p className="text-sm text-text-body leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Verification Methodology */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-10 mb-10">
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">
                {t.verification.badge}
              </p>
              <h2 className="font-serif text-3xl text-brand-navy mb-4">
                {t.verification.title}
              </h2>
              <p className="text-text-body leading-relaxed max-w-3xl">
                {t.verification.intro}
              </p>
            </div>
            <div className="mt-6 sm:mt-0 shrink-0">
              <div className="relative w-full sm:w-56 h-40 sm:h-36 rounded-2xl overflow-hidden shadow-md border border-slate-100">
                <Image
                  src="/assets/physician/dr-jee-hoon-ju-conference.png"
                  alt="Dr. Jee Hoon Ju presenting at the 17th KSHRS Conference"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 224px"
                />
              </div>
              <p className="text-[11px] text-text-muted mt-2 text-center">KSHRS 17th Annual Conference, 2025</p>
            </div>
          </div>

          {/* Mode 1 */}
          <div className="mb-8">
            <h3 className="font-serif text-xl text-brand-navy mb-4">
              {t.verification.mode1.title}
            </h3>
            <p className="text-text-body leading-relaxed mb-6">
              {t.verification.mode1.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {t.verification.mode1.hospitals.map((h: { name: string; role: string }) => (
                <div
                  key={h.name}
                  className={cn("rounded-2xl border p-5", verificationModeStyles.embedded)}
                >
                  <h4 className="font-serif text-base text-brand-navy font-semibold mb-1">
                    {h.name}
                  </h4>
                  <p className="text-sm text-text-muted">{h.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mode 2 */}
          <div className="mb-8">
            <h3 className="font-serif text-xl text-brand-navy mb-4">
              {t.verification.mode2.title}
            </h3>
            <p className="text-text-body leading-relaxed mb-6">
              {t.verification.mode2.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.verification.mode2.hospitals.map((h: { name: string; basis: string }) => (
                <div
                  key={h.name}
                  className={cn("rounded-2xl border p-5", verificationModeStyles.network)}
                >
                  <h4 className="font-serif text-base text-brand-navy font-semibold mb-1">
                    {h.name}
                  </h4>
                  <p className="text-sm text-text-muted">{h.basis}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href={`${prefix}/methodology/how-we-verify-hospitals`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors"
            >
              {t.verification.methodologyLink} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Governance */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">
            {t.aiGovernance.badge}
          </p>
          <h2 className="font-serif text-3xl text-brand-navy mb-4">
            {t.aiGovernance.title}
          </h2>
          <p className="text-text-body leading-relaxed max-w-3xl">
            {t.aiGovernance.description}
          </p>
          <div className="mt-8 rounded-2xl border border-brand-navy/10 bg-brand-navy/[0.03] p-6 sm:p-8">
            <p className="font-serif text-lg text-brand-navy italic leading-relaxed">
              &ldquo;{t.aiGovernance.quote}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">
            {t.origin.badge}
          </p>
          <h2 className="font-serif text-3xl text-brand-navy mb-8">
            {t.origin.title}
          </h2>
          <div className="float-right ml-8 mb-6 hidden sm:block">
            <div className="relative w-48 h-60 rounded-2xl overflow-hidden shadow-md border border-slate-100">
              <Image
                src="/assets/physician/dr-jee-hoon-ju-surgeon.png"
                alt="Dr. Jee Hoon Ju as a hair transplant surgeon"
                fill
                className="object-cover object-top"
                sizes="192px"
              />
            </div>
          </div>
          <div className="space-y-6 text-lg text-text-body leading-[1.8]">
            {t.origin.paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8 sm:hidden">
            <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-md border border-slate-100">
              <Image
                src="/assets/physician/dr-jee-hoon-ju-surgeon.png"
                alt="Dr. Jee Hoon Ju as a hair transplant surgeon"
                fill
                className="object-cover object-top"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Structural Integrity */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl text-brand-navy mb-4">
            {t.structuralIntegrity.title}
          </h2>
          <p className="text-text-body leading-relaxed max-w-3xl mb-8">
            {t.structuralIntegrity.description}
          </p>
          <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6 sm:p-8">
            <p className="font-serif text-lg text-brand-navy leading-relaxed">
              {t.structuralIntegrity.highlight}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-bg-light">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy">
            {t.cta.title}
          </h2>
          <p className="text-text-body max-w-xl mx-auto leading-relaxed">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`${prefix}/intake`}>
              <button className="inline-flex items-center justify-center rounded-full bg-brand-navy px-8 py-3 text-sm font-semibold text-white hover:bg-brand-navy/90 transition-all shadow-md min-w-[260px]">
                {t.cta.primary}
              </button>
            </Link>
            <Link
              href={`${prefix}/how-it-works`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors"
            >
              {t.cta.secondary} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
