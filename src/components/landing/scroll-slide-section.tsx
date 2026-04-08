"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"

interface ScrollSlideSectionProps {
  panelA: ReactNode
  panelB: ReactNode
}

export function ScrollSlideSection({ panelA, panelB }: ScrollSlideSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let ticking = false

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (!wrapper) { ticking = false; return }
        const rect = wrapper.getBoundingClientRect()
        const wrapperHeight = wrapper.offsetHeight
        const viewportHeight = window.innerHeight
        const scrollableDistance = wrapperHeight - viewportHeight

        if (scrollableDistance <= 0) {
          setProgress(0)
          ticking = false
          return
        }

        const scrolled = -rect.top
        const raw = Math.max(0, Math.min(1, scrolled / scrollableDistance))
        setProgress(raw)
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const translateX = (1 - progress) * 100

  return (
    <div ref={wrapperRef} className="hidden md:block relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-brand-navy">
          <div className="h-full w-full flex items-center justify-center">
            {panelA}
          </div>
        </div>

        <div
          className="absolute inset-0 bg-brand-navy will-change-transform"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          <div className="h-full w-full flex items-center justify-center">
            {panelB}
          </div>
        </div>
      </div>
    </div>
  )
}
