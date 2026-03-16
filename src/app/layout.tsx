import type { Metadata } from "next"
import { Playfair_Display, Inter, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"
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

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

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
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${notoSansKr.variable} ${notoSerifKr.variable} h-full`}>
      <body className="h-full font-sans antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
