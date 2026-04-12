"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface JourneyStep {
  label: string
  badge: string | null
  description: string
  details: string | null
  owner?: string
  next?: string
}

interface JourneyAccordionProps {
  steps: JourneyStep[]
  thenLabel: string
  decisionReadiness?: {
    notReady: string
    pause: string
    ready: string
    proceed: string
  }
  centerIndex?: number
  defaultOpenIdx?: number
}

export function JourneyAccordion({
  steps,
  thenLabel,
  decisionReadiness,
  centerIndex = 2,
  defaultOpenIdx = 2,
}: JourneyAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(defaultOpenIdx)

  return (
    <div className="space-y-2">
      {steps.map((step, idx) => {
        const isOpen = openIdx === idx
        const isCenter = idx === centerIndex
        const stepNum = idx + 1

        return (
          <div
            key={step.label}
            className={cn(
              "rounded-2xl border overflow-hidden transition-colors",
              isCenter && isOpen
                ? "border-brand-navy bg-brand-navy/[0.03]"
                : "border-slate-200 bg-white",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full flex items-start gap-3 px-4 py-3 sm:px-5 sm:py-4 text-left"
            >
              <span className="text-xs font-bold text-text-muted shrink-0 mt-1 w-5 text-center tabular-nums">
                {stepNum}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  {step.badge ? (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold leading-none">
                      {step.badge}
                    </span>
                  ) : (
                    <span />
                  )}
                  {step.owner && (
                    <span className="text-[10px] font-semibold text-text-muted shrink-0 leading-none hidden sm:inline">
                      {step.owner}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-base sm:text-lg text-brand-navy leading-snug mt-0.5">
                  {step.label}
                </h3>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-text-muted shrink-0 mt-1.5 transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <div
              className={cn(
                "transition-all duration-300 ease-in-out overflow-hidden",
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pl-12 sm:pl-[3.25rem]">
                {step.owner && (
                  <p className="text-[10px] font-semibold text-text-muted mb-2 sm:hidden">
                    {step.owner}
                  </p>
                )}
                <p className="text-sm text-text-body leading-relaxed">
                  {step.description}
                </p>
                {step.details && (
                  <p className="text-xs text-text-muted mt-2 font-medium">
                    {step.details}
                  </p>
                )}

                {isCenter && decisionReadiness && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <div className="flex-1 border border-slate-200 bg-slate-50 p-3 rounded-xl text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">
                        {decisionReadiness.notReady}
                      </p>
                      <p className="text-brand-navy font-serif text-sm">
                        {decisionReadiness.pause}
                      </p>
                    </div>
                    <div className="flex-1 border border-brand-gold/30 bg-brand-gold/5 p-3 rounded-xl text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1">
                        {decisionReadiness.ready}
                      </p>
                      <p className="text-brand-navy font-serif text-sm">
                        {decisionReadiness.proceed}
                      </p>
                    </div>
                  </div>
                )}

                {step.next && (
                  <p className="text-xs text-text-muted mt-3 font-medium">
                    {thenLabel} {step.next}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
