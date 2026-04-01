const ALLOWED_ORIGINS = [
  "https://aetherheal.com",
  "https://www.aetherheal.com",
  "https://app.aetherheal.com",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000", "http://localhost:3021"] : []),
]

export function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin") || ""

  if (ALLOWED_ORIGINS.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    }
  }

  return {}
}

export function handleCorsOptions(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request),
  })
}
