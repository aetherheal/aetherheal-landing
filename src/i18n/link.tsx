"use client"

import NextLink from "next/link"
import { useParams } from "next/navigation"
import type { ComponentProps } from "react"
import type { Locale } from "./config"

type LocaleLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string
}

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const params = useParams()
  const locale = (params?.locale as Locale) ?? "en"

  const isExternal = href.startsWith("http") || href.startsWith("mailto:")
  const resolvedHref = isExternal ? href : `/${locale}${href}`

  return <NextLink href={resolvedHref} {...props} />
}

export function useLocalePath() {
  const params = useParams()
  const locale = (params?.locale as Locale) ?? "en"
  return (path: string) => `/${locale}${path}`
}
