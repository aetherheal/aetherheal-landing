"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
}

const OPENING_MESSAGE =
  "Hello. I'm AetherHeal's intake assistant. I'm here to help organize your information before a physician reviews your case.\n\nTo start — what brings you to consider hair restoration treatment?"

export default function IntakePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: OPENING_MESSAGE },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading || completed) return

    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: text }])
    setLoading(true)

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      })

      const data = await res.json()

      if (data.sessionId && !sessionId) setSessionId(data.sessionId)

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message ?? "Something went wrong. Please try again.",
        },
      ])

      if (data.completed) setCompleted(true)
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "There was a connection error. Please try again." },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-bg-light overflow-hidden">
      {/* Top label */}
      <div className="w-full border-b border-slate-200 bg-white px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
          <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
            Initial Consultation · Hair Transplant
          </span>
        </div>
      </div>

      {/* Messages — scrollable */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-5">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-brand-navy text-white rounded-br-sm"
                    : "bg-white border border-slate-200 text-text-body rounded-bl-sm shadow-sm"
                )}
              >
                {msg.content.split("\n").map((line, j) => (
                  <p key={j} className={j > 0 && line ? "mt-2" : j > 0 ? "mt-1" : ""}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input — pinned to bottom */}
      <div className="border-t border-slate-200 bg-white px-4 py-4">
        <div className="max-w-2xl mx-auto">
          {completed ? (
            <div className="text-center py-2">
              <p className="text-sm text-text-muted font-medium">
                Your intake is complete. A physician will be in touch within 24–48 hours.
              </p>
            </div>
          ) : (
            <div className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type your message…"
                rows={2}
                className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-text-body placeholder:text-slate-400 focus:outline-none focus:border-brand-navy/30 focus:bg-white transition-colors"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-navy/90 transition-colors shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
          <p className="text-[10px] text-text-muted text-center mt-2">
            Not a medical consultation. Information is reviewed by a physician before any response.
          </p>
        </div>
      </div>
    </div>
  )
}
