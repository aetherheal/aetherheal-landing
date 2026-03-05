import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

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

export const metadata: Metadata = {
  metadataBase: new URL("https://aetherheal.com"),
  title: "AetherHeal | Physician-Led Global Medical Journey to Seoul",
  description:
    "AetherHeal helps international patients make complex medical decisions with clarity. Physician-led verification, curated hospitals, and a structured medical journey to Seoul.",
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
    canonical: "https://aetherheal.com",
  },
  themeColor: "#0F172A",
  openGraph: {
    type: "website",
    title: "AetherHeal | Physician-Led Global Medical Journey to Seoul",
    description:
      "AetherHeal helps international patients make complex medical decisions with clarity. Physician-led verification, curated hospitals, and a structured medical journey to Seoul.",
    url: "https://aetherheal.com",
    siteName: "AetherHeal",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AetherHeal — Physician-Led Global Medical Journey to Seoul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AetherHeal | Physician-Led Global Medical Journey to Seoul",
    description:
      "Decide with clarity before choosing a hospital. Physician-led verification, curated hospitals, and a structured medical journey to Seoul.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "AetherHeal",
              url: "https://aetherheal.com",
              logo: "https://aetherheal.com/logo.png",
              image: "https://aetherheal.com/og-image.png",
              description:
                "AetherHeal helps international patients make complex medical decisions with clarity. Physician-led verification, curated hospitals, and a structured medical journey to Seoul.",
              areaServed: {
                "@type": "GeoShape",
                name: "Global",
              },
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
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="h-full font-sans antialiased">
        <div className="flex flex-col min-h-full">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
