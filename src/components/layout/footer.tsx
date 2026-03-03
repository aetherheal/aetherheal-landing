import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { SectionLabel } from "@/components/ui/section-label"

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-14 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 mb-14 sm:mb-20">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <Logo size="md" theme="dark" />
            <div className="space-y-2">
              <p className="text-sm text-slate-400 font-light leading-relaxed max-w-xs">
                Physician-led decision infrastructure for high-stake medical care.
              </p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">
                For international patients considering care in Korea.
              </p>
            </div>
          </div>

          {/* System & Governance */}
          <div className="md:col-span-3">
            <SectionLabel color="muted" className="text-slate-500 mb-6 block">
              System & Governance
            </SectionLabel>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-slate-300 hover:text-white transition-colors hover:underline decoration-brand-gold/50 underline-offset-4"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/trust-protocol"
                  className="text-sm text-slate-300 hover:text-white transition-colors hover:underline decoration-brand-gold/50 underline-offset-4"
                >
                  Trust Protocol
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-sm text-slate-300 hover:text-white transition-colors hover:underline decoration-brand-gold/50 underline-offset-4"
                >
                  Explore Framework
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Safety */}
          <div className="md:col-span-2">
            <SectionLabel color="muted" className="text-slate-500 mb-6 block">
              Legal & Safety
            </SectionLabel>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/medical-boundary"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Medical Boundary Notice
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Scope & Process
                </Link>
              </li>
              <li>
                <Link
                  href="/trust-protocol"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Oversight & Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Operations */}
          <div className="md:col-span-3">
            <SectionLabel color="muted" className="text-slate-500 mb-6 block">
              Operations
            </SectionLabel>
            <ul className="space-y-4">
              <li className="pb-3 border-b border-slate-800">
                <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider font-semibold">
                  Next Step
                </p>
                <Link
                  href="/explore"
                  className="inline-flex items-center text-xs font-semibold text-brand-gold hover:text-amber-300 transition-colors"
                >
                  Start in exploration mode
                </Link>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] text-slate-500 mb-1">General Inquiries</span>
                <a
                  href="mailto:contact@aetherheal.com"
                  className="text-sm text-slate-300 hover:text-brand-gold transition-colors font-mono"
                >
                  contact@aetherheal.com
                </a>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] text-slate-500 mb-1">Partnership</span>
                <a
                  href="mailto:partners@aetherheal.com"
                  className="text-sm text-slate-300 hover:text-brand-gold transition-colors font-mono"
                >
                  partners@aetherheal.com
                </a>
              </li>
              <li className="pt-6 mt-4 border-t border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">
                  AetherHeal Co., Ltd.
                </p>
                <div className="text-[10px] text-slate-400 space-y-1 font-light opacity-80">
                  <p>Representative: Dr. Jee Hoon Ju</p>
                  <p>Biz Reg No: 874-87-03734</p>
                  <p className="leading-relaxed">
                    Addr: B1, 64, Gingorang-ro 14-gil,
                    <br />
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
            &copy; 2026 AetherHeal. All rights reserved.
          </p>
          <p className="text-[10px] text-slate-600 max-w-md text-left md:text-right">
            AetherHeal provides decision support only and does not deliver medical care.{" "}
            <br className="hidden md:block" />
            In case of emergency, contact local medical services immediately.
          </p>
        </div>
      </div>
    </footer>
  )
}
