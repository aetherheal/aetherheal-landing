export const locales = ["en", "zh", "ja", "th", "ru"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語",
  th: "ภาษาไทย",
  ru: "Русский",
}

export const localeShort: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  ja: "JP",
  th: "TH",
  ru: "RU",
}

export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
  th: "th_TH",
  ru: "ru_RU",
}
