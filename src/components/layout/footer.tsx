import Link from "next/link"
import { Logo } from "@/components/ui/logo"

const platformLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/trust-protocol", label: "Trust Protocol" },
  { href: "/medical-journey", label: "Medical Journey" },
  { href: "/explore", label: "Explore" },
]

const guideLinks = [
  { href: "/how-to-choose-hospital-abroad", label: "Choosing a Hospital Abroad" },
  { href: "/hair-transplant-korea", label: "Hair Transplant in Korea" },
  { href: "/plastic-surgery-korea", label: "Plastic Surgery in Korea" },
  { href: "/aesthetic-clinic-seoul", label: "Aesthetic Clinics in Seoul" },
]

const legalLinks = [
  { href: "/medical-boundary", label: "Medical Boundary Notice" },
]

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-14 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 sm:gap-12 mb-14 sm:mb-20">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 space-y-6">
            <Logo size="md" theme="dark" />
            <p className="text-sm text-slate-400 font-light leading-relaxed max-w-xs">
              Physician-led decision infrastructure for high-stake medical care.
            </p>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">
              For international patients considering care in Korea.
            </p>
          </div>

          {/* Platform */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
              Platform
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

          {/* Guides */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
              Guides
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

          {/* Company & Contact */}
          <div className="col-span-2 md:col-span-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
              Company
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
                <span className="text-[10px] text-slate-500 block mb-1">Contact</span>
                <a
                  href="mailto:drjeeju@aetherheal.com"
                  className="text-sm text-slate-300 hover:text-brand-gold transition-colors"
                >
                  drjeeju@aetherheal.com
                </a>
              </li>

              <li className="pt-4 border-t border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">
                  AetherHeal Co., Ltd.
                </p>
                <div className="text-[10px] text-slate-500 space-y-1 font-light">
                  <p>Representative: Dr. Jee Hoon Ju</p>
                  <p>Biz Reg No: 874-87-03734</p>
                  <p className="leading-relaxed">
                    B1, 64, Gingorang-ro 14-gil,<br />
                    Gwangjin-gu, Seoul, Republic of Korea
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[10px] text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} AetherHeal. All rights reserved.
          </p>
          <p className="text-[10px] text-slate-600 max-w-md text-left md:text-right leading-relaxed">
            AetherHeal provides decision support only and does not deliver medical care.{" "}
            <br className="hidden md:block" />
            In case of emergency, contact local medical services immediately.
          </p>
        </div>
      </div>
    </footer>
  )
}
