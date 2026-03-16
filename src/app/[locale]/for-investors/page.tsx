import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, TrendingUp, AlertTriangle, DollarSign, ShieldCheck, Bot, Users, CheckCircle2, Clock, Rocket, Target } from "lucide-react"
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
const revenueIcons = [DollarSign, Target, Rocket]

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
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light break-keep">{t.hero.intro}</p>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 break-keep">{t.market.title}</h2>
          <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8] mb-12 break-keep">
            <p>{t.market.p1}</p>
            <p>{t.market.p2}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.market.stats.map((stat: { number: string; label: string }) => (
              <div key={stat.label} className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6 text-center">
                <p className="font-serif text-3xl sm:text-4xl text-brand-navy font-bold mb-2 break-keep">{stat.number}</p>
                <p className="text-sm text-text-muted break-keep">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-bg-light border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 break-keep">{t.problem.title}</h2>
          <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8] mb-12 break-keep">
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
                  <span className="text-sm text-text-body leading-relaxed break-keep">{step}</span>
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
          <p className="text-lg text-slate-600 font-light leading-[1.8] mb-12 break-keep">{t.model.p1}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.model.revenue.map((item: { title: string; description: string }, i: number) => {
              const Icon = revenueIcons[i % revenueIcons.length]
              return (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-bg-light p-7">
                  <div className="w-11 h-11 rounded-2xl bg-brand-navy flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="font-serif text-lg text-brand-navy font-semibold mb-3 break-keep">{item.title}</h3>
                  <p className="text-sm text-text-body leading-relaxed break-keep">{item.description}</p>
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
                  <p className="text-sm text-text-body leading-relaxed break-keep">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-12 text-center break-keep">{t.team.title}</h2>
          <div className="rounded-3xl border border-slate-200 bg-bg-light p-8 sm:p-10 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center shrink-0">
                <Users className="w-8 h-8 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-brand-navy font-semibold break-keep">{t.team.founder.name}</h3>
                <p className="text-sm text-brand-gold font-medium break-keep">{t.team.founder.title}</p>
              </div>
            </div>
            <p className="text-sm text-text-body leading-relaxed break-keep">{t.team.founder.bio}</p>
          </div>
        </div>
      </section>

      {/* Traction & Roadmap */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-bg-light border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-12 text-center break-keep">{t.traction.title}</h2>
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
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-brand-navy">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-3xl sm:text-4xl text-white break-keep">{t.cta.title}</h2>
          <p className="text-slate-300 text-lg leading-relaxed break-keep">{t.cta.description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${t.cta.email}?subject=AetherHeal 투자 문의`}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-brand-navy bg-brand-gold rounded-full hover:bg-brand-gold/90 transition-all hover:shadow-lg break-keep"
            >
              {t.cta.buttonText}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${t.cta.email}?subject=AetherHeal 사업계획서 요청`}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all break-keep"
            >
              {t.cta.deckText}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="pt-8">
            <Link href={`${prefix}/our-philosophy`} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-gold transition-colors break-keep">
              우리의 철학 읽기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
