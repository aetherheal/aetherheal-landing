import type { Locale } from "./config"

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  zh: () => import("./dictionaries/zh.json").then((m) => m.default),
  ja: () => import("./dictionaries/ja.json").then((m) => m.default),
  th: () => import("./dictionaries/th.json").then((m) => m.default),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default),
  ko: () => import("./dictionaries/ko.json").then((m) => m.default),
}

type EnDictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>
type KoDictionary = Awaited<ReturnType<(typeof dictionaries)["ko"]>>

export type Dictionary = EnDictionary & KoDictionary

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]() as Promise<Dictionary>
