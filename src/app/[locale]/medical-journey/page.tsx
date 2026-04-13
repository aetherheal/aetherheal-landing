import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Plane, MapPin, HeartPulse, CheckCircle2, FileText, Stethoscope, Calendar, MessageCircle, ClipboardCheck, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { assertPatientLocale } from "@/i18n/assert-locale"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

const relatedHrefs = ["/how-to-choose-hospital-abroad", "/trust-protocol", "/how-it-works"]
const phaseIcons = [Plane, MapPin, HeartPulse]
const phaseColors = ["bg-blue-50 text-blue-600", "bg-brand-gold/10 text-brand-gold", "bg-emerald-50 text-emerald-600"]
const milestoneIcons = [FileText, Stethoscope, Calendar, MessageCircle, ClipboardCheck, Activity]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const t = dict.medicalJourney.meta
  return {
    title: t.title, description: t.description,
    alternates: { canonical: `https://aetherheal.com/${locale}/medical-journey`, languages: Object.fromEntries(locales.map((l) => [l, `https://aetherheal.com/${l}/medical-journey`])) },
    openGraph: { title: t.title, description: t.description, url: `https://aetherheal.com/${locale}/medical-journey`, images: [{ url: "/og-image.jpg", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  }
}

export default async function MedicalJourneyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const t = dict.medicalJourney
  const prefix = `/${locale}`

  return (
    <div className="min-h-full bg-white">
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-brand-navy/[0.02] to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8"><span className="inline-flex items-center px-4 py-1.5 bg-brand-navy text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-sm">{t.hero.badge}</span></div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-10 leading-[1.1] tracking-tight">{t.hero.h1} <br className="hidden sm:block" /><span className="italic text-brand-gold">{t.hero.h1Highlight}</span></h1>
          <div className="max-w-3xl space-y-6 text-lg sm:text-xl text-slate-600 font-light leading-[1.8]">
            <p className="text-xl sm:text-2xl font-serif text-brand-navy leading-relaxed">{t.hero.intro}</p>
            <p>{t.hero.introDetail}</p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-12 xl:gap-20">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 p-6 bg-slate-50/80 border border-slate-100 rounded-2xl">
              <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">{dict.common.contents}</h2>
              <nav><ol className="space-y-4">{t.toc.map((item, i) => (<li key={item.id}><a href={`#${item.id}`} className="flex items-start gap-3 text-sm text-slate-600 font-medium hover:text-brand-gold transition-colors leading-snug"><span className="text-brand-gold/60 font-bold shrink-0 w-4 text-right">{i + 1}.</span>{item.label}</a></li>))}</ol></nav>
            </div>
          </aside>
          <div className="flex-1 min-w-0 max-w-3xl">
            <div className="block lg:hidden mb-16 p-6 sm:p-8 bg-slate-50 border border-slate-100 rounded-2xl">
              <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">{dict.common.tableOfContents}</h2>
              <ol className="space-y-4">{t.toc.map((item, i) => (<li key={item.id}><a href={`#${item.id}`} className="flex items-start gap-3 text-sm text-slate-600 font-medium hover:text-brand-gold transition-colors leading-snug"><span className="text-brand-gold/60 font-bold shrink-0 w-4 text-right">{i + 1}.</span>{item.label}</a></li>))}</ol>
            </div>
            <div className="space-y-24">
              <div id="how-journey-works" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-6 pb-4 border-b border-slate-100 leading-tight">{t.journeyStages.title}</h2>
                <div className="space-y-8">
                  <p className="text-lg text-slate-600 font-light leading-[1.8]">{t.journeyStages.intro}</p>

                  {/* 3-step progress indicator */}
                  <div className="flex items-start justify-center gap-0 py-4 mb-8">
                    {t.journeyStages.stages.map((stage, i) => {
                      const Icon = phaseIcons[i % phaseIcons.length]
                      return (
                        <div key={stage.id} className="flex items-start">
                          <div className="flex flex-col items-center relative">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center z-10", phaseColors[i % phaseColors.length])}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-bold text-text-muted mt-3 tracking-wider uppercase text-center w-24 absolute top-12">{stage.title}</span>
                          </div>
                          {i < t.journeyStages.stages.length - 1 && (
                            <div className="w-12 sm:w-20 lg:w-28 h-px bg-gradient-to-r from-slate-300 to-slate-200 mx-2 mt-6" />
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {t.journeyStages.stages.map((stage, stageIdx) => {
                    const PhaseIcon = phaseIcons[stageIdx % phaseIcons.length]
                    return (
                    <div key={stage.id} id={stage.id} className="scroll-mt-32">
                      <Card className="p-6 sm:p-8 space-y-8">
                        <div className="flex items-start gap-4">
                          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", phaseColors[stageIdx % phaseColors.length])}>
                            <PhaseIcon className="w-6 h-6" />
                          </div>
                          <div className="space-y-2">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">{stage.label}</p>
                            <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy">{stage.title}</h3>
                            <p className="text-base text-slate-600 font-light leading-relaxed">{stage.summary}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{stage.milestonesTitle}</p>
                            <div className="space-y-4">
                              {stage.items.map((item, mIdx) => {
                                const MIcon = milestoneIcons[(stageIdx * 2 + mIdx) % milestoneIcons.length]
                                return (
                                <div key={item.title} className="flex items-start gap-3">
                                  <MIcon className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-sm font-semibold text-brand-navy mb-1">{item.title}</p>
                                    <p className="text-sm text-text-body leading-relaxed">{item.desc}</p>
                                  </div>
                                </div>
                                )
                              })}
                            </div>
                          </div>
                          <div className="rounded-2xl border border-slate-100 bg-white p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-4">{stage.aiTitle}</p>
                            <ul className="space-y-3">
                              {stage.aiItems.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-text-body leading-relaxed">
                                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-2xl border border-slate-100 bg-white p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand-navy mb-4">{stage.humanTitle}</p>
                            <ul className="space-y-3">
                              {stage.humanItems.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-text-body leading-relaxed">
                                  <CheckCircle2 className="w-4 h-4 text-brand-navy shrink-0 mt-0.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Arc — Responsibility Overview */}
      {t.storyArc && (
        <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 sm:px-8 sm:py-10 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.18)]">
              <div className="max-w-3xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">
                  {t.storyArc.badge}
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-navy mb-4">
                  {t.storyArc.title}
                </h2>
                <p className="text-text-body leading-relaxed">
                  {t.storyArc.subtitle}
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4 xl:flex-row xl:items-stretch xl:gap-3">
                {t.storyArc.items.map((item: { phase: string; title: string; owner: string }, idx: number, items: { phase: string; title: string; owner: string }[]) => {
                  const isLast = idx === items.length - 1
                  const cardStyles = [
                    "border-slate-200 bg-white",
                    "border-slate-200 bg-slate-50/80",
                    "border-brand-gold/30 bg-brand-gold/10",
                    "border-brand-navy/15 bg-brand-navy/5",
                    "border-brand-navy bg-brand-navy text-white",
                  ]
                  return (
                    <div key={`${item.phase}-${item.title}`} className="contents">
                      <div
                        className={cn(
                          "h-full min-w-0 rounded-2xl border p-5 flex flex-col xl:flex-1",
                          cardStyles[idx] ?? cardStyles[cardStyles.length - 1]
                        )}
                      >
                        <p
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-widest mb-2",
                            isLast ? "text-white/70" : "text-text-muted"
                          )}
                        >
                          {item.phase}
                        </p>
                        <h3
                          className={cn(
                            "font-serif text-lg leading-snug mb-4 min-h-[3.5rem]",
                            isLast ? "text-white" : "text-brand-navy"
                          )}
                        >
                          {item.title}
                        </h3>
                        <div className="mt-auto min-h-[3rem]">
                          <p
                            className={cn(
                              "text-[10px] font-bold uppercase tracking-widest mb-1",
                              isLast ? "text-white/60" : "text-text-muted"
                            )}
                          >
                            {t.storyArc.responsibilityLabel}
                          </p>
                          <p
                            className={cn(
                              "text-xs font-semibold leading-snug",
                              isLast ? "text-white" : "text-brand-navy"
                            )}
                          >
                            {item.owner}
                          </p>
                        </div>
                      </div>
                      {!isLast && (
                        <div className="hidden xl:flex items-center justify-center px-1">
                          <ArrowRight className={cn(
                            "w-5 h-5",
                            idx < 2 ? "text-slate-300" : idx === 2 ? "text-brand-gold/60" : "text-brand-navy/40"
                          )} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* First 48 Hours + Post-Treatment Continuity */}
      {t.first48Hours && t.continuityYear && (
        <section className="w-full py-12 sm:py-24 lg:py-32 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* First 48 Hours */}
              <div className="h-full rounded-[32px] border border-slate-200 bg-white p-8 sm:p-10 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.18)] flex flex-col">
                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">
                    {t.first48Hours.badge}
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4">
                    {t.first48Hours.title}
                  </h2>
                  <p className="text-text-body leading-relaxed">
                    {t.first48Hours.subtitle}
                  </p>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                  {t.first48Hours.items.map((item: { time: string; title: string; description: string; owner?: string; next?: string }, idx: number, items: { time: string; title: string; description: string; owner?: string; next?: string }[]) => {
                    const isLast = idx === items.length - 1
                    const cardStyles = [
                      "border-slate-200 bg-white",
                      "border-slate-200 bg-slate-50/80",
                      "border-brand-gold/30 bg-brand-gold/10",
                    ]
                    return (
                      <div key={`${item.time}-${item.title}`} className="contents">
                        <div className={cn(
                          "rounded-2xl border p-5 flex flex-col",
                          cardStyles[idx] ?? cardStyles[cardStyles.length - 1]
                        )}>
                          <div className="mb-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{item.time}</p>
                          </div>
                          {item.owner && (
                            <div className="mb-3">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">{t.first48Hours.responsibilityLabel}</p>
                              <p className="text-xs font-semibold leading-snug text-brand-navy">{item.owner}</p>
                            </div>
                          )}
                          <h3 className="font-serif text-xl leading-snug text-brand-navy mb-2">{item.title}</h3>
                          <p className="text-sm text-text-body leading-relaxed">{item.description}</p>
                          {item.next && (
                            <div className="mt-auto pt-4">
                              <span className="inline-flex items-center rounded-full bg-slate-200/70 px-3 py-1 text-[11px] font-semibold text-text-muted">
                                {t.first48Hours.thenLabel} {item.next}
                              </span>
                            </div>
                          )}
                        </div>
                        {!isLast && (
                          <div className="flex justify-center">
                            <ArrowRight className={cn(
                              "hidden sm:block w-4 h-4 rotate-90",
                              idx === 0 ? "text-slate-300" : "text-brand-gold/60"
                            )} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Post-Treatment Continuity */}
              <div className="h-full rounded-[32px] border border-brand-navy/10 bg-brand-navy p-8 sm:p-10 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.24)] flex flex-col">
                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">
                    {t.continuityYear.badge}
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
                    {t.continuityYear.title}
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    {t.continuityYear.subtitle}
                  </p>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                  {t.continuityYear.items.map((item: { phase: string; title: string; description: string; owner?: string; next?: string }, idx: number, items: { phase: string; title: string; description: string; owner?: string; next?: string }[]) => {
                    const isLast = idx === items.length - 1
                    const cardStyles = [
                      "border-white/10 bg-white/5",
                      "border-white/15 bg-white/10",
                      "border-brand-gold/25 bg-brand-gold/10",
                    ]
                    return (
                      <div key={`${item.phase}-${item.title}`} className="contents">
                        <div className={cn(
                          "rounded-2xl border p-5 backdrop-blur-sm flex flex-col",
                          cardStyles[idx] ?? cardStyles[cardStyles.length - 1]
                        )}>
                          <div className="mb-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">{item.phase}</p>
                          </div>
                          {item.owner && (
                            <div className="mb-3">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/70 mb-1">{t.continuityYear.responsibilityLabel}</p>
                              <p className="text-xs font-semibold leading-snug text-white">{item.owner}</p>
                            </div>
                          )}
                          <h3 className="font-serif text-xl leading-snug text-white mb-2">{item.title}</h3>
                          <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                          {item.next && (
                            <div className="mt-auto pt-4">
                              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-slate-300">
                                {t.continuityYear.thenLabel} {item.next}
                              </span>
                            </div>
                          )}
                        </div>
                        {!isLast && (
                          <div className="flex justify-center">
                            <ArrowRight className={cn(
                              "hidden sm:block w-4 h-4 rotate-90",
                              idx === 0 ? "text-white/20" : "text-brand-gold/50"
                            )} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
              <div id="what-makes-different" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.whatMakesDifferent.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.whatMakesDifferent.text}</p>

                  <div className="p-6 sm:p-8 bg-brand-navy text-white rounded-2xl shadow-lg my-8">
                    <p className="text-xl font-serif text-brand-gold mb-2">{t.whatMakesDifferent.boxTitle}</p>
                    <p className="text-white/90 mb-4">{t.whatMakesDifferent.boxText}</p>
                    <Link href={`/${locale}/our-philosophy`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:text-white transition-colors">
                      {t.whatMakesDifferent.ctaPhilosophy ?? "Read the full philosophy"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif text-3xl text-brand-navy mb-10 text-center">{dict.common.continueReading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.relatedPages.map((link, i) => (
              <Link key={relatedHrefs[i]} href={`${prefix}${relatedHrefs[i]}`} className="group block p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-gold/40 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3"><span className="text-base font-bold text-brand-navy group-hover:text-brand-gold transition-colors">{link.label}</span><ArrowRight className="w-4 h-4 text-brand-gold shrink-0" /></div>
                <p className="text-sm text-slate-500 leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
