import Image from "next/image"
import { cn } from "@/lib/utils"

const sizes = {
  sm: { wrapper: "h-6", width: 100, height: 22 },
  md: { wrapper: "h-8", width: 140, height: 29 },
  lg: { wrapper: "h-11", width: 180, height: 37 },
}

interface LogoProps {
  size?: keyof typeof sizes
  theme?: "light" | "dark"
  className?: string
}

export function Logo({ size = "md", theme = "light", className }: LogoProps) {
  const s = sizes[size]
  return (
    <a href="/" className={cn("flex items-center group", className)}>
      <div className={cn("relative flex items-center justify-start", s.wrapper)}>
        <Image
          src="/assets/logo.png"
          alt="AetherHeal Logo"
          width={s.width}
          height={s.height}
          className={cn("object-contain", theme === "dark" && "invert")}
          style={{ width: "auto", height: "100%" }}
          priority
        />
      </div>
    </a>
  )
}
