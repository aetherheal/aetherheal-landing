import type { Metadata } from "next"
import Link from "next/link"
import {
  Scissors, Sparkles, PenTool, Bot, Eye, Smile, Microscope, Activity,
  DollarSign, TrendingUp, Clock, Scale, FileSignature, Target,
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
import { CaseTabs, type TabData } from "./case-tabs"
import { SkinCatalog } from "./skin-catalog"

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
  
  const tabs = t.caseStudyTabs
  const imgBase = "/assets/explore-gallery"

  const buildCases = (slug: string, catKey: keyof typeof tabs.categories) => {
    const cat = tabs.categories[catKey]
    return cat.cases.map((c, i) => ({
      id: `${slug}-${i + 1}`,
      number: String(i + 1).padStart(2, "0"),
      title: c.title,
      subtitle: c.subtitle,
      image: `${imgBase}/${slug}-case-${i + 1}.png`,
      alt: `${c.title} — ${c.subtitle}`,
    }))
  }

  const hairCases = [
    { id: "ht-1", number: "01", title: tabs.categories.hairTransplant.cases[0].title, subtitle: tabs.categories.hairTransplant.cases[0].subtitle, image: `${imgBase}/hair-transplant-male-case-1.png`, alt: `${tabs.categories.hairTransplant.cases[0].title} — ${tabs.categories.hairTransplant.cases[0].subtitle}` },
    { id: "ht-2", number: "02", title: tabs.categories.hairTransplant.cases[1].title, subtitle: tabs.categories.hairTransplant.cases[1].subtitle, image: `${imgBase}/hair-transplant-female-case-1.png`, alt: `${tabs.categories.hairTransplant.cases[1].title} — ${tabs.categories.hairTransplant.cases[1].subtitle}` },
    { id: "ht-3", number: "03", title: tabs.categories.hairTransplant.cases[2].title, subtitle: tabs.categories.hairTransplant.cases[2].subtitle, image: `${imgBase}/hair-transplant-male-case-2.png`, alt: `${tabs.categories.hairTransplant.cases[2].title} — ${tabs.categories.hairTransplant.cases[2].subtitle}` },
    { id: "ht-4", number: "04", title: tabs.categories.hairTransplant.cases[3].title, subtitle: tabs.categories.hairTransplant.cases[3].subtitle, image: `${imgBase}/hair-transplant-female-case-2-combined.png`, alt: `${tabs.categories.hairTransplant.cases[3].title} — ${tabs.categories.hairTransplant.cases[3].subtitle}` },
  ]

  const sg = tabs.subgroupLabels

  const tabsData: TabData[] = [
    {
      id: "face",
      label: tabs.tabLabels.face,
      categories: [],
      subgroups: [
        {
          label: sg.faceLift,
          categories: [
            { id: "facelift", title: tabs.categories.facelift.title, cases: buildCases("facelift", "facelift") },
            { id: "brow-lift", title: tabs.categories.browLift.title, cases: buildCases("brow-lift", "browLift") },
            { id: "neck-lift", title: tabs.categories.neckLift.title, cases: buildCases("neck-lift", "neckLift") },
          ],
        },
        {
          label: sg.faceContour,
          categories: [
            { id: "facial-contouring", title: tabs.categories.facialContouring.title, cases: buildCases("facial-contouring", "facialContouring") },
            { id: "double-chin", title: tabs.categories.doubleChin.title, cases: buildCases("double-chin", "doubleChin") },
          ],
        },
        {
          label: sg.faceFeatures,
          categories: [
            { id: "rhinoplasty", title: tabs.categories.rhinoplasty.title, cases: buildCases("rhinoplasty", "rhinoplasty") },
            { id: "eyes", title: tabs.categories.eyes.title, cases: buildCases("eyes", "eyes") },
          ],
        },
      ],
    },
    {
      id: "body",
      label: tabs.tabLabels.body,
      categories: [],
      subgroups: [
        {
          label: sg.bodyBreast,
          categories: [
            { id: "breast-augmentation", title: tabs.categories.breastAugmentation.title, cases: buildCases("breast-augmentation", "breastAugmentation") },
            { id: "breast-reduction", title: tabs.categories.breastReduction.title, cases: buildCases("breast-reduction", "breastReduction") },
          ],
        },
        {
          label: sg.bodyContour,
          categories: [
            { id: "liposuction", title: tabs.categories.liposuction.title, cases: buildCases("liposuction", "liposuction") },
            { id: "tummy-tuck", title: tabs.categories.tummyTuck.title, cases: buildCases("tummy-tuck", "tummyTuck") },
          ],
        },
        {
          label: sg.bodyLift,
          categories: [
            { id: "arm-lift", title: tabs.categories.armLift.title, cases: buildCases("arm-lift", "armLift") },
            { id: "thigh-lift", title: tabs.categories.thighLift.title, cases: buildCases("thigh-lift", "thighLift") },
          ],
        },
      ],
    },
    {
      id: "hair",
      label: tabs.tabLabels.hair,
      categories: [
        { id: "hair-transplant", title: tabs.categories.hairTransplant.title, cases: hairCases },
      ],
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

      <section className="w-full py-16 sm:py-20 lg:py-24 px-0 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center px-4 sm:px-0">
            <SectionLabel color="gold" className="block mb-2">{t.caseStudies.badge}</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4">{tabs.title}</h2>
            <p className="text-text-body text-sm max-w-2xl mx-auto">{tabs.subtitle}</p>
          </div>

          <CaseTabs
            tabs={tabsData}
            caseLabel={t.caseStudies.caseLabel}
            beforeAfterLabel={t.caseStudies.beforeAfterLabel}
            disclaimer={t.caseStudies.disclaimer}
            contextBannerTitle={t.caseStudies.contextBannerTitle ?? "These photos are for context, not comparison"}
            contextBannerText={t.caseStudies.contextBannerText ?? "Before/after images show procedural range, not promised outcomes. Every case is unique. AetherHeal uses these references to support informed decision-making — not to encourage shopping by appearance."}
            searchPlaceholder={t.caseStudies.searchPlaceholder ?? "Search procedures..."}
            jumpToLabel={t.caseStudies.jumpToLabel ?? "Jump to"}
            noResultsLabel={t.caseStudies.noResultsLabel ?? "No matching procedures found."}
            skinTab={{ id: "skin", label: tabs.tabLabels.skin }}
            skinContent={
              <SkinCatalog
                categories={tabs.skinCategories}
                popularLabel={tabs.skinPopularLabel}
                consultingBanner={tabs.skinConsulting}
              />
            }
          />
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
