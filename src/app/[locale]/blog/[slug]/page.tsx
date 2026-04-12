import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowLeft, User } from "lucide-react"
import { assertPatientLocale } from "@/i18n/assert-locale"
import { locales, ogLocales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { getPostBySlug, getAllPostParams, type BlogCategory } from "@/lib/blog"
import { BlogPostContent } from "@/components/blog/blog-post"

export function generateStaticParams() {
  return getAllPostParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  assertPatientLocale(locale)
  const post = getPostBySlug(locale, slug)
  if (!post) return {}

  const alternateLanguages: Record<string, string> = {}
  for (const l of post.availableLocales) {
    alternateLanguages[l] = `https://aetherheal.com/${l}/blog/${slug}`
  }

  return {
    title: `${post.title} | AetherHeal Blog`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `https://aetherheal.com/${locale}/blog/${slug}`,
      languages: alternateLanguages,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `https://aetherheal.com/${locale}/blog/${slug}`,
      siteName: "AetherHeal",
      locale: ogLocales[locale as Locale] || "en_US",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630 }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  assertPatientLocale(locale)
  const post = getPostBySlug(locale, slug)
  if (!post) notFound()

  const dict = await getDictionary(locale as Locale)
  const t = dict.blog

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "AetherHeal",
      url: "https://aetherheal.com",
      logo: { "@type": "ImageObject", url: "https://aetherheal.com/logo.png" },
    },
    mainEntityOfPage: `https://aetherheal.com/${locale}/blog/${slug}`,
    inLanguage: locale,
    ...(post.coverImage && { image: post.coverImage }),
  }

  const faqJsonLd = post.faq && post.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      }
    : null

  const takeawaysLabel = (t as Record<string, unknown>).keyTakeaways as string | undefined ?? "Key Takeaways"
  const faqLabel = (t as Record<string, unknown>).faq as string | undefined ?? "Frequently Asked Questions"

  return (
    <div className="min-h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <article className="w-full">
        <header className="w-full pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 px-4 sm:px-6 bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-brand-navy transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.backToBlog}
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-navy/5 text-[10px] font-bold uppercase tracking-widest text-brand-navy">
                {t.categories[post.category as BlogCategory] ?? post.category}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-text-body leading-relaxed mb-8">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </header>

        {post.coverImage && (
          <div className="w-full bg-white px-4 sm:px-6">
            <div className="max-w-4xl mx-auto -mt-1 mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          </div>
        )}

        {post.takeaways && post.takeaways.length > 0 && (
          <div className="w-full bg-white px-4 sm:px-6">
            <div className="max-w-3xl mx-auto pt-4 pb-2">
              <aside
                aria-label={takeawaysLabel}
                className="rounded-2xl border border-brand-navy/10 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-8 shadow-sm"
              >
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-brand-gold mb-4">
                  {takeawaysLabel}
                </p>
                <ul className="space-y-3 text-text-body leading-relaxed">
                  {post.takeaways.map((t, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" aria-hidden />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        )}

        <div className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <BlogPostContent source={post.content} />
          </div>
        </div>

        {post.faq && post.faq.length > 0 && (
          <div className="w-full bg-white px-4 sm:px-6 pb-12 sm:pb-16">
            <div className="max-w-3xl mx-auto">
              <section
                aria-label={faqLabel}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-10"
              >
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-6">
                  {faqLabel}
                </h2>
                <dl className="divide-y divide-slate-200">
                  {post.faq.map((item, i) => (
                    <div key={i} className="py-5 first:pt-0 last:pb-0">
                      <dt className="font-semibold text-brand-navy leading-snug mb-2">
                        {item.q}
                      </dt>
                      <dd className="text-text-body leading-relaxed">{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        )}

        <footer className="w-full py-10 px-4 sm:px-6 bg-bg-light border-t border-slate-200">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {post.availableLocales.length > 1 && (
              <div className="pt-6 border-t border-slate-200">
                <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">
                  {t.availableIn}
                </p>
                <div className="flex gap-2">
                  {post.availableLocales.map((l) => (
                    <Link
                      key={l}
                      href={`/${l}/blog/${slug}`}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        l === locale
                          ? "bg-brand-navy text-white"
                          : "bg-white border border-slate-200 text-text-muted hover:text-brand-navy hover:border-brand-navy/20"
                      }`}
                    >
                      {l.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold hover:text-brand-navy transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.backToBlog}
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}
