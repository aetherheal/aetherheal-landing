import { cn } from "@/lib/utils"

type AccentColor = "gold" | "navy" | "danger" | "muted"

const accentClasses: Record<AccentColor, string> = {
  gold: "border-l-4 border-l-brand-gold",
  navy: "border-l-4 border-l-brand-navy",
  danger: "border-l-4 border-l-danger",
  muted: "border-l-4 border-l-border-light",
}

interface CardProps {
  children: React.ReactNode
  className?: string
  accent?: AccentColor
}

export function Card({ children, className, accent }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-border-light shadow-card p-6",
        accent && accentClasses[accent],
        className
      )}
    >
      {children}
    </div>
  )
}
