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
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"
import { Accordion } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const skinBrands = [
  { name: "Rejuran", tag: "Skin Healing" },
  { name: "Juvelook", tag: "Skin Booster" },
  { name: "Juvederm", tag: "Dermal Filler" },
  { name: "Restylane", tag: "Dermal Filler" },
  { name: "Belotero", tag: "Dermal Filler" },
  { name: "Radiesse", tag: "Bio-Stimulator" },
  { name: "Sculptra", tag: "Collagen Stimulator" },
  { name: "Merz Aesthetics", tag: "Aesthetics Platform" },
  { name: "Ulthera", tag: "Lifting HIFU" },
  { name: "Thermage", tag: "Skin Tightening RF" },
]

const trendingRow1 = [
  { emoji: "👃", name: "Rhinoplasty", tag: "Nose reshaping & revision" },
  { emoji: "👁️", name: "Blepharoplasty", tag: "Double eyelid & ptosis correction" },
  { emoji: "💉", name: "Facial Contouring", tag: "V-line jaw & cheekbone" },
  { emoji: "🦷", name: "Dental Implants", tag: "Full-arch & single tooth" },
  { emoji: "🧬", name: "Stem Cell Therapy", tag: "Regenerative medicine" },
  { emoji: "💇", name: "Hair Transplant", tag: "FUE & advanced grafting" },
  { emoji: "✨", name: "Skin Aesthetics", tag: "Premium dermatology & anti-aging" },
]

const trendingRow2 = [
  { emoji: "👁️‍🗨️", name: "LASIK / LASEK", tag: "Vision correction surgery" },
  { emoji: "🩺", name: "Health Screening", tag: "Premium full-body checkup" },
  { emoji: "🏥", name: "Liposuction", tag: "Body contouring & fat repositioning" },
  { emoji: "🩻", name: "Full Body MRI", tag: "Comprehensive imaging screening" },
  { emoji: "👙", name: "Breast Augmentation", tag: "Implant & fat transfer" },
  { emoji: "🤰", name: "Women's Health", tag: "Gynecological & fertility care" },
  { emoji: "😁", name: "Orthodontics", tag: "Adult & pediatric correction" },
  { emoji: "🧵", name: "Thread Lifting", tag: "Non-surgical face & body lift" },
]

const partnerHospitals = [
  { name: "Morgan Dermatology", location: "Gangnam, Seoul", specialties: "Hair Transplant, Hair Loss, Scalp Micropigmentation" },
  { name: "Woori Plastic Surgery", location: "Gangnam, Seoul", specialties: "Full-spectrum Plastic & Cosmetic Surgery" },
  { name: "B&VIIT Eye Center", location: "Gangnam, Seoul", specialties: "SMILE Pro, LASIK, PRK, PIOL, Cataracts, Customizing Options" },
  { name: "Hosan Women's Hospital", location: "Gangnam, Seoul", specialties: "Women's Cosmetic Surgery & Gynecological Care" },
  { name: "Apgujeong Min Dental", location: "Gangnam, Seoul", specialties: "Pediatric Orthodontics, Frankel Appliance Therapy" },
  { name: "The Well Dental Clinic", location: "Near Incheon Airport", specialties: "Adult Orthodontics, Prosthodontics & General Dentistry" },
  { name: "Apgujeong Tune Clinic", location: "Gangnam, Seoul", specialties: "Stem Cell Therapy, Premium Skin Aesthetics, Body Filler, Lifting" },
  { name: "Bancel Clinic", location: "Gangnam, Seoul", specialties: "Stem Cell Therapy, Premium Skin Aesthetics, Body Filler, Thread Lifting" },
]

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
    label: "Partner Hospital Feasibility Review",
    badge: "SUBJECT OF JUDGMENT",
    description: "Partner hospitals review feasibility based on the locked decision scope.",
    details: null,
    side: "right" as const,
  },
  {
    icon: CreditCard,
    label: "Decision Commitment Deposit",
    badge: "ACCOUNTABILITY TRIGGER",
    description: "Confirms intent / activates coordination / scheduling alignment.",
    details: null,
    side: "left" as const,
  },
  {
    icon: Compass,
    label: "Journey Orchestration",
    badge: "ARRIVAL IN KOREA & EXECUTION",
    description: "Arrival logistics and 1:1 concierge support.",
    details: null,
    side: "right" as const,
  },
  {
    icon: Infinity,
    label: "Post-Treatment Continuity",
    badge: "LONG-TERM RESPONSIBILITY",
    description: "No hidden fees. Long-term follow-up ensured.",
    details: null,
    side: "left" as const,
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
      "We collect only what is necessary for decision support and coordination. Uploads are optional. Access is restricted by role (physician, operator) and used only for your case. We do not sell personal medical information.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative w-full flex flex-col justify-center items-center pt-24 sm:pt-32 pb-16 sm:pb-20 md:min-h-[800px] md:pt-24 md:pb-12 px-4 bg-bg-light border-b border-slate-200">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 text-center px-2 sm:px-6 max-w-4xl mx-auto space-y-5 sm:space-y-10">
          <div className="inline-block animate-fade-up">
            <span className="py-2 px-4 sm:px-6 border border-brand-navy/20 rounded-full text-[9px] sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest text-brand-navy bg-white shadow-lg">
              Physician-led decision support for premium care in Korea
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.1] text-brand-navy font-medium animate-fade-up [animation-delay:100ms]">
            Decide With Clarity <br />
            <span className="italic text-brand-gold">Before You Choose a Hospital</span>
          </h1>

          <p className="font-sans text-text-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
            Physician-led decision support{" "}
            <span className="font-semibold text-brand-navy border-b-2 border-brand-gold/40">
              before
            </span>{" "}
            hospital connection and execution in Korea.
            <br />
            <span className="text-text-muted text-base mt-2 block font-light">
              No diagnosis. No treatment. Decision support only.
            </span>
          </p>

          <div className="w-full pt-2 sm:pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-up [animation-delay:300ms]">
            <Link href="/how-it-works">
              <Button variant="navy" size="lg" className="w-full sm:w-auto min-w-[200px]">
                See how it works
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px]">
                Start exploring
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
            &ldquo;Most platforms ask you to pick a hospital first.&rdquo;
          </p>
          <p className="text-2xl font-serif text-text-body leading-relaxed">
            &ldquo;Regret usually starts with unclear decisions, not unclear pricing.&rdquo;
          </p>
          <div className="pt-8">
            <p className="text-3xl font-serif text-brand-navy font-bold italic">
              &ldquo;AetherHeal closes that decision gap.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Now Trending Procedures */}
      <section className="w-full py-16 sm:py-20 bg-bg-light border-b border-slate-200 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-navy/5 border border-brand-navy/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-navy">
              Supported
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy">
              High-Stake Domains We Handle
            </h2>
          </div>
        </div>

        {/* Row 0 — Skin / Aesthetic Brands ticker */}
        <div className="relative mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-light to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-light to-transparent z-10 pointer-events-none" />
          <div className="flex animate-scroll-left w-max">
            {[...skinBrands, ...skinBrands].map((brand, i) => (
              <div
                key={`sb-${i}`}
                className="flex-shrink-0 mx-3 inline-flex items-center gap-3 px-6 py-3 bg-white border border-brand-gold/15 rounded-full hover:border-brand-gold/50 hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <span className="font-serif text-lg font-bold text-brand-navy tracking-tight group-hover:text-brand-gold transition-colors">
                  {brand.name}
                </span>
                <span className="w-1 h-1 rounded-full bg-brand-gold/40" />
                <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
                  {brand.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="relative mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-light to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-light to-transparent z-10 pointer-events-none" />
          <div className="flex animate-scroll-left w-max">
            {[...trendingRow1, ...trendingRow1].map((item, i) => (
              <div
                key={`r1-${i}`}
                className="flex-shrink-0 w-56 mx-2 bg-white border border-slate-200 rounded-2xl p-5 hover:border-brand-gold/40 hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <span className="text-2xl mb-3 block">{item.emoji}</span>
                <p className="font-serif text-base text-brand-navy font-semibold mb-1 group-hover:text-brand-gold transition-colors">
                  {item.name}
                </p>
                <p className="text-xs text-text-muted leading-relaxed">{item.tag}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-light to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-light to-transparent z-10 pointer-events-none" />
          <div className="flex animate-scroll-right w-max">
            {[...trendingRow2, ...trendingRow2].map((item, i) => (
              <div
                key={`r2-${i}`}
                className="flex-shrink-0 w-56 mx-2 bg-white border border-slate-200 rounded-2xl p-5 hover:border-brand-gold/40 hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <span className="text-2xl mb-3 block">{item.emoji}</span>
                <p className="font-serif text-base text-brand-navy font-semibold mb-1 group-hover:text-brand-gold transition-colors">
                  {item.name}
                </p>
                <p className="text-xs text-text-muted leading-relaxed">{item.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakes Comparison -- Unified Contrast Card */}
      <section className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-4">
              Not Every Choice Carries the Same Risk
            </h2>
            <p className="text-text-body text-lg max-w-2xl mx-auto leading-relaxed">
              In medicine, poor decisions can be hard to reverse. The framework for choosing must reflect the gravity of the outcome.
            </p>
          </div>

          <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15)] border border-slate-200">
            {/* Low-Stake */}
            <div className="flex-1 bg-slate-50 p-10 md:p-14 lg:p-16 flex flex-col justify-between">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-slate-200/70 text-text-muted text-[10px] font-bold uppercase tracking-widest mb-10">
                  Low-Stake Domains
                </span>
                <ul className="space-y-6 mb-12">
                  {["Music Streaming", "Social Content", "Fashion & Retail"].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-text-body font-medium text-lg">
                      <div className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8 border-t border-slate-200">
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">
                  Consequence of Failure
                </p>
                <p className="font-serif text-3xl sm:text-4xl italic text-slate-400 mb-5">
                  Disappointment
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-text-muted font-bold tracking-wide">
                  More Choice = More Value
                </div>
              </div>
            </div>

            {/* High-Stake */}
            <div className="flex-1 bg-brand-navy p-10 md:p-14 lg:p-16 flex flex-col justify-between relative">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase tracking-widest border border-brand-gold/20">
                    High-Stake Domains
                  </span>
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-400 animate-pulse bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    Critical
                  </span>
                </div>

                <ul className="space-y-6 mb-8">
                  {["Aviation", "Nuclear Energy"].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-slate-300 font-medium text-lg opacity-60">
                      <div className="w-2 h-2 rounded-full bg-slate-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="relative mb-12 group">
                  <div className="absolute inset-0 bg-brand-gold/20 blur-xl rounded-2xl group-hover:bg-brand-gold/30 transition-all duration-500" />
                  <div className="relative bg-white/5 border border-brand-gold/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                    <p className="font-serif text-5xl sm:text-6xl font-bold text-white tracking-tight">
                      Medicine
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-3">
                  Consequence of Failure
                </p>
                <p className="font-serif text-3xl sm:text-4xl italic text-white mb-5">
                  Irreversible Harm
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-300 font-bold tracking-widest">
                  Unstructured Decision = Risk
                </div>
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
            From Decision to Recovery,{" "}
            <span className="italic text-brand-gold">Responsibility Stays Visible</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="relative mb-16 text-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-slate-200" />
            </div>
            <span className="relative bg-white px-6 font-serif italic text-xl text-brand-gold">
              This is how accountability continues after a decision is made.
            </span>
          </div>

          <div className="absolute left-6 md:left-1/2 top-24 bottom-24 w-px bg-brand-gold/50 md:-translate-x-1/2 z-0 shadow-[0_0_10px_#B49250]" />

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
                    <div className="md:hidden absolute left-0 top-0 w-12 flex justify-center z-20">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center border shadow-lg",
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
                        <div className="w-full pl-16 text-left md:pl-0 md:w-[45%] md:text-right md:pr-12">
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
                        <div className="w-full pl-16 text-left md:pl-12 md:w-[45%]">
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
                      <div className="relative z-10 w-[calc(100%-4rem)] ml-16 md:ml-0 md:w-[600px] bg-white border-2 border-brand-navy p-5 sm:p-8 md:pl-8 rounded-xl text-left md:text-center shadow-float mt-0 md:mt-6">
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
                              Pause / Reframe
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
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">
              Standards-based Partner Institutions in Seoul
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy">
              AetherHeal Trusted Pioneers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partnerHospitals.map((h) => (
              <div
                key={h.name}
                className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-brand-gold/40 hover:shadow-md transition-all duration-300"
              >
                <p className="font-serif text-base font-bold text-brand-navy mb-1 group-hover:text-brand-gold transition-colors leading-snug">
                  {h.name}
                </p>
                <p className="text-[11px] text-text-muted/70 mb-2 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-brand-gold/50 inline-block" />
                  {h.location}
                </p>
                <p className="text-xs text-text-muted leading-relaxed">
                  {h.specialties}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-text-muted italic text-center">
            A vanguard of leading institutions sharing our uncompromising standard for transparent, decision-first care.
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
          <p className="text-text-body max-w-xl mx-auto leading-relaxed">
            Start in exploration mode, then move into the structured process when you are ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/how-it-works">
              <Button variant="navy" size="lg" className="min-w-[200px]">
                How it works
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                Start exploring
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
