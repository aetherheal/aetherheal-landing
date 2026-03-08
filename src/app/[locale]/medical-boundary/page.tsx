import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, Phone, ShieldAlert, Scale } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Divider } from "@/components/ui/divider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.medicalBoundary.meta
  return {
    title: t.title, description: t.description,
    alternates: { canonical: `https://aetherheal.com/${locale}/medical-boundary`, languages: Object.fromEntries(locales.map((l) => [l, `https://aetherheal.com/${l}/medical-boundary`])) },
  }
}

export default async function MedicalBoundaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.medicalBoundary
  const prefix = `/${locale}`

  return (
    <div className="min-h-full">
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <SectionLabel color="muted" className="block mb-2">{t.hero.badge}</SectionLabel>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-navy font-medium">{t.hero.h1}</h1>
          <p className="text-text-body text-lg max-w-2xl mx-auto leading-relaxed">{t.hero.subtitle}</p>
          <Divider className="mx-auto" />
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto space-y-6">
          {t.boundaries.map((b) => (
            <Card key={b.title} accent="danger" className="p-5 sm:p-8">
              <div className="flex items-start gap-4"><ShieldAlert className="w-6 h-6 text-danger shrink-0 mt-0.5" /><div><h3 className="text-base font-semibold text-text-deep mb-2">{b.title}</h3><p className="text-sm text-text-body leading-relaxed">{b.description}</p></div></div>
            </Card>
          ))}
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8"><SectionLabel color="gold" className="block mb-2">{t.aiSupport.badge}</SectionLabel><h2 className="font-serif text-3xl text-brand-navy mb-4">{t.aiSupport.title}</h2><p className="text-text-body leading-relaxed">{t.aiSupport.intro}</p></div>
          <Card className="p-5 sm:p-8">
            <ul className="space-y-4">
              {t.aiSupport.items.map((item) => (
                <li key={item} className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" /><span className="text-sm text-text-body leading-relaxed">{item}</span></li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="w-full py-12 sm:py-14 lg:py-16 px-4 sm:px-6 bg-red-50 border-y border-red-200">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4 p-5 sm:p-8 bg-white rounded-xl border-2 border-danger">
            <AlertTriangle className="w-8 h-8 text-danger shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-danger mb-2">{t.emergency.title}</h3>
              <p className="text-sm text-text-body leading-relaxed mb-4">{t.emergency.text}</p>
              <div className="flex items-center gap-3 text-sm font-semibold text-danger"><Phone className="w-4 h-4" /><span>{t.emergency.phone}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12"><SectionLabel color="gold" className="block mb-2">{t.responsibilities.badge}</SectionLabel><h2 className="font-serif text-3xl text-brand-navy">{t.responsibilities.title}</h2></div>
          <Card className="p-5 sm:p-8">
            <ul className="space-y-4">
              {t.responsibilities.items.map((r) => (<li key={r} className="flex items-start gap-3"><Scale className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" /><span className="text-sm text-text-body leading-relaxed">{r}</span></li>))}
            </ul>
          </Card>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href={`${prefix}/how-it-works`}><Button variant="outline" size="md" className="w-full sm:w-auto min-w-[180px]">{t.responsibilities.ctaProcess}</Button></Link>
            <Link href={`${prefix}/trust-protocol`}><Button variant="navy" size="md" className="w-full sm:w-auto min-w-[180px]">{t.responsibilities.ctaOversight}</Button></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
