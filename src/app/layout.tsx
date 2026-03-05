import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="h-full font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
