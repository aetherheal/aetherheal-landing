import Anthropic from "@anthropic-ai/sdk"
import { Resend } from "resend"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit"
import { corsHeaders, handleCorsOptions } from "@/lib/cors"
import { sanitizeMessage, escapeHtml } from "@/lib/sanitize"

const apiKey = process.env.ANTHROPIC_API_KEY
if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY")
const anthropic = new Anthropic({ apiKey })

const resendKey = process.env.RESEND_API_KEY
if (!resendKey) throw new Error("Missing RESEND_API_KEY")
const resend = new Resend(resendKey)

const CLAUDE_MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-4-20250514"
const INTAKE_NOTIFICATION_EMAIL = process.env.INTAKE_NOTIFICATION_EMAIL || "drjeeju@aetherheal.com"
const API_TIMEOUT_MS = 30_000

// ─────────────────────────────────────────────
// SYSTEM PROMPT — authored by Dr. Jee Hoon Ju
// Do not modify without clinical review.
// ─────────────────────────────────────────────

const SYSTEM_PROMPT = `You are AetherHeal's intake agent for hair transplant consultations.

Your role is to gather patient information so a physician can review the case.
You are NOT a physician. You do not diagnose, recommend, or advise on treatment.

════════════════════════════════════════
LAYER 1 — HARD CONSTRAINTS (never violate)
════════════════════════════════════════

You MUST NEVER:
- Suggest a specific procedure
- Suggest a specific hospital or clinic
- Make any clinical inference or diagnosis
- Tell the patient what they need
- Confirm or deny a patient's self-diagnosis ("I think I need a hair transplant" → do not confirm or deny, structure the stated goal and continue)
- Offer a prognosis or outcome prediction
- Reassure a patient that a symptom is "fine"

ESCALATION — halt immediately and respond ONLY with the escalation message if:
- Patient mentions self-harm or suicidal ideation
- Acute emergency symptoms (chest pain, difficulty breathing, sudden severe bleeding)
- Any situation requiring immediate medical attention

Escalation message:
"This sounds like it may need immediate medical attention. Please contact your local emergency services or go to the nearest hospital right away. AetherHeal is not equipped to handle medical emergencies."

════════════════════════════════════════
LAYER 2 — TASK INSTRUCTIONS
════════════════════════════════════════

SPECIALTY: Hair transplant (current scope)

YOUR GOAL: Gather enough information to produce a structured case file for physician review.

CRITICAL RULE: Ask ONE question at a time. Never ask multiple questions in the same message.

CONVERSATION FLOW — gather in this order:

1. Open question first — what brought them here, in their own words
   Example: "What brings you to consider hair restoration treatment?"

2. Hair loss pattern — where on the scalp, how much coverage lost

3. Progression — has it been stable, gradually worsening, or sudden onset

4. Previous treatments — minoxidil, finasteride, PRP, prior transplant, anything else tried

5. Relevant medical history — thyroid issues, anemia, significant stress events, current medications

6. Age and biological sex

7. Goals and expectations — what outcome are they hoping for

8. Specific concerns or fears about the process or coming to Korea

After 6–8 exchanges, or when you have sufficient information across these areas, produce the case file.

CASE FILE — append at the end of your final message, after the closing message to patient:

---CASE FILE START---
PATIENT GOALS (verbatim): [exact words the patient used to describe their goal]
CLINICAL SUMMARY: [structured summary of hair loss pattern, progression, history]
PREVIOUS TREATMENTS: [list]
MEDICAL HISTORY FLAGS: [anything clinically relevant]
RISK FLAGS: [anything requiring physician attention — medical, psychological, or expectation-related]
MISSING INFORMATION: [questions that weren't answered or information not gathered]
CLARIFYING QUESTIONS FOR PHYSICIAN: [specific things the reviewing physician should ask or verify]
---CASE FILE END---

Closing message to patient (before case file):
"Thank you for sharing this with me. Your information has been organized and a physician will review your case and reach out within 24–48 hours. You don't need to do anything else right now."

════════════════════════════════════════
LAYER 3 — TONE & LANGUAGE
════════════════════════════════════════

- Warm, not clinical
- Match the patient's language level — no medical jargon unless they use it first
- One question, then wait — never rush
- If a patient seems anxious, acknowledge what they said specifically before continuing
- Never use "I understand your concern" as filler
- Be direct but gentle — patients are sharing something personal`

// ─────────────────────────────────────────────
// Case file parser
// ─────────────────────────────────────────────

function parseCaseFile(text: string) {
  const match = text.match(/---CASE FILE START---([\s\S]*?)---CASE FILE END---/)
  if (!match) return null

  const raw = match[1]
  const extract = (label: string) => {
    const re = new RegExp(`${label}:\\s*([^\\n]+(?:\\n(?![A-Z ]+:)[^\\n]*)*)`, "i")
    const value = raw.match(re)?.[1]?.trim() ?? ""
    return value.slice(0, 5000)
  }

  return {
    patientGoals: extract("PATIENT GOALS \\(verbatim\\)"),
    clinicalSummary: extract("CLINICAL SUMMARY"),
    previousTreatments: extract("PREVIOUS TREATMENTS"),
    medicalHistoryFlags: extract("MEDICAL HISTORY FLAGS"),
    riskFlags: extract("RISK FLAGS"),
    missingInfo: extract("MISSING INFORMATION"),
    clarifyingQuestions: extract("CLARIFYING QUESTIONS FOR PHYSICIAN"),
  }
}

// ─────────────────────────────────────────────
// POST /api/intake
// ─────────────────────────────────────────────

export async function OPTIONS(request: Request) {
  return handleCorsOptions(request)
}

export async function POST(request: Request) {
  const cors = corsHeaders(request)

  try {
    const ip = getRateLimitKey(request)
    if (!checkRateLimit(ip, 6, 60_000)) {
      return Response.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429, headers: cors }
      )
    }

    const body = await request.json()
    const { message, sessionId, sessionToken } = body

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required" }, { status: 400, headers: cors })
    }

    const sanitized = sanitizeMessage(message)
    if (sanitized.length === 0) {
      return Response.json({ error: "Message is required" }, { status: 400, headers: cors })
    }

    if (sanitized.length > 3000) {
      return Response.json({ error: "Message too long" }, { status: 400, headers: cors })
    }

    // Get or create session
    let activeSessionId = sessionId
    let activeSessionToken = sessionToken
    let existingMessages: { role: string; content: string }[] = []

    if (!activeSessionId) {
      const newToken = crypto.randomUUID()
      const { data: session, error } = await supabaseAdmin
        .from("intake_sessions")
        .insert({ specialty: "hair-transplant", locale: "en", session_token: newToken })
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
      const { data, error } = await supabaseAdmin
        .from("intake_sessions")
        .select("messages, status")
        .eq("id", activeSessionId)
        .eq("session_token", sessionToken)
        .single()

      if (error || !data) {
        return Response.json({ error: "Invalid session" }, { status: 403, headers: cors })
      }
      if (data.status === "completed") {
        return Response.json(
          { error: "This intake session is already complete." },
          { status: 400, headers: cors }
        )
      }
      existingMessages = data.messages ?? []
    }

    // Build message history
    const history: Anthropic.MessageParam[] = existingMessages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }))
    history.push({ role: "user", content: sanitized })

    // Call Claude with timeout
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS)

    let response: Anthropic.Message
    try {
      response = await anthropic.messages.create(
        {
          model: CLAUDE_MODEL,
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: history,
        },
        { signal: controller.signal }
      )
    } finally {
      clearTimeout(timeout)
    }

    if (!response.content[0] || response.content[0].type !== "text") {
      throw new Error("Unexpected response format from Claude")
    }

    const assistantText = response.content[0].text

    // Check for completed case file
    const caseFile = parseCaseFile(assistantText)
    const isCompleted = !!caseFile

    // Strip case file from patient-facing response
    const patientResponse = assistantText
      .replace(/---CASE FILE START---[\s\S]*?---CASE FILE END---/, "")
      .trim()

    // Update session in Supabase
    const updatedMessages = [
      ...existingMessages,
      { role: "user", content: sanitized },
      { role: "assistant", content: assistantText },
    ]

    await supabaseAdmin
      .from("intake_sessions")
      .update({
        messages: updatedMessages,
        status: isCompleted ? "completed" : "in_progress",
        ...(caseFile && {
          patient_goals: caseFile.patientGoals,
          risk_flags: [caseFile.riskFlags, caseFile.medicalHistoryFlags].filter(Boolean),
          missing_info: [caseFile.missingInfo].filter(Boolean),
          case_summary: [
            caseFile.clinicalSummary,
            caseFile.previousTreatments && `Previous treatments: ${caseFile.previousTreatments}`,
            caseFile.clarifyingQuestions && `Physician questions: ${caseFile.clarifyingQuestions}`,
          ]
            .filter(Boolean)
            .join("\n\n"),
          physician_notified_at: new Date().toISOString(),
        }),
      })
      .eq("id", activeSessionId)

    // Send physician notification email
    if (isCompleted && caseFile) {
      await resend.emails.send({
        from: "AetherHeal Intake <intake@aetherheal.com>",
        to: INTAKE_NOTIFICATION_EMAIL,
        subject: `New Intake Case — Hair Transplant [${activeSessionId.slice(0, 8)}]`,
        html: `
          <h2>New Intake Case Ready for Review</h2>
          <p><strong>Session ID:</strong> ${escapeHtml(activeSessionId)}</p>
          <p><strong>Specialty:</strong> Hair Transplant</p>
          <hr />

          <h3>Patient Goals (verbatim)</h3>
          <blockquote style="border-left: 3px solid #B49250; padding-left: 16px; color: #444;">
            ${escapeHtml(caseFile.patientGoals)}
          </blockquote>

          <h3>Clinical Summary</h3>
          <p>${escapeHtml(caseFile.clinicalSummary)}</p>

          <h3>Previous Treatments</h3>
          <p>${escapeHtml(caseFile.previousTreatments || "None reported")}</p>

          <h3>Medical History Flags</h3>
          <p>${escapeHtml(caseFile.medicalHistoryFlags || "None reported")}</p>

          <h3>Risk Flags</h3>
          <p>${escapeHtml(caseFile.riskFlags || "None")}</p>

          <h3>Missing Information</h3>
          <p>${escapeHtml(caseFile.missingInfo || "None")}</p>

          <h3>Clarifying Questions for Physician</h3>
          <p>${escapeHtml(caseFile.clarifyingQuestions || "None")}</p>

          <hr />
          <p style="color: #888; font-size: 12px;">
            Patient words first. Clinical summary second.<br/>
            AetherHeal Intake System
          </p>
        `,
      })
    }

    return Response.json(
      {
        sessionId: activeSessionId,
        sessionToken: activeSessionToken,
        message: patientResponse,
        completed: isCompleted,
      },
      { headers: cors }
    )
  } catch (err) {
    console.error("Intake API error:", err instanceof Error ? err.message : "Unknown error")
    return Response.json(
      { error: "An error occurred processing your request. Please try again." },
      { status: 500, headers: cors }
    )
  }
}
