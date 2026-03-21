import type { Metadata } from "next"
import Link from "next/link"
import { Building2, CheckCircle2, Users, ShieldCheck, FileText, Search, Activity, Handshake, Monitor, UserCheck, Globe, Bot, Car, Workflow } from "lucide-react"
import { type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { HeroSection, PageSection, ComparisonTable, IconCardGrid, CTASection, ArchitectureDiagram, PatientFunnelDiagram } from "@/components/landing"

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

export default async function ForPartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.forPartners
  if (!t) return null
  const prefix = `/${locale}`

  return (
    <div className="min-h-full">
      <HeroSection
        icon={Building2}
        badge={t.hero.badge}
        h1={t.hero.h1}
        h1Highlight={t.hero.h1Highlight}
        intro={t.hero.intro}
      />

      {/* What is 에테르힐 */}
      <PageSection>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 break-keep">{t.whatIsAetherheal.title}</h2>
          <div className="space-y-6 text-lg text-slate-700 leading-[1.8] break-keep">
            <p>{t.whatIsAetherheal.p1}</p>
            <p>{t.whatIsAetherheal.p2}</p>
          </div>

          <div className="mt-12 rounded-2xl bg-brand-navy p-6 sm:p-8">
            <ArchitectureDiagram highlightStakeholder="partner" />
          </div>
        </div>
      </PageSection>

      {/* Market Problem — Lemon Market */}
      <PageSection>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 break-keep">{t.marketProblem.title}</h2>
          <div className="space-y-5">
            <p className="text-[15px] sm:text-base text-slate-700 leading-relaxed break-keep">{t.marketProblem.p1}</p>
            <p className="text-[15px] sm:text-base text-slate-700 leading-relaxed break-keep">{t.marketProblem.p2}</p>
            <p className="text-[15px] sm:text-base text-brand-navy font-medium leading-relaxed break-keep">{t.marketProblem.p3}</p>
          </div>
        </div>
      </PageSection>

      {/* Comparison */}
      <PageSection bg="light">
        <ComparisonTable
          title={t.comparison.title}
          subtitle={t.comparison.subtitle}
          oldLabel={t.comparison.oldLabel}
          oldItems={t.comparison.oldItems}
          newLabel={t.comparison.newLabel}
          newItems={t.comparison.newItems}
        />
      </PageSection>

      {/* Benefits */}
      <PageSection bg="light">
        <IconCardGrid
          title={t.benefits.title}
          items={t.benefits.items}
          icons={[Users, Building2, ShieldCheck, Handshake]}
          variant="gold"
        />
      </PageSection>

      {/* Provided */}
      <PageSection>
        <IconCardGrid
          title={t.provided.title}
          subtitle={t.provided.subtitle}
          items={t.provided.items}
          icons={[Monitor, UserCheck, Globe, Car]}
          variant="navy"
        />
      </PageSection>

      {/* Agent Tech Benefits */}
      <PageSection bg="light">
        <IconCardGrid
          title={t.agentTech.title}
          subtitle={t.agentTech.subtitle}
          items={t.agentTech.items}
          icons={[Bot, Globe, Activity, Workflow]}
          variant="gold"
        />
      </PageSection>

      {/* Trust Process */}
      <PageSection>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">{t.trustProcess.title}</h2>
          <p className="text-lg text-slate-700 mb-12 leading-relaxed break-keep">{t.trustProcess.intro}</p>

          {/* Visual funnel diagram */}
          <div className="rounded-2xl bg-brand-navy p-6 sm:p-8 mb-12">
            <PatientFunnelDiagram />
          </div>

          {/* Step-by-step detail */}
          <div className="space-y-6">
            {t.trustProcess.steps.map((step: { title: string; description: string }, i: number) => {
              const stepIcons = [FileText, Search, Activity, ShieldCheck]
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
      </PageSection>

      {/* Expectations */}
      <PageSection bg="light">
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
      </PageSection>

      {/* Partnership Process */}
      <PageSection>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">{t.partnershipProcess.title}</h2>
          <p className="text-lg text-slate-700 mb-10 leading-relaxed break-keep">{t.partnershipProcess.subtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.partnershipProcess.steps.map((step: { step: string; title: string; description: string }) => (
              <div key={step.step} className="rounded-2xl border border-slate-200 bg-white p-6 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-brand-gold">{step.step}</span>
                </div>
                <div>
                  <h3 className="font-serif text-[15px] text-brand-navy font-semibold mb-1 break-keep">{step.title}</h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed break-keep">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6 text-center">
            <p className="text-[15px] text-slate-700 leading-relaxed break-keep">{t.feeStructure.text}</p>
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <CTASection
        title={t.cta.title}
        description={t.cta.description}
        primaryHref={`mailto:${t.cta.email}?subject=${dict.common.contactSubjects.partner}`}
        primaryLabel={t.cta.buttonText}
        secondaryHref={`${prefix}/our-philosophy`}
        secondaryLabel={dict.common.readPhilosophy}
      />
    </div>
  )
}
