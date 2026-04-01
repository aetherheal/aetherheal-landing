import Link from "next/link"
import {
  User,
  Stethoscope,
  GitFork,
  Building2,
  Compass,
  Infinity,
  Plane,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Bot,
  ShieldCheck,
  Activity,
  HelpCircle,
  Globe,
  Layers,
  RefreshCw,
  Scissors,
  Sparkles,
  Eye,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"
import { Accordion } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { KoLanding } from "./ko-landing"

const journeyIcons = [User, Stethoscope, GitFork, Building2, CreditCard, Compass, Infinity]
const problemQuoteIcons = [GitFork, AlertTriangle, Stethoscope]
// concernIcons removed — Patient Concerns section folded into Explore
const exploreIcons = [Scissors, Sparkles, Building2, Eye, Heart, Stethoscope]
const journeySides = ["right", "left", "center", "right", "left", "right", "left"] as const
const aiLayerIcons = [Bot, ShieldCheck, Activity]

const exploreHrefs = [
  "/hair-transplant-korea",
  "/aesthetic-clinic-seoul",
  "/plastic-surgery-korea",
  "/medical-journey",
  "/trust-protocol",
  "/how-to-choose-hospital-abroad",
]

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  if (locale === "ko") {
    return <KoLanding dict={dict} locale={locale} />
  }

  const t = dict.home
  const prefix = `/${locale}`

  const faqItems = t.faq.items.map((item, i) => ({
    id: String(i + 1),
    question: item.question,
    answer: item.answer,
  }))

  return (
    <div className="min-h-full">
      <link rel="preload" as="video" href="/assets/hero-bg.mp4" type="video/mp4" />

      {/* Desktop: Video + overlaid hero content */}
      <section className="hidden md:block relative w-full">
        <div className="w-full max-h-[95vh] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/hero-poster.jpg"
            aria-label="AetherHeal brand video — physician-led medical journey to Seoul"
            className="w-full h-auto block"
          >
            <source src="/assets/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-40 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="animate-fade-up">
              <div 
                className="inline-block py-2 px-6 border border-brand-navy/20 rounded-full text-[11px] sm:text-sm font-bold uppercase tracking-widest text-brand-navy bg-white shadow-lg"
                dangerouslySetInnerHTML={{ __html: t.hero.badge }}
              />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.15] text-brand-navy font-medium animate-fade-up [animation-delay:100ms] [text-wrap:balance]">
              {t.hero.h1} <br />
              <span className="italic text-brand-gold">{t.hero.h1Highlight}</span>
            </h1>

            <p className="font-sans text-text-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
              {t.hero.description}
              {t.hero.descriptionHighlight && (<>{" "}<span className="font-semibold text-brand-navy border-b-2 border-brand-gold/40">{t.hero.descriptionHighlight}</span>{" "}{t.hero.descriptionEnd}</>)}
            </p>

            <p className="text-sm text-text-muted font-medium tracking-wide animate-fade-up [animation-delay:250ms]">
              {t.hero.disclaimer}
            </p>

            <div className="w-full pt-4 flex flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:300ms]">
              <Link href={`${prefix}/how-it-works`}>
                <Button variant="navy" size="lg" className="min-w-[200px]">
                  {t.hero.ctaHowItWorks}
                </Button>
              </Link>
              <Link href={`${prefix}/explore`}>
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  {t.hero.ctaExplore}
                </Button>
              </Link>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Mobile: hero text first, then video */}
      <section className="md:hidden w-full py-14 px-4 bg-white">
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="animate-fade-up">
            <div 
              className="inline-block py-2 px-4 border border-brand-navy/20 rounded-full text-[9px] font-bold uppercase tracking-wider text-brand-navy bg-white shadow-lg"
              dangerouslySetInnerHTML={{ __html: t.hero.badge }}
            />
          </div>

          <h1 className="font-serif text-4xl leading-[1.1] text-brand-navy font-medium animate-fade-up [animation-delay:100ms]">
            {t.hero.h1} <br />
            <span className="italic text-brand-gold">{t.hero.h1Highlight}</span>
          </h1>

          <p className="font-sans text-text-body text-lg leading-relaxed max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
            {t.hero.description}
            {t.hero.descriptionHighlight && (<>{" "}<span className="font-semibold text-brand-navy border-b-2 border-brand-gold/40">{t.hero.descriptionHighlight}</span>{" "}{t.hero.descriptionEnd}</>)}
          </p>

          <p className="text-sm text-text-muted font-medium animate-fade-up [animation-delay:250ms]">
            {t.hero.disclaimer}
          </p>

          <div className="w-full pt-2 flex flex-col items-center justify-center gap-3 animate-fade-up [animation-delay:300ms]">
            <Link href={`${prefix}/how-it-works`}>
              <Button variant="navy" size="lg" className="w-full min-w-[200px]">
                {t.hero.ctaHowItWorks}
              </Button>
            </Link>
            <Link href={`${prefix}/explore`}>
              <Button variant="outline" size="lg" className="w-full min-w-[200px]">
                {t.hero.ctaExplore}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile: video after hero text */}
      <section className="md:hidden w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/hero-poster.jpg"
          aria-label="AetherHeal brand video — physician-led medical journey to Seoul"
          className="w-full h-auto block"
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Problem Quote */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="w-px h-16 bg-brand-gold mx-auto mb-8" />
          {[t.problemQuote.q1, t.problemQuote.q2, t.problemQuote.q3].map((q, i) => {
            const Icon = problemQuoteIcons[i]
            const isLast = i === 2
            return (
              <div key={i} className="flex items-start gap-5">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-1",
                  isLast ? "bg-brand-navy shadow-md" : "bg-slate-100"
                )}>
                  <Icon className={cn("w-6 h-6", isLast ? "text-brand-gold" : "text-slate-400")} />
                </div>
                <p className={cn(
                  "font-serif leading-relaxed",
                  isLast ? "text-3xl text-brand-navy font-bold italic" : "text-2xl text-text-body"
                )}>
                  &ldquo;{q}&rdquo;
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Stakes Comparison */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-4">
              {t.stakes.title}
            </h2>
            <p className="text-text-body text-lg max-w-2xl mx-auto leading-relaxed">
              {t.stakes.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[1fr_auto] rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15)] border border-slate-200 relative">
            {/* Desktop Backgrounds */}
            <div className="hidden md:block absolute inset-y-0 left-0 w-1/2 bg-slate-50 z-0"></div>
            <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 bg-brand-navy z-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            </div>

            {/* Left Top */}
            <div className="bg-slate-50 md:bg-transparent p-10 md:p-14 lg:p-16 md:pb-12 lg:pb-16 flex flex-col relative z-10 order-1">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-slate-200/70 text-text-muted text-[10px] font-bold uppercase tracking-widest mb-10">
                  {t.stakes.lowStake.label}
                </span>
                <ul className="space-y-6">
                  {t.stakes.lowStake.items.map((item) => (
                    <li key={item} className="flex items-center gap-4 text-text-body font-medium text-lg">
                      <div className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Left Bottom */}
            <div className="bg-slate-50 md:bg-transparent p-10 md:p-14 lg:p-16 pt-0 md:pt-0 lg:pt-0 relative z-10 order-2 md:order-3">
              <div className="pt-8 border-t border-slate-200 h-full">
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">
                  {t.stakes.lowStake.consequenceLabel}
                </p>
                <p className="font-serif text-3xl sm:text-4xl italic text-slate-400 mb-5">
                  {t.stakes.lowStake.consequence}
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-text-muted font-bold tracking-wide">
                  {t.stakes.lowStake.principle}
                </div>
              </div>
            </div>

            {/* Right Top */}
            <div className="bg-brand-navy md:bg-transparent p-10 md:p-14 lg:p-16 md:pb-12 lg:pb-16 flex flex-col relative z-10 order-3 md:order-2 overflow-hidden md:overflow-visible">
              <div className="md:hidden absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase tracking-widest border border-brand-gold/20">
                    {t.stakes.highStake.label}
                  </span>
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-400 animate-pulse bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    {t.stakes.highStake.critical}
                  </span>
                </div>
                <ul className="space-y-6 mb-8">
                  {t.stakes.highStake.items.map((item) => (
                    <li key={item} className="flex items-center gap-4 text-slate-300 font-medium text-lg opacity-60">
                      <div className="w-2 h-2 rounded-full bg-slate-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-gold/20 blur-xl rounded-2xl" />
                  <div className="relative bg-white/5 border border-brand-gold/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                    <p className="font-serif text-5xl sm:text-6xl font-bold text-white tracking-tight">
                      {t.stakes.highStake.medicine}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Bottom */}
            <div className="bg-brand-navy md:bg-transparent p-10 md:p-14 lg:p-16 pt-0 md:pt-0 lg:pt-0 relative z-10 order-4 md:order-4 overflow-hidden md:overflow-visible">
              <div className="pt-8 border-t border-white/10 relative z-10 h-full">
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-3">
                  {t.stakes.highStake.consequenceLabel}
                </p>
                <p className="font-serif text-3xl sm:text-4xl italic text-white mb-5">
                  {t.stakes.highStake.consequence}
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-300 font-bold tracking-widest">
                  {t.stakes.highStake.principle}
                </div>
                {t.stakes.highStake.structuralNote && (
                  <p className="mt-6 text-sm text-slate-400 leading-relaxed max-w-md italic">
                    {t.stakes.highStake.structuralNote}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistance Layer */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionLabel color="gold" className="mb-4 block">
              {t.aiLayer.badge}
            </SectionLabel>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy leading-tight">
              {t.aiLayer.title}{" "}
              <span className="italic text-brand-gold">{t.aiLayer.titleHighlight}</span>
            </h2>
            <p className="text-text-body text-lg max-w-2xl mx-auto leading-relaxed mt-4">
              {t.aiLayer.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.aiLayer.cards.map((card, idx) => {
              const Icon = aiLayerIcons[idx]

              return (
                <div
                  key={card.title}
                  className="bg-white border border-slate-200 rounded-3xl p-8 shadow-[0_20px_50px_-16px_rgba(15,23,42,0.08)]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center text-brand-navy mb-6 border border-brand-navy/10">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl text-brand-navy mb-3">{card.title}</h3>
                  <p className="text-sm text-text-body leading-relaxed">{card.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-text-muted italic max-w-3xl mx-auto">{t.aiLayer.footnote}</p>
          </div>
        </div>
      </section>

      {/* Patient Concerns — folded into Explore section below */}

      {/* Journey Timeline */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
          <SectionLabel color="gold" className="mb-4 block">
            {t.journey.sectionLabel}
          </SectionLabel>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy leading-tight">
            {t.journey.title}{" "}
            <span className="italic text-brand-gold">{t.journey.titleHighlight}</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="relative mb-16 text-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-slate-200" />
            </div>
            <span className="relative bg-white px-6 font-serif italic text-xl text-brand-gold">
              {t.journey.subtitle}
            </span>
          </div>

          <div className="absolute left-6 md:left-1/2 top-24 bottom-24 w-px bg-brand-gold/50 md:-translate-x-1/2 z-0 shadow-[0_0_10px_#B49250]" />

          <div className="relative z-10 space-y-12 md:space-y-20">
            {t.journey.steps.map((step, idx) => {
              const Icon = journeyIcons[idx]
              const side = journeySides[idx]
              const isCenter = side === "center"
              const isLeft = side === "left"

              return (
                <div key={step.label} className="relative group">
                  <div className={cn(
                    "flex flex-col md:flex-row items-start md:items-center",
                    isCenter ? "md:justify-center" : "md:justify-between"
                  )}>
                    <div className="md:hidden absolute left-0 top-0 w-12 flex justify-center z-20">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center border shadow-lg",
                        isCenter ? "bg-brand-navy border-brand-gold text-brand-gold" : "bg-white border-brand-gold text-brand-gold"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className={cn(
                      "hidden md:flex absolute -translate-x-1/2 w-12 h-12 rounded-full items-center justify-center z-20",
                      isCenter
                        ? "left-1/2 -top-6 translate-y-0 bg-brand-navy border border-brand-gold text-brand-gold shadow-[0_0_15px_rgba(180,146,80,0.3)]"
                        : "left-1/2 top-0 translate-y-0 bg-white border border-brand-gold text-brand-gold shadow-lg"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {!isCenter && isLeft && (
                      <>
                        <div className="w-full pl-16 text-left md:pl-0 md:w-[45%] md:text-right md:pr-12">
                          <div className="rounded-2xl border border-slate-100 bg-white/95 px-5 py-5 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.16)]">
                          {step.badge && (
                            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-2">{step.badge}</span>
                          )}
                          <h3 className="font-serif text-2xl text-brand-navy mb-2">{step.label}</h3>
                          <p className="text-sm text-text-body leading-relaxed">{step.description}</p>
                          {step.details && <p className="text-xs text-text-muted mt-2 font-medium">{step.details}</p>}
                          </div>
                        </div>
                        <div className="hidden md:block md:w-[45%]" />
                      </>
                    )}

                    {!isCenter && !isLeft && (
                      <>
                        <div className="hidden md:block md:w-[45%]" />
                        <div className="w-full pl-16 text-left md:pl-12 md:w-[45%]">
                          <div className="rounded-2xl border border-slate-100 bg-white/95 px-5 py-5 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.16)]">
                          {step.badge && (
                            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-2">{step.badge}</span>
                          )}
                          <h3 className="font-serif text-2xl text-brand-navy mb-2">{step.label}</h3>
                          <p className="text-sm text-text-body leading-relaxed">{step.description}</p>
                          {step.label === t.journey.steps[5]?.label && (
                            <div className="grid gap-2 mt-4">
                              <div className="flex items-center gap-2 text-sm text-text-body">
                                <Plane className="w-4 h-4 text-brand-gold" />
                                {t.journey.journeyOrchestrationDetails.arrival}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-text-body">
                                <UserCheck className="w-4 h-4 text-brand-gold" />
                                {t.journey.journeyOrchestrationDetails.concierge}
                              </div>
                            </div>
                          )}
                          </div>
                        </div>
                      </>
                    )}

                    {isCenter && (
                      <div className="relative z-10 w-[calc(100%-4rem)] ml-16 md:ml-0 md:w-[600px] bg-white border-2 border-brand-navy p-5 sm:p-8 md:pl-8 rounded-[28px] text-left md:text-center shadow-[0_30px_80px_-35px_rgba(15,23,42,0.3)] mt-0 md:mt-6">
                        <h3 className="font-serif text-2xl text-brand-navy mt-0 md:mt-4 mb-2">{step.label}</h3>
                        <p className="text-sm text-text-body italic mb-8">&ldquo;{step.description}&rdquo;</p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch">
                          <div className="flex-1 border border-slate-200 bg-bg-light p-4 rounded">
                            <div className="flex items-center justify-center gap-2 text-text-muted mb-2">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-xs uppercase tracking-widest font-bold">{t.journey.decisionReadiness.notReady}</span>
                            </div>
                            <p className="text-brand-navy font-serif text-lg">{t.journey.decisionReadiness.pause}</p>
                          </div>
                          <div className="flex-1 border border-brand-gold/30 bg-brand-gold/5 p-4 rounded">
                            <div className="flex items-center justify-center gap-2 text-brand-gold mb-2">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="text-xs uppercase tracking-widest font-bold">{t.journey.decisionReadiness.ready}</span>
                            </div>
                            <p className="text-brand-navy font-serif text-lg">{t.journey.decisionReadiness.proceed}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="absolute bottom-0 left-[28px] md:left-1/2 w-3 h-3 bg-brand-gold rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_15px_rgba(180,146,80,0.8)] z-20" />

          <div className="relative mt-20 text-center z-10 pl-14 md:pl-0">
            <div className="max-w-2xl mx-auto rounded-[28px] border border-slate-100 bg-slate-50/60 px-6 py-8 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.18)] relative overflow-hidden">
            <p className="relative z-10 font-serif text-xl sm:text-2xl text-brand-gold italic max-w-2xl mx-auto">
              &ldquo;{t.journey.closingQuote}&rdquo;
            </p>
            <div className="relative z-10 mt-8 flex justify-center opacity-50">
              <div className="w-16 h-px bg-brand-gold" />
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Partner Network — Compact Proof Strip */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[32px] border border-slate-200 bg-white px-8 py-10 sm:px-12 sm:py-14 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.16)] text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">{t.partners.subtitle}</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-4">{t.partners.compactTitle}</h2>
            <p className="text-text-body text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
              {t.partners.compactDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-14 mb-10">
              {t.partners.compactStats.map((stat: { number: string; label: string }) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-4xl sm:text-5xl text-brand-navy font-bold">{stat.number}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link
              href={`${prefix}/trust-protocol`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors"
            >
              {t.partners.compactCta}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto rounded-[32px] border border-slate-200 bg-slate-50/40 px-5 py-10 sm:px-8 sm:py-12 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.18)]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-brand-navy mb-4">{t.faq.title}</h2>
            <p className="text-text-body max-w-2xl mx-auto">{t.faq.subtitle}</p>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* Explore — SEO Internal Links */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">
              {t.explore.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy">{t.explore.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.explore.items.map((item, idx) => {
              const Icon = exploreIcons[idx % exploreIcons.length]
              return (
              <Link
                key={exploreHrefs[idx]}
                href={`${prefix}${exploreHrefs[idx]}`}
                className="group flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-gold/40 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-brand-navy font-bold mb-2 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Single closing CTA — after FAQ */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-bg-light">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy">{t.cta.title}</h2>
          <p className="text-text-body max-w-xl mx-auto leading-relaxed">{t.cta.subtitle}</p>
          <Link href={`${prefix}/how-it-works`}>
            <Button variant="navy" size="lg" className="min-w-[200px]">{t.cta.ctaHowItWorks}</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
