# AetherHeal Landing — Full Codebase Export

Generated: 2026-04-12 06:40 UTC

---

## `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

```

---

## `netlify.toml`

```toml
[build]
  command = "pnpm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    X-Permitted-Cross-Domain-Policies = "none"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com; font-src 'self' data:; frame-ancestors 'none'"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.png"
  [headers.values]
    Cache-Control = "public, max-age=86400"

[[headers]]
  for = "/*.mp4"
  [headers.values]
    Cache-Control = "public, max-age=86400"

[[redirects]]
  from = "/"
  to = "/en"
  status = 301
  force = false

```

---

## `public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://aetherheal.com/sitemap.xml

```

---

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```

---

## `package.json`

```json
{
  "name": "aetherheal-landing",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build --webpack",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.79.0",
    "@google/genai": "^1.49.0",
    "@supabase/supabase-js": "^2.99.2",
    "@tailwindcss/typography": "^0.5.19",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "dotenv": "^17.4.1",
    "gray-matter": "^4.0.3",
    "lucide-react": "^0.574.0",
    "next": "16.1.6",
    "next-mdx-remote": "^6.0.0",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "reading-time": "^1.5.0",
    "remark-gfm": "^4.0.1",
    "resend": "^6.9.4",
    "tailwind-merge": "^3.4.1"
  },
  "devDependencies": {
    "@netlify/plugin-nextjs": "^5.15.9",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.6",
    "sharp": "^0.34.5",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

```

---

## `src/app/layout.tsx`

```tsx
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://aetherheal.com"),
  manifest: "/manifest.json",
  verification: {
    google: "TfgaqNCtapU0-cAha6ooo5A3_ILmlIc29J5l1FfNxfo",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

```

---

## `src/app/sitemap.ts`

```ts
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

  const highPriority = ["/how-it-works", "/how-to-choose-hospital-abroad", "/intake"]
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

```

---

## `src/app/[locale]/layout.tsx`

```tsx
import type { Metadata } from "next"
import { Playfair_Display, Inter, Noto_Sans_KR, Noto_Serif_KR, Gowun_Batang } from "next/font/google"
import { locales, ogLocales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

const gowunBatang = Gowun_Batang({
  variable: "--font-gowun-batang",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const alternateLanguages: Record<string, string> = {}
  for (const l of locales) {
    alternateLanguages[l] = `https://aetherheal.com/${l}`
  }

  return {
    title: dict.home.meta.title,
    description: dict.home.meta.description,
    keywords: [
      "medical tourism Korea",
      "medical tourism Seoul",
      "hair transplant Korea",
      "plastic surgery Seoul",
      "Seoul aesthetic clinic",
      "physician verified clinics",
      "medical travel Korea",
      "international patient Korea",
      "medical decision support",
    ],
    authors: [{ name: "AetherHeal" }],
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://aetherheal.com/${locale}`,
      languages: alternateLanguages,
    },
    openGraph: {
      type: "website",
      title: dict.home.meta.title,
      description: dict.home.meta.description,
      url: `https://aetherheal.com/${locale}`,
      siteName: "AetherHeal",
      locale: ogLocales[locale as Locale] || "en_US",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "AetherHeal — Physician-Led Global Medical Journey to Seoul",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.home.meta.title,
      description: dict.home.meta.description,
      images: ["/og-image.jpg"],
    },
    other: {
      "theme-color": "#0B1D3A",
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${playfair.variable} ${inter.variable} ${notoSansKr.variable} ${notoSerifKr.variable} ${gowunBatang.variable} h-full`}>
      <body className="h-full font-sans antialiased">
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "AetherHeal",
              url: "https://aetherheal.com",
              logo: "https://aetherheal.com/logo.png",
              image: "https://aetherheal.com/og-image.jpg",
              description: dict.home.meta.description,
              areaServed: { "@type": "GeoShape", name: "Global" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Seoul",
                addressCountry: "KR",
              },
              medicalSpecialty: [
                "Hair Transplantation",
                "Aesthetic Medicine",
                "Plastic Surgery",
                "Dermatology",
                "Ophthalmology",
                "Dentistry",
                "Stem Cell Therapy",
              ],
              availableLanguage: [
                "English",
                "Korean",
                "Chinese",
                "Japanese",
                "Thai",
                "Russian",
                "Arabic",
              ],
              inLanguage: locale,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              name: "AetherHeal",
              url: "https://aetherheal.com",
              logo: "https://aetherheal.com/logo.png",
              description:
                "Physician-led, AI-assisted platform for international patients considering medical care in Korea",
              address: {
                "@type": "PostalAddress",
                addressCountry: "KR",
              },
              sameAs: [],
            }),
          }}
        />
        <ScrollToTop />
        <div className={`flex flex-col min-h-full ${locale === "ko" ? "locale-ko" : ""}`}>
          <Navbar dict={dict.common} locale={locale as Locale} />
          <main id="main-content" className="flex-1 flex flex-col">{children}</main>
          <Footer dict={dict.common} locale={locale as Locale} />
        </div>
      </body>
    </html>
  )
}

```

---

## `src/app/[locale]/page.tsx`

```tsx
import Link from "next/link"
import {
  ArrowRight,
  Stethoscope,
  GitFork,
  Building2,
  UserCheck,
  AlertTriangle,
  CreditCard,
  ShieldCheck,
  RefreshCw,
  Scissors,
  Sparkles,
  Eye,
  Heart,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"
import { Accordion } from "@/components/ui/accordion"
import { MobileDisclosure } from "@/components/landing/mobile-disclosure"
import { WaitlistForm } from "@/components/landing/waitlist-form"
import { ScrollSlideSection } from "@/components/landing/scroll-slide-section"
import { JourneyAccordion } from "@/components/landing/journey-accordion"
import { cn } from "@/lib/utils"
import { type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { KoLanding } from "./ko-landing"

const problemQuoteIcons = [GitFork, AlertTriangle, Stethoscope]
// concernIcons removed — Patient Concerns section folded into Explore
const exploreIcons = [Scissors, Sparkles, Building2, Eye, Heart, Stethoscope]
const trustPillarIcons = [ShieldCheck, CreditCard, RefreshCw, UserCheck, Video]
const first48CardClasses = [
  "border-slate-200 bg-white",
  "border-slate-200 bg-slate-50/80",
  "border-brand-gold/30 bg-brand-gold/10",
]
const first48ArrowClasses = [
  "text-slate-300",
  "text-brand-gold/60",
]
const storyArcCardClasses = [
  "border-slate-200 bg-white",
  "border-slate-200 bg-slate-50/80",
  "border-brand-gold/30 bg-brand-gold/10",
  "border-brand-navy/15 bg-brand-navy/5",
  "border-brand-navy bg-brand-navy text-white",
]
const storyArcArrowClasses = [
  "text-slate-300",
  "text-slate-300",
  "text-brand-gold/60",
  "text-brand-navy/40",
]
const continuityCardClasses = [
  "border-white/10 bg-white/5",
  "border-white/15 bg-white/10",
  "border-brand-gold/25 bg-brand-gold/10",
]
const continuityArrowClasses = [
  "text-white/20",
  "text-brand-gold/50",
]

const exploreHrefs = [
  "/hair-transplant-korea",
  "/aesthetic-clinic-seoul",
  "/plastic-surgery-korea",
  "/medical-journey",
  "/trust-protocol",
  "/how-to-choose-hospital-abroad",
]

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  if (locale === "ko") {
    return <KoLanding dict={dict} locale={locale} />
  }

  const t = dict.home
  const prefix = `/${locale}`

  const faqItems = t.faq.items.map((item, i) => ({
    id: String(i + 1),
    question: item.question,
    answer: item.answer,
  }))
  const problemQuoteSection = t.problemQuote as typeof t.problemQuote & {
    title?: string
    subtitle?: string
    items?: { title: string; quote: string }[]
  }
  const problemItems = problemQuoteSection.items ?? [
    { title: "Risk", quote: t.problemQuote.q1 },
    { title: "Incentives", quote: t.problemQuote.q2 },
    { title: "Trust", quote: t.problemQuote.q3 },
  ]
  const journeySection = t.journey as typeof t.journey & {
    steps: Array<{
      label: string
      badge: string | null
      description: string
      details: string | null
      owner?: string
      next?: string
    }>
    storyArc?: {
      badge?: string
      title?: string
      subtitle?: string
      items?: { phase: string; title: string; owner: string }[]
    }
    first48Hours?: {
      badge?: string
      title?: string
      subtitle?: string
      items?: { time: string; title: string; description: string; owner?: string; next?: string }[]
    }
    continuityYear?: {
      badge?: string
      title?: string
      subtitle?: string
      items?: { phase: string; title: string; description: string; owner?: string; next?: string }[]
    }
    uiLabels?: {
      responsibility?: string
      then?: string
    }
  }
  const responsibilityLabel = journeySection.uiLabels?.responsibility ?? "Responsibility"
  const thenLabel = journeySection.uiLabels?.then ?? "Then:"
  const heroBranches = (t.hero as typeof t.hero & { branches?: string[]; branchConclusion?: string })

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item: { question: string; answer: string }) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <div className="min-h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <link rel="preload" as="video" href="/assets/hero-bg.mp4" type="video/mp4" />

      {/* Desktop: Video + overlaid hero content */}
      <section className="hidden md:block relative w-full">
        <div className="w-full max-h-[95vh] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/hero-poster.jpg"
            aria-label="AetherHeal brand video — physician-led medical journey to Seoul"
            className="w-full h-auto block"
          >
            <source src="/assets/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-40 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="animate-fade-up">
              <div 
                className="inline-block py-2 px-6 border border-brand-navy/20 rounded-full text-[11px] sm:text-sm font-bold uppercase tracking-widest text-brand-navy bg-white shadow-lg"
                dangerouslySetInnerHTML={{ __html: t.hero.badge }}
              />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.15] text-brand-navy font-medium animate-fade-up [animation-delay:100ms] [text-wrap:balance]">
              {t.hero.h1} <br />
              <span className="italic text-brand-gold">{t.hero.h1Highlight}</span>
            </h1>

            <p className="font-sans text-text-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
              {t.hero.description}
              {t.hero.descriptionHighlight && (<>{" "}<span className="font-semibold text-brand-navy border-b-2 border-brand-gold/40">{t.hero.descriptionHighlight}</span></>)}
              {t.hero.descriptionEnd && (<><br />{t.hero.descriptionEnd}</>)}
            </p>

            {heroBranches.branches && heroBranches.branches.length > 0 && (
              <div className="w-full max-w-lg mx-auto animate-fade-up [animation-delay:220ms]">
                <div className="w-px h-6 bg-brand-gold/40 mx-auto" />
                <div className="grid grid-cols-3">
                  {heroBranches.branches.map((b, i) => (
                    <div key={b} className="flex flex-col items-center">
                      <div className="w-full flex items-stretch h-px">
                        <div className={cn("flex-1 border-b border-brand-gold/40", i === 0 && "border-b-0")} />
                        <div className="w-px bg-brand-gold/40" />
                        <div className={cn("flex-1 border-b border-brand-gold/40", i === heroBranches.branches.length - 1 && "border-b-0")} />
                      </div>
                      <div className="w-px h-3 bg-brand-gold/40" />
                      <div className="rounded-lg border border-brand-gold/20 bg-brand-gold/5 px-3 py-2">
                        <p className="text-xs font-semibold text-brand-navy text-center">{b}</p>
                      </div>
                      <div className="w-px h-3 bg-brand-gold/40" />
                      <div className="w-full flex items-stretch h-px">
                        <div className={cn("flex-1 border-b border-brand-gold/40", i === 0 && "border-b-0")} />
                        <div className="w-px bg-brand-gold/40" />
                        <div className={cn("flex-1 border-b border-brand-gold/40", i === heroBranches.branches.length - 1 && "border-b-0")} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-px h-6 bg-brand-gold/40 mx-auto" />
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-brand-gold rotate-90 -mt-1" />
                </div>
                <p className="text-center font-serif text-base text-brand-gold italic mt-1">
                  {heroBranches.branchConclusion}
                </p>
              </div>
            )}

            <div className="w-full pt-4 flex flex-col items-center gap-4 animate-fade-up [animation-delay:300ms]">
              <div className="flex flex-wrap justify-center gap-3">
                <Link href={`${prefix}/intake`}>
                  <Button size="lg" className="min-w-[260px]">
                    {(t.hero as typeof t.hero & { ctaAssessment?: string }).ctaAssessment ?? "Begin Your Case Assessment"}
                  </Button>
                </Link>
                <Link href={`${prefix}/how-it-works`}>
                  <Button variant="outline" size="lg" className="min-w-[200px]">
                    {t.hero.ctaExplore}
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-text-muted font-medium">
                {t.hero.openingDate}{(t.hero as typeof t.hero & { openingDateSuffix?: string }).openingDateSuffix ? ` — ${(t.hero as typeof t.hero & { openingDateSuffix?: string }).openingDateSuffix}` : ""}
              </p>
              <WaitlistForm
                placeholder={t.hero.waitlistPlaceholder}
                buttonLabel={t.hero.waitlistButton}
                successMessage={t.hero.waitlistSuccess}
                duplicateMessage={t.hero.waitlistDuplicate}
                locale={locale}
              />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Mobile: hero text first, then video */}
      <section className="md:hidden w-full py-14 px-4 bg-white">
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="animate-fade-up">
            <div 
              className="inline-block py-2 px-4 border border-brand-navy/20 rounded-full text-[9px] font-bold uppercase tracking-wider text-brand-navy bg-white shadow-lg"
              dangerouslySetInnerHTML={{ __html: t.hero.badge }}
            />
          </div>

          <h1 className="font-serif text-4xl leading-[1.1] text-brand-navy font-medium animate-fade-up [animation-delay:100ms]">
            {t.hero.h1} <br />
            <span className="italic text-brand-gold">{t.hero.h1Highlight}</span>
          </h1>

          <p className="font-sans text-text-body text-lg leading-relaxed max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
            {t.hero.description}
            {t.hero.descriptionHighlight && (<>{" "}<span className="font-semibold text-brand-navy border-b-2 border-brand-gold/40">{t.hero.descriptionHighlight}</span></>)}
            {t.hero.descriptionEnd && (<><br />{t.hero.descriptionEnd}</>)}
          </p>

          {heroBranches.branches && heroBranches.branches.length > 0 && (
            <div className="w-full max-w-sm mx-auto animate-fade-up [animation-delay:220ms]">
              <div className="w-px h-5 bg-brand-gold/40 mx-auto" />
              <div className="grid grid-cols-3">
                {heroBranches.branches.map((b, i) => (
                  <div key={b} className="flex flex-col items-center">
                    <div className="w-full flex items-stretch h-px">
                      <div className={cn("flex-1 border-b border-brand-gold/40", i === 0 && "border-b-0")} />
                      <div className="w-px bg-brand-gold/40" />
                      <div className={cn("flex-1 border-b border-brand-gold/40", i === heroBranches.branches.length - 1 && "border-b-0")} />
                    </div>
                    <div className="w-px h-2.5 bg-brand-gold/40" />
                    <div className="rounded-lg border border-brand-gold/20 bg-brand-gold/5 px-2 py-1.5">
                      <p className="text-[10px] font-semibold text-brand-navy text-center leading-tight">{b}</p>
                    </div>
                    <div className="w-px h-2.5 bg-brand-gold/40" />
                    <div className="w-full flex items-stretch h-px">
                      <div className={cn("flex-1 border-b border-brand-gold/40", i === 0 && "border-b-0")} />
                      <div className="w-px bg-brand-gold/40" />
                      <div className={cn("flex-1 border-b border-brand-gold/40", i === heroBranches.branches.length - 1 && "border-b-0")} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-px h-5 bg-brand-gold/40 mx-auto" />
              <div className="flex justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-brand-gold rotate-90 -mt-1" />
              </div>
              <p className="text-center font-serif text-sm text-brand-gold italic mt-1">
                {heroBranches.branchConclusion}
              </p>
            </div>
          )}

          <div className="w-full pt-2 flex flex-col items-center gap-3 animate-fade-up [animation-delay:300ms]">
            <Link href={`${prefix}/intake`} className="w-full">
              <Button size="lg" className="w-full min-w-[200px]">
                {(t.hero as typeof t.hero & { ctaAssessment?: string }).ctaAssessment ?? "Begin Your Case Assessment"}
              </Button>
            </Link>
            <Link href={`${prefix}/how-it-works`} className="w-full">
              <Button variant="outline" size="lg" className="w-full min-w-[200px]">
                {t.hero.ctaExplore}
              </Button>
            </Link>
            <p className="text-sm text-text-muted font-medium text-center">
              {t.hero.openingDate}{(t.hero as typeof t.hero & { openingDateSuffix?: string }).openingDateSuffix ? ` — ${(t.hero as typeof t.hero & { openingDateSuffix?: string }).openingDateSuffix}` : ""}
            </p>
            <WaitlistForm
              placeholder={t.hero.waitlistPlaceholder}
              buttonLabel={t.hero.waitlistButton}
              successMessage={t.hero.waitlistSuccess}
              duplicateMessage={t.hero.waitlistDuplicate}
              locale={locale}
            />
          </div>
        </div>
      </section>

      {/* Mobile: video after hero text */}
      <section className="md:hidden w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/hero-poster.jpg"
          aria-label="AetherHeal brand video — physician-led medical journey to Seoul"
          className="w-full h-auto block"
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Trust Proof — Verification Standard */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[32px] border border-slate-200 bg-white px-8 py-10 sm:px-12 sm:py-14 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.16)]">
            <div className="text-center mb-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">{t.partners.subtitle}</p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-navy">{t.partners.compactTitle}</h2>
            </div>
            <div className="flex justify-center gap-8 sm:gap-16 mb-8">
              {t.partners.compactStats.map((stat: { number: string; label: string }) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-5xl sm:text-6xl text-brand-navy font-bold leading-none">{stat.number}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="text-center mb-6">
              <p className="text-text-body text-sm sm:text-base font-medium">
                {t.partners.compactDescription}
              </p>
            </div>
            {t.partners.rejectionReasons && (
              <div className="max-w-2xl mx-auto text-center mb-8">
                <p className="text-sm text-text-muted leading-relaxed">
                  {t.partners.rejectionReasons}
                </p>
              </div>
            )}
            <div className="text-center">
              <Link
                href={`${prefix}/trust-protocol`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors"
              >
                {t.partners.compactCta}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop: Sticky scroll slide — Problem Quote → Trust Architecture */}
      <ScrollSlideSection
        panelA={
          <div className="w-full px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <h2 className="font-serif text-5xl text-white mb-4">
                  {problemQuoteSection.title ?? "Why patients hesitate"}
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {problemQuoteSection.subtitle ??
                    "Behind every medical tourism search is a patient trying to avoid a decision they may regret for years."}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
              {problemItems.map((item, i) => {
                const Icon = problemQuoteIcons[i]
                const isLast = i === problemItems.length - 1
                return (
                  <div
                    key={item.title}
                    className={cn(
                      "rounded-[28px] border p-8",
                      isLast
                        ? "border-brand-gold/30 bg-brand-gold/10"
                        : "border-white/10 bg-white/5 backdrop-blur-sm"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                      isLast ? "bg-brand-gold/20" : "bg-white/10"
                    )}>
                      <Icon className="w-5 h-5 text-brand-gold" />
                    </div>
                    <p className={cn(
                      "text-[10px] font-bold uppercase tracking-widest mb-3",
                      isLast ? "text-brand-gold" : "text-brand-gold/70"
                    )}>
                      {item.title}
                    </p>
                    <p className={cn(
                      "font-serif text-2xl leading-relaxed",
                      isLast ? "text-white" : "text-white/90"
                    )}>
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                )
              })}
              </div>
            </div>
          </div>
        }
        panelB={
          <div className="w-full px-6 relative h-full">
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center h-full">
              <div className="max-w-3xl mx-auto text-center mb-20">
                <SectionLabel color="gold" className="mb-4 block">
                  {t.aiLayer.badge}
                </SectionLabel>
                <h2 className="font-serif text-5xl text-white leading-tight">
                  {t.aiLayer.title}{" "}
                  <span className="italic text-brand-gold">{t.aiLayer.titleHighlight}</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mt-5">
                  {t.aiLayer.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-5">
                {t.aiLayer.cards.slice(0, 4).map((card, idx) => {
                  const Icon = trustPillarIcons[idx % trustPillarIcons.length]
                  return (
                    <div
                      key={card.title}
                      className="group relative rounded-3xl p-8 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-brand-gold/20"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-gold/[0.04] rounded-full blur-2xl group-hover:bg-brand-gold/[0.08] transition-all duration-700" />
                      <div className="relative z-10">
                        <div className="w-13 h-13 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6 border border-brand-gold/15 group-hover:border-brand-gold/30 transition-colors duration-500">
                          <Icon className="w-5 h-5 text-brand-gold" />
                        </div>
                        <h3 className="font-serif text-2xl text-white mb-4 leading-snug">{card.title}</h3>
                        <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-500">{card.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {t.aiLayer.cards[4] && (
                <div className="mt-5 rounded-3xl border border-brand-gold/20 bg-brand-gold/[0.06] p-8 flex items-center gap-8">
                  <div className="w-14 h-14 rounded-xl bg-brand-gold/15 flex items-center justify-center border border-brand-gold/25 shrink-0">
                    <Video className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-white mb-2">{t.aiLayer.cards[4].title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{t.aiLayer.cards[4].description}</p>
                  </div>
                </div>
              )}

              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-3">
                  <div className="w-8 h-px bg-brand-gold/30" />
                  <p className="text-sm font-medium text-brand-gold/80 italic tracking-wide">{t.aiLayer.footnote}</p>
                  <div className="w-8 h-px bg-brand-gold/30" />
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* Mobile: Problem Quote */}
      <section className="md:hidden w-full py-12 px-4 bg-brand-navy">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="font-serif text-3xl text-white mb-4">
              {problemQuoteSection.title ?? "Why patients hesitate"}
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              {problemQuoteSection.subtitle ??
                "Behind every medical tourism search is a patient trying to avoid a decision they may regret for years."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
          {problemItems.map((item, i) => {
            const Icon = problemQuoteIcons[i]
            const isLast = i === problemItems.length - 1
            return (
              <div
                key={item.title}
                className={cn(
                  "rounded-[28px] border p-5",
                  isLast
                    ? "border-brand-gold/30 bg-brand-gold/10"
                    : "border-white/10 bg-white/5 backdrop-blur-sm"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center mb-4",
                  isLast ? "bg-brand-gold/20" : "bg-white/10"
                )}>
                  <Icon className="w-5 h-5 text-brand-gold" />
                </div>
                <p className={cn(
                  "text-[10px] font-bold uppercase tracking-widest mb-2",
                  isLast ? "text-brand-gold" : "text-brand-gold/70"
                )}>
                  {item.title}
                </p>
                <p className={cn(
                  "font-serif text-lg leading-relaxed",
                  isLast ? "text-white" : "text-white/90"
                )}>
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            )
          })}
          </div>
        </div>
      </section>

      {/* Mobile: Trust Architecture */}
      <section className="md:hidden w-full py-12 px-4 bg-brand-navy overflow-hidden relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <SectionLabel color="gold" className="mb-4 block">
              {t.aiLayer.badge}
            </SectionLabel>
            <h2 className="font-serif text-3xl text-white leading-tight">
              {t.aiLayer.title}{" "}
              <span className="italic text-brand-gold">{t.aiLayer.titleHighlight}</span>
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed mt-4">
              {t.aiLayer.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {t.aiLayer.cards.slice(0, 4).map((card, idx) => {
              const Icon = trustPillarIcons[idx % trustPillarIcons.length]
              return (
                <div
                  key={card.title}
                  className="group relative rounded-2xl p-6 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-gold/[0.04] rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-5 border border-brand-gold/15">
                      <Icon className="w-5 h-5 text-brand-gold" />
                    </div>
                    <h3 className="font-serif text-lg text-white mb-2 leading-snug">{card.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {t.aiLayer.cards[4] && (
            <div className="mt-3 rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.06] p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center border border-brand-gold/25 shrink-0 mt-0.5">
                <Video className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-serif text-base text-white mb-1">{t.aiLayer.cards[4].title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{t.aiLayer.cards[4].description}</p>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-brand-gold/80 italic tracking-wide">{t.aiLayer.footnote}</p>
          </div>
        </div>
      </section>

      {/* Journey Pipeline — Accordion */}
      <section className="w-full py-12 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <SectionLabel color="gold" className="mb-4 block">
              {t.journey.sectionLabel}
            </SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-navy leading-tight">
              {t.journey.title}
              <br />
              <span className="italic text-brand-gold">{t.journey.titleHighlight}</span>
            </h2>
            <div className="relative mt-6 md:mt-10 text-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-slate-200" />
              </div>
              <span className="relative bg-white px-6 font-serif italic text-base md:text-xl text-brand-gold">
                {t.journey.subtitle}
              </span>
            </div>
          </div>

          <JourneyAccordion
            steps={journeySection.steps}
            thenLabel={thenLabel}
            decisionReadiness={t.journey.decisionReadiness}
            centerIndex={2}
            defaultOpenIdx={2}
          />

          <div className="mt-10 text-center">
            <div className="max-w-2xl mx-auto rounded-[28px] border border-slate-100 bg-white px-6 py-8 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.18)]">
              <p className="font-serif text-lg sm:text-xl text-brand-gold italic leading-relaxed">
                &ldquo;{((t.journey as typeof t.journey & { closingQuote: string }).closingQuote).split('. ').map((sentence, i, arr) => (
                  <span key={i}>
                    {sentence}{i < arr.length - 1 ? '.' : ''}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}&rdquo;
              </p>
              <div className="mt-6 flex justify-center opacity-50">
                <div className="w-16 h-px bg-brand-gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Full Story — Responsibility Overview */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 sm:px-8 sm:py-10 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.18)]">
            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">
                {journeySection.storyArc?.badge ?? "The full story"}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-navy mb-4">
                {journeySection.storyArc?.title ?? "What the patient journey is building toward"}
              </h2>
              <p className="text-text-body leading-relaxed">
                {journeySection.storyArc?.subtitle ??
                  "Patients should understand not only what happens first, but what the whole path will ask of them over time."}
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-4 xl:flex-row xl:items-stretch xl:gap-3">
              {(journeySection.storyArc?.items ?? []).map((item, idx, items) => {
                const isLast = idx === items.length - 1
                return (
                  <div key={`${item.phase}-${item.title}`} className="contents">
                    <div
                      className={cn(
                        "h-full min-w-0 rounded-2xl border p-5 flex flex-col xl:flex-1",
                        storyArcCardClasses[idx] ?? storyArcCardClasses[storyArcCardClasses.length - 1]
                      )}
                    >
                      <p
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-widest mb-2",
                          idx === items.length - 1 ? "text-white/70" : "text-text-muted"
                        )}
                      >
                        {item.phase}
                      </p>
                      <h3
                        className={cn(
                          "font-serif text-lg leading-snug mb-4 min-h-[3.5rem]",
                          idx === items.length - 1 ? "text-white" : "text-brand-navy"
                        )}
                      >
                        {item.title}
                      </h3>
                      <div className="mt-auto min-h-[3rem]">
                        <p
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-widest mb-1",
                            idx === items.length - 1 ? "text-white/60" : "text-text-muted"
                          )}
                        >
                          {responsibilityLabel}
                        </p>
                        <p
                          className={cn(
                            "text-xs font-semibold leading-snug",
                            idx === items.length - 1 ? "text-white" : "text-brand-navy"
                          )}
                        >
                          {item.owner}
                        </p>
                      </div>
                    </div>
                    {!isLast && (
                      <div className="hidden xl:flex items-center justify-center px-1">
                        <ArrowRight
                          className={cn(
                            "w-5 h-5",
                            storyArcArrowClasses[idx] ?? storyArcArrowClasses[storyArcArrowClasses.length - 1]
                          )}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* First 48 Hours + Continuity Monitoring */}
      <section className="w-full py-12 sm:py-24 lg:py-32 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="h-full rounded-[32px] border border-slate-200 bg-white p-8 sm:p-10 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.18)] flex flex-col">
            <div className="mb-8 xl:min-h-[11.5rem]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">
                {journeySection.first48Hours?.badge ?? "First 48 hours"}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4">
                {journeySection.first48Hours?.title ?? "What happens in your first 48 hours"}
              </h2>
              <p className="text-text-body leading-relaxed">
                {journeySection.first48Hours?.subtitle ??
                  "The first two days should reduce uncertainty, not create more of it. AetherHeal keeps the early journey structured and visible."}
              </p>
            </div>
            <MobileDisclosure buttonLabel="See details" className="flex-1">
            <div className="flex flex-col gap-4 flex-1">
              {(journeySection.first48Hours?.items ?? []).map((item, idx, items) => {
                const isLast = idx === items.length - 1
                return (
                  <div key={`${item.time}-${item.title}`} className="contents">
                    <div
                      className={cn(
                        "rounded-2xl border p-5 flex flex-col xl:min-h-[17rem]",
                        first48CardClasses[idx] ?? first48CardClasses[first48CardClasses.length - 1]
                      )}
                    >
                      <div className="mb-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{item.time}</p>
                      </div>
                      {item.owner && (
                        <div className="mb-3 min-h-[3rem]">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">{responsibilityLabel}</p>
                          <p className="text-xs font-semibold leading-snug text-brand-navy">{item.owner}</p>
                        </div>
                      )}
                      <h3 className="font-serif text-xl leading-snug text-brand-navy mb-2 xl:min-h-[3.5rem]">{item.title}</h3>
                      <p className="text-sm text-text-body leading-relaxed xl:min-h-[4.75rem]">{item.description}</p>
                      {item.next && (
                        <div className="mt-auto pt-4">
                          <span className="inline-flex items-center rounded-full bg-slate-200/70 px-3 py-1 text-[11px] font-semibold text-text-muted">
                            {thenLabel} {item.next}
                          </span>
                        </div>
                      )}
                    </div>
                    {!isLast && (
                      <div className="flex justify-center">
                        <ArrowRight
                          className={cn(
                            "hidden sm:block w-4 h-4 rotate-90",
                            first48ArrowClasses[idx] ?? first48ArrowClasses[first48ArrowClasses.length - 1]
                          )}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            </MobileDisclosure>
          </div>

          <div className="h-full rounded-[32px] border border-brand-navy/10 bg-brand-navy p-8 sm:p-10 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.24)] flex flex-col">
            <div className="mb-8 xl:min-h-[11.5rem]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">
                {journeySection.continuityYear?.badge ?? "1-year continuity"}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
                {journeySection.continuityYear?.title ?? "Post-treatment continuity monitoring"}
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {journeySection.continuityYear?.subtitle ??
                  "Care does not end when the procedure ends. Recovery signals, follow-up questions, and escalation paths should remain visible long after the patient flies home."}
              </p>
            </div>
            <MobileDisclosure buttonLabel="See details" variant="dark" className="flex-1">
            <div className="flex flex-col gap-4 flex-1">
              {(journeySection.continuityYear?.items ?? []).map((item, idx, items) => {
                const isLast = idx === items.length - 1
                return (
                  <div key={`${item.phase}-${item.title}`} className="contents">
                    <div
                      className={cn(
                        "rounded-2xl border p-5 backdrop-blur-sm flex flex-col xl:min-h-[17rem]",
                        continuityCardClasses[idx] ?? continuityCardClasses[continuityCardClasses.length - 1]
                      )}
                    >
                      <div className="mb-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">{item.phase}</p>
                      </div>
                      {item.owner && (
                        <div className="mb-3 min-h-[3rem]">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/70 mb-1">{responsibilityLabel}</p>
                          <p className="text-xs font-semibold leading-snug text-white">{item.owner}</p>
                        </div>
                      )}
                      <h3 className="font-serif text-xl leading-snug text-white mb-2 xl:min-h-[3.5rem]">{item.title}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed xl:min-h-[4.75rem]">{item.description}</p>
                      {item.next && (
                        <div className="mt-auto pt-4">
                          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-slate-300">
                            {thenLabel} {item.next}
                          </span>
                        </div>
                      )}
                    </div>
                    {!isLast && (
                      <div className="flex justify-center">
                        <ArrowRight
                          className={cn(
                            "hidden sm:block w-4 h-4 rotate-90",
                            continuityArrowClasses[idx] ?? continuityArrowClasses[continuityArrowClasses.length - 1]
                          )}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            </MobileDisclosure>
          </div>
        </div>
        </div>
      </section>

      {/* Coverage — Static Grid */}
      {(t as typeof t & { coverage?: { badge: string; title: string; subtitle?: string; items: string[] } }).coverage && (() => {
        const coverage = (t as typeof t & { coverage: { badge: string; title: string; subtitle?: string; items: string[] } }).coverage
        return (
          <section className="w-full py-12 sm:py-20 px-4 sm:px-6 bg-brand-navy">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10 md:mb-14">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/70 mb-3">{coverage.badge}</p>
                <h2 className="font-serif text-2xl sm:text-3xl text-white mb-3">{coverage.title}</h2>
                {coverage.subtitle && (
                  <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">{coverage.subtitle}</p>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                {coverage.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 sm:px-5 sm:py-4 text-center select-none"
                  >
                    <span className="text-white/80 font-semibold text-xs sm:text-sm leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      {/* Explore — SEO Internal Links */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">
              {t.explore.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy">{t.explore.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.explore.items.map((item, idx) => {
              const Icon = exploreIcons[idx % exploreIcons.length]
              return (
              <Link
                key={exploreHrefs[idx]}
                href={`${prefix}${exploreHrefs[idx]}`}
                className={cn(
                  "group flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-gold/40 hover:shadow-md transition-all",
                  idx >= 3 && "hidden sm:flex"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-brand-navy font-bold mb-2 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </Link>
              )
            })}
          </div>
          {t.explore.items.length > 3 && (
            <div className="sm:hidden mt-4 text-center">
              <Link
                href={`${prefix}/explore`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors"
              >
                See all {t.explore.items.length} topics
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-12 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto rounded-[32px] border border-slate-200 bg-slate-50/40 px-5 py-10 sm:px-8 sm:py-12 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.18)]">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-serif text-4xl text-brand-navy mb-4">{t.faq.title}</h2>
            <p className="text-text-body max-w-2xl mx-auto">{t.faq.subtitle}</p>
          </div>
          {(t.faq as typeof t.faq & { groupAbout?: string }).groupAbout && (
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">
              {(t.faq as typeof t.faq & { groupAbout: string }).groupAbout}
            </h3>
          )}
          <Accordion items={faqItems.slice(0, 5)} />
          {(t.faq as typeof t.faq & { groupBoundaries?: string }).groupBoundaries && (
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-10 mb-4">
              {(t.faq as typeof t.faq & { groupBoundaries: string }).groupBoundaries}
            </h3>
          )}
          <Accordion items={faqItems.slice(5)} />
        </div>
      </section>

      {/* Single closing CTA — after FAQ */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-bg-light">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy">{t.cta.title}</h2>
          <p className="text-text-body max-w-xl mx-auto leading-relaxed">{t.cta.subtitle}</p>
          <div>
            <Link href={`${prefix}/intake`}>
              <Button size="lg" className="min-w-[280px]">
                {(t.cta as typeof t.cta & { ctaPrimary?: string }).ctaPrimary ?? "Begin Your Case Assessment"}
              </Button>
            </Link>
          </div>
          <p className="text-sm text-text-muted font-medium">
            {t.cta.openingDate}<br />
            {(t.cta as typeof t.cta & { openingDateSuffix?: string }).openingDateSuffix ?? ""}
          </p>
          <WaitlistForm
            placeholder={t.cta.waitlistPlaceholder}
            buttonLabel={t.cta.waitlistButton}
            successMessage={t.cta.waitlistSuccess}
            duplicateMessage={t.cta.waitlistDuplicate}
            locale={locale}
          />
          <Link href={`${prefix}/how-it-works`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors">
            {t.cta.ctaExplore} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

```

---

## `src/app/[locale]/ko-landing.tsx`

```tsx
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2, TrendingUp, BookOpen, ShieldCheck, Bot, Users } from "lucide-react"
import { WaitlistForm } from "@/components/landing/waitlist-form"
import type { Dictionary } from "@/i18n/get-dictionary"

interface KoLandingProps {
  dict: Dictionary
  locale: string
}

export function KoLanding({ dict, locale }: KoLandingProps) {
  const prefix = `/${locale}`
  const t = dict.koLanding
  const arch = t.architecture
  const waitlist = (t as typeof t & { waitlist?: { title?: string; openingDate?: string; waitlistButton?: string; waitlistPlaceholder?: string; waitlistSuccess?: string; waitlistDuplicate?: string } }).waitlist

  return (
    <div className="min-h-full">
      <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/og-image.jpg"
            alt="AetherHeal 의료 여정 배경"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-brand-navy/75" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(191,155,48,0.08),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold/10 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-[10px] sm:text-xs font-bold text-brand-gold uppercase tracking-widest">{t.hero.badge}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight break-keep">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed break-keep">
            {t.hero.description}
            <br className="hidden sm:block" />
            {t.hero.description2}
          </p>
        </div>
      </section>

      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">{t.audience.title}</h2>
            <p className="text-slate-600 text-lg break-keep">{t.audience.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Link href={`${prefix}/for-partners`} className="group">
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_60px_-12px_rgba(15,23,42,0.12)] hover:border-brand-gold/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7 text-brand-gold" />
                </div>
                <h3 className="font-serif text-2xl text-brand-navy font-semibold mb-3 break-keep">{t.audience.partner.title}</h3>
                <p className="text-slate-700 leading-relaxed mb-6 break-keep">
                  {t.audience.partner.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-navy group-hover:text-brand-gold transition-colors break-keep">
                  {t.audience.partner.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            <Link href={`${prefix}/for-investors`} className="group">
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_60px_-12px_rgba(15,23,42,0.12)] hover:border-brand-navy/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-brand-navy/5 flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-brand-navy" />
                </div>
                <h3 className="font-serif text-2xl text-brand-navy font-semibold mb-3 break-keep">{t.audience.investor.title}</h3>
                <p className="text-slate-700 leading-relaxed mb-6 break-keep">
                  {t.audience.investor.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-navy group-hover:text-brand-gold transition-colors break-keep">
                  {t.audience.investor.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-bg-light border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 break-keep">{arch.title}</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto break-keep">{arch.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {arch.items.map((item: { title: string; description: string }, i: number) => {
              const icons = [ShieldCheck, Users, Bot]
              const Icon = icons[i % icons.length]
              return (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-7">
                  <div className="w-11 h-11 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="font-serif text-lg text-brand-navy font-semibold mb-3 break-keep">{item.title}</h3>
                  <p className="text-[15px] text-slate-700 leading-relaxed break-keep">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-navy/5 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7 text-brand-navy" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy break-keep">{t.philosophy.title}</h2>
          <p className="text-slate-700 text-lg leading-relaxed break-keep">
            {t.philosophy.description}
          </p>
          <Link
            href={`${prefix}/our-philosophy`}
            className="inline-flex items-center gap-2 px-6 py-3 text-[15px] font-semibold text-white bg-brand-navy rounded-full hover:bg-brand-navy/90 transition-all hover:shadow-md break-keep"
          >
            {t.philosophy.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-bg-light border-t border-slate-100">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy break-keep">
            {waitlist?.title ?? "사전 등록 안내"}
          </h2>
          <p className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-sm font-semibold text-brand-gold">
            {waitlist?.openingDate ?? "2026년 9월 1일 정식 오픈"}
          </p>
          <WaitlistForm
            placeholder={waitlist?.waitlistPlaceholder ?? "이메일을 입력하세요"}
            buttonLabel={waitlist?.waitlistButton ?? "대기자 명단 등록"}
            successMessage={waitlist?.waitlistSuccess ?? "등록되었습니다! 곧 연락드리겠습니다."}
            duplicateMessage={waitlist?.waitlistDuplicate ?? "이미 등록되어 있습니다!"}
            locale={locale}
          />
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-brand-navy">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-slate-300 text-[15px] break-keep">{t.englishSite.label}</p>
          <Link
            href="/en"
            className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors font-semibold break-keep"
          >
            {t.englishSite.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

```

---

## `src/i18n/config.ts`

```ts
export const locales = ["en", "zh", "ja", "th", "ru", "ar", "hu", "de", "fr", "ko"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export const patientLocales = ["en", "zh", "ja", "th", "ru", "ar", "hu", "de", "fr"] as const
export type PatientLocale = (typeof patientLocales)[number]

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語",
  th: "ภาษาไทย",
  ru: "Русский",
  ar: "العربية",
  hu: "Magyar",
  de: "Deutsch",
  fr: "Français",
  ko: "한국어",
}

export const localeShort: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  ja: "JP",
  th: "TH",
  ru: "RU",
  ar: "AR",
  hu: "HU",
  de: "DE",
  fr: "FR",
  ko: "KO",
}

export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
  th: "th_TH",
  ru: "ru_RU",
  ar: "ar_SA",
  hu: "hu_HU",
  de: "de_DE",
  fr: "fr_FR",
  ko: "ko_KR",
}

const koOnlyRoutes = ["/for-partners", "/for-investors", "/for-team"]

const patientOnlyRoutes = [
  "/how-it-works",
  "/explore",
  "/trust-protocol",
  "/blog",
  "/how-to-choose-hospital-abroad",
  "/aesthetic-clinic-seoul",
  "/hair-transplant-korea",
  "/plastic-surgery-korea",
  "/medical-journey",
  "/medical-boundary",
  "/privacy-policy",
  "/terms-of-service",
  "/payment-refund-policy",
  "/journey-assurance",
  "/marketing-information",
]

export function isRouteAvailableForLocale(path: string, locale: Locale): boolean {
  const normalized = path.startsWith("/") ? path : `/${path}`
  const segment = `/${normalized.split("/").filter(Boolean)[0] ?? ""}`

  if (segment === "/") return true

  if (koOnlyRoutes.includes(segment)) return locale === "ko"
  if (patientOnlyRoutes.some((r) => segment.startsWith(r))) {
    return (patientLocales as readonly string[]).includes(locale)
  }

  return true
}

```

---

## `src/i18n/get-dictionary.ts`

```ts
import type { Locale } from "./config"

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  zh: () => import("./dictionaries/zh.json").then((m) => m.default),
  ja: () => import("./dictionaries/ja.json").then((m) => m.default),
  th: () => import("./dictionaries/th.json").then((m) => m.default),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default),
  hu: () => import("./dictionaries/hu.json").then((m) => m.default),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  ko: () => import("./dictionaries/ko.json").then((m) => m.default),
}

type EnDictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>
type KoDictionary = Awaited<ReturnType<(typeof dictionaries)["ko"]>>

export type Dictionary = EnDictionary & KoDictionary

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]() as Promise<Dictionary>

```

---

## `src/i18n/dictionaries/en.json`

```json
{
  "common": {
    "nav": {
      "howItWorks": "How It Works",
      "exploreFramework": "Explore",
      "trustSafety": "Trust Protocol",
      "ourPhilosophy": "Why We Exist",
      "signIn": "Sign in",
      "beginJourney": "Begin Journey",
      "blog": "Blog"
    },
    "footer": {
      "brandDescription": "Physician-led decision infrastructure for high-stake medical care.",
      "brandSubtitle": "For international patients considering care in Korea.",
      "platform": "Platform",
      "guides": "Guides",
      "company": "Company",
      "contact": "Contact",
      "copyright": "AetherHeal. All rights reserved.",
      "disclaimer": "AetherHeal provides decision support only and does not deliver medical care. In case of emergency, contact local medical services immediately.",
      "companyName": "AetherHeal Co., Ltd.",
      "representative": "Representative: Dr. Jee Hoon Ju",
      "bizRegNo": "Biz Reg No: 874-87-03734",
      "address": "B1, 64, Gingorang-ro 14-gil, Gwangjin-gu, Seoul, Republic of Korea",
      "platformLinks": {
        "howItWorks": "How It Works",
        "trustProtocol": "Trust Protocol",
        "ourPhilosophy": "Why We Exist",
        "medicalJourney": "Medical Journey",
        "explore": "Explore",
        "blog": "Blog",
        "journeyAssurance": "Journey Assurance"
      },
      "guideLinks": {
        "choosingHospital": "Choosing a Hospital Abroad",
        "hairTransplant": "Hair Transplant in Korea",
        "plasticSurgery": "Plastic Surgery in Korea",
        "aestheticClinics": "Aesthetic Clinics in Seoul"
      },
      "medicalBoundaryNotice": "Medical Boundary Notice",
      "termsOfService": "Terms of Service",
      "privacyPolicy": "Privacy Policy",
      "paymentRefundPolicy": "Payment & Refund Policy"
    },
    "continueReading": "Continue Reading",
    "contents": "Contents",
    "tableOfContents": "Table of Contents"
  },
  "home": {
    "meta": {
      "title": "AetherHeal | Verified Clinic Matching for International Patients",
      "description": "AetherHeal helps international patients choose clinics in Korea without guessing. Verified hospitals, flat-fee navigation, physician governance, and visible accountability."
    },
    "hero": {
      "badge": "Verified clinic matching for global patients considering Korea",
      "h1": "The world doesn't lack clinics.",
      "h1Highlight": "It lacks trust.",
      "description": "Work with our Angel Physicians.",
      "descriptionHighlight": "",
      "descriptionEnd": "",
      "branches": [
        "Verify hospitals",
        "Medical-grade consult",
        "Stay accountable"
      ],
      "branchConclusion": "So you're never alone.",
      "disclaimer": "Decision support before hospital commitment.",
      "disclaimer2": "Not medical treatment or emergency care.",
      "openingDate": "Opening September 1, 2026",
      "openingDateSuffix": "early assessments begin now.",
      "ctaAssessment": "Begin Your Case Assessment",
      "waitlistButton": "Join the Waitlist",
      "waitlistPlaceholder": "Enter your email",
      "waitlistSuccess": "You're on the list! We'll be in touch.",
      "waitlistDuplicate": "You're already on the list!",
      "ctaExplore": "How the process works",
      "ctaAssessment": "Start Your Decision Assessment"
    },
    "problemQuote": {
      "title": "What patients are really afraid of",
      "subtitle": "The barrier is not access. It is knowing what to trust.",
      "items": [
        {
          "title": "Misleading signals",
          "quote": "Cheaper prices and Google reviews don't tell you what's right for your case."
        },
        {
          "title": "Conflicted incentives",
          "quote": "If your intermediary profits from upselling, their recommendation isn't yours."
        },
        {
          "title": "Broken trust",
          "quote": "Trust breaks when guidance is tied to your uncertainty."
        }
      ],
      "q1": "A polished website does not tell you who is right for your case.",
      "q2": "Some intermediaries earn more when you spend more.",
      "q3": "Trust breaks when guidance is tied to your uncertainty."
    },
    "stakes": {
      "title": "Why this decision feels so heavy",
      "subtitle": "The challenge is not access. It is making a lasting decision in a market that is hard to verify from abroad.",
      "lowStake": {
        "label": "What patients feel",
        "items": [
          "Being misled",
          "Regret",
          "Going through it alone"
        ],
        "consequenceLabel": "What they need",
        "consequence": "Clarity",
        "principle": "Less noise. Better decisions."
      },
      "highStake": {
        "label": "What the market offers",
        "critical": "Structural problem",
        "items": [
          "Claims without proof",
          "Hidden commissions",
          "No accountability after payment"
        ],
        "medicine": "Trust Deficit",
        "consequenceLabel": "What it creates",
        "consequence": "Irreversible regret",
        "principle": "Unstructured markets reward marketing over fit.",
        "structuralNote": "When patients cannot verify quality, marketing wins. AetherHeal is built to change that."
      }
    },
    "aiLayer": {
      "badge": "Trust Architecture",
      "title": "How AetherHeal",
      "titleHighlight": "creates trust",
      "subtitle": "Trust should come from structure, not claims.",
      "cards": [
        {
          "title": "Verified Hospital Network",
          "description": "Not an open directory. A curated network."
        },
        {
          "title": "Flat Navigation Fee",
          "description": "The fee does not change with hospital or procedure."
        },
        {
          "title": "Journey Assurance",
          "description": "Accountability should continue after payment."
        },
        {
          "title": "Physician Governance",
          "description": "Clinical authority stays with physicians. AI supports the workflow."
        },
        {
          "title": "Procedure Transparency",
          "description": "All procedures under sedation are recorded via CCTV and close-up camera. Genuine products, verified dosage. Footage available upon request. Hospitals that decline recording may be grounds for rejection."
        }
      ],
      "footnote": "Trust is built into the system."
    },
    "patientConcerns": {
      "badge": "Where Are You in Your Decision?",
      "title": "What Brings You to Consider Care in Korea?",
      "subtitle": "This is not a procedure catalogue. Start with your situation — not a shopping list.",
      "items": [
        {
          "title": "I need a procedure but don't know which hospital to trust",
          "description": "We help you evaluate hospitals based on verified credentials, not marketing.",
          "href": "/how-it-works"
        },
        {
          "title": "I had a previous procedure that didn't go well",
          "description": "Revision cases require a different standard of decision support. We structure that process.",
          "href": "/how-it-works"
        },
        {
          "title": "I want to understand my options before committing",
          "description": "Explore the decision framework without pressure. No booking, no sales pitch.",
          "href": "/explore"
        },
        {
          "title": "I need help navigating care in a country where I don't speak the language",
          "description": "Physician-led coordination from decision to recovery — in your language.",
          "href": "/medical-journey"
        },
        {
          "title": "I want to know how AetherHeal is different from a medical tourism agency",
          "description": "We are a decision infrastructure, not a booking platform. The difference is structural.",
          "href": "/our-philosophy"
        }
      ]
    },
    "journey": {
      "sectionLabel": "Patient Journey",
      "title": "What your journey",
      "titleHighlight": "actually looks like",
      "subtitle": "AetherHeal is designed to make each step legible: what happens first, who is responsible, and when commitment should happen.",
      "steps": [
        {
          "label": "Patient Intent",
          "badge": null,
          "description": "Goals, constraints, timeline, and risk tolerance are captured.",
          "details": null,
          "owner": "Patient intake with AetherHeal",
          "next": "AI-assisted case structuring"
        },
        {
          "label": "AI-Assisted Case Structuring",
          "badge": "PRE-PHYSICIAN SUPPORT",
          "description": "Records, questions, and missing inputs are organized before physician review.",
          "details": "AI assists. Physician reviews every output.",
          "owner": "Case structuring by AetherHeal",
          "next": "Physician readiness review"
        },
        {
          "label": "Korean Licensed Physician Review",
          "badge": null,
          "description": "The physician decides whether the case is sufficiently clear to move forward.",
          "details": null,
          "owner": "Licensed physician review",
          "next": "Hospital feasibility review"
        },
        {
          "label": "Partner Hospital Feasibility Review",
          "badge": "HOSPITAL AUTHORITY",
          "description": "Partner hospitals assess feasibility within the physician-defined decision scope.",
          "details": null,
          "owner": "Hospital feasibility review",
          "next": "Decision commitment"
        },
        {
          "label": "Decision Commitment Deposit",
          "badge": "ACCOUNTABILITY TRIGGER",
          "description": "Confirms intent, secures coordination, and aligns the next operational step.",
          "details": null,
          "owner": "Decision commitment by Patient",
          "next": "Arrival, booking, and support"
        },
        {
          "label": "Journey Orchestration",
          "badge": "ARRIVAL, BOOKING & SUPPORT",
          "description": "Concierge execution begins only after physician-ready, patient-confirmed alignment.",
          "details": null,
          "owner": "1:1 Concierge by AetherHeal",
          "next": "Post-treatment continuity monitoring"
        },
        {
          "label": "Post-Treatment Continuity Monitoring",
          "badge": "AI-SUPPORTED FOLLOW-THROUGH",
          "description": "Check-ins, recovery signals, and follow-up coordination remain visible after treatment.",
          "details": null,
          "owner": "Continuity monitoring by AetherHeal + Patient",
          "next": "Escalation if concerns emerge"
        }
      ],
      "journeyOrchestrationDetails": {
        "arrival": "Arrival & Scheduling",
        "concierge": "1:1 Concierge & Translation"
      },
      "decisionReadiness": {
        "notReady": "Needs More Clarity",
        "pause": "Pause / Collect More Information",
        "ready": "Ready for Release",
        "proceed": "Proceed to Hospital Review"
      },
      "storyArc": {
        "badge": "The full story",
        "title": "What the patient journey is building toward",
        "subtitle": "The patient should be able to see the whole arc from the beginning: who guides the decision, who performs the treatment, and who keeps continuity visible afterward.",
        "items": [
          {
            "phase": "Before travel",
            "title": "Decision clarity",
            "owner": "AetherHeal + Physician"
          },
          {
            "phase": "Arrival",
            "title": "Operational handoff",
            "owner": "AetherHeal"
          },
          {
            "phase": "Treatment",
            "title": "Clinical authority",
            "owner": "Hospital"
          },
          {
            "phase": "Recovery",
            "title": "Follow-up visibility",
            "owner": "AetherHeal + Patient"
          },
          {
            "phase": "Up to 1 year",
            "title": "Continuity and escalation",
            "owner": "AetherHeal + Hospital"
          }
        ]
      },
      "first48Hours": {
        "badge": "First 48 hours",
        "title": "Your first 48 hours",
        "subtitle": "Arrival, handoff, and clinical alignment. Treatment may happen within that window or later.",
        "items": [
          {
            "time": "Arrival",
            "title": "Arrival coordination",
            "description": "We meet the patient, confirm the plan, and clarify the next step.",
            "owner": "1:1 Concierge by AetherHeal",
            "next": "Hospital handoff"
          },
          {
            "time": "First 24 hours",
            "title": "Translation, scheduling, and handoff",
            "description": "The hospital receives the case context. The patient receives language and scheduling support.",
            "owner": "Clinical coordination by AetherHeal + Hospital",
            "next": "Clinical confirmation"
          },
          {
            "time": "24-48 hours",
            "title": "Treatment readiness",
            "description": "The patient and hospital confirm whether treatment happens now, later in the trip, or after more preparation.",
            "owner": "Clinical confirmation by Hospital",
            "next": "Treatment or further coordination"
          }
        ]
      },
      "continuityYear": {
        "badge": "1-year continuity",
        "title": "Post-treatment continuity",
        "subtitle": "After the patient returns home, recovery remains visible and easier to escalate if needed.",
        "items": [
          {
            "phase": "Week 1",
            "title": "Early recovery check-ins",
            "description": "Symptoms, photos, and questions are gathered early so concerns are not missed.",
            "owner": "Early check-ins by AetherHeal + Patient",
            "next": "Expectation tracking"
          },
          {
            "phase": "Month 1-3",
            "title": "Follow-up and expectation tracking",
            "description": "Recovery is tracked against the expected timeline across distance and language.",
            "owner": "Recovery tracking by AetherHeal",
            "next": "Long-tail follow-up"
          },
          {
            "phase": "Month 3-12",
            "title": "Long-tail continuity",
            "description": "If delayed concerns appear, the case history stays organized so follow-up does not restart from zero.",
            "owner": "Escalation by AetherHeal + Hospital",
            "next": "Documented continuity"
          }
        ]
      },
      "closingQuote": "The goal is not to push you faster. The goal is to help you decide with less regret.",
      "uiLabels": {
        "responsibility": "Responsibility",
        "then": "Then:"
      }
    },
    "partners": {
      "subtitle": "Verification Standard",
      "compactTitle": "Not every hospital satisfies what we measure.",
      "compactDescription": "31% of applicants did not meet the standard.",
      "rejectionReasons": "Rejection reasons have included unverified physician credentials, undisclosed pricing structures, and refusal of procedure recording.",
      "proofPoints": [],
      "compactStats": [
        {
          "number": "13",
          "label": "Hospitals Evaluated"
        },
        {
          "number": "4",
          "label": "Rejected"
        },
        {
          "number": "9",
          "label": "Verified Partners"
        }
      ],
      "compactCta": "Trust Protocol"
    },
    "coverage": {
      "badge": "Scope of Verification",
      "title": "Where getting it right the first time matters",
      "subtitle": "AetherHeal's verification standard applies across these areas.",
      "items": [
        "Hair Transplant",
        "Skin Aesthetic",
        "Plastic Surgery",
        "Robotic Surgery",
        "Vision Correction",
        "Dental",
        "Stem Cell Therapy",
        "Liposuction & Contouring",
        "Neurosurgery",
        "General Health Check-up",
        "Full Body MRI"
      ]
    },
    "faq": {
      "title": "Common Questions",
      "subtitle": "The questions patients ask when trust matters more than volume.",
      "groupAbout": "About AetherHeal",
      "groupBoundaries": "Boundaries and safety",
      "items": [
        {
          "question": "What does AetherHeal actually do?",
          "answer": "AetherHeal helps international patients considering medical care in Korea make better decisions before committing to a hospital. We verify hospitals against a clinical standard, structure your case with physician oversight before any hospital contact, and maintain continuity after treatment through recovery monitoring. We do not provide medical care. We provide the decision infrastructure that should exist before medical care begins."
        },
        {
          "question": "Who is this for?",
          "answer": "AetherHeal is designed for international patients considering elective or high-stakes medical procedures in Korea — particularly those who want physician-level guidance before choosing a hospital. Most patients are evaluating aesthetic, reconstructive, or specialized procedures where the outcome is irreversible and the decision environment is unfamiliar. If you already have a hospital and physician you trust, you may not need us. If you are still deciding, that is exactly when we are most useful."
        },
        {
          "question": "Who is responsible at each stage of the process?",
          "answer": "Before you travel: AetherHeal and our physicians structure your decision. During treatment: the partner hospital holds clinical authority. After you return home: AetherHeal maintains continuity and escalation pathways. At no point does one party hold all three roles. That separation is by design."
        },
        {
          "question": "What happens if something goes wrong after treatment?",
          "answer": "Your case history, physician notes, and recovery timeline remain organized in AetherHeal's system for up to one year after treatment. If a concern emerges — whether in week one or month eight — you do not restart from zero. We surface the relevant history, coordinate with the partner hospital across language and time zone, and escalate if clinical re-evaluation is needed. Continuity does not end when you leave Korea."
        },
        {
          "question": "What does AI actually do inside AetherHeal?",
          "answer": "AI helps organize intake, surface missing information, support multilingual coordination, and keep post-treatment continuity signals visible. It accelerates the workflow; it does not make the medical decision."
        },
        {
          "question": "Is AetherHeal a medical tourism agency?",
          "answer": "No. AetherHeal is a decision infrastructure. Travel logistics are handled only after a structured medical decision has been made — not before."
        },
        {
          "question": "Is this medical consultation or telemedicine?",
          "answer": "No. AetherHeal is not medical consultation. It is decision preparation. Our physicians help you structure your thinking before you enter a hospital — they do not diagnose or treat. This separation preserves clarity and accountability."
        },
        {
          "question": "Can AI override a physician or choose my hospital?",
          "answer": "No. AI cannot override a physician, select your final hospital, make a diagnosis, recommend treatment, or book autonomously. Physician judgment, patient consent, and hospital feasibility remain the controlling layers."
        },
        {
          "question": "Is AetherHeal an AI doctor?",
          "answer": "No. AetherHeal is not an AI doctor, and we do not present AI as a physician substitute. AI supports information structuring and continuity workflows, but licensed physicians and partner hospitals retain medical authority."
        },
        {
          "question": "Is my information safe?",
          "answer": "We collect only what is necessary for decision support and coordination. Uploads are optional. Access is restricted by role (physician, operator) and used only for your case. We do not sell personal medical information."
        }
      ]
    },
    "explore": {
      "badge": "Explore by Topic",
      "title": "Blog written by our doctors",
      "items": [
        {
          "title": "Hair Transplant in Korea",
          "desc": "FUE, DHI, and advanced grafting — evaluated with physician-led decision support before clinic contact."
        },
        {
          "title": "Aesthetic Clinics in Seoul",
          "desc": "Navigate Seoul's aesthetic landscape with structured guidance for skin treatments and cosmetic dermatology."
        },
        {
          "title": "Plastic Surgery in Korea",
          "desc": "Rhinoplasty, contouring, and more — make informed decisions with a physician before committing."
        },
        {
          "title": "Your Medical Journey",
          "desc": "From decision to recovery, AetherHeal coordinates every step of your journey to Seoul."
        },
        {
          "title": "The AetherHeal Trust Protocol",
          "desc": "How we evaluate and maintain standards across our curated partner hospital network."
        },
        {
          "title": "Choosing a Hospital Abroad",
          "desc": "A structured framework for reducing risk when selecting a hospital in another country."
        }
      ]
    },
    "cta": {
      "title": "Clarity before commitment",
      "subtitle": "If you are considering care in Korea, start with a process designed to protect your decision — before anyone asks you to make one.",
      "ctaPrimary": "Begin Your Case Assessment",
      "openingDate": "We are opening September 1, 2026.",
      "openingDateSuffix": "Early case assessments are already underway.",
      "waitlistButton": "Join the Waitlist",
      "waitlistPlaceholder": "Enter your email",
      "waitlistSuccess": "You're on the list! We'll be in touch.",
      "waitlistDuplicate": "You're already on the list!",
      "ctaExplore": "How the process works",
      "signature": "Dr. Jee Hoon Ju"
    }
  },
  "howItWorks": {
    "meta": {
      "title": "How AetherHeal Works | System Specification",
      "description": "Learn how AetherHeal's physician-led, AI-assisted decision infrastructure works. See the authority chain, readiness states, and continuity monitoring model for medical care in Korea."
    },
    "hero": {
      "badge": "System Specification 2.0",
      "h1": "How AetherHeal",
      "h1Highlight": "Works",
      "tagline": "Physician-led, AI-assisted decision infrastructure for Korea",
      "description": "Structured medical decisions",
      "descriptionHighlight": "before",
      "descriptionEnd": "hospital commitment, logistics, and post-treatment continuity.",
      "disclaimer": "AI-assisted. Physician-authorized. Not diagnosis, treatment, or emergency care.",
      "ctaPrimary": "Begin Your Decision Journey",
      "ctaSecondary": "Explore Framework"
    },
    "angelRole": {
      "badge": "01 — Governance",
      "title": "The Angel Role",
      "subtitle": "Medical Information Support, not Sales.",
      "doesTitle": "What the Angel DOES",
      "keyDefinitionLabel": "Key Definition",
      "keyDefinition": "Angels are licensed medical doctors in Korea who hold interpretive authority over the case and review all AI-assisted structuring before release.",
      "does": [
        {
          "title": "Reviews Structured Inputs",
          "description": "Examines AI-assisted intake organization, missing data flags, and patient goals before any hospital-facing action."
        },
        {
          "title": "Holds Decision Authority",
          "description": "Clarifies risks, constraints, and expectations, then decides whether the case is ready to move forward."
        },
        {
          "title": "Translates Goals to Clinical Scope",
          "description": "Converts patient intent into a physician-authored decision frame that hospitals can review for feasibility."
        }
      ],
      "notTitle": "What the Angel is NOT",
      "not": [
        "Does not diagnose",
        "Does not treat",
        "Does not prescribe",
        "Does not delegate final judgment to AI",
        "Does not replace the hospital"
      ]
    },
    "authorityChain": {
      "badge": "02 — Authority Chain",
      "title": "Who Holds Authority, When",
      "subtitle": "AetherHeal is designed so assistance, interpretation, treatment, and operations remain clearly separated.",
      "levels": [
        {
          "label": "Layer 1",
          "title": "Patient Intent",
          "description": "The patient defines goals, constraints, timing, and personal risk tolerance."
        },
        {
          "label": "Layer 2",
          "title": "AI Support Layer",
          "description": "AI structures information, surfaces gaps, and supports monitoring, but has no authority to decide."
        },
        {
          "label": "Layer 3",
          "title": "Physician Authority",
          "description": "The Angel physician interprets the case, defines decision scope, and authorizes release to the next stage."
        },
        {
          "label": "Layer 4",
          "title": "Hospital Authority",
          "description": "The partner hospital decides clinical feasibility, treatment approach, and whether to accept the case."
        },
        {
          "label": "Layer 5",
          "title": "Operational Coordination",
          "description": "AetherHeal executes booking, travel, and continuity workflows only after the human decision chain is clear. Verified drivers, translators, and guides are dispatched through a real-time coordination platform — so logistics execution never falls on the patient."
        }
      ],
      "handoffLabel": "authority handoff",
      "footnote": "AI can support the workflow, but authority passes only between accountable human actors."
    },
    "incentiveStructure": {
      "badge": "Structural Integrity",
      "title": "Why This Structure Exists",
      "subtitle": "AetherHeal's architecture is not just organizational — it is designed to make corruption structurally impossible.",
      "items": [
        {
          "title": "Flat Navigation Fee",
          "description": "AetherHeal's navigation fee is flat — the same whether you choose a $2,000 or $20,000 procedure. No commission. No upsell incentive. Your navigator has zero financial reason to recommend anything other than what fits your medical needs."
        },
        {
          "title": "Structural Separation",
          "description": "The team that verifies hospitals is structurally separated from the team that navigates patients. This is not a policy that can be quietly changed — it is embedded in the organizational architecture."
        },
        {
          "title": "Physician Independence",
          "description": "The physician who reviews your case has no financial relationship with any hospital in the network. Their judgment is not for sale because there is no mechanism through which it could be purchased."
        }
      ],
      "footnote": "These are not policies. They are architectural decisions that make corruption structurally impossible.",
      "ctaPhilosophy": "See the full incentive architecture"
    },
    "aiAssistance": {
      "badge": "03 — AI Assistance",
      "title": "The AI Assistance Layer",
      "subtitle": "AI is used as operational and informational support, not as a clinical decision-maker.",
      "summaryLabel": "System Role",
      "summary": "The AI layer exists to reduce fragmentation: it prepares physician inputs, helps the team track what is missing, and supports continuity monitoring after treatment. Every AI-assisted output remains subordinate to physician review, patient confirmation, and hospital authority.",
      "doesTitle": "What AI Does",
      "doesItems": [
        "Structures intake, records, and questions before physician interpretation",
        "Surfaces missing documents, contradictions, and follow-up tasks for the human team",
        "Supports multilingual coordination and workflow continuity across the journey",
        "Organizes post-treatment check-ins and visibility for continuity monitoring"
      ],
      "notTitle": "What AI Does NOT Do",
      "notItems": [
        "Does not diagnose",
        "Does not recommend treatment",
        "Does not select the final hospital",
        "Does not book autonomously",
        "Does not override a physician or hospital"
      ],
      "footnote": "No AI decision is valid on its own. Human authority remains the controlling layer."
    },
    "coverage": {
      "badge": "04 — Coverage",
      "title": "High-Stake Domains",
      "subtitle": "Where getting it right the first time matters.",
      "domains": [
        "Hair Transplant",
        "Skin Aesthetic",
        "Plastic Surgery",
        "Robotic Surgery",
        "Vision Correction",
        "Dental",
        "Stem Cell Therapy",
        "Liposuction & Fat Repositioning",
        "Neurosurgery",
        "General Health Check-up",
        "Full Body MRI"
      ]
    },
    "scope": {
      "badge": "05 — Scope",
      "title": "What We Do / What We Don't Do",
      "subtitle": "Hard operational and medical boundaries prevent false expectations.",
      "doTitle": "What We Do",
      "doItems": [
        "Decision preparation with physician review of AI-assisted structuring",
        "Fit-based hospital matching within our partner network after decision readiness is confirmed",
        "Feasibility review coordination with partner hospitals",
        "Journey execution and continuity workflows with accountable human oversight"
      ],
      "dontTitle": "What We Don't Do",
      "dontBadges": [
        "No Diagnosis",
        "No Treatment Recommendation",
        "No Autonomous Booking",
        "No Final Hospital Selection",
        "No AI Decision"
      ],
      "notes": [
        "Not for emergencies. Seek immediate local care if urgent symptoms occur.",
        "Physicians retain interpretive authority. Hospitals retain treatment authority.",
        "Not a replacement for hospital care or your local doctor."
      ]
    },
    "readinessStates": {
      "badge": "06 — Readiness States",
      "title": "When a Case Is Ready",
      "subtitle": "AetherHeal does not move every case forward at the same speed. Readiness must be earned.",
      "items": [
        {
          "state": "State 1",
          "title": "Needs More Clarity",
          "description": "Information is incomplete, goals are still vague, or risk tolerance has not been clearly articulated."
        },
        {
          "state": "State 2",
          "title": "Ready for Physician Framing",
          "description": "The case has enough organized information for a physician to interpret tradeoffs and define scope."
        },
        {
          "state": "State 3",
          "title": "Ready for Hospital Review",
          "description": "The physician has authored the decision frame and the scope can now be released for feasibility review."
        },
        {
          "state": "State 4",
          "title": "Continuity Monitoring Active",
          "description": "After treatment, follow-up signals and check-ins remain visible so the team can coordinate continuity."
        }
      ],
      "footnote": "A case may pause at any state. Movement forward depends on clarity, not momentum."
    },
    "systemFlow": {
      "badge": "07 — System Flow",
      "titleParts": [
        "Intake",
        "Interpretation",
        "Continuity"
      ],
      "subtitle": "Roles are strictly defined at every step. AI support appears before physician interpretation and after treatment, not in place of medical authority.",
      "steps": [
        {
          "step": 1,
          "actor": "Patient",
          "title": "Structured Intake",
          "description": "Goals, constraints, timeline, risk tolerance"
        },
        {
          "step": 2,
          "actor": "AI Support Layer",
          "title": "Case Organization",
          "description": "Inputs organized, gaps surfaced, questions prepared"
        },
        {
          "step": 3,
          "actor": "Angel (MD)",
          "title": "Physician Interpretation",
          "description": "Context, tradeoffs, and readiness assessed",
          "emphasis": "key"
        },
        {
          "step": 4,
          "actor": "Angel (MD)",
          "title": "Decision Summary",
          "description": "Decision scope authored for downstream review",
          "emphasis": "key"
        },
        {
          "step": 5,
          "actor": "Platform",
          "title": "Readiness Lock",
          "description": "Scope frozen before any hospital-facing execution",
          "emphasis": "key"
        },
        {
          "step": 6,
          "actor": "Partner Hospital",
          "title": "Feasibility Review",
          "description": "Accept, decline, or request clarification"
        },
        {
          "step": 7,
          "actor": "Platform + Concierge",
          "title": "Quotation + Coordination",
          "description": "Deposit, scheduling, travel, and arrival planning"
        },
        {
          "step": 8,
          "actor": "AI + Journey Team",
          "title": "Continuity Monitoring",
          "description": "Post-treatment visibility, check-ins, and escalation support",
          "emphasis": "final"
        }
      ],
      "closingQuote": "AI can support the workflow. Physician authority defines the outcome."
    },
    "safety": {
      "title": "Legal & Medical Safety",
      "items": [
        {
          "title": "Safety",
          "body": "Not for emergency use. If urgent symptoms occur, seek immediate local care."
        },
        {
          "title": "AI Boundary",
          "body": "AI outputs are preparatory and monitoring support only. They do not diagnose, recommend treatment, or decide on hospitals."
        },
        {
          "title": "Data & Privacy",
          "body": "Uploads are optional. Access is role-limited. Used only for decision support, coordination, and continuity monitoring."
        }
      ]
    },
    "cta": {
      "title": "Ready to structure",
      "titleHighlight": "your decision?",
      "ctaPrimary": "Begin Your Decision Journey",
      "ctaSecondary": "Explore Framework",
      "disclaimer": "AI-assisted. Physician-authorized. No diagnosis. No treatment."
    }
  },
  "ourPhilosophy": {
    "meta": {
      "title": "Why We Exist | AetherHeal",
      "description": "Why AetherHeal exists, how it is architecturally different from medical tourism agencies, and the structural foundations that make corruption impossible by design."
    },
    "hero": {
      "badge": "Foundational Architecture",
      "h1": "Why AetherHeal",
      "h1Highlight": "Exists",
      "intro": "This is not a company pitch. It is an explanation of why a structural failure in global healthcare requires not just a better matching system, but a responsibility architecture strong enough to carry the authority it claims.",
      "disclaimer": "Written for investors, partners, physicians, and anyone who wants to understand not just the promise, but the responsibility structure underneath it."
    },
    "tldr": {
      "badge": "The Short Answer",
      "text": "Medical tourism is broken because the people who recommend hospitals profit from the recommendation while carrying too little visible responsibility for the outcome. AetherHeal fixes this structurally: the physicians who advise you earn the same flat fee regardless of which hospital you choose, and the platform is designed to define, trace, and carry responsibility instead of hiding behind marketing language."
    },
    "toc": [
      {
        "id": "the-problem",
        "label": "The Problem We Named"
      },
      {
        "id": "the-architecture",
        "label": "The Architecture We Built"
      },
      {
        "id": "the-incentive",
        "label": "The Incentive Structure"
      },
      {
        "id": "the-ai-boundary",
        "label": "The AI Boundary"
      },
      {
        "id": "the-founder",
        "label": "The Founder's Obligation"
      }
    ],
    "theProblem": {
      "title": "The Problem We Named",
      "summary": "Why patients can't trust medical tourism — and why better marketing won't fix it.",
      "p1": "In 1970, economist George Akerlof described how markets fail when buyers cannot verify quality before purchase. Sellers of low-quality goods drive out sellers of high-quality goods — because the buyer cannot tell the difference. The market fills with lemons. Akerlof won the Nobel Prize for this insight in 2001.",
      "p2": "Global medical tourism is a textbook Akerlof market. Patients cannot evaluate surgical skill, hospital safety, or post-operative care quality from another country. The only signals visible are price, marketing spend, and before-and-after photos — none of which correlate reliably with clinical outcomes.",
      "p3": "The result is predictable: agencies that spend the most on marketing win the most patients. Physicians with the best clinical outcomes have no credible way to signal their quality. Patients make consequential decisions about their bodies based on information that is structurally unreliable.",
      "callout": "This is not a trust problem. It is an Akerlof problem — and Akerlof problems require institutional solutions, not better marketing.",
      "cycleTitle": "The Lemon Market Cycle",
      "cycleSteps": [
        "Agencies earn commissions on expensive procedures",
        "Patients choose by marketing, not clinical quality",
        "Good physicians have no credible signal",
        "Market fills with low-quality actors"
      ],
      "cycleResult": "Equilibrium: stable and harmful"
    },
    "theArchitecture": {
      "title": "The Architecture We Built",
      "summary": "An independent verification layer between patients and hospitals — like the Michelin Guide for healthcare.",
      "p1": "The solution is not a better marketplace. It is the institutional trust layer that the industry has never had — the verification standard that makes physician quality legible to patients who cannot evaluate it themselves, while also making the platform's own responsibilities visible.",
      "p2": "Consider the Michelin Guide: it is not a restaurant. It is the standard through which restaurants earn recognition across cities and countries. Before the Michelin Guide, diners had no reliable way to evaluate quality beyond word of mouth. After the Michelin Guide, the standard itself carried the trust. Chefs compete to meet the standard — because recognition from an independent, incentive-aligned authority cannot be purchased.",
      "p3": "AetherHeal occupies the same structural position for global medical travel. We are not a hospital. We are not an agency. We are the verification standard layer — separated from the execution layer, governed by physicians who have no financial interest in the outcome of any individual patient's decision, and explicit about where platform responsibility begins and ends.",
      "callout": "We are not building a better medical tourism agency. We are building a physician-governed trust standard with a responsibility architecture strong enough to deserve trust.",
      "layers": [
        {
          "label": "International Patients",
          "detail": "Cannot evaluate quality across borders"
        },
        {
          "label": "AetherHeal Verification Standard",
          "detail": "Physician-governed, incentive-separated, publicly inspectable"
        },
        {
          "label": "Hospitals & Physicians",
          "detail": "Clinical excellence, verified independently"
        }
      ],
      "beforeLabel": "Before: Bilateral trust required for every transaction",
      "afterLabel": "After: The standard carries the trust"
    },
    "theIncentive": {
      "title": "The Incentive Structure",
      "summary": "A flat fee that makes our financial interests identical to the patient's medical interests.",
      "p1": "Anyone can claim physician leadership. Anyone can write a Trust Protocol page. What no competitor can replicate is a fee structure where the platform literally earns the same amount whether a patient chooses a $2,000 procedure or a $20,000 one.",
      "p2": "AetherHeal's patient navigation fee is flat. The team that verifies hospitals is structurally separated from the team that navigates patients. The physician who reviews your case has no financial relationship with any hospital in the network.",
      "p3": "These are not policies. Policies require enforcement and can be quietly abandoned when revenue is slow. These are architectural decisions — built into the fee structure, the organizational chart, and the governance model. They make it harder to profit from uncertainty without carrying visible accountability for the decision process.",
      "callout": "Our business model is designed so that as influence increases, responsibility becomes more visible — not less. That is not a policy. It is a structural fact.",
      "comparison": {
        "traditional": {
          "label": "Traditional Agency",
          "items": [
            {
              "text": "Commission on procedure cost",
              "negative": true
            },
            {
              "text": "Same team refers and verifies",
              "negative": true
            },
            {
              "text": "Earns more from expensive options",
              "negative": true
            },
            {
              "text": "Physician tied to hospital revenue",
              "negative": true
            }
          ]
        },
        "aetherheal": {
          "label": "AetherHeal",
          "items": [
            {
              "text": "Flat fee regardless of procedure cost",
              "negative": false
            },
            {
              "text": "Verification and navigation fully separated",
              "negative": false
            },
            {
              "text": "Earns same from $2K or $20K procedure",
              "negative": false
            },
            {
              "text": "Physician has zero hospital financial ties",
              "negative": false
            }
          ]
        }
      },
      "principles": [
        {
          "title": "Flat Navigation Fee",
          "body": "The same fee whether the procedure costs $2,000 or $20,000. No commission. No upsell incentive."
        },
        {
          "title": "Separation Principle",
          "body": "The team that verifies hospitals never navigates patients. The team that navigates patients never verifies hospitals."
        },
        {
          "title": "Physician Independence",
          "body": "Reviewing physicians have no equity, referral fees, or financial relationship with any partner hospital."
        }
      ]
    },
    "theAiBoundary": {
      "title": "The AI Boundary",
      "summary": "AI assists with organization and logistics. It never makes medical decisions or chooses your hospital.",
      "p1": "AI inside AetherHeal organizes complexity. It structures intake information, surfaces missing records, supports multilingual coordination, and extends post-treatment continuity monitoring.",
      "p2": "It does not make medical decisions. It does not choose your hospital. It does not override physician judgment. This is not a limitation we impose reluctantly — it is the foundational design principle.",
      "p3": "The philosopher Martin Heidegger warned that technology's deepest danger is not that it fails, but that it reframes everything as a resource to be optimized. Edmund Pellegrino, the philosopher of medicine, argued that medicine is a moral enterprise — not a technical one. The moment an AI layer replaces the physician's reading of the human being in front of them, the system has failed at the deepest level, even if every metric looks good.",
      "callout": "AI organizes information so the physician can focus on the human. The physician reads the human first, the profile second.",
      "ctaHowItWorks": "See the full AI governance breakdown"
    },
    "theFounder": {
      "title": "The Founder's Obligation",
      "bridge": "The sections above describe the structural logic. But structures don't build themselves — they come from people who have a reason to care. Here is why this one exists.",
      "p1": "Dr. Jee Hoon Ju is an American Board of Aesthetic Medicine certified skin aesthetic medicine specialist and hair transplant surgeon who had two procedures as a patient. The first failed — because price was the only signal he could read. He only understood what had been done to him after he became a specialist in the field.",
      "p2": "AetherHeal is not built because a founder identified a market opportunity. It is built because a physician was blinded by the problem he is solving — and spent years acquiring the clinical expertise to understand exactly what went wrong and why the market made it inevitable.",
      "p3": "The philosopher Emmanuel Levinas wrote that genuine moral obligation begins with the encounter — when you truly see someone's vulnerability and can no longer look away. This is not a pitch deck story. It is the reason a trust platform cannot claim authority without also designing how it will bear responsibility when the stakes are real.",
      "callout": "I am not building this because I identified a market opportunity. I am building this because I was blinded by the problem I am solving — and because trust without responsibility is only marketing language.",
      "timeline": [
        {
          "year": "Patient",
          "event": "First hair transplant failed — price was the only signal available"
        },
        {
          "year": "Student",
          "event": "Entered medical school to understand what went wrong"
        },
        {
          "year": "Specialist",
          "event": "Certified by the American Board of Aesthetic Medicine — understood the structural failure from the physician's side"
        },
        {
          "year": "Founder",
          "event": "Built AetherHeal to correct the market that blinded him"
        }
      ]
    },
    "closing": {
      "title": "What This Means for You",
      "patient": "If you are a patient — you are entering a system designed so that no one profits from misleading you.",
      "hospital": "If you are a hospital — you are joining a standard that rewards the quality you already deliver.",
      "investor": "If you are an investor — you are funding infrastructure, not a marketplace. Standards compound differently than transactions. AetherHeal operates two compounding networks: a verified hospital network and a verified concierge network of drivers, translators, and guides. Each network reinforces the other — and neither can be replicated by simply building a better app.",
      "cta": "See How It Works"
    }
  },
  "trustProtocol": {
    "meta": {
      "title": "The AetherHeal Trust Protocol | AetherHeal",
      "description": "How AetherHeal governs human and AI-assisted decision support through independent oversight, auditable protocol enforcement, and selective partner hospital standards."
    },
    "hero": {
      "badge": "Governance",
      "h1": "The AetherHeal",
      "h1Highlight": "Trust Protocol",
      "intro": "Independent governance oversees both human and AI-assisted decision support so each case remains clinically bounded, auditable, and accountable. The goal is not only to make trust visible, but to make responsibility visible wherever authority is claimed.",
      "disclaimer": "Trust reviewers remain read-only reviewers. They may halt, defer, or request re-clarification when protocol standards are not met. Their role is not to escape responsibility, but to define and enforce it clearly."
    },
    "tldr": {
      "badge": "In Short",
      "points": [
        "Physicians review every case — AI assists but never decides.",
        "The people who advise you don't profit from which hospital you choose.",
        "Partner hospitals are selectively verified and re-evaluated regularly.",
        "Every decision is logged, auditable, and traceable to a responsible human."
      ]
    },
    "toc": [
      {
        "id": "purpose",
        "label": "Purpose, Authority & Independence"
      },
      {
        "id": "responsibility-architecture",
        "label": "Responsibility Architecture"
      },
      {
        "id": "ai-governance",
        "label": "AI Governance, Auditability & Enforcement"
      },
      {
        "id": "incentive-separation",
        "label": "Incentive Separation"
      },
      {
        "id": "partner-criteria",
        "label": "Partner Hospital Criteria"
      },
      {
        "id": "what-this-means",
        "label": "What This Means for Patients"
      },
      {
        "id": "trust-scope",
        "label": "Trust Protocol Scope"
      },
      {
        "id": "team",
        "label": "Who Runs the Trust Protocol"
      },
      {
        "id": "ongoing",
        "label": "Ongoing Accountability"
      }
    ],
    "purpose": {
      "title": "Purpose, Authority & Independence",
      "protocolDocument": "Protocol Document",
      "purposeTitle": "Purpose",
      "purposeText": "The Trust Protocol exists to maintain the integrity of AetherHeal's decision support process across both human and AI-assisted workflows. It is independent from clinical operations, reports directly to platform governance, and helps define what responsibility the platform does and does not carry at each layer.",
      "authorityTitle": "Authority",
      "authorityText": "Trust reviewers have read-only access to completed decision summaries, protocol logs, and governed AI artifacts used in the case flow. They can flag concerns, request review, and escalate issues, but they cannot rewrite patient-facing documents or alter clinical recommendations. This preserves accountability instead of blurring it.",
      "independenceTitle": "Independence",
      "independenceText": "The Trust Protocol team operates on a separate reporting line from clinical operations, provider relations, and commercial execution. This separation protects oversight quality from operational pressure, referral incentives, and automation convenience."
    },
    "responsibilityArchitecture": {
      "title": "Responsibility Architecture",
      "intro": "AetherHeal does not describe itself as a simple marketplace. That matters. The more authority a platform claims over a decision, the more clearly it must define the responsibility it carries.",
      "positions": [
        {
          "title": "Pure Intermediary",
          "body": "A platform that only connects buyers and sellers can try to minimize responsibility by claiming the outcome belongs entirely to the two parties. The tradeoff is that trust stays weak and fragmented."
        },
        {
          "title": "Credentialing Platform",
          "body": "A platform that sets standards and verifies participants carries more authority. Trust can transfer through the standard, but the platform is now accountable for whether that standard is meaningful."
        },
        {
          "title": "Decision Infrastructure",
          "body": "A platform that structures cases, filters options, and shapes decision paths enters the chain of responsibility directly. That is AetherHeal's position, which is why accountability must be designed into the system."
        }
      ],
      "principleIntro": "The governing principle is simple:",
      "principleText": "Influence and responsibility must expand together. If a platform helps shape a medical decision, it should not hide behind the language of neutrality.",
      "guardrails": [
        "Define clearly what AetherHeal is responsible for and what remains provider responsibility.",
        "Treat legal boundaries and moral responsibility as related but not identical.",
        "Use adverse outcomes, audits, and patient feedback as learning inputs rather than reputation leaks to bury."
      ],
      "callout": "Trust without responsibility is only marketing language. AetherHeal's claim is stronger: if we ask for trust, we must make our responsibility legible."
    },
    "aiGovernance": {
      "title": "AI Governance, Auditability & Enforcement",
      "intro": "AI may support narrow parts of the process, but only inside defined operational boundaries. The governing standard is not speed or automation volume. It is decision quality, traceability, and safe escalation.",
      "principles": [
        {
          "title": "Constrained Use",
          "body": "AI may help structure intake, summarize records, support translation, and surface missing information within approved rules. It is not permitted to expand clinical scope, simulate certainty, or replace accountable human review."
        },
        {
          "title": "Human Review",
          "body": "Patient-facing summaries, protocol exceptions, and provider-routing decisions require accountable human review before they are relied upon. AI can assist preparation, but ownership remains with licensed physicians, trust reviewers, or designated operations staff."
        },
        {
          "title": "Audit Trail",
          "body": "Key prompts, outputs, edits, approvals, and exceptions are logged so that a case can be reconstructed and reviewed. Auditability is treated as a control requirement, not an optional feature."
        },
        {
          "title": "Protocol Enforcement",
          "body": "When inputs are incomplete, ambiguous, out of scope, or safety-relevant, the governed response is to halt, defer, or request re-clarification. Proceeding is valid only when the record is sufficiently clear and accountable."
        }
      ],
      "validTitle": "Valid protocol outcomes",
      "outcomes": [
        {
          "label": "Halt",
          "body": "Used when the case is outside scope, safety-relevant, or cannot proceed without direct human intervention."
        },
        {
          "label": "Defer",
          "body": "Used when the case may proceed later, but timing, documentation, or readiness is not yet sufficient."
        },
        {
          "label": "Re-clarify",
          "body": "Used when the case can remain active, but claims, goals, records, or assumptions need to be restated more precisely."
        },
        {
          "label": "Proceed",
          "body": "Used only after the case has passed the relevant protocol checks and accountable humans confirm that the next step is appropriate."
        }
      ]
    },
    "incentiveSeparation": {
      "title": "Decision Integrity Through Incentive Separation",
      "akerlofFraming": "In 1970, economist George Akerlof described how markets fail when buyers cannot verify quality. Medical tourism is a textbook case. AetherHeal's incentive architecture is designed to structurally correct this failure.",
      "p1": "In most medical travel platforms, the same entity that recommends a hospital also profits from the referral. That conflict can affect both people and software: case flow begins optimizing for conversion rather than judgment quality.",
      "p2": "AetherHeal is architecturally different. We separate the platform into independent layers with distinct incentives, reporting lines, and controls. AI systems, where used, are governed inside those same boundaries and are not allowed to optimize provider steering or case closure for commercial gain.",
      "structuralCallout": "Our business model is designed so that influence cannot expand without visible responsibility expanding with it. That alignment is structural, not aspirational.",
      "angelLayer": {
        "label": "Layer 1",
        "title": "Angel Layer",
        "description": "Physician advisors guide the patient's decision process. AI tooling may assist documentation inside this layer, but it cannot introduce provider preference, make final routing choices, or close a case autonomously.",
        "incentiveLabel": "Incentive Tied To",
        "incentives": [
          "Quality and completeness of clinician-reviewed decision support",
          "Patient understanding and informed consent",
          "Protocol adherence, including AI constraint compliance"
        ]
      },
      "providerLayer": {
        "label": "Layer 2",
        "title": "Medical Provider",
        "description": "Partner hospitals and clinics deliver clinical care only after decision scope, protocol checks, and accountable approvals are satisfied. Their role is treatment delivery, not upstream decision shaping.",
        "incentiveLabel": "Incentive Tied To",
        "incentives": [
          "Clinical outcomes and treatment delivery",
          "Patient satisfaction and recovery quality",
          "Adherence to agreed care and continuity protocols"
        ]
      },
      "principleIntro": "The structural principle is simple:",
      "principleText": "The people and systems that help structure your decision are not rewarded for steering you toward a particular provider. Human reviewers and governed AI workflows are constrained so decision support remains separate from treatment profit."
    },
    "partnerCriteria": {
      "title": "Partner Hospital Criteria",
      "intro": "Not every hospital in Seoul meets our standards. AetherHeal operates a selective partner network where each institution is assessed across multiple dimensions before joining:",
      "items": [
        "Clinical expertise and surgeon specialization depth",
        "Facility standards and equipment certification",
        "Ethical practice history and patient complaint records",
        "Cross-border patient experience and language support",
        "Alignment with AetherHeal's decision-first philosophy",
        "Post-treatment follow-up and continuity protocols"
      ]
    },
    "whatThisMeans": {
      "title": "What This Means",
      "audiences": [
        {
          "label": "For Patients",
          "body": "When AetherHeal matches you with a partner hospital, that match is based on your clinical profile, documented constraints, and reviewed decision summary — not on commissions, marketing pressure, or opaque automation. The point is not only to guide you, but to make the chain of responsibility legible."
        },
        {
          "label": "For Hospitals",
          "body": "Verification is earned through structural compliance, not payment. Maintaining AetherHeal Verified status requires ongoing adherence to communication, documentation, and care standards reviewed independently of the commercial team."
        },
        {
          "label": "For Regulators",
          "body": "If a case is incomplete or ambiguous, halt, defer, and re-clarify are treated as valid safeguards rather than service failures. Every protocol decision is logged, auditable, and traceable to an accountable human."
        }
      ]
    },
    "trustScope": {
      "title": "Trust Protocol Scope",
      "intro": "Clear boundaries define what trust reviewers do and do not do.",
      "doTitle": "Trust Reviewers Do",
      "doItems": [
        "Review decision summary quality",
        "Verify AI and human process logs",
        "Audit protocol enforcement and exception handling",
        "Ensure patient consent integrity",
        "Monitor system-wide patterns",
        "Flag safety or compliance concerns"
      ],
      "dontTitle": "Trust Reviewers Don't",
      "dontItems": [
        "Override treatment decisions at the provider level",
        "Contact patients directly as treating clinicians",
        "Modify decision summaries or logs retroactively",
        "Provide diagnosis, prescriptions, or medical advice",
        "Share patient data externally outside authorized process",
        "Bypass halt, defer, or re-clarify controls"
      ]
    },
    "team": {
      "title": "Who Runs the Trust Protocol?",
      "roles": [
        {
          "title": "Medical Quality Reviewer",
          "description": "Reviews the clinical clarity and completeness of decision summaries before they are relied upon downstream."
        },
        {
          "title": "AI Governance Reviewer",
          "description": "Checks whether AI-assisted steps stayed within approved constraints, logging rules, and escalation standards."
        },
        {
          "title": "Process Integrity Reviewer",
          "description": "Validates that required protocol gates, approvals, and exceptions were handled correctly for each case."
        },
        {
          "title": "Patient Safety Reviewer",
          "description": "Monitors for scope violations, unsafe claims, or workflow patterns that could compromise patient protection."
        }
      ]
    },
    "ongoing": {
      "title": "Ongoing Accountability",
      "text": "Verification is not a one-time event. AetherHeal maintains ongoing review of partner institutions, human reviewer performance, and AI-assisted workflow behavior through audits, patient feedback, adverse-outcome learning, and periodic re-evaluation.",
      "checklist": [
        "Quarterly protocol compliance audits",
        "Annual partner re-verification reviews",
        "Continuous AI workflow behavior monitoring",
        "Patient feedback integration into standards"
      ],
      "boxTitle": "Standards remain enforceable",
      "boxText": "If repeated deviations, undocumented overrides, unsafe automation patterns, or serious outcome concerns appear, the relevant workflow or partner relationship may be paused, remediated, or removed. Accountability is part of the product, not an afterthought."
    },
    "relatedPages": [
      {
        "label": "How to Choose a Hospital Abroad",
        "desc": "A framework for safer decisions"
      },
      {
        "label": "Your Medical Journey",
        "desc": "Phase-by-phase coordination with clear ownership"
      },
      {
        "label": "How AetherHeal Works",
        "desc": "The system behind physician-led decision support"
      }
    ]
  },
  "explore": {
    "meta": {
      "title": "Explore the Framework | AetherHeal",
      "description": "Review how structured medical decision support works. Learn the AetherHeal framework before committing to any treatment or hospital."
    },
    "hero": {
      "badge": "Exploration Mode",
      "h1": "Learn the Framework Before You Commit",
      "subtitle": "Review how structured medical decision support works. No account, no pressure, and no treatment decisions required yet.",
      "cta": "Continue to how it works"
    },
    "concepts": {
      "title": "Core Concepts",
      "subtitle": "Each concept helps prevent avoidable regret.",
      "items": [
        {
          "title": "Risk Tolerance",
          "front": "You are not just choosing a procedure. You are choosing which risks you are willing to tolerate.",
          "back": "Every procedure carries a risk profile. Your Angel physician helps you understand the specific risks for your case and determine which trade-offs are acceptable to you."
        },
        {
          "title": "Biological Contract",
          "front": "You are entering a contract with your body regarding recovery burden and healing time.",
          "back": "Recovery is not optional — it is a biological obligation. Understanding the healing timeline and its demands is essential before any commitment."
        },
        {
          "title": "Acceptable Outcome",
          "front": "The goal is an outcome that remains acceptable even if it is not structurally perfect.",
          "back": "Perfection is not a clinical standard. Your physician helps you define what an acceptable outcome looks like for your anatomy and goals."
        }
      ]
    },
    "failureReasons": {
      "badge": "Why Decisions Fail",
      "title": "Common Regret Patterns",
      "items": [
        {
          "label": "Visual Bias",
          "description": "Deciding based on \"best-case\" photos alone"
        },
        {
          "label": "Price Optimization",
          "description": "Treating biological changes like commodity purchases"
        },
        {
          "label": "Popularity Confusion",
          "description": "Assuming trending procedures are appropriate"
        },
        {
          "label": "Constraint Denial",
          "description": "Failing to define recovery timeline"
        }
      ]
    },
    "caseStudies": {
      "badge": "Before & After Gallery",
      "title": "Hair Transplant Before & After",
      "subtitle": "Initial approved FUE hair transplant cases.",
      "cases": [
        {
          "id": "HT-8291",
          "number": "01",
          "title": "Hair Transplant",
          "goal": "Rebuild frontal density without overharvesting donor supply",
          "constraint": "Limited donor area and a short recovery window",
          "preparation": "AI separated density goals from hairline lowering, flagged the donor-supply mismatch, and queued missing scalp-history questions for physician review."
        },
        {
          "id": "RH-1044",
          "number": "02",
          "title": "Rhinoplasty",
          "goal": "Straighten the bridge and refine the tip while keeping a natural look",
          "constraint": "Thick skin and low tolerance for revision",
          "preparation": "AI mapped the tension between dramatic refinement and tissue limits, then assembled a physician-ready summary of anatomy, priorities, and prior filler history."
        },
        {
          "id": "SK-3302",
          "number": "03",
          "title": "Skin Lifting",
          "badge": "NON-SURGICAL",
          "goal": "Restore jawline definition with minimal downtime",
          "constraint": "Non-surgical only and recent prior energy-device treatment",
          "preparation": "AI highlighted the mismatch between lifting expectations and downtime limits, prompted missing device-history details, and prepared a concise brief for physician interpretation."
        }
      ],
      "caseLabel": "Case",
      "maleCaseTitle": "Male Case 1",
      "femaleCaseTitle": "Female Case 1",
      "maleCase2Title": "Male Hairline Case 2",
      "femaleCase2Title": "Female Hairline Case 2",
      "hairlineCaseLabel": "Hairline case",
      "beforeAfterLabel": "Before / After",
      "beforeLabel": "Before",
      "afterLabel": "After",
      "placeholder": "Image placeholder",
      "disclaimer": "Patient photos shown for layout and presentation purposes.",
      "contextBannerTitle": "These photos are for context, not comparison",
      "contextBannerText": "Before/after images show procedural range, not promised outcomes. Every case is unique. AetherHeal uses these references to support informed decision-making — not to encourage shopping by appearance.",
      "searchPlaceholder": "Search procedures...",
      "jumpToLabel": "Jump to",
      "noResultsLabel": "No matching procedures found."
    },
    "aiPreparation": {
      "badge": "Before You Book",
      "title": "What AI Helps Patients Prepare",
      "intro": "Before any hospital is contacted, AI helps turn scattered patient goals, constraints, and questions into a more structured starting point for physician review.",
      "outputs": [
        {
          "title": "Goal hierarchy",
          "body": "Organizes primary goals, secondary preferences, and non-negotiables so trade-offs become visible early."
        },
        {
          "title": "Mismatch map",
          "body": "Highlights where anatomy, timeline, budget, recovery expectations, or stated goals may conflict with one another."
        },
        {
          "title": "Missing-info prompts",
          "body": "Surfaces unanswered questions and missing details that a physician will need before meaningful interpretation."
        },
        {
          "title": "Physician-ready summary",
          "body": "Packages the case into a concise brief a physician can review, refine, challenge, and translate into next-step judgment."
        }
      ],
      "boundaryLabel": "Boundary Note",
      "boundaryNote": "AI prepares and structures information. Physicians interpret medical meaning, assess feasibility, and decide what matters clinically."
    },
    "disciplines": {
      "badge": "Coverage",
      "title": "Supported Clinical Disciplines",
      "items": [
        "Hair Transplant",
        "Skin Aesthetic",
        "Plastic Surgery",
        "Robotic Surgery",
        "Vision Correction",
        "Dental",
        "Stem Cell Therapy",
        "Liposuction & Fat Repositioning",
        "Neurosurgery",
        "General Health Check-up",
        "Full Body MRI"
      ],
      "cta": "Ready to see the full step-by-step process?",
      "ctaHowItWorks": "How AetherHeal works",
      "ctaMedicalBoundary": "Read medical boundary"
    },
    "caseStudyTabs": {
      "title": "Comprehensive Before & After Gallery",
      "subtitle": "Browse real patient cases across face, body, and hair procedures.",
      "tabLabels": {
        "face": "Face",
        "body": "Body",
        "hair": "Hair",
        "skin": "Skin"
      },
      "categories": {
        "facelift": {
          "title": "Facelift",
          "cases": [
            {
              "title": "Facelift Case 1",
              "subtitle": "SMAS facelift"
            },
            {
              "title": "Facelift Case 2",
              "subtitle": "Deep plane lift"
            },
            {
              "title": "Facelift Case 3",
              "subtitle": "Lower face lift"
            },
            {
              "title": "Facelift Case 4",
              "subtitle": "SMAS facelift"
            },
            {
              "title": "Facelift Case 5",
              "subtitle": "Mid-face lift"
            },
            {
              "title": "Facelift Case 6",
              "subtitle": "Full SMAS lift"
            },
            {
              "title": "Facelift Case 7",
              "subtitle": "Lower face and neck"
            }
          ]
        },
        "rhinoplasty": {
          "title": "Rhinoplasty",
          "cases": [
            {
              "title": "Rhinoplasty Case 1",
              "subtitle": "Bridge and tip correction"
            },
            {
              "title": "Rhinoplasty Case 2",
              "subtitle": "Dorsal hump reduction"
            },
            {
              "title": "Rhinoplasty Case 3",
              "subtitle": "Tip refinement"
            },
            {
              "title": "Rhinoplasty Case 4",
              "subtitle": "Full rhinoplasty"
            },
            {
              "title": "Rhinoplasty Case 5",
              "subtitle": "Bridge straightening"
            },
            {
              "title": "Rhinoplasty Case 6",
              "subtitle": "Alar reduction"
            },
            {
              "title": "Rhinoplasty Case 7",
              "subtitle": "Deviated septum correction"
            },
            {
              "title": "Rhinoplasty Case 8",
              "subtitle": "Revision rhinoplasty"
            }
          ]
        },
        "facialContouring": {
          "title": "Facial Contouring",
          "cases": [
            {
              "title": "Contouring Case 1",
              "subtitle": "V-line jaw reduction"
            },
            {
              "title": "Contouring Case 2",
              "subtitle": "Zygoma + mandible"
            },
            {
              "title": "Contouring Case 3",
              "subtitle": "Jaw reduction"
            },
            {
              "title": "Contouring Case 4",
              "subtitle": "Full contouring"
            },
            {
              "title": "Contouring Case 5",
              "subtitle": "Square jaw reduction"
            },
            {
              "title": "Contouring Case 6",
              "subtitle": "Cheekbone reduction"
            },
            {
              "title": "Contouring Case 7",
              "subtitle": "Mandible contouring"
            },
            {
              "title": "Contouring Case 8",
              "subtitle": "Mini V-line"
            }
          ]
        },
        "eyes": {
          "title": "Eyes",
          "cases": [
            {
              "title": "Double Eyelid Case 1",
              "subtitle": "Incisional method"
            },
            {
              "title": "Double Eyelid Case 2",
              "subtitle": "Non-incisional"
            },
            {
              "title": "Under-Eye Case 1",
              "subtitle": "Fat repositioning"
            },
            {
              "title": "Under-Eye Case 2",
              "subtitle": "Lower blepharoplasty"
            },
            {
              "title": "Double Eyelid Case 3",
              "subtitle": "Ptosis correction"
            },
            {
              "title": "Double Eyelid Case 4",
              "subtitle": "Incisional revision"
            },
            {
              "title": "Under-Eye Case 3",
              "subtitle": "Fat removal"
            },
            {
              "title": "Under-Eye Case 4",
              "subtitle": "Dark circle correction"
            }
          ]
        },
        "doubleChin": {
          "title": "Double Chin",
          "cases": [
            {
              "title": "Double Chin Case 1",
              "subtitle": "Submental liposuction"
            },
            {
              "title": "Double Chin Case 2",
              "subtitle": "Chin reduction"
            },
            {
              "title": "Double Chin Case 3",
              "subtitle": "Fat removal"
            },
            {
              "title": "Double Chin Case 4",
              "subtitle": "Chin contouring"
            },
            {
              "title": "Double Chin Case 5",
              "subtitle": "Submental suction"
            },
            {
              "title": "Double Chin Case 6",
              "subtitle": "Neck liposuction"
            },
            {
              "title": "Double Chin Case 7",
              "subtitle": "Jawline definition"
            },
            {
              "title": "Double Chin Case 8",
              "subtitle": "Full chin sculpting"
            }
          ]
        },
        "breastAugmentation": {
          "title": "Breast Augmentation",
          "cases": [
            {
              "title": "Augmentation Case 1",
              "subtitle": "Silicone implants"
            },
            {
              "title": "Augmentation Case 2",
              "subtitle": "Teardrop implants"
            },
            {
              "title": "Augmentation Case 3",
              "subtitle": "Round implants"
            },
            {
              "title": "Augmentation Case 4",
              "subtitle": "Dual plane"
            },
            {
              "title": "Augmentation Case 5",
              "subtitle": "Subfascial placement"
            },
            {
              "title": "Augmentation Case 6",
              "subtitle": "Under-muscle implants"
            },
            {
              "title": "Augmentation Case 7",
              "subtitle": "Anatomical implants"
            },
            {
              "title": "Augmentation Case 8",
              "subtitle": "Cohesive gel"
            }
          ]
        },
        "breastReduction": {
          "title": "Breast Reduction",
          "cases": [
            {
              "title": "Reduction Case 1",
              "subtitle": "Vertical reduction"
            },
            {
              "title": "Reduction Case 2",
              "subtitle": "Anchor pattern"
            },
            {
              "title": "Reduction Case 3",
              "subtitle": "Breast reduction"
            },
            {
              "title": "Reduction Case 4",
              "subtitle": "Reduction mammoplasty"
            },
            {
              "title": "Reduction Case 5",
              "subtitle": "Superior pedicle"
            },
            {
              "title": "Reduction Case 6",
              "subtitle": "Inverted-T reduction"
            },
            {
              "title": "Reduction Case 7",
              "subtitle": "Bilateral reduction"
            },
            {
              "title": "Reduction Case 8",
              "subtitle": "Circumareolar technique"
            }
          ]
        },
        "liposuction": {
          "title": "Liposuction",
          "cases": [
            {
              "title": "Abdomen Case 1",
              "subtitle": "Abdominal liposuction"
            },
            {
              "title": "Thigh Case 1",
              "subtitle": "Thigh contouring"
            },
            {
              "title": "Arm Case 1",
              "subtitle": "Arm liposuction"
            },
            {
              "title": "Abdomen Case 2",
              "subtitle": "Full abdomen sculpting"
            },
            {
              "title": "Abdomen Case 3",
              "subtitle": "Lower abdomen"
            },
            {
              "title": "Thigh Case 2",
              "subtitle": "Inner thigh contouring"
            },
            {
              "title": "Thigh Case 3",
              "subtitle": "Outer thigh sculpting"
            }
          ]
        },
        "hairTransplant": {
          "title": "Hair Transplant",
          "cases": [
            {
              "title": "Male Case 1",
              "subtitle": "FUE 2500 follicles"
            },
            {
              "title": "Female Case 1",
              "subtitle": "FUE 1500 follicles"
            },
            {
              "title": "Male Hairline Case 2",
              "subtitle": "FUE 2000 follicles"
            },
            {
              "title": "Female Hairline Case 2",
              "subtitle": "FUE 1750 follicles"
            }
          ]
        },
        "browLift": {
          "title": "Brow & Forehead Lift",
          "cases": [
            {
              "title": "Brow Lift Case 1",
              "subtitle": "Endoscopic brow lift"
            },
            {
              "title": "Brow Lift Case 2",
              "subtitle": "Direct brow lift"
            },
            {
              "title": "Brow Lift Case 3",
              "subtitle": "Temporal lift"
            },
            {
              "title": "Brow Lift Case 4",
              "subtitle": "Forehead lift"
            },
            {
              "title": "Brow Lift Case 5",
              "subtitle": "Coronal brow lift"
            }
          ]
        },
        "neckLift": {
          "title": "Neck Lift",
          "cases": [
            {
              "title": "Neck Lift Case 1",
              "subtitle": "Platysmaplasty"
            },
            {
              "title": "Neck Lift Case 2",
              "subtitle": "Cervicoplasty"
            },
            {
              "title": "Neck Lift Case 3",
              "subtitle": "Neck contouring"
            }
          ]
        },
        "tummyTuck": {
          "title": "Tummy Tuck",
          "cases": [
            {
              "title": "Abdominoplasty Case 1",
              "subtitle": "Full tummy tuck"
            },
            {
              "title": "Abdominoplasty Case 2",
              "subtitle": "Mini abdominoplasty"
            },
            {
              "title": "Abdominoplasty Case 3",
              "subtitle": "Extended tummy tuck"
            },
            {
              "title": "Abdominoplasty Case 4",
              "subtitle": "Fleur-de-lis"
            },
            {
              "title": "Abdominoplasty Case 5",
              "subtitle": "Full abdominoplasty"
            },
            {
              "title": "Abdominoplasty Case 6",
              "subtitle": "Circumferential"
            }
          ]
        },
        "armLift": {
          "title": "Arm Lift",
          "cases": [
            {
              "title": "Brachioplasty Case 1",
              "subtitle": "Full arm lift"
            },
            {
              "title": "Brachioplasty Case 2",
              "subtitle": "Upper arm lift"
            },
            {
              "title": "Brachioplasty Case 3",
              "subtitle": "Extended brachioplasty"
            },
            {
              "title": "Brachioplasty Case 4",
              "subtitle": "Minimal scar arm lift"
            },
            {
              "title": "Brachioplasty Case 5",
              "subtitle": "Upper arm contouring"
            },
            {
              "title": "Brachioplasty Case 6",
              "subtitle": "Arm reduction"
            },
            {
              "title": "Brachioplasty Case 7",
              "subtitle": "Full brachioplasty"
            }
          ]
        },
        "thighLift": {
          "title": "Thigh Lift",
          "cases": [
            {
              "title": "Thigh Lift Case 1",
              "subtitle": "Inner thigh lift"
            },
            {
              "title": "Thigh Lift Case 2",
              "subtitle": "Medial thighplasty"
            },
            {
              "title": "Thigh Lift Case 3",
              "subtitle": "Vertical thigh lift"
            },
            {
              "title": "Thigh Lift Case 4",
              "subtitle": "Full thigh contouring"
            }
          ]
        }
      },
      "skinPopularLabel": "Popular in Korea",
      "skinCategories": [
        {
          "id": "lifting",
          "title": "Lifting & Tightening",
          "treatments": [
            {
              "name": "Ultherapy",
              "tag": "HIFU",
              "origin": "Merz / USA",
              "description": "FDA-cleared microfocused ultrasound for brow, neck, chin, and decollete lifting",
              "kr": true
            },
            {
              "name": "Ultraformer MPT (Shurink Universe)",
              "tag": "HIFU",
              "origin": "Classys / Korea",
              "description": "Next-gen HIFU with Micro Pulsed Technology; CE MDR certified",
              "kr": true
            },
            {
              "name": "Doublo Gold",
              "tag": "HIFU",
              "origin": "Hironic / Korea",
              "description": "HIFU combining microfocused ultrasound with RF for daily clinical use",
              "kr": true
            },
            {
              "name": "Sofwave",
              "tag": "Ultrasound",
              "origin": "Sofwave Medical / Israel",
              "description": "SUPERB synchronous ultrasound parallel beam technology; FDA cleared for all skin types",
              "kr": false
            },
            {
              "name": "Thermage FLX",
              "tag": "Monopolar RF",
              "origin": "Solta Medical / USA",
              "description": "4th-gen monopolar RF with AccuREP auto-tuning; single-session collagen remodeling",
              "kr": true
            },
            {
              "name": "Morpheus8",
              "tag": "Microneedle RF",
              "origin": "InMode / Israel-USA",
              "description": "RF microneedling up to 8mm depth for deep remodeling and subdermal adipose treatment",
              "kr": false
            },
            {
              "name": "Potenza",
              "tag": "Microneedle RF",
              "origin": "Cynosure / USA",
              "description": "Monopolar + bipolar RF microneedling with Tiger Tip semi-insulated needles",
              "kr": false
            },
            {
              "name": "SylfirmX",
              "tag": "Microneedle RF",
              "origin": "Viol / Korea",
              "description": "Dual-wave RF (Pulsed + Continuous) effective for melasma and pigmentation",
              "kr": true
            },
            {
              "name": "Genius RF",
              "tag": "Microneedle RF",
              "origin": "Lutronic / Korea",
              "description": "Real-time impedance feedback RF microneedling for precision energy delivery",
              "kr": true
            },
            {
              "name": "Volnewmer (Everesse)",
              "tag": "Microneedle RF",
              "origin": "Classys / Korea",
              "description": "Micro-radiofrequency device for precision RF tightening",
              "kr": true
            },
            {
              "name": "Secret RF",
              "tag": "Microneedle RF",
              "origin": "Cutera / USA",
              "description": "Adjustable-depth RF microneedling with gold-plated needles for scars and rejuvenation",
              "kr": false
            },
            {
              "name": "Scarlet RF",
              "tag": "Microneedle RF",
              "origin": "Viol / Korea",
              "description": "Short-pulse RF microneedling with minimal downtime",
              "kr": true
            },
            {
              "name": "INTRAcel",
              "tag": "Microneedle RF",
              "origin": "Jeisys / Korea",
              "description": "Fractional RF microneedling with biphasic waveform",
              "kr": true
            },
            {
              "name": "DENSITY",
              "tag": "RF",
              "origin": "Jeisys / Korea",
              "description": "High-frequency facelifting device with Alpha Tip technology",
              "kr": true
            },
            {
              "name": "CoolSonic",
              "tag": "Ultrasound",
              "origin": "CoolSonic / Korea",
              "description": "Non-invasive ultrasound lifting and tightening with cooling technology for enhanced comfort",
              "kr": true
            },
            {
              "name": "Oligio",
              "tag": "Monopolar RF",
              "origin": "Classys / Korea",
              "description": "Monopolar RF skin tightening with AI-powered energy control; next-gen Thermage alternative",
              "kr": true
            },
            {
              "name": "ONDA Coolwaves",
              "tag": "Microwave",
              "origin": "DEKA / Italy",
              "description": "Microwave technology (Coolwaves) for skin tightening, fat reduction, and cellulite treatment",
              "kr": true
            }
          ]
        },
        {
          "id": "rejuvenation",
          "title": "Skin Rejuvenation & Boosters",
          "treatments": [
            {
              "name": "Rejuran Healer",
              "tag": "PN/PDRN",
              "origin": "Pharmaresearch / Korea",
              "description": "Polynucleotide from salmon DNA for skin regeneration and collagen synthesis",
              "kr": true
            },
            {
              "name": "Rejuran I (Eye)",
              "tag": "PN/PDRN",
              "origin": "Pharmaresearch / Korea",
              "description": "98.7% pure PDRN specialized for under-eye area rejuvenation",
              "kr": true
            },
            {
              "name": "Juvelook",
              "tag": "Bio-stimulator",
              "origin": "Hugel / Korea",
              "description": "PDLLA + non-crosslinked HA booster that stimulates collagen for up to 18 months",
              "kr": true
            },
            {
              "name": "Gouri",
              "tag": "PCL",
              "origin": "DEXLEVO / Korea",
              "description": "World's first fully solubilized injectable PCL liquid collagen stimulator",
              "kr": true
            },
            {
              "name": "Profhilo",
              "tag": "HA Bio-remodeler",
              "origin": "IBSA / Italy",
              "description": "High-concentration HA injectable for intense hydration with 5-point injection technique",
              "kr": false
            },
            {
              "name": "NCTF 135 HA",
              "tag": "Mesotherapy",
              "origin": "Fillmed / France",
              "description": "HA + vitamins + amino acids + co-enzymes cocktail for cellular revitalization",
              "kr": true
            },
            {
              "name": "Sunekos",
              "tag": "Amino Acid",
              "origin": "Professional Derma / Italy",
              "description": "Patented amino acid + HA formula for ECM regeneration",
              "kr": false
            },
            {
              "name": "Juvederm Skinvive",
              "tag": "HA Hydrator",
              "origin": "Allergan / USA",
              "description": "Intradermal HA microdroplet injectable for skin smoothness lasting up to 6 months",
              "kr": false
            },
            {
              "name": "Elravie Re2O",
              "tag": "ECM Booster",
              "origin": "Humedix / Korea",
              "description": "First ECM-based skin booster; replenishes extracellular matrix components",
              "kr": true
            },
            {
              "name": "Lituo (hADM)",
              "tag": "ECM Booster",
              "origin": "CGBio / Korea",
              "description": "Human acellular dermal matrix booster that directly replenishes collagen and elastin",
              "kr": true
            },
            {
              "name": "Aesthefill",
              "tag": "PDLLA",
              "origin": "REGEN Biotech / Korea",
              "description": "PDLLA microsphere collagen stimulator for volume and skin quality",
              "kr": true
            },
            {
              "name": "Exosome Therapy",
              "tag": "Growth Factor",
              "origin": "Various / Korea",
              "description": "Stem cell-derived exosome therapy for cellular regeneration and enhanced healing",
              "kr": true
            },
            {
              "name": "LDM (Local Dynamic Micro)",
              "tag": "Ultrasound",
              "origin": "General Project / Germany",
              "description": "Low-frequency ultrasound micromassage for hydration and cellular activation; zero downtime",
              "kr": true
            }
          ]
        },
        {
          "id": "laser",
          "title": "Laser & Light Therapy",
          "treatments": [
            {
              "name": "PicoSure Pro",
              "tag": "Picosecond",
              "origin": "Cynosure / USA",
              "description": "755nm + 532nm picosecond laser with Focus Lens Array for pigment and collagen stimulation",
              "kr": true
            },
            {
              "name": "PicoWay",
              "tag": "Picosecond",
              "origin": "Candela / USA",
              "description": "Multi-wavelength pico (532/730/1064nm) with Resolve fractional; excellent for melasma",
              "kr": true
            },
            {
              "name": "PicoLO",
              "tag": "Picosecond",
              "origin": "LASEROPTEK / Korea",
              "description": "Korean-made picosecond Nd:YAG for pigmentation and acne scars",
              "kr": true
            },
            {
              "name": "Discovery Pico Plus",
              "tag": "Picosecond",
              "origin": "Quanta System / Italy",
              "description": "Multi-wavelength pico + nano platform with fractional tips",
              "kr": false
            },
            {
              "name": "Stellar M22",
              "tag": "IPL Platform",
              "origin": "Lumenis / Israel",
              "description": "Multi-application IPL + Nd:YAG + ResurFX platform treating 30+ skin conditions",
              "kr": true
            },
            {
              "name": "BBL (BroadBand Light)",
              "tag": "IPL",
              "origin": "Sciton / USA",
              "description": "Advanced IPL with thermoelectrically cooled filters for photorejuvenation",
              "kr": false
            },
            {
              "name": "eCO2 3D",
              "tag": "Fractional CO2",
              "origin": "Lutronic / Korea",
              "description": "40W fractional CO2 with Controlled Chaos scanning for deep resurfacing",
              "kr": true
            },
            {
              "name": "Fraxel DUAL",
              "tag": "Non-ablative Fractional",
              "origin": "Solta Medical / USA",
              "description": "Dual-wavelength (1550/1927nm) non-ablative fractional for scars and pigment",
              "kr": true
            },
            {
              "name": "LaseMD Ultra",
              "tag": "Thulium Laser",
              "origin": "Lutronic / Korea",
              "description": "1927nm thulium fractional laser for brightening and drug delivery",
              "kr": true
            },
            {
              "name": "Healite II",
              "tag": "LED Therapy",
              "origin": "Bio-Photas / Korea",
              "description": "830nm + 633nm professional LED for cellular repair and post-procedure healing",
              "kr": true
            },
            {
              "name": "Omnilux",
              "tag": "LED Therapy",
              "origin": "GlobalMed / UK",
              "description": "Medical-grade LED validated by 30+ peer-reviewed studies for acne and anti-aging",
              "kr": false
            },
            {
              "name": "CoolPeel",
              "tag": "CO2 Laser",
              "origin": "Cartessa / USA",
              "description": "H-Pulse technology for fully ablative CO2 treatment with minimal downtime",
              "kr": false
            },
            {
              "name": "Cutera Excel HR",
              "tag": "Nd:YAG/Alex",
              "origin": "Cutera / USA",
              "description": "Dual-wavelength laser platform for hair removal, vascular lesions, and skin rejuvenation",
              "kr": true
            },
            {
              "name": "Clarity II",
              "tag": "Alex/Nd:YAG",
              "origin": "Lutronic / Korea",
              "description": "Long-pulse + Q-switch dual platform for pigment, vascular, and hair removal",
              "kr": true
            }
          ]
        },
        {
          "id": "injectables",
          "title": "Injectables",
          "treatments": [
            {
              "name": "Botox",
              "tag": "Botulinum Toxin",
              "origin": "Allergan / USA",
              "description": "World's most recognized botulinum toxin type A for wrinkles and hyperhidrosis",
              "kr": true
            },
            {
              "name": "Dysport",
              "tag": "Botulinum Toxin",
              "origin": "Galderma / France",
              "description": "AbobotulinumtoxinA with broader diffusion pattern for glabellar lines",
              "kr": true
            },
            {
              "name": "Xeomin",
              "tag": "Botulinum Toxin",
              "origin": "Merz / Germany",
              "description": "Pure botulinum toxin without complexing proteins; no refrigeration needed",
              "kr": false
            },
            {
              "name": "Nabota (Jeuveau)",
              "tag": "Botulinum Toxin",
              "origin": "Daewoong / Korea",
              "description": "FDA-approved Korean botulinum toxin with patented high-purity manufacturing",
              "kr": true
            },
            {
              "name": "Botulax (Letybo)",
              "tag": "Botulinum Toxin",
              "origin": "Hugel / Korea",
              "description": "FDA-approved Korean toxin; 12M+ vials sold annually worldwide",
              "kr": true
            },
            {
              "name": "Meditoxin",
              "tag": "Botulinum Toxin",
              "origin": "Medytox / Korea",
              "description": "62.3% preference among Korean dermatologists; 40% domestic market share",
              "kr": true
            }
          ]
        },
        {
          "id": "fillers",
          "title": "Dermal Fillers",
          "treatments": [
            {
              "name": "Juvederm (Voluma/Volift/Volbella)",
              "tag": "HA Filler",
              "origin": "Allergan / USA",
              "description": "Vycross-technology HA filler family for cheeks, lips, and fine lines. Areas: Full face (cheeks, chin, lips, nasolabial folds, tear troughs), body (hands)",
              "kr": true
            },
            {
              "name": "Restylane (Lyft/Kysse)",
              "tag": "HA Filler",
              "origin": "Galderma / Sweden",
              "description": "NASHA and XpresHAn technology HA fillers for structural support and lips. Areas: Full face (cheeks, lips, chin, jawline, under-eyes), body (hands, earlobes)",
              "kr": true
            },
            {
              "name": "Teosyal (RHA)",
              "tag": "HA Filler",
              "origin": "Teoxane / Switzerland",
              "description": "Resilient HA technology that adapts to facial movement. Areas: Full face (lips, cheeks, nasolabial folds, tear troughs, jawline)",
              "kr": false
            },
            {
              "name": "Belotero",
              "tag": "HA Filler",
              "origin": "Merz / Germany",
              "description": "CPM-technology HA fillers with smooth tissue integration. Areas: Full face (fine lines, lips, nasolabial folds, tear troughs)",
              "kr": false
            },
            {
              "name": "Revolax",
              "tag": "HA Filler",
              "origin": "Across / Korea",
              "description": "High-purity cross-linked HA filler; cost-effective for deep wrinkles and volume. Areas: Full face (deep wrinkles, cheeks, chin, nose, lips)",
              "kr": true
            },
            {
              "name": "Neuramis",
              "tag": "HA Filler",
              "origin": "Medytox / Korea",
              "description": "Korean HA filler for lip enhancement and facial contouring. Areas: Full face (lips, nasolabial folds, chin, cheeks)",
              "kr": true
            },
            {
              "name": "Yvoire",
              "tag": "HA Filler",
              "origin": "LG Chem / Korea",
              "description": "Biphasic HA filler with strong structural support. Areas: Full face (cheeks, chin, jawline, nose bridge), body (hands)",
              "kr": true
            },
            {
              "name": "E.P.T.Q.",
              "tag": "HA Filler",
              "origin": "Hugel / Korea",
              "description": "Premium monophasic HA filler for global markets. Areas: Full face (cheeks, jawline, lips, nose), body (hands)",
              "kr": true
            },
            {
              "name": "Kybella (Belkyra)",
              "tag": "Fat Dissolver",
              "origin": "Allergan / USA",
              "description": "Only FDA-approved deoxycholic acid injectable for submental fat reduction. Areas: Face (submental/double chin), body (bra fat, inner thighs)",
              "kr": false
            },
            {
              "name": "Kabelline",
              "tag": "Fat Dissolver",
              "origin": "Kabelline / Korea",
              "description": "Synthetic deoxycholic acid fat dissolver for face and body contouring. Areas: Face (double chin, jowls), body (abdomen, love handles, inner thighs, upper arms)",
              "kr": true
            },
            {
              "name": "Sculptra",
              "tag": "PLLA",
              "origin": "Galderma / France",
              "description": "Poly-L-lactic acid that stimulates Type 1 collagen production for gradual volume restoration. Areas: Full face (temples, cheeks, jawline, nasolabial folds), body (buttocks, shoulders, upper arms, hips/pelvis area)",
              "kr": true
            },
            {
              "name": "Radiesse",
              "tag": "CaHA",
              "origin": "Merz / USA-Germany",
              "description": "Calcium hydroxylapatite biostimulator for skin firmness and long-term collagen renewal. Areas: Full face (cheeks, jawline, chin, hands), body (shoulders, decollete, upper arms, knees)",
              "kr": true
            },
            {
              "name": "Dermalax",
              "tag": "HA Filler",
              "origin": "Across / Korea",
              "description": "Cross-linked HA filler range for face and body. Areas: Full face (cheeks, chin, lips, forehead), body (hands)",
              "kr": true
            },
            {
              "name": "Rejeunesse",
              "tag": "HA Filler",
              "origin": "Humedix / Korea",
              "description": "High cross-linked HA for natural, subtle enhancements. Areas: Full face (lips, nasolabial folds, cheeks, chin)",
              "kr": true
            }
          ]
        },
        {
          "id": "threads",
          "title": "Thread Lifting",
          "treatments": [
            {
              "name": "MINT Lift",
              "tag": "PDO",
              "origin": "HansBiomed / Korea",
              "description": "Triple FDA-cleared PDO threads; gold standard in Korean thread lifting",
              "kr": true
            },
            {
              "name": "Miracu",
              "tag": "PDO",
              "origin": "CROMA / Korea",
              "description": "Widely used Korean PDO threads for non-surgical face lifting",
              "kr": true
            },
            {
              "name": "Silhouette Soft",
              "tag": "PLLA",
              "origin": "Sinclair Pharma / UK",
              "description": "PLLA bidirectional cone threads for immediate lift + gradual collagen stimulation",
              "kr": false
            },
            {
              "name": "Silhouette InstaLift",
              "tag": "PLLA/PLGA",
              "origin": "Sinclair / USA",
              "description": "Absorbable suture with bidirectional cones; FDA cleared for midface",
              "kr": false
            },
            {
              "name": "Glamour Silhouline",
              "tag": "PCL",
              "origin": "Glamour / Korea",
              "description": "PCL twist threads absorbed over 24 months; longest collagen stimulation",
              "kr": true
            },
            {
              "name": "Aptos",
              "tag": "PDO/PLA",
              "origin": "Aptos / Georgia",
              "description": "Pioneer in thread lifting with Excellence and Nano lines for face and body",
              "kr": false
            }
          ]
        },
        {
          "id": "surface",
          "title": "Surface & Peel Treatments",
          "treatments": [
            {
              "name": "HydraFacial",
              "tag": "Aqua Peel",
              "origin": "BeautyHealth / USA",
              "description": "Patented vortex technology for cleanse-exfoliate-extract-hydrate in one session",
              "kr": true
            },
            {
              "name": "Aqua Peel",
              "tag": "Water Microderm",
              "origin": "Various / Korea",
              "description": "3-step water microdermabrasion (AHA, BHA, nutrition) standard in Korean clinics",
              "kr": true
            },
            {
              "name": "SkinPen",
              "tag": "Microneedling",
              "origin": "Crown Aesthetics / USA",
              "description": "First FDA-cleared microneedling device for acne scars",
              "kr": false
            },
            {
              "name": "Dermapen 4",
              "tag": "Microneedling",
              "origin": "DermapenWorld / Australia",
              "description": "Advanced microneedling pen with 16-needle cartridge for scar treatment",
              "kr": false
            },
            {
              "name": "ZO Skin Health Peels",
              "tag": "Chemical Peel",
              "origin": "ZO Skin Health / USA",
              "description": "Medical-grade peel protocols by Dr. Zein Obagi",
              "kr": false
            },
            {
              "name": "SkinCeuticals Peels",
              "tag": "Chemical Peel",
              "origin": "SkinCeuticals / USA",
              "description": "Professional chemical peel line including Micropeel and Advanced Corrective",
              "kr": false
            }
          ]
        },
        {
          "id": "pigment",
          "title": "Pigmentation & Vascular",
          "treatments": [
            {
              "name": "Excel V+",
              "tag": "Vascular Laser",
              "origin": "Cutera / USA",
              "description": "Dual-wavelength (532/1064nm) laser for rosacea, veins, and skin revitalization",
              "kr": true
            },
            {
              "name": "GentleMax Pro Plus",
              "tag": "Alex/Nd:YAG",
              "origin": "Candela / USA",
              "description": "Dual 755nm + 1064nm laser for vascular lesions, pigment, and hair removal",
              "kr": true
            },
            {
              "name": "Vbeam Prima",
              "tag": "Pulsed Dye",
              "origin": "Candela / USA",
              "description": "595nm + 1064nm dual vascular laser; gold standard for rosacea and port wine stains",
              "kr": false
            },
            {
              "name": "RevLite SI",
              "tag": "Q-switched Nd:YAG",
              "origin": "Cynosure / USA",
              "description": "Laser toning for melasma, pigmentation, and skin rejuvenation in Asian skin",
              "kr": true
            },
            {
              "name": "Spectra XT",
              "tag": "Q-switched Nd:YAG",
              "origin": "Lutronic / Korea",
              "description": "Laser toning platform widely used in Korean clinics for melasma",
              "kr": true
            }
          ]
        },
        {
          "id": "bodyContouring",
          "title": "Non-Surgical Body Contouring",
          "treatments": [
            {
              "name": "CoolSculpting Elite",
              "tag": "Cryolipolysis",
              "origin": "Allergan / USA",
              "description": "FDA-cleared controlled cooling to freeze and eliminate fat cells",
              "kr": true
            },
            {
              "name": "Emsculpt NEO",
              "tag": "HIFEM + RF",
              "origin": "BTL / USA-Czech",
              "description": "Combines electromagnetic muscle stimulation + RF for simultaneous muscle building and fat reduction",
              "kr": true
            },
            {
              "name": "Vanquish ME",
              "tag": "Contactless RF",
              "origin": "BTL / USA-Czech",
              "description": "Contactless selective RF for large-area fat reduction without touching the skin",
              "kr": false
            },
            {
              "name": "SculpSure",
              "tag": "Laser Lipolysis",
              "origin": "Cynosure / USA",
              "description": "1060nm diode laser for non-invasive fat reduction across multiple body areas",
              "kr": false
            },
            {
              "name": "TightSculpting",
              "tag": "Dual Laser",
              "origin": "Fotona / Slovenia",
              "description": "Er:YAG + Nd:YAG dual-wavelength laser for simultaneous sculpting and tightening",
              "kr": false
            },
            {
              "name": "Scizer",
              "tag": "HIFU Body",
              "origin": "Classys / Korea",
              "description": "HIFU-based body contouring; FDA approved for non-invasive fat reduction",
              "kr": true
            }
          ]
        },
        {
          "id": "scalpHair",
          "title": "Scalp & Hair (Non-Surgical)",
          "treatments": [
            {
              "name": "PRP Therapy (Scalp)",
              "tag": "PRP",
              "origin": "Various / Global",
              "description": "Platelet-rich plasma injected into scalp to stimulate hair follicle regeneration",
              "kr": true
            },
            {
              "name": "Scalp Mesotherapy",
              "tag": "Mesotherapy",
              "origin": "Various / Korea",
              "description": "Direct injection of growth factors, vitamins, and nutrients into the scalp",
              "kr": true
            },
            {
              "name": "Hair Filler (DR CYJ)",
              "tag": "Peptide Filler",
              "origin": "Caregen / Korea",
              "description": "7 biomimetic peptide-based scalp injectable for hair growth stimulation",
              "kr": true
            },
            {
              "name": "HairMax LaserBand",
              "tag": "LLLT",
              "origin": "HairMax / USA",
              "description": "First FDA-cleared low-level laser therapy device for hair loss treatment",
              "kr": false
            },
            {
              "name": "Healite II (Scalp)",
              "tag": "LED Therapy",
              "origin": "Bio-Photas / Korea",
              "description": "830nm LED therapy for follicle stimulation and enhanced PRP absorption",
              "kr": true
            }
          ]
        },
        {
          "id": "stemCell",
          "title": "Stem Cell & Regenerative Medicine",
          "treatments": [
            {
              "name": "Autologous Stem Cell Therapy",
              "tag": "Stem Cell",
              "origin": "Various / Korea",
              "description": "Patient-derived adipose or bone marrow stem cells for skin regeneration, wound healing, and anti-aging",
              "kr": true
            },
            {
              "name": "Umbilical Cord Stem Cell (UC-MSC)",
              "tag": "Stem Cell",
              "origin": "Various / Korea",
              "description": "Allogeneic mesenchymal stem cells from umbilical cord for anti-aging, immune modulation, and tissue repair",
              "kr": true
            },
            {
              "name": "MCT (MicroCoring Technology)",
              "tag": "Skin Resurfacing",
              "origin": "Cytrellis / USA",
              "description": "Micro-cores of skin are removed to tighten and rejuvenate without thermal damage; FDA-cleared for wrinkle reduction",
              "kr": false
            },
            {
              "name": "Exosome IV Therapy",
              "tag": "Exosome",
              "origin": "Various / Korea",
              "description": "Intravenous stem cell-derived exosome infusion for systemic anti-aging, skin rejuvenation, and cellular repair",
              "kr": true
            },
            {
              "name": "SVF (Stromal Vascular Fraction)",
              "tag": "Stem Cell",
              "origin": "Various / Korea",
              "description": "Concentrated adipose-derived stem cells and growth factors for facial rejuvenation and volume restoration",
              "kr": true
            },
            {
              "name": "PRP + Stem Cell Combination",
              "tag": "Regenerative",
              "origin": "Various / Korea",
              "description": "Platelet-rich plasma combined with stem cell therapy for enhanced skin regeneration and collagen production",
              "kr": true
            },
            {
              "name": "NK Cell Therapy",
              "tag": "Immune Cell",
              "origin": "Various / Korea",
              "description": "Natural killer cell infusion therapy for immune boosting, anti-aging, and cellular health optimization",
              "kr": true
            },
            {
              "name": "Fibroblast Therapy",
              "tag": "Cell Therapy",
              "origin": "Various / Korea",
              "description": "Autologous fibroblast injection for natural collagen and elastin production; long-term skin quality improvement",
              "kr": true
            },
            {
              "name": "Growth Factor Cocktail (GFC)",
              "tag": "Growth Factor",
              "origin": "Various / Korea",
              "description": "Concentrated autologous growth factor injection for skin rejuvenation, hair growth, and wound healing",
              "kr": true
            },
            {
              "name": "Placental Extract Therapy",
              "tag": "Regenerative",
              "origin": "Various / Korea-Japan",
              "description": "Human placental extract (Laennec/Melsmon) injection for anti-aging, fatigue recovery, and liver function",
              "kr": true
            }
          ]
        }
      ],
      "skinConsulting": {
        "badge": "AetherHeal Trusted Skin Clinics",
        "title": "Two-Axis Personalized Consulting",
        "description": "At AetherHeal trusted skin aesthetic clinics, your treatment plan is not a menu pick — it is built from two independent axes of expertise that converge on a plan made only for you.",
        "physician": {
          "label": "Medical Director",
          "detail": "Diagnoses skin condition, bone structure, and tone from a clinical perspective. Evaluates tissue quality, aging patterns, and contraindications to determine what is medically appropriate."
        },
        "coordinator": {
          "label": "Patient Coordinator",
          "detail": "Maps your lifestyle, preferences, daily routine, downtime tolerance, and aesthetic goals. Translates your real-world context into treatment parameters."
        },
        "result": "Where these two axes meet — clinical reality and personal context — your one-of-a-kind plan is born."
      },
      "subgroupLabels": {
        "faceLift": "Lifting",
        "faceContour": "Contouring",
        "faceFeatures": "Features",
        "bodyBreast": "Breast",
        "bodyContour": "Contouring",
        "bodyLift": "Lifting"
      }
    }
  },
  "medicalBoundary": {
    "meta": {
      "title": "Medical Boundary Notice | AetherHeal",
      "description": "Understand the medical and AI-operational limits of AetherHeal. This notice explains what the platform may support and what remains strictly human and clinical responsibility."
    },
    "hero": {
      "badge": "Legal & Safety",
      "h1": "Medical Boundary Notice",
      "subtitle": "This page defines the clinical, legal, and AI-operational limits of AetherHeal. Understanding these boundaries is required before use."
    },
    "boundaries": [
      {
        "title": "Not a Medical Provider",
        "description": "AetherHeal does not provide medical diagnosis, treatment, prescriptions, or hospital-based care. We are a decision support and coordination platform, not a hospital, clinic, or telemedicine service."
      },
      {
        "title": "AI Does Not Diagnose or Prescribe",
        "description": "AI-assisted tools used by AetherHeal do not diagnose conditions, recommend medications, prescribe treatments, or produce independent medical conclusions."
      },
      {
        "title": "AI Does Not Replace Physician Consultation",
        "description": "AI-assisted summaries or translations may support communication, but they do not replace direct consultation with a licensed physician or the treating hospital."
      },
      {
        "title": "AI Does Not Determine Emergency Care",
        "description": "Neither AetherHeal nor its AI-assisted tools determine whether a situation is an emergency. If urgent or severe symptoms occur, seek immediate local medical care and emergency services."
      },
      {
        "title": "AI Does Not Make Final Provider Selection",
        "description": "AI may help organize case information, but final provider selection, hospital routing, and next-step approvals remain accountable human decisions."
      },
      {
        "title": "Not a Guarantee of Outcomes",
        "description": "Decision support can improve clarity, but it does not guarantee a particular medical outcome. Treatment results depend on clinical factors outside the platform's control."
      }
    ],
    "aiSupport": {
      "badge": "Permitted AI Support",
      "title": "What AI May Support",
      "intro": "Within these boundaries, AI may be used for tightly scoped administrative and informational support under human oversight.",
      "items": [
        "Structuring intake information and uploaded records into standardized drafts",
        "Summarizing case materials for physician, reviewer, or operations review",
        "Translating routine messages and non-diagnostic coordination content",
        "Surfacing missing information, inconsistencies, or workflow delays for human follow-up",
        "Monitoring operational status, message delivery, and service exceptions"
      ]
    },
    "emergency": {
      "title": "Emergency Notice",
      "text": "Do not use this platform for urgent symptoms or life-threatening conditions. Contact local emergency services immediately.",
      "phone": "Emergency: Call your local emergency number (911, 112, 119)"
    },
    "responsibilities": {
      "badge": "Your Responsibilities",
      "title": "Your Role as a Platform User",
      "items": [
        "Provide complete and accurate intake information",
        "Review summaries, translations, and coordination details for factual accuracy",
        "Consult your physician or treating hospital for direct medical advice",
        "Make your own treatment decisions after appropriate clinical review",
        "Use emergency services for urgent medical conditions",
        "Understand that AetherHeal provides bounded decision and coordination support only"
      ],
      "ctaProcess": "Review process",
      "ctaOversight": "View oversight"
    }
  },
  "hairTransplant": {
    "meta": {
      "title": "Hair Transplant in Korea | AetherHeal",
      "description": "Considering a hair transplant in Korea? AetherHeal provides physician-led decision support to help you evaluate clinics, understand procedures, and plan your journey to Seoul."
    },
    "hero": {
      "badge": "Hair Transplantation",
      "h1": "Hair Transplant in Korea:",
      "h1Highlight": "What to Know Before You Decide",
      "intro": "Korea is one of the most sought-after destinations for hair transplantation.",
      "introDetail": "With advanced FUE techniques, experienced surgeons, and competitive pricing, Seoul has become a global hub. But choosing the right clinic requires more than a Google search."
    },
    "toc": [
      {
        "id": "why-korea",
        "label": "Why Patients Choose Korea"
      },
      {
        "id": "what-we-offer",
        "label": "What AetherHeal Offers"
      },
      {
        "id": "common-procedures",
        "label": "Common Procedures Covered"
      }
    ],
    "whyKorea": {
      "title": "Why Patients Choose Korea for Hair Transplants",
      "p1": "Korean clinics are known for precision in follicular unit extraction (FUE) and robotic-assisted procedures. Surgeons in Seoul often specialize exclusively in hair restoration, performing thousands of procedures annually.",
      "p2": "However, not all clinics operate at the same standard. Marketing can obscure clinical quality, and language barriers complicate pre-operative evaluation. A structured decision process matters."
    },
    "whatWeOffer": {
      "title": "What AetherHeal Offers",
      "intro": "AetherHeal does not perform hair transplants. Instead, we provide physician-led decision support that helps you clarify your goals, understand the trade-offs of different techniques, and connect with verified partner clinics based on your specific case.",
      "items": [
        "1:1 consultation with a licensed Korean physician",
        "Decision summary covering graft count, donor area assessment, and technique comparison",
        "Matching to a partner clinic based on your clinical profile",
        "Journey coordination from arrival to follow-up"
      ]
    },
    "commonProcedures": {
      "title": "Common Procedures Covered",
      "text": "FUE (Follicular Unit Extraction), DHI (Direct Hair Implantation), scalp micropigmentation, hairline design consultation, and revision cases.",
      "boxTitle": "Individual Evaluation",
      "boxText": "Each case is evaluated individually. We ensure no cookie-cutter recommendations are made."
    },
    "relatedPages": [
      {
        "label": "Aesthetic Clinics in Seoul",
        "desc": "Navigate skin treatments and dermatology"
      },
      {
        "label": "How to Choose a Hospital Abroad",
        "desc": "A framework for safer decisions"
      },
      {
        "label": "The AetherHeal Trust Protocol",
        "desc": "How we evaluate partner hospitals"
      },
      {
        "label": "How AetherHeal Works",
        "desc": "The system behind physician-led decision support"
      }
    ]
  },
  "plasticSurgery": {
    "meta": {
      "title": "Plastic Surgery in Korea | AetherHeal",
      "description": "Considering plastic surgery in Korea? AetherHeal offers physician-led decision support for rhinoplasty, facial contouring, blepharoplasty, and more — structured guidance before hospital contact."
    },
    "hero": {
      "badge": "Plastic Surgery",
      "h1": "Plastic Surgery in Korea:",
      "h1Highlight": "Structure Your Decision First",
      "intro": "Korea performs more cosmetic procedures per capita than nearly any other country.",
      "introDetail": "For international patients, this creates both opportunity and complexity. AetherHeal helps you navigate that complexity with physician-led decision support — before you contact any hospital."
    },
    "toc": [
      {
        "id": "common-procedures",
        "label": "Procedures Commonly Considered"
      },
      {
        "id": "risk-of-unstructured",
        "label": "The Risk of Unstructured Decisions"
      },
      {
        "id": "how-aetherheal-helps",
        "label": "How AetherHeal Helps"
      }
    ],
    "commonProcedures": {
      "title": "Procedures Commonly Considered",
      "text": "Rhinoplasty (nose reshaping and revision), blepharoplasty (double eyelid surgery and ptosis correction), facial contouring (V-line jaw reduction, cheekbone reduction), breast augmentation, body contouring, and fat grafting are among the most frequently discussed procedures.",
      "callout": "Each procedure carries specific risks and recovery requirements. Understanding these before committing to a clinic is not optional — it is essential."
    },
    "riskOfUnstructured": {
      "title": "The Risk of Unstructured Decisions",
      "text": "Many patients choose clinics based on social media reviews, price comparisons, or agency referrals. These methods rarely account for clinical suitability, surgeon specialization, or revision risk.",
      "callout": "AetherHeal addresses this gap by providing a physician-led evaluation of your case before any hospital introduction."
    },
    "howWeHelp": {
      "title": "How AetherHeal Helps",
      "items": [
        "Physician consultation to define realistic expectations and constraints",
        "Decision summary with procedure-specific risk documentation",
        "Partner hospital matching based on surgical specialization",
        "Full journey support including post-operative follow-up coordination"
      ]
    },
    "relatedPages": [
      {
        "label": "Hair Transplant in Korea",
        "desc": "Physician-led guidance for hair restoration"
      },
      {
        "label": "Aesthetic Clinics in Seoul",
        "desc": "Navigate skin treatments and dermatology"
      },
      {
        "label": "How to Choose a Hospital Abroad",
        "desc": "A framework for safer decisions"
      },
      {
        "label": "How AetherHeal Works",
        "desc": "The system behind physician-led decision support"
      }
    ]
  },
  "aestheticClinic": {
    "meta": {
      "title": "Aesthetic Clinics in Seoul | AetherHeal",
      "description": "Find physician-verified aesthetic clinics in Seoul. AetherHeal helps international patients navigate skin treatments, anti-aging procedures, and cosmetic dermatology with decision clarity."
    },
    "hero": {
      "badge": "Aesthetic Medicine",
      "h1": "Aesthetic Clinics in Seoul:",
      "h1Highlight": "Navigate with Confidence",
      "intro": "Seoul's Gangnam district alone has thousands of aesthetic clinics.",
      "introDetail": "The density of options can be overwhelming for international patients. AetherHeal provides structured support to help you make informed decisions about skin treatments and cosmetic procedures."
    },
    "toc": [
      {
        "id": "why-seoul",
        "label": "Why Seoul for Aesthetic Treatments"
      },
      {
        "id": "how-we-support",
        "label": "How AetherHeal Supports Your Decision"
      },
      {
        "id": "treatments-discussed",
        "label": "Treatments Commonly Discussed"
      }
    ],
    "whySeoul": {
      "title": "Why Seoul for Aesthetic Treatments",
      "p1": "Korea is recognized globally for its advanced dermatological research and aesthetic technology. Treatments like skin boosters, thread lifting, HIFU, and laser therapy are performed with specialized equipment and protocols developed in Korean clinical settings.",
      "p2": "Popular brands such as Rejuran, Juvelook, Sculptra, and Ulthera are widely administered by dermatologists with deep specialization.",
      "callout": "The challenge for international patients is identifying which clinic — and which physician — is appropriate for their specific needs."
    },
    "howWeSupport": {
      "title": "How AetherHeal Supports Your Decision",
      "items": [
        "Physician-led consultation to clarify treatment goals and skin concerns",
        "Objective evaluation of procedure options without brand bias",
        "Matching to partner clinics specializing in your area of interest",
        "Pre-treatment decision summary with expected outcomes and limitations"
      ]
    },
    "treatmentsDiscussed": {
      "title": "Treatments Commonly Discussed",
      "text": "Skin boosters and bio-stimulators, thread lifting, HIFU and RF tightening, laser resurfacing, filler and volume restoration, and anti-aging protocols.",
      "callout": "Each treatment plan is discussed with a licensed physician before any clinic contact."
    },
    "relatedPages": [
      {
        "label": "Hair Transplant in Korea",
        "desc": "Physician-led guidance for hair restoration"
      },
      {
        "label": "Plastic Surgery in Korea",
        "desc": "Structured decision support for cosmetic procedures"
      },
      {
        "label": "The AetherHeal Trust Protocol",
        "desc": "How we evaluate partner hospitals"
      },
      {
        "label": "Your Medical Journey",
        "desc": "End-to-end coordination from decision to recovery"
      }
    ]
  },
  "medicalJourney": {
    "meta": {
      "title": "Your Medical Journey to Seoul | AetherHeal",
      "description": "A stage-based medical journey to Seoul with clear ownership before travel, in Korea, and after return. AI supports coordination, while humans retain clinical and final decision responsibility."
    },
    "hero": {
      "badge": "Journey Coordination",
      "h1": "Your Medical Journey to Seoul:",
      "h1Highlight": "Coordinated in Three Stages",
      "intro": "Cross-border medical care becomes safer when each phase has clear ownership.",
      "introDetail": "AetherHeal separates the journey into before travel, in Korea, and after return so AI support, physician review, hospital care, and concierge accountability do not blur together."
    },
    "toc": [
      {
        "id": "before-travel",
        "label": "Before Travel"
      },
      {
        "id": "in-korea",
        "label": "In Korea"
      },
      {
        "id": "after-return",
        "label": "After Return"
      },
      {
        "id": "what-makes-different",
        "label": "What Makes This Different"
      }
    ],
    "journeyStages": {
      "title": "Three Stages, One Accountable Journey",
      "intro": "Each stage has a defined purpose. AI may support administrative clarity and continuity, but clinical judgment, treatment, escalation, and final approvals remain human responsibilities.",
      "stages": [
        {
          "id": "before-travel",
          "label": "Stage 1",
          "title": "Before Travel",
          "summary": "This stage is for structuring the case before any treatment journey begins. The goal is decision readiness, not speed.",
          "milestonesTitle": "Core milestones",
          "items": [
            {
              "title": "Decision structuring",
              "desc": "Goals, constraints, prior records, and open questions are organized into a clearer decision frame before partner outreach."
            },
            {
              "title": "Feasibility preparation",
              "desc": "Appropriate documents, travel constraints, and scope assumptions are checked so the case is fit for hospital review."
            },
            {
              "title": "Coordination readiness",
              "desc": "Scheduling intent, likely timelines, and practical travel planning are prepared only after the case is sufficiently clarified."
            }
          ],
          "aiTitle": "AI supports",
          "aiItems": [
            "Structuring intake information and draft summaries for review",
            "Supporting translation of records or routine coordination messages",
            "Surfacing missing documents, conflicting details, or unresolved questions"
          ],
          "humanTitle": "Humans own",
          "humanItems": [
            "Defining clinical boundaries and what the case is actually about",
            "Confirming whether the case is ready to proceed, defer, or re-clarify",
            "Approving partner outreach, scheduling, and next-step commitments"
          ]
        },
        {
          "id": "in-korea",
          "label": "Stage 2",
          "title": "In Korea",
          "summary": "Once the patient is on the ground, coordination must stay precise while treatment authority remains with the treating institution and responsible clinicians.",
          "milestonesTitle": "Core milestones",
          "items": [
            {
              "title": "Arrival and handoff",
              "desc": "A verified concierge — driver, translator, or guide — is assigned before you land. Real-time coordination keeps airport pickup, transport, and appointments synchronized without the patient managing logistics alone."
            },
            {
              "title": "Hospital-facing execution",
              "desc": "Consultation, informed consent, and treatment planning occur within the licensed hospital or clinic environment."
            },
            {
              "title": "Real-time support",
              "desc": "Your concierge team — verified freelance drivers, certified hospital interpreters, and local guides — coordinates on the ground through a live platform. Delays, missed handoffs, or escalations are visible in real time."
            }
          ],
          "aiTitle": "AI supports",
          "aiItems": [
            "Keeping itineraries, reminders, and routine coordination synchronized",
            "Assisting with translation of routine non-diagnostic communications",
            "Monitoring workflow gaps, missed handoffs, or timing risks for human follow-up"
          ],
          "humanTitle": "Humans own",
          "humanItems": [
            "Hospital consultation, informed consent, and all medical treatment decisions",
            "Escalation when something appears urgent, unclear, or outside normal workflow",
            "Final operational judgment by concierge and platform staff on the ground"
          ]
        },
        {
          "id": "after-return",
          "label": "Stage 3",
          "title": "After Return",
          "summary": "After the patient goes home, continuity matters. The purpose is to preserve communication, follow-through, and documented escalation when needed.",
          "milestonesTitle": "Core milestones",
          "items": [
            {
              "title": "Follow-up continuity",
              "desc": "Updates, check-ins, and care continuity are coordinated so recovery communication does not fragment across borders."
            },
            {
              "title": "Documentation hygiene",
              "desc": "Recovery notes, images, and follow-up messages are kept organized for review and case continuity."
            },
            {
              "title": "Escalation discipline",
              "desc": "If recovery concerns arise, the patient is directed toward the appropriate treating or local physician rather than informal reassurance."
            }
          ],
          "aiTitle": "AI supports",
          "aiItems": [
            "Organizing follow-up messages and recovery updates into structured case notes",
            "Supporting translation and summary drafting for continuity workflows",
            "Flagging unanswered check-ins or coordination gaps that need human attention"
          ],
          "humanTitle": "Humans own",
          "humanItems": [
            "Clinical interpretation of recovery status by appropriate physicians",
            "Advising when the patient should contact the treating hospital or local doctor",
            "Managing continuity, escalation, and documented follow-through"
          ]
        }
      ]
    },
    "whatMakesDifferent": {
      "title": "What Makes This Different",
      "text": "Unlike medical tourism models that blur sales, logistics, and medical judgment, AetherHeal separates the journey into explicit phases with explicit ownership.",
      "boxTitle": "AI supports the process",
      "boxText": "but does not own diagnosis, treatment, emergency judgment, or final provider selection. Those remain human responsibilities throughout the journey.",
      "ctaPhilosophy": "Read the full philosophy"
    },
    "relatedPages": [
      {
        "label": "How to Choose a Hospital Abroad",
        "desc": "A framework for safer decisions"
      },
      {
        "label": "The AetherHeal Trust Protocol",
        "desc": "How governance, auditing, and enforcement work"
      },
      {
        "label": "How AetherHeal Works",
        "desc": "The system behind physician-led decision support"
      }
    ]
  },
  "hospitalAbroad": {
    "meta": {
      "title": "The Ultimate Guide to Choosing a Hospital Abroad | AetherHeal",
      "description": "A physician-led guide explaining how international patients can evaluate hospitals abroad and make safer medical decisions."
    },
    "hero": {
      "badge": "Patient Guide",
      "h1": "The Ultimate Guide to Choosing a Hospital Abroad",
      "intro": "Every year, millions of patients travel internationally for medical treatment.",
      "p1": "Some travel for advanced procedures. Others seek more affordable care. Many are looking for specialists that are difficult to access in their home country.",
      "p2": "But choosing a hospital abroad is not a normal consumer decision.",
      "callout": "It is a high-stakes decision under uncertainty.",
      "selectingLabel": "You are selecting:",
      "selectingItems": [
        "a medical team",
        "a treatment plan",
        "a healthcare system"
      ],
      "selectingEnd": "in a country you may not fully understand.",
      "p3": "The internet offers endless information: reviews, forums, before-and-after photos, clinic websites.",
      "p4": "But more information does not necessarily create clarity. In many cases, it creates decision overload.",
      "guideIntro": "This guide explains how experienced physicians and healthcare systems evaluate hospitals — and how international patients can apply the same logic when choosing treatment abroad."
    },
    "toc": [
      {
        "id": "why-different",
        "label": "Why Choosing a Hospital Abroad Is Different"
      },
      {
        "id": "common-mistakes",
        "label": "Common Mistakes International Patients Make"
      },
      {
        "id": "hospital-quality",
        "label": "What Actually Determines Hospital Quality"
      },
      {
        "id": "reviews-rankings",
        "label": "Why Reviews and Rankings Are Not Enough"
      },
      {
        "id": "physician-led",
        "label": "The Physician-Led Verification Model"
      },
      {
        "id": "patient-journey",
        "label": "The International Patient Journey"
      },
      {
        "id": "south-korea",
        "label": "Why Many Patients Choose South Korea"
      },
      {
        "id": "structured-approach",
        "label": "A Structured Approach to Medical Travel"
      },
      {
        "id": "faq",
        "label": "Frequently Asked Questions"
      }
    ],
    "whyDifferent": {
      "title": "Why Choosing a Hospital Abroad Is Different",
      "p1": "Most consumer decisions follow a simple structure.",
      "p2": "You compare products. You read reviews. You evaluate price and quality.",
      "p3": "Healthcare decisions are fundamentally different.",
      "whoNote": "According to the World Health Organization, cross-border healthcare continues to grow globally — yet the frameworks for patient safety have not kept pace with demand.",
      "p4": "Three characteristics make healthcare decisions unique:",
      "characteristics": [
        {
          "title": "1. Information asymmetry",
          "p1": "In medicine, patients rarely possess the same knowledge as clinicians.",
          "p2": "Understanding treatment quality requires:",
          "items": [
            "medical training",
            "experience with complications",
            "familiarity with clinical outcomes"
          ],
          "conclusion": "This makes it difficult to evaluate providers using standard consumer signals."
        },
        {
          "title": "2. Outcomes are uncertain",
          "p1": "Unlike buying a product, medical treatments involve biological systems.",
          "p2": "Even in excellent hospitals:",
          "items": [
            "results can vary",
            "complications may occur",
            "recovery timelines differ"
          ],
          "conclusion": "A good decision process must account for uncertainty."
        },
        {
          "title": "3. The cost of mistakes is high",
          "p1": "If a consumer purchase fails, it can be replaced.",
          "p2": "If a medical decision fails, consequences may include:",
          "items": [
            "revision procedures",
            "long recovery periods",
            "significant emotional stress"
          ],
          "conclusion": "For this reason, choosing a hospital abroad should be approached as a structured decision process, not a quick comparison."
        }
      ]
    },
    "commonMistakes": {
      "title": "Common Mistakes International Patients Make",
      "intro1": "Patients researching treatment abroad often rely on signals that appear helpful but are incomplete.",
      "intro2": "Understanding these limitations can significantly improve decision quality.",
      "mistakes": [
        {
          "title": "Mistake 1: Relying heavily on online reviews",
          "p1": "Reviews can provide useful context, but they have structural limitations.",
          "p2": "They tend to reflect:",
          "items": [
            "extreme positive experiences",
            "extreme negative experiences"
          ],
          "p3": "rather than typical outcomes.",
          "p4": "In addition, reviews rarely include detailed medical information about:",
          "items2": [
            "patient selection",
            "treatment complexity",
            "clinical follow-up"
          ],
          "scenario": "Many international patients begin their research with online reviews. While reviews can highlight patient experiences, they rarely reflect clinical complexity. A patient undergoing a routine procedure may leave a five-star review, while a more complex case — one involving revision surgery, unusual anatomy, or higher complication risk — may require a fundamentally different level of expertise that reviews do not capture."
        },
        {
          "title": "Mistake 2: Comparing clinics primarily by price",
          "p1": "Price differences between countries are often large.",
          "p2": "However, focusing only on cost ignores other critical variables:",
          "items": [
            "surgeon experience",
            "hospital infrastructure",
            "complication management",
            "follow-up care"
          ],
          "conclusion": "Lower prices may reflect lower operational costs — but they may also reflect differences in training or systems."
        },
        {
          "title": "Mistake 3: Evaluating marketing instead of medicine",
          "p1": "Many clinic websites highlight:",
          "items": [
            "before-and-after photos",
            "testimonials",
            "social media visibility"
          ],
          "p2": "While these elements can demonstrate patient satisfaction, they are not substitutes for clinical evaluation.",
          "p3": "Medical quality is determined by:",
          "items2": [
            "physician expertise",
            "institutional standards",
            "long-term outcomes"
          ]
        }
      ]
    },
    "hospitalQuality": {
      "title": "What Actually Determines Hospital Quality",
      "intro1": "From a clinical perspective, hospitals are evaluated using several core factors.",
      "intro2": "Understanding these factors can help patients interpret available information more effectively.",
      "factors": [
        {
          "title": "Physician training and specialization",
          "p1": "The training background of the physician performing the procedure is often the most important variable.",
          "p2": "Key considerations include:",
          "items": [
            "medical education and residency",
            "procedure-specific experience",
            "research or academic involvement"
          ]
        },
        {
          "title": "Institutional standards",
          "p1": "Hospitals differ significantly in their systems and infrastructure.",
          "p2": "Important elements include:",
          "items": [
            "operating room protocols",
            "sterilization standards",
            "nursing expertise",
            "complication management systems"
          ]
        },
        {
          "title": "Procedure volume",
          "p1": "In many specialties, experience correlates strongly with outcomes.",
          "p2": "Hospitals that perform a high volume of a specific procedure often develop refined systems and techniques."
        },
        {
          "title": "Post-care management",
          "p1": "Medical travel does not end when the procedure is completed.",
          "p2": "Recovery and follow-up care are essential parts of the process.",
          "p3": "Hospitals with clear post-care protocols tend to provide more predictable patient experiences."
        }
      ]
    },
    "reviewsRankings": {
      "title": "Why Reviews and Rankings Are Not Enough",
      "p1": "Online platforms frequently rank clinics using:",
      "items1": [
        "review counts",
        "ratings",
        "popularity metrics"
      ],
      "p2": "These systems can be useful for identifying widely known providers.",
      "p3": "However, they rarely incorporate deeper clinical signals such as:",
      "items2": [
        "treatment planning",
        "physician case selection",
        "complication management"
      ],
      "p4": "As a result, review-driven platforms often optimize for visibility rather than clinical rigor.",
      "trustProtocolNote": {
        "before": "This is where a structured ",
        "linkText": "trust protocol",
        "after": " becomes essential — one that evaluates hospitals on clinical merit, not marketing performance."
      }
    },
    "physicianLed": {
      "title": "The AI-Structured, Physician-Led Verification Model",
      "p1": "One way to reduce uncertainty is to let AI structure raw patient information before physician verification begins.",
      "p2": "In an AI-structured, physician-led model:",
      "items": [
        "patient goals, constraints, and context are organized before a hospital is considered",
        "physicians review the structured case, interpret clinical meaning, and test feasibility",
        "hospitals are assessed against physician-reviewed clinical criteria, not marketing alone"
      ],
      "p3": "This model uses AI to improve preparation and consistency while keeping medical interpretation, judgment, and accountability with licensed physicians.",
      "trustNote": "AetherHeal's Trust Protocol follows this logic: AI helps structure the case, and physicians lead the verification of each partner institution."
    },
    "patientJourney": {
      "title": "Understanding the International Patient Journey",
      "p1": "Choosing a hospital abroad is not a single decision. It is a sequence of coordinated steps.",
      "p2": "A typical patient journey includes:",
      "steps": [
        "Decision preparation",
        "Treatment planning",
        "Hospital selection",
        "Travel coordination",
        "Treatment and recovery",
        "Post-care follow-up"
      ],
      "p3": "When these steps are structured properly, international medical care can become significantly more predictable.",
      "journeyNote": "Learn more about how AetherHeal coordinates each stage in our medical journey overview."
    },
    "southKorea": {
      "title": "Why Many Patients Choose South Korea",
      "p1": "South Korea has emerged as one of the leading destinations for certain medical specialties, including:",
      "specialties": [
        "hair transplantation",
        "aesthetic medicine",
        "plastic surgery",
        "ophthalmology"
      ],
      "p2": "Several factors contribute to this reputation:",
      "factors": [
        "highly specialized physicians",
        "advanced medical infrastructure",
        "strong focus on technical outcomes"
      ],
      "oecdNote": "South Korea has developed one of the highest physician densities in Asia, according to OECD healthcare data. For international patients, Seoul in particular has developed a dense ecosystem of specialized clinics.",
      "hairNote": "Explore physician-led guidance for specific procedures like hair transplantation in Korea."
    },
    "structuredApproach": {
      "title": "A Structured Approach to Medical Travel",
      "p1": "Ultimately, the most effective strategy for choosing a hospital abroad is not simply gathering more information.",
      "p2": "It is structuring the decision process.",
      "p3": "This means:",
      "items": [
        "identifying relevant clinical factors",
        "verifying hospital capabilities",
        "aligning treatment plans with patient goals"
      ],
      "p4": "When these elements are organized systematically, patients can move from uncertainty toward clarity."
    },
    "closing": {
      "p1": "Choosing a hospital abroad is a significant decision.",
      "p2": "But with the right framework, it does not need to be an overwhelming one.",
      "p3": "The goal is not simply to find a hospital.",
      "p4": "The goal is to make a clear, informed decision about your care."
    },
    "faq": {
      "title": "Frequently Asked Questions",
      "items": [
        {
          "question": "Is it safe to travel abroad for medical treatment?",
          "answer": "International medical travel can be safe when patients evaluate physician training, hospital infrastructure, and follow-up care. A structured decision process significantly reduces risk."
        },
        {
          "question": "How do I verify a hospital overseas?",
          "answer": "Patients should review physician credentials, hospital systems, procedure volume, and complication management protocols rather than relying solely on online reviews."
        },
        {
          "question": "How much can medical treatment abroad cost?",
          "answer": "Costs vary widely depending on the procedure, country, and hospital. While international treatment can be more affordable than domestic options, the total cost should account for travel, follow-up care, and potential revision procedures — not just the quoted price."
        },
        {
          "question": "Why do patients travel to South Korea for surgery?",
          "answer": "South Korea offers highly specialized physicians, advanced medical infrastructure, and a strong focus on technical outcomes — particularly in hair transplantation, aesthetic medicine, plastic surgery, and ophthalmology."
        },
        {
          "question": "What should I check before choosing a clinic overseas?",
          "answer": "Key factors include physician training and specialization, institutional standards, procedure volume, post-care management protocols, and whether the hospital has experience treating international patients with your specific condition."
        }
      ]
    },
    "relatedPages": [
      {
        "label": "The AetherHeal Trust Protocol",
        "desc": "How we evaluate partner hospitals"
      },
      {
        "label": "Your Medical Journey",
        "desc": "End-to-end coordination from decision to recovery"
      },
      {
        "label": "Hair Transplant in Korea",
        "desc": "Physician-led guidance for hair restoration"
      },
      {
        "label": "Plastic Surgery in Korea",
        "desc": "Structured decision support for cosmetic procedures"
      },
      {
        "label": "Aesthetic Clinics in Seoul",
        "desc": "Navigate skin treatments and dermatology in Seoul"
      },
      {
        "label": "How AetherHeal Works",
        "desc": "The system behind physician-led decision support"
      }
    ]
  },
  "blog": {
    "meta": {
      "title": "Blog | AetherHeal — Physician Insights on Medical Care in Korea",
      "description": "Insights from a physician-led platform on medical care in Korea, decision-making frameworks, and what international patients should know."
    },
    "badge": "Blog",
    "heading": "Insights & Perspectives",
    "subheading": "Physician-led perspectives on medical care in Korea, decision-making, and what matters before you commit.",
    "allCategories": "All",
    "noPosts": "No posts yet. Check back soon.",
    "readMore": "Read",
    "sortNewest": "Newest",
    "sortOldest": "Oldest",
    "sortReadingTime": "Quick reads",
    "articlesCount": "{count} articles",
    "backToBlog": "Back to Blog",
    "availableIn": "Also available in",
    "categories": {
      "insights": "Insights",
      "hair-transplant": "Hair Transplant",
      "plastic-surgery": "Plastic Surgery",
      "medical-tourism": "Medical Tourism",
      "patient-guide": "Patient Guide",
      "technology": "Technology"
    },
    "keyTakeaways": "Key Takeaways",
    "faq": "Frequently Asked Questions"
  },
  "journeyAssurance": {
    "meta": {
      "title": "Journey Assurance Guarantee | AetherHeal",
      "description": "AetherHeal is the only medical tourism platform that puts its own revenue at risk when matching fails. Learn how Journey Assurance protects your investment."
    },
    "hero": {
      "badge": "Patient Protection",
      "h1": "The AetherHeal",
      "h1Highlight": "Journey Assurance",
      "intro": "AetherHeal is the only medical tourism platform that puts its own revenue at risk when matching fails. Journey Assurance means we bear real financial consequences if your experience falls short."
    },
    "toc": [
      {
        "id": "how-it-works",
        "label": "How It Works"
      },
      {
        "id": "coverage",
        "label": "What's Covered & What's Not"
      },
      {
        "id": "faq",
        "label": "Frequently Asked Questions"
      },
      {
        "id": "cta",
        "label": "Get Started"
      }
    ],
    "howItWorks": {
      "title": "How Journey Assurance Works",
      "intro": "Journey Assurance is a structural commitment, not a marketing promise. A portion of your navigation fee is held in escrow until your journey is complete and your satisfaction is confirmed. No other medical tourism intermediary offers this.",
      "stepLabel": "Step",
      "steps": [
        {
          "title": "You pay a flat navigation fee",
          "body": "The same fee regardless of hospital or procedure. No hidden commissions, no incentive for us to steer you toward higher-cost options."
        },
        {
          "title": "A portion is held in escrow",
          "body": "Part of your fee is reserved in escrow until your journey is complete and your satisfaction is confirmed through our post-treatment evaluation."
        },
        {
          "title": "If unsatisfied, the escrow is returned",
          "body": "If your post-treatment satisfaction score falls below our defined threshold, the escrowed portion is automatically returned to you. No negotiation required."
        }
      ]
    },
    "coverage": {
      "title": "What's Covered & What's Not",
      "coveredTitle": "What's Covered",
      "coveredItems": [
        "Hospital matching quality — was the recommended hospital appropriate for your case?",
        "Pre-arrival preparation accuracy",
        "Concierge service quality during your stay",
        "Communication and coordination throughout the journey",
        "Post-treatment follow-up as promised"
      ],
      "notCoveredTitle": "What's Not Covered",
      "notCoveredItems": [
        {
          "label": "Clinical outcomes",
          "detail": "Medical results depend on your body's response — no platform can guarantee surgical outcomes."
        },
        {
          "label": "Patient non-compliance",
          "detail": "Non-adherence to pre-operative or post-operative instructions provided by your medical team."
        },
        {
          "label": "Changes in patient preference",
          "detail": "Preference changes after booking that are unrelated to service quality."
        },
        {
          "label": "Force majeure",
          "detail": "Travel disruptions, natural disasters, pandemics, or other events beyond anyone's control."
        }
      ]
    },
    "faq": {
      "title": "Frequently Asked Questions",
      "label": "Common Questions",
      "items": [
        {
          "id": "faq-1",
          "question": "How is the satisfaction threshold defined?",
          "answer": "We use a structured post-treatment evaluation that covers matching accuracy, communication quality, concierge performance, and follow-up delivery. The threshold is set before your journey begins and disclosed in your service agreement. It is not a subjective feeling — it is a measurable standard."
        },
        {
          "id": "faq-2",
          "question": "What percentage of the fee is held in escrow?",
          "answer": "The exact escrow percentage is outlined in your service agreement before you commit. It is meaningful enough that AetherHeal bears real financial consequences for poor matching — this is not a token gesture."
        },
        {
          "id": "faq-3",
          "question": "How long after my procedure can I claim?",
          "answer": "The evaluation window is defined in your service agreement and is calibrated to the type of procedure. For most journeys, the satisfaction evaluation occurs within 30 days of your return. This allows enough time for a fair assessment without unnecessary delay."
        },
        {
          "id": "faq-4",
          "question": "Does this replace medical malpractice insurance?",
          "answer": "No. Journey Assurance covers AetherHeal's matching and coordination services — not clinical outcomes. Medical malpractice is a matter between you and the treating hospital. We encourage all patients to confirm their provider's malpractice coverage and to consider independent travel medical insurance."
        },
        {
          "id": "faq-5",
          "question": "Has anyone actually received a refund through Journey Assurance?",
          "answer": "Journey Assurance is designed so that refunds are rare — because the system is designed to prevent poor matches in the first place. When our process works as intended, satisfaction stays well above the threshold. But the mechanism exists precisely so that the incentive structure remains honest."
        }
      ]
    },
    "cta": {
      "headline": "Your journey starts with trust — not a leap of faith.",
      "button": "See How It Works"
    }
  }
}

```

---

## `src/components/landing/architecture-diagram.tsx`

```tsx
interface ArchitectureDiagramProps {
  highlightStakeholder?: "partner" | "patient" | "regulator"
}

export function ArchitectureDiagram({ highlightStakeholder }: ArchitectureDiagramProps) {
  const sh = (role: string) => {
    if (!highlightStakeholder) return "rgba(255,255,255,0.35)"
    return role === highlightStakeholder ? "#BF9B30" : "rgba(255,255,255,0.2)"
  }
  const shFont = (role: string) => {
    if (!highlightStakeholder) return 12
    return role === highlightStakeholder ? 13 : 12
  }
  const shWeight = (role: string) => {
    if (!highlightStakeholder) return 400
    return role === highlightStakeholder ? 600 : 400
  }

  return (
    <svg
      viewBox="0 0 680 540"
      className="w-full h-auto"
      role="img"
      aria-label="에테르힐 3-Layer Architecture"
    >
      <defs>
        <marker id="arch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Layer 1: Patient Interface */}
      <rect x="80" y="30" width="520" height="80" rx="14" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.6)" strokeWidth="0.5" />
      <text x="340" y="58" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500" fontFamily="serif">
        Patient Interface
      </text>
      <text x="340" y="80" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.8)" fontSize="12">
        다국어 웹 · AI 챗봇 · 상담 예약 · 환자 대시보드
      </text>

      {/* Arrows: Patient → Engine */}
      <line x1="260" y1="110" x2="260" y2="140" stroke="#0F6E56" strokeWidth="0.8" markerEnd="url(#arch-arrow)" opacity="0.5" />
      <line x1="420" y1="110" x2="420" y2="140" stroke="#0F6E56" strokeWidth="0.8" markerEnd="url(#arch-arrow)" opacity="0.5" />

      {/* Layer 2: Verification Engine (main box) */}
      <rect x="60" y="148" width="560" height="200" rx="16" fill="rgba(45,40,100,0.9)" stroke="rgba(175,169,236,0.6)" strokeWidth="1.2" />
      <text x="340" y="178" textAnchor="middle" dominantBaseline="central" fill="#CECBF6" fontSize="14" fontWeight="500" fontFamily="serif">
        Verification Engine
      </text>
      <text x="340" y="198" textAnchor="middle" dominantBaseline="central" fill="rgba(175,169,236,0.7)" fontSize="12">
        에테르힐의 핵심 — 인센티브 완전 분리, 독립 검증
      </text>

      {/* Sub-box 1: AI Agent */}
      <rect x="88" y="220" width="144" height="100" rx="10" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.5)" strokeWidth="0.5" />
      <text x="160" y="252" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500" fontFamily="serif">
        AI Agent
      </text>
      <text x="160" y="272" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.8)" fontSize="12">
        환자 정보 구조화
      </text>
      <text x="160" y="290" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.8)" fontSize="12">
        다국어 조율
      </text>

      {/* Sub-box 2: Angel Physician */}
      <rect x="268" y="220" width="144" height="100" rx="10" fill="rgba(80,55,10,0.9)" stroke="rgba(191,155,48,0.6)" strokeWidth="0.5" />
      <text x="340" y="252" textAnchor="middle" dominantBaseline="central" fill="#E8C56D" fontSize="14" fontWeight="500" fontFamily="serif">
        Angel Physician
      </text>
      <text x="340" y="272" textAnchor="middle" dominantBaseline="central" fill="rgba(191,155,48,0.8)" fontSize="12">
        독립 의사 검증
      </text>
      <text x="340" y="290" textAnchor="middle" dominantBaseline="central" fill="rgba(191,155,48,0.8)" fontSize="12">
        이해관계 없음
      </text>

      {/* Sub-box 3: Trust Protocol */}
      <rect x="448" y="220" width="144" height="100" rx="10" fill="rgba(80,35,15,0.9)" stroke="rgba(220,140,100,0.5)" strokeWidth="0.5" />
      <text x="520" y="252" textAnchor="middle" dominantBaseline="central" fill="#F0C4A0" fontSize="14" fontWeight="500" fontFamily="serif">
        Trust Protocol
      </text>
      <text x="520" y="272" textAnchor="middle" dominantBaseline="central" fill="rgba(220,140,100,0.8)" fontSize="12">
        병원 품질 감사
      </text>
      <text x="520" y="290" textAnchor="middle" dominantBaseline="central" fill="rgba(220,140,100,0.8)" fontSize="12">
        정기 재검증
      </text>

      {/* Horizontal arrows inside engine */}
      <line x1="232" y1="270" x2="264" y2="270" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#arch-arrow)" opacity="0.4" />
      <line x1="412" y1="270" x2="444" y2="270" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#arch-arrow)" opacity="0.4" />

      {/* Arrows: Engine → Data */}
      <line x1="260" y1="348" x2="260" y2="378" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#arch-arrow)" opacity="0.5" />
      <line x1="420" y1="348" x2="420" y2="378" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#arch-arrow)" opacity="0.5" />

      {/* Layer 3: Data & Compliance */}
      <rect x="80" y="386" width="520" height="80" rx="14" fill="rgba(50,50,48,0.9)" stroke="rgba(180,178,169,0.4)" strokeWidth="0.5" />
      <text x="340" y="414" textAnchor="middle" dominantBaseline="central" fill="#D3D1C7" fontSize="14" fontWeight="500" fontFamily="serif">
        Data &amp; Compliance
      </text>
      <text x="340" y="436" textAnchor="middle" dominantBaseline="central" fill="rgba(180,178,169,0.7)" fontSize="12">
        환자 동의 관리 · 데이터 익명화 · 감사 로그 · 규제 준수
      </text>

      {/* Stakeholders at bottom */}
      <text x="140" y="500" textAnchor="middle" fill={sh("partner")} fontSize={shFont("partner")} fontWeight={shWeight("partner")}>
        파트너 병원
      </text>
      <text x="340" y="500" textAnchor="middle" fill={sh("patient")} fontSize={shFont("patient")} fontWeight={shWeight("patient")}>
        해외 환자
      </text>
      <text x="540" y="500" textAnchor="middle" fill={sh("regulator")} fontSize={shFont("regulator")} fontWeight={shWeight("regulator")}>
        규제 기관
      </text>

      {/* Dashed arrows from stakeholders */}
      <path d="M140 490 L140 470" fill="none" stroke={sh("partner")} strokeWidth="0.8" strokeDasharray="4 3" markerEnd="url(#arch-arrow)" opacity="0.5" />
      <path d="M340 490 L340 470" fill="none" stroke={sh("patient")} strokeWidth="0.8" strokeDasharray="4 3" markerEnd="url(#arch-arrow)" opacity="0.5" />
      <path d="M540 490 L540 470" fill="none" stroke={sh("regulator")} strokeWidth="0.8" strokeDasharray="4 3" markerEnd="url(#arch-arrow)" opacity="0.5" />
    </svg>
  )
}

```

---

## `src/components/landing/comparison-table.tsx`

```tsx
import { XCircle, CheckCircle2 } from "lucide-react"

interface ComparisonTableProps {
  title: string
  subtitle?: string
  oldLabel: string
  oldItems: string[]
  newLabel: string
  newItems: string[]
}

export function ComparisonTable({ title, subtitle, oldLabel, oldItems, newLabel, newItems }: ComparisonTableProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 text-center break-keep">{title}</h2>
      {subtitle && <p className="text-[15px] text-slate-700 text-center mb-12 break-keep">{subtitle}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-200">
        <div className="bg-red-50/80 p-7 sm:p-8 border-b md:border-b-0 md:border-r border-slate-200">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-red-600 mb-6 break-keep">{oldLabel}</h3>
          <ul className="space-y-4">
            {oldItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-[15px] text-slate-700 leading-relaxed break-keep">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-emerald-50/80 p-7 sm:p-8">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 mb-6 break-keep">{newLabel}</h3>
          <ul className="space-y-4">
            {newItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-[15px] text-slate-700 leading-relaxed break-keep">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

```

---

## `src/components/landing/cta-section.tsx`

```tsx
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface CTASectionProps {
  title: string
  description: string
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
  stage?: string
  tertiaryHref?: string
  tertiaryLabel?: string
}

function isExternalLink(href: string) {
  return href.startsWith("mailto:") || href.startsWith("http")
}

export function CTASection({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  stage,
  tertiaryHref,
  tertiaryLabel,
}: CTASectionProps) {
  return (
    <section className="w-full py-20 sm:py-28 px-4 sm:px-6 bg-brand-navy">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-white break-keep">{title}</h2>
        {stage && (
          <p className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold/15 rounded-full text-[13px] font-semibold text-brand-gold tracking-wide break-keep">
            {stage}
          </p>
        )}
        <p className="text-slate-300 text-lg leading-relaxed break-keep">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={primaryHref}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-brand-navy bg-brand-gold rounded-full hover:bg-brand-gold/90 transition-all hover:shadow-lg break-keep"
          >
            {primaryLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
          {secondaryHref && secondaryLabel && (
            isExternalLink(secondaryHref) ? (
              <a
                href={secondaryHref}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all break-keep"
              >
                {secondaryLabel}
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all break-keep"
              >
                {secondaryLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )
          )}
        </div>
        {tertiaryHref && tertiaryLabel && (
          <div className="pt-8">
            {isExternalLink(tertiaryHref) ? (
              <a
                href={tertiaryHref}
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-gold transition-colors break-keep"
              >
                {tertiaryLabel}
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <Link
                href={tertiaryHref}
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-gold transition-colors break-keep"
              >
                {tertiaryLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

```

---

## `src/components/landing/flow-comparison-diagram.tsx`

```tsx
export function FlowComparisonDiagram() {
  return (
    <svg
      viewBox="0 0 680 600"
      className="w-full h-auto"
      role="img"
      aria-label="기존 에이전시 vs 에테르힐 모델 비교"
    >
      <defs>
        <marker id="flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Column headers */}
      <rect x="40" y="20" width="280" height="40" rx="8" fill="rgba(121,31,31,0.9)" stroke="rgba(240,149,149,0.5)" strokeWidth="0.5" />
      <text x="180" y="40" textAnchor="middle" dominantBaseline="central" fill="#F7C1C1" fontSize="14" fontWeight="500" fontFamily="serif">기존 에이전시 모델</text>

      <rect x="360" y="20" width="280" height="40" rx="8" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.5)" strokeWidth="0.5" />
      <text x="500" y="40" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500" fontFamily="serif">에테르힐 모델</text>

      {/* Center divider */}
      <line x1="340" y1="20" x2="340" y2="580" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="6 4" />

      {/* === LEFT: Agency flow === */}

      {/* L1: Patient */}
      <rect x="70" y="88" width="220" height="44" rx="8" fill="rgba(50,50,48,0.9)" stroke="rgba(180,178,169,0.4)" strokeWidth="0.5" />
      <text x="180" y="110" textAnchor="middle" dominantBaseline="central" fill="#D3D1C7" fontSize="14" fontWeight="500">해외 환자</text>
      <line x1="180" y1="132" x2="180" y2="160" stroke="#E24B4A" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* L2: Marketing */}
      <rect x="70" y="166" width="220" height="56" rx="8" fill="rgba(113,43,19,0.9)" stroke="rgba(240,153,123,0.5)" strokeWidth="0.5" />
      <text x="180" y="186" textAnchor="middle" dominantBaseline="central" fill="#F5C4B3" fontSize="14" fontWeight="500">마케팅 콘텐츠</text>
      <text x="180" y="204" textAnchor="middle" dominantBaseline="central" fill="rgba(240,153,123,0.8)" fontSize="12">광고 · 후기 · 전후사진</text>
      <line x1="180" y1="222" x2="180" y2="250" stroke="#E24B4A" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* L3: Agency */}
      <rect x="70" y="256" width="220" height="56" rx="8" fill="rgba(113,43,19,0.9)" stroke="rgba(240,153,123,0.5)" strokeWidth="0.5" />
      <text x="180" y="276" textAnchor="middle" dominantBaseline="central" fill="#F5C4B3" fontSize="14" fontWeight="500">에이전시 추천</text>
      <text x="180" y="294" textAnchor="middle" dominantBaseline="central" fill="rgba(240,153,123,0.8)" fontSize="12">수수료 높은 병원 우선</text>
      <line x1="180" y1="312" x2="180" y2="340" stroke="#E24B4A" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* L4: Hospital */}
      <rect x="70" y="346" width="220" height="44" rx="8" fill="rgba(50,50,48,0.9)" stroke="rgba(180,178,169,0.4)" strokeWidth="0.5" />
      <text x="180" y="368" textAnchor="middle" dominantBaseline="central" fill="#D3D1C7" fontSize="14" fontWeight="500">병원</text>
      <line x1="180" y1="390" x2="180" y2="418" stroke="#E24B4A" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* L5: Result */}
      <rect x="56" y="424" width="248" height="56" rx="8" fill="rgba(121,31,31,0.9)" stroke="rgba(240,149,149,0.5)" strokeWidth="0.5" />
      <text x="180" y="444" textAnchor="middle" dominantBaseline="central" fill="#F7C1C1" fontSize="14" fontWeight="500">기대치 불일치</text>
      <text x="180" y="462" textAnchor="middle" dominantBaseline="central" fill="rgba(240,149,149,0.8)" fontSize="12">불만 · 분쟁 · 신뢰 하락</text>

      {/* L: Bottom labels */}
      <text x="180" y="510" textAnchor="middle" fill="rgba(194,192,182,0.35)" fontSize="12">검증 단계 없음</text>
      <text x="180" y="528" textAnchor="middle" fill="rgba(194,192,182,0.35)" fontSize="12">인센티브 = 수수료</text>

      {/* === RIGHT: AetherHeal flow === */}

      {/* R1: Patient */}
      <rect x="390" y="88" width="220" height="44" rx="8" fill="rgba(50,50,48,0.9)" stroke="rgba(180,178,169,0.4)" strokeWidth="0.5" />
      <text x="500" y="110" textAnchor="middle" dominantBaseline="central" fill="#D3D1C7" fontSize="14" fontWeight="500">해외 환자</text>
      <line x1="500" y1="132" x2="500" y2="160" stroke="#0F6E56" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* R2: AI Agent */}
      <rect x="390" y="166" width="220" height="56" rx="8" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.5)" strokeWidth="0.5" />
      <text x="500" y="186" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500">AI Agent</text>
      <text x="500" y="204" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.7)" fontSize="12">정보 구조화 · 케이스 생성</text>
      <line x1="500" y1="222" x2="500" y2="250" stroke="#0F6E56" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* R3: Angel Physician */}
      <rect x="390" y="256" width="220" height="56" rx="8" fill="rgba(80,55,10,0.9)" stroke="rgba(191,155,48,0.6)" strokeWidth="0.5" />
      <text x="500" y="276" textAnchor="middle" dominantBaseline="central" fill="#E8C56D" fontSize="14" fontWeight="500">Angel Physician</text>
      <text x="500" y="294" textAnchor="middle" dominantBaseline="central" fill="rgba(191,155,48,0.7)" fontSize="12">독립 의사 검증 · 적합성 판단</text>
      <line x1="500" y1="312" x2="500" y2="340" stroke="#BA7517" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* R4: Decision ready */}
      <rect x="390" y="346" width="220" height="44" rx="8" fill="rgba(45,40,100,0.9)" stroke="rgba(175,169,236,0.5)" strokeWidth="0.5" />
      <text x="500" y="368" textAnchor="middle" dominantBaseline="central" fill="#CECBF6" fontSize="14" fontWeight="500">의사결정 준비 완료</text>
      <line x1="500" y1="390" x2="500" y2="418" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* R5: Hospital */}
      <rect x="376" y="424" width="248" height="56" rx="8" fill="rgba(16,60,50,0.95)" stroke="rgba(93,202,165,0.8)" strokeWidth="1" />
      <text x="500" y="444" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500">검증된 파트너 병원</text>
      <text x="500" y="462" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.8)" fontSize="12">높은 만족도 · 정확한 매칭</text>

      {/* R: Bottom labels */}
      <text x="500" y="510" textAnchor="middle" fill="rgba(194,192,182,0.35)" fontSize="12">3단계 독립 검증</text>
      <text x="500" y="528" textAnchor="middle" fill="rgba(194,192,182,0.35)" fontSize="12">인센티브 = 환자 결과</text>

      {/* Bottom comparison line + summaries */}
      <line x1="40" y1="556" x2="640" y2="556" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <text x="180" y="578" textAnchor="middle" fill="rgba(194,192,182,0.4)" fontSize="12">환자 → 마케팅 → 병원</text>
      <text x="500" y="578" textAnchor="middle" fill="rgba(194,192,182,0.4)" fontSize="12">환자 → 검증 → 의사결정 → 병원</text>
    </svg>
  )
}

```

---

## `src/components/landing/hero-section.tsx`

```tsx
import type { LucideIcon } from "lucide-react"
import Image from "next/image"

interface HeroSectionProps {
  icon: LucideIcon
  badge: string
  h1: string
  h1Highlight: string
  intro: string
  showBgImage?: boolean
}

export function HeroSection({ icon: Icon, badge, h1, h1Highlight, intro, showBgImage }: HeroSectionProps) {
  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 bg-brand-navy overflow-hidden">
      {showBgImage && (
        <div className="absolute inset-0">
          <Image
            src="/og-image.jpg"
            alt="AetherHeal medical journey background"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-brand-navy/75" />
        </div>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(191,155,48,0.08),transparent_70%)]" />
      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold/10 rounded-full text-[10px] sm:text-xs font-bold text-brand-gold uppercase tracking-widest break-keep">
          <Icon className="w-3.5 h-3.5" />
          {badge}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight break-keep">
          {h1} <span className="text-brand-gold">{h1Highlight}</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed break-keep">{intro}</p>
      </div>
    </section>
  )
}

```

---

## `src/components/landing/icon-card-grid.tsx`

```tsx
import type { LucideIcon } from "lucide-react"

interface IconCardGridProps {
  title: string
  subtitle?: string
  items: { title: string; description: string }[]
  icons: LucideIcon[]
  variant?: "gold" | "navy"
}

export function IconCardGrid({ title, subtitle, items, icons, variant = "gold" }: IconCardGridProps) {
  const iconBg = variant === "navy" ? "bg-brand-navy" : "bg-brand-gold/10"
  const cardBg = variant === "navy" ? "bg-bg-light" : "bg-white"
  const cardBorder = variant === "navy" ? "border-slate-200" : "border-slate-200"

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 text-center break-keep">{title}</h2>
      {subtitle && <p className="text-[15px] text-slate-700 text-center mb-12 break-keep">{subtitle}</p>}
      {!subtitle && <div className="mb-12" />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => {
          const Icon = icons[i % icons.length]
          return (
            <div
              key={item.title}
              className={`rounded-2xl border ${cardBorder} ${cardBg} p-7 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.1)]`}
            >
              <div className={`w-11 h-11 rounded-2xl ${iconBg} flex items-center justify-center mb-5`}>
                <Icon className="w-5 h-5 text-brand-gold" />
              </div>
              <h3 className="font-serif text-lg text-brand-navy font-semibold mb-3 break-keep">{item.title}</h3>
              <p className="text-[15px] text-slate-700 leading-relaxed break-keep">{item.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

```

---

## `src/components/landing/journey-accordion.tsx`

```tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface JourneyStep {
  label: string
  badge: string | null
  description: string
  details: string | null
  owner?: string
  next?: string
}

interface JourneyAccordionProps {
  steps: JourneyStep[]
  thenLabel: string
  decisionReadiness?: {
    notReady: string
    pause: string
    ready: string
    proceed: string
  }
  centerIndex?: number
  defaultOpenIdx?: number
}

export function JourneyAccordion({
  steps,
  thenLabel,
  decisionReadiness,
  centerIndex = 2,
  defaultOpenIdx = 2,
}: JourneyAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(defaultOpenIdx)

  return (
    <div className="space-y-2">
      {steps.map((step, idx) => {
        const isOpen = openIdx === idx
        const isCenter = idx === centerIndex
        const stepNum = idx + 1

        return (
          <div
            key={step.label}
            className={cn(
              "rounded-2xl border overflow-hidden transition-colors",
              isCenter && isOpen
                ? "border-brand-navy bg-brand-navy/[0.03]"
                : "border-slate-200 bg-white",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full flex items-start gap-3 px-4 py-3 sm:px-5 sm:py-4 text-left"
            >
              <span className="text-xs font-bold text-text-muted shrink-0 mt-1 w-5 text-center tabular-nums">
                {stepNum}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  {step.badge ? (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold leading-none">
                      {step.badge}
                    </span>
                  ) : (
                    <span />
                  )}
                  {step.owner && (
                    <span className="text-[10px] font-semibold text-text-muted shrink-0 leading-none hidden sm:inline">
                      {step.owner}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-base sm:text-lg text-brand-navy leading-snug mt-0.5">
                  {step.label}
                </h3>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-text-muted shrink-0 mt-1.5 transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <div
              className={cn(
                "transition-all duration-300 ease-in-out overflow-hidden",
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pl-12 sm:pl-[3.25rem]">
                {step.owner && (
                  <p className="text-[10px] font-semibold text-text-muted mb-2 sm:hidden">
                    {step.owner}
                  </p>
                )}
                <p className="text-sm text-text-body leading-relaxed">
                  {step.description}
                </p>
                {step.details && (
                  <p className="text-xs text-text-muted mt-2 font-medium">
                    {step.details}
                  </p>
                )}

                {isCenter && decisionReadiness && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <div className="flex-1 border border-slate-200 bg-slate-50 p-3 rounded-xl text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">
                        {decisionReadiness.notReady}
                      </p>
                      <p className="text-brand-navy font-serif text-sm">
                        {decisionReadiness.pause}
                      </p>
                    </div>
                    <div className="flex-1 border border-brand-gold/30 bg-brand-gold/5 p-3 rounded-xl text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1">
                        {decisionReadiness.ready}
                      </p>
                      <p className="text-brand-navy font-serif text-sm">
                        {decisionReadiness.proceed}
                      </p>
                    </div>
                  </div>
                )}

                {step.next && (
                  <p className="text-xs text-text-muted mt-3 font-medium">
                    {thenLabel} {step.next}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

```

---

## `src/components/landing/lemon-cycle-diagram.tsx`

```tsx
interface CycleStep {
  title: string
  detail: string
}

interface LemonCycleDiagramProps {
  steps: CycleStep[]
  label: string
  subLabel: string
  caption: string
  captionSub: string
}

export function LemonCycleDiagram({ steps, label, subLabel, caption, captionSub }: LemonCycleDiagramProps) {
  return (
    <div className="rounded-2xl bg-brand-navy p-6 sm:p-8 overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="font-serif text-lg text-white font-semibold break-keep">{label}</h3>
      </div>

      <svg
        viewBox="0 0 600 420"
        className="w-full h-auto"
        aria-label={label}
        role="img"
      >
        <defs>
          <marker
            id="cycle-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M2 1L8 5L2 9" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker
            id="cycle-arrow-dashed"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M2 1L8 5L2 9" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {steps.map((step, i) => {
          const y = 10 + i * 94
          return (
            <g key={i}>
              {/* Step box */}
              <rect x="140" y={y} width="400" height="68" rx="10" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.25)" strokeWidth="0.5" />
              <text x="340" y={y + 28} textAnchor="middle" dominantBaseline="central" fill="#fca5a5" fontSize="14" fontWeight="600" fontFamily="serif">
                {step.title}
              </text>
              <text x="340" y={y + 50} textAnchor="middle" dominantBaseline="central" fill="rgba(239,68,68,0.6)" fontSize="12" fontWeight="400">
                {step.detail}
              </text>

              {/* Step number */}
              <circle cx="120" cy={y + 34} r="14" fill="rgba(239,68,68,0.15)" />
              <text x="120" y={y + 34} textAnchor="middle" dominantBaseline="central" fill="#fca5a5" fontSize="12" fontWeight="600">
                {i + 1}
              </text>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <line x1="340" y1={y + 68} x2="340" y2={y + 94} stroke="#ef4444" strokeWidth="1" markerEnd="url(#cycle-arrow)" opacity="0.5" />
              )}
            </g>
          )
        })}

        {/* Return arrow (dashed, left side) */}
        <path
          d={`M140 ${10 + 3 * 94 + 34} L70 ${10 + 3 * 94 + 34} C50 ${10 + 3 * 94 + 34} 50 ${10 + 3 * 94 + 14} 50 ${10 + 3 * 94 + 14} L50 44 C50 24 70 24 70 24 L116 24`}
          fill="none"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          markerEnd="url(#cycle-arrow-dashed)"
          opacity="0.45"
        />

        {/* "악순환" label */}
        <text x="40" y={10 + 2 * 94} textAnchor="end" fill="rgba(255,255,255,0.35)" fontSize="12" fontWeight="400">
          {subLabel}
        </text>

        {/* Bottom caption */}
        <line x1="140" y1="395" x2="540" y2="395" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <text x="140" y="412" fill="rgba(255,255,255,0.3)" fontSize="11" fontWeight="400">
          {caption}
        </text>
      </svg>

      <p className="text-[11px] text-white/30 mt-1 break-keep">{captionSub}</p>
    </div>
  )
}

```

---

## `src/components/landing/mobile-disclosure.tsx`

```tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface MobileDisclosureProps {
  buttonLabel: string
  variant?: "light" | "dark"
  children: React.ReactNode
  className?: string
}

export function MobileDisclosure({ buttonLabel, variant = "light", children, className }: MobileDisclosureProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop: always visible */}
      <div className={cn("hidden md:block", className)}>{children}</div>

      {/* Mobile: toggle */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "w-full flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold shadow-sm transition-colors",
            variant === "dark"
              ? "border-white/20 bg-white/10 text-white active:bg-white/20"
              : "border-slate-200 bg-white text-brand-navy active:bg-slate-50"
          )}
        >
          {buttonLabel}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </button>
        <div
          className={cn(
            "transition-all duration-500 ease-in-out overflow-hidden",
            open ? "max-h-[3000px] opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          {children}
        </div>
      </div>
    </>
  )
}

```

---

## `src/components/landing/page-section.tsx`

```tsx
import type { LucideIcon } from "lucide-react"

interface PageSectionProps {
  children: React.ReactNode
  bg?: "white" | "light" | "navy"
  border?: boolean
  className?: string
}

export function PageSection({ children, bg = "white", border = true, className = "" }: PageSectionProps) {
  const bgClass = bg === "navy" ? "bg-brand-navy" : bg === "light" ? "bg-bg-light" : "bg-white"
  const borderClass = border ? "border-b border-slate-100" : ""

  return (
    <section className={`w-full py-20 sm:py-28 px-4 sm:px-6 ${bgClass} ${borderClass} ${className}`}>
      {children}
    </section>
  )
}

```

---

## `src/components/landing/patient-funnel-diagram.tsx`

```tsx
export function PatientFunnelDiagram() {
  return (
    <svg
      viewBox="0 0 680 580"
      className="w-full h-auto"
      role="img"
      aria-label="에테르힐 환자 검증 퍼널"
    >
      <defs>
        <marker id="funnel-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Step 1: 해외 환자 유입 — narrowest (280px) */}
      <rect x="200" y="24" width="280" height="56" rx="28" fill="rgba(50,50,48,0.9)" stroke="rgba(180,178,169,0.4)" strokeWidth="0.5" />
      <text x="340" y="46" textAnchor="middle" dominantBaseline="central" fill="#D3D1C7" fontSize="14" fontWeight="500" fontFamily="serif">
        해외 환자 유입
      </text>
      <text x="340" y="64" textAnchor="middle" dominantBaseline="central" fill="rgba(180,178,169,0.7)" fontSize="12">
        품질 판별 불가능한 상태
      </text>

      {/* Arrow 1→2 */}
      <line x1="340" y1="80" x2="340" y2="112" stroke="rgba(180,178,169,0.3)" strokeWidth="0.8" markerEnd="url(#funnel-arrow)" opacity="0.5" />

      {/* Step 2: AI Agent (360px) */}
      <rect x="160" y="118" width="360" height="72" rx="12" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.5)" strokeWidth="0.5" />
      <text x="340" y="144" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500" fontFamily="serif">
        AI Agent 정보 구조화
      </text>
      <text x="340" y="166" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.7)" fontSize="12">
        병력 · 희망 시술 · 예산 · 기대치 → 구조화된 케이스 생성
      </text>
      {/* Side label */}
      <text x="546" y="154" fill="rgba(194,192,182,0.4)" fontSize="12">자동화</text>

      {/* Arrow 2→3 */}
      <line x1="340" y1="190" x2="340" y2="222" stroke="#0F6E56" strokeWidth="0.8" markerEnd="url(#funnel-arrow)" opacity="0.5" />

      {/* Step 3: Angel Physician (400px) */}
      <rect x="140" y="228" width="400" height="72" rx="12" fill="rgba(80,55,10,0.9)" stroke="rgba(191,155,48,0.6)" strokeWidth="0.5" />
      <text x="340" y="254" textAnchor="middle" dominantBaseline="central" fill="#E8C56D" fontSize="14" fontWeight="500" fontFamily="serif">
        Angel Physician 독립 의사 검증
      </text>
      <text x="340" y="276" textAnchor="middle" dominantBaseline="central" fill="rgba(191,155,48,0.7)" fontSize="12">
        병원과 이해관계 없는 의사가 케이스 리뷰 · 적합성 판단
      </text>
      {/* Side label */}
      <text x="564" y="264" fill="rgba(194,192,182,0.4)" fontSize="12">독립 검증</text>

      {/* Rejection path — left branch from Angel Physician */}
      <path d="M140 264 L90 264 L90 310" fill="none" stroke="#E24B4A" strokeWidth="0.8" strokeDasharray="4 3" markerEnd="url(#funnel-arrow)" opacity="0.5" />
      <rect x="46" y="316" width="88" height="40" rx="8" fill="rgba(121,31,31,0.9)" stroke="rgba(240,149,149,0.5)" strokeWidth="0.5" />
      <text x="90" y="336" textAnchor="middle" dominantBaseline="central" fill="#F09595" fontSize="12">
        부적합 반려
      </text>

      {/* Arrow 3→4 */}
      <line x1="340" y1="300" x2="340" y2="332" stroke="#BA7517" strokeWidth="0.8" markerEnd="url(#funnel-arrow)" opacity="0.5" />

      {/* Step 4: Decision-ready (440px) */}
      <rect x="120" y="338" width="440" height="72" rx="12" fill="rgba(45,40,100,0.9)" stroke="rgba(175,169,236,0.5)" strokeWidth="0.5" />
      <text x="340" y="364" textAnchor="middle" dominantBaseline="central" fill="#CECBF6" fontSize="14" fontWeight="500" fontFamily="serif">
        의사결정 준비 완료
      </text>
      <text x="340" y="386" textAnchor="middle" dominantBaseline="central" fill="rgba(175,169,236,0.7)" fontSize="12">
        검증된 정보 기반 · 환자가 능동적으로 판단할 수 있는 상태
      </text>
      {/* Side label */}
      <text x="584" y="374" fill="rgba(194,192,182,0.4)" fontSize="12">전환점</text>

      {/* Arrow 4→5 */}
      <line x1="340" y1="410" x2="340" y2="442" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#funnel-arrow)" opacity="0.5" />

      {/* Step 5: Partner hospital — widest (480px), stronger border */}
      <rect x="100" y="448" width="480" height="72" rx="12" fill="rgba(16,60,50,0.95)" stroke="rgba(93,202,165,0.8)" strokeWidth="1" />
      <text x="340" y="474" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500" fontFamily="serif">
        파트너 병원 연계
      </text>
      <text x="340" y="496" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.8)" fontSize="12">
        높은 전환율 · 정확한 기대치 · 즉시 진료 가능한 환자
      </text>
      {/* ← 귀원 emphasis */}
      <text x="604" y="484" fill="rgba(194,192,182,0.4)" fontSize="12">← 귀원</text>

      {/* Bottom note */}
      <text x="340" y="548" textAnchor="middle" fill="rgba(194,192,182,0.35)" fontSize="12">
        마케팅이 아닌 검증이 환자를 연결합니다
      </text>
    </svg>
  )
}

```

---

## `src/components/landing/revenue-pipeline-diagram.tsx`

```tsx
export function RevenuePipelineDiagram() {
  return (
    <svg
      viewBox="0 0 680 580"
      className="w-full h-auto"
      role="img"
      aria-label="에테르힐 수익 구조: 순차 점화 모델"
    >
      <defs>
        <marker id="rev-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Layer 1: 환자 의사결정 지원 수수료 */}
      <rect x="60" y="40" width="400" height="84" rx="12" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.5)" strokeWidth="0.5" />
      <text x="84" y="70" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500">환자 의사결정 지원 수수료</text>
      <text x="84" y="94" dominantBaseline="central" fill="rgba(93,202,165,0.7)" fontSize="12">시술 비용과 무관한 정액제 · B2C</text>

      <rect x="480" y="44" width="160" height="72" rx="10" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.5)" strokeWidth="0.5" />
      <text x="560" y="68" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500">Day 1</text>
      <text x="560" y="88" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.7)" fontSize="12">PMF 증명 구간</text>
      <text x="560" y="104" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.7)" fontSize="12">unit economics 검증</text>

      {/* Ignition 1→2 */}
      <line x1="270" y1="124" x2="270" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" markerEnd="url(#rev-arrow)" opacity="0.4" />
      <text x="286" y="140" fill="rgba(194,192,182,0.3)" fontSize="12">검증 완료</text>

      {/* Layer 2: 파트너 병원 연간 멤버십 */}
      <rect x="60" y="156" width="400" height="84" rx="12" fill="rgba(80,55,10,0.9)" stroke="rgba(191,155,48,0.6)" strokeWidth="0.5" />
      <text x="84" y="186" dominantBaseline="central" fill="#E8C56D" fontSize="14" fontWeight="500">파트너 병원 연간 멤버십</text>
      <text x="84" y="210" dominantBaseline="central" fill="rgba(191,155,48,0.7)" fontSize="12">Founding cohort 무료 → 유료 전환 · B2B</text>

      <rect x="480" y="160" width="160" height="72" rx="10" fill="rgba(80,55,10,0.9)" stroke="rgba(191,155,48,0.6)" strokeWidth="0.5" />
      <text x="560" y="184" textAnchor="middle" dominantBaseline="central" fill="#E8C56D" fontSize="14" fontWeight="500">Month 6+</text>
      <text x="560" y="204" textAnchor="middle" dominantBaseline="central" fill="rgba(191,155,48,0.7)" fontSize="12">환자 실적 기반</text>
      <text x="560" y="220" textAnchor="middle" dominantBaseline="central" fill="rgba(191,155,48,0.7)" fontSize="12">유료 전환 시작</text>

      {/* Ignition 2→3 */}
      <line x1="270" y1="240" x2="270" y2="266" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" markerEnd="url(#rev-arrow)" opacity="0.4" />
      <text x="286" y="256" fill="rgba(194,192,182,0.3)" fontSize="12">환자 수 임계점</text>

      {/* Layer 3: Patient Logistics */}
      <rect x="60" y="272" width="400" height="84" rx="12" fill="rgba(113,43,19,0.9)" stroke="rgba(240,153,123,0.5)" strokeWidth="0.5" />
      <text x="84" y="302" dominantBaseline="central" fill="#F5C4B3" fontSize="14" fontWeight="500">Patient Logistics 플랫폼</text>
      <text x="84" y="326" dominantBaseline="central" fill="rgba(240,153,123,0.7)" fontSize="12">프리랜서 풀 기반 양면 플랫폼 · 건당 수수료</text>

      <rect x="480" y="276" width="160" height="72" rx="10" fill="rgba(113,43,19,0.9)" stroke="rgba(240,153,123,0.5)" strokeWidth="0.5" />
      <text x="560" y="300" textAnchor="middle" dominantBaseline="central" fill="#F5C4B3" fontSize="14" fontWeight="500">Year 1</text>
      <text x="560" y="320" textAnchor="middle" dominantBaseline="central" fill="rgba(240,153,123,0.7)" fontSize="12">월 환자 수 N명+</text>
      <text x="560" y="336" textAnchor="middle" dominantBaseline="central" fill="rgba(240,153,123,0.7)" fontSize="12">공급풀 확보 후</text>

      {/* Ignition 3→4 */}
      <line x1="270" y1="356" x2="270" y2="382" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" markerEnd="url(#rev-arrow)" opacity="0.4" />
      <text x="286" y="372" fill="rgba(194,192,182,0.3)" fontSize="12">데이터 축적</text>

      {/* Layer 4: Customized AI Agent */}
      <rect x="60" y="388" width="400" height="84" rx="12" fill="rgba(45,40,100,0.9)" stroke="rgba(175,169,236,0.5)" strokeWidth="0.5" />
      <text x="84" y="418" dominantBaseline="central" fill="#CECBF6" fontSize="14" fontWeight="500">병원별 Customized AI Agent</text>
      <text x="84" y="442" dominantBaseline="central" fill="rgba(175,169,236,0.7)" fontSize="12">Agentic AI · 로컬 마켓 확장 · 병원별 SaaS</text>

      <rect x="480" y="392" width="160" height="72" rx="10" fill="rgba(45,40,100,0.9)" stroke="rgba(175,169,236,0.5)" strokeWidth="0.5" />
      <text x="560" y="416" textAnchor="middle" dominantBaseline="central" fill="#CECBF6" fontSize="14" fontWeight="500">Year 2+</text>
      <text x="560" y="436" textAnchor="middle" dominantBaseline="central" fill="rgba(175,169,236,0.7)" fontSize="12">글로벌 → 로컬</text>
      <text x="560" y="452" textAnchor="middle" dominantBaseline="central" fill="rgba(175,169,236,0.7)" fontSize="12">커스터마이징 확장</text>

      {/* Left vertical bracket */}
      <path d="M44 56 L44 456" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <path d="M40 56 L44 44 L48 56" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
      <path d="M40 456 L44 468 L48 456" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />

      {/* Bottom line + captions */}
      <line x1="60" y1="500" x2="640" y2="500" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <text x="60" y="524" fill="rgba(194,192,182,0.4)" fontSize="12">각 레이어는 이전 레이어가 점화 조건을 충족한 후 순차 가동</text>
      <text x="60" y="544" fill="rgba(194,192,182,0.35)" fontSize="12">Day 1은 하나에 집중 — unit economics 증명이 나머지 전부의 전제조건</text>
    </svg>
  )
}

```

---

## `src/components/landing/scroll-slide-section.tsx`

```tsx
"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"

interface ScrollSlideSectionProps {
  panelA: ReactNode
  panelB: ReactNode
}

export function ScrollSlideSection({ panelA, panelB }: ScrollSlideSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let ticking = false

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (!wrapper) { ticking = false; return }
        const rect = wrapper.getBoundingClientRect()
        const wrapperHeight = wrapper.offsetHeight
        const viewportHeight = window.innerHeight
        const scrollableDistance = wrapperHeight - viewportHeight

        if (scrollableDistance <= 0) {
          setProgress(0)
          ticking = false
          return
        }

        const scrolled = -rect.top
        const raw = Math.max(0, Math.min(1, scrolled / scrollableDistance))
        setProgress(raw)
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const translateX = (1 - progress) * 100

  return (
    <div ref={wrapperRef} className="hidden md:block relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-brand-navy">
          <div className="h-full w-full flex items-center justify-center">
            {panelA}
          </div>
        </div>

        <div
          className="absolute inset-0 bg-brand-navy will-change-transform"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          <div className="h-full w-full flex items-center justify-center">
            {panelB}
          </div>
        </div>
      </div>
    </div>
  )
}

```

---

## `src/components/landing/waitlist-form.tsx`

```tsx
"use client"

import { useState, type FormEvent } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, Loader2 } from "lucide-react"

interface WaitlistFormProps {
  placeholder: string
  buttonLabel: string
  successMessage: string
  duplicateMessage: string
  locale: string
  variant?: "light" | "dark"
}

type Status = "idle" | "loading" | "success" | "duplicate"

export function WaitlistForm({
  placeholder,
  buttonLabel,
  successMessage,
  duplicateMessage,
  locale,
  variant = "light",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || status === "loading") return

    setStatus("loading")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), locale }),
      })

      if (res.ok) {
        setStatus("success")
      } else if (res.status === 409) {
        setStatus("duplicate")
      } else {
        setStatus("idle")
      }
    } catch {
      setStatus("idle")
    }
  }

  if (status === "success" || status === "duplicate") {
    return (
      <div className="flex items-center justify-center gap-2 py-3">
        <CheckCircle2
          className={cn(
            "w-5 h-5 shrink-0",
            variant === "dark" ? "text-brand-gold" : "text-emerald-500"
          )}
        />
        <p
          className={cn(
            "text-sm font-medium",
            variant === "dark" ? "text-white" : "text-brand-navy"
          )}
        >
          {status === "success" ? successMessage : duplicateMessage}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all",
          variant === "dark"
            ? "bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
            : "bg-white border border-slate-200 text-brand-navy placeholder:text-slate-400 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold shadow-sm"
        )}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "rounded-xl px-6 py-3 text-sm font-semibold transition-all shrink-0 flex items-center justify-center gap-2",
          variant === "dark"
            ? "bg-brand-gold text-brand-navy hover:bg-brand-gold/90 disabled:opacity-60"
            : "bg-brand-navy text-white hover:bg-brand-navy/90 disabled:opacity-60"
        )}
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          buttonLabel
        )}
      </button>
    </form>
  )
}

```

---

## `src/components/ui/accordion.tsx`

```tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id
        const panelId = `accordion-panel-${item.id}`
        const triggerId = `accordion-trigger-${item.id}`
        return (
          <div
            key={item.id}
            className="border border-border-light rounded-xl overflow-hidden bg-white"
          >
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="text-sm font-semibold text-text-deep pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-text-muted shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                "transition-all duration-[400ms] ease-in-out overflow-hidden",
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-5 pb-5 text-sm text-text-body leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

```

---

## `src/components/ui/button.tsx`

```tsx
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        navy: "bg-brand-navy text-white border border-brand-navy hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)]",
        outline:
          "bg-transparent text-brand-navy border border-brand-navy hover:bg-bg-light hover:-translate-y-0.5",
        gold: "bg-brand-gold text-white border border-brand-gold hover:bg-amber-600 hover:-translate-y-0.5",
        ghost: "bg-transparent text-text-body hover:bg-slate-100",
        danger: "bg-danger text-white border border-danger hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-4 rounded text-xs",
        md: "h-11 px-6 rounded-md text-sm",
        lg: "h-12 px-8 rounded-md text-sm",
      },
    },
    defaultVariants: {
      variant: "navy",
      size: "md",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

export function Button({ variant, size, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  )
}

export { buttonVariants }

```

---

## `src/components/ui/card.tsx`

```tsx
import { cn } from "@/lib/utils"

type AccentColor = "gold" | "navy" | "danger" | "muted"

const accentClasses: Record<AccentColor, string> = {
  gold: "border-l-4 border-l-brand-gold",
  navy: "border-l-4 border-l-brand-navy",
  danger: "border-l-4 border-l-danger",
  muted: "border-l-4 border-l-border-light",
}

interface CardProps {
  children: React.ReactNode
  className?: string
  accent?: AccentColor
}

export function Card({ children, className, accent }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-border-light shadow-card p-6",
        accent && accentClasses[accent],
        className
      )}
    >
      {children}
    </div>
  )
}

```

---

## `src/components/ui/checkbox.tsx`

```tsx
"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface CheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: React.ReactNode
  className?: string
}

export function Checkbox({ checked = false, onChange, label, className }: CheckboxProps) {
  return (
    <label className={cn("flex items-start gap-3 cursor-pointer group", className)}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-200",
          checked
            ? "bg-brand-navy border-brand-navy"
            : "border-slate-300 group-hover:border-brand-navy/50"
        )}
      >
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </button>
      {label && <span className="text-sm text-text-body leading-relaxed">{label}</span>}
    </label>
  )
}

```

---

## `src/components/ui/divider.tsx`

```tsx
import { cn } from "@/lib/utils"

interface DividerProps {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return <div className={cn("w-12 h-1 bg-brand-gold rounded-full", className)} />
}

```

---

## `src/components/ui/logo.tsx`

```tsx
import Image from "next/image"
import { cn } from "@/lib/utils"

const sizes = {
  sm: { wrapper: "h-6", width: 100, height: 22 },
  md: { wrapper: "h-8", width: 140, height: 29 },
  lg: { wrapper: "h-11", width: 180, height: 37 },
}

interface LogoProps {
  size?: keyof typeof sizes
  theme?: "light" | "dark"
  className?: string
}

export function Logo({ size = "md", theme = "light", className }: LogoProps) {
  const s = sizes[size]
  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("relative flex items-center justify-start", s.wrapper)}>
        <Image
          src="/assets/logo.png"
          alt="AetherHeal Logo"
          width={s.width}
          height={s.height}
          className={cn("object-contain", theme === "dark" && "invert")}
          style={{ width: "auto", height: "100%" }}
          priority
        />
      </div>
    </div>
  )
}

```

---

## `src/components/ui/section-label.tsx`

```tsx
import { cn } from "@/lib/utils"

const colors = {
  default: "text-brand-navy",
  gold: "text-brand-gold",
  muted: "text-text-muted",
}

interface SectionLabelProps {
  children: React.ReactNode
  color?: keyof typeof colors
  className?: string
}

export function SectionLabel({ children, color = "default", className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "text-[10px] uppercase tracking-widest font-bold",
        colors[color],
        className
      )}
    >
      {children}
    </span>
  )
}

```

---

## `src/components/layout/footer.tsx`

```tsx
import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/get-dictionary"

interface FooterProps {
  dict: Dictionary["common"]
  locale: Locale
}

export function Footer({ dict, locale }: FooterProps) {
  const prefix = `/${locale}`
  const isKo = locale === "ko"

  const platformLinks = isKo
    ? [
        { href: `${prefix}/for-partners`, label: dict.nav.forPartners },
        { href: `${prefix}/for-investors`, label: dict.nav.forInvestors },
        { href: `${prefix}/for-team`, label: dict.nav.forTeam },
        { href: `${prefix}/our-philosophy`, label: dict.nav.philosophy },
      ]
    : [
        { href: `${prefix}/how-it-works`, label: dict.footer.platformLinks.howItWorks },
        { href: `${prefix}/trust-protocol`, label: dict.footer.platformLinks.trustProtocol },
        { href: `${prefix}/our-philosophy`, label: dict.footer.platformLinks.ourPhilosophy },
        { href: `${prefix}/medical-journey`, label: dict.footer.platformLinks.medicalJourney },
        { href: `${prefix}/explore`, label: dict.footer.platformLinks.explore },
        { href: `${prefix}/blog`, label: dict.footer.platformLinks.blog },
        { href: `${prefix}/journey-assurance`, label: dict.footer.platformLinks.journeyAssurance },
      ]

  const guideLinks = isKo
    ? [
        { href: "/en", label: dict.footer.koGuideLinks?.englishSite ?? "영문 환자용 사이트" },
        { href: "/en/how-it-works", label: dict.footer.koGuideLinks?.howItWorksEn ?? "How It Works (EN)" },
        { href: "/en/trust-protocol", label: dict.footer.koGuideLinks?.trustProtocolEn ?? "Trust Protocol (EN)" },
      ]
    : [
        { href: `${prefix}/how-to-choose-hospital-abroad`, label: dict.footer.guideLinks.choosingHospital },
        { href: `${prefix}/hair-transplant-korea`, label: dict.footer.guideLinks.hairTransplant },
        { href: `${prefix}/plastic-surgery-korea`, label: dict.footer.guideLinks.plasticSurgery },
        { href: `${prefix}/aesthetic-clinic-seoul`, label: dict.footer.guideLinks.aestheticClinics },
      ]

  const legalPrefix = isKo ? "/en" : prefix
  const legalLinks = [
    { href: `${legalPrefix}/medical-boundary`, label: dict.footer.medicalBoundaryNotice },
    { href: `${legalPrefix}/terms-of-service`, label: dict.footer.termsOfService },
    { href: `${legalPrefix}/privacy-policy`, label: dict.footer.privacyPolicy },
    { href: `${legalPrefix}/payment-refund-policy`, label: dict.footer.paymentRefundPolicy },
  ]

  return (
    <footer className="bg-brand-navy text-white pt-14 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 sm:gap-12 mb-14 sm:mb-20">

          <div className="col-span-2 md:col-span-4">
            <Link href={`/${locale}`} className="inline-block mb-5">
              <Logo size="md" theme="dark" />
            </Link>
            <p className="text-sm text-slate-400 font-light leading-relaxed max-w-xs mb-3">
              {dict.footer.brandDescription}
            </p>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">
              {dict.footer.brandSubtitle}
            </p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
              {dict.footer.platform}
            </h3>
            <ul className="space-y-4">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
              {dict.footer.guides}
            </h3>
            <ul className="space-y-4">
              {guideLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
              {dict.footer.company}
            </h3>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="pt-4 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 block mb-1">{dict.footer.contact}</span>
                <a
                  href="mailto:drjeeju@aetherheal.com"
                  className="text-sm text-slate-300 hover:text-brand-gold transition-colors"
                >
                  drjeeju@aetherheal.com
                </a>
              </li>

              <li className="pt-4 border-t border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">
                  {dict.footer.companyName}
                </p>
                <div className="text-[10px] text-slate-500 space-y-1 font-light">
                  <p>{dict.footer.representative}</p>
                  <p>{dict.footer.bizRegNo}</p>
                  <p className="leading-relaxed">
                    {dict.footer.address}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[10px] text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
          <p className="text-[10px] text-slate-600 max-w-md text-left md:text-right leading-relaxed">
            {dict.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}

```

---

## `src/components/layout/navbar.tsx`

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Globe, ChevronDown, Menu, X, ArrowRight } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { cn } from "@/lib/utils"
import { locales, localeNames, localeShort, isRouteAvailableForLocale, type Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/get-dictionary"

interface NavbarProps {
  dict: Dictionary["common"]
  locale: Locale
}

export function Navbar({ dict, locale }: NavbarProps) {
  const pathname = usePathname()
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const isKo = locale === "ko"

  const navItems = isKo
    ? [
        { href: `/${locale}/for-partners`, label: dict.nav.forPartners },
        { href: `/${locale}/for-investors`, label: dict.nav.forInvestors },
        { href: `/${locale}/for-team`, label: dict.nav.forTeam },
        { href: `/${locale}/our-philosophy`, label: dict.nav.philosophy },
      ]
    : [
        { href: `/${locale}/how-it-works`, label: dict.nav.howItWorks },
        { href: `/${locale}/explore`, label: dict.nav.exploreFramework },
        { href: `/${locale}/our-philosophy`, label: dict.nav.ourPhilosophy },
        { href: `/${locale}/trust-protocol`, label: dict.nav.trustSafety },
        { href: `/${locale}/blog`, label: dict.nav.blog },
      ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  function switchLocale(newLocale: Locale) {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/"
    const canNavigate = isRouteAvailableForLocale(pathWithoutLocale, newLocale)
    const newPath = canNavigate
      ? `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`
      : `/${newLocale}`
    window.location.href = newPath
  }

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-brand-navy focus:text-white focus:rounded-md focus:text-sm">
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center">
            <Logo size="sm" className="sm:hidden" />
            <Logo size="md" className="hidden sm:flex" />
          </Link>

          <div className="flex items-center gap-1">
            <div className="hidden lg:flex items-center gap-1 mr-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-[13px] tracking-wide font-medium rounded-full transition-all duration-200",
                      isActive
                        ? "text-brand-navy bg-slate-100"
                        : "text-text-muted hover:text-brand-navy hover:bg-slate-50"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {!isKo && <div className="hidden lg:block w-px h-5 bg-slate-200 mr-2" />}

            {!isKo && (
              <a
                href="https://app.aetherheal.com/sign-in"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center px-3 py-2 text-[13px] tracking-wide font-medium text-text-muted hover:text-brand-navy rounded-full transition-all duration-200 hover:bg-slate-50"
              >
                {dict.nav.signIn}
              </a>
            )}

            <a
              href={isKo ? `mailto:drjeeju@aetherheal.com?subject=${dict.nav.beginJourney}` : "https://app.aetherheal.com/transition"}
              target={isKo ? undefined : "_blank"}
              rel={isKo ? undefined : "noopener noreferrer"}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-[13px] tracking-wide font-semibold text-white bg-brand-navy rounded-full transition-all duration-200 hover:bg-brand-navy/90 hover:shadow-md"
            >
              {dict.nav.beginJourney}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-2 text-[13px] tracking-wide font-medium rounded-full transition-all duration-200",
                  isLangOpen
                    ? "text-brand-navy bg-slate-100"
                    : "text-text-muted hover:text-brand-navy hover:bg-slate-50"
                )}
                aria-label="Select Language"
                aria-expanded={isLangOpen}
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{localeShort[locale]}</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", isLangOpen && "rotate-180")} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl border border-slate-100 shadow-lg py-1.5 animate-fade-in z-50">
                  {locales.map((l) => (
                    <button
                      key={l}
                      className={cn(
                        "w-full text-left px-3.5 py-2 text-[13px] tracking-wide font-medium transition-colors",
                        l === locale
                          ? "text-brand-navy bg-slate-50"
                          : "text-text-body hover:bg-slate-50 hover:text-brand-navy"
                      )}
                      onClick={() => {
                        switchLocale(l)
                        setIsLangOpen(false)
                      }}
                    >
                      {localeNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full text-text-muted hover:text-brand-navy hover:bg-slate-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white animate-fade-in">
          <div className="px-5 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-brand-navy bg-slate-50"
                      : "text-text-muted hover:text-brand-navy hover:bg-slate-50"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
              {!isKo && (
                <a
                  href="https://app.aetherheal.com/sign-in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2.5 text-sm font-medium text-text-muted hover:text-brand-navy rounded-lg transition-colors"
                >
                  {dict.nav.signIn}
                </a>
              )}
              <a
                href={isKo ? `mailto:drjeeju@aetherheal.com?subject=${dict.nav.beginJourney}` : "https://app.aetherheal.com/transition"}
                target={isKo ? undefined : "_blank"}
                rel={isKo ? undefined : "noopener noreferrer"}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-brand-navy rounded-lg transition-colors hover:bg-brand-navy/90"
              >
                {dict.nav.beginJourney}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

```

---

## `src/lib/blog.ts`

```ts
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

```

---

## `src/lib/cors.ts`

```ts
const ALLOWED_ORIGINS = [
  "https://aetherheal.com",
  "https://www.aetherheal.com",
  "https://app.aetherheal.com",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000", "http://localhost:3021"] : []),
]

export function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin") || ""

  if (ALLOWED_ORIGINS.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    }
  }

  return {}
}

export function handleCorsOptions(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request),
  })
}

```

---

## `src/lib/rate-limit.ts`

```ts
const store = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  key: string,
  limit = 10,
  windowMs = 60_000
): boolean {
  const now = Date.now()
  const record = store.get(key)

  if (!record || now > record.resetTime) {
    store.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count < limit) {
    record.count++
    return true
  }

  return false
}

export function getRateLimitKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  )
}

```

---

## `src/lib/sanitize.ts`

```ts
const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g

export function sanitizeMessage(raw: string): string {
  return raw.replace(CONTROL_CHARS, "").trim()
}

export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

```

---

## `src/lib/supabase-admin.ts`

```ts
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

```

---

## `src/lib/supabase.ts`

```ts
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

```

---

## `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

---

## File listing (all source files)

```
src/app/[locale]/aesthetic-clinic-seoul/page.tsx
src/app/[locale]/blog/[slug]/page.tsx
src/app/[locale]/blog/blog-listing-client.tsx
src/app/[locale]/blog/page.tsx
src/app/[locale]/error.tsx
src/app/[locale]/explore/case-carousel.tsx
src/app/[locale]/explore/case-tabs.tsx
src/app/[locale]/explore/flip-cards.tsx
src/app/[locale]/explore/page.tsx
src/app/[locale]/explore/skin-catalog.tsx
src/app/[locale]/for-investors/page.tsx
src/app/[locale]/for-partners/page.tsx
src/app/[locale]/for-team/page.tsx
src/app/[locale]/hair-transplant-korea/page.tsx
src/app/[locale]/how-it-works/page.tsx
src/app/[locale]/how-to-choose-hospital-abroad/page.tsx
src/app/[locale]/intake/page.tsx
src/app/[locale]/journey-assurance/page.tsx
src/app/[locale]/ko-landing.tsx
src/app/[locale]/layout.tsx
src/app/[locale]/loading.tsx
src/app/[locale]/marketing-information/page.tsx
src/app/[locale]/medical-boundary/page.tsx
src/app/[locale]/medical-journey/page.tsx
src/app/[locale]/our-philosophy/page.tsx
src/app/[locale]/page.tsx
src/app/[locale]/payment-refund-policy/page.tsx
src/app/[locale]/plastic-surgery-korea/page.tsx
src/app/[locale]/privacy-policy/page.tsx
src/app/[locale]/terms-of-service/page.tsx
src/app/[locale]/trust-protocol/page.tsx
src/app/api/chat/route.ts
src/app/api/intake/route.ts
src/app/api/waitlist/route.ts
src/app/globals.css
src/app/layout.tsx
src/app/not-found.tsx
src/app/page.tsx
src/app/sitemap.ts
src/components/analytics/google-analytics.tsx
src/components/blog/blog-card.tsx
src/components/blog/blog-post.tsx
src/components/chat/chat-widget.tsx
src/components/landing/architecture-diagram.tsx
src/components/landing/comparison-table.tsx
src/components/landing/cta-section.tsx
src/components/landing/flow-comparison-diagram.tsx
src/components/landing/hero-section.tsx
src/components/landing/icon-card-grid.tsx
src/components/landing/index.ts
src/components/landing/journey-accordion.tsx
src/components/landing/lemon-cycle-diagram.tsx
src/components/landing/mobile-disclosure.tsx
src/components/landing/page-section.tsx
src/components/landing/patient-funnel-diagram.tsx
src/components/landing/revenue-pipeline-diagram.tsx
src/components/landing/scroll-slide-section.tsx
src/components/landing/waitlist-form.tsx
src/components/layout/footer.tsx
src/components/layout/navbar.tsx
src/components/scroll-to-top.tsx
src/components/ui/accordion.tsx
src/components/ui/button.tsx
src/components/ui/card.tsx
src/components/ui/checkbox.tsx
src/components/ui/divider.tsx
src/components/ui/logo.tsx
src/components/ui/section-label.tsx
src/i18n/assert-locale.ts
src/i18n/config.ts
src/i18n/dictionaries/ar.json
src/i18n/dictionaries/de.json
src/i18n/dictionaries/en.json
src/i18n/dictionaries/fr.json
src/i18n/dictionaries/hu.json
src/i18n/dictionaries/ja.json
src/i18n/dictionaries/ko.json
src/i18n/dictionaries/ru.json
src/i18n/dictionaries/th.json
src/i18n/dictionaries/zh.json
src/i18n/get-dictionary.ts
src/i18n/link.tsx
src/lib/blog.ts
src/lib/cors.ts
src/lib/rate-limit.ts
src/lib/sanitize.ts
src/lib/supabase-admin.ts
src/lib/supabase.ts
src/lib/utils.ts
```
