"use client"

import { Scale, FileSignature, Target } from "lucide-react"

const conceptIcons = [Scale, FileSignature, Target]

interface FlipCardItem {
  title: string
  front: string
  back: string
}

export function ExploreFlipCards({ items }: { items: FlipCardItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
      {items.map((c, i) => {
        const Icon = conceptIcons[i]
        return (
          <div key={c.title} className="group relative h-64 [perspective:1000px]">
            <div className="absolute inset-0 bg-white rounded-xl border border-border-light shadow-card p-5 sm:p-8 flex flex-col justify-center backface-hidden transition-transform duration-500 group-hover:[transform:rotateY(180deg)]">
              <Icon className="w-8 h-8 text-brand-navy mb-4" />
              <h3 className="text-lg font-semibold text-text-deep mb-2">{c.title}</h3>
              <p className="text-sm text-text-body leading-relaxed">{c.front}</p>
            </div>
            <div className="absolute inset-0 bg-brand-navy rounded-xl p-5 sm:p-8 flex flex-col justify-center [transform:rotateY(180deg)] backface-hidden transition-transform duration-500 group-hover:[transform:rotateY(0deg)]">
              <p className="text-sm text-slate-300 leading-relaxed">{c.back}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
