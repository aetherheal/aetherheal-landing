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
    <html lang={locale} className={`${playfair.variable} ${inter.variable} ${notoSansKr.variable} ${notoSerifKr.variable} ${gowunBatang.variable} h-full`}>
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
              ],
              inLanguage: locale,
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
