import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowDown, AlertTriangle, CheckCircle2, XCircle, ShieldCheck, Users, Building2, RefreshCw } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Card } from "@/components/ui/card"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.ourPhilosophy.meta
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `https://aetherheal.com/${locale}/our-philosophy`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://aetherheal.com/${l}/our-philosophy`])),
    },
    openGraph: { title: t.title, description: t.description, url: `https://aetherheal.com/${locale}/our-philosophy`, images: [{ url: "/og-image.jpg", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  }
}

export default async function OurPhilosophyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.ourPhilosophy
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
            <span className="italic text-brand-gold">{t.hero.h1Highlight}</span>
          </h1>
          <div className="max-w-3xl space-y-6 text-lg sm:text-xl text-slate-700 leading-[1.8] break-keep">
            <p className="text-xl sm:text-2xl font-serif text-brand-navy leading-relaxed">{t.hero.intro}</p>
            <p className="text-[15px] text-slate-600">{t.hero.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* Content with Sidebar ToC */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-12 xl:gap-20">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 p-6 bg-slate-50/80 border border-slate-100 rounded-2xl">
              <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">
                {dict.common.contents}
              </h2>
              <nav>
                <ol className="space-y-4">
                  {t.toc.map((item: { id: string; label: string }, i: number) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="flex items-start gap-3 text-sm text-slate-600 font-medium hover:text-brand-gold transition-colors leading-snug">
                        <span className="text-brand-gold/60 font-bold shrink-0 w-4 text-right">{i + 1}.</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Mobile ToC */}
            <div className="block lg:hidden mb-16 p-6 sm:p-8 bg-slate-50 border border-slate-100 rounded-2xl">
              <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">
                {dict.common.tableOfContents}
              </h2>
              <ol className="space-y-4">
                {t.toc.map((item: { id: string; label: string }, i: number) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="flex items-start gap-3 text-sm text-slate-600 font-medium hover:text-brand-gold transition-colors leading-snug">
                      <span className="text-brand-gold/60 font-bold shrink-0 w-4 text-right">{i + 1}.</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-28">

              {/* ──────── Section 1: The Problem We Named ──────── */}
              <div id="the-problem" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  {t.theProblem.title}
                </h2>
                <div className="space-y-8 text-lg text-slate-700 leading-[1.8] break-keep">
                  <p>{t.theProblem.p1}</p>
                  <p>{t.theProblem.p2}</p>

                  {/* Lemon Market Cycle Diagram */}
                  <div className="rounded-3xl bg-slate-900 p-8 sm:p-10 text-white overflow-hidden">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-6">{t.theProblem.cycleTitle}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {t.theProblem.cycleSteps.map((step: string, i: number) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.06] border border-white/[0.08]">
                          <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-red-400">{i + 1}</span>
                          </div>
                          <p className="text-sm text-white/80 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-3">
                      <RefreshCw className="w-4 h-4 text-red-400 animate-spin" style={{ animationDuration: '4s' }} />
                      <p className="text-sm font-semibold text-red-400 tracking-wide">{t.theProblem.cycleResult}</p>
                    </div>
                  </div>

                  <p>{t.theProblem.p3}</p>
                  <Card accent="gold" className="p-6 sm:p-8">
                    <p className="font-serif text-lg sm:text-xl text-brand-navy leading-relaxed italic">
                      {t.theProblem.callout}
                    </p>
                  </Card>
                </div>
              </div>

              {/* ──────── Section 2: The Architecture We Built ──────── */}
              <div id="the-architecture" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  {t.theArchitecture.title}
                </h2>
                <div className="space-y-8 text-lg text-slate-700 leading-[1.8] break-keep">
                  <p>{t.theArchitecture.p1}</p>
                  <p>{t.theArchitecture.p2}</p>

                  {/* Architecture Layer Diagram */}
                  <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 overflow-hidden">
                    <div className="space-y-3">
                      {/* Layer: Patients */}
                      <div className="rounded-2xl bg-white border border-slate-200 p-5 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                          <Users className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="font-serif text-base text-brand-navy font-semibold">{t.theArchitecture.layers[0].label}</p>
                          <p className="text-xs text-text-muted">{t.theArchitecture.layers[0].detail}</p>
                        </div>
                      </div>

                      <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-slate-300" /></div>

                      {/* Layer: AetherHeal Standard (highlighted) */}
                      <div className="rounded-2xl bg-brand-navy p-5 flex items-center gap-4 shadow-[0_8px_30px_-10px_rgba(15,23,42,0.25)]">
                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                          <p className="font-serif text-base text-white font-semibold">{t.theArchitecture.layers[1].label}</p>
                          <p className="text-xs text-white/60">{t.theArchitecture.layers[1].detail}</p>
                        </div>
                      </div>

                      <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-slate-300" /></div>

                      {/* Layer: Hospitals */}
                      <div className="rounded-2xl bg-white border border-slate-200 p-5 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                          <Building2 className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="font-serif text-base text-brand-navy font-semibold">{t.theArchitecture.layers[2].label}</p>
                          <p className="text-xs text-text-muted">{t.theArchitecture.layers[2].detail}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-center">
                        <p className="text-xs text-red-600 font-medium">{t.theArchitecture.beforeLabel}</p>
                      </div>
                      <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-center">
                        <p className="text-xs text-emerald-700 font-medium">{t.theArchitecture.afterLabel}</p>
                      </div>
                    </div>
                  </div>

                  <p>{t.theArchitecture.p3}</p>
                  <Card accent="navy" className="p-6 sm:p-8">
                    <p className="font-serif text-lg sm:text-xl text-brand-navy leading-relaxed italic">
                      {t.theArchitecture.callout}
                    </p>
                  </Card>
                </div>
              </div>

              {/* ──────── Section 3: The Incentive Structure ──────── */}
              <div id="the-incentive" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  {t.theIncentive.title}
                </h2>
                <div className="space-y-8 text-lg text-slate-700 leading-[1.8] break-keep">
                  <p>{t.theIncentive.p1}</p>

                  {/* Fee Comparison Table */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-slate-200 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)]">
                    {/* Traditional */}
                    <div className="p-6 sm:p-8 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <h3 className="font-serif text-lg text-slate-700 font-semibold">{t.theIncentive.comparison.traditional.label}</h3>
                      </div>
                      <ul className="space-y-4">
                        {t.theIncentive.comparison.traditional.items.map((item: { text: string; negative: boolean }) => (
                          <li key={item.text} className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-600 leading-relaxed">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* AetherHeal */}
                    <div className="p-6 sm:p-8 bg-white">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="font-serif text-lg text-brand-navy font-semibold">{t.theIncentive.comparison.aetherheal.label}</h3>
                      </div>
                      <ul className="space-y-4">
                        {t.theIncentive.comparison.aetherheal.items.map((item: { text: string; negative: boolean }) => (
                          <li key={item.text} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700 leading-relaxed">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p>{t.theIncentive.p2}</p>
                  <p>{t.theIncentive.p3}</p>

                  <Card accent="gold" className="p-6 sm:p-8">
                    <p className="font-serif text-lg sm:text-xl text-brand-navy leading-relaxed italic">
                      {t.theIncentive.callout}
                    </p>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    {t.theIncentive.principles.map((p: { title: string; body: string }) => (
                      <Card key={p.title} className="p-6 space-y-3">
                        <h3 className="font-serif text-lg text-brand-navy font-semibold">{p.title}</h3>
                        <p className="text-sm text-text-body leading-relaxed">{p.body}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* ──────── Section 4: The AI Boundary ──────── */}
              <div id="the-ai-boundary" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  {t.theAiBoundary.title}
                </h2>
                <div className="space-y-8 text-lg text-slate-700 leading-[1.8] break-keep">
                  <p>{t.theAiBoundary.p1}</p>
                  <p>{t.theAiBoundary.p2}</p>
                  <p>{t.theAiBoundary.p3}</p>
                  <Card accent="muted" className="p-6 sm:p-8">
                    <p className="font-serif text-lg sm:text-xl text-brand-navy leading-relaxed italic mb-4">
                      {t.theAiBoundary.callout}
                    </p>
                    <Link href={`/${locale}/how-it-works#ai-assistance`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors">
                      {t.theAiBoundary.ctaHowItWorks ?? "See the full AI governance breakdown"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Card>
                </div>
              </div>

              {/* ──────── Section 5: The Founder's Obligation ──────── */}
              <div id="the-founder" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  {t.theFounder.title}
                </h2>
                <div className="space-y-8 text-lg text-slate-700 leading-[1.8] break-keep">

                  {/* Founder Timeline */}
                  <div className="rounded-3xl bg-slate-50/80 border border-slate-100 p-6 sm:p-8">
                    <div className="relative">
                      <div className="absolute left-[23px] top-3 bottom-3 w-px bg-brand-gold/20" />
                      <div className="space-y-6">
                        {t.theFounder.timeline.map((step: { year: string; event: string }, i: number) => (
                          <div key={i} className="flex items-start gap-5 relative">
                            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-brand-gold/30 flex items-center justify-center shrink-0 z-10 shadow-sm">
                              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">{step.year.slice(0, 3)}</span>
                            </div>
                            <div className="pt-2">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1">{step.year}</p>
                              <p className="text-sm text-slate-700 leading-relaxed">{step.event}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p>{t.theFounder.p1}</p>
                  <p>{t.theFounder.p2}</p>
                  <p>{t.theFounder.p3}</p>
                  <Card accent="gold" className="p-6 sm:p-8">
                    <p className="font-serif text-lg sm:text-xl text-brand-navy leading-relaxed italic">
                      {t.theFounder.callout}
                    </p>
                  </Card>
                </div>
              </div>

              {/* ──────── Closing CTA ──────── */}
              <div className="pt-8 border-t border-slate-100">
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-8">{t.closing.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <Card className="p-6">
                    <SectionLabel color="gold" className="mb-3">Patient</SectionLabel>
                    <p className="text-sm text-text-body leading-relaxed">{t.closing.patient}</p>
                  </Card>
                  <Card className="p-6">
                    <SectionLabel color="default" className="mb-3">Hospital</SectionLabel>
                    <p className="text-sm text-text-body leading-relaxed">{t.closing.hospital}</p>
                  </Card>
                  <Card className="p-6">
                    <SectionLabel color="gold" className="mb-3">Investor</SectionLabel>
                    <p className="text-sm text-text-body leading-relaxed">{t.closing.investor}</p>
                  </Card>
                </div>
                <div className="text-center">
                  <Link
                    href={`${prefix}/how-it-works`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-navy text-white text-sm font-semibold rounded-full hover:bg-brand-navy/90 transition-colors shadow-sm"
                  >
                    {t.closing.cta}
                    <ArrowRight className="w-4 h-4" />
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
