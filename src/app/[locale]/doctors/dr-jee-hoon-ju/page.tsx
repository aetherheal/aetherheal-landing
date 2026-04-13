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
  embedded: "border-brand-gold/20 bg-brand-gold/[0.02]",
  network: "border-slate-100 bg-slate-50/50",
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
      <section className="pt-32 pb-24 sm:pt-40 sm:pb-32 px-4 sm:px-6 border-b border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:gap-16 lg:gap-24">
            <div className="flex-1">
              <div className="mb-10">
                <span className="inline-flex items-center text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">
                  {t.hero.badge}
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-6 leading-tight tracking-tight">
                {t.hero.name}
              </h1>
              <p className="text-lg sm:text-xl font-serif text-slate-500 leading-snug mb-8 font-light">
                {t.hero.title}
              </p>
              <p className="text-[17px] text-slate-600 leading-[1.8] font-light max-w-2xl">
                {t.hero.intro}
              </p>
            </div>
            <div className="mt-12 md:mt-0 shrink-0">
              <div className="relative w-64 h-[22rem] sm:w-[300px] sm:h-[400px] rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.08)]">
                <Image
                  src="/assets/physician/dr-jee-hoon-ju-portrait.png"
                  alt="Dr. Jee Hoon Ju"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 256px, 300px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl text-brand-navy mb-16 text-center">
            {t.credentials.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.credentials.items.map((item: { label: string; credential: string; detail: string }, idx: number) => {
              const Icon = credentialIcons[idx % credentialIcons.length]
              const isSpecial = idx === 2
              return (
                <div
                  key={item.label}
                  className={cn(
                    "rounded-[2rem] border p-8 sm:p-10 transition-all duration-300",
                    isSpecial ? "border-brand-gold/20 bg-brand-gold/[0.02]" : "border-slate-200 bg-white"
                  )}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                      isSpecial ? "bg-brand-gold/10 text-brand-gold" : "bg-slate-100 text-slate-500"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      {item.label}
                    </p>
                  </div>
                  <h3 className={cn(
                    "font-serif text-lg sm:text-xl font-medium mb-4 leading-snug",
                    isSpecial ? "text-brand-gold" : "text-brand-navy"
                  )}>
                    {item.credential}
                  </h3>
                  <p className="text-sm text-slate-600 leading-[1.8] font-light">
                    {item.detail}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Verification Methodology */}
      <section className="w-full py-24 sm:py-36 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start gap-16 lg:gap-24 mb-20 sm:mb-24">
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-brand-gold/40 block"></span>
                {t.verification.badge}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 leading-tight">
                {t.verification.title}
              </h2>
              <p className="text-lg sm:text-xl font-serif text-slate-600 leading-[1.8] font-light max-w-2xl">
                {t.verification.intro}
              </p>
            </div>
            <div className="lg:w-80 shrink-0">
              <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.08)] bg-slate-50">
                <Image
                  src="/assets/physician/dr-jee-hoon-ju-conference.png"
                  alt="Dr. Jee Hoon Ju presenting at the 17th KSHRS Conference"
                  fill
                  className="object-cover object-center filter sepia-[0.2] contrast-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-400 mt-6 text-center">
                KSHRS 17th Annual Conference, 2025
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 lg:gap-x-24">
            {/* Mode 1 Header */}
            <div className="lg:col-span-7 order-1 mb-8 lg:mb-12">
              <h3 className="font-serif text-xl sm:text-2xl text-brand-gold mb-6">
                {t.verification.mode1.title}
              </h3>
              <p className="text-[17px] text-slate-600 leading-[1.8] font-light max-w-xl">
                {t.verification.mode1.description}
              </p>
            </div>
            
            {/* Mode 2 Header */}
            <div className="lg:col-span-5 order-3 lg:order-2 mb-8 lg:mb-12">
              <h3 className="font-serif text-xl sm:text-2xl text-brand-navy/60 mb-6">
                {t.verification.mode2.title}
              </h3>
              <p className="text-[17px] text-slate-500 leading-[1.8] font-light">
                {t.verification.mode2.description}
              </p>
            </div>

            {/* Mode 1 List */}
            <div className="lg:col-span-7 order-2 lg:order-3 mb-16 lg:mb-0">
              <div className="flex flex-col">
                {t.verification.mode1.hospitals.map((h: { name: string; role: string }, idx: number) => (
                  <div
                    key={h.name}
                    className={cn(
                      "flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-6 border-b border-brand-gold/10",
                      idx === 0 && "border-t"
                    )}
                  >
                    <h4 className="font-serif text-lg text-brand-navy font-medium shrink-0">
                      {h.name}
                    </h4>
                    <p className="text-sm text-slate-500 font-light text-left sm:text-right">{h.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mode 2 List */}
            <div className="lg:col-span-5 order-4">
              <div className="flex flex-col">
                {t.verification.mode2.hospitals.map((h: { name: string; basis: string }, idx: number) => (
                  <div
                    key={h.name}
                    className={cn(
                      "py-6 border-b border-slate-100",
                      idx === 0 && "border-t"
                    )}
                  >
                    <h4 className="font-serif text-base text-brand-navy/80 font-medium mb-3">
                      {h.name}
                    </h4>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">{h.basis}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 pt-16 border-t border-slate-100 flex justify-center">
            <Link
              href={`${prefix}/methodology/how-we-verify-hospitals`}
              className="inline-flex items-center gap-4 text-[13px] font-bold uppercase tracking-[0.15em] text-brand-navy hover:text-brand-gold transition-colors"
            >
              {t.verification.methodologyLink} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Governance */}
      <section className="w-full py-24 sm:py-40 px-4 sm:px-6 bg-slate-50/30 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative pl-10 border-l-[1px] border-brand-gold/30 py-8">
                <p className="font-serif text-2xl sm:text-3xl text-brand-navy leading-[1.6] font-medium">
                  {t.aiGovernance.quote}
                </p>
                <div className="absolute top-0 -left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-4xl font-serif text-brand-gold/40 select-none shadow-sm border border-slate-100">
                  &ldquo;
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-brand-gold/40 block"></span>
                {t.aiGovernance.badge}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-6 leading-tight">
                {t.aiGovernance.title}
              </h2>
              <p className="text-[17px] text-slate-600 leading-[1.8] font-light max-w-2xl">
                {t.aiGovernance.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="w-full py-24 sm:py-40 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-6">
              {t.origin.badge}
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-8">
              {t.origin.title}
            </h2>
          </div>
          
          <div className="clearfix">
            <div className="float-none md:float-right md:ml-16 mb-12 md:mb-8 w-full md:w-72">
              <div className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-sm">
                <Image
                  src="/assets/physician/dr-jee-hoon-ju-surgeon.png"
                  alt="Dr. Jee Hoon Ju as a hair transplant surgeon"
                  fill
                  className="object-cover object-top filter grayscale contrast-110 opacity-90"
                  sizes="(max-width: 768px) 100vw, 288px"
                />
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 mt-6 text-center md:text-left">
                Operating Theater
              </p>
            </div>
            
            <div className="space-y-10 text-lg sm:text-[19px] text-slate-700 font-serif leading-[1.9] font-light">
              {t.origin.paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Structural Integrity */}
      <section className="w-full py-24 sm:py-36 px-4 sm:px-6 bg-slate-50/30 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 leading-tight">
              {t.structuralIntegrity.title}
            </h2>
            <p className="text-[17px] text-slate-600 leading-[1.8] font-light">
              {t.structuralIntegrity.description}
            </p>
          </div>
          <div className="relative rounded-[2.5rem] bg-white border border-brand-gold/20 p-10 sm:p-16 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.05)] text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />
            <p className="font-serif text-xl sm:text-2xl text-brand-navy leading-[1.6] font-medium max-w-2xl mx-auto">
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
