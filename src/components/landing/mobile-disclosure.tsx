"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface MobileDisclosureProps {
  buttonLabel: string
  variant?: "light" | "dark"
  children: React.ReactNode
  className?: string
}

export function MobileDisclosure({ buttonLabel, variant = "light", children, className }: MobileDisclosureProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop: always visible */}
      <div className={cn("hidden md:block", className)}>{children}</div>

      {/* Mobile: toggle */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "w-full flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold shadow-sm transition-colors",
            variant === "dark"
              ? "border-white/20 bg-white/10 text-white active:bg-white/20"
              : "border-slate-200 bg-white text-brand-navy active:bg-slate-50"
          )}
        >
          {buttonLabel}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </button>
        <div
          className={cn(
            "transition-all duration-500 ease-in-out overflow-hidden",
            open ? "max-h-[3000px] opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          {children}
        </div>
      </div>
    </>
  )
}
