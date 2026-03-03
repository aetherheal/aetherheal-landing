"use client"

import Link from "next/link"
import {
  Scissors,
  Sparkles,
  PenTool,
  Bot,
  Eye,
  Smile,
  Microscope,
  Activity,
  DollarSign,
  TrendingUp,
  Clock,
  Scale,
  FileSignature,
  Target,
} from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Divider } from "@/components/ui/divider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const concepts = [
  {
    icon: Scale,
    title: "Risk Tolerance",
    front: "You are not just choosing a procedure. You are choosing which risks you are willing to tolerate.",
    back: "Every procedure carries a risk profile. Your Angel physician helps you understand the specific risks for your case and determine which trade-offs are acceptable to you.",
  },
  {
    icon: FileSignature,
    title: "Biological Contract",
    front: "You are entering a contract with your body regarding recovery burden and healing time.",
    back: "Recovery is not optional — it is a biological obligation. Understanding the healing timeline and its demands is essential before any commitment.",
  },
  {
    icon: Target,
    title: "Acceptable Outcome",
    front: "The goal is an outcome that remains acceptable even if it is not structurally perfect.",
    back: "Perfection is not a clinical standard. Your physician helps you define what an acceptable outcome looks like for your anatomy and goals.",
  },
]

const failureReasons = [
  {
    icon: Eye,
    label: "Visual Bias",
    description: 'Deciding based on "best-case" photos alone',
  },
  {
    icon: DollarSign,
    label: "Price Optimization",
    description: "Treating biological changes like commodity purchases",
  },
  {
    icon: TrendingUp,
    label: "Popularity Confusion",
    description: "Assuming trending procedures are appropriate",
  },
  {
    icon: Clock,
    label: "Constraint Denial",
    description: "Failing to define recovery timeline",
  },
]

const caseStudies = [
  {
    id: "HT-8291",
    number: "01",
    title: "Hair Transplant",
    goal: "Restore frontal hairline density",
    constraint: "Limited donor area",
  },
  {
    id: "RH-1044",
    number: "02",
    title: "Rhinoplasty",
    goal: "Remove hump, refine tip",
    constraint: "Thick skin limits tip definition",
  },
  {
    id: "SK-3302",
    number: "03",
    title: "Skin Lifting",
    badge: "NON-SURGICAL",
    goal: "Restore jawline definition",
    constraint: "Non-surgical",
  },
]

const clinicalDisciplines = [
  { icon: Scissors, label: "Hair Transplant" },
  { icon: Sparkles, label: "Skin Aesthetic" },
  { icon: PenTool, label: "Plastic Surgery" },
  { icon: Bot, label: "Robotic Surgery" },
  { icon: Eye, label: "Vision Correction" },
  { icon: Smile, label: "Dental" },
  { icon: Microscope, label: "Stem Cell Therapy" },
  { icon: Activity, label: "Liposuction & Fat Repositioning" },
]

export default function ExplorePage() {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <SectionLabel color="gold" className="block mb-2">
            Exploration Mode
          </SectionLabel>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-navy font-medium">
            Learn the Framework Before You Commit
          </h1>
          <p className="text-text-body text-lg max-w-2xl mx-auto leading-relaxed">
            Review how structured medical decision support works. No account, no pressure,
            and no treatment decisions required yet.
          </p>
          <div className="pt-2">
            <Link href="/how-it-works">
              <Button variant="navy" size="md">
                Continue to how it works
              </Button>
            </Link>
          </div>
          <Divider className="mx-auto" />
        </div>
      </section>

      {/* Concept Cards */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl text-brand-navy mb-4">Core Concepts</h2>
            <p className="text-text-body">Each concept helps prevent avoidable regret.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {concepts.map((c) => (
              <div
                key={c.title}
                className="group relative h-64 [perspective:1000px]"
              >
                {/* Front */}
                <div className="absolute inset-0 bg-white rounded-xl border border-border-light shadow-card p-5 sm:p-8 flex flex-col justify-center backface-hidden transition-transform duration-500 group-hover:[transform:rotateY(180deg)]">
                  <c.icon className="w-8 h-8 text-brand-navy mb-4" />
                  <h3 className="text-lg font-semibold text-text-deep mb-2">{c.title}</h3>
                  <p className="text-sm text-text-body leading-relaxed">{c.front}</p>
                </div>
                {/* Back */}
                <div className="absolute inset-0 bg-brand-navy rounded-xl p-5 sm:p-8 flex flex-col justify-center [transform:rotateY(180deg)] backface-hidden transition-transform duration-500 group-hover:[transform:rotateY(0deg)]">
                  <p className="text-sm text-slate-300 leading-relaxed">{c.back}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Failure Reasons */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel color="muted" className="block mb-2">
              Why Decisions Fail
            </SectionLabel>
            <h2 className="font-serif text-3xl text-brand-navy mb-4">
              Common Regret Patterns
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {failureReasons.map((reason) => (
              <div
                key={reason.label}
                className="flex items-start gap-4 bg-white p-5 rounded-xl border border-border-light"
              >
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <reason.icon className="w-4 h-4 text-danger" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-deep">{reason.label}</p>
                  <p className="text-sm text-text-body leading-relaxed">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel color="gold" className="block mb-2">
              Case Studies
            </SectionLabel>
            <h2 className="font-serif text-3xl text-brand-navy mb-4">
              Structured Decision Examples
            </h2>
            <p className="text-text-body text-sm">
              These examples show how goals and constraints are clarified before hospital selection.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {caseStudies.map((cs) => (
              <Card key={cs.id} className="p-5 sm:p-8 space-y-4" accent="gold">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
                    Case {cs.number}
                  </span>
                  <span className="text-xs font-mono text-text-muted">{cs.id}</span>
                </div>
                <h3 className="text-lg font-semibold text-text-deep">
                  {cs.title}
                  {cs.badge && (
                    <span className="ml-2 inline-block text-[10px] font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full">
                      {cs.badge}
                    </span>
                  )}
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">Goal</p>
                    <p className="text-sm text-text-body">{cs.goal}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">Constraint</p>
                    <p className="text-sm text-text-body">{cs.constraint}</p>
                  </div>
                </div>
                <p className="text-xs text-text-muted italic">
                  Illustrative only. Outcomes vary by individual.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Clinical Disciplines */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-bg-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel color="gold" className="block mb-2">
              Coverage
            </SectionLabel>
            <h2 className="font-serif text-3xl text-brand-navy mb-4">
              Supported Clinical Disciplines
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clinicalDisciplines.map((d) => (
              <Card key={d.label} className="text-center p-6 hover:shadow-float transition-all duration-300">
                <d.icon className="w-8 h-8 text-brand-navy mx-auto mb-3" />
                <p className="text-sm font-semibold text-text-deep">{d.label}</p>
              </Card>
            ))}
          </div>

          <div className="mt-14 text-center bg-white border border-border-light rounded-xl p-6 sm:p-8">
            <p className="text-text-body mb-5">
              Ready to see the full step-by-step process?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/how-it-works">
                <Button variant="navy" size="md" className="min-w-[190px]">
                  How AetherHeal works
                </Button>
              </Link>
              <Link href="/medical-boundary">
                <Button variant="outline" size="md" className="min-w-[190px]">
                  Read medical boundary
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
