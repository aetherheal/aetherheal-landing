export const locales = ["en", "zh", "ja", "th", "ru", "ar", "hu", "de", "fr", "ko"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export const patientLocales = ["en", "zh", "ja", "th", "ru", "ar", "hu", "de", "fr"] as const
export type PatientLocale = (typeof patientLocales)[number]

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語",
  th: "ภาษาไทย",
  ru: "Русский",
  ar: "العربية",
  hu: "Magyar",
  de: "Deutsch",
  fr: "Français",
  ko: "한국어",
}

export const localeShort: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  ja: "JP",
  th: "TH",
  ru: "RU",
  ar: "AR",
  hu: "HU",
  de: "DE",
  fr: "FR",
  ko: "KO",
}

export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
  th: "th_TH",
  ru: "ru_RU",
  ar: "ar_SA",
  hu: "hu_HU",
  de: "de_DE",
  fr: "fr_FR",
  ko: "ko_KR",
}

const koOnlyRoutes = ["/for-partners", "/for-investors", "/for-team"]

const patientOnlyRoutes = [
  "/how-it-works",
  "/explore",
  "/trust-protocol",
  "/blog",
  "/how-to-choose-hospital-abroad",
  "/aesthetic-clinic-seoul",
  "/hair-transplant-korea",
  "/plastic-surgery-korea",
  "/medical-journey",
  "/medical-boundary",
  "/privacy-policy",
  "/terms-of-service",
  "/payment-refund-policy",
  "/journey-assurance",
  "/marketing-information",
  "/doctors/dr-jee-hoon-ju",
]

export function isRouteAvailableForLocale(path: string, locale: Locale): boolean {
  const normalized = path.startsWith("/") ? path : `/${path}`
  const segment = `/${normalized.split("/").filter(Boolean)[0] ?? ""}`

  if (segment === "/") return true

  if (koOnlyRoutes.includes(segment)) return locale === "ko"
  if (patientOnlyRoutes.some((r) => segment.startsWith(r))) {
    return (patientLocales as readonly string[]).includes(locale)
  }

  return true
}
