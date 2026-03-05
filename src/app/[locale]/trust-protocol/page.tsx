import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Shield, Eye, FileCheck, CheckCircle, CheckCircle2, XCircle, Lock, Scale, Split } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Card } from "@/components/ui/card"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

const trustRoleIcons = [Eye, Scale, FileCheck, Lock]
const relatedHrefs = ["/how-to-choose-hospital-abroad", "/medical-journey", "/how-it-works"]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.trustProtocol.meta
  return {
    title: t.title, description: t.description,
    alternates: { canonical: `https://aetherheal.com/${locale}/trust-protocol`, languages: Object.fromEntries(locales.map((l) => [l, `https://aetherheal.com/${l}/trust-protocol`])) },
    openGraph: { title: t.title, description: t.description, url: `https://aetherheal.com/${locale}/trust-protocol`, images: [{ url: "/og-image.jpg", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  }
}

export default async function TrustProtocolPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.trustProtocol
  const prefix = `/${locale}`

  return (
    <div className="min-h-full bg-white">
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-brand-navy/[0.02] to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8"><span className="inline-flex items-center px-4 py-1.5 bg-brand-navy text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-sm">{t.hero.badge}</span></div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-10 leading-[1.1] tracking-tight">{t.hero.h1} <br className="hidden sm:block" /><span className="italic text-brand-gold">{t.hero.h1Highlight}</span></h1>
          <div className="max-w-3xl space-y-6 text-lg sm:text-xl text-slate-600 font-light leading-[1.8]">
            <p className="text-xl sm:text-2xl font-serif text-brand-navy leading-relaxed">{t.hero.intro}</p>
            <p>{t.hero.disclaimer}</p>
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
              {/* Purpose */}
              <div id="purpose" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.purpose.title}</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4"><Shield className="w-5 h-5 text-brand-gold" /><SectionLabel color="gold">{t.purpose.protocolDocument}</SectionLabel></div>
                  <Card accent="gold" className="p-5 sm:p-8 space-y-4"><h3 className="font-serif text-xl text-text-deep">{t.purpose.purposeTitle}</h3><p className="text-sm text-text-body leading-relaxed">{t.purpose.purposeText}</p></Card>
                  <Card accent="navy" className="p-5 sm:p-8 space-y-4"><h3 className="font-serif text-xl text-text-deep">{t.purpose.authorityTitle}</h3><p className="text-sm text-text-body leading-relaxed">{t.purpose.authorityText}</p></Card>
                  <Card accent="muted" className="p-5 sm:p-8 space-y-4"><h3 className="font-serif text-xl text-text-deep">{t.purpose.independenceTitle}</h3><p className="text-sm text-text-body leading-relaxed">{t.purpose.independenceText}</p></Card>
                </div>
              </div>

              {/* Incentive Separation */}
              <div id="incentive-separation" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.incentiveSeparation.title}</h2>
                <div className="space-y-8 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.incentiveSeparation.p1}</p><p>{t.incentiveSeparation.p2}</p>
                  <div className="flex items-center justify-center py-4"><Split className="w-6 h-6 text-brand-gold" /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <div className="p-6 sm:p-10 bg-brand-navy text-white">
                      <div className="flex items-center gap-4 mb-6"><div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0"><Eye className="w-6 h-6 text-brand-gold" /></div><div><p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-1">{t.incentiveSeparation.angelLayer.label}</p><h3 className="font-serif text-2xl text-white">{t.incentiveSeparation.angelLayer.title}</h3></div></div>
                      <p className="text-base text-white/80 leading-relaxed mb-8">{t.incentiveSeparation.angelLayer.description}</p>
                      <div className="space-y-4 pt-6 border-t border-white/10"><p className="text-xs font-bold uppercase tracking-widest text-brand-gold/80 mb-2">{t.incentiveSeparation.angelLayer.incentiveLabel}</p>
                        {t.incentiveSeparation.angelLayer.incentives.map((item) => (<div key={item} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" /><span className="text-sm text-white/90 leading-snug">{item}</span></div>))}
                      </div>
                    </div>
                    <div className="p-6 sm:p-10 bg-white">
                      <div className="flex items-center gap-4 mb-6"><div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100"><Shield className="w-6 h-6 text-brand-navy" /></div><div><p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t.incentiveSeparation.providerLayer.label}</p><h3 className="font-serif text-2xl text-brand-navy">{t.incentiveSeparation.providerLayer.title}</h3></div></div>
                      <p className="text-base text-slate-500 leading-relaxed mb-8">{t.incentiveSeparation.providerLayer.description}</p>
                      <div className="space-y-4 pt-6 border-t border-slate-100"><p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{t.incentiveSeparation.providerLayer.incentiveLabel}</p>
                        {t.incentiveSeparation.providerLayer.incentives.map((item) => (<div key={item} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" /><span className="text-sm text-slate-700 leading-snug">{item}</span></div>))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 bg-brand-navy/[0.02] border-l-2 border-brand-gold rounded-r-2xl">
                    <p className="text-base text-brand-navy font-serif font-medium leading-relaxed mb-3">{t.incentiveSeparation.principleIntro}</p>
                    <p className="text-base text-slate-700 leading-relaxed italic m-0">{t.incentiveSeparation.principleText}</p>
                  </div>
                </div>
              </div>

              {/* Partner Criteria */}
              <div id="partner-criteria" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.partnerCriteria.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.partnerCriteria.intro}</p>
                  <div className="grid grid-cols-1 gap-4 pt-4">{t.partnerCriteria.items.map((item) => (<div key={item} className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" /><span className="text-brand-navy font-medium text-base">{item}</span></div>))}</div>
                </div>
              </div>

              {/* What This Means */}
              <div id="what-this-means" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.whatThisMeans.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]"><p>{t.whatThisMeans.p1}</p><p>{t.whatThisMeans.p2}</p></div>
              </div>

              {/* Trust Scope */}
              <div id="trust-scope" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.trustScope.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]"><p>{t.trustScope.intro}</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6"><CheckCircle className="w-5 h-5 text-emerald-600" /><h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700">{t.trustScope.doTitle}</h3></div>
                    <ul className="space-y-4">{t.trustScope.doItems.map((item) => (<li key={item} className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /><span className="text-sm text-text-body">{item}</span></li>))}</ul>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6"><XCircle className="w-5 h-5 text-danger" /><h3 className="text-sm font-bold uppercase tracking-widest text-danger">{t.trustScope.dontTitle}</h3></div>
                    <ul className="space-y-4">{t.trustScope.dontItems.map((item) => (<li key={item} className="flex items-start gap-3"><XCircle className="w-4 h-4 text-danger mt-0.5 shrink-0" /><span className="text-sm text-text-body">{item}</span></li>))}</ul>
                  </div>
                </div>
              </div>

              {/* Team */}
              <div id="team" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.team.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.team.roles.map((role, i) => { const Icon = trustRoleIcons[i]; return (
                    <Card key={role.title} className="p-6"><div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0"><Icon className="w-6 h-6 text-brand-navy" /></div><div><h3 className="text-sm font-bold text-text-deep mb-1.5">{role.title}</h3><p className="text-xs text-text-muted leading-relaxed">{role.description}</p></div></div></Card>
                  )})}
                </div>
              </div>

              {/* Ongoing */}
              <div id="ongoing" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.ongoing.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.ongoing.text}</p>
                  <div className="p-6 sm:p-8 bg-brand-navy text-white rounded-2xl shadow-lg">
                    <p className="text-xl font-serif text-brand-gold mb-2">{t.ongoing.boxTitle}</p>
                    <p className="text-white/90">{t.ongoing.boxText}</p>
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
