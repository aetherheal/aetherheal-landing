import { notFound } from "next/navigation"
import { patientLocales } from "./config"

export function assertPatientLocale(locale: string) {
  if (!(patientLocales as readonly string[]).includes(locale)) {
    notFound()
  }
}
