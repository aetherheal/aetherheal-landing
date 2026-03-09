"use client"

import { Image as ImageIcon, ChevronRight, ChevronLeft } from "lucide-react"
import { useRef } from "react"

type Category = {
  id: string
  title: string
}

interface CategoryGalleryProps {
  categories: Category[]
  comingSoonText: string
  modalDescription: string
}

export function CategoryGallery({ categories, comingSoonText, modalDescription }: CategoryGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      // Scroll by roughly the width of one card + gap
      const scrollAmount = direction === "left" ? -350 : 350
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative group w-full">
      {/* Scroll Buttons (Desktop) */}
      <button 
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-4 top-[40%] -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 bg-white border border-slate-200 rounded-full items-center justify-center shadow-md text-slate-600 hover:text-brand-navy hover:scale-105 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-4 top-[40%] -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 bg-white border border-slate-200 rounded-full items-center justify-center shadow-md text-slate-600 hover:text-brand-navy hover:scale-105 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-5 sm:gap-6 pb-12 -mx-4 px-4 sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {categories.map((category, index) => (
          <div 
            key={category.id}
            className="snap-center shrink-0 w-[85vw] sm:w-[360px] md:w-[400px] flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group/card"
          >
            {/* Image Placeholder */}
            <div className="relative aspect-[4/3] bg-slate-50 flex flex-col items-center justify-center p-6 border-b border-slate-100 overflow-hidden group-hover/card:bg-slate-100 transition-colors duration-500">
              <div className="absolute inset-0 opacity-40 transition-transform duration-700 group-hover/card:scale-105" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <div className="relative z-10 flex flex-col items-center transform transition-transform duration-500 group-hover/card:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
                  <ImageIcon className="w-6 h-6 text-slate-300" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 bg-white/80 px-4 py-1.5 rounded-full backdrop-blur-sm border border-slate-200/50 shadow-sm">
                  {comingSoonText}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 sm:p-8 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Category</span>
              </div>
              <h3 className="font-serif text-2xl text-brand-navy mb-3 transition-colors group-hover/card:text-brand-gold">
                {category.title}
              </h3>
              <p className="text-sm text-text-body leading-relaxed line-clamp-4">
                {modalDescription}
              </p>
            </div>
          </div>
        ))}
        {/* Spacer for right padding on scroll end */}
        <div className="shrink-0 w-1 sm:w-2" />
      </div>
    </div>
  )
}
