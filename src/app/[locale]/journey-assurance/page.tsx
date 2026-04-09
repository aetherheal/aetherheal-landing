import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Shield,
  CreditCard,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ClipboardCheck,
  RefreshCcw,
} from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion } from "@/components/ui/accordion"
import { assertPatientLocale } from "@/i18n/assert-locale"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

const stepIcons = [CreditCard, Shield, RefreshCcw]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const t = dict.journeyAssurance.meta
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `https://aetherheal.com/${locale}/journey-assurance`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://aetherheal.com/${l}/journey-assurance`])
      ),
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://aetherheal.com/${locale}/journey-assurance`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
  }
}

export default async function JourneyAssurancePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const t = dict.journeyAssurance
  const prefix = `/${locale}`

  return (
    <div className="min-h-full bg-white">
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
            <br className="hidden sm:block" />
            <span className="italic text-brand-gold">{t.hero.h1Highlight}</span>
          </h1>
          <div className="max-w-3xl space-y-6 text-lg sm:text-xl text-slate-600 font-light leading-[1.8]">
            <p className="text-xl sm:text-2xl font-serif text-brand-navy leading-relaxed">
              {t.hero.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-12 xl:gap-20">
          {/* Sidebar ToC */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 p-6 bg-slate-50/80 border border-slate-100 rounded-2xl">
              <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">
                {dict.common.contents}
              </h2>
              <nav>
                <ol className="space-y-4">
                  {t.toc.map(
                    (item: { id: string; label: string }, i: number) => (
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
                    )
                  )}
                </ol>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Mobile ToC */}
            <div className="block lg:hidden mb-16 p-6 sm:p-8 bg-slate-50 border border-slate-100 rounded-2xl">
              <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">
                {dict.common.tableOfContents}
              </h2>
              <ol className="space-y-4">
                {t.toc.map(
                  (item: { id: string; label: string }, i: number) => (
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
                  )
                )}
              </ol>
            </div>

            <div className="space-y-24">
              {/* How It Works */}
              <div id="how-it-works" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  {t.howItWorks.title}
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-slate-600 font-light leading-[1.8]">
                    {t.howItWorks.intro}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {t.howItWorks.steps.map(
                      (
                        step: { title: string; body: string },
                        i: number
                      ) => {
                        const Icon = stepIcons[i]
                        return (
                          <Card key={step.title} className="p-6 sm:p-8 space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-2xl bg-brand-navy/5 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-brand-navy" />
                              </div>
                              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                                {t.howItWorks.stepLabel} {i + 1}
                              </span>
                            </div>
                            <h3 className="font-serif text-xl text-text-deep">
                              {step.title}
                            </h3>
                            <p className="text-sm text-text-body leading-relaxed">
                              {step.body}
                            </p>
                          </Card>
                        )
                      }
                    )}
                  </div>
                </div>
              </div>

              {/* What's Covered / What's Not Covered */}
              <div id="coverage" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  {t.coverage.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Covered */}
                  <div className="bg-white rounded-2xl border border-emerald-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                        {t.coverage.coveredTitle}
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      {t.coverage.coveredItems.map((item: string) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center"
                            aria-label="Covered"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          </span>
                          <span className="text-sm text-text-body">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not Covered */}
                  <div className="bg-white rounded-2xl border border-red-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                        <XCircle className="w-5 h-5 text-danger" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-danger">
                        {t.coverage.notCoveredTitle}
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      {t.coverage.notCoveredItems.map(
                        (item: { label: string; detail: string }) => (
                          <li key={item.label} className="flex items-start gap-3">
                            <span
                              className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center"
                              aria-label="Not covered"
                            >
                              <XCircle className="w-3.5 h-3.5 text-danger" />
                            </span>
                            <div>
                              <span className="text-sm font-medium text-text-deep">
                                {item.label}
                              </span>
                              <p className="text-xs text-text-muted leading-relaxed mt-0.5">
                                {item.detail}
                              </p>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div id="faq" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  {t.faq.title}
                </h2>
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-5 h-5 text-brand-gold" />
                  <SectionLabel color="gold">{t.faq.label}</SectionLabel>
                </div>
                <Accordion items={t.faq.items} />
              </div>

              {/* Closing CTA */}
              <div id="cta" className="scroll-mt-32">
                <div className="p-8 sm:p-12 bg-brand-navy rounded-2xl text-center">
                  <ClipboardCheck className="w-10 h-10 text-brand-gold mx-auto mb-6" />
                  <p className="text-xl sm:text-2xl font-serif text-white leading-relaxed mb-8">
                    {t.cta.headline}
                  </p>
                  <Link href={`${prefix}/how-it-works`}>
                    <Button variant="gold" size="lg" className="min-w-[200px]">
                      {t.cta.button}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
