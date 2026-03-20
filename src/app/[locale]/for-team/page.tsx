import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"
import { type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

export function generateStaticParams() {
  return [{ locale: "ko" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.forTeam?.meta
  if (!t) return {}
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `https://aetherheal.com/${locale}/for-team` },
    openGraph: { title: t.title, description: t.description, url: `https://aetherheal.com/${locale}/for-team`, images: [{ url: "/og-image.jpg", width: 1200, height: 630 }] },
  }
}

export default async function ForTeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.forTeam
  if (!t) return null

  const roleColors: Record<string, { bg: string; text: string; accent: string }> = {
    "의료 운영 리더십": { bg: "bg-brand-navy", text: "text-white", accent: "text-brand-gold" },
    "기술 리더십": { bg: "bg-slate-800", text: "text-white", accent: "text-emerald-400" },
    "서비스 설계 리더십": { bg: "bg-slate-700", text: "text-white", accent: "text-sky-400" },
  }

  return (
    <main id="main-content" className="flex flex-col items-center w-full">
      {/* Hero */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-brand-navy text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6 break-keep tracking-tight">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed break-keep">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Members */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-10">
          {t.members.map((member: { name: string; role: string; description: string; credentials: string[] }, i: number) => {
            const colors = roleColors[member.role] || { bg: "bg-brand-navy", text: "text-white", accent: "text-brand-gold" }
            return (
              <div key={member.name} className="rounded-3xl border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className={`${colors.bg} px-8 sm:px-10 py-8`}>
                  <p className={`text-sm font-medium ${colors.accent} tracking-widest uppercase mb-2`}>
                    {member.role}
                  </p>
                  <h2 className={`font-serif text-2xl sm:text-3xl ${colors.text} break-keep`}>
                    {member.name}
                  </h2>
                </div>

                {/* Body */}
                <div className="px-8 sm:px-10 py-8 sm:py-10 bg-bg-light">
                  {member.description && (
                    <p className="text-[15px] sm:text-base text-slate-700 leading-relaxed mb-8 break-keep">
                      {member.description}
                    </p>
                  )}

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-4">{t.credentialsTitle}</h3>
                    <ul className="space-y-2.5">
                      {member.credentials.map((line: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-navy/40 shrink-0 mt-2"></span>
                          <span className="text-[15px] text-slate-600 leading-relaxed break-keep">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-brand-navy text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4 break-keep">{t.cta.title}</h2>
          <p className="text-white/70 text-[15px] sm:text-base mb-10 break-keep">{t.cta.description}</p>
          <a
            href={`mailto:${t.cta.email}?subject=${dict.common.contactSubjects.team}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-navy font-semibold rounded-full hover:bg-brand-gold/90 transition-all"
          >
            <Mail className="w-4 h-4" />
            {t.cta.buttonText}
          </a>
        </div>
      </section>
    </main>
  )
}
