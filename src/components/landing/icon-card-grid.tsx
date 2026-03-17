import type { LucideIcon } from "lucide-react"

interface IconCardGridProps {
  title: string
  subtitle?: string
  items: { title: string; description: string }[]
  icons: LucideIcon[]
  variant?: "gold" | "navy"
}

export function IconCardGrid({ title, subtitle, items, icons, variant = "gold" }: IconCardGridProps) {
  const iconBg = variant === "navy" ? "bg-brand-navy" : "bg-brand-gold/10"
  const cardBg = variant === "navy" ? "bg-bg-light" : "bg-white"
  const cardBorder = variant === "navy" ? "border-slate-200" : "border-slate-200"

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 text-center break-keep">{title}</h2>
      {subtitle && <p className="text-[15px] text-slate-700 text-center mb-12 break-keep">{subtitle}</p>}
      {!subtitle && <div className="mb-12" />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => {
          const Icon = icons[i % icons.length]
          return (
            <div
              key={item.title}
              className={`rounded-2xl border ${cardBorder} ${cardBg} p-7 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.1)]`}
            >
              <div className={`w-11 h-11 rounded-2xl ${iconBg} flex items-center justify-center mb-5`}>
                <Icon className="w-5 h-5 text-brand-gold" />
              </div>
              <h3 className="font-serif text-lg text-brand-navy font-semibold mb-3 break-keep">{item.title}</h3>
              <p className="text-[15px] text-slate-700 leading-relaxed break-keep">{item.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
