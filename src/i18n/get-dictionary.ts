import type { Locale } from "./config"

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  zh: () => import("./dictionaries/zh.json").then((m) => m.default),
  ja: () => import("./dictionaries/ja.json").then((m) => m.default),
  th: () => import("./dictionaries/th.json").then((m) => m.default),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
