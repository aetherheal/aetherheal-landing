"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div
            key={item.id}
            className="border border-border-light rounded-xl overflow-hidden bg-white"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="text-sm font-semibold text-text-deep pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-text-muted shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "transition-all duration-[400ms] ease-in-out overflow-hidden",
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-5 pb-5 text-sm text-text-body leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
