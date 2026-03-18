import Anthropic from "@anthropic-ai/sdk"
import { supabaseAdmin } from "@/lib/supabase-admin"

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, sessionId, locale = "en" } = body

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return Response.json(
        { error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)` },
        { status: 400 }
      )
    }

    let activeSessionId = sessionId

    if (!activeSessionId) {
      const { data: session, error } = await supabaseAdmin
        .from("chat_sessions")
        .insert({ locale })
        .select("id")
        .single()

      if (error) throw error
      activeSessionId = session.id
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
        { status: 429 }
      )
    }

    const history: Anthropic.MessageParam[] = (existingMessages ?? []).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }))

    history.push({ role: "user", content: message })

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: history,
    })

    let fullResponse = ""

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ sessionId: activeSessionId })}\n\n`)
          )

          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              fullResponse += event.delta.text
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              )
            }
          }

          await supabaseAdmin.from("chat_messages").insert([
            { session_id: activeSessionId, role: "user", content: message },
            { session_id: activeSessionId, role: "assistant", content: fullResponse },
          ])

          controller.enqueue(encoder.encode("data: [DONE]\n\n"))
          controller.close()
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : "Stream error"
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: errMsg })}\n\n`)
          )
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (err) {
    console.error("Chat API error:", err)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
