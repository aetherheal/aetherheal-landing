import { cn } from "@/lib/utils"

const sizes = {
  sm: { circle: "w-7 h-7 text-sm", text: "text-lg" },
  md: { circle: "w-9 h-9 text-lg", text: "text-xl" },
  lg: { circle: "w-11 h-11 text-xl", text: "text-2xl" },
}

interface LogoProps {
  size?: keyof typeof sizes
  theme?: "light" | "dark"
  className?: string
}

export function Logo({ size = "md", theme = "light", className }: LogoProps) {
  const s = sizes[size]
  const textColor = theme === "dark" ? "text-white" : "text-text-deep"

  return (
    <a href="/" className={cn("flex items-center gap-2 group", className)}>
      <div
        className={cn(
          "rounded-full border-2 border-brand-gold flex items-center justify-center bg-brand-navy text-brand-gold font-serif pt-0.5 shadow-sm",
          s.circle
        )}
      >
        A
      </div>
      <span className={cn("font-serif tracking-wide font-bold", s.text, textColor)}>
        AetherHeal
      </span>
    </a>
  )
}
