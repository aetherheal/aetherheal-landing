import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, TrendingUp, DollarSign, ShieldCheck, Bot, Users, CheckCircle2, Clock, Rocket, Target, Layers, Globe, Cpu, ArrowDown, Car } from "lucide-react"
import { type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { HeroSection, PageSection, ComparisonTable, IconCardGrid, CTASection, LemonCycleDiagram } from "@/components/landing"

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

export default async function ForInvestorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.forInvestors
  if (!t) return null
  const prefix = `/${locale}`

  return (
    <div className="min-h-full">
      <HeroSection
        icon={TrendingUp}
        badge={t.hero.badge}
        h1={t.hero.h1}
        h1Highlight={t.hero.h1Highlight}
        intro={t.hero.intro}
      />

      {/* Market Opportunity */}
      <PageSection>
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
      </PageSection>

      {/* Problem */}
      <PageSection bg="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 break-keep">{t.problem.title}</h2>
          <div className="space-y-6 text-lg text-slate-700 leading-[1.8] mb-12 break-keep">
            <p>{t.problem.p1}</p>
            <p>{t.problem.p2}</p>
          </div>

          <LemonCycleDiagram
            steps={t.problem.cycleSteps}
            label={t.problem.cycleLabel}
            subLabel={t.problem.cycleSubLabel}
            caption={t.problem.cycleCaption}
            captionSub={t.problem.cycleCaptionSub}
          />
        </div>
      </PageSection>

      {/* Business Model */}
      <PageSection>
        <IconCardGrid
          title={t.model.title}
          subtitle={t.model.p1}
          items={t.model.revenue}
          icons={[DollarSign, Target, Rocket, Car]}
          variant="navy"
        />
      </PageSection>

      {/* Competitive Moat */}
      <PageSection bg="light">
        <IconCardGrid
          title={t.moat.title}
          items={t.moat.items}
          icons={[ShieldCheck, Users, Bot, TrendingUp]}
          variant="gold"
        />
      </PageSection>

      {/* Technology Architecture */}
      <PageSection>
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
      </PageSection>

      {/* Tech Comparison */}
      <PageSection bg="light">
        <ComparisonTable
          title={t.techComparison.title}
          subtitle={t.techComparison.subtitle}
          oldLabel={t.techComparison.oldLabel}
          oldItems={t.techComparison.oldItems}
          newLabel={t.techComparison.newLabel}
          newItems={t.techComparison.newItems}
        />
      </PageSection>

      {/* Team Link */}
      <PageSection bg="white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">{t.team.title}</h2>
          <Link
            href={`/${locale}/for-team`}
            className="inline-flex items-center gap-2 text-brand-navy font-medium hover:text-brand-gold transition-colors"
          >
            {t.team.viewTeam}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </PageSection>

      {/* Traction & Roadmap */}
      <PageSection bg="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-12 text-center break-keep">{t.traction.title}</h2>

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
              {t.traction.phases.map((phase: { label: string; period: string; title: string; description: string }) => (
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
      </PageSection>

      {/* CTA */}
      <CTASection
        title={t.cta.title}
        description={t.cta.description}
        primaryHref={`mailto:${t.cta.email}?subject=${dict.common.contactSubjects.investor}`}
        primaryLabel={t.cta.buttonText}
        secondaryHref={`mailto:${t.cta.email}?subject=${dict.common.contactSubjects.deck}`}
        secondaryLabel={t.cta.deckText}
        stage={t.cta.stage}
        tertiaryHref={`${prefix}/our-philosophy`}
        tertiaryLabel={dict.common.readPhilosophy}
      />
    </div>
  )
}
