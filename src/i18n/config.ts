export const locales = ["en", "zh", "ja", "th", "ru", "ko"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export const patientLocales = ["en", "zh", "ja", "th", "ru"] as const
export type PatientLocale = (typeof patientLocales)[number]

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語",
  th: "ภาษาไทย",
  ru: "Русский",
  ko: "한국어",
}

export const localeShort: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  ja: "JP",
  th: "TH",
  ru: "RU",
  ko: "KO",
}

export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
  th: "th_TH",
  ru: "ru_RU",
  ko: "ko_KR",
}
