import Link from "next/link"
import { ArrowRight, Building2, TrendingUp, BookOpen, ShieldCheck, Bot, Users } from "lucide-react"
import type { Dictionary } from "@/i18n/get-dictionary"

interface KoLandingProps {
  dict: Dictionary
  locale: string
}

export function KoLanding({ dict, locale }: KoLandingProps) {
  const prefix = `/${locale}`

  return (
    <div className="min-h-full">
      <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(191,155,48,0.08),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold/10 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">의사 주도형 글로벌 메디컬 의사결정 인프라</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight break-keep">
            AetherHeal
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light break-keep">
            한국 의료를 고려하는 해외 환자를 위한 의사결정 인프라.
            <br className="hidden sm:block" />
            파트너 병원과 투자자를 위한 정보를 안내합니다.
          </p>
        </div>
      </section>

      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">어떤 분이신가요?</h2>
            <p className="text-text-muted text-lg break-keep">해당하는 항목을 선택해 주십시오.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Link href={`${prefix}/for-partners`} className="group">
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_60px_-12px_rgba(15,23,42,0.12)] hover:border-brand-gold/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7 text-brand-gold" />
                </div>
                <h3 className="font-serif text-2xl text-brand-navy font-semibold mb-3 break-keep">파트너 병원이신가요?</h3>
                <p className="text-text-body leading-relaxed mb-6 break-keep">
                  AetherHeal이 파트너 병원에 제공하는 가치, Trust Protocol 심사 과정, 그리고 참여 조건을 확인하세요.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy group-hover:text-brand-gold transition-colors break-keep">
                  파트너 안내 보기
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            <Link href={`${prefix}/for-investors`} className="group">
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_60px_-12px_rgba(15,23,42,0.12)] hover:border-brand-navy/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-brand-navy/5 flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-brand-navy" />
                </div>
                <h3 className="font-serif text-2xl text-brand-navy font-semibold mb-3 break-keep">투자자이신가요?</h3>
                <p className="text-text-body leading-relaxed mb-6 break-keep">
                  시장 기회, 비즈니스 모델, 경쟁 우위, 팀 비전, 그리고 로드맵을 확인하세요.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy group-hover:text-brand-gold transition-colors break-keep">
                  투자자 안내 보기
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
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">AetherHeal의 핵심 구조</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto break-keep">기존 에이전시와 근본적으로 다른 세 가지 아키텍처적 특징.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="w-11 h-11 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-5">
                <ShieldCheck className="w-5 h-5 text-brand-gold" />
              </div>
              <h3 className="font-serif text-lg text-brand-navy font-semibold mb-3 break-keep">구조적 인센티브 분리</h3>
              <p className="text-sm text-text-body leading-relaxed break-keep">
                시술 비용과 무관한 정액 수수료. 병원 심사팀과 환자 네비게이션팀의 완전 분리. 정책이 아닌 아키텍처로 부패를 불가능하게 합니다.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="w-11 h-11 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-5">
                <Users className="w-5 h-5 text-brand-gold" />
              </div>
              <h3 className="font-serif text-lg text-brand-navy font-semibold mb-3 break-keep">의사 주도 검증</h3>
              <p className="text-sm text-text-body leading-relaxed break-keep">
                병원 심사, 케이스 리뷰, 품질 감사 모두 병원과 재정적 이해관계가 없는 독립적 의사에 의해 수행됩니다.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="w-11 h-11 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-5">
                <Bot className="w-5 h-5 text-brand-gold" />
              </div>
              <h3 className="font-serif text-lg text-brand-navy font-semibold mb-3 break-keep">AI + 인간 거버넌스</h3>
              <p className="text-sm text-text-body leading-relaxed break-keep">
                AI는 정보 구조화와 다국어 조율을 담당합니다. 의료 의사결정은 하지 않습니다. 모든 AI 출력물은 의사 검토를 거칩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-navy/5 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7 text-brand-navy" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy break-keep">우리의 철학을 읽어보세요</h2>
          <p className="text-text-body text-lg leading-relaxed break-keep">
            AetherHeal이 존재하는 이유, 아커로프 시장 문제, SWIFT 구조의 유비, 그리고 창업자의 의무에 대해 설명합니다.
          </p>
          <Link
            href={`${prefix}/our-philosophy`}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-brand-navy rounded-full hover:bg-brand-navy/90 transition-all hover:shadow-md break-keep"
          >
            우리의 철학 전문 읽기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-brand-navy">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-slate-400 text-sm break-keep">영문 환자용 사이트를 방문하시려면</p>
          <Link
            href="/en"
            className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors font-semibold break-keep"
          >
            AetherHeal 영문 사이트 바로가기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
