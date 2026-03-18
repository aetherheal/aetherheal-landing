import Anthropic from "@anthropic-ai/sdk"
import { Resend } from "resend"
import { supabaseAdmin } from "@/lib/supabase-admin"

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
const resend = new Resend(process.env.RESEND_API_KEY!)

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
    return raw.match(re)?.[1]?.trim() ?? ""
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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, sessionId } = body

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    if (message.length > 3000) {
      return Response.json({ error: "Message too long" }, { status: 400 })
    }

    // Get or create session
    let activeSessionId = sessionId
    let existingMessages: { role: string; content: string }[] = []

    if (!activeSessionId) {
      const { data: session, error } = await supabaseAdmin
        .from("intake_sessions")
        .insert({ specialty: "hair-transplant", locale: "en" })
        .select("id")
        .single()

      if (error) throw error
      activeSessionId = session.id
    } else {
      const { data, error } = await supabaseAdmin
        .from("intake_sessions")
        .select("messages, status")
        .eq("id", activeSessionId)
        .single()

      if (error) throw error
      if (data.status === "completed") {
        return Response.json(
          { error: "This intake session is already complete." },
          { status: 400 }
        )
      }
      existingMessages = data.messages ?? []
    }

    // Build message history
    const history: Anthropic.MessageParam[] = existingMessages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }))
    history.push({ role: "user", content: message })

    // Call Claude
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: history,
    })

    const assistantText =
      response.content[0].type === "text" ? response.content[0].text : ""

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
      { role: "user", content: message },
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
        to: "drjeeju@aetherheal.com",
        subject: `New Intake Case — Hair Transplant [${activeSessionId.slice(0, 8)}]`,
        html: `
          <h2>New Intake Case Ready for Review</h2>
          <p><strong>Session ID:</strong> ${activeSessionId}</p>
          <p><strong>Specialty:</strong> Hair Transplant</p>
          <hr />

          <h3>Patient Goals (verbatim)</h3>
          <blockquote style="border-left: 3px solid #B49250; padding-left: 16px; color: #444;">
            ${caseFile.patientGoals}
          </blockquote>

          <h3>Clinical Summary</h3>
          <p>${caseFile.clinicalSummary}</p>

          <h3>Previous Treatments</h3>
          <p>${caseFile.previousTreatments || "None reported"}</p>

          <h3>Medical History Flags</h3>
          <p>${caseFile.medicalHistoryFlags || "None reported"}</p>

          <h3>Risk Flags</h3>
          <p>${caseFile.riskFlags || "None"}</p>

          <h3>Missing Information</h3>
          <p>${caseFile.missingInfo || "None"}</p>

          <h3>Clarifying Questions for Physician</h3>
          <p>${caseFile.clarifyingQuestions || "None"}</p>

          <hr />
          <p style="color: #888; font-size: 12px;">
            Patient words first. Clinical summary second.<br/>
            AetherHeal Intake System
          </p>
        `,
      })
    }

    return Response.json({
      sessionId: activeSessionId,
      message: patientResponse,
      completed: isCompleted,
    })
  } catch (err) {
    console.error("Intake API error:", err)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
