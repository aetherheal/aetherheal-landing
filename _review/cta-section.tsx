import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface CTASectionProps {
  title: string
  description: string
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
  stage?: string
  tertiaryHref?: string
  tertiaryLabel?: string
}

function isExternalLink(href: string) {
  return href.startsWith("mailto:") || href.startsWith("http")
}

export function CTASection({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  stage,
  tertiaryHref,
  tertiaryLabel,
}: CTASectionProps) {
  return (
    <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-brand-navy">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-white break-keep">{title}</h2>
        {stage && (
          <p className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold/15 rounded-full text-[13px] font-semibold text-brand-gold tracking-wide break-keep">
            {stage}
          </p>
        )}
        <p className="text-slate-300 text-lg leading-relaxed break-keep">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={primaryHref}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-brand-navy bg-brand-gold rounded-full hover:bg-brand-gold/90 transition-all hover:shadow-lg break-keep"
          >
            {primaryLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
          {secondaryHref && secondaryLabel && (
            isExternalLink(secondaryHref) ? (
              <a
                href={secondaryHref}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all break-keep"
              >
                {secondaryLabel}
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all break-keep"
              >
                {secondaryLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )
          )}
        </div>
        {tertiaryHref && tertiaryLabel && (
          <div className="pt-8">
            {isExternalLink(tertiaryHref) ? (
              <a
                href={tertiaryHref}
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-gold transition-colors break-keep"
              >
                {tertiaryLabel}
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <Link
                href={tertiaryHref}
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-gold transition-colors break-keep"
              >
                {tertiaryLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
