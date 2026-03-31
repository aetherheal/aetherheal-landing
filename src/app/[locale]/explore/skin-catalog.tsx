"use client"

import { useState } from "react"
import { ChevronDown, Stethoscope, User } from "lucide-react"

export interface SkinTreatment {
  name: string
  tag: string
  origin: string
  description: string
  kr?: boolean
}

export interface SkinCategory {
  id: string
  title: string
  treatments: SkinTreatment[]
}

export interface SkinConsultingBanner {
  badge: string
  title: string
  description: string
  physician: { label: string; detail: string }
  coordinator: { label: string; detail: string }
  result: string
}

interface SkinCatalogProps {
  categories: SkinCategory[]
  popularLabel: string
  consultingBanner?: SkinConsultingBanner
}

export function SkinCatalog({ categories, popularLabel, consultingBanner }: SkinCatalogProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(categories.map((c) => [c.id, true]))
  )

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="space-y-10 sm:space-y-14 px-4 sm:px-6 max-w-6xl mx-auto">
      {consultingBanner && (
        <div className="rounded-2xl border border-brand-gold/20 bg-gradient-to-br from-white to-brand-gold/5 p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">{consultingBanner.badge}</span>
            <h3 className="font-serif text-xl sm:text-2xl text-brand-navy mt-2 mb-3">{consultingBanner.title}</h3>
            <p className="text-sm text-text-body leading-relaxed max-w-3xl">{consultingBanner.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-4 bg-white rounded-xl border border-border-light p-5">
              <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5 text-brand-navy" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-navy mb-1">{consultingBanner.physician.label}</p>
                <p className="text-xs text-text-body leading-relaxed">{consultingBanner.physician.detail}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white rounded-xl border border-border-light p-5">
              <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-navy mb-1">{consultingBanner.coordinator.label}</p>
                <p className="text-xs text-text-body leading-relaxed">{consultingBanner.coordinator.detail}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-brand-gold/10 pt-4">
            <p className="text-sm text-brand-navy font-medium text-center">{consultingBanner.result}</p>
          </div>
        </div>
      )}

      {categories.map((cat) => (
        <div key={cat.id}>
          <button
            onClick={() => toggle(cat.id)}
            className="w-full flex items-center justify-between border-b border-slate-200 pb-4 mb-6 group"
          >
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy text-left">
              {cat.title}
              <span className="ml-3 text-sm font-sans font-normal text-text-muted">
                {cat.treatments.length}
              </span>
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-text-muted transition-transform duration-200 ${
                expanded[cat.id] ? "rotate-180" : ""
              }`}
            />
          </button>

          {expanded[cat.id] && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {cat.treatments.map((t) => (
                <div
                  key={t.name}
                  className="group/card relative bg-white rounded-xl border border-border-light p-4 sm:p-5 hover:shadow-card hover:border-brand-gold/30 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-sm font-semibold text-text-deep leading-tight">
                      {t.name}
                    </h4>
                    {t.kr && (
                      <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full">
                        {popularLabel}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-white bg-brand-navy/80 px-2 py-0.5 rounded">
                      {t.tag}
                    </span>
                    <span className="text-[11px] text-text-muted">{t.origin}</span>
                  </div>
                  <p className="text-xs text-text-body leading-relaxed">
                    {t.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
