import {
  Shield,
  Eye,
  FileCheck,
  CheckCircle,
  XCircle,
  Lock,
  Scale,
} from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Divider } from "@/components/ui/divider"
import { Card } from "@/components/ui/card"

const inspectorRoles = [
  {
    icon: Eye,
    title: "Medical Quality Auditor",
    description: "Reviews the clinical accuracy and completeness of every decision summary.",
  },
  {
    icon: Scale,
    title: "Ethical Compliance Officer",
    description: "Ensures all interactions stay within AetherHeal's ethical boundaries.",
  },
  {
    icon: FileCheck,
    title: "Process Integrity Checker",
    description: "Validates that the 7-step system was followed correctly for each case.",
  },
  {
    icon: Lock,
    title: "Patient Safety Guardian",
    description: "Monitors for any scope violations or inappropriate medical claims.",
  },
]

const doItems = [
  "Review decision summary quality",
  "Verify scope compliance",
  "Audit physician methodology",
  "Ensure patient consent integrity",
  "Monitor system-wide patterns",
  "Flag potential safety concerns",
]

const dontItems = [
  "Override physician decisions",
  "Contact patients directly",
  "Modify decision summaries",
  "Provide medical advice",
  "Share patient data externally",
  "Interfere with active consultations",
]

export default function InspectorPage() {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <SectionLabel color="gold" className="block mb-2">
            Governance
          </SectionLabel>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-navy font-medium">
            The AetherHeal Inspector System
          </h1>
          <p className="text-text-body text-lg max-w-2xl mx-auto leading-relaxed">
            An independent oversight layer that ensures every decision meets our standards
            for quality, ethics, and patient safety.
          </p>
          <Divider className="mx-auto" />
        </div>
      </section>

      {/* Document-Style Intro */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto prose-like space-y-8">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-6 h-6 text-brand-gold" />
            <SectionLabel color="gold">System Document</SectionLabel>
          </div>

          <Card accent="gold" className="p-5 sm:p-8 space-y-4">
            <h3 className="font-serif text-xl text-text-deep">Purpose</h3>
            <p className="text-sm text-text-body leading-relaxed">
              The Inspector System exists to maintain the integrity of AetherHeal&apos;s
              decision support process. It operates independently from the clinical team
              and reports directly to platform governance.
            </p>
          </Card>

          <Card accent="navy" className="p-5 sm:p-8 space-y-4">
            <h3 className="font-serif text-xl text-text-deep">Authority</h3>
            <p className="text-sm text-text-body leading-relaxed">
              Inspectors have read-only access to completed decision summaries and process
              logs. They can flag concerns, request reviews, and escalate issues — but cannot
              modify any patient-facing documents.
            </p>
          </Card>

          <Card accent="muted" className="p-5 sm:p-8 space-y-4">
            <h3 className="font-serif text-xl text-text-deep">Independence</h3>
            <p className="text-sm text-text-body leading-relaxed">
              The Inspector team operates on a separate reporting line from clinical
              operations. This structural independence ensures that quality oversight is
              never compromised by operational pressures.
            </p>
          </Card>
        </div>
      </section>

      {/* Do / Don't Grid */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl text-brand-navy mb-4">
              Inspector Scope
            </h2>
            <p className="text-text-body">Clear boundaries for what inspectors do and don&apos;t do.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Do */}
            <div className="bg-white rounded-xl border border-border-light p-5 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                  Inspectors Do
                </h3>
              </div>
              <ul className="space-y-4">
                {doItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don't */}
            <div className="bg-white rounded-xl border border-border-light p-5 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-5 h-5 text-danger" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-danger">
                  Inspectors Don&apos;t
                </h3>
              </div>
              <ul className="space-y-4">
                {dontItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-danger mt-0.5 shrink-0" />
                    <span className="text-sm text-text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Inspector Composition */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel color="gold" className="block mb-2">
              Team Composition
            </SectionLabel>
            <h2 className="font-serif text-3xl text-brand-navy mb-4">
              Who Are the Inspectors?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {inspectorRoles.map((role) => (
              <Card key={role.title} className="text-center p-6 hover:shadow-float transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <role.icon className="w-7 h-7 text-brand-navy" />
                </div>
                <h3 className="text-sm font-semibold text-text-deep mb-2">{role.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{role.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
