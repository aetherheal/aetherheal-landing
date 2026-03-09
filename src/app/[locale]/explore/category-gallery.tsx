"use client"

import { useState, useEffect } from "react"
import { X, Search, Image as ImageIcon } from "lucide-react"

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
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  
  const selectedCategory = categories.find(c => c.id === selectedId)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelectedId(null)
      setIsClosing(false)
    }, 300)
  }

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedId) handleClose()
    }
    if (selectedId) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [selectedId])

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedId(category.id)}
            className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-white p-6 flex flex-col items-center justify-center text-center shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Search className="w-6 h-6 text-brand-gold mb-3 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
            <h3 className="font-serif text-lg text-brand-navy z-10 transition-transform duration-300 group-hover:-translate-y-2">
              {category.title}
            </h3>
          </div>
        ))}
      </div>

      {selectedId && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
            onClick={handleClose}
          />
          
          {/* Modal */}
          <div 
            className={`w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col transition-all duration-300 transform ${isClosing ? "opacity-0 scale-95 translate-y-4" : "opacity-100 scale-100 translate-y-0"}`}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 rounded-full transition-colors z-20 backdrop-blur-md shadow-sm"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="relative aspect-[4/3] sm:aspect-[21/9] w-full bg-slate-100 flex items-center justify-center overflow-hidden">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              
              <div className="relative z-10 text-center flex flex-col items-center p-8">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-6">
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy mb-4">
                  {selectedCategory.title}
                </h3>
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-200/50 border border-slate-200">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    {comingSoonText}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 bg-white border-t border-slate-100">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-text-body leading-relaxed">
                  {modalDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
