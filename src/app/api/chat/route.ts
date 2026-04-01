import Anthropic from "@anthropic-ai/sdk"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit"
import { corsHeaders, handleCorsOptions } from "@/lib/cors"
import { sanitizeMessage } from "@/lib/sanitize"

const apiKey = process.env.ANTHROPIC_API_KEY
if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY")
const anthropic = new Anthropic({ apiKey })

const CLAUDE_MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-4-20250514"

const SYSTEM_PROMPT = `You are AetherHeal's patient consultation assistant. You help international patients who are considering medical care in South Korea.

ABOUT AETHERHEAL:
- AetherHeal is a physician-led, AI-assisted decision infrastructure for high-stake medical care.
- We help patients DECIDE with clarity BEFORE they choose a hospital in Korea.
- Our process: AI structures medical data → an Angel Physician (independent doctor) verifies and advises → patient makes an informed decision → matched with a verified partner hospital.
- We are NOT an agency. We do not push patients toward specific hospitals for commission.
- AetherHeal does NOT provide medical diagnosis or treatment. We provide decision support only.

THE AETHERHEAL PROCESS:
1. Patient submits medical records and concerns
2. AI structures the data into a Decision-Ready Brief
3. An Angel Physician (independent, not affiliated with any hospital) reviews and verifies
4. Patient receives a structured comparison of options
5. If ready, patient is connected to a verified partner hospital
6. At any point, the patient can pause or stop — no pressure

SPECIALTIES AVAILABLE (through partner hospitals):
Hair transplant, plastic surgery (all areas), liposuction/fat repositioning, eye center (presbyopia, cataract, glaucoma, vision correction), stem cell therapy, dermatology/aesthetic medicine, robotic surgery, women's health, pediatric dentistry (orthodontics), adult dentistry, health screening, and more.

TRUST PROTOCOL:
- All partner hospitals go through a 5-step verification
- Angel Physicians are independent — they have no financial relationship with hospitals
- Patients who are not suitable are turned away, not pushed through

YOUR BEHAVIOR:
- Respond in the SAME LANGUAGE the patient writes in. If they write in English, respond in English. If Chinese, respond in Chinese. Match their language exactly.
- Be warm, professional, and reassuring — but never overpromise
- Never provide medical diagnoses or treatment recommendations
- If asked medical questions, explain that you can help them structure their concerns for physician review
- Guide patients toward starting their journey at https://app.aetherheal.com/transition
- For urgent medical matters, advise contacting local emergency services immediately
- Keep responses concise (2-4 paragraphs max) unless the patient asks for detailed information
- When you don't know something specific, say so honestly

IMPORTANT BOUNDARIES:
- You are NOT a doctor. Never act like one.
- Do not guarantee outcomes or success rates
- Do not compare specific hospitals by name unless the patient asks
- Do not discuss pricing specifics — direct them to start the process for personalized quotes
- If someone asks about emergencies, tell them to call local emergency services (not AetherHeal)`

const MAX_MESSAGES_PER_SESSION = 50
const MAX_MESSAGE_LENGTH = 2000
const API_TIMEOUT_MS = 30_000

export async function OPTIONS(request: Request) {
  return handleCorsOptions(request)
}

export async function POST(request: Request) {
  const cors = corsHeaders(request)

  try {
    const ip = getRateLimitKey(request)
    if (!checkRateLimit(ip, 10, 60_000)) {
      return Response.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429, headers: cors }
      )
    }

    const body = await request.json()
    const { message, sessionId, sessionToken, locale = "en" } = body

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required" }, { status: 400, headers: cors })
    }

    const sanitized = sanitizeMessage(message)
    if (sanitized.length === 0) {
      return Response.json({ error: "Message is required" }, { status: 400, headers: cors })
    }

    if (sanitized.length > MAX_MESSAGE_LENGTH) {
      return Response.json(
        { error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)` },
        { status: 400, headers: cors }
      )
    }

    let activeSessionId = sessionId
    let activeSessionToken = sessionToken

    if (!activeSessionId) {
      const newToken = crypto.randomUUID()
      const { data: session, error } = await supabaseAdmin
        .from("chat_sessions")
        .insert({ locale, session_token: newToken })
        .select("id")
        .single()

      if (error) throw error
      activeSessionId = session.id
      activeSessionToken = newToken
    } else {
      // Validate session ownership
      if (!sessionToken) {
        return Response.json({ error: "Session token required" }, { status: 401, headers: cors })
      }
      const { data: session, error } = await supabaseAdmin
        .from("chat_sessions")
        .select("id")
        .eq("id", activeSessionId)
        .eq("session_token", sessionToken)
        .single()

      if (error || !session) {
        return Response.json({ error: "Invalid session" }, { status: 403, headers: cors })
      }
    }

    const { data: existingMessages, error: fetchError } = await supabaseAdmin
      .from("chat_messages")
      .select("role, content")
      .eq("session_id", activeSessionId)
      .order("created_at", { ascending: true })
      .limit(MAX_MESSAGES_PER_SESSION)

    if (fetchError) throw fetchError

    if (existingMessages && existingMessages.length >= MAX_MESSAGES_PER_SESSION) {
      return Response.json(
        { error: "Session message limit reached. Please start a new conversation." },
        { status: 429, headers: cors }
      )
    }

    const history: Anthropic.MessageParam[] = (existingMessages ?? []).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }))

    history.push({ role: "user", content: sanitized })

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS)

    const stream = anthropic.messages.stream(
      {
        model: CLAUDE_MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: history,
      },
      { signal: controller.signal }
    )

    let fullResponse = ""

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(ctrl) {
        try {
          ctrl.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ sessionId: activeSessionId, sessionToken: activeSessionToken })}\n\n`
            )
          )

          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              fullResponse += event.delta.text
              ctrl.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              )
            }
          }

          await supabaseAdmin.from("chat_messages").insert([
            { session_id: activeSessionId, role: "user", content: sanitized },
            { session_id: activeSessionId, role: "assistant", content: fullResponse },
          ])

          ctrl.enqueue(encoder.encode("data: [DONE]\n\n"))
          ctrl.close()
        } catch (err) {
          const errMsg =
            err instanceof Error && err.name === "AbortError"
              ? "Request timed out"
              : err instanceof Error
                ? err.message
                : "Stream error"
          ctrl.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: errMsg })}\n\n`)
          )
          ctrl.close()
        } finally {
          clearTimeout(timeout)
        }
      },
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        ...cors,
      },
    })
  } catch (err) {
    console.error("Chat API error:", err instanceof Error ? err.message : "Unknown error")
    return Response.json(
      { error: "An error occurred processing your request. Please try again." },
      { status: 500, headers: cors }
    )
  }
}
