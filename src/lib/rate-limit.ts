const store = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  key: string,
  limit = 10,
  windowMs = 60_000
): boolean {
  const now = Date.now()
  const record = store.get(key)

  if (!record || now > record.resetTime) {
    store.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count < limit) {
    record.count++
    return true
  }

  return false
}

export function getRateLimitKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  )
}
