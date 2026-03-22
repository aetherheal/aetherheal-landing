import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  Scissors, Sparkles, PenTool, Bot, Eye, Smile, Microscope, Activity,
  DollarSign, TrendingUp, Clock, Scale, FileSignature, Target, Info,
  Brain, HeartPulse, ScanLine,
} from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Divider } from "@/components/ui/divider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { assertPatientLocale } from "@/i18n/assert-locale"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { ExploreFlipCards } from "./flip-cards"
import { CaseCarousel, type CaseItem } from "./case-carousel"

const failureIcons = [Eye, DollarSign, TrendingUp, Clock]
const aiOutputIcons = [Target, Scale, FileSignature, Bot]
const disciplineIcons = [Scissors, Sparkles, PenTool, Bot, Eye, Smile, Microscope, Activity, Brain, HeartPulse, ScanLine]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  assertPatientLocale(locale)
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
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const t = dict.explore
  const prefix = `/${locale}`
  
  const generatePlaceholders = (categoryName: string): CaseItem[] => [
    { id: `${categoryName}-1`, number: "01", title: `${categoryName} Case 1`, subtitle: "", isPlaceholder: true },
    { id: `${categoryName}-2`, number: "02", title: `${categoryName} Case 2`, subtitle: "", isPlaceholder: true },
    { id: `${categoryName}-3`, number: "03", title: `${categoryName} Case 3`, subtitle: "", isPlaceholder: true },
  ]

  const categoriesData = [
    {
      id: "hair-transplant",
      title: t.caseStudies.title,
      cases: [
        {
          id: "ht-1",
          number: "01",
          title: t.caseStudies.maleCaseTitle,
          subtitle: "FUE 2500 follicles",
          image: "/assets/explore-gallery/hair-transplant-male-case-1.png",
          alt: `${t.caseStudies.maleCaseTitle} — FUE 2500 follicles`,
        },
        {
          id: "ht-2",
          number: "02",
          title: t.caseStudies.femaleCaseTitle,
          subtitle: "FUE 1500 follicles",
          image: "/assets/explore-gallery/hair-transplant-female-case-1.png",
          alt: `${t.caseStudies.femaleCaseTitle} — FUE 1500 follicles`,
        },
        {
          id: "ht-3",
          number: "03",
          title: t.caseStudies.maleCase2Title,
          subtitle: "FUE 2000 follicles",
          image: "/assets/explore-gallery/hair-transplant-male-case-2.png",
          alt: `${t.caseStudies.maleCase2Title} — FUE 2000 follicles`,
        },
        {
          id: "ht-4",
          number: "04",
          title: t.caseStudies.femaleCase2Title,
          subtitle: "FUE 1750 follicles",
          image: "/assets/explore-gallery/hair-transplant-female-case-2-combined.png",
          alt: `${t.caseStudies.femaleCase2Title} — FUE 1750 follicles`,
        },
      ]
    },
    ...(t.moreCategories ? [
      { id: "threadLifting", title: t.moreCategories.categories.threadLifting, cases: generatePlaceholders(t.moreCategories.categories.threadLifting) },
      { id: "facelift", title: t.moreCategories.categories.facelift, cases: generatePlaceholders(t.moreCategories.categories.facelift) },
      { id: "rhinoplasty", title: t.moreCategories.categories.rhinoplasty, cases: generatePlaceholders(t.moreCategories.categories.rhinoplasty) },
      { id: "fatGrafting", title: t.moreCategories.categories.fatGrafting, cases: generatePlaceholders(t.moreCategories.categories.fatGrafting) },
      { id: "liposuction", title: t.moreCategories.categories.liposuction, cases: generatePlaceholders(t.moreCategories.categories.liposuction) },
      { id: "orthognathic", title: t.moreCategories.categories.orthognathic, cases: generatePlaceholders(t.moreCategories.categories.orthognathic) },
      { id: "orthodontics", title: t.moreCategories.categories.orthodontics, cases: generatePlaceholders(t.moreCategories.categories.orthodontics) },
    ] : [])
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

      <section className="w-full py-16 sm:py-20 lg:py-24 px-0 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
          <div className="text-center px-4 sm:px-0">
            <SectionLabel color="gold" className="block mb-2">{t.caseStudies.badge}</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4">{t.moreCategories?.title || t.caseStudies.title}</h2>
            <p className="text-text-body text-sm max-w-2xl mx-auto">{t.moreCategories?.subtitle || t.caseStudies.subtitle}</p>
          </div>

          <div className="px-4 sm:px-6 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-amber-200/60 bg-amber-50/50 p-5 sm:p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-navy mb-1">{t.caseStudies.contextBannerTitle ?? "These photos are for context, not comparison"}</p>
                <p className="text-sm text-text-muted leading-relaxed">{t.caseStudies.contextBannerText ?? "Before/after images show procedural range, not promised outcomes. Every case is unique. AetherHeal uses these references to support informed decision-making — not to encourage shopping by appearance."}</p>
              </div>
            </div>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {categoriesData.map(category => (
              <div key={category.id} className="space-y-6 sm:space-y-8">
                <div className="px-4 sm:px-6 max-w-7xl mx-auto">
                  <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy border-b border-slate-200 pb-4">
                    {category.title}
                  </h3>
                </div>
                <CaseCarousel 
                  cases={category.cases} 
                  caseLabel={t.caseStudies.caseLabel}
                  beforeAfterLabel={t.caseStudies.beforeAfterLabel}
                  disclaimer={t.caseStudies.disclaimer}
                  comingSoonText={t.moreCategories?.comingSoon}
                  placeholderDescription={t.moreCategories?.modalDescription}
                />
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
