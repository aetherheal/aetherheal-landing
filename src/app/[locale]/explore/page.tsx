import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
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
const aiOutputIcons = [Target, Scale, FileSignature, Bot]
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
  const galleryCases = [
    {
      number: "01",
      title: t.caseStudies.maleCaseTitle,
      subtitle: "FUE 2500 follicles",
      image: "/assets/explore-gallery/hair-transplant-male-case-1.png",
      alt: `${t.caseStudies.maleCaseTitle} — FUE 2500 follicles`,
    },
    {
      number: "02",
      title: t.caseStudies.femaleCaseTitle,
      subtitle: "FUE 1500 follicles",
      image: "/assets/explore-gallery/hair-transplant-female-case-1.png",
      alt: `${t.caseStudies.femaleCaseTitle} — FUE 1500 follicles`,
    },
    {
      number: "03",
      title: t.caseStudies.maleCase2Title,
      subtitle: "FUE 2000 follicles",
      image: "/assets/explore-gallery/hair-transplant-male-case-2.png",
      alt: `${t.caseStudies.maleCase2Title} — FUE 2000 follicles`,
    },
    {
      number: "04",
      title: t.caseStudies.femaleCase2Title,
      subtitle: "FUE 1750 follicles",
      image: "/assets/explore-gallery/hair-transplant-female-case-2-combined.png",
      alt: `${t.caseStudies.femaleCase2Title} — FUE 1750 follicles`,
    },
  ]

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
            <SectionLabel color="gold" className="block mb-2">{t.aiPreparation.badge}</SectionLabel>
            <h2 className="font-serif text-3xl text-brand-navy mb-4">{t.aiPreparation.title}</h2>
            <p className="text-text-body max-w-3xl mx-auto leading-relaxed">{t.aiPreparation.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8">
            {t.aiPreparation.outputs.map((item, i) => {
              const Icon = aiOutputIcons[i]
              return (
                <Card key={item.title} className="p-6 space-y-3" accent="gold">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-navy" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-deep">{item.title}</h3>
                  <p className="text-sm text-text-body leading-relaxed">{item.body}</p>
                </Card>
              )
            })}
          </div>
          <div className="rounded-2xl border border-border-light bg-bg-light p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">{t.aiPreparation.boundaryLabel}</p>
            <p className="text-sm text-text-body leading-relaxed">{t.aiPreparation.boundaryNote}</p>
          </div>
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel color="gold" className="block mb-2">{t.caseStudies.badge}</SectionLabel>
            <h2 className="font-serif text-3xl text-brand-navy mb-4">{t.caseStudies.title}</h2>
            <p className="text-text-body text-sm">{t.caseStudies.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-20">
            {galleryCases.map((cs) => (
              <div key={cs.number} className="group flex flex-col space-y-6">
                
                {/* Image Container */}
                <div className="flex flex-col gap-2">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                    <Image src={cs.image} alt={cs.alt} fill className="object-contain" sizes="(min-width: 1024px) 50vw, 100vw" />
                  </div>
                </div>

                {/* Caption / Content */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-t border-slate-200 pt-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">{t.caseStudies.caseLabel} {cs.number}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{t.caseStudies.beforeAfterLabel}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-brand-navy">{cs.title}</h3>
                    <p className="text-sm text-text-body">{cs.subtitle}</p>
                  </div>
                  <p className="text-xs text-text-muted italic max-w-[200px] text-left sm:text-right mt-1">
                    {t.caseStudies.disclaimer}
                  </p>
                </div>
              </div>
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
