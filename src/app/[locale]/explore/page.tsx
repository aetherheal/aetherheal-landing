import type { Metadata } from "next"
import Link from "next/link"
import {
  Scissors, Sparkles, PenTool, Bot, Eye, Smile, Microscope, Activity,
  DollarSign, TrendingUp, Clock, Scale, FileSignature, Target,
} from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Divider } from "@/components/ui/divider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { ExploreFlipCards } from "./flip-cards"

const failureIcons = [Eye, DollarSign, TrendingUp, Clock]
const disciplineIcons = [Scissors, Sparkles, PenTool, Bot, Eye, Smile, Microscope, Activity]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.explore.meta
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `https://aetherheal.com/${locale}/explore`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://aetherheal.com/${l}/explore`])),
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://aetherheal.com/${locale}/explore`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: ["/og-image.jpg"],
    },
  }
}

export default async function ExplorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.explore
  const prefix = `/${locale}`

  return (
    <div className="min-h-full">
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <SectionLabel color="gold" className="block mb-2">{t.hero.badge}</SectionLabel>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-navy font-medium">{t.hero.h1}</h1>
          <p className="text-text-body text-lg max-w-2xl mx-auto leading-relaxed">{t.hero.subtitle}</p>
          <div className="pt-2"><Link href={`${prefix}/how-it-works`}><Button variant="navy" size="lg" className="min-w-[200px]">{t.hero.cta}</Button></Link></div>
          <Divider className="mx-auto" />
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="font-serif text-3xl text-brand-navy mb-4">{t.concepts.title}</h2><p className="text-text-body">{t.concepts.subtitle}</p></div>
          <ExploreFlipCards items={t.concepts.items} />
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel color="muted" className="block mb-2">{t.failureReasons.badge}</SectionLabel>
            <h2 className="font-serif text-3xl text-brand-navy mb-4">{t.failureReasons.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.failureReasons.items.map((reason, i) => {
              const Icon = failureIcons[i]
              return (
                <div key={reason.label} className="flex items-start gap-4 bg-white p-5 rounded-xl border border-border-light">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-danger" /></div>
                  <div><p className="text-sm font-semibold text-text-deep">{reason.label}</p><p className="text-sm text-text-body leading-relaxed">{reason.description}</p></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel color="gold" className="block mb-2">{t.caseStudies.badge}</SectionLabel>
            <h2 className="font-serif text-3xl text-brand-navy mb-4">{t.caseStudies.title}</h2>
            <p className="text-text-body text-sm">{t.caseStudies.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {t.caseStudies.cases.map((cs) => (
              <Card key={cs.id} className="p-5 sm:p-8 space-y-4" accent="gold">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-text-muted">{t.caseStudies.caseLabel} {cs.number}</span>
                  <span className="text-xs font-mono text-text-muted">{cs.id}</span>
                </div>
                <h3 className="text-lg font-semibold text-text-deep">
                  {cs.title}
                  {cs.badge && <span className="ml-2 inline-block text-[10px] font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full">{cs.badge}</span>}
                </h3>
                <div className="space-y-2">
                  <div><p className="text-xs font-semibold text-text-muted uppercase tracking-widest">{t.caseStudies.goalLabel}</p><p className="text-sm text-text-body">{cs.goal}</p></div>
                  <div><p className="text-xs font-semibold text-text-muted uppercase tracking-widest">{t.caseStudies.constraintLabel}</p><p className="text-sm text-text-body">{cs.constraint}</p></div>
                </div>
                <p className="text-xs text-text-muted italic">{t.caseStudies.disclaimer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-bg-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel color="gold" className="block mb-2">{t.disciplines.badge}</SectionLabel>
            <h2 className="font-serif text-3xl text-brand-navy mb-4">{t.disciplines.title}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.disciplines.items.map((label, i) => {
              const Icon = disciplineIcons[i]
              return (
                <Card key={label} className="text-center p-6 hover:shadow-float transition-all duration-300">
                  <Icon className="w-8 h-8 text-brand-navy mx-auto mb-3" /><p className="text-sm font-semibold text-text-deep">{label}</p>
                </Card>
              )
            })}
          </div>
          <div className="mt-14 text-center bg-white border border-border-light rounded-xl p-6 sm:p-8">
            <p className="text-text-body mb-5">{t.disciplines.cta}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={`${prefix}/how-it-works`}><Button variant="navy" size="lg" className="min-w-[200px]">{t.disciplines.ctaHowItWorks}</Button></Link>
              <Link href={`${prefix}/medical-boundary`}><Button variant="outline" size="lg" className="min-w-[200px]">{t.disciplines.ctaMedicalBoundary}</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
