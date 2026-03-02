import {
  Scissors,
  Sparkles,
  PenTool,
  Bot,
  Eye,
  Smile,
  Microscope,
  Activity,
  ShieldCheck,
  Stethoscope,
} from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Divider } from "@/components/ui/divider"
import { Card } from "@/components/ui/card"

const domains = [
  { icon: Scissors, label: "Hair Transplant", description: "Follicular restoration & density planning" },
  { icon: Sparkles, label: "Skin Aesthetic", description: "Rejuvenation, resurfacing & correction" },
  { icon: PenTool, label: "Plastic Surgery", description: "Structural refinement & reconstruction" },
  { icon: Bot, label: "Robotic Surgery", description: "Precision-guided minimally invasive procedures" },
  { icon: Eye, label: "Vision Correction", description: "Refractive & corrective eye procedures" },
  { icon: Smile, label: "Dental", description: "Cosmetic & restorative dental work" },
  { icon: Microscope, label: "Stem Cell Therapy", description: "Regenerative & cellular treatments" },
  { icon: Activity, label: "Liposuction & Fat Repositioning", description: "Body contouring & fat transfer" },
]

const systemFlow = [
  {
    step: 1,
    actor: "Patient",
    title: "Intake",
    description: "Goals & concerns",
  },
  {
    step: 2,
    actor: "Angel (MD)",
    title: "Consultation",
    description: "Live-Chat & Video",
  },
  {
    step: 3,
    actor: "Angel (MD)",
    title: "Safety Clearance",
    description: "Risks Assessed",
  },
  {
    step: 4,
    actor: "Hospital",
    title: "Review",
    description: "Feasibility Check",
  },
  {
    step: 5,
    actor: "Platform",
    title: "Confirmation",
    description: "Deposit Trigger",
  },
  {
    step: 6,
    actor: "Journey Team",
    title: "Execution",
    description: "Travel & Surgery",
  },
  {
    step: 7,
    actor: "All Parties",
    title: "Follow-up",
    description: "Complete Recovery",
  },
]

const scopeConstraints = [
  "No Diagnosis",
  "No Treatment",
  "No Emergency Care",
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <SectionLabel color="gold" className="block mb-2">
            System Overview
          </SectionLabel>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-navy font-medium">
            How AetherHeal Works
          </h1>
          <p className="text-text-body text-lg max-w-2xl mx-auto leading-relaxed">
            AetherHeal is a physician-led decision support platform. We exist in the
            space between your medical concern and the hospital door.
          </p>
          <Divider className="mx-auto" />
        </div>
      </section>

      {/* Angel Role */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <SectionLabel color="gold">The Angel Physician</SectionLabel>
              <h2 className="font-serif text-3xl text-brand-navy">
                Your Medical Decision Advisor
              </h2>
              <p className="text-text-body leading-relaxed">
                An Angel is a licensed Korean physician who serves as your dedicated
                decision advisor. They do not treat you — they help you think clearly about
                your medical options.
              </p>
              <ul className="space-y-3">
                {[
                  "Licensed Korean medical professional",
                  "Specialized in your medical domain",
                  "Trained in structured decision methodology",
                  "Bound by AetherHeal's ethical framework",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-text-body">
                    <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-bg-light rounded-2xl p-10 border border-border-light">
              <div className="w-20 h-20 rounded-full bg-brand-navy flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="w-10 h-10 text-brand-gold" />
              </div>
              <p className="text-center text-sm text-text-muted leading-relaxed">
                Your Angel guides you through a structured decision process, ensuring you
                understand your options before choosing a hospital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Domains */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel color="gold" className="block mb-2">
              Coverage
            </SectionLabel>
            <h2 className="font-serif text-3xl text-brand-navy mb-4">
              Supported Clinical Disciplines
            </h2>
            <p className="text-text-body">
              Areas where our Angel physicians provide decision support.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {domains.map((d) => (
              <Card key={d.label} className="text-center p-6 hover:shadow-float transition-all duration-300">
                <d.icon className="w-8 h-8 text-brand-navy mx-auto mb-3" />
                <p className="text-sm font-semibold text-text-deep">{d.label}</p>
                <p className="text-xs text-text-muted mt-1">{d.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7-Step System Flow */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel color="gold" className="block mb-2">
              The System
            </SectionLabel>
            <h2 className="font-serif text-3xl text-brand-navy mb-4">
              7-Step Decision Infrastructure
            </h2>
            <Divider className="mx-auto" />
          </div>

          <div className="space-y-0 max-w-max mx-auto">
            {systemFlow.map((item, i) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-navy text-white flex items-center justify-center shrink-0 text-sm font-bold">
                    {item.step}
                  </div>
                  {i < systemFlow.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border-light min-h-8" />
                  )}
                </div>
                <div className="pb-10">
                  <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                    {item.actor}
                  </p>
                  <h3 className="text-base font-semibold text-text-deep mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-body leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope Constraints */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-bg-light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel color="muted" className="block mb-2">
              Important Boundaries
            </SectionLabel>
            <h2 className="font-serif text-3xl text-brand-navy mb-4">
              What AetherHeal Does Not Do
            </h2>
            <p className="text-text-body">
              Clarity about our scope is part of our commitment to you.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {scopeConstraints.map((c) => (
              <span
                key={c}
                className="px-5 py-2.5 rounded-full border border-border-light bg-white text-sm text-text-body font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
