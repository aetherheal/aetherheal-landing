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
  title: "AetherHeal | Physician-Led Global Medical Journey to Korea",
  description:
    "AetherHeal helps international patients make complex medical decisions with clarity. Physician-led verification, curated hospitals, and a structured journey to Seoul.",
  keywords: [
    "medical tourism Korea",
    "hair transplant Korea",
    "Seoul aesthetic clinic",
    "physician verified clinics",
    "medical travel Korea",
  ],
  authors: [{ name: "AetherHeal" }],
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://aetherheal.com",
  },
  themeColor: "#0F172A",
  openGraph: {
    type: "website",
    title: "AetherHeal | Decide With Clarity Before Choosing a Hospital",
    description:
      "A physician-led platform helping international patients navigate complex medical decisions and travel to Seoul with confidence.",
    url: "https://aetherheal.com",
    siteName: "AetherHeal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AetherHeal — Physician-Led Medical Journey to Korea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AetherHeal | Physician-Led Medical Journey",
    description: "Decide with clarity before choosing a hospital.",
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
              description:
                "A physician-led platform helping international patients access curated hospitals in South Korea.",
              areaServed: "Global",
              medicalSpecialty: [
                "Hair Transplantation",
                "Aesthetic Medicine",
                "Plastic Surgery",
              ],
              availableLanguage: [
                "English",
                "Korean",
                "Chinese",
                "Japanese",
              ],
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
