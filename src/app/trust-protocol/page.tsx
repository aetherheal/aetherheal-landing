import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Shield,
  Eye,
  FileCheck,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Lock,
  Scale,
  Split,
} from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "The AetherHeal Trust Protocol | AetherHeal",
  description:
    "How AetherHeal ensures quality, ethics, and patient safety through physician-led evaluation of partner hospitals and independent trust review of every decision process.",
  alternates: { canonical: "https://aetherheal.com/trust-protocol" },
  openGraph: {
    title: "The AetherHeal Trust Protocol | AetherHeal",
    description:
      "Physician-led evaluation, independent oversight, and ongoing accountability for partner hospitals and patient decisions.",
    url: "https://aetherheal.com/trust-protocol",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The AetherHeal Trust Protocol | AetherHeal",
    description:
      "How AetherHeal ensures quality, ethics, and patient safety.",
  },
}

const tocItems = [
  { id: "purpose", label: "Purpose, Authority & Independence" },
  { id: "incentive-separation", label: "Incentive Separation" },
  { id: "partner-criteria", label: "Partner Hospital Criteria" },
  { id: "what-this-means", label: "What This Means for Patients" },
  { id: "trust-scope", label: "Trust Protocol Scope" },
  { id: "team", label: "Who Runs the Trust Protocol" },
  { id: "ongoing", label: "Ongoing Accountability" },
]

const trustRoles = [
  {
    icon: Eye,
    title: "Medical Quality Reviewer",
    description: "Reviews the clinical accuracy and completeness of every decision summary.",
  },
  {
    icon: Scale,
    title: "Ethical Compliance Reviewer",
    description: "Ensures all interactions stay within AetherHeal\u2019s ethical boundaries.",
  },
  {
    icon: FileCheck,
    title: "Process Integrity Reviewer",
    description: "Validates that the 7-step system was followed correctly for each case.",
  },
  {
    icon: Lock,
    title: "Patient Safety Reviewer",
    description: "Monitors for scope violations or inappropriate medical claims.",
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

export default function TrustProtocolPage() {
  return (
    <div className="min-h-full bg-white">
      {/* Editorial Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-brand-navy/[0.02] to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-sm">
              Governance
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-navy mb-10 leading-[1.1] tracking-tight">
            The AetherHeal <br className="hidden sm:block" />
            <span className="italic text-brand-gold">Trust Protocol</span>
          </h1>

          <div className="max-w-3xl space-y-6 text-lg sm:text-xl text-slate-600 font-light leading-[1.8]">
            <p className="text-xl sm:text-2xl font-serif text-brand-navy leading-relaxed">
              Independent trust review ensures each decision process meets
              standards for quality, ethics, and patient safety.
            </p>
            <p>
              Trust reviewers are read-only reviewers. They do not diagnose,
              treat, or alter patient decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Article Layout */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-12 xl:gap-20">

          {/* Desktop Sidebar (TOC) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 p-6 bg-slate-50/80 border border-slate-100 rounded-2xl">
              <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">
                Contents
              </h2>
              <nav>
                <ol className="space-y-4">
                  {tocItems.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="flex items-start gap-3 text-sm text-slate-600 font-medium hover:text-brand-gold transition-colors leading-snug"
                      >
                        <span className="text-brand-gold/60 font-bold shrink-0 w-4 text-right">
                          {i + 1}.
                        </span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          {/* Article Body */}
          <div className="flex-1 min-w-0 max-w-3xl">

            {/* Mobile TOC */}
            <div className="block lg:hidden mb-16 p-6 sm:p-8 bg-slate-50 border border-slate-100 rounded-2xl">
              <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">
                Table of Contents
              </h2>
              <ol className="space-y-4">
                {tocItems.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-start gap-3 text-sm text-slate-600 font-medium hover:text-brand-gold transition-colors leading-snug"
                    >
                      <span className="text-brand-gold/60 font-bold shrink-0 w-4 text-right">
                        {i + 1}.
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-24">

              {/* Section 1: Protocol Document */}
              <div id="purpose" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  Purpose, Authority & Independence
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-brand-gold" />
                    <SectionLabel color="gold">Protocol Document</SectionLabel>
                  </div>

                  <Card accent="gold" className="p-5 sm:p-8 space-y-4">
                    <h3 className="font-serif text-xl text-text-deep">Purpose</h3>
                    <p className="text-sm text-text-body leading-relaxed">
                      The Trust Protocol exists to maintain the integrity of
                      AetherHeal&apos;s decision support process. It is independent
                      from the clinical team and reports directly to platform
                      governance.
                    </p>
                  </Card>

                  <Card accent="navy" className="p-5 sm:p-8 space-y-4">
                    <h3 className="font-serif text-xl text-text-deep">Authority</h3>
                    <p className="text-sm text-text-body leading-relaxed">
                      Trust reviewers have read-only access to completed decision
                      summaries and process logs. They can flag concerns, request
                      reviews, and escalate issues, but cannot modify patient-facing
                      documents.
                    </p>
                  </Card>

                  <Card accent="muted" className="p-5 sm:p-8 space-y-4">
                    <h3 className="font-serif text-xl text-text-deep">Independence</h3>
                    <p className="text-sm text-text-body leading-relaxed">
                      The Trust Protocol team operates on a separate reporting line
                      from clinical operations. This separation protects oversight
                      quality from operational pressure.
                    </p>
                  </Card>
                </div>
              </div>

              {/* Section 2: Incentive Separation */}
              <div id="incentive-separation" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  Decision Integrity Through Incentive Separation
                </h2>
                <div className="space-y-8 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>
                    In most medical travel platforms, the same entity that recommends
                    a hospital also profits from the referral. This creates an inherent
                    conflict of interest: the decision process is shaped by revenue,
                    not by clinical merit.
                  </p>
                  <p>
                    AetherHeal is architecturally different. We separate the platform
                    into two independent layers — each with its own incentive structure,
                    reporting line, and accountability mechanism.
                  </p>

                  <div className="flex items-center justify-center py-4">
                    <Split className="w-6 h-6 text-brand-gold" />
                  </div>

                  {/* Two-Layer Diagram */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    {/* Angel Layer */}
                    <div className="p-6 sm:p-10 bg-brand-navy text-white">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <Eye className="w-6 h-6 text-brand-gold" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-1">
                            Layer 1
                          </p>
                          <h3 className="font-serif text-2xl text-white">Angel Layer</h3>
                        </div>
                      </div>
                      <p className="text-base text-white/80 leading-relaxed mb-8">
                        Physician advisors who guide the patient&apos;s decision process.
                        Their role ends at the decision summary — they do not perform
                        treatments.
                      </p>
                      <div className="space-y-4 pt-6 border-t border-white/10">
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold/80 mb-2">
                          Incentive Tied To
                        </p>
                        {[
                          "Quality and completeness of decision support",
                          "Patient understanding and informed consent",
                          "Process adherence and ethical compliance",
                        ].map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                            <span className="text-sm text-white/90 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Medical Service Provider Layer */}
                    <div className="p-6 sm:p-10 bg-white">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                          <Shield className="w-6 h-6 text-brand-navy" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                            Layer 2
                          </p>
                          <h3 className="font-serif text-2xl text-brand-navy">
                            Medical Provider
                          </h3>
                        </div>
                      </div>
                      <p className="text-base text-slate-500 leading-relaxed mb-8">
                        Partner hospitals and clinics that deliver clinical care.
                        They receive patients through AetherHeal&apos;s structured
                        matching process.
                      </p>
                      <div className="space-y-4 pt-6 border-t border-slate-100">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                          Incentive Tied To
                        </p>
                        {[
                          "Clinical outcomes and treatment delivery",
                          "Patient satisfaction and recovery quality",
                          "Adherence to AetherHeal care protocols",
                        ].map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Key Principle */}
                  <div className="p-6 sm:p-8 bg-brand-navy/[0.02] border-l-2 border-brand-gold rounded-r-2xl">
                    <p className="text-base text-brand-navy font-serif font-medium leading-relaxed mb-3">
                      The structural principle is simple:
                    </p>
                    <p className="text-base text-slate-700 leading-relaxed italic m-0">
                      The Angel Layer does not receive financial incentives from the
                      Medical Service Provider Layer. The people who help you decide
                      are never the same people who profit from your treatment.
                      This separation is what makes decision integrity possible.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Partner Hospital Criteria */}
              <div id="partner-criteria" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  Partner Hospital Criteria
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>
                    Not every hospital in Seoul meets our standards. AetherHeal
                    operates a selective partner network where each institution is
                    assessed across multiple dimensions before joining:
                  </p>

                  <div className="grid grid-cols-1 gap-4 pt-4">
                    {[
                      "Clinical expertise and surgeon specialization depth",
                      "Facility standards and equipment certification",
                      "Ethical practice history and patient complaint records",
                      "Cross-border patient experience and language support",
                      "Alignment with AetherHeal\u2019s decision-first philosophy",
                      "Post-treatment follow-up and continuity protocols",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                        <span className="text-brand-navy font-medium text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: What This Means for Patients */}
              <div id="what-this-means" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  What This Means for Patients
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>
                    When AetherHeal matches you with a partner hospital, that match
                    is based on your specific clinical profile and decision summary —
                    not on commission structures or marketing partnerships.
                  </p>
                  <p>
                    Hospitals in our network have agreed to operate within our
                    structured process: receiving the decision summary before
                    consultation, conducting a feasibility review, and coordinating
                    through AetherHeal for scheduling and follow-up.
                  </p>
                </div>
              </div>

              {/* Section 4: Trust Protocol Scope */}
              <div id="trust-scope" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  Trust Protocol Scope
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>
                    Clear boundaries define what trust reviewers do and do not do.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                        Trust Reviewers Do
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

                  <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <XCircle className="w-5 h-5 text-danger" />
                      <h3 className="text-sm font-bold uppercase tracking-widest text-danger">
                        Trust Reviewers Don&apos;t
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

              {/* Section 5: Who Runs the Trust Protocol */}
              <div id="team" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  Who Runs the Trust Protocol?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trustRoles.map((role) => (
                    <Card key={role.title} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                          <role.icon className="w-6 h-6 text-brand-navy" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-text-deep mb-1.5">
                            {role.title}
                          </h3>
                          <p className="text-xs text-text-muted leading-relaxed">
                            {role.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Section 6: Ongoing Accountability */}
              <div id="ongoing" className="scroll-mt-32">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-8 pb-4 border-b border-slate-100 leading-tight">
                  Ongoing Accountability
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-light leading-[1.8]">
                  <p>
                    Verification is not a one-time event. AetherHeal maintains
                    ongoing review of partner institutions through patient feedback,
                    clinical outcome monitoring, and periodic re-evaluation.
                  </p>
                  <div className="p-6 sm:p-8 bg-brand-navy text-white rounded-2xl shadow-lg">
                    <p className="text-xl font-serif text-brand-gold mb-2">
                      Standards are non-negotiable
                    </p>
                    <p className="text-white/90">
                      Partners that do not maintain our clinical or ethical standards
                      are removed from the network to ensure patient safety and
                      decision clarity.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif text-3xl text-brand-navy mb-10 text-center">
            Continue Reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                href: "/how-to-choose-hospital-abroad",
                label: "How to Choose a Hospital Abroad",
                desc: "A framework for safer decisions",
              },
              {
                href: "/medical-journey",
                label: "Your Medical Journey",
                desc: "End-to-end coordination from decision to recovery",
              },
              {
                href: "/how-it-works",
                label: "How AetherHeal Works",
                desc: "The system behind physician-led decision support",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group block p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-gold/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                    {link.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-brand-gold shrink-0" />
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
