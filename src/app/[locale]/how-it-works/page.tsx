import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightLeft,
  Scissors,
  Sparkles,
  PenTool,
  Bot,
  Eye,
  Smile,
  Microscope,
  Activity,
  Check,
  X,
  Info,
  LayoutGrid,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

const domainIcons = [Scissors, Sparkles, PenTool, Bot, Eye, Smile, Microscope, Activity]
const angelDoesIcons = [Info, LayoutGrid, ArrowRightLeft]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.howItWorks.meta
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `https://aetherheal.com/${locale}/how-it-works`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://aetherheal.com/${l}/how-it-works`])),
    },
  }
}

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.howItWorks
  const prefix = `/${locale}`

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center pt-20 px-4 sm:px-6 bg-brand-navy overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-brand-gold/60 uppercase mb-8 animate-fade-up">{t.hero.badge}</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.05] tracking-tight animate-fade-up [animation-delay:100ms]">
            {t.hero.h1} <span className="italic text-brand-gold">{t.hero.h1Highlight}</span>
          </h1>
          <div className="mb-8 animate-fade-up [animation-delay:150ms]">
            <div className="inline-flex items-center justify-center px-6 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <span className="text-xs md:text-sm font-medium text-white/80 tracking-wide">{t.hero.tagline}</span>
            </div>
          </div>
          <p className="text-lg md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-6 font-light animate-fade-up [animation-delay:200ms]">
            {t.hero.description} <strong className="text-white font-semibold">{t.hero.descriptionHighlight}</strong> {t.hero.descriptionEnd}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[10px] font-medium text-white/30 uppercase tracking-wider mb-12 animate-fade-up [animation-delay:250ms]">
            {t.hero.disclaimer}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xl mx-auto mb-6 animate-fade-up [animation-delay:300ms]">
            <a href="https://app.aetherheal.com/transition" className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm font-semibold text-brand-navy bg-white rounded-full hover:bg-brand-gold hover:text-white transition-all duration-300 shadow-lg">
              {t.hero.ctaPrimary} <ArrowRight className="w-4 h-4" />
            </a>
            <Link href={`${prefix}/explore`} className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-white/80 border border-white/20 rounded-full hover:bg-white/5 hover:text-white transition-all duration-300">
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* 01. Angel Role */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">{t.angelRole.badge}</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-3">{t.angelRole.title}</h2>
            <p className="text-text-muted text-lg">{t.angelRole.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] border border-slate-200">
            <div className="bg-bg-light p-8 md:p-12 lg:p-14 border-b md:border-b-0 md:border-r border-slate-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-2xl bg-brand-navy flex items-center justify-center text-brand-gold shadow-md"><Check className="w-5 h-5" /></div>
                <h3 className="font-serif text-2xl text-brand-navy font-bold">{t.angelRole.doesTitle}</h3>
              </div>
              <div className="mb-8 p-5 bg-white border-l-4 border-brand-gold rounded-r-xl shadow-sm">
                <span className="text-brand-gold font-bold uppercase text-[10px] block mb-2 tracking-widest">{t.angelRole.keyDefinitionLabel}</span>
                <p className="text-base text-brand-navy font-medium leading-relaxed">{t.angelRole.keyDefinition}</p>
              </div>
              <ul className="space-y-6">
                {t.angelRole.does.map((item, i) => {
                  const Icon = angelDoesIcons[i]
                  return (
                    <li key={item.title} className="flex gap-4 items-start">
                      <div className="w-9 h-9 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-brand-gold" /></div>
                      <div>
                        <strong className="block text-brand-navy text-sm font-bold mb-1">{item.title}</strong>
                        <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="bg-white p-8 md:p-12 lg:p-14">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-text-muted"><X className="w-5 h-5" /></div>
                <h3 className="font-serif text-2xl text-text-muted">{t.angelRole.notTitle}</h3>
              </div>
              <ul className="space-y-4">
                {t.angelRole.not.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-text-muted text-base font-medium py-2 border-b border-slate-100 last:border-0">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Coverage */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-bg-light border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">{t.coverage.badge}</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-3">{t.coverage.title}</h2>
            <p className="text-text-muted text-lg max-w-xl mx-auto">{t.coverage.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.coverage.domains.map((label, i) => {
              const Icon = domainIcons[i]
              return (
                <div key={label} className="relative bg-white border border-slate-200 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-brand-navy/5 flex items-center justify-center"><Icon className="w-5 h-5 text-brand-navy" /></div>
                  <span className="text-brand-navy font-bold text-sm leading-tight block">{label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 03. Scope */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">{t.scope.badge}</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-3">{t.scope.title}</h2>
            <p className="text-text-muted text-lg">{t.scope.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] border border-slate-200">
            <div className="p-8 md:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-slate-200">
              <h3 className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy uppercase tracking-widest mb-10">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />{t.scope.doTitle}
              </h3>
              <ul className="space-y-5">
                {t.scope.doItems.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-text-body items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 md:p-12 lg:p-14 bg-slate-50/50">
              <h3 className="inline-flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-widest mb-10">
                <span className="w-2 h-2 rounded-full bg-slate-300" />{t.scope.dontTitle}
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {t.scope.dontBadges.map((item) => (
                  <span key={item} className="px-4 py-2 bg-white border border-red-200/60 rounded-full text-xs font-bold text-danger">{item}</span>
                ))}
              </div>
              <div className="space-y-3 pt-6 border-t border-slate-200">
                <p className="text-sm text-text-muted flex gap-3">
                  <span className="w-1 h-1 bg-text-muted rounded-full mt-2 shrink-0" />
                  <span>{t.scope.emergencyNote}</span>
                </p>
                <p className="text-sm text-text-muted flex gap-3">
                  <span className="w-1 h-1 bg-text-muted rounded-full mt-2 shrink-0" />
                  <span>{t.scope.replacementNote}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. System Flow */}
      <section className="py-32 px-4 sm:px-6 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-28 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">{t.systemFlow.badge}</span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-navy mb-4">
              {t.systemFlow.titleParts[0]} <span className="text-brand-gold italic">&rarr;</span> {t.systemFlow.titleParts[1]} <span className="text-brand-gold italic">&rarr;</span> {t.systemFlow.titleParts[2]}
            </h2>
            <p className="text-text-muted text-lg max-w-xl mx-auto">{t.systemFlow.subtitle}</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-px bg-gradient-to-b from-brand-navy/10 via-brand-gold to-brand-gold/10 md:-translate-x-1/2 z-0" />
            <div className="space-y-16 md:space-y-24 relative z-10">
              {t.systemFlow.steps.map((item, idx) => {
                const isKey = item.step === 3 || item.step === 4 || item.step === 6
                const isFinal = item.step === 7
                const isEven = idx % 2 !== 0
                return (
                  <div key={item.step} className="relative flex flex-col md:flex-row items-start md:items-center group">
                    <div className={cn(
                      "absolute left-[28px] md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl border-2 shadow-sm flex items-center justify-center font-bold text-lg transition-transform duration-500 group-hover:scale-110 z-20",
                      isFinal ? "bg-brand-gold border-brand-gold text-white" : isKey ? "bg-brand-navy border-brand-navy text-white" : "bg-white border-slate-200 text-text-muted"
                    )}>{item.step}</div>
                    <div className={cn("hidden md:block w-1/2 pr-16 text-right", !isEven ? "opacity-0 pointer-events-none" : "")}>
                      <span className={cn("text-[10px] font-bold uppercase tracking-widest mb-2 block", isFinal ? "text-brand-gold" : isKey ? "text-brand-navy" : "text-text-muted")}>{item.actor}</span>
                      <h4 className="font-serif text-2xl text-brand-navy mb-2">{item.title}</h4>
                      <p className="text-sm text-text-muted">{item.description}</p>
                    </div>
                    <div className={cn("w-full md:w-1/2 pl-24 md:pl-16 text-left", isEven ? "md:hidden" : "")}>
                      <span className={cn("text-[10px] font-bold uppercase tracking-widest mb-2 block", isFinal ? "text-brand-gold" : isKey ? "text-brand-navy" : "text-text-muted")}>{item.actor}</span>
                      <h4 className="font-serif text-2xl text-brand-navy mb-2">{item.title}</h4>
                      <p className="text-sm text-text-muted">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="absolute bottom-0 left-[28px] md:left-1/2 w-3 h-3 bg-brand-gold rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_15px_rgba(180,146,80,0.8)] z-20" />
          </div>
          <div className="text-center mt-32 pt-10 border-t border-slate-100">
            <p className="font-serif text-2xl text-brand-navy">
              &quot;{t.systemFlow.closingQuote.split(". ")[0]}. <span className="italic text-brand-gold">{t.systemFlow.closingQuote.split(". ")[1]}</span>&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Safety Notes */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center"><ShieldAlert className="w-5 h-5 text-brand-navy" /></div>
            <h3 className="font-serif text-2xl text-brand-navy">{t.safety.title}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.safety.items.map((item) => (
              <div key={item.title} className="p-5 bg-bg-light rounded-2xl border border-slate-100">
                <h4 className="font-bold text-brand-navy text-xs uppercase tracking-widest mb-3">{item.title}</h4>
                <p className="text-sm text-text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-bg-light text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl text-brand-navy leading-tight">
            {t.cta.title} <span className="italic text-brand-gold">{t.cta.titleHighlight}</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xl mx-auto">
            <a href="https://app.aetherheal.com/transition" className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm font-semibold text-white bg-brand-navy rounded-full hover:bg-brand-navy/90 hover:shadow-lg transition-all duration-300">
              {t.cta.ctaPrimary} <ArrowRight className="w-4 h-4" />
            </a>
            <Link href={`${prefix}/explore`} className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-brand-navy border border-brand-navy/20 rounded-full hover:bg-white hover:border-brand-navy/40 transition-all duration-300">
              {t.cta.ctaSecondary}
            </Link>
          </div>
          <p className="text-[10px] text-text-muted font-medium opacity-60 tracking-wide">{t.cta.disclaimer}</p>
        </div>
      </section>
    </div>
  )
}
