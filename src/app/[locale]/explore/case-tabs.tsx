"use client"

import { useState, useMemo, useRef, useCallback, useEffect, type ReactNode } from "react"
import { Info, Search, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
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
  searchPlaceholder?: string
  jumpToLabel?: string
  noResultsLabel?: string
}

function getAllCategories(tabs: TabData[]): { tabId: string; tabLabel: string; subgroup?: string; category: TabCategory }[] {
  const result: { tabId: string; tabLabel: string; subgroup?: string; category: TabCategory }[] = []
  for (const tab of tabs) {
    if (tab.subgroups) {
      for (const sg of tab.subgroups) {
        for (const cat of sg.categories) {
          result.push({ tabId: tab.id, tabLabel: tab.label, subgroup: sg.label, category: cat })
        }
      }
    }
    for (const cat of tab.categories) {
      result.push({ tabId: tab.id, tabLabel: tab.label, category: cat })
    }
  }
  return result
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
  searchPlaceholder = "Search procedures...",
  jumpToLabel = "Jump to",
  noResultsLabel = "No matching procedures found.",
}: CaseTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "face")
  const [search, setSearch] = useState("")
  const [jumpOpen, setJumpOpen] = useState(false)
  const jumpRef = useRef<HTMLDivElement>(null)
  const categoryRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (jumpRef.current && !jumpRef.current.contains(e.target as Node)) {
        setJumpOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const allCategories = useMemo(() => getAllCategories(tabs), [tabs])

  const isSearching = search.trim().length > 0
  const query = search.trim().toLowerCase()

  const filteredCategories = useMemo(() => {
    if (!isSearching) return []
    return allCategories.filter(
      (item) =>
        item.category.title.toLowerCase().includes(query) ||
        item.category.cases.some(
          (c) =>
            c.title.toLowerCase().includes(query) ||
            c.subtitle.toLowerCase().includes(query)
        )
    )
  }, [allCategories, query, isSearching])

  const allTabHeaders = [
    ...tabs.map((t) => ({ id: t.id, label: t.label })),
    ...(skinTab ? [skinTab] : []),
  ]

  const isSkinActive = skinTab && activeTab === skinTab.id
  const activeTabData = tabs.find((t) => t.id === activeTab) ?? tabs[0]

  const scrollToCategory = useCallback((catId: string, tabId: string) => {
    setSearch("")
    setActiveTab(tabId)
    setJumpOpen(false)
    requestAnimationFrame(() => {
      const el = categoryRefs.current.get(catId)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    })
  }, [])

  const setCategoryRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      categoryRefs.current.set(id, el)
    } else {
      categoryRefs.current.delete(id)
    }
  }, [])

  const renderCategory = (category: TabCategory, props: { caseLabel: string; beforeAfterLabel: string; disclaimer: string }) => (
    <div key={category.id} ref={(el) => setCategoryRef(category.id, el)} className="space-y-6 sm:space-y-8 scroll-mt-28">
      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy border-b border-slate-200 pb-4">
          {category.title}
        </h3>
      </div>
      <CaseCarousel
        cases={category.cases}
        caseLabel={props.caseLabel}
        beforeAfterLabel={props.beforeAfterLabel}
        disclaimer={props.disclaimer}
      />
    </div>
  )

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Context Banner — hidden for skin tab and search mode */}
      {!isSkinActive && !isSearching && (
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

      {/* Search + Jump Bar */}
      <div className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Search Bar */}
          <div className="flex items-center gap-3 py-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-9 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy/30 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Jump-to Dropdown */}
            {!isSearching && (
              <div className="relative hidden sm:block" ref={jumpRef}>
                <button
                  onClick={() => setJumpOpen(!jumpOpen)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all",
                    jumpOpen
                      ? "border-brand-navy/30 bg-white text-brand-navy"
                      : "border-slate-200 bg-white text-text-muted hover:text-brand-navy hover:border-brand-navy/20"
                  )}
                >
                  {jumpToLabel}
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", jumpOpen && "rotate-180")} />
                </button>

                {jumpOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 max-h-80 overflow-y-auto bg-white rounded-xl border border-slate-200 shadow-xl z-50 py-2">
                    {tabs.map((tab) => (
                      <div key={tab.id}>
                        <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                          {tab.label}
                        </p>
                        {tab.subgroups?.map((sg) =>
                          sg.categories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => scrollToCategory(cat.id, tab.id)}
                              className="w-full text-left px-4 py-2 text-sm text-text-body hover:bg-slate-50 hover:text-brand-navy transition-colors"
                            >
                              {cat.title}
                              <span className="text-[10px] text-text-muted ml-2">
                                {cat.cases.length}
                              </span>
                            </button>
                          ))
                        )}
                        {tab.categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => scrollToCategory(cat.id, tab.id)}
                            className="w-full text-left px-4 py-2 text-sm text-text-body hover:bg-slate-50 hover:text-brand-navy transition-colors"
                          >
                            {cat.title}
                            <span className="text-[10px] text-text-muted ml-2">
                              {cat.cases.length}
                            </span>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tab Bar — hidden during search */}
          {!isSearching && (
            <nav
              role="tablist"
              className="flex gap-1 overflow-x-auto pb-px -mx-4 px-4 sm:-mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {allTabHeaders.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative px-5 sm:px-6 py-3.5 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200",
                    activeTab === tab.id
                      ? "text-brand-navy"
                      : "text-text-muted hover:text-text-deep"
                  )}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-gold rounded-full" />
                  )}
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Search Results */}
      {isSearching ? (
        <div className="space-y-16 sm:space-y-24">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <p className="text-text-muted">{noResultsLabel}</p>
            </div>
          ) : (
            filteredCategories.map((item) => (
              <div key={item.category.id}>
                <div className="px-4 sm:px-6 max-w-7xl mx-auto mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                    {item.tabLabel}
                    {item.subgroup && ` · ${item.subgroup}`}
                  </span>
                </div>
                {renderCategory(item.category, { caseLabel, beforeAfterLabel, disclaimer })}
              </div>
            ))
          )}
        </div>
      ) : isSkinActive ? (
        skinContent
      ) : activeTabData.subgroups ? (
        <div className="space-y-20 sm:space-y-28">
          {activeTabData.subgroups.map((group) => (
            <div key={group.label} className="space-y-12 sm:space-y-16">
              <div className="px-4 sm:px-6 max-w-7xl mx-auto">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-1">{group.label}</p>
              </div>
              {group.categories.map((category) =>
                renderCategory(category, { caseLabel, beforeAfterLabel, disclaimer })
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-16 sm:space-y-24">
          {activeTabData.categories.map((category) =>
            renderCategory(category, { caseLabel, beforeAfterLabel, disclaimer })
          )}
        </div>
      )}
    </div>
  )
}
