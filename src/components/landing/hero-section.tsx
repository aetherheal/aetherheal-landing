import type { LucideIcon } from "lucide-react"
import Image from "next/image"

interface HeroSectionProps {
  icon: LucideIcon
  badge: string
  h1: string
  h1Highlight: string
  intro: string
  showBgImage?: boolean
}

export function HeroSection({ icon: Icon, badge, h1, h1Highlight, intro, showBgImage }: HeroSectionProps) {
  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 bg-brand-navy overflow-hidden">
      {showBgImage && (
        <div className="absolute inset-0">
          <Image
            src="/og-image.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-brand-navy/75" />
        </div>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(191,155,48,0.08),transparent_70%)]" />
      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold/10 rounded-full text-[10px] sm:text-xs font-bold text-brand-gold uppercase tracking-widest break-keep">
          <Icon className="w-3.5 h-3.5" />
          {badge}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight break-keep">
          {h1} <span className="text-brand-gold">{h1Highlight}</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed break-keep">{intro}</p>
      </div>
    </section>
  )
}
