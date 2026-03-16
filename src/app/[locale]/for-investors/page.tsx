import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, TrendingUp, AlertTriangle, DollarSign, ShieldCheck, Bot, Users, CheckCircle2, Clock, Rocket, Target, Layers, Globe, FileText, MessageSquare, XCircle, Cpu, ArrowDown, Car } from "lucide-react"
import { type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

export function generateStaticParams() {
  return [{ locale: "ko" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.forInvestors?.meta
  if (!t) return {}
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `https://aetherheal.com/${locale}/for-investors` },
    openGraph: { title: t.title, description: t.description, url: `https://aetherheal.com/${locale}/for-investors`, images: [{ url: "/og-image.jpg", width: 1200, height: 630 }] },
  }
}

const moatIcons = [ShieldCheck, Users, Bot, TrendingUp]
const revenueIcons = [DollarSign, Target, Rocket, Car]

export default async function ForInvestorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.forInvestors
  if (!t) return null
  const prefix = `/${locale}`

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(191,155,48,0.08),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold/10 rounded-full text-[10px] font-bold text-brand-gold uppercase tracking-widest break-keep">
            <TrendingUp className="w-3.5 h-3.5" />
            {t.hero.badge}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight break-keep">
            {t.hero.h1} <span className="text-brand-gold">{t.hero.h1Highlight}</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed break-keep">{t.hero.intro}</p>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 break-keep">{t.market.title}</h2>
          <div className="space-y-6 text-lg text-slate-700 leading-[1.8] mb-12 break-keep">
            <p>{t.market.p1}</p>
            <p>{t.market.p2}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.market.stats.map((stat: { number: string; label: string }) => (
              <div key={stat.label} className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6 text-center">
                <p className="font-serif text-3xl sm:text-4xl text-brand-navy font-bold mb-2 break-keep">{stat.number}</p>
                <p className="text-[15px] font-medium text-slate-700 break-keep">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-bg-light border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 break-keep">{t.problem.title}</h2>
          <div className="space-y-6 text-lg text-slate-700 leading-[1.8] mb-12 break-keep">
            <p>{t.problem.p1}</p>
            <p>{t.problem.p2}</p>
          </div>

          <div className="rounded-2xl border border-red-200/60 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="font-serif text-lg text-brand-navy font-semibold break-keep">레몬 시장 사이클</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.problem.cycle.map((step: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-xs font-bold text-red-600">{i + 1}</span>
                  <span className="text-[15px] text-text-deep font-medium leading-relaxed break-keep">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">{t.model.title}</h2>
          <p className="text-lg text-slate-700 leading-[1.8] mb-12 break-keep">{t.model.p1}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.model.revenue.map((item: { title: string; description: string }, i: number) => {
              const Icon = revenueIcons[i % revenueIcons.length]
              return (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-bg-light p-7">
                  <div className="w-11 h-11 rounded-2xl bg-brand-navy flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="font-serif text-lg text-brand-navy font-semibold mb-3 break-keep">{item.title}</h3>
                  <p className="text-[15px] text-slate-700 leading-relaxed break-keep">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Competitive Moat */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-bg-light border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-12 text-center break-keep">{t.moat.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.moat.items.map((item: { title: string; description: string }, i: number) => {
              const Icon = moatIcons[i % moatIcons.length]
              return (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.1)]">
                  <div className="w-11 h-11 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="font-serif text-xl text-brand-navy font-semibold mb-3 break-keep">{item.title}</h3>
                  <p className="text-[15px] text-slate-700 leading-relaxed break-keep">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technology Architecture */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">{t.technology.title}</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-12 break-keep">{t.technology.subtitle}</p>

          {/* 3-Layer Diagram */}
          <div className="max-w-3xl mx-auto mb-16">
            {t.technology.layers.map((layer: { label: string; detail: string }, i: number) => {
              const layerIcons = [Globe, Cpu, Layers]
              const LayerIcon = layerIcons[i]
              const isEngine = i === 1
              return (
                <div key={layer.label}>
                  <div className={`rounded-2xl p-6 sm:p-7 ${isEngine ? "bg-brand-navy text-white border-2 border-brand-gold/30" : "bg-bg-light border border-slate-200"}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${isEngine ? "bg-brand-gold/20" : "bg-brand-gold/10"}`}>
                        <LayerIcon className="w-5 h-5 text-brand-gold" />
                      </div>
                      <div>
                        <h3 className={`font-serif text-lg font-semibold break-keep ${isEngine ? "text-white" : "text-brand-navy"}`}>{layer.label}</h3>
                        <p className={`text-[15px] break-keep ${isEngine ? "text-white/80" : "text-slate-600"}`}>{layer.detail}</p>
                      </div>
                    </div>
                  </div>
                  {i < t.technology.layers.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowDown className="w-5 h-5 text-brand-gold/50" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Agent Tasks */}
          <h3 className="font-serif text-2xl text-brand-navy mb-3 break-keep">{t.technology.agentTitle}</h3>
          <p className="text-[15px] text-slate-700 mb-8 break-keep">{t.technology.agentSubtitle}</p>
          <div className="space-y-8 mb-16">
            {t.technology.agents.map((group: { phase: string; items: { title: string; description: string }[] }) => (
              <div key={group.phase}>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-brand-gold/10 text-brand-gold mb-4">{group.phase}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {group.items.map((item: { title: string; description: string }) => (
                    <div key={item.title} className="rounded-2xl border border-slate-200 bg-bg-light p-6">
                      <h4 className="font-serif text-[15px] text-brand-navy font-semibold mb-2 break-keep">{item.title}</h4>
                      <p className="text-[14px] text-slate-600 leading-relaxed break-keep">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Medical Guardrails */}
          <h3 className="font-serif text-2xl text-brand-navy mb-3 break-keep">{t.technology.guardrailsTitle}</h3>
          <p className="text-[15px] text-slate-700 mb-8 break-keep">{t.technology.guardrailsSubtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.technology.guardrails.map((g: { title: string; description: string }) => (
              <div key={g.title} className="rounded-2xl border border-red-200/50 bg-white p-6 border-l-4 border-l-red-400">
                <h4 className="font-serif text-[15px] text-brand-navy font-semibold mb-2 break-keep">{g.title}</h4>
                <p className="text-[14px] text-slate-600 leading-relaxed break-keep">{g.description}</p>
              </div>
            ))}
          </div>

          {/* Angel Physician */}
          <div className="mt-12 rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-8 sm:p-10">
            <h3 className="font-serif text-2xl text-brand-navy mb-4 break-keep">{t.technology.angelPhysicianTitle}</h3>
            <p className="text-[15px] text-slate-700 leading-relaxed break-keep">{t.technology.angelPhysicianDescription}</p>
          </div>
        </div>
      </section>

      {/* Tech Comparison */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-bg-light border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 text-center break-keep">{t.techComparison.title}</h2>
          <p className="text-[15px] text-slate-700 text-center mb-12 break-keep">{t.techComparison.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-200">
            <div className="bg-red-50/80 p-7 sm:p-8 border-b md:border-b-0 md:border-r border-slate-200">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-red-600 mb-6 break-keep">{t.techComparison.oldLabel}</h3>
              <ul className="space-y-4">
                {t.techComparison.oldItems.map((item: string) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-[15px] text-slate-700 leading-relaxed break-keep">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-emerald-50/80 p-7 sm:p-8">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 mb-6 break-keep">{t.techComparison.newLabel}</h3>
              <ul className="space-y-4">
                {t.techComparison.newItems.map((item: string) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-[15px] text-slate-700 leading-relaxed break-keep">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Link */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">{t.team.title}</h2>
          <Link
            href={`/${locale}/for-team`}
            className="inline-flex items-center gap-2 text-brand-navy font-medium hover:text-brand-gold transition-colors"
          >
            팀 소개 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Traction & Roadmap */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-bg-light border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-12 text-center break-keep">{t.traction.title}</h2>

          {/* Current Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {t.traction.currentStats.map((stat: { number: string; label: string }) => (
              <div key={stat.label} className="rounded-2xl border border-emerald-200/50 bg-emerald-50/30 p-6 text-center">
                <p className="font-serif text-3xl sm:text-4xl text-brand-navy font-bold mb-2 break-keep">{stat.number}</p>
                <p className="text-[15px] font-medium text-slate-700 break-keep">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {t.traction.milestones.map((m: { status: string; text: string }, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1">
                  {m.status === "done" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : m.status === "current" ? (
                    <Clock className="w-5 h-5 text-brand-gold" />
                  ) : (
                    <Rocket className="w-5 h-5 text-slate-300" />
                  )}
                </div>
                <span className={`text-sm leading-relaxed break-keep ${m.status === "done" ? "text-text-body" : m.status === "current" ? "text-brand-navy font-semibold" : "text-text-muted"}`}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          {/* Tech Development Phases */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl text-brand-navy mb-8 text-center break-keep">{t.traction.phasesTitle}</h3>
            <div className="relative pl-10">
              <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-brand-gold/20" />
              {t.traction.phases.map((phase: { label: string; period: string; title: string; description: string }, i: number) => (
                <div key={phase.label} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-brand-gold border-[3px] border-bg-light" />
                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">{phase.label}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{phase.period}</span>
                    </div>
                    <h4 className="font-serif text-[15px] text-brand-navy font-semibold mb-1 break-keep">{phase.title}</h4>
                    <p className="text-[14px] text-slate-600 leading-relaxed break-keep">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-brand-navy">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-3xl sm:text-4xl text-white break-keep">{t.cta.title}</h2>
          <p className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold/15 rounded-full text-[13px] font-semibold text-brand-gold tracking-wide break-keep">{t.cta.stage}</p>
          <p className="text-slate-300 text-lg leading-relaxed break-keep">{t.cta.description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${t.cta.email}?subject=에테르힐 투자 문의`}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-brand-navy bg-brand-gold rounded-full hover:bg-brand-gold/90 transition-all hover:shadow-lg break-keep"
            >
              {t.cta.buttonText}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${t.cta.email}?subject=에테르힐 사업계획서 요청`}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all break-keep"
            >
              {t.cta.deckText}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="pt-8">
            <Link href={`${prefix}/our-philosophy`} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-gold transition-colors break-keep">
              에테르힐 철학 읽기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
