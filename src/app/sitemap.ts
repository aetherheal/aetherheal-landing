import type { MetadataRoute } from "next"
import { locales, patientLocales, type Locale } from "@/i18n/config"
import { getAllPosts } from "@/lib/blog"

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://aetherheal.com"

const koOnlyRoutes = ["/for-partners", "/for-investors", "/for-team"]

const patientOnlyRoutes = [
  "/how-it-works",
  "/explore",
  "/trust-protocol",
  "/intake",
  "/how-to-choose-hospital-abroad",
  "/aesthetic-clinic-seoul",
  "/hair-transplant-korea",
  "/plastic-surgery-korea",
  "/medical-journey",
  "/medical-boundary",
  "/privacy-policy",
  "/terms-of-service",
  "/payment-refund-policy",
  "/doctors/dr-jee-hoon-ju",
  "/methodology/how-we-verify-hospitals",
  "/hospitals/morgan-dermatology",
  "/hospitals/tune-clinic",
]

const universalRoutes = ["/our-philosophy"]

interface SitemapEntry {
  path: string
  locales: readonly string[]
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}

function buildEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = []

  entries.push({
    path: "",
    locales,
    changeFrequency: "weekly",
    priority: 1.0,
  })

  for (const route of universalRoutes) {
    entries.push({
      path: route,
      locales,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  }

  for (const route of koOnlyRoutes) {
    entries.push({
      path: route,
      locales: ["ko"],
      changeFrequency: "monthly",
      priority: 0.7,
    })
  }

  const highPriority = ["/how-it-works", "/how-to-choose-hospital-abroad", "/intake", "/doctors/dr-jee-hoon-ju", "/methodology/how-we-verify-hospitals", "/hospitals/morgan-dermatology", "/hospitals/tune-clinic"]
  const lowPriority = ["/privacy-policy", "/terms-of-service", "/payment-refund-policy", "/medical-boundary"]

  for (const route of patientOnlyRoutes) {
    const p = highPriority.includes(route) ? 0.9 : lowPriority.includes(route) ? 0.3 : 0.8
    entries.push({
      path: route,
      locales: patientLocales,
      changeFrequency: lowPriority.includes(route) ? "yearly" : "monthly",
      priority: p,
    })
  }

  return entries
}

function alternates(path: string, availableLocales: readonly string[]) {
  const languages: Record<string, string> = {}
  for (const l of availableLocales) {
    languages[l] = `${BASE}/${l}${path}`
  }
  languages["x-default"] = `${BASE}/en${path}`
  return { languages }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = buildEntries()
  const results: MetadataRoute.Sitemap = []
  const buildDate = new Date()

  for (const entry of entries) {
    for (const locale of entry.locales) {
      results.push({
        url: `${BASE}/${locale}${entry.path}`,
        lastModified: buildDate,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
        alternates: alternates(entry.path, entry.locales),
      })
    }
  }

  for (const locale of patientLocales) {
    results.push({
      url: `${BASE}/${locale}/blog`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: alternates("/blog", patientLocales),
    })
  }

  for (const locale of patientLocales) {
    const posts = getAllPosts(locale)
    for (const post of posts) {
      const blogLocales = post.availableLocales.filter((l) =>
        (patientLocales as readonly string[]).includes(l)
      )
      results.push({
        url: `${BASE}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: alternates(`/blog/${post.slug}`, blogLocales),
      })
    }
  }

  return results
}
