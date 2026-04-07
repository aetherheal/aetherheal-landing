import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Shield, Eye, FileCheck, CheckCircle, CheckCircle2, XCircle, Lock, Scale, Split, Bot, Users, Building2, Landmark } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Card } from "@/components/ui/card"
import { assertPatientLocale } from "@/i18n/assert-locale"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

const trustRoleIcons = [Eye, Scale, FileCheck, Lock]
const aiPrincipleIcons = [Eye, Users, Lock, Scale]
const audienceIcons = [Users, Building2, Landmark]
const audienceColors = ["bg-brand-gold/10 text-brand-gold", "bg-brand-navy/10 text-brand-navy", "bg-slate-100 text-slate-600"]
const responsibilityIcons = [Lock, Shield, Landmark]
const relatedHrefs = ["/how-to-choose-hospital-abroad", "/medical-journey", "/how-it-works"]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  assertPatientLocale(locale)
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
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const t = dict.trustProtocol
  const prefix = `/${locale}`
  const responsibilitySection = t.responsibilityArchitecture ?? {
    title: "Responsibility Architecture",
    intro:
      "The more authority a platform claims over a decision, the more clearly it must define the responsibility it carries.",
    positions: [
      {
        title: "Pure Intermediary",
        body: "A platform that only connects parties can try to minimize responsibility, but trust stays weak and fragmented.",
      },
      {
        title: "Credentialing Platform",
        body: "A platform that sets standards carries more authority and must be accountable for whether those standards mean anything.",
      },
      {
        title: "Decision Infrastructure",
        body: "A platform that structures and shapes decisions enters the chain of responsibility directly. That is the position AetherHeal takes.",
      },
    ],
    principleIntro: "The governing principle is simple:",
    principleText:
      "Influence and responsibility must expand together. If a platform helps shape a medical decision, it should not hide behind neutrality.",
    guardrails: [
      "Define clearly what AetherHeal is responsible for and what remains provider responsibility.",
      "Treat legal boundaries and moral responsibility as related but not identical.",
      "Use adverse outcomes, audits, and patient feedback as learning inputs rather than reputation leaks to bury.",
    ],
    callout:
      "Trust without responsibility is only marketing language. If a platform asks for trust, it should make its responsibility legible.",
  }

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

          {/* TL;DR Summary */}
          <div className="mt-12 p-6 sm:p-8 bg-brand-navy/[0.03] border border-brand-gold/20 rounded-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-4">{t.tldr?.badge ?? "In Short"}</p>
            <ul className="space-y-3">
              {(t.tldr?.points ?? [
                "Physicians review every case — AI assists but never decides.",
                "The people who advise you don't profit from which hospital you choose.",
                "Partner hospitals are selectively verified and re-evaluated regularly.",
                "Every decision is logged, auditable, and traceable to a responsible human.",
              ]).map((point: string) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-base text-brand-navy font-medium leading-snug">{point}</span>
                </li>
              ))}
            </ul>
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

              {/* Responsibility Architecture */}
              <div id="responsibility-architecture" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{responsibilitySection.title}</h2>
                <div className="space-y-8 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{responsibilitySection.intro}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {responsibilitySection.positions.map((item, i) => {
                      const Icon = responsibilityIcons[i % responsibilityIcons.length]
                      return (
                        <Card key={item.title} className="p-6 sm:p-8 space-y-4">
                          <div className="w-11 h-11 rounded-2xl bg-brand-navy/5 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-brand-navy" />
                          </div>
                          <h3 className="font-serif text-2xl text-text-deep">{item.title}</h3>
                          <p className="text-sm text-text-body leading-relaxed">{item.body}</p>
                        </Card>
                      )
                    })}
                  </div>
                  <div className="p-6 sm:p-8 bg-brand-navy/[0.02] border-l-2 border-brand-gold rounded-r-2xl">
                    <p className="text-base text-brand-navy font-serif font-medium leading-relaxed mb-3">{responsibilitySection.principleIntro}</p>
                    <p className="text-base text-slate-700 leading-relaxed italic m-0">{responsibilitySection.principleText}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {responsibilitySection.guardrails.map((item) => (
                      <div key={item} className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                        <span className="text-brand-navy font-medium text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 sm:p-8 bg-brand-navy rounded-2xl">
                    <p className="text-base text-white font-serif font-medium leading-relaxed italic">{responsibilitySection.callout}</p>
                  </div>
                </div>
              </div>

              {/* AI Governance */}
              <div id="ai-governance" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.aiGovernance.title}</h2>
                <div className="space-y-8 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.aiGovernance.intro}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {t.aiGovernance.principles.map((item, i) => {
                      const Icon = aiPrincipleIcons[i % aiPrincipleIcons.length]
                      return (
                      <Card key={item.title} className="p-6 sm:p-8 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-brand-navy" />
                          </div>
                          <h3 className="font-serif text-xl text-text-deep">{item.title}</h3>
                        </div>
                        <p className="text-sm text-text-body leading-relaxed">{item.body}</p>
                      </Card>
                      )
                    })}
                  </div>
                  <div className="p-6 sm:p-8 bg-brand-navy/[0.02] border border-slate-100 rounded-2xl">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-6">{t.aiGovernance.validTitle}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {t.aiGovernance.outcomes.map((item) => (
                        <div key={item.label} className="p-5 bg-white border border-slate-100 rounded-xl shadow-sm">
                          <p className="text-sm font-bold text-brand-navy mb-2">{item.label}</p>
                          <p className="text-sm text-text-body leading-relaxed">{item.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Incentive Separation */}
              <div id="incentive-separation" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.incentiveSeparation.title}</h2>
                <div className="space-y-8 text-lg text-slate-600 font-light leading-[1.8]">
                  <div className="p-6 sm:p-8 bg-brand-gold/5 border border-brand-gold/15 rounded-2xl">
                    <p className="text-base text-brand-navy font-serif font-medium leading-relaxed">{t.incentiveSeparation.akerlofFraming}</p>
                  </div>
                  <p>{t.incentiveSeparation.p1}</p>
                  <div className="border-l-2 border-slate-200 pl-6">
                    <p>{t.incentiveSeparation.p2}</p>
                  </div>
                  <div className="flex items-center justify-center py-4"><Split className="w-6 h-6 text-brand-gold" /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <div className="p-6 sm:p-10 bg-brand-navy text-white flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-6"><div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0"><Eye className="w-6 h-6 text-brand-gold" /></div><div><p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-1">{t.incentiveSeparation.angelLayer.label}</p><h3 className="font-serif text-2xl text-white">{t.incentiveSeparation.angelLayer.title}</h3></div></div>
                        <p className="text-base text-white/80 leading-relaxed mb-8">{t.incentiveSeparation.angelLayer.description}</p>
                      </div>
                      <div className="space-y-4 pt-6 border-t border-white/10">
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold/80 mb-2">{t.incentiveSeparation.angelLayer.incentiveLabel}</p>
                        {t.incentiveSeparation.angelLayer.incentives.map((item) => (<div key={item} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" /><span className="text-sm text-white/90 leading-snug">{item}</span></div>))}
                      </div>
                    </div>
                    <div className="p-6 sm:p-10 bg-white flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-6"><div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100"><Shield className="w-6 h-6 text-brand-navy" /></div><div><p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t.incentiveSeparation.providerLayer.label}</p><h3 className="font-serif text-2xl text-brand-navy">{t.incentiveSeparation.providerLayer.title}</h3></div></div>
                        <p className="text-base text-slate-500 leading-relaxed mb-8">{t.incentiveSeparation.providerLayer.description}</p>
                      </div>
                      <div className="space-y-4 pt-6 border-t border-slate-100">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{t.incentiveSeparation.providerLayer.incentiveLabel}</p>
                        {t.incentiveSeparation.providerLayer.incentives.map((item) => (<div key={item} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" /><span className="text-sm text-slate-700 leading-snug">{item}</span></div>))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 bg-brand-navy/[0.02] border-l-2 border-brand-gold rounded-r-2xl">
                    <p className="text-base text-brand-navy font-serif font-medium leading-relaxed mb-3">{t.incentiveSeparation.principleIntro}</p>
                    <p className="text-base text-slate-700 leading-relaxed italic m-0">{t.incentiveSeparation.principleText}</p>
                  </div>
                  <div className="p-6 sm:p-8 bg-brand-navy rounded-2xl">
                    <p className="text-base text-white font-serif font-medium leading-relaxed italic">{t.incentiveSeparation.structuralCallout}</p>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {t.whatThisMeans.audiences.map((audience, i) => {
                    const Icon = audienceIcons[i % audienceIcons.length]
                    return (
                    <div key={audience.label} className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${audienceColors[i % audienceColors.length]}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <SectionLabel color={i === 0 ? "gold" : i === 1 ? "default" : "muted"}>{audience.label}</SectionLabel>
                      </div>
                      <p className="text-sm text-text-body leading-relaxed">{audience.body}</p>
                    </div>
                    )
                  })}
                </div>
              </div>

              {/* Trust Scope */}
              <div id="trust-scope" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.trustScope.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]"><p>{t.trustScope.intro}</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white rounded-2xl border border-emerald-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700">{t.trustScope.doTitle}</h3>
                    </div>
                    <ul className="space-y-4">{t.trustScope.doItems.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center" aria-label="Yes">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        </span>
                        <span className="text-sm text-text-body">{item}</span>
                      </li>
                    ))}</ul>
                  </div>
                  <div className="bg-white rounded-2xl border border-red-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                        <XCircle className="w-5 h-5 text-danger" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-danger">{t.trustScope.dontTitle}</h3>
                    </div>
                    <ul className="space-y-4">{t.trustScope.dontItems.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center" aria-label="No">
                          <XCircle className="w-3.5 h-3.5 text-danger" />
                        </span>
                        <span className="text-sm text-text-body">{item}</span>
                      </li>
                    ))}</ul>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {t.ongoing.checklist.map((item) => (
                      <div key={item} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span className="text-sm text-brand-navy font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
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
