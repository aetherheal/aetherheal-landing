import { supabaseAdmin } from "@/lib/supabase-admin"
import { corsHeaders, handleCorsOptions } from "@/lib/cors"
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit"
import { Resend } from "resend"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const resendKey = process.env.RESEND_API_KEY
const resend = resendKey ? new Resend(resendKey) : null
const ADMIN_EMAIL = process.env.INTAKE_NOTIFICATION_EMAIL || "drjeeju@aetherheal.com"

export async function OPTIONS(request: Request) {
  return handleCorsOptions(request)
}

export async function POST(request: Request) {
  const cors = corsHeaders(request)

  try {
    const ip = getRateLimitKey(request)
    if (!checkRateLimit(ip, 5, 60_000)) {
      return Response.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429, headers: cors }
      )
    }

    const body = await request.json()
    const { email, locale } = body

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return Response.json(
        { error: "Valid email address required." },
        { status: 400, headers: cors }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    const { error } = await supabaseAdmin
      .from("waitlist")
      .insert({ email: normalizedEmail, locale: locale || "en" })

    if (error) {
      if (error.code === "23505") {
        return Response.json(
          { error: "duplicate" },
          { status: 409, headers: cors }
        )
      }
      throw error
    }

    if (resend) {
      const { count } = await supabaseAdmin
        .from("waitlist")
        .select("*", { count: "exact", head: true })
      const position = count ?? 0

      try {
        await Promise.all([
          resend.emails.send({
            from: "AetherHeal <waitlist@no-reply.aetherheal.com>",
            to: normalizedEmail,
            subject: "You're on the AetherHeal waitlist",
            html: subscriberEmailHtml(position),
          }),
          resend.emails.send({
            from: "AetherHeal Waitlist <waitlist@no-reply.aetherheal.com>",
            to: ADMIN_EMAIL,
            subject: `Waitlist #${position} — ${normalizedEmail}`,
            html: adminEmailHtml(normalizedEmail, locale || "en", position),
          }),
        ])
      } catch (emailErr) {
        console.error("Waitlist email error:", emailErr instanceof Error ? emailErr.message : emailErr)
      }
    }

    return Response.json({ ok: true }, { headers: cors })
  } catch (err) {
    console.error("Waitlist API error:", err instanceof Error ? err.message : "Unknown error")
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500, headers: cors }
    )
  }
}

function subscriberEmailHtml(position: number) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:40px 20px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
  <div style="background:#0c1526;padding:36px 28px;text-align:center;">
    <h1 style="margin:0;color:#B49250;font-size:14px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">AetherHeal</h1>
  </div>
  <div style="padding:32px 28px;">
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.8;">
      Every year, thousands of patients travel to Korea for medical procedures. Most of them navigate the process alone — relying on agency commissions disguised as discounts, language barriers that hide what matters, and marketing that sounds clinical but isn't.
    </p>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.8;">
      We started AetherHeal because we saw this firsthand. Patients deserve to know exactly what they're paying for, who is actually performing their procedure, and what the realistic outcomes look like — before they book a flight.
    </p>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.8;">
      That's what we're building: a physician-led concierge that removes the guesswork. Direct access to the doctor. Transparent pricing. No middlemen taking a cut from your care.
    </p>
    <p style="margin:0 0 24px;color:#334155;font-size:15px;line-height:1.8;">
      You're <strong>#${position}</strong> on the waitlist. We'll be in touch before our September 2026 launch.
    </p>
    <p style="margin:0;color:#64748b;font-size:14px;line-height:1.7;">
      — Dr. Jee Hoon Ju<br>
      <span style="font-size:13px;">Founder, AetherHeal</span>
    </p>
  </div>
</div>
</body></html>`
}

function adminEmailHtml(email: string, locale: string, position: number) {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC"
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:40px 20px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
  <div style="background:#0c1526;padding:24px 28px;">
    <h2 style="margin:0;color:#B49250;font-size:16px;font-weight:700;">🔔 New Waitlist Signup — #${position}</h2>
  </div>
  <div style="padding:24px 28px;">
    <table style="width:100%;font-size:14px;color:#334155;">
      <tr><td style="padding:8px 0;color:#94a3b8;width:80px;">Email</td><td style="padding:8px 0;font-weight:600;"><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#94a3b8;">Locale</td><td style="padding:8px 0;">${locale.toUpperCase()}</td></tr>
      <tr><td style="padding:8px 0;color:#94a3b8;">Position</td><td style="padding:8px 0;font-weight:600;">#${position}</td></tr>
      <tr><td style="padding:8px 0;color:#94a3b8;">Time</td><td style="padding:8px 0;">${now}</td></tr>
    </table>
  </div>
</div>
</body></html>`
}
