import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BlogPostMeta } from "@/lib/blog"

interface BlogCardProps {
  post: BlogPostMeta
  categoryLabel: string
  readMoreLabel: string
}

export function BlogCard({ post, categoryLabel, readMoreLabel }: BlogCardProps) {
  const href = `/${post.locale}/blog/${post.slug}`
  const formattedDate = new Date(post.date).toLocaleDateString(post.locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link href={href} className="group block h-full">
      <article
        className={cn(
          "flex flex-col h-full rounded-2xl border border-slate-200 bg-white",
          "shadow-[0_12px_40px_-20px_rgba(15,23,42,0.08)]",
          "hover:border-brand-gold/40 hover:shadow-[0_20px_50px_-16px_rgba(15,23,42,0.14)]",
          "transition-all duration-300"
        )}
      >
        {post.coverImage && (
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl bg-slate-100">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-navy/5 text-[10px] font-bold uppercase tracking-widest text-brand-navy">
              {categoryLabel}
            </span>
          </div>

          <h3 className="font-serif text-xl text-brand-navy font-semibold leading-snug mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm text-text-body leading-relaxed mb-4 line-clamp-3 flex-1">
            {post.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-1.5 text-xs text-text-muted">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="text-xs font-medium text-brand-navy">
                {post.author}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-text-muted">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">
                {readMoreLabel}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
