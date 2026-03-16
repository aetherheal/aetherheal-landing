import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Building2, CheckCircle2, Users, ShieldCheck, FileText, Search, Activity, Handshake, XCircle, Monitor, UserCheck, Globe, Bot, Car, Workflow } from "lucide-react"
import { type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

export function generateStaticParams() {
  return [{ locale: "ko" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.forPartners?.meta
  if (!t) return {}
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `https://aetherheal.com/${locale}/for-partners` },
    openGraph: { title: t.title, description: t.description, url: `https://aetherheal.com/${locale}/for-partners`, images: [{ url: "/og-image.jpg", width: 1200, height: 630 }] },
  }
}

const benefitIcons = [Users, Building2, ShieldCheck, Handshake]
const stepIcons = [FileText, Search, Activity, ShieldCheck]

export default async function ForPartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.forPartners
  if (!t) return null
  const prefix = `/${locale}`

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(191,155,48,0.08),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold/10 rounded-full text-[10px] font-bold text-brand-gold uppercase tracking-widest break-keep">
            <Building2 className="w-3.5 h-3.5" />
            {t.hero.badge}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight break-keep">
            {t.hero.h1} <span className="text-brand-gold">{t.hero.h1Highlight}</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed break-keep">{t.hero.intro}</p>
        </div>
      </section>

      {/* What is 에테르힐 */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 break-keep">{t.whatIsAetherheal.title}</h2>
          <div className="space-y-6 text-lg text-slate-700 leading-[1.8] break-keep">
            <p>{t.whatIsAetherheal.p1}</p>
            <p>{t.whatIsAetherheal.p2}</p>
          </div>

          <div className="mt-12 space-y-0">
            {t.whatIsAetherheal.layers.map((layer: { label: string; detail: string }, i: number) => (
              <div key={layer.label} className="flex items-stretch">
                <div className="flex flex-col items-center mr-6">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 z-10">
                    <span className="text-sm font-bold text-brand-gold">{i + 1}</span>
                  </div>
                  {i < t.whatIsAetherheal.layers.length - 1 && <div className="w-px flex-1 bg-brand-gold/20" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-serif text-lg text-brand-navy font-semibold break-keep">{layer.label}</h3>
                  <p className="text-[15px] text-slate-600 mt-1 break-keep">{layer.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Problem — Lemon Market */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 break-keep">{t.marketProblem.title}</h2>
          <div className="space-y-5">
            <p className="text-[15px] sm:text-base text-slate-700 leading-relaxed break-keep">{t.marketProblem.p1}</p>
            <p className="text-[15px] sm:text-base text-slate-700 leading-relaxed break-keep">{t.marketProblem.p2}</p>
            <p className="text-[15px] sm:text-base text-brand-navy font-medium leading-relaxed break-keep">{t.marketProblem.p3}</p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-bg-light border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 text-center break-keep">{t.comparison.title}</h2>
          <p className="text-[15px] text-slate-700 text-center mb-12 break-keep">{t.comparison.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-200">
            <div className="bg-red-50/80 p-7 sm:p-8 border-b md:border-b-0 md:border-r border-slate-200">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-red-600 mb-6 break-keep">{t.comparison.oldLabel}</h3>
              <ul className="space-y-4">
                {t.comparison.oldItems.map((item: string) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-[15px] text-slate-700 leading-relaxed break-keep">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-emerald-50/80 p-7 sm:p-8">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 mb-6 break-keep">{t.comparison.newLabel}</h3>
              <ul className="space-y-4">
                {t.comparison.newItems.map((item: string) => (
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

      {/* Benefits */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-bg-light border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-12 text-center break-keep">{t.benefits.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.benefits.items.map((item: { title: string; description: string }, i: number) => {
              const Icon = benefitIcons[i % benefitIcons.length]
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

      {/* Provided */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 text-center break-keep">{t.provided.title}</h2>
          <p className="text-[15px] text-slate-700 text-center mb-12 break-keep">{t.provided.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.provided.items.map((item: { title: string; description: string }, i: number) => {
              const icons = [Monitor, UserCheck, Globe, Car]
              const Icon = icons[i % icons.length]
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

      {/* Agent Tech Benefits */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-bg-light border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 text-center break-keep">{t.agentTech.title}</h2>
          <p className="text-[15px] text-slate-700 text-center mb-12 break-keep">{t.agentTech.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.agentTech.items.map((item: { title: string; description: string }, i: number) => {
              const icons = [Bot, Globe, Activity, Workflow]
              const Icon = icons[i % icons.length]
              return (
                <div key={item.title} className="rounded-2xl border border-brand-gold/20 bg-white p-7 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.1)]">
                  <div className="w-11 h-11 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-5">
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

      {/* Trust Process */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">{t.trustProcess.title}</h2>
          <p className="text-lg text-slate-700 mb-12 leading-relaxed break-keep">{t.trustProcess.intro}</p>

          <div className="space-y-6">
            {t.trustProcess.steps.map((step: { title: string; description: string }, i: number) => {
              const Icon = stepIcons[i % stepIcons.length]
              return (
                <div key={step.title} className="flex gap-5 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-gold" />
                    </div>
                    {i < t.trustProcess.steps.length - 1 && <div className="w-px h-6 bg-slate-200 mt-2" />}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">STEP {i + 1}</span>
                      <h3 className="font-serif text-lg text-brand-navy font-semibold break-keep">{step.title}</h3>
                    </div>
                    <p className="text-[15px] text-slate-700 leading-relaxed break-keep">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Expectations */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-bg-light border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">{t.expectations.title}</h2>
          <p className="text-lg text-slate-700 mb-10 leading-relaxed break-keep">{t.expectations.intro}</p>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <ul className="space-y-4">
              {t.expectations.items.map((item: string) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-[15px] text-slate-700 leading-relaxed break-keep">{item}</span>
                </li>
              ))}
            </ul>
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
              href={`mailto:${t.cta.email}?subject=에테르힐 파트너 문의`}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-brand-navy bg-brand-gold rounded-full hover:bg-brand-gold/90 transition-all hover:shadow-lg break-keep"
            >
              {t.cta.buttonText}
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href={`${prefix}/our-philosophy`}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all break-keep"
            >
              에테르힐 철학 읽기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
