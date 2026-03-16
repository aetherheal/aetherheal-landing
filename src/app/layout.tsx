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
