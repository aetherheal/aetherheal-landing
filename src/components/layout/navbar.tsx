import Link from "next/link"
import { Logo } from "@/components/ui/logo"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Logo size="md" />

        <div className="flex items-center gap-3 sm:gap-8">
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-text-muted hover:text-brand-navy transition-colors hidden md:block"
          >
            How AetherHeal Works
          </Link>
          <Link
            href="/explore"
            className="text-sm font-medium text-text-muted hover:text-brand-navy transition-colors hidden md:block"
          >
            Explore
          </Link>
        </div>
      </div>
    </nav>
  )
}
