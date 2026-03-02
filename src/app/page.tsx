import Link from "next/link"
import {
  User,
  Stethoscope,
  GitFork,
  Building2,
  Compass,
  Infinity,
  Plane,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"
import { Accordion } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const journeySteps = [
  {
    icon: User,
    label: "Patient Intent",
    badge: null,
    description: "Treatment goals, expectations, and medical concern are shared.",
    details: null,
    side: "right" as const,
  },
  {
    icon: Stethoscope,
    label: "Doctor-Led Structuring",
    badge: "LIVE-CHAT & LIVE-VIDEO",
    description: "Clarifying context through real-time physician interaction.",
    details: "No diagnosis. No treatment.",
    side: "left" as const,
  },
  {
    icon: GitFork,
    label: "Decision Readiness Check",
    badge: null,
    description: "Is this decision clear, aligned, and defensible?",
    details: null,
    side: "center" as const,
  },
  {
    icon: Building2,
    label: "Top-tier Korean Hospital Review",
    badge: "SUBJECT OF JUDGMENT",
    description: "Verified hospitals review the structured decision framework.",
    details: null,
    side: "right" as const,
  },
  {
    icon: Compass,
    label: "Journey Orchestration",
    badge: "ARRIVAL IN KOREA & EXECUTION",
    description: "Arrival logistics and 1:1 concierge support.",
    details: null,
    side: "left" as const,
  },
  {
    icon: Infinity,
    label: "Post-Treatment Continuity",
    badge: "LONG-TERM RESPONSIBILITY",
    description: "No hidden fees. Long-term follow-up ensured.",
    details: null,
    side: "right" as const,
  },
]

const faqItems = [
  {
    id: "1",
    question: "Is this medical consultation or telemedicine?",
    answer:
      "No. AetherHeal is not medical consultation. It is decision preparation. Our physicians help you structure your thinking before you enter a hospital — they do not diagnose or treat. This separation preserves clarity and accountability.",
  },
  {
    id: "2",
    question: "Does AetherHeal recommend hospitals?",
    answer:
      "Yes, but only through pre-vetted top-tier specialists. Hospital matching is based on medical appropriateness for your specific decision — not ranking or price comparison.",
  },
  {
    id: "3",
    question: "How are physicians and hospitals selected?",
    answer:
      "Participation is limited and based on clinical expertise and scope, ethical practice standards, cross-border care experience, and alignment with our decision-first philosophy. Physicians are not performance-ranked.",
  },
  {
    id: "4",
    question: "Who is responsible at each stage of the process?",
    answer:
      "Responsibilities are clearly separated. Physicians support decision clarity. Hospitals deliver medical care. AetherHeal governs the process, coordination, and accountability at every step.",
  },
  {
    id: "5",
    question: "Is AetherHeal a medical tourism agency?",
    answer:
      "No. AetherHeal is a decision infrastructure. Travel logistics are handled only after a structured medical decision has been made — not before.",
  },
  {
    id: "6",
    question: "Can I use AetherHeal if I'm not ready to decide yet?",
    answer:
      "Yes. You can explore the framework without creating an account. Our process respects your pace — there is no pressure to commit.",
  },
  {
    id: "7",
    question: "Is my information safe?",
    answer:
      "Yes. All medical information is encrypted, stored securely, and only shared with your explicit consent. We comply with international data protection standards.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative w-full min-h-[680px] sm:min-h-[760px] md:min-h-[800px] flex flex-col justify-center items-center pt-20 sm:pt-24 pb-10 sm:pb-12 bg-bg-light border-b border-slate-200">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          <div className="inline-block animate-fade-up">
            <span className="py-2 px-4 sm:px-6 border border-brand-navy/20 rounded-full text-[11px] sm:text-sm font-bold uppercase tracking-widest text-brand-navy bg-white shadow-lg whitespace-nowrap">
              The Gateway to South Korea&apos;s Elite Medicine
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.1] text-brand-navy font-medium animate-fade-up [animation-delay:100ms]">
            Where Medical Decisions <br />
            <span className="italic text-brand-gold">Are Made Right</span>
          </h1>

          <p className="font-sans text-text-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
            Medical doctor-led decision support{" "}
            <span className="font-semibold text-brand-navy border-b-2 border-brand-gold/40">
              before
            </span>{" "}
            you access <strong>South Korea&apos;s top-class medical system</strong>.
            <br />
            <span className="text-text-muted text-base mt-2 block font-light">
              No diagnosis. No treatment. Just clarity.
            </span>
          </p>

          <div className="w-full pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:300ms]">
            <Link href="/explore">
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px]">
                I&apos;m just exploring
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Quote */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <div className="w-px h-16 bg-brand-gold mx-auto mb-8" />
          <p className="text-2xl font-serif text-text-body leading-relaxed">
            &ldquo;Most medical tourism platforms ask you to choose a hospital.&rdquo;
          </p>
          <p className="text-2xl font-serif text-text-body leading-relaxed">
            &ldquo;But regret usually comes from choosing without a clear decision.&rdquo;
          </p>
          <div className="pt-8">
            <p className="text-3xl font-serif text-brand-navy font-bold italic">
              &ldquo;AetherHeal exists to close that gap.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Stakes Comparison -- Low vs High */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl text-brand-navy mb-4">
              Not All Decisions Are Equal
            </h2>
            <p className="text-text-body text-lg">
              Some choices are reversible. Others are not.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-stretch">
            {/* Low-Stake */}
            <div className="bg-white rounded-xl border border-slate-200 p-10 md:p-12 shadow-sm space-y-8">
              <SectionLabel color="muted">LOW-STAKE DOMAINS</SectionLabel>
              <ul className="space-y-4">
                {["Music Streaming", "Social Content", "Fashion & Retail"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                    <span className="text-sm text-text-body">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-border-light space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Consequence
                </p>
                <p className="font-serif text-3xl italic text-text-muted">
                  Disappointment
                </p>
                <p className="text-xs text-text-muted">More Choice = More Value</p>
              </div>
            </div>

            {/* High-Stake */}
            <div className="bg-white rounded-xl border-[3px] border-brand-navy p-10 md:p-12 shadow-float md:-translate-y-2 space-y-8">
              <div className="flex items-center justify-between">
                <SectionLabel>HIGH-STAKE DOMAINS</SectionLabel>
                <span className="px-3 py-1 rounded-full border border-danger text-[10px] font-bold uppercase tracking-wider text-danger animate-pulse">
                  Critical
                </span>
              </div>
              <ul className="space-y-4">
                {["Aviation", "Nuclear Energy"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-navy" />
                    <span className="text-sm text-text-body">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-l-4 border-brand-gold pl-6 py-4">
                <p className="font-serif text-4xl sm:text-5xl font-bold text-brand-navy">
                  Medicine
                </p>
              </div>
              <div className="pt-6 border-t border-border-light space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-danger">
                  Consequence
                </p>
                <p className="font-serif text-3xl italic text-danger">
                  Irreversible Harm
                </p>
                <p className="text-xs text-brand-navy font-bold">
                  Unstructured Choice = Risk
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline -- Alternating */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
          <SectionLabel color="gold" className="mb-4 block">
            Responsibility Beyond Decision
          </SectionLabel>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy leading-tight">
            A Medical Journey,{" "}
            <span className="italic text-brand-gold">Structured End to End</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="relative mb-16 text-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-slate-200" />
            </div>
            <span className="relative bg-white px-6 font-serif italic text-xl text-brand-gold">
              This is how responsibility continues after a decision is made.
            </span>
          </div>

          <div className="absolute left-1/2 top-24 bottom-24 w-px bg-brand-gold/50 -translate-x-1/2 z-0 shadow-[0_0_10px_#B49250]" />

          <div className="relative z-10 space-y-12 md:space-y-20">
            {journeySteps.map((step) => {
              const isCenter = step.side === "center"
              const isLeft = step.side === "left"

              return (
                <div key={step.label} className="relative group">
                  <div
                    className={cn(
                      "flex flex-col md:flex-row items-start md:items-center",
                      isCenter ? "md:justify-center" : "md:justify-between"
                    )}
                  >
                    <div className="md:hidden w-full flex justify-center mb-4">
                      <div
                        className={cn(
                          "relative z-20 w-12 h-12 rounded-full flex items-center justify-center border shadow-lg",
                          isCenter
                            ? "bg-brand-navy border-brand-gold text-brand-gold"
                            : "bg-white border-brand-gold text-brand-gold"
                        )}
                      >
                        <step.icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div
                      className={cn(
                        "hidden md:flex absolute -translate-x-1/2 w-12 h-12 rounded-full items-center justify-center z-20",
                        isCenter
                          ? "left-1/2 -top-6 translate-y-0 bg-brand-navy border border-brand-gold text-brand-gold shadow-[0_0_15px_rgba(180,146,80,0.3)]"
                          : "left-1/2 top-0 translate-y-0 bg-white border border-brand-gold text-brand-gold shadow-lg"
                      )}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>

                    {!isCenter && isLeft && (
                      <>
                        <div className="w-full text-center md:w-[45%] md:text-right md:pr-12">
                          {step.badge && (
                            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-2">
                              {step.badge}
                            </span>
                          )}
                          <h3 className="font-serif text-2xl text-brand-navy mb-2">
                            {step.label}
                          </h3>
                          <p className="text-sm text-text-body leading-relaxed">
                            {step.description}
                          </p>
                          {step.details && (
                            <p className="text-xs text-text-muted mt-2 font-medium">
                              {step.details}
                            </p>
                          )}
                        </div>
                        <div className="hidden md:block md:w-[45%]" />
                      </>
                    )}

                    {!isCenter && !isLeft && (
                      <>
                        <div className="hidden md:block md:w-[45%]" />
                        <div className="w-full text-center md:w-[45%] md:text-left md:pl-12">
                          {step.badge && (
                            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-2">
                              {step.badge}
                            </span>
                          )}
                          <h3 className="font-serif text-2xl text-brand-navy mb-2">
                            {step.label}
                          </h3>
                          <p className="text-sm text-text-body leading-relaxed">
                            {step.description}
                          </p>
                          {step.label === "Journey Orchestration" && (
                            <div className="grid gap-2 mt-4">
                              <div className="flex items-center gap-2 text-sm text-text-body">
                                <Plane className="w-4 h-4 text-brand-gold" />
                                Arrival &amp; Logistics
                              </div>
                              <div className="flex items-center gap-2 text-sm text-text-body">
                                <UserCheck className="w-4 h-4 text-brand-gold" />
                                1:1 Concierge
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {isCenter && (
                      <div className="relative z-10 w-full md:w-[600px] bg-white border-2 border-brand-navy p-5 sm:p-8 md:pl-8 rounded-xl text-left md:text-center shadow-float mt-0 md:mt-6">
                        <h3 className="font-serif text-2xl text-brand-navy mt-0 md:mt-4 mb-2">
                          {step.label}
                        </h3>
                        <p className="text-sm text-text-body italic mb-8">
                          &ldquo;{step.description}&rdquo;
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch">
                          <div className="flex-1 border border-slate-200 bg-bg-light p-4 rounded">
                            <div className="flex items-center justify-center gap-2 text-text-muted mb-2">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-xs uppercase tracking-widest font-bold">
                                Not Ready
                              </span>
                            </div>
                            <p className="text-brand-navy font-serif text-lg">
                              Do Not Proceed
                            </p>
                          </div>
                          <div className="flex-1 border border-brand-gold/30 bg-brand-gold/5 p-4 rounded">
                            <div className="flex items-center justify-center gap-2 text-brand-gold mb-2">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="text-xs uppercase tracking-widest font-bold">
                                Ready
                              </span>
                            </div>
                            <p className="text-brand-navy font-serif text-lg">
                              Proceed
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="relative mt-20 text-center z-10">
            <p className="font-serif text-2xl text-brand-gold italic max-w-2xl mx-auto">
              &ldquo;Built for premium cross-border care in Korea. Responsibility
              continues through the entire journey.&rdquo;
            </p>
            <div className="mt-8 flex justify-center opacity-50">
              <div className="w-16 h-px bg-brand-gold" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Partners */}
      <section className="w-full py-12 sm:py-14 lg:py-16 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Seoul&apos;s Top-Tier Medical Institutions
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Partner A", "Partner B", "Partner C", "Partner D"].map((p) => (
              <div
                key={p}
                className="h-20 border border-slate-200 bg-white rounded-lg flex items-center justify-center font-serif font-bold text-sm text-text-muted grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                {p}
              </div>
            ))}
          </div>
          <p className="text-sm text-text-muted italic">
            Access the top 1% of medical institutions in Seoul.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-brand-navy mb-4">
              Common Questions
            </h2>
            <p className="text-text-body">
              Understanding the AetherHeal Infrastructure.
            </p>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* CTA Repeat */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-bg-light">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy">
            Confidence Before Commitment
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/explore">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                I&apos;m just exploring
              </Button>
            </Link>
          </div>
          <p className="text-sm font-serif italic text-text-muted opacity-60">
            Dr. Jee Hoon Ju
          </p>
        </div>
      </section>
    </div>
  )
}
