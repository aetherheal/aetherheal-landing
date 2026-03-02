"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface CheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: React.ReactNode
  className?: string
}

export function Checkbox({ checked = false, onChange, label, className }: CheckboxProps) {
  return (
    <label className={cn("flex items-start gap-3 cursor-pointer group", className)}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-200",
          checked
            ? "bg-brand-navy border-brand-navy"
            : "border-slate-300 group-hover:border-brand-navy/50"
        )}
      >
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </button>
      {label && <span className="text-sm text-text-body leading-relaxed">{label}</span>}
    </label>
  )
}
