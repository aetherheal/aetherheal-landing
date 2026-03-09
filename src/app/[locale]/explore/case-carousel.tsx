"use client"

import { Image as ImageIcon, ChevronRight, ChevronLeft } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"

export type CaseItem = {
  id: string
  number: string
  title: string
  subtitle: string
  image?: string
  alt?: string
  isPlaceholder?: boolean
}

interface CaseCarouselProps {
  cases: CaseItem[]
  caseLabel: string
  beforeAfterLabel?: string
  disclaimer?: string
  comingSoonText?: string
  placeholderDescription?: string
}

export function CaseCarousel({ 
  cases, 
  caseLabel, 
  beforeAfterLabel, 
  disclaimer,
  comingSoonText,
  placeholderDescription 
}: CaseCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -400 : 400
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative group w-full">
      <button 
        onClick={() => scroll("left")}
        className="hidden md:flex absolute -left-6 top-[35%] -translate-y-1/2 z-10 w-12 h-12 bg-white border border-slate-200 rounded-full items-center justify-center shadow-md text-slate-600 hover:text-brand-navy hover:scale-105 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => scroll("right")}
        className="hidden md:flex absolute -right-6 top-[35%] -translate-y-1/2 z-10 w-12 h-12 bg-white border border-slate-200 rounded-full items-center justify-center shadow-md text-slate-600 hover:text-brand-navy hover:scale-105 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 sm:gap-8 pb-8 px-4 sm:px-6 xl:px-[calc((100vw-80rem)/2)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {cases.map((cs) => (
          <div 
            key={cs.id}
            className="snap-center shrink-0 w-[85vw] sm:w-[450px] lg:w-[500px] flex flex-col space-y-5"
          >
            {/* Image Container */}
            {cs.isPlaceholder ? (
              <div className="relative aspect-[4/3] w-full bg-white flex flex-col items-center justify-center rounded-2xl border border-slate-200 overflow-hidden group-hover:bg-slate-50 transition-colors duration-500 shadow-sm">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
                    <ImageIcon className="w-6 h-6 text-slate-300" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 bg-white/80 px-4 py-1.5 rounded-full backdrop-blur-sm border border-slate-200/50 shadow-sm">
                    {comingSoonText}
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-transform duration-700 ease-out hover:scale-[1.02]">
                {cs.image && <Image src={cs.image} alt={cs.alt || cs.title} fill className="object-contain" sizes="(min-width: 1024px) 500px, 85vw" />}
              </div>
            )}
            
            {/* Caption */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-t border-slate-200 pt-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">{caseLabel} {cs.number}</span>
                  {(!cs.isPlaceholder && beforeAfterLabel) && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{beforeAfterLabel}</span>
                    </>
                  )}
                </div>
                <h3 className="font-serif text-2xl text-brand-navy">{cs.title}</h3>
                <p className="text-sm text-text-body max-w-sm">
                  {cs.isPlaceholder ? placeholderDescription : cs.subtitle}
                </p>
              </div>
              {disclaimer && !cs.isPlaceholder && (
                <p className="text-xs text-text-muted italic max-w-[200px] text-left sm:text-right mt-1">
                  {disclaimer}
                </p>
              )}
            </div>
          </div>
        ))}
        <div className="shrink-0 w-1 sm:w-2" />
      </div>
    </div>
  )
}
