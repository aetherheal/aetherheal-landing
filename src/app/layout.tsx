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
  title: "AetherHeal — Where Medical Decisions Are Made Right",
  description:
    "Physician-led decision support for international patients considering medical care in South Korea.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="h-full font-sans antialiased">
        <div className="flex flex-col min-h-full">
          <Navbar />
          <main className="flex-1 pt-16 sm:pt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
