"use client"

import { useState, useMemo } from "react"
import { ArrowUpDown, Clock, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { BlogCard } from "@/components/blog/blog-card"
import { SectionLabel } from "@/components/ui/section-label"
import type { BlogPostMeta } from "@/lib/blog"

type SortOption = "newest" | "oldest" | "reading-time"

interface BlogListingClientProps {
  posts: BlogPostMeta[]
  categories: { id: string; label: string }[]
  locale: string
  dict: {
    badge: string
    heading: string
    subheading: string
    allCategories: string
    noPosts: string
    readMore: string
    categories: Record<string, string>
    sortNewest?: string
    sortOldest?: string
    sortReadingTime?: string
    articlesCount?: string
  }
}

export function BlogListingClient({
  posts,
  categories,
  locale,
  dict,
}: BlogListingClientProps) {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("newest")

  const filtered = useMemo(() => {
    const base = currentCategory
      ? posts.filter((p) => p.category === currentCategory)
      : posts

    return [...base].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "reading-time": {
          const aMin = parseInt(a.readingTime) || 0
          const bMin = parseInt(b.readingTime) || 0
          return aMin - bMin
        }
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })
  }, [posts, currentCategory, sortBy])

  const categoriesWithCount = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      count: posts.filter((p) => p.category === cat.id).length,
    })).filter((cat) => cat.count > 0)
  }, [categories, posts])

  return (
    <div className="min-h-full">
      <section className="w-full pt-16 sm:pt-20 lg:pt-24 pb-10 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto text-center">
          <SectionLabel color="gold" className="mb-4 block">
            {dict.badge}
          </SectionLabel>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-navy leading-tight mb-4">
            {dict.heading}
          </h1>
          <p className="text-text-body text-lg max-w-2xl mx-auto leading-relaxed">
            {dict.subheading}
          </p>
        </div>
      </section>

      <section className="w-full py-10 px-4 sm:px-6 bg-bg-light min-h-[50vh]">
        <div className="max-w-6xl mx-auto">
          {/* Filter + Sort Bar */}
          <div className="mb-10 space-y-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCurrentCategory(null)}
                className={cn(
                  "px-4 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200",
                  !currentCategory
                    ? "bg-brand-navy text-white shadow-md"
                    : "bg-white border border-slate-200 text-text-muted hover:text-brand-navy hover:border-brand-navy/20"
                )}
              >
                {dict.allCategories}
                <span className="ml-1.5 text-[11px] opacity-70">{posts.length}</span>
              </button>
              {categoriesWithCount.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCurrentCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200",
                    currentCategory === cat.id
                      ? "bg-brand-navy text-white shadow-md"
                      : "bg-white border border-slate-200 text-text-muted hover:text-brand-navy hover:border-brand-navy/20"
                  )}
                >
                  {cat.label}
                  <span className="ml-1.5 text-[11px] opacity-70">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* Sort + Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-muted">
                {dict.articlesCount
                  ? dict.articlesCount.replace("{count}", String(filtered.length))
                  : `${filtered.length} articles`}
              </p>
              <div className="flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-text-muted mr-1" />
                <button
                  onClick={() => setSortBy("newest")}
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    sortBy === "newest"
                      ? "bg-brand-navy/5 text-brand-navy"
                      : "text-text-muted hover:text-brand-navy"
                  )}
                >
                  <TrendingUp className="w-3 h-3" />
                  {dict.sortNewest ?? "Newest"}
                </button>
                <button
                  onClick={() => setSortBy("oldest")}
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    sortBy === "oldest"
                      ? "bg-brand-navy/5 text-brand-navy"
                      : "text-text-muted hover:text-brand-navy"
                  )}
                >
                  <Clock className="w-3 h-3" />
                  {dict.sortOldest ?? "Oldest"}
                </button>
                <button
                  onClick={() => setSortBy("reading-time")}
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    sortBy === "reading-time"
                      ? "bg-brand-navy/5 text-brand-navy"
                      : "text-text-muted hover:text-brand-navy"
                  )}
                >
                  <Clock className="w-3 h-3" />
                  {dict.sortReadingTime ?? "Quick reads"}
                </button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg">{dict.noPosts}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  categoryLabel={dict.categories[post.category] ?? post.category}
                  readMoreLabel={dict.readMore}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
