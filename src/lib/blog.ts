import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import { locales, type Locale } from "@/i18n/config"

export const BLOG_CATEGORIES = [
  "insights",
  "hair-transplant",
  "plastic-surgery",
  "medical-tourism",
  "patient-guide",
  "technology",
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export interface FaqItem {
  q: string
  a: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: BlogCategory
  tags: string[]
  coverImage: string
  published: boolean
  readingTime: string
  locale: Locale
  availableLocales: Locale[]
  takeaways?: string[]
  faq?: FaqItem[]
}

export interface BlogPost extends BlogPostMeta {
  content: string
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog")

function getPostSlugs(locale: string): string[] {
  const dir = path.join(CONTENT_DIR, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""))
}

function getAvailableLocales(slug: string): Locale[] {
  return locales.filter((l) => {
    const dir = path.join(CONTENT_DIR, l)
    if (!fs.existsSync(dir)) return false
    return (
      fs.existsSync(path.join(dir, `${slug}.md`)) ||
      fs.existsSync(path.join(dir, `${slug}.mdx`))
    )
  })
}

function resolveFilePath(locale: string, slug: string): string | null {
  const md = path.join(CONTENT_DIR, locale, `${slug}.md`)
  if (fs.existsSync(md)) return md
  const mdx = path.join(CONTENT_DIR, locale, `${slug}.mdx`)
  if (fs.existsSync(mdx)) return mdx
  return null
}

export function getPostBySlug(locale: string, slug: string): BlogPost | null {
  const filePath = resolveFilePath(locale, slug)
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  if (data.published === false) return null

  // Hide future-dated posts (scheduled publishing)
  const postDate = new Date(data.date)
  const today = new Date()
  today.setHours(23, 59, 59, 999) // include posts dated today
  if (postDate > today) return null

  const stats = readingTime(content)

  const takeaways: string[] | undefined = Array.isArray(data.takeaways)
    ? data.takeaways.map(String)
    : undefined

  let faq: FaqItem[] | undefined
  if (Array.isArray(data.faq)) {
    faq = data.faq
      .filter((item: unknown): item is { q: unknown; a: unknown } =>
        typeof item === "object" && item !== null && "q" in item && "a" in item,
      )
      .map((item) => ({ q: String(item.q), a: String(item.a) }))
  }

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString().slice(0, 10),
    author: data.author ?? "Dr. Jee Hoon Ju",
    category: data.category ?? "insights",
    tags: data.tags ?? [],
    coverImage: data.coverImage ?? "",
    published: data.published !== false,
    readingTime: stats.text,
    locale: locale as Locale,
    availableLocales: getAvailableLocales(slug),
    takeaways,
    faq,
    content,
  }
}

export function getAllPosts(locale: string): BlogPostMeta[] {
  const slugs = getPostSlugs(locale)
  const posts: BlogPostMeta[] = []

  for (const slug of slugs) {
    const post = getPostBySlug(locale, slug)
    if (post) {
      const { content: _, ...meta } = post
      posts.push(meta)
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostsByCategory(
  locale: string,
  category: BlogCategory
): BlogPostMeta[] {
  return getAllPosts(locale).filter((p) => p.category === category)
}

export function getAllPostParams(): { locale: string; slug: string }[] {
  const params: { locale: string; slug: string }[] = []
  for (const locale of locales) {
    for (const slug of getPostSlugs(locale)) {
      const post = getPostBySlug(locale, slug)
      if (post) params.push({ locale, slug })
    }
  }
  return params
}
