import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "The Ultimate Guide to Choosing a Hospital Abroad | AetherHeal",
  description:
    "A physician-led guide explaining how international patients can evaluate hospitals abroad and make safer medical decisions.",
  alternates: {
    canonical: "https://aetherheal.com/how-to-choose-hospital-abroad",
  },
  openGraph: {
    title: "The Ultimate Guide to Choosing a Hospital Abroad | AetherHeal",
    description:
      "A physician-led guide explaining how international patients can evaluate hospitals abroad and make safer medical decisions.",
    url: "https://aetherheal.com/how-to-choose-hospital-abroad",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ultimate Guide to Choosing a Hospital Abroad | AetherHeal",
    description:
      "A physician-led guide for evaluating hospitals abroad and making safer medical decisions.",
  },
}

const faqData = [
  {
    question: "Is it safe to travel abroad for medical treatment?",
    answer:
      "International medical travel can be safe when patients evaluate physician training, hospital infrastructure, and follow-up care. A structured decision process significantly reduces risk.",
  },
  {
    question: "How do I verify a hospital overseas?",
    answer:
      "Patients should review physician credentials, hospital systems, procedure volume, and complication management protocols rather than relying solely on online reviews.",
  },
  {
    question: "How much can medical treatment abroad cost?",
    answer:
      "Costs vary widely depending on the procedure, country, and hospital. While international treatment can be more affordable than domestic options, the total cost should account for travel, follow-up care, and potential revision procedures — not just the quoted price.",
  },
  {
    question: "Why do patients travel to South Korea for surgery?",
    answer:
      "South Korea offers highly specialized physicians, advanced medical infrastructure, and a strong focus on technical outcomes — particularly in hair transplantation, aesthetic medicine, plastic surgery, and ophthalmology.",
  },
  {
    question: "What should I check before choosing a clinic overseas?",
    answer:
      "Key factors include physician training and specialization, institutional standards, procedure volume, post-care management protocols, and whether the hospital has experience treating international patients with your specific condition.",
  },
]

const tocItems = [
  { id: "why-different", label: "Why Choosing a Hospital Abroad Is Different" },
  { id: "common-mistakes", label: "Common Mistakes International Patients Make" },
  { id: "hospital-quality", label: "What Actually Determines Hospital Quality" },
  { id: "reviews-rankings", label: "Why Reviews and Rankings Are Not Enough" },
  { id: "physician-led", label: "The Physician-Led Verification Model" },
  { id: "patient-journey", label: "Understanding the International Patient Journey" },
  { id: "south-korea", label: "Why Many Patients Choose South Korea" },
  { id: "structured-approach", label: "A Structured Approach to Medical Travel" },
  { id: "faq", label: "Frequently Asked Questions" },
]

export default function HowToChooseHospitalAbroadPage() {
  return (
    <div className="min-h-full">
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 bg-brand-navy/5 rounded-full text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-6">
            Patient Guide
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-navy mb-8 leading-tight">
            The Ultimate Guide to Choosing a Hospital Abroad
          </h1>
          <div className="space-y-5 text-text-body text-[17px] leading-relaxed">
            <p>
              Every year, millions of patients travel internationally for medical
              treatment.
            </p>
            <p>
              Some travel for advanced procedures. Others seek more affordable
              care. Many are looking for specialists that are difficult to access
              in their home country.
            </p>
            <p>
              But choosing a hospital abroad is not a normal consumer decision.
            </p>
            <p className="font-medium text-brand-navy">
              It is a high-stakes decision under uncertainty.
            </p>
            <p>You are selecting:</p>
            <ul className="space-y-2 pl-1">
              {["a medical team", "a treatment plan", "a healthcare system"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                    {item}
                  </li>
                )
              )}
            </ul>
            <p>in a country you may not fully understand.</p>
            <p>
              The internet offers endless information: reviews, forums,
              before-and-after photos, clinic websites.
            </p>
            <p>
              But more information does not necessarily create clarity. In many
              cases, it creates decision overload.
            </p>
            <p className="text-text-muted text-base pt-2 border-t border-slate-100">
              This guide explains how experienced physicians and healthcare
              systems evaluate hospitals — and how international patients can
              apply the same logic when choosing treatment abroad.
            </p>
          </div>

          {/* Table of Contents */}
          <nav className="mt-10 p-6 bg-bg-light border border-slate-200 rounded-2xl">
            <h2 className="font-serif text-lg text-brand-navy font-bold mb-4">
              Table of Contents
            </h2>
            <ol className="space-y-2.5">
              {tocItems.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex items-start gap-3 text-sm text-text-body hover:text-brand-gold transition-colors"
                  >
                    <span className="text-brand-gold/60 font-medium shrink-0 w-5 text-right">
                      {i + 1}.
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-bg-light border-b border-slate-200">
        <div className="max-w-3xl mx-auto space-y-20">

          {/* Why Choosing a Hospital Abroad Is Different */}
          <div id="why-different">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-6">
              Why Choosing a Hospital Abroad Is Different
            </h2>
            <div className="space-y-5 text-text-body leading-relaxed">
              <p>Most consumer decisions follow a simple structure.</p>
              <p>You compare products. You read reviews. You evaluate price and quality.</p>
              <p>Healthcare decisions are fundamentally different.</p>
              <p>
                According to the{" "}
                <a
                  href="https://www.who.int/news-room/fact-sheets/detail/patient-safety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold font-medium underline underline-offset-4 decoration-brand-gold/40"
                >
                  World Health Organization
                </a>
                , cross-border healthcare continues to grow globally — yet the
                frameworks for patient safety have not kept pace with demand.
              </p>
              <p>Three characteristics make healthcare decisions unique:</p>

              <div className="space-y-8 pt-2">
                <div>
                  <h3 className="font-serif text-lg text-brand-navy font-bold mb-3">
                    1. Information asymmetry
                  </h3>
                  <div className="space-y-4">
                    <p>
                      In medicine, patients rarely possess the same knowledge as
                      clinicians.
                    </p>
                    <p>Understanding treatment quality requires:</p>
                    <ul className="space-y-2 pl-1">
                      {[
                        "medical training",
                        "experience with complications",
                        "familiarity with clinical outcomes",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>
                      This makes it difficult to evaluate providers using standard
                      consumer signals.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-brand-navy font-bold mb-3">
                    2. Outcomes are uncertain
                  </h3>
                  <div className="space-y-4">
                    <p>
                      Unlike buying a product, medical treatments involve
                      biological systems.
                    </p>
                    <p>Even in excellent hospitals:</p>
                    <ul className="space-y-2 pl-1">
                      {[
                        "results can vary",
                        "complications may occur",
                        "recovery timelines differ",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>
                      A good decision process must account for uncertainty.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-brand-navy font-bold mb-3">
                    3. The cost of mistakes is high
                  </h3>
                  <div className="space-y-4">
                    <p>
                      If a consumer purchase fails, it can be replaced.
                    </p>
                    <p>
                      If a medical decision fails, consequences may include:
                    </p>
                    <ul className="space-y-2 pl-1">
                      {[
                        "revision procedures",
                        "long recovery periods",
                        "significant emotional stress",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>
                      For this reason, choosing a hospital abroad should be
                      approached as a structured decision process, not a quick
                      comparison.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Common Mistakes International Patients Make */}
          <div id="common-mistakes">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-6">
              Common Mistakes International Patients Make
            </h2>
            <div className="space-y-5 text-text-body leading-relaxed">
              <p>
                Patients researching treatment abroad often rely on signals that
                appear helpful but are incomplete.
              </p>
              <p>
                Understanding these limitations can significantly improve
                decision quality.
              </p>

              <div className="space-y-10 pt-2">
                <div>
                  <h3 className="font-serif text-lg text-brand-navy font-bold mb-3">
                    Mistake 1: Relying heavily on online reviews
                  </h3>
                  <div className="space-y-4">
                    <p>
                      Reviews can provide useful context, but they have structural
                      limitations.
                    </p>
                    <p>They tend to reflect:</p>
                    <ul className="space-y-2 pl-1">
                      {[
                        "extreme positive experiences",
                        "extreme negative experiences",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>rather than typical outcomes.</p>
                    <p>
                      In addition, reviews rarely include detailed medical
                      information about:
                    </p>
                    <ul className="space-y-2 pl-1">
                      {[
                        "patient selection",
                        "treatment complexity",
                        "clinical follow-up",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-5 bg-white border border-slate-200 rounded-xl">
                      <p className="text-sm text-text-body leading-relaxed italic">
                        Many international patients begin their research with
                        online reviews. While reviews can highlight patient
                        experiences, they rarely reflect clinical complexity. A
                        patient undergoing a routine procedure may leave a
                        five-star review, while a more complex case — one
                        involving revision surgery, unusual anatomy, or higher
                        complication risk — may require a fundamentally different
                        level of expertise that reviews do not capture.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-brand-navy font-bold mb-3">
                    Mistake 2: Comparing clinics primarily by price
                  </h3>
                  <div className="space-y-4">
                    <p>
                      Price differences between countries are often large.
                    </p>
                    <p>
                      However, focusing only on cost ignores other critical
                      variables:
                    </p>
                    <ul className="space-y-2 pl-1">
                      {[
                        "surgeon experience",
                        "hospital infrastructure",
                        "complication management",
                        "follow-up care",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>
                      Lower prices may reflect lower operational costs — but they
                      may also reflect differences in training or systems.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-brand-navy font-bold mb-3">
                    Mistake 3: Evaluating marketing instead of medicine
                  </h3>
                  <div className="space-y-4">
                    <p>Many clinic websites highlight:</p>
                    <ul className="space-y-2 pl-1">
                      {[
                        "before-and-after photos",
                        "testimonials",
                        "social media visibility",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>
                      While these elements can demonstrate patient satisfaction,
                      they are not substitutes for clinical evaluation.
                    </p>
                    <p>Medical quality is determined by:</p>
                    <ul className="space-y-2 pl-1">
                      {[
                        "physician expertise",
                        "institutional standards",
                        "long-term outcomes",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What Actually Determines Hospital Quality */}
          <div id="hospital-quality">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-6">
              What Actually Determines Hospital Quality
            </h2>
            <div className="space-y-5 text-text-body leading-relaxed">
              <p>
                From a clinical perspective, hospitals are evaluated using
                several core factors.
              </p>
              <p>
                Understanding these factors can help patients interpret available
                information more effectively.
              </p>

              <div className="space-y-10 pt-2">
                <div>
                  <h3 className="font-serif text-lg text-brand-navy font-bold mb-3">
                    Physician training and specialization
                  </h3>
                  <div className="space-y-4">
                    <p>
                      The training background of the physician performing the
                      procedure is often the most important variable.
                    </p>
                    <p>Key considerations include:</p>
                    <ul className="space-y-2 pl-1">
                      {[
                        "medical education and residency",
                        "procedure-specific experience",
                        "research or academic involvement",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-brand-navy font-bold mb-3">
                    Institutional standards
                  </h3>
                  <div className="space-y-4">
                    <p>
                      Hospitals differ significantly in their systems and
                      infrastructure.
                    </p>
                    <p>Important elements include:</p>
                    <ul className="space-y-2 pl-1">
                      {[
                        "operating room protocols",
                        "sterilization standards",
                        "nursing expertise",
                        "complication management systems",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-brand-navy font-bold mb-3">
                    Procedure volume
                  </h3>
                  <div className="space-y-4">
                    <p>
                      In many specialties, experience correlates strongly with
                      outcomes.
                    </p>
                    <p>
                      Hospitals that perform a high volume of a specific procedure
                      often develop refined systems and techniques.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-brand-navy font-bold mb-3">
                    Post-care management
                  </h3>
                  <div className="space-y-4">
                    <p>
                      Medical travel does not end when the procedure is completed.
                    </p>
                    <p>
                      Recovery and follow-up care are essential parts of the
                      process.
                    </p>
                    <p>
                      Hospitals with clear post-care protocols tend to provide
                      more predictable patient experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Reviews and Rankings Are Not Enough */}
          <div id="reviews-rankings">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-6">
              Why Reviews and Rankings Are Not Enough
            </h2>
            <div className="space-y-5 text-text-body leading-relaxed">
              <p>Online platforms frequently rank clinics using:</p>
              <ul className="space-y-2 pl-1">
                {["review counts", "ratings", "popularity metrics"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <p>
                These systems can be useful for identifying widely known
                providers.
              </p>
              <p>
                However, they rarely incorporate deeper clinical signals such as:
              </p>
              <ul className="space-y-2 pl-1">
                {[
                  "treatment planning",
                  "physician case selection",
                  "complication management",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                As a result, review-driven platforms often optimize for
                visibility rather than clinical rigor.
              </p>
              <p>
                This is where a structured{" "}
                <Link
                  href="/hospital-verification"
                  className="text-brand-gold font-medium underline underline-offset-4 decoration-brand-gold/40"
                >
                  verification process
                </Link>{" "}
                becomes essential — one that evaluates hospitals on clinical
                merit, not marketing performance.
              </p>
            </div>
          </div>

          {/* The Physician-Led Verification Model */}
          <div id="physician-led">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-6">
              The Physician-Led Verification Model
            </h2>
            <div className="space-y-5 text-text-body leading-relaxed">
              <p>
                One approach to reducing uncertainty is to introduce physician
                oversight into the decision process.
              </p>
              <p>In a physician-led model:</p>
              <ul className="space-y-2 pl-1">
                {[
                  "medical information is reviewed before a hospital is selected",
                  "treatment plans are evaluated for feasibility",
                  "hospitals are assessed using clinical criteria",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                This model shifts the decision process from consumer comparison
                toward structured medical evaluation.
              </p>
              <p>
                AetherHeal&apos;s{" "}
                <Link
                  href="/hospital-verification"
                  className="text-brand-gold font-medium underline underline-offset-4 decoration-brand-gold/40"
                >
                  hospital verification process
                </Link>{" "}
                is built on this principle: every partner institution is evaluated
                by physicians, not marketers.
              </p>
            </div>
          </div>

          {/* Understanding the International Patient Journey */}
          <div id="patient-journey">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-6">
              Understanding the International Patient Journey
            </h2>
            <div className="space-y-5 text-text-body leading-relaxed">
              <p>
                Choosing a hospital abroad is not a single decision. It is a
                sequence of coordinated steps.
              </p>
              <p>A typical patient journey includes:</p>
              <ul className="space-y-2 pl-1">
                {[
                  "Decision preparation",
                  "Treatment planning",
                  "Hospital selection",
                  "Travel coordination",
                  "Treatment and recovery",
                  "Post-care follow-up",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                When these steps are structured properly, international medical
                care can become significantly more predictable.
              </p>
              <p>
                Learn more about how AetherHeal coordinates each stage in our{" "}
                <Link
                  href="/medical-journey"
                  className="text-brand-gold font-medium underline underline-offset-4 decoration-brand-gold/40"
                >
                  medical journey overview
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Why Many Patients Choose South Korea */}
          <div id="south-korea">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-6">
              Why Many Patients Choose South Korea
            </h2>
            <div className="space-y-5 text-text-body leading-relaxed">
              <p>
                South Korea has emerged as one of the leading destinations for
                certain medical specialties, including:
              </p>
              <ul className="space-y-2 pl-1">
                {[
                  "hair transplantation",
                  "aesthetic medicine",
                  "plastic surgery",
                  "ophthalmology",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>Several factors contribute to this reputation:</p>
              <ul className="space-y-2 pl-1">
                {[
                  "highly specialized physicians",
                  "advanced medical infrastructure",
                  "strong focus on technical outcomes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                South Korea has developed one of the highest physician densities
                in Asia, according to{" "}
                <a
                  href="https://data.oecd.org/healthres/doctors.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold font-medium underline underline-offset-4 decoration-brand-gold/40"
                >
                  OECD healthcare data
                </a>
                . For international patients, Seoul in particular has developed a
                dense ecosystem of specialized clinics.
              </p>
              <p>
                Explore physician-led guidance for specific procedures like{" "}
                <Link
                  href="/hair-transplant-korea"
                  className="text-brand-gold font-medium underline underline-offset-4 decoration-brand-gold/40"
                >
                  hair transplantation in Korea
                </Link>
                .
              </p>
            </div>
          </div>

          {/* A Structured Approach to Medical Travel */}
          <div id="structured-approach">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-6">
              A Structured Approach to Medical Travel
            </h2>
            <div className="space-y-5 text-text-body leading-relaxed">
              <p>
                Ultimately, the most effective strategy for choosing a hospital
                abroad is not simply gathering more information.
              </p>
              <p className="font-medium text-brand-navy">
                It is structuring the decision process.
              </p>
              <p>This means:</p>
              <ul className="space-y-2 pl-1">
                {[
                  "identifying relevant clinical factors",
                  "verifying hospital capabilities",
                  "aligning treatment plans with patient goals",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                When these elements are organized systematically, patients can
                move from uncertainty toward clarity.
              </p>
            </div>
          </div>

          {/* Closing */}
          <div className="pt-8 border-t border-slate-200">
            <div className="space-y-5 text-text-body leading-relaxed">
              <p>
                Choosing a hospital abroad is a significant decision.
              </p>
              <p>
                But with the right framework, it does not need to be an
                overwhelming one.
              </p>
              <p>The goal is not simply to find a hospital.</p>
              <p className="font-medium text-brand-navy text-lg">
                The goal is to make a clear, informed decision about your care.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div id="faq" className="pt-8 border-t border-slate-200">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqData.map((faq) => (
                <div
                  key={faq.question}
                  className="p-6 bg-white border border-slate-200 rounded-xl"
                >
                  <h3 className="font-serif text-base sm:text-lg text-brand-navy font-bold mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-text-body leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl text-brand-navy mb-8">
            Continue Reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                href: "/hospital-verification",
                label: "Hospital Verification Process",
                desc: "How AetherHeal evaluates partner hospitals",
              },
              {
                href: "/medical-journey",
                label: "Your Medical Journey",
                desc: "End-to-end coordination from decision to recovery",
              },
              {
                href: "/hair-transplant-korea",
                label: "Hair Transplant in Korea",
                desc: "Physician-led guidance for hair restoration",
              },
              {
                href: "/plastic-surgery-korea",
                label: "Plastic Surgery in Korea",
                desc: "Structured decision support for cosmetic procedures",
              },
              {
                href: "/aesthetic-clinic-seoul",
                label: "Aesthetic Clinics in Seoul",
                desc: "Navigate skin treatments and dermatology in Seoul",
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
                className="group block p-5 border border-slate-200 rounded-xl hover:bg-bg-light hover:border-brand-gold/40 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                    {link.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-brand-gold" />
                </div>
                <p className="text-xs text-text-muted">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
