import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  MessageSquare,
  Stethoscope,
  Users,
  CheckCircle,
  Calendar,
  MapPin,
  RefreshCw,
  Scissors,
  Eye,
  FileCheck,
} from "lucide-react"
import { assertPatientLocale } from "@/i18n/assert-locale"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { cn } from "@/lib/utils"
import { Accordion } from "@/components/ui/accordion"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HospitalDict = Record<string, any>

function getHospitalData(dict: HospitalDict, slug: string) {
  const hospitals = dict.hospitals as HospitalDict | undefined
  if (!hospitals) return null
  const slugs = hospitals.slugs as string[] | undefined
  if (!slugs?.includes(slug)) return null
  return hospitals[slug] as HospitalDict | undefined
}

export async function generateStaticParams() {
  const dict = await getDictionary("en")
  const hospitals = dict.hospitals as HospitalDict | undefined
  if (!hospitals?.slugs) return []
  const slugs = hospitals.slugs as string[]
  const params: { locale: string; slug: string }[] = []
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const t = getHospitalData(dict, slug)
  if (!t) return {}
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `https://aetherheal.com/${locale}/hospitals/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://aetherheal.com/${l}/hospitals/${slug}`])
      ),
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://aetherheal.com/${locale}/hospitals/${slug}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
  }
}

const processStepIcons = [Calendar, Stethoscope, Clock, RefreshCw]

const hospitalImages: Record<string, {
  team?: string
  loupes?: string[]
  lobby?: string[]
  patientRoom?: string
  reception?: string
  flower?: string
  surgical?: string[]
  grafts?: string[]
  consumables?: string
  dissectionCloseup?: string
}> = {
  "tune-clinic": {
    team: "/assets/hospitals/tune-clinic/lobby-1.jpg",
    lobby: [
      "/assets/hospitals/tune-clinic/lobby-2.jpg",
      "/assets/hospitals/tune-clinic/lobby-3.jpg",
    ],
    patientRoom: "/assets/hospitals/tune-clinic/vip-room-1.jpg",
    reception: "/assets/hospitals/tune-clinic/reception.jpg",
  },
  "morgan-dermatology": {
    team: "/assets/hospitals/morgan-dermatology/medical-staff.png",
    loupes: [
      "/assets/hospitals/morgan-dermatology/loupe-1.png",
      "/assets/hospitals/morgan-dermatology/loupe-2.png",
      "/assets/hospitals/morgan-dermatology/loupe-3.png",
    ],
    lobby: [
      "/assets/hospitals/morgan-dermatology/lobby-3.png",
      "/assets/hospitals/morgan-dermatology/lobby-5.png",
    ],
    patientRoom: "/assets/hospitals/morgan-dermatology/patient-room.png",
    reception: "/assets/hospitals/morgan-dermatology/lobby-4.png",
    flower: "/assets/hospitals/morgan-dermatology/flower.png",
    surgical: [
      "/assets/hospitals/morgan-dermatology/operating-room.png",
      "/assets/hospitals/morgan-dermatology/surgery-team.png",
      "/assets/hospitals/morgan-dermatology/dissection-table.png",
    ],
    grafts: [
      "/assets/hospitals/morgan-dermatology/graft-sorting.png",
      "/assets/hospitals/morgan-dermatology/graft-plates.png",
    ],
    consumables: "/assets/hospitals/morgan-dermatology/consumables.png",
    dissectionCloseup: "/assets/hospitals/morgan-dermatology/dissection-closeup.png",
  },
}

export default async function HospitalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const t = getHospitalData(dict, slug)
  if (!t) notFound()
  const prefix = `/${locale}`

  const isMode1 = t.verification.modeLabel === "Mode 1"
  const images = hospitalImages[slug]

  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: t.name,
    alternateName: t.nameKr,
    medicalSpecialty: t.specialty.split(" · "),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Seoul",
      addressRegion: t.location.split(", ")[0],
      addressCountry: "KR",
    },
    availableLanguage: ["Korean"],
    isAcceptingPatients: true,
    employee: t.team.physicians.map(
      (p: { name: string; specialty: string; credentials: string[] }) => ({
        "@type": "Physician",
        name: p.name,
        medicalSpecialty: p.specialty,
        description: p.credentials[0],
      })
    ),
  }

  const faqItems = t.faq.items.map(
    (item: { question: string; answer: string }, i: number) => ({
      id: String(i + 1),
      question: item.question,
      answer: item.answer,
    })
  )

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map(
      (item: { question: string; answer: string }) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })
    ),
  }

  return (
    <div className="min-h-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6 border-b border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            {t.badge}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-3 leading-tight tracking-tight">
            {t.name}
          </h1>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-slate-500 font-light mb-10">
            <span className="font-serif text-brand-gold">{t.specialty}</span>
            <span className="text-slate-300">|</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {t.location}</span>
          </p>

          {images?.team && (
            <div className="relative w-full aspect-[2.2/1] rounded-[2rem] overflow-hidden border border-slate-100 bg-slate-50 mb-12">
              <Image src={images.team} alt={`${t.name} medical team`} fill className="object-cover object-[center_35%]" priority sizes="(max-width: 768px) 100vw, 1100px" />
            </div>
          )}

          {/* Key facts strip — dict-driven, hospital-specific. Omit from dict to skip. */}
          {(t as typeof t & { keyFacts?: { val: string; label: string }[] }).keyFacts && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(t as typeof t & { keyFacts: { val: string; label: string }[] }).keyFacts.map((s) => (
                <div key={s.label} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 text-center">
                  <p className="font-serif text-2xl sm:text-3xl text-brand-navy font-bold">{s.val}</p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Overview (compact) ── */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl text-brand-navy mb-8">{t.overview.title}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-6 text-[15px] text-slate-600 leading-[1.8] font-light">
              {(t.overview.paragraphs as string[]).slice(0, 2).map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="lg:col-span-2 space-y-4">
              {images?.lobby?.map((src: string, i: number) => (
                <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                  <Image src={src} alt={`${t.name} facility`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 450px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Procedures ── */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl text-brand-navy mb-8">{t.procedures.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.procedures.items.map((proc: { name: string; description: string }, idx: number) => {
              const icons = [Scissors, Stethoscope, Eye]
              const Icon = icons[idx % icons.length]
              return (
                <div key={proc.name} className={cn("rounded-2xl border p-6 sm:p-8", idx === 0 ? "border-brand-gold/20 bg-brand-gold/[0.02]" : "border-slate-200 bg-white")}>
                  <Icon className="w-5 h-5 text-brand-gold mb-4" />
                  <h3 className="font-serif text-base text-brand-navy font-medium mb-2">{proc.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">{proc.description}</p>
                </div>
              )
            })}
          </div>
          {(images?.grafts || images?.consumables) && (
            <div className="mt-8 grid grid-cols-3 gap-3">
              {images.grafts?.map((src: string, i: number) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                  <Image src={src} alt="Follicular grafts sorted for transplantation" fill className="object-cover" sizes="33vw" />
                </div>
              ))}
              {images.consumables && (
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                  <Image src={images.consumables} alt="Premium surgical consumables" fill className="object-cover" sizes="33vw" />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Dissection Team (centerpiece) ── */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-brand-navy">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">{t.team.surgicalTeam.title}</p>
          <p className="font-serif text-lg text-white/80 leading-relaxed font-light max-w-2xl mb-12">{t.team.surgicalTeam.description}</p>

          <div className="grid grid-cols-2 gap-6 mb-12 max-w-md">
            {t.team.surgicalTeam.stats.map((stat: { number: string; label: string }) => (
              <div key={stat.label}>
                <p className="font-serif text-4xl sm:text-5xl text-white font-bold">{stat.number}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {images?.surgical && (
            <div className="grid grid-cols-3 gap-3 mb-12">
              {images.surgical.map((src: string, i: number) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                  <Image src={src} alt={`${t.name} surgical team`} fill className="object-cover" sizes="33vw" />
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gold mb-3">Why this matters</p>
              <p className="text-[15px] text-white/70 leading-[1.8] font-light">{t.team.surgicalTeam.explanation}</p>
            </div>
            {images?.loupes && (
              <div className="grid grid-cols-3 gap-3 self-start">
                {images.loupes.map((src: string, i: number) => (
                  <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10">
                    <Image src={src} alt="5.5x SurgiTel surgical loupes" fill className="object-cover" sizes="(max-width: 768px) 33vw, 180px" />
                  </div>
                ))}
                <p className="col-span-3 text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500 text-center mt-2">5.5× SurgiTel Loupes</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Physicians ── */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl text-brand-navy mb-10">{t.team.title}</h2>
          <div className="space-y-0 divide-y divide-slate-100">
            {t.team.physicians.map((doc: { name: string; nameKr: string; photo?: string; role: string; specialty: string; credentials: string[] }, idx: number) => {
              return (
                <div key={doc.name} className="py-10 first:pt-0 last:pb-0">
                  <div className="flex flex-col md:flex-row md:items-start md:gap-10">
                    <div className="shrink-0 mb-5 md:mb-0">
                      <div className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-100 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.06)]">
                        {doc.photo && (
                          <Image
                            src={doc.photo}
                            alt={doc.name}
                            width={112}
                            height={112}
                            className="w-full h-full object-cover object-top"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 mb-1">
                        <h3 className="font-serif text-xl text-brand-navy font-medium">{doc.name}</h3>
                        <span className="text-xs text-slate-400">{doc.nameKr}</span>
                      </div>
                      <p className={cn(
                        "text-xs font-semibold uppercase tracking-[0.1em] mb-4",
                        idx === 0 ? "text-brand-gold" : "text-slate-500"
                      )}>{doc.role}</p>
                      <p className="text-[15px] text-slate-600 font-light leading-relaxed mb-4">{doc.specialty}</p>
                      <div className="flex flex-col gap-1.5">
                        {doc.credentials.map((cred: string, i: number) => (
                          <span key={i} className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-light">
                            <span className="w-1 h-1 rounded-full bg-brand-gold/50 shrink-0"></span>
                            {cred}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Verification ── */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-slate-50/30 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] rounded-full", isMode1 ? "bg-brand-gold/10 text-brand-gold border border-brand-gold/20" : "bg-slate-100 text-slate-500 border border-slate-200")}>
              <ShieldCheck className="w-3 h-3" /> {t.verification.modeLabel}
            </span>
            <span className="text-xs text-slate-400 font-light">{t.verification.modeSublabel}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">{t.verification.mode}</h2>
          <p className="text-[15px] text-slate-600 leading-[1.8] font-light max-w-3xl mb-8">{t.verification.modeDescription}</p>
          <Link href={`${prefix}/methodology/how-we-verify-hospitals`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-brand-navy hover:text-brand-gold transition-colors">
            {t.verification.methodologyLink} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── Patient Process ── */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl text-brand-navy mb-8">{t.patientProcess.title}</h2>

          {t.patientProcess.capacityNote && (
            <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.02] p-6 mb-10">
              <h3 className="text-sm text-brand-navy font-semibold mb-1">{t.patientProcess.capacityNote.title}</h3>
              <p className="text-xs text-slate-500 font-light mb-4">{t.patientProcess.capacityNote.description}</p>
              {t.patientProcess.capacityNote.rules && (
                <div className="grid grid-cols-3 gap-4">
                  {t.patientProcess.capacityNote.rules.map((rule: { label: string; value: string }) => (
                    <div key={rule.label}>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 mb-1">{rule.label}</p>
                      <p className="text-sm text-brand-navy font-medium">{rule.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {t.patientProcess.steps.map((step: { phase: string; title: string; description: string }, idx: number) => {
              const StepIcon = processStepIcons[idx % processStepIcons.length]
              return (
                <div key={step.phase} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <StepIcon className="w-4 h-4 text-brand-navy/50" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gold">{step.phase}</span>
                  </div>
                  <h3 className="text-sm text-brand-navy font-medium mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Practical Info (Language + Recovery + Revision merged) ── */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Recovery + Language */}
          <div>
            <h2 className="font-serif text-2xl text-brand-navy mb-6">{t.recovery.title}</h2>
            <div className="space-y-3 mb-8">
              {t.recovery.items.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-gold/60 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 leading-relaxed font-light">{item}</p>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
              <MessageSquare className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm text-brand-navy font-medium mb-1">{t.languages.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{t.languages.description}</p>
              </div>
            </div>
          </div>

          {/* Right: Revision Guarantee + photo */}
          <div>
            {t.revisionGuarantee && (
              <div className="rounded-2xl border border-brand-gold/20 bg-white p-6 sm:p-8 mb-6">
                <FileCheck className="w-5 h-5 text-brand-gold mb-3" />
                <h2 className="font-serif text-xl text-brand-navy mb-3">{t.revisionGuarantee.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed font-light mb-3">{t.revisionGuarantee.description}</p>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{t.revisionGuarantee.detail}</p>
              </div>
            )}
            {images?.patientRoom && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                <Image src={images.patientRoom} alt={`${t.name} patient recovery room`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 500px" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Decision Summary ── */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl text-brand-navy mb-6">{t.decisionSummary.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gold mb-2">{t.decisionSummary.bestForLabel}</p>
                <p className="text-sm text-slate-600 leading-relaxed font-light">{t.decisionSummary.bestFor}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">{t.decisionSummary.notIdealLabel}</p>
                <p className="text-sm text-slate-600 leading-relaxed font-light">{t.decisionSummary.notIdeal}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl text-brand-navy mb-8">{t.faq.title}</h2>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* ── Reviewer Metadata ── */}
      <section className="w-full px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto py-6 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
            <span>{t.reviewerMeta.label}</span>
            <Link href={`${prefix}/doctors/dr-jee-hoon-ju`} className="font-semibold text-brand-navy hover:text-brand-gold transition-colors">{t.reviewerMeta.name}</Link>
            <span className="text-slate-300">&middot;</span>
            <span>{t.reviewerMeta.credentials}</span>
            <span className="text-slate-300">&middot;</span>
            <span>{t.reviewerMeta.lastReviewed}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-light">{t.reviewerMeta.verificationMode}</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-slate-50/50">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy">{t.cta.title}</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-light">{t.cta.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`${prefix}/intake`}>
              <button className="inline-flex items-center justify-center rounded-full bg-brand-navy px-8 py-3 text-sm font-semibold text-white hover:bg-brand-navy/90 transition-all shadow-md min-w-[260px]">
                {t.cta.primary}
              </button>
            </Link>
            <Link href={`${prefix}/explore`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors">
              {t.cta.secondary} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
