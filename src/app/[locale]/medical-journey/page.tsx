import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

const relatedHrefs = ["/how-to-choose-hospital-abroad", "/trust-protocol", "/how-it-works"]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
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
                  {t.journeyStages.stages.map((stage) => (
                    <div key={stage.id} id={stage.id} className="scroll-mt-32">
                      <Card className="p-6 sm:p-8 space-y-8">
                        <div className="space-y-3">
                          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">{stage.label}</p>
                          <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy">{stage.title}</h3>
                          <p className="text-base text-slate-600 font-light leading-relaxed">{stage.summary}</p>
                        </div>
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{stage.milestonesTitle}</p>
                            <div className="space-y-4">
                              {stage.items.map((item) => (
                                <div key={item.title}>
                                  <p className="text-sm font-semibold text-brand-navy mb-1">{item.title}</p>
                                  <p className="text-sm text-text-body leading-relaxed">{item.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="rounded-2xl border border-slate-100 bg-white p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-4">{stage.aiTitle}</p>
                            <ul className="space-y-3">
                              {stage.aiItems.map((item) => (
                                <li key={item} className="text-sm text-text-body leading-relaxed">{item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-2xl border border-slate-100 bg-white p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand-navy mb-4">{stage.humanTitle}</p>
                            <ul className="space-y-3">
                              {stage.humanItems.map((item) => (
                                <li key={item} className="text-sm text-text-body leading-relaxed">{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              <div id="what-makes-different" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.whatMakesDifferent.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.whatMakesDifferent.text}</p>
                  <div className="p-6 sm:p-8 bg-brand-navy text-white rounded-2xl shadow-lg my-8">
                    <p className="text-xl font-serif text-brand-gold mb-2">{t.whatMakesDifferent.boxTitle}</p>
                    <p className="text-white/90">{t.whatMakesDifferent.boxText}</p>
                  </div>
                </div>
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
