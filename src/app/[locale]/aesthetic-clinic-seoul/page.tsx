import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

const relatedHrefs = ["/hair-transplant-korea", "/plastic-surgery-korea", "/trust-protocol", "/medical-journey"]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.aestheticClinic.meta
  return {
    title: t.title, description: t.description,
    alternates: { canonical: `https://aetherheal.com/${locale}/aesthetic-clinic-seoul`, languages: Object.fromEntries(locales.map((l) => [l, `https://aetherheal.com/${l}/aesthetic-clinic-seoul`])) },
    openGraph: { title: t.title, description: t.description, url: `https://aetherheal.com/${locale}/aesthetic-clinic-seoul`, images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  }
}

export default async function AestheticClinicSeoulPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.aestheticClinic
  const prefix = `/${locale}`

  return (
    <div className="min-h-full bg-white">
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-brand-navy/[0.02] to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8"><span className="inline-flex items-center px-4 py-1.5 bg-brand-navy text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-sm">{t.hero.badge}</span></div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-10 leading-[1.1] tracking-tight">{t.hero.h1} <br className="hidden sm:block" /><span className="italic text-brand-gold">{t.hero.h1Highlight}</span></h1>
          <div className="max-w-3xl space-y-6 text-lg sm:text-xl text-slate-600 font-light leading-[1.8]">
            <p className="text-xl sm:text-2xl font-serif text-brand-navy leading-relaxed">{t.hero.intro}</p>
            <p>{t.hero.introDetail}</p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-12 xl:gap-20">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 p-6 bg-slate-50/80 border border-slate-100 rounded-2xl">
              <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">{dict.common.contents}</h2>
              <nav><ol className="space-y-4">{t.toc.map((item, i) => (<li key={item.id}><a href={`#${item.id}`} className="flex items-start gap-3 text-sm text-slate-600 font-medium hover:text-brand-gold transition-colors leading-snug"><span className="text-brand-gold/60 font-bold shrink-0 w-4 text-right">{i + 1}.</span>{item.label}</a></li>))}</ol></nav>
            </div>
          </aside>
          <div className="flex-1 min-w-0 max-w-3xl">
            <div className="block lg:hidden mb-16 p-6 sm:p-8 bg-slate-50 border border-slate-100 rounded-2xl">
              <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">{dict.common.tableOfContents}</h2>
              <ol className="space-y-4">{t.toc.map((item, i) => (<li key={item.id}><a href={`#${item.id}`} className="flex items-start gap-3 text-sm text-slate-600 font-medium hover:text-brand-gold transition-colors leading-snug"><span className="text-brand-gold/60 font-bold shrink-0 w-4 text-right">{i + 1}.</span>{item.label}</a></li>))}</ol>
            </div>
            <div className="space-y-24">
              <div id="why-seoul" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.whySeoul.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.whySeoul.p1}</p><p>{t.whySeoul.p2}</p>
                  <div className="p-6 sm:p-8 bg-brand-navy/[0.02] border-l-2 border-brand-gold rounded-r-2xl mt-8"><p className="text-base text-slate-700 leading-relaxed italic m-0">{t.whySeoul.callout}</p></div>
                </div>
              </div>
              <div id="how-we-support" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.howWeSupport.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <div className="grid gap-4">{t.howWeSupport.items.map((item) => (<div key={item} className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" /><span className="text-brand-navy font-medium text-base">{item}</span></div>))}</div>
                </div>
              </div>
              <div id="treatments-discussed" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">{t.treatmentsDiscussed.title}</h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>{t.treatmentsDiscussed.text}</p>
                  <p className="font-medium text-brand-navy border-l-2 border-brand-gold pl-5 py-2">{t.treatmentsDiscussed.callout}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif text-3xl text-brand-navy mb-10 text-center">{dict.common.continueReading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.relatedPages.map((link, i) => (
              <Link key={relatedHrefs[i]} href={`${prefix}${relatedHrefs[i]}`} className="group block p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-gold/40 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3"><span className="text-base font-bold text-brand-navy group-hover:text-brand-gold transition-colors">{link.label}</span><ArrowRight className="w-4 h-4 text-brand-gold shrink-0" /></div>
                <p className="text-sm text-slate-500 leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
