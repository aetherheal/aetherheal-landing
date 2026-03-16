import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/get-dictionary"

interface FooterProps {
  dict: Dictionary["common"]
  locale: Locale
}

export function Footer({ dict, locale }: FooterProps) {
  const prefix = `/${locale}`
  const isKo = locale === "ko"

  const platformLinks = isKo
    ? [
        { href: `${prefix}/for-partners`, label: dict.nav.forPartners ?? "파트너 병원" },
        { href: `${prefix}/for-investors`, label: dict.nav.forInvestors ?? "투자자" },
        { href: `${prefix}/for-team`, label: dict.nav.forTeam ?? "팀" },
        { href: `${prefix}/our-philosophy`, label: dict.nav.philosophy ?? "에테르힐 철학" },
      ]
    : [
        { href: `${prefix}/how-it-works`, label: dict.footer.platformLinks.howItWorks },
        { href: `${prefix}/trust-protocol`, label: dict.footer.platformLinks.trustProtocol },
        { href: `${prefix}/our-philosophy`, label: dict.footer.platformLinks.ourPhilosophy },
        { href: `${prefix}/medical-journey`, label: dict.footer.platformLinks.medicalJourney },
        { href: `${prefix}/explore`, label: dict.footer.platformLinks.explore },
        { href: `${prefix}/blog`, label: dict.footer.platformLinks.blog },
      ]

  const guideLinks = isKo
    ? [
        { href: "/en", label: "영문 환자용 사이트" },
        { href: "/en/how-it-works", label: "How It Works (EN)" },
        { href: "/en/trust-protocol", label: "Trust Protocol (EN)" },
      ]
    : [
        { href: `${prefix}/how-to-choose-hospital-abroad`, label: dict.footer.guideLinks.choosingHospital },
        { href: `${prefix}/hair-transplant-korea`, label: dict.footer.guideLinks.hairTransplant },
        { href: `${prefix}/plastic-surgery-korea`, label: dict.footer.guideLinks.plasticSurgery },
        { href: `${prefix}/aesthetic-clinic-seoul`, label: dict.footer.guideLinks.aestheticClinics },
      ]

  const legalLinks = [
    { href: `${prefix}/medical-boundary`, label: dict.footer.medicalBoundaryNotice },
    { href: `${prefix}/terms-of-service`, label: dict.footer.termsOfService },
    { href: `${prefix}/privacy-policy`, label: dict.footer.privacyPolicy },
    { href: `${prefix}/payment-refund-policy`, label: dict.footer.paymentRefundPolicy },
  ]

  return (
    <footer className="bg-brand-navy text-white pt-14 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 sm:gap-12 mb-14 sm:mb-20">

          <div className="col-span-2 md:col-span-4">
            <Link href={`/${locale}`} className="inline-block mb-5">
              <Logo size="md" theme="dark" />
            </Link>
            <p className="text-sm text-slate-400 font-light leading-relaxed max-w-xs mb-3">
              {dict.footer.brandDescription}
            </p>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">
              {dict.footer.brandSubtitle}
            </p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
              {dict.footer.platform}
            </h3>
            <ul className="space-y-4">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
              {dict.footer.guides}
            </h3>
            <ul className="space-y-4">
              {guideLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
              {dict.footer.company}
            </h3>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="pt-4 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 block mb-1">{dict.footer.contact}</span>
                <a
                  href="mailto:drjeeju@aetherheal.com"
                  className="text-sm text-slate-300 hover:text-brand-gold transition-colors"
                >
                  drjeeju@aetherheal.com
                </a>
              </li>

              <li className="pt-4 border-t border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">
                  {dict.footer.companyName}
                </p>
                <div className="text-[10px] text-slate-500 space-y-1 font-light">
                  <p>{dict.footer.representative}</p>
                  <p>{dict.footer.bizRegNo}</p>
                  <p className="leading-relaxed">
                    {dict.footer.address}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[10px] text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
          <p className="text-[10px] text-slate-600 max-w-md text-left md:text-right leading-relaxed">
            {dict.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
