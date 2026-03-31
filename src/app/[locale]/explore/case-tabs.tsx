"use client"

import { useState, type ReactNode } from "react"
import { Info } from "lucide-react"
import { CaseCarousel, type CaseItem } from "./case-carousel"

export interface TabCategory {
  id: string
  title: string
  cases: CaseItem[]
}

export interface TabSubgroup {
  label: string
  categories: TabCategory[]
}

export interface TabData {
  id: string
  label: string
  categories: TabCategory[]
  subgroups?: TabSubgroup[]
}

interface CaseTabsProps {
  tabs: TabData[]
  caseLabel: string
  beforeAfterLabel: string
  disclaimer: string
  contextBannerTitle: string
  contextBannerText: string
  skinTab?: { id: string; label: string }
  skinContent?: ReactNode
}

export function CaseTabs({
  tabs,
  caseLabel,
  beforeAfterLabel,
  disclaimer,
  contextBannerTitle,
  contextBannerText,
  skinTab,
  skinContent,
}: CaseTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "face")

  const allTabHeaders = [
    ...tabs.map((t) => ({ id: t.id, label: t.label })),
    ...(skinTab ? [skinTab] : []),
  ]

  const isSkinActive = skinTab && activeTab === skinTab.id
  const activeTabData = tabs.find((t) => t.id === activeTab) ?? tabs[0]

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Context Banner — hidden for skin tab */}
      {!isSkinActive && (
        <div className="px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-amber-200/60 bg-amber-50/50 p-5 sm:p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-navy mb-1">{contextBannerTitle}</p>
              <p className="text-sm text-text-muted leading-relaxed">{contextBannerText}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Bar */}
      <div className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav
            role="tablist"
            className="flex gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {allTabHeaders.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-6 py-4 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200
                  ${activeTab === tab.id
                    ? "text-brand-navy"
                    : "text-text-muted hover:text-text-deep"
                  }
                `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-gold rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Active Tab Content */}
      {isSkinActive ? (
        skinContent
      ) : activeTabData.subgroups ? (
        <div className="space-y-20 sm:space-y-28">
          {activeTabData.subgroups.map((group) => (
            <div key={group.label} className="space-y-12 sm:space-y-16">
              <div className="px-4 sm:px-6 max-w-7xl mx-auto">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-1">{group.label}</p>
              </div>
              {group.categories.map((category) => (
                <div key={category.id} className="space-y-6 sm:space-y-8">
                  <div className="px-4 sm:px-6 max-w-7xl mx-auto">
                    <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy border-b border-slate-200 pb-4">
                      {category.title}
                    </h3>
                  </div>
                  <CaseCarousel
                    cases={category.cases}
                    caseLabel={caseLabel}
                    beforeAfterLabel={beforeAfterLabel}
                    disclaimer={disclaimer}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-16 sm:space-y-24">
          {activeTabData.categories.map((category) => (
            <div key={category.id} className="space-y-6 sm:space-y-8">
              <div className="px-4 sm:px-6 max-w-7xl mx-auto">
                <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy border-b border-slate-200 pb-4">
                  {category.title}
                </h3>
              </div>
              <CaseCarousel
                cases={category.cases}
                caseLabel={caseLabel}
                beforeAfterLabel={beforeAfterLabel}
                disclaimer={disclaimer}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
