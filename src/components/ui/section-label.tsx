import { cn } from "@/lib/utils"

const colors = {
  default: "text-brand-navy",
  gold: "text-brand-gold",
  muted: "text-text-muted",
}

interface SectionLabelProps {
  children: React.ReactNode
  color?: keyof typeof colors
  className?: string
}

export function SectionLabel({ children, color = "default", className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "text-[10px] uppercase tracking-widest font-bold",
        colors[color],
        className
      )}
    >
      {children}
    </span>
  )
}
