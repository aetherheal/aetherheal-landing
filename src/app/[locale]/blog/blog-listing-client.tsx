"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { BlogCard } from "@/components/blog/blog-card"
import { SectionLabel } from "@/components/ui/section-label"
import type { BlogPostMeta } from "@/lib/blog"

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
  }
}

export function BlogListingClient({
  posts,
  categories,
  locale,
  dict,
}: BlogListingClientProps) {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)

  const filtered = currentCategory
    ? posts.filter((p) => p.category === currentCategory)
    : posts

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
          <div className="mb-10 flex flex-wrap gap-2">
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
            </button>
            {categories.map((cat) => (
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
              </button>
            ))}
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
