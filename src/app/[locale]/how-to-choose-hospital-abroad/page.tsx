import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

const relatedHrefs = ["/trust-protocol", "/medical-journey", "/hair-transplant-korea", "/plastic-surgery-korea", "/aesthetic-clinic-seoul", "/how-it-works"]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.hospitalAbroad.meta
  return {
    title: t.title, description: t.description,
    alternates: { canonical: `https://aetherheal.com/${locale}/how-to-choose-hospital-abroad`, languages: Object.fromEntries(locales.map((l) => [l, `https://aetherheal.com/${l}/how-to-choose-hospital-abroad`])) },
    openGraph: { title: t.title, description: t.description, url: `https://aetherheal.com/${locale}/how-to-choose-hospital-abroad`, images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  }
}

export default async function HowToChooseHospitalAbroadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.hospitalAbroad
  const prefix = `/${locale}`

  return (
    <div className="min-h-full bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faq.items.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }) }} />

      {/* Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-brand-navy/[0.02] to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8"><span className="inline-flex items-center px-4 py-1.5 bg-brand-navy text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-sm">{t.hero.badge}</span></div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-10 leading-[1.1] tracking-tight">{t.hero.h1}</h1>
          <div className="max-w-3xl space-y-6 text-lg sm:text-xl text-slate-600 font-light leading-[1.8]">
            <p className="text-xl sm:text-2xl font-serif text-brand-navy leading-relaxed">{t.hero.intro}</p>
            <p>{t.hero.p1}</p><p>{t.hero.p2}</p>
            <p className="font-medium text-brand-navy border-l-2 border-brand-gold pl-5 py-1 my-8">{t.hero.callout}</p>
            <p>{t.hero.selectingLabel}</p>
            <ul className="space-y-3 pl-2">{t.hero.selectingItems.map((item) => (<li key={item} className="flex items-center gap-4 text-brand-navy font-medium"><div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />{item}</li>))}</ul>
            <p className="pt-4">{t.hero.selectingEnd}</p>
            <p>{t.hero.p3}</p><p>{t.hero.p4}</p>
            <div className="mt-12 pt-8 border-t border-slate-200"><p className="text-base text-slate-500 italic">{t.hero.guideIntro}</p></div>
          </div>
        </div>
      </section>

      {/* Article */}
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
              {/* Why Different */}
              <div id="why-different" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.whyDifferent.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.whyDifferent.p1}</p><p>{t.whyDifferent.p2}</p><p>{t.whyDifferent.p3}</p><p>{t.whyDifferent.whoNote}</p><p>{t.whyDifferent.p4}</p>
                  <div className="space-y-12 pt-6">
                    {t.whyDifferent.characteristics.map((c) => (
                      <div key={c.title}><h3 className="font-serif text-2xl text-brand-navy mb-4">{c.title}</h3><div className="space-y-4"><p>{c.p1}</p><p>{c.p2}</p><ul className="space-y-3 pl-2">{c.items.map((item) => (<li key={item} className="flex items-center gap-4"><CheckCircle2 className="w-4 h-4 text-brand-gold/70 shrink-0" /><span>{item}</span></li>))}</ul><p className="pt-2">{c.conclusion}</p></div></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div id="common-mistakes" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.commonMistakes.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.commonMistakes.intro1}</p><p>{t.commonMistakes.intro2}</p>
                  <div className="space-y-12 pt-6">
                    {t.commonMistakes.mistakes.map((m) => (
                      <div key={m.title}><h3 className="font-serif text-2xl text-brand-navy mb-4">{m.title}</h3><div className="space-y-4">
                        <p>{m.p1}</p>{m.p2 && <p>{m.p2}</p>}
                        {m.items && <ul className="space-y-3 pl-2">{m.items.map((item) => (<li key={item} className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-brand-navy/30 shrink-0" /><span>{item}</span></li>))}</ul>}
                        {m.p3 && <p>{m.p3}</p>}
                        {m.items2 && <ul className="space-y-3 pl-2">{m.items2.map((item) => (<li key={item} className="flex items-center gap-4"><CheckCircle2 className="w-4 h-4 text-brand-gold/70 shrink-0" /><span>{item}</span></li>))}</ul>}
                        {m.scenario && <div className="mt-8 p-6 sm:p-8 bg-brand-navy/[0.02] border-l-2 border-brand-gold rounded-r-2xl"><p className="text-base text-slate-700 leading-relaxed italic m-0">{m.scenario}</p></div>}
                        {m.conclusion && <p className="pt-2">{m.conclusion}</p>}
                      </div></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hospital Quality */}
              <div id="hospital-quality" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.hospitalQuality.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.hospitalQuality.intro1}</p><p>{t.hospitalQuality.intro2}</p>
                  <div className="space-y-10 pt-6">
                    {t.hospitalQuality.factors.map((f) => (
                      <div key={f.title} className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
                        <h3 className="font-serif text-xl text-brand-navy font-bold mb-3">{f.title}</h3>
                        <div className="space-y-3"><p>{f.p1}</p>{f.p2 && <p>{f.p2}</p>}{f.p3 && <p>{f.p3}</p>}
                          {f.items && <ul className="space-y-2 pl-2">{f.items.map((item) => (<li key={item} className="flex items-center gap-3 text-base"><div className="w-1 h-1 rounded-full bg-brand-gold shrink-0" /><span>{item}</span></li>))}</ul>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews Rankings */}
              <div id="reviews-rankings" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.reviewsRankings.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.reviewsRankings.p1}</p>
                  <ul className="space-y-3 pl-2">{t.reviewsRankings.items1.map((item) => (<li key={item} className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-brand-navy/30 shrink-0" /><span>{item}</span></li>))}</ul>
                  <p>{t.reviewsRankings.p2}</p><p>{t.reviewsRankings.p3}</p>
                  <ul className="space-y-3 pl-2">{t.reviewsRankings.items2.map((item) => (<li key={item} className="flex items-center gap-4 font-medium text-brand-navy"><CheckCircle2 className="w-4 h-4 text-brand-gold/70 shrink-0" /><span>{item}</span></li>))}</ul>
                  <p className="pt-2">{t.reviewsRankings.p4}</p>
                  <p>{t.reviewsRankings.trustProtocolNote.split("trust protocol").map((part, i) => i === 0 ? <span key={i}>{part}<Link href={`${prefix}/trust-protocol`} className="text-brand-navy font-medium underline underline-offset-4 decoration-brand-gold/40 hover:text-brand-gold transition-colors">trust protocol</Link></span> : <span key={i}>{part}</span>)}</p>
                </div>
              </div>

              {/* Physician-Led */}
              <div id="physician-led" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.physicianLed.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.physicianLed.p1}</p><p>{t.physicianLed.p2}</p>
                  <ul className="space-y-4 pl-2">{t.physicianLed.items.map((item) => (<li key={item} className="flex items-start gap-4 p-4 bg-brand-navy/[0.02] rounded-xl border border-slate-100"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" /><span className="text-brand-navy font-medium">{item}</span></li>))}</ul>
                  <p className="pt-2">{t.physicianLed.p3}</p><p>{t.physicianLed.trustNote}</p>
                </div>
              </div>

              {/* Patient Journey */}
              <div id="patient-journey" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.patientJourney.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.patientJourney.p1}</p><p>{t.patientJourney.p2}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">{t.patientJourney.steps.map((item, i) => (<div key={item} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl bg-white shadow-sm"><span className="text-brand-gold/60 font-bold text-sm shrink-0">0{i + 1}</span><span className="font-medium text-brand-navy text-base">{item}</span></div>))}</div>
                  <p>{t.patientJourney.p3}</p>
                  <p><Link href={`${prefix}/medical-journey`} className="text-brand-navy font-medium underline underline-offset-4 decoration-brand-gold/40 hover:text-brand-gold transition-colors">{t.patientJourney.journeyNote}</Link></p>
                </div>
              </div>

              {/* South Korea */}
              <div id="south-korea" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.southKorea.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.southKorea.p1}</p>
                  <div className="flex flex-wrap gap-3">{t.southKorea.specialties.map((item) => (<span key={item} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-brand-navy text-sm font-medium">{item}</span>))}</div>
                  <p className="pt-2">{t.southKorea.p2}</p>
                  <ul className="space-y-3 pl-2">{t.southKorea.factors.map((item) => (<li key={item} className="flex items-center gap-4 font-medium text-brand-navy"><CheckCircle2 className="w-4 h-4 text-brand-gold/70 shrink-0" /><span>{item}</span></li>))}</ul>
                  <p className="pt-2">{t.southKorea.oecdNote}</p>
                  <p><Link href={`${prefix}/hair-transplant-korea`} className="text-brand-navy font-medium underline underline-offset-4 decoration-brand-gold/40 hover:text-brand-gold transition-colors">{t.southKorea.hairNote}</Link></p>
                </div>
              </div>

              {/* Structured Approach */}
              <div id="structured-approach" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.structuredApproach.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.structuredApproach.p1}</p><p className="font-medium text-brand-navy text-xl">{t.structuredApproach.p2}</p><p>{t.structuredApproach.p3}</p>
                  <ul className="space-y-4 pl-2">{t.structuredApproach.items.map((item) => (<li key={item} className="flex items-start gap-4 p-4 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] rounded-xl border border-slate-100"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" /><span className="text-brand-navy font-medium">{item}</span></li>))}</ul>
                  <p className="pt-2">{t.structuredApproach.p4}</p>
                </div>
              </div>

              {/* Closing */}
              <div className="mt-16 p-8 sm:p-10 bg-brand-navy text-white rounded-3xl shadow-xl">
                <div className="space-y-6 text-lg sm:text-xl font-light leading-relaxed">
                  <p className="text-white/90">{t.closing.p1}</p><p className="text-white/90">{t.closing.p2}</p><p className="text-white/90">{t.closing.p3}</p>
                  <p className="font-serif text-2xl sm:text-3xl text-brand-gold leading-tight">{t.closing.p4}</p>
                </div>
              </div>

              {/* FAQ */}
              <div id="faq" className="pt-16 scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-10 pb-4 border-b border-slate-100 leading-tight">{t.faq.title}</h2>
                <div className="space-y-6">{t.faq.items.map((faq) => (<div key={faq.question} className="p-6 sm:p-8 bg-slate-50 border border-slate-100 rounded-2xl hover:border-brand-gold/30 transition-colors"><h3 className="font-serif text-xl text-brand-navy font-bold mb-4">{faq.question}</h3><p className="text-lg text-slate-600 font-light leading-[1.8] m-0">{faq.answer}</p></div>))}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
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
