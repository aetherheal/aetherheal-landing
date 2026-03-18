"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatWidgetProps {
  locale: string
}

interface Message {
  role: "user" | "assistant"
  content: string
}

const GREETING: Record<string, string> = {
  en: "Hello! I'm AetherHeal's consultation assistant. How can I help you today?",
  zh: "您好！我是 AetherHeal 的咨询助手。请问有什么可以帮您的吗？",
  ja: "こんにちは！AetherHealの相談アシスタントです。どのようなご質問がありますか？",
  th: "สวัสดีค่ะ! ดิฉันเป็นผู้ช่วยให้คำปรึกษาของ AetherHeal ยินดีให้บริการค่ะ",
  ru: "Здравствуйте! Я консультант AetherHeal. Чем могу помочь?",
}

const PLACEHOLDER: Record<string, string> = {
  en: "Ask about medical care in Korea...",
  zh: "咨询韩国医疗服务...",
  ja: "韓国での医療についてお気軽にどうぞ...",
  th: "สอบถามเกี่ยวกับการรักษาในเกาหลี...",
  ru: "Спросите о медицине в Корее...",
}

export function ChatWidget({ locale }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("aetherheal-chat-session")
    if (stored) setSessionId(stored)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    if (messages.length === 0) {
      const greeting = GREETING[locale] || GREETING.en
      setMessages([{ role: "assistant", content: greeting }])
    }
  }, [locale, messages.length])

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMsg: Message = { role: "user", content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          sessionId,
          locale,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Request failed")
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error("No response stream")

      const decoder = new TextDecoder()
      let assistantContent = ""
      setMessages((prev) => [...prev, { role: "assistant", content: "" }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          const data = line.slice(6)

          if (data === "[DONE]") break

          try {
            const parsed = JSON.parse(data)

            if (parsed.sessionId && !sessionId) {
              setSessionId(parsed.sessionId)
              sessionStorage.setItem("aetherheal-chat-session", parsed.sessionId)
            }

            if (parsed.text) {
              assistantContent += parsed.text
              const content = assistantContent
              setMessages((prev) => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: "assistant", content }
                return updated
              })
            }

            if (parsed.error) {
              throw new Error(parsed.error)
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      setMessages((prev) => [...prev, { role: "assistant", content: `⚠ ${errorMsg}` }])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, sessionId, locale])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
      }
    },
    [sendMessage]
  )

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-navy text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col bg-white shadow-2xl border border-slate-200 overflow-hidden",
        "bottom-0 right-0 w-full h-full",
        "md:bottom-6 md:right-6 md:w-[400px] md:h-[600px] md:max-h-[80vh] md:rounded-2xl"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-brand-navy text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-brand-gold" />
          </div>
          <div>
            <p className="text-sm font-semibold">AetherHeal</p>
            <p className="text-[11px] text-slate-300">Consultation Assistant</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          aria-label="Close chat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50/50">
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
                "max-w-[85%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                msg.role === "user"
                  ? "bg-brand-navy text-white rounded-2xl rounded-br-md"
                  : "bg-white text-text-body border border-slate-200 rounded-2xl rounded-bl-md shadow-sm"
              )}
            >
              {msg.content || (
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <Loader2 className="w-3 h-3 animate-spin" />
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={PLACEHOLDER[locale] || PLACEHOLDER.en}
            rows={1}
            className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-text-body placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy/30 transition-all"
            style={{ maxHeight: "120px" }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = "auto"
              target.style.height = `${Math.min(target.scrollHeight, 120)}px`
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all",
              input.trim() && !isLoading
                ? "bg-brand-navy text-white hover:bg-brand-navy/90"
                : "bg-slate-100 text-slate-300 cursor-not-allowed"
            )}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-2">
          AI assistant — not medical advice
        </p>
      </div>
    </div>
  )
}
