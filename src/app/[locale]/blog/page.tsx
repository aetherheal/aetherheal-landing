import type { Metadata } from "next"
import { assertPatientLocale } from "@/i18n/assert-locale"
import { locales, ogLocales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { getAllPosts, BLOG_CATEGORIES } from "@/lib/blog"
import { BlogListingClient } from "./blog-listing-client"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const t = dict.blog

  const alternateLanguages: Record<string, string> = {}
  for (const l of locales) {
    alternateLanguages[l] = `https://aetherheal.com/${l}/blog`
  }

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `https://aetherheal.com/${locale}/blog`,
      languages: alternateLanguages,
    },
    openGraph: {
      type: "website",
      title: t.meta.title,
      description: t.meta.description,
      url: `https://aetherheal.com/${locale}/blog`,
      siteName: "AetherHeal",
      locale: ogLocales[locale as Locale] || "en_US",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  }
}

export default async function BlogListingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)
  const posts = getAllPosts(locale)
  const t = dict.blog

  const categories = BLOG_CATEGORIES.map((id) => ({
    id,
    label: t.categories[id as keyof typeof t.categories] ?? id,
  }))

  return (
    <BlogListingClient
      posts={posts}
      categories={categories}
      locale={locale}
      dict={t}
    />
  )
}
