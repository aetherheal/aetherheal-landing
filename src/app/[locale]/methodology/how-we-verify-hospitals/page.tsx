import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  DollarSign,
  Video,
  HeartPulse,
  FileText,
  UserCheck,
  XCircle,
  RefreshCw,
} from "lucide-react"
import { assertPatientLocale } from "@/i18n/assert-locale"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { Accordion } from "@/components/ui/accordion"

const criteriaIcons = [UserCheck, DollarSign, Video, HeartPulse, FileText]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const t = dict.methodology
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `https://aetherheal.com/${locale}/methodology/how-we-verify-hospitals`,
      languages: Object.fromEntries(
        locales.map((l) => [
          l,
          `https://aetherheal.com/${l}/methodology/how-we-verify-hospitals`,
        ])
      ),
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://aetherheal.com/${locale}/methodology/how-we-verify-hospitals`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
  }
}

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const t = dict.methodology
  const prefix = `/${locale}`

  const faqItems = t.faq.items.map((item: { question: string; answer: string }, i: number) => ({
    id: String(i + 1),
    question: item.question,
    answer: item.answer,
  }))

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item: { question: string; answer: string }) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.meta.title,
    description: t.meta.description,
    author: {
      "@type": "Person",
      name: "Dr. Jee Hoon Ju",
      url: "https://aetherheal.com/en/doctors/dr-jee-hoon-ju",
    },
    publisher: {
      "@type": "MedicalOrganization",
      name: "AetherHeal",
      url: "https://aetherheal.com",
    },
    datePublished: "2026-04-13",
    dateModified: "2026-04-13",
  }

  return (
    <div className="min-h-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-brand-navy/[0.02] to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-sm">
              {t.hero.badge}
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-10 leading-[1.1] tracking-tight">
            {t.hero.h1}{" "}
            <span className="italic text-brand-gold">{t.hero.h1Highlight}</span>
          </h1>
          <div className="max-w-3xl space-y-6">
            <p className="text-xl sm:text-2xl font-serif text-brand-navy leading-relaxed">
              {t.hero.oneSentenceAnswer}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t.hero.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Why Verification Matters */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl text-brand-navy mb-6">
            {t.whyItMatters.title}
          </h2>
          <div className="space-y-4 text-lg text-text-body leading-relaxed max-w-3xl">
            {t.whyItMatters.paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Layer 1 — Published Minimum Standard */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">
            {t.layer1.badge}
          </p>
          <h2 className="font-serif text-3xl text-brand-navy mb-4">
            {t.layer1.title}
          </h2>
          <p className="text-text-body leading-relaxed mb-10 max-w-3xl">
            {t.layer1.intro}
          </p>

          <div className="space-y-4">
            {t.layer1.criteria.map((criterion: { title: string; description: string; basis: string }, idx: number) => {
              const Icon = criteriaIcons[idx % criteriaIcons.length]
              return (
                <div
                  key={criterion.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_-16px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-11 h-11 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-brand-navy font-semibold mb-2">
                        {criterion.title}
                      </h3>
                      <p className="text-text-body text-sm leading-relaxed mb-2">
                        {criterion.description}
                      </p>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {criterion.basis}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-brand-navy/10 bg-brand-navy/[0.03] p-6">
            <p className="text-sm text-text-body leading-relaxed">
              {t.layer1.footnote}
            </p>
          </div>
        </div>
      </section>

      {/* Layer 2 — Angel Physician Clinical Assessment */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">
            {t.layer2.badge}
          </p>
          <h2 className="font-serif text-3xl text-brand-navy mb-4">
            {t.layer2.title}
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed max-w-3xl mb-8">
            {t.layer2.paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6 sm:p-8 mb-8">
            <p className="font-serif text-lg text-brand-navy italic leading-relaxed">
              &ldquo;{t.layer2.quote}&rdquo;
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">
              {t.layer2.foundingNote.badge}
            </p>
            <p className="text-sm text-text-body leading-relaxed">
              {t.layer2.foundingNote.text}
            </p>
          </div>
        </div>
      </section>

      {/* Rejection Transparency */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-brand-navy border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">
            {t.rejection.badge}
          </p>
          <h2 className="font-serif text-3xl text-white mb-4">
            {t.rejection.title}
          </h2>
          <p className="text-slate-300 leading-relaxed mb-10 max-w-3xl">
            {t.rejection.intro}
          </p>

          <div className="flex justify-center gap-8 sm:gap-16 mb-10">
            {t.rejection.stats.map((stat: { number: string; label: string }) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-5xl sm:text-6xl text-white font-bold leading-none">
                  {stat.number}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-8">
            {t.rejection.reasons.map((reason: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-400/70 shrink-0 mt-1" />
                <p className="text-slate-300 text-sm leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            {t.rejection.anonymityNote}
          </p>
        </div>
      </section>

      {/* Ongoing Monitoring */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-5 mb-8">
            <div className="w-11 h-11 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 mt-1">
              <RefreshCw className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <h2 className="font-serif text-3xl text-brand-navy mb-4">
                {t.monitoring.title}
              </h2>
              <p className="text-text-body leading-relaxed max-w-3xl">
                {t.monitoring.intro}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.monitoring.triggers.map((trigger: string, i: number) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <p className="text-sm text-text-body leading-relaxed">{trigger}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Summary Box */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[32px] border border-slate-200 bg-slate-50/40 px-6 py-8 sm:px-8 sm:py-10">
            <h2 className="font-serif text-2xl text-brand-navy mb-6">
              {t.decisionSummary.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-3">
                  {t.decisionSummary.bestForLabel}
                </p>
                <p className="text-sm text-text-body leading-relaxed">
                  {t.decisionSummary.bestFor}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">
                  {t.decisionSummary.notIdealLabel}
                </p>
                <p className="text-sm text-text-body leading-relaxed">
                  {t.decisionSummary.notIdeal}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-12 sm:py-24 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl text-brand-navy mb-10">
            {t.faq.title}
          </h2>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* Reviewer Metadata */}
      <section className="w-full px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto py-8 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-muted">
            <span>{t.reviewerMeta.label}</span>
            <Link
              href={`${prefix}/doctors/dr-jee-hoon-ju`}
              className="font-semibold text-brand-navy hover:text-brand-gold transition-colors"
            >
              {t.reviewerMeta.name}
            </Link>
            <span className="text-text-muted/60">&middot;</span>
            <span>{t.reviewerMeta.credentials}</span>
            <span className="text-text-muted/60">&middot;</span>
            <span>{t.reviewerMeta.lastReviewed}</span>
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
              href={`${prefix}/trust-protocol`}
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
