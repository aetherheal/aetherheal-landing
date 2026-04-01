import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2, TrendingUp, BookOpen, ShieldCheck, Bot, Users } from "lucide-react"
import type { Dictionary } from "@/i18n/get-dictionary"

interface KoLandingProps {
  dict: Dictionary
  locale: string
}

export function KoLanding({ dict, locale }: KoLandingProps) {
  const prefix = `/${locale}`
  const t = dict.koLanding
  const arch = t.architecture

  return (
    <div className="min-h-full">
      <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/og-image.jpg"
            alt="AetherHeal 의료 여정 배경"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-brand-navy/75" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(191,155,48,0.08),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold/10 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-[10px] sm:text-xs font-bold text-brand-gold uppercase tracking-widest">{t.hero.badge}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight break-keep">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed break-keep">
            {t.hero.description}
            <br className="hidden sm:block" />
            {t.hero.description2}
          </p>
        </div>
      </section>

      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">{t.audience.title}</h2>
            <p className="text-slate-600 text-lg break-keep">{t.audience.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Link href={`${prefix}/for-partners`} className="group">
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_60px_-12px_rgba(15,23,42,0.12)] hover:border-brand-gold/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7 text-brand-gold" />
                </div>
                <h3 className="font-serif text-2xl text-brand-navy font-semibold mb-3 break-keep">{t.audience.partner.title}</h3>
                <p className="text-slate-700 leading-relaxed mb-6 break-keep">
                  {t.audience.partner.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-navy group-hover:text-brand-gold transition-colors break-keep">
                  {t.audience.partner.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            <Link href={`${prefix}/for-investors`} className="group">
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_60px_-12px_rgba(15,23,42,0.12)] hover:border-brand-navy/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-brand-navy/5 flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-brand-navy" />
                </div>
                <h3 className="font-serif text-2xl text-brand-navy font-semibold mb-3 break-keep">{t.audience.investor.title}</h3>
                <p className="text-slate-700 leading-relaxed mb-6 break-keep">
                  {t.audience.investor.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-navy group-hover:text-brand-gold transition-colors break-keep">
                  {t.audience.investor.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-bg-light border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">{arch.title}</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto break-keep">{arch.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {arch.items.map((item: { title: string; description: string }, i: number) => {
              const icons = [ShieldCheck, Users, Bot]
              const Icon = icons[i % icons.length]
              return (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-7">
                  <div className="w-11 h-11 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="font-serif text-lg text-brand-navy font-semibold mb-3 break-keep">{item.title}</h3>
                  <p className="text-[15px] text-slate-700 leading-relaxed break-keep">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-navy/5 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7 text-brand-navy" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy break-keep">{t.philosophy.title}</h2>
          <p className="text-slate-700 text-lg leading-relaxed break-keep">
            {t.philosophy.description}
          </p>
          <Link
            href={`${prefix}/our-philosophy`}
            className="inline-flex items-center gap-2 px-6 py-3 text-[15px] font-semibold text-white bg-brand-navy rounded-full hover:bg-brand-navy/90 transition-all hover:shadow-md break-keep"
          >
            {t.philosophy.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-brand-navy">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-slate-300 text-[15px] break-keep">{t.englishSite.label}</p>
          <Link
            href="/en"
            className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors font-semibold break-keep"
          >
            {t.englishSite.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
