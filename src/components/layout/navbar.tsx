"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Globe, ChevronDown, Menu, X, ArrowRight } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { cn } from "@/lib/utils"
import { locales, localeNames, localeShort, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/get-dictionary"

interface NavbarProps {
  dict: Dictionary["common"]
  locale: Locale
}

export function Navbar({ dict, locale }: NavbarProps) {
  const pathname = usePathname()
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { href: `/${locale}/how-it-works`, label: dict.nav.howItWorks },
    { href: `/${locale}/explore`, label: dict.nav.exploreFramework },
    { href: `/${locale}/trust-protocol`, label: dict.nav.trustSafety },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  function switchLocale(newLocale: Locale) {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/"
    const newPath = `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`
    window.location.href = newPath
  }

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-brand-navy focus:text-white focus:rounded-md focus:text-sm">
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center">
            <Logo size="sm" className="sm:hidden" />
            <Logo size="md" className="hidden sm:flex" />
          </Link>

          <div className="flex items-center gap-1">
            <div className="hidden lg:flex items-center gap-1 mr-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-[13px] tracking-wide font-medium rounded-full transition-all duration-200",
                      isActive
                        ? "text-brand-navy bg-slate-100"
                        : "text-text-muted hover:text-brand-navy hover:bg-slate-50"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="hidden lg:block w-px h-5 bg-slate-200 mr-2" />

            <a
              href="https://app.aetherheal.com/sign-in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center px-3 py-2 text-[13px] tracking-wide font-medium text-text-muted hover:text-brand-navy rounded-full transition-all duration-200 hover:bg-slate-50"
            >
              {dict.nav.signIn}
            </a>

            <a
              href="https://app.aetherheal.com/transition"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-[13px] tracking-wide font-semibold text-white bg-brand-navy rounded-full transition-all duration-200 hover:bg-brand-navy/90 hover:shadow-md"
            >
              {dict.nav.beginJourney}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-2 text-[13px] tracking-wide font-medium rounded-full transition-all duration-200",
                  isLangOpen
                    ? "text-brand-navy bg-slate-100"
                    : "text-text-muted hover:text-brand-navy hover:bg-slate-50"
                )}
                aria-label="Select Language"
                aria-expanded={isLangOpen}
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{localeShort[locale]}</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", isLangOpen && "rotate-180")} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl border border-slate-100 shadow-lg py-1.5 animate-fade-in z-50">
                  {locales.map((l) => (
                    <button
                      key={l}
                      className={cn(
                        "w-full text-left px-3.5 py-2 text-[13px] tracking-wide font-medium transition-colors",
                        l === locale
                          ? "text-brand-navy bg-slate-50"
                          : "text-text-body hover:bg-slate-50 hover:text-brand-navy"
                      )}
                      onClick={() => {
                        switchLocale(l)
                        setIsLangOpen(false)
                      }}
                    >
                      {localeNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full text-text-muted hover:text-brand-navy hover:bg-slate-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white animate-fade-in">
          <div className="px-5 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-brand-navy bg-slate-50"
                      : "text-text-muted hover:text-brand-navy hover:bg-slate-50"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
              <a
                href="https://app.aetherheal.com/sign-in"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2.5 text-sm font-medium text-text-muted hover:text-brand-navy rounded-lg transition-colors"
              >
                {dict.nav.signIn}
              </a>
              <a
                href="https://app.aetherheal.com/transition"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-brand-navy rounded-lg transition-colors hover:bg-brand-navy/90"
              >
                {dict.nav.beginJourney}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
