import { compileMDX } from "next-mdx-remote/rsc"

interface BlogPostContentProps {
  source: string
}

export async function BlogPostContent({ source }: BlogPostContentProps) {
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: false },
  })

  return (
    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-navy prose-headings:font-semibold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-text-body prose-p:leading-relaxed prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-navy prose-blockquote:border-l-brand-gold prose-blockquote:bg-slate-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic prose-li:text-text-body prose-ol:text-text-body prose-hr:border-slate-200 prose-img:rounded-2xl prose-em:text-text-muted">
      {content}
    </div>
  )
}
