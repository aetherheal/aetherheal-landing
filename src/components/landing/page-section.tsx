import type { LucideIcon } from "lucide-react"

interface PageSectionProps {
  children: React.ReactNode
  bg?: "white" | "light" | "navy"
  border?: boolean
  className?: string
}

export function PageSection({ children, bg = "white", border = true, className = "" }: PageSectionProps) {
  const bgClass = bg === "navy" ? "bg-brand-navy" : bg === "light" ? "bg-bg-light" : "bg-white"
  const borderClass = border ? "border-b border-slate-100" : ""

  return (
    <section className={`w-full py-20 sm:py-28 px-4 sm:px-6 ${bgClass} ${borderClass} ${className}`}>
      {children}
    </section>
  )
}
