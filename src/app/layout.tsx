import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
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

export const metadata: Metadata = {
  metadataBase: new URL("https://aetherheal.com"),
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="h-full font-sans antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
