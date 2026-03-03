import Link from "next/link"
import {
  ArrowRightLeft,
  Scissors,
  Sparkles,
  PenTool,
  Bot,
  Eye,
  Smile,
  Microscope,
  Activity,
  Check,
  X,
  Info,
  LayoutGrid,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const domains = [
  { icon: Scissors, label: "Hair Transplant" },
  { icon: Sparkles, label: "Skin Aesthetic" },
  { icon: PenTool, label: "Plastic Surgery" },
  { icon: Bot, label: "Robotic Surgery" },
  { icon: Eye, label: "Vision Correction" },
  { icon: Smile, label: "Dental" },
  { icon: Microscope, label: "Stem Cell Therapy" },
  { icon: Activity, label: "Liposuction & Fat Repositioning" },
]

const systemFlow = [
  { step: 1, actor: "Patient", title: "Minimum Intake", description: "Goals, constraints, timeline" },
  { step: 2, actor: "Angel (MD)", title: "Consultation", description: "Video or working-hours chat" },
  { step: 3, actor: "Angel (MD)", title: "Decision Summary", description: "Context & tradeoffs structured" },
  { step: 4, actor: "Platform", title: "Decision Lock", description: "Scope frozen before execution" },
  { step: 5, actor: "Partner Hospital", title: "Feasibility Review", description: "Accept / decline / clarify" },
  { step: 6, actor: "Platform", title: "Quotation + Deposit", description: "Accountability trigger" },
  { step: 7, actor: "Journey Team", title: "Execution + Follow-up", description: "Travel coordination & continuity" },
]

const angelDoes = [
  {
    icon: Info,
    title: "Clear Information Support",
    description: "Delivers objective medical data while filtering out marketing noise and ambiguity.",
  },
  {
    icon: LayoutGrid,
    title: "Structures Medical Decisions",
    description: "Clarifies risks, constraints, and expectations before any hospital contact.",
  },
  {
    icon: ArrowRightLeft,
    title: "Translates Goals to Inputs",
    description: "Converts patient intent into decision-ready medical parameters.",
  },
]

const angelNot = [
  "Does not diagnose",
  "Does not treat",
  "Does not prescribe",
  "Does not promise outcomes",
  "Does not replace the hospital",
]

const scopeDo = [
  "Decision preparation with medical doctor support",
  "Fit-based hospital matching within our partner network after decision is clarified",
  "Feasibility review coordination with partner hospitals",
  "Journey execution with concierge accountability",
]

const safetyNotes = [
  {
    title: "Safety",
    body: "Not for emergency use. If urgent symptoms occur, seek immediate local care.",
  },
  {
    title: "Medical Boundaries",
    body: "AetherHeal does not provide diagnosis or treatment. All procedures are by licensed hospitals.",
  },
  {
    title: "Data & Privacy",
    body: "Uploads are optional. Access is role-limited. Used only for decision support and coordination.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center pt-20 px-4 sm:px-6 bg-brand-navy overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-brand-gold/60 uppercase mb-8 animate-fade-up">
            System Specification 1.0
          </span>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.05] tracking-tight animate-fade-up [animation-delay:100ms]">
            How AetherHeal{" "}
            <span className="italic text-brand-gold">Works</span>
          </h1>

          <div className="mb-8 animate-fade-up [animation-delay:150ms]">
            <div className="inline-flex items-center justify-center px-6 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <span className="text-xs md:text-sm font-medium text-white/80 tracking-wide">
                Physician-led decision infrastructure for Korea
              </span>
            </div>
          </div>

          <p className="text-lg md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-6 font-light animate-fade-up [animation-delay:200ms]">
            Decision clarity{" "}
            <strong className="text-white font-semibold">before</strong>{" "}
            hospital connection and execution.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[10px] font-medium text-white/30 uppercase tracking-wider mb-12 animate-fade-up [animation-delay:250ms]">
            Decision support only. Not diagnosis, treatment, or emergency care.
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xl mx-auto mb-6 animate-fade-up [animation-delay:300ms]">
            <a href="https://aetherheal.com/transition"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm font-semibold text-brand-navy bg-white rounded-full hover:bg-brand-gold hover:text-white transition-all duration-300 shadow-lg"
            >
              Begin Your Decision Journey
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/explore"
              className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-white/80 border border-white/20 rounded-full hover:bg-white/5 hover:text-white transition-all duration-300"
            >
              Explore Framework
            </Link>
          </div>
        </div>
      </section>

      {/* 01. Angel Role */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">
              01 &mdash; Governance
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-3">The Angel Role</h2>
            <p className="text-text-muted text-lg">Medical Information Support, not Sales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] border border-slate-200">
            <div className="bg-bg-light p-8 md:p-12 lg:p-14 border-b md:border-b-0 md:border-r border-slate-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-2xl bg-brand-navy flex items-center justify-center text-brand-gold shadow-md">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl text-brand-navy font-bold">What the Angel DOES</h3>
              </div>

              <div className="mb-8 p-5 bg-white border-l-4 border-brand-gold rounded-r-xl shadow-sm">
                <span className="text-brand-gold font-bold uppercase text-[10px] block mb-2 tracking-widest">
                  Key Definition
                </span>
                <p className="text-base text-brand-navy font-medium leading-relaxed">
                  Angels are{" "}
                  <strong className="underline decoration-brand-gold/40 underline-offset-4 decoration-2">
                    Licensed Medical Doctors in Korea
                  </strong>{" "}
                  who act as your objective medical advocate.
                </p>
              </div>

              <ul className="space-y-6">
                {angelDoes.map((item) => (
                  <li key={item.title} className="flex gap-4 items-start group">
                    <div className="w-9 h-9 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                      <item.icon className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <strong className="block text-brand-navy text-sm font-bold mb-1">{item.title}</strong>
                      <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 md:p-12 lg:p-14">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-text-muted">
                  <X className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl text-text-muted">What the Angel is NOT</h3>
              </div>
              <ul className="space-y-4">
                {angelNot.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-text-muted text-base font-medium py-2 border-b border-slate-100 last:border-0">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Coverage */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-bg-light border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">
              02 &mdash; Coverage
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-3">High-Stake Domains</h2>
            <p className="text-text-muted text-lg max-w-xl mx-auto">
              We operate only in high-stake, difficult-to-reverse medical domains.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {domains.map((d) => (
              <div
                key={d.label}
                className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-brand-gold/40 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-brand-navy/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
                  <d.icon className="w-5 h-5 text-brand-navy group-hover:text-brand-gold transition-colors" />
                </div>
                <span className="text-brand-navy font-bold text-sm leading-tight block">
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. Scope */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">
              03 &mdash; Scope
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-3">
              What We Do / What We Don&apos;t Do
            </h2>
            <p className="text-text-muted text-lg">Hard boundaries to prevent false expectations.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] border border-slate-200">
            <div className="p-8 md:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-slate-200">
              <h3 className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy uppercase tracking-widest mb-10">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                What We Do
              </h3>
              <ul className="space-y-5">
                {scopeDo.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-text-body items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 md:p-12 lg:p-14 bg-slate-50/50">
              <h3 className="inline-flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-widest mb-10">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                What We Don&apos;t Do
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {["No Diagnosis", "No Treatment", "No AI Decision"].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 bg-white border border-red-200/60 rounded-full text-xs font-bold text-danger"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200">
                <p className="text-sm text-text-muted flex gap-3">
                  <span className="w-1 h-1 bg-text-muted rounded-full mt-2 shrink-0" />
                  <span>
                    <strong>Not for emergencies.</strong> Seek immediate local care if urgent symptoms occur.
                  </span>
                </p>
                <p className="text-sm text-text-muted flex gap-3">
                  <span className="w-1 h-1 bg-text-muted rounded-full mt-2 shrink-0" />
                  <span>
                    <strong>Not a replacement.</strong> We do not replace hospital care.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. System Flow */}
      <section className="py-32 px-4 sm:px-6 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-28 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">
              04 &mdash; System Flow
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-navy mb-4">
              Consultation <span className="text-brand-gold italic">&rarr;</span> Decision <span className="text-brand-gold italic">&rarr;</span> Journey
            </h2>
            <p className="text-text-muted text-lg max-w-xl mx-auto">
              Roles are strictly defined at every step. This is how the AetherHeal infrastructure operates.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* The "Vertebra" Spine Line */}
            <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-px bg-gradient-to-b from-brand-navy/10 via-brand-gold to-brand-gold/10 md:-translate-x-1/2 z-0" />

            <div className="space-y-16 md:space-y-24 relative z-10">
              {systemFlow.map((item, idx) => {
                const isKey = item.step === 3 || item.step === 4 || item.step === 6
                const isFinal = item.step === 7
                const isEven = idx % 2 !== 0

                return (
                  <div key={item.step} className="relative flex flex-col md:flex-row items-start md:items-center group">
                    
                    {/* Node / Number */}
                    <div className={cn(
                      "absolute left-[28px] md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl border-2 shadow-sm flex items-center justify-center font-bold text-lg transition-transform duration-500 group-hover:scale-110 z-20",
                      isFinal ? "bg-brand-gold border-brand-gold text-white" :
                      isKey ? "bg-brand-navy border-brand-navy text-white" :
                      "bg-white border-slate-200 text-text-muted"
                    )}>
                      {item.step}
                    </div>

                    {/* Content Left (visible on desktop for even indices) */}
                    <div className={cn(
                      "hidden md:block w-1/2 pr-16 text-right",
                      !isEven ? "opacity-0 pointer-events-none" : ""
                    )}>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest mb-2 block",
                        isFinal ? "text-brand-gold" : isKey ? "text-brand-navy" : "text-text-muted"
                      )}>
                        {item.actor}
                      </span>
                      <h4 className="font-serif text-2xl text-brand-navy mb-2">{item.title}</h4>
                      <p className="text-sm text-text-muted">{item.description}</p>
                    </div>

                    {/* Content Right (visible on mobile, and desktop for odd indices) */}
                    <div className={cn(
                      "w-full md:w-1/2 pl-24 md:pl-16 text-left",
                      isEven ? "md:hidden" : ""
                    )}>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest mb-2 block",
                        isFinal ? "text-brand-gold" : isKey ? "text-brand-navy" : "text-text-muted"
                      )}>
                        {item.actor}
                      </span>
                      <h4 className="font-serif text-2xl text-brand-navy mb-2">{item.title}</h4>
                      <p className="text-sm text-text-muted">{item.description}</p>
                    </div>

                  </div>
                )
              })}
            </div>

            {/* Glowing end node */}
            <div className="absolute bottom-0 left-[28px] md:left-1/2 w-3 h-3 bg-brand-gold rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_15px_rgba(180,146,80,0.8)] z-20" />
          </div>

          <div className="text-center mt-32 pt-10 border-t border-slate-100">
            <p className="font-serif text-2xl text-brand-navy">
              &quot;Uncertainty becomes clarity. <span className="italic text-brand-gold">Clarity becomes value.</span>&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Safety Notes */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-brand-navy" />
            </div>
            <h3 className="font-serif text-2xl text-brand-navy">Legal & Medical Safety</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {safetyNotes.map((item) => (
              <div key={item.title} className="p-5 bg-bg-light rounded-2xl border border-slate-100">
                <h4 className="font-bold text-brand-navy text-xs uppercase tracking-widest mb-3">{item.title}</h4>
                <p className="text-sm text-text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-bg-light text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl text-brand-navy leading-tight">
            Ready to structure{" "}
            <span className="italic text-brand-gold">your decision?</span>
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xl mx-auto">
            <a href="https://aetherheal.com/transition"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm font-semibold text-white bg-brand-navy rounded-full hover:bg-brand-navy/90 hover:shadow-lg transition-all duration-300"
            >
              Begin Your Decision Journey
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/explore"
              className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-brand-navy border border-brand-navy/20 rounded-full hover:bg-white hover:border-brand-navy/40 transition-all duration-300"
            >
              Explore Framework
            </Link>
          </div>

          <p className="text-[10px] text-text-muted font-medium opacity-60 tracking-wide">
            No diagnosis. No treatment. Decision support only.
          </p>
        </div>
      </section>
    </div>
  )
}
