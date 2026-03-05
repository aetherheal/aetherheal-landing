import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { defaultLocale } from "@/i18n/config"

export const metadata: Metadata = {
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
    languages: {
      en: "https://aetherheal.com/en",
      zh: "https://aetherheal.com/zh",
      ja: "https://aetherheal.com/ja",
      th: "https://aetherheal.com/th",
      ru: "https://aetherheal.com/ru",
    },
  },
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
        url: "/og-image.jpg",
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
      "AetherHeal helps international patients make complex medical decisions with clarity. Physician-led verification, curated hospitals, and a structured medical journey to Seoul.",
    images: ["/og-image.jpg"],
  },
}

export default function RootPage() {
  redirect(`/${defaultLocale}`)
}
