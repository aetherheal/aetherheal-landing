import { supabaseAdmin } from "@/lib/supabase-admin"
import { corsHeaders, handleCorsOptions } from "@/lib/cors"
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

    return Response.json({ ok: true }, { headers: cors })
  } catch (err) {
    console.error("Waitlist API error:", err instanceof Error ? err.message : "Unknown error")
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500, headers: cors }
    )
  }
}
