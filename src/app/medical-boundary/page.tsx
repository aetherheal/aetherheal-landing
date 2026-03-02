import {
  AlertTriangle,
  Phone,
  ShieldAlert,
  Scale,
} from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Divider } from "@/components/ui/divider"
import { Card } from "@/components/ui/card"

const boundaries = [
  {
    title: "Not a Medical Provider",
    description:
      "AetherHeal does not provide medical diagnosis, treatment, or prescriptions. We are a decision support platform — not a hospital, clinic, or telemedicine service.",
  },
  {
    title: "Not a Substitute for Emergency Care",
    description:
      "If you are experiencing a medical emergency, contact your local emergency services immediately. AetherHeal is not equipped to handle urgent or life-threatening situations.",
  },
  {
    title: "Not a Guarantee of Outcomes",
    description:
      "Decision support helps you make informed choices, but it does not guarantee specific medical outcomes. Treatment results depend on many factors beyond the scope of our service.",
  },
  {
    title: "Not a Replacement for Your Doctor",
    description:
      "Our service supplements — not replaces — your relationship with your existing healthcare providers. Always consult your primary physician about your care.",
  },
]

const responsibilities = [
  "Providing accurate and honest information during intake",
  "Consulting your primary physician about any medical concerns",
  "Making your own informed decisions about treatment",
  "Understanding that AetherHeal's role is advisory only",
  "Contacting emergency services for urgent medical needs",
  "Reviewing all documents and decision summaries carefully",
]

export default function MedicalBoundaryPage() {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <SectionLabel color="muted" className="block mb-2">
            Legal & Safety
          </SectionLabel>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-navy font-medium">
            Medical Boundary Notice
          </h1>
          <p className="text-text-body text-lg max-w-2xl mx-auto leading-relaxed">
            Understanding the scope and limitations of AetherHeal&apos;s services is essential
            before using our platform.
          </p>
          <Divider className="mx-auto" />
        </div>
      </section>

      {/* Boundary Boxes */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto space-y-6">
          {boundaries.map((b) => (
            <Card key={b.title} accent="danger" className="p-5 sm:p-8">
              <div className="flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-danger shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold text-text-deep mb-2">{b.title}</h3>
                  <p className="text-sm text-text-body leading-relaxed">{b.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="w-full py-12 sm:py-14 lg:py-16 px-4 sm:px-6 bg-red-50 border-y border-red-200">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4 p-5 sm:p-8 bg-white rounded-xl border-2 border-danger">
            <AlertTriangle className="w-8 h-8 text-danger shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-danger mb-2">
                Emergency Notice
              </h3>
              <p className="text-sm text-text-body leading-relaxed mb-4">
                If you are experiencing a medical emergency, do not use this platform.
                Contact your local emergency services immediately.
              </p>
              <div className="flex items-center gap-3 text-sm font-semibold text-danger">
                <Phone className="w-4 h-4" />
                <span>Emergency: Call your local emergency number (911, 112, 119)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Responsibilities */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <SectionLabel color="gold" className="block mb-2">
              Your Responsibilities
            </SectionLabel>
            <h2 className="font-serif text-3xl text-brand-navy">
              As a Platform User
            </h2>
          </div>

          <Card className="p-5 sm:p-8">
            <ul className="space-y-4">
              {responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <Scale className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                  <span className="text-sm text-text-body leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </div>
  )
}
