"use client"

import { useState, type FormEvent } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, Loader2 } from "lucide-react"

interface WaitlistFormProps {
  placeholder: string
  buttonLabel: string
  successMessage: string
  duplicateMessage: string
  locale: string
  variant?: "light" | "dark"
}

type Status = "idle" | "loading" | "success" | "duplicate"

export function WaitlistForm({
  placeholder,
  buttonLabel,
  successMessage,
  duplicateMessage,
  locale,
  variant = "light",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || status === "loading") return

    setStatus("loading")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), locale }),
      })

      if (res.ok) {
        setStatus("success")
      } else if (res.status === 409) {
        setStatus("duplicate")
      } else {
        setStatus("idle")
      }
    } catch {
      setStatus("idle")
    }
  }

  if (status === "success" || status === "duplicate") {
    return (
      <div className="flex items-center justify-center gap-2 py-3">
        <CheckCircle2
          className={cn(
            "w-5 h-5 shrink-0",
            variant === "dark" ? "text-brand-gold" : "text-emerald-500"
          )}
        />
        <p
          className={cn(
            "text-sm font-medium",
            variant === "dark" ? "text-white" : "text-brand-navy"
          )}
        >
          {status === "success" ? successMessage : duplicateMessage}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all",
          variant === "dark"
            ? "bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
            : "bg-white border border-slate-200 text-brand-navy placeholder:text-slate-400 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold shadow-sm"
        )}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "rounded-xl px-6 py-3 text-sm font-semibold transition-all shrink-0 flex items-center justify-center gap-2",
          variant === "dark"
            ? "bg-brand-gold text-brand-navy hover:bg-brand-gold/90 disabled:opacity-60"
            : "bg-brand-navy text-white hover:bg-brand-navy/90 disabled:opacity-60"
        )}
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          buttonLabel
        )}
      </button>
    </form>
  )
}
