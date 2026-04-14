import Link from "next/link"
import {
  ArrowRight,
  Stethoscope,
  GitFork,
  Building2,
  UserCheck,
  AlertTriangle,
  CreditCard,
  ShieldCheck,
  RefreshCw,
  Scissors,
  Sparkles,
  Eye,
  Heart,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"
import { Accordion } from "@/components/ui/accordion"
import { WaitlistForm } from "@/components/landing/waitlist-form"
import { ScrollSlideSection } from "@/components/landing/scroll-slide-section"
import { JourneyAccordion } from "@/components/landing/journey-accordion"
import { cn } from "@/lib/utils"
import { type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { KoLanding } from "./ko-landing"

const problemQuoteIcons = [GitFork, AlertTriangle, Stethoscope]
// concernIcons removed — Patient Concerns section folded into Explore
const exploreIcons = [Scissors, Sparkles, Building2, Eye, Heart, Stethoscope]
const trustPillarIcons = [ShieldCheck, CreditCard, RefreshCw, UserCheck, Video]

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
  const problemQuoteSection = t.problemQuote as typeof t.problemQuote & {
    title?: string
    subtitle?: string
    items?: { title: string; quote: string }[]
  }
  const problemItems = problemQuoteSection.items ?? [
    { title: "Risk", quote: t.problemQuote.q1 },
    { title: "Incentives", quote: t.problemQuote.q2 },
    { title: "Trust", quote: t.problemQuote.q3 },
  ]
  const journeySection = t.journey as typeof t.journey & {
    steps: Array<{
      label: string
      badge: string | null
      description: string
      details: string | null
      owner?: string
      next?: string
    }>
  }
  const thenLabel = "Then:"
  const heroBranches = (t.hero as typeof t.hero & { branches?: string[]; branchConclusion?: string })

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item: { question: string; answer: string }) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <div className="min-h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <link rel="preload" as="video" href="/assets/hero-bg.mp4" type="video/mp4" />

      {/* Desktop: Video + overlaid hero content */}
      <section className="hidden md:block relative w-full">
        <div className="w-full h-screen overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/hero-poster.jpg"
            aria-label="AetherHeal brand video — physician-led medical journey to Seoul"
            className="w-full h-full object-cover block"
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
              {t.hero.descriptionHighlight && (<>{" "}<span className="font-semibold text-brand-navy border-b-2 border-brand-gold/40">{t.hero.descriptionHighlight}</span></>)}
              {t.hero.descriptionEnd && (<><br />{t.hero.descriptionEnd}</>)}
            </p>

            {heroBranches.branches && heroBranches.branches.length > 0 && (
              <div className="w-full max-w-lg mx-auto animate-fade-up [animation-delay:220ms]">
                <div className="w-px h-6 bg-brand-gold/40 mx-auto" />
                <div className="grid grid-cols-3">
                  {heroBranches.branches.map((b, i) => (
                    <div key={b} className="flex flex-col items-center">
                      <div className="w-full flex items-stretch h-px">
                        <div className={cn("flex-1 border-b border-brand-gold/40", i === 0 && "border-b-0")} />
                        <div className="w-px bg-brand-gold/40" />
                        <div className={cn("flex-1 border-b border-brand-gold/40", i === heroBranches.branches.length - 1 && "border-b-0")} />
                      </div>
                      <div className="w-px h-3 bg-brand-gold/40" />
                      <div className="rounded-lg border border-brand-gold/20 bg-brand-gold/5 px-3 py-2">
                        <p className="text-xs font-semibold text-brand-navy text-center">{b}</p>
                      </div>
                      <div className="w-px h-3 bg-brand-gold/40" />
                      <div className="w-full flex items-stretch h-px">
                        <div className={cn("flex-1 border-b border-brand-gold/40", i === 0 && "border-b-0")} />
                        <div className="w-px bg-brand-gold/40" />
                        <div className={cn("flex-1 border-b border-brand-gold/40", i === heroBranches.branches.length - 1 && "border-b-0")} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-px h-6 bg-brand-gold/40 mx-auto" />
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-brand-gold rotate-90 -mt-1" />
                </div>
                <p className="text-center font-serif text-xl md:text-2xl text-brand-gold italic mt-2">
                  {heroBranches.branchConclusion}
                </p>
              </div>
            )}

          </div>
          </div>
        </div>
      </section>

      {/* Desktop: CTA + waitlist (flows under hero on shared white bg) */}
      <section className="hidden md:block w-full bg-white pt-10 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-full flex flex-col items-center gap-4 animate-fade-up [animation-delay:300ms]">
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={`${prefix}/intake`}>
                <Button size="lg" className="min-w-[260px]">
                  {(t.hero as typeof t.hero & { ctaAssessment?: string }).ctaAssessment ?? "Begin Your Case Assessment"}
                </Button>
              </Link>
              <Link href={`${prefix}/how-it-works`}>
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  {t.hero.ctaExplore}
                </Button>
              </Link>
            </div>
            <p className="text-sm text-text-muted font-medium">
              {t.hero.openingDate}{(t.hero as typeof t.hero & { openingDateSuffix?: string }).openingDateSuffix ? ` — ${(t.hero as typeof t.hero & { openingDateSuffix?: string }).openingDateSuffix}` : ""}
            </p>
            <WaitlistForm
              placeholder={t.hero.waitlistPlaceholder}
              buttonLabel={t.hero.waitlistButton}
              successMessage={t.hero.waitlistSuccess}
              duplicateMessage={t.hero.waitlistDuplicate}
              locale={locale}
            />
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
            {t.hero.descriptionHighlight && (<>{" "}<span className="font-semibold text-brand-navy border-b-2 border-brand-gold/40">{t.hero.descriptionHighlight}</span></>)}
            {t.hero.descriptionEnd && (<><br />{t.hero.descriptionEnd}</>)}
          </p>

          {heroBranches.branches && heroBranches.branches.length > 0 && (
            <div className="w-full max-w-sm mx-auto animate-fade-up [animation-delay:220ms]">
              <div className="w-px h-5 bg-brand-gold/40 mx-auto" />
              <div className="grid grid-cols-3">
                {heroBranches.branches.map((b, i) => (
                  <div key={b} className="flex flex-col items-center">
                    <div className="w-full flex items-stretch h-px">
                      <div className={cn("flex-1 border-b border-brand-gold/40", i === 0 && "border-b-0")} />
                      <div className="w-px bg-brand-gold/40" />
                      <div className={cn("flex-1 border-b border-brand-gold/40", i === heroBranches.branches.length - 1 && "border-b-0")} />
                    </div>
                    <div className="w-px h-2.5 bg-brand-gold/40" />
                    <div className="rounded-lg border border-brand-gold/20 bg-brand-gold/5 px-2 py-1.5">
                      <p className="text-[10px] font-semibold text-brand-navy text-center leading-tight">{b}</p>
                    </div>
                    <div className="w-px h-2.5 bg-brand-gold/40" />
                    <div className="w-full flex items-stretch h-px">
                      <div className={cn("flex-1 border-b border-brand-gold/40", i === 0 && "border-b-0")} />
                      <div className="w-px bg-brand-gold/40" />
                      <div className={cn("flex-1 border-b border-brand-gold/40", i === heroBranches.branches.length - 1 && "border-b-0")} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-px h-5 bg-brand-gold/40 mx-auto" />
              <div className="flex justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-brand-gold rotate-90 -mt-1" />
              </div>
              <p className="text-center font-serif text-sm text-brand-gold italic mt-1">
                {heroBranches.branchConclusion}
              </p>
            </div>
          )}

          <div className="w-full pt-2 flex flex-col items-center gap-3 animate-fade-up [animation-delay:300ms]">
            <Link href={`${prefix}/intake`} className="w-full">
              <Button size="lg" className="w-full min-w-[200px]">
                {(t.hero as typeof t.hero & { ctaAssessment?: string }).ctaAssessment ?? "Begin Your Case Assessment"}
              </Button>
            </Link>
            <Link href={`${prefix}/how-it-works`} className="w-full">
              <Button variant="outline" size="lg" className="w-full min-w-[200px]">
                {t.hero.ctaExplore}
              </Button>
            </Link>
            <p className="text-sm text-text-muted font-medium text-center">
              {t.hero.openingDate}{(t.hero as typeof t.hero & { openingDateSuffix?: string }).openingDateSuffix ? ` — ${(t.hero as typeof t.hero & { openingDateSuffix?: string }).openingDateSuffix}` : ""}
            </p>
            <WaitlistForm
              placeholder={t.hero.waitlistPlaceholder}
              buttonLabel={t.hero.waitlistButton}
              successMessage={t.hero.waitlistSuccess}
              duplicateMessage={t.hero.waitlistDuplicate}
              locale={locale}
            />
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

      {/* Trust Proof — Verification Standard */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[32px] border border-slate-200 bg-white px-8 py-10 sm:px-12 sm:py-14 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.16)]">
            <div className="text-center mb-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">{t.partners.subtitle}</p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-navy">{t.partners.compactTitle}</h2>
            </div>
            <div className="flex justify-center gap-8 sm:gap-16 mb-8">
              {t.partners.compactStats.map((stat: { number: string; label: string }) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-5xl sm:text-6xl text-brand-navy font-bold leading-none">{stat.number}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="max-w-2xl mx-auto text-center mb-8 space-y-1.5">
              {(t.partners.compactDescription as string).split('. ').map((sentence, i, arr) => (
                <p key={i} className="text-text-body text-sm sm:text-base font-medium leading-relaxed">
                  {sentence}{i < arr.length - 1 ? '.' : ''}
                </p>
              ))}
              {t.partners.rejectionReasons && (
                <p
                  className="text-sm text-text-muted leading-relaxed pt-1"
                  dangerouslySetInnerHTML={{ __html: t.partners.rejectionReasons }}
                />
              )}
            </div>
            <p className="text-center text-xs text-text-muted mt-2 mb-6">
              Verified through{" "}
              <Link href={`${prefix}/how-it-works`} className="font-semibold text-brand-navy/70 hover:text-brand-gold transition-colors">
                Angel Physician
              </Link>
              {" "}review under the{" "}
              <Link href={`${prefix}/trust-protocol`} className="font-semibold text-brand-navy/70 hover:text-brand-gold transition-colors">
                AetherHeal Trust Protocol
              </Link>
              .
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link
                href={`${prefix}/trust-protocol`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors"
              >
                {t.partners.compactCta}
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href={`${prefix}/methodology/how-we-verify-hospitals`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors"
              >
                {(t.partners as typeof t.partners & { methodologyCta?: string }).methodologyCta ?? "Verification Methodology"}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop: Sticky scroll slide — Problem Quote → Trust Architecture */}
      <ScrollSlideSection
        panelA={
          <div className="w-full px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <h2 className="font-serif text-5xl text-white mb-4">
                  {problemQuoteSection.title ?? "Why patients hesitate"}
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {problemQuoteSection.subtitle ??
                    "Behind every medical tourism search is a patient trying to avoid a decision they may regret for years."}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
              {problemItems.map((item, i) => {
                const Icon = problemQuoteIcons[i]
                const isLast = i === problemItems.length - 1
                return (
                  <div
                    key={item.title}
                    className={cn(
                      "rounded-[28px] border p-8",
                      isLast
                        ? "border-brand-gold/30 bg-brand-gold/10"
                        : "border-white/10 bg-white/5 backdrop-blur-sm"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                      isLast ? "bg-brand-gold/20" : "bg-white/10"
                    )}>
                      <Icon className="w-5 h-5 text-brand-gold" />
                    </div>
                    <p className={cn(
                      "text-[10px] font-bold uppercase tracking-widest mb-3",
                      isLast ? "text-brand-gold" : "text-brand-gold/70"
                    )}>
                      {item.title}
                    </p>
                    <p className={cn(
                      "font-serif text-2xl leading-relaxed",
                      isLast ? "text-white" : "text-white/90"
                    )}>
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                )
              })}
              </div>
            </div>
          </div>
        }
        panelB={
          <div className="w-full px-6 relative h-full">
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center h-full">
              <div className="max-w-3xl mx-auto text-center mb-20">
                <SectionLabel color="gold" className="mb-4 block">
                  {t.aiLayer.badge}
                </SectionLabel>
                <h2 className="font-serif text-5xl text-white leading-tight">
                  {t.aiLayer.title}{" "}
                  <span className="italic text-brand-gold">{t.aiLayer.titleHighlight}</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mt-5">
                  {t.aiLayer.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-5">
                {t.aiLayer.cards.slice(0, 4).map((card, idx) => {
                  const Icon = trustPillarIcons[idx % trustPillarIcons.length]
                  return (
                    <div
                      key={card.title}
                      className="group relative rounded-3xl p-8 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-brand-gold/20"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-gold/[0.04] rounded-full blur-2xl group-hover:bg-brand-gold/[0.08] transition-all duration-700" />
                      <div className="relative z-10">
                        <div className="w-13 h-13 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6 border border-brand-gold/15 group-hover:border-brand-gold/30 transition-colors duration-500">
                          <Icon className="w-5 h-5 text-brand-gold" />
                        </div>
                        <h3 className="font-serif text-2xl text-white mb-4 leading-snug">{card.title}</h3>
                        <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-500">{card.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {t.aiLayer.cards[4] && (
                <div className="mt-5 rounded-3xl border border-brand-gold/20 bg-brand-gold/[0.06] p-8 flex items-center gap-8">
                  <div className="w-14 h-14 rounded-xl bg-brand-gold/15 flex items-center justify-center border border-brand-gold/25 shrink-0">
                    <Video className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-white mb-2">{t.aiLayer.cards[4].title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{t.aiLayer.cards[4].description}</p>
                  </div>
                </div>
              )}

              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-3">
                  <div className="w-8 h-px bg-brand-gold/30" />
                  <p className="text-sm font-medium text-brand-gold/80 italic tracking-wide">{t.aiLayer.footnote}</p>
                  <div className="w-8 h-px bg-brand-gold/30" />
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* Mobile: Problem Quote */}
      <section className="md:hidden w-full py-12 px-4 bg-brand-navy">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="font-serif text-3xl text-white mb-4">
              {problemQuoteSection.title ?? "Why patients hesitate"}
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              {problemQuoteSection.subtitle ??
                "Behind every medical tourism search is a patient trying to avoid a decision they may regret for years."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
          {problemItems.map((item, i) => {
            const Icon = problemQuoteIcons[i]
            const isLast = i === problemItems.length - 1
            return (
              <div
                key={item.title}
                className={cn(
                  "rounded-[28px] border p-5",
                  isLast
                    ? "border-brand-gold/30 bg-brand-gold/10"
                    : "border-white/10 bg-white/5 backdrop-blur-sm"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center mb-4",
                  isLast ? "bg-brand-gold/20" : "bg-white/10"
                )}>
                  <Icon className="w-5 h-5 text-brand-gold" />
                </div>
                <p className={cn(
                  "text-[10px] font-bold uppercase tracking-widest mb-2",
                  isLast ? "text-brand-gold" : "text-brand-gold/70"
                )}>
                  {item.title}
                </p>
                <p className={cn(
                  "font-serif text-lg leading-relaxed",
                  isLast ? "text-white" : "text-white/90"
                )}>
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            )
          })}
          </div>
        </div>
      </section>

      {/* Mobile: Trust Architecture */}
      <section className="md:hidden w-full py-12 px-4 bg-brand-navy overflow-hidden relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <SectionLabel color="gold" className="mb-4 block">
              {t.aiLayer.badge}
            </SectionLabel>
            <h2 className="font-serif text-3xl text-white leading-tight">
              {t.aiLayer.title}{" "}
              <span className="italic text-brand-gold">{t.aiLayer.titleHighlight}</span>
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed mt-4">
              {t.aiLayer.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {t.aiLayer.cards.slice(0, 4).map((card, idx) => {
              const Icon = trustPillarIcons[idx % trustPillarIcons.length]
              return (
                <div
                  key={card.title}
                  className="group relative rounded-2xl p-6 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-gold/[0.04] rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-5 border border-brand-gold/15">
                      <Icon className="w-5 h-5 text-brand-gold" />
                    </div>
                    <h3 className="font-serif text-lg text-white mb-2 leading-snug">{card.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {t.aiLayer.cards[4] && (
            <div className="mt-3 rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.06] p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center border border-brand-gold/25 shrink-0 mt-0.5">
                <Video className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-serif text-base text-white mb-1">{t.aiLayer.cards[4].title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{t.aiLayer.cards[4].description}</p>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-brand-gold/80 italic tracking-wide">{t.aiLayer.footnote}</p>
          </div>
        </div>
      </section>

      {/* Journey Pipeline — Accordion */}
      <section className="w-full py-12 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <SectionLabel color="gold" className="mb-4 block">
              {t.journey.sectionLabel}
            </SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-navy leading-tight">
              {t.journey.title}
              <br />
              <span className="italic text-brand-gold">{t.journey.titleHighlight}</span>
            </h2>
            <div className="relative mt-6 md:mt-10 text-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-slate-200" />
              </div>
              <span className="relative bg-white px-6 font-serif italic text-base md:text-xl text-brand-gold">
                {t.journey.subtitle}
              </span>
            </div>
          </div>

          <JourneyAccordion
            steps={journeySection.steps}
            thenLabel={thenLabel}
            decisionReadiness={t.journey.decisionReadiness}
            centerIndex={2}
            defaultOpenIdx={2}
          />

          <div className="mt-10 text-center">
            <div className="max-w-2xl mx-auto rounded-[28px] border border-slate-100 bg-white px-6 py-8 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.18)]">
              <p className="font-serif text-lg sm:text-xl text-brand-gold italic leading-relaxed">
                &ldquo;{((t.journey as typeof t.journey & { closingQuote: string }).closingQuote).split('. ').map((sentence, i, arr) => (
                  <span key={i}>
                    {sentence}{i < arr.length - 1 ? '.' : ''}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}&rdquo;
              </p>
              <div className="mt-6 flex justify-center opacity-50">
                <div className="w-16 h-px bg-brand-gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage — Static Grid */}
      {(t as typeof t & { coverage?: { badge: string; title: string; subtitle?: string; items: string[]; slugs?: string[] } }).coverage && (() => {
        const coverage = (t as typeof t & { coverage: { badge: string; title: string; subtitle?: string; items: string[]; slugs?: string[] } }).coverage
        return (
          <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-brand-navy">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10 md:mb-14">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/70 mb-3">{coverage.badge}</p>
                <h2 className="font-serif text-2xl sm:text-3xl text-white mb-3">{coverage.title}</h2>
                {coverage.subtitle && (
                  <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">{coverage.subtitle}</p>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                {coverage.items.map((item, idx) => {
                  // Slug-based href mapping. `coverage.slugs` is a locale-agnostic
                  // canonical identifier array parallel to `coverage.items`. Adding
                  // a new hospital link is a one-liner below — no dict changes.
                  const COVERAGE_HREFS: Record<string, string> = {
                    "hair-transplant": `${prefix}/hospitals/morgan-dermatology`,
                    "skin-aesthetic": `${prefix}/hospitals/tune-clinic`,
                  }
                  const slug = coverage.slugs?.[idx]
                  const href = slug ? COVERAGE_HREFS[slug] : undefined
                  if (href) {
                    return (
                      <Link
                        key={item}
                        href={href}
                        className="group rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 sm:px-5 sm:py-4 text-center transition-all hover:border-brand-gold/40 hover:bg-white/[0.08]"
                      >
                        <span className="text-white/80 group-hover:text-white font-semibold text-xs sm:text-sm leading-tight transition-colors">
                          {item}
                        </span>
                      </Link>
                    )
                  }
                  return (
                    <div
                      key={item}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 sm:px-5 sm:py-4 text-center select-none"
                    >
                      <span className="text-white/80 font-semibold text-xs sm:text-sm leading-tight">{item}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })()}

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
                className={cn(
                  "group flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-gold/40 hover:shadow-md transition-all",
                  idx >= 3 && "hidden sm:flex"
                )}
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
          {t.explore.items.length > 3 && (
            <div className="sm:hidden mt-4 text-center">
              <Link
                href={`${prefix}/explore`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors"
              >
                See all {t.explore.items.length} topics
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-12 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto rounded-[32px] border border-slate-200 bg-slate-50/40 px-5 py-10 sm:px-8 sm:py-12 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.18)]">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-serif text-4xl text-brand-navy mb-4">{t.faq.title}</h2>
            <p className="text-text-body max-w-2xl mx-auto">{t.faq.subtitle}</p>
          </div>
          {(t.faq as typeof t.faq & { groupAbout?: string }).groupAbout && (
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">
              {(t.faq as typeof t.faq & { groupAbout: string }).groupAbout}
            </h3>
          )}
          <Accordion items={faqItems.slice(0, 5)} />
          {(t.faq as typeof t.faq & { groupBoundaries?: string }).groupBoundaries && (
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-10 mb-4">
              {(t.faq as typeof t.faq & { groupBoundaries: string }).groupBoundaries}
            </h3>
          )}
          <Accordion items={faqItems.slice(5)} />
        </div>
      </section>

      {/* Single closing CTA — after FAQ */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-bg-light">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy">{t.cta.title}</h2>
          <p className="text-text-body max-w-xl mx-auto leading-relaxed">{t.cta.subtitle}</p>
          <div>
            <Link href={`${prefix}/intake`}>
              <Button size="lg" className="min-w-[280px]">
                {(t.cta as typeof t.cta & { ctaPrimary?: string }).ctaPrimary ?? "Begin Your Case Assessment"}
              </Button>
            </Link>
          </div>
          <p className="text-sm text-text-muted font-medium">
            {t.cta.openingDate}<br />
            {(t.cta as typeof t.cta & { openingDateSuffix?: string }).openingDateSuffix ?? ""}
          </p>
          <WaitlistForm
            placeholder={t.cta.waitlistPlaceholder}
            buttonLabel={t.cta.waitlistButton}
            successMessage={t.cta.waitlistSuccess}
            duplicateMessage={t.cta.waitlistDuplicate}
            locale={locale}
          />
          <Link href={`${prefix}/how-it-works`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors">
            {t.cta.ctaExplore} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
