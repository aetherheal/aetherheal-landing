import type { Metadata } from "next"
import { assertPatientLocale } from "@/i18n/assert-locale"
import { locales } from "@/i18n/config"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  assertPatientLocale(locale)
  return {
    title: "Consent to Receive Marketing Information | AetherHeal",
    description: "Learn how AetherHeal collects, uses, and manages your personal information for marketing purposes in accordance with PIPA, GDPR, and the CAN-SPAM Act.",
    openGraph: {
      title: "Consent to Receive Marketing Information | AetherHeal",
      description: "Learn how AetherHeal collects, uses, and manages your personal information for marketing purposes in accordance with PIPA, GDPR, and the CAN-SPAM Act.",
      url: `https://aetherheal.com/${locale}/marketing-information`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Consent to Receive Marketing Information | AetherHeal",
      description: "Learn how AetherHeal collects, uses, and manages your personal information for marketing purposes in accordance with PIPA, GDPR, and the CAN-SPAM Act.",
    },
    alternates: {
      canonical: `https://aetherheal.com/${locale}/marketing-information`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://aetherheal.com/${l}/marketing-information`])),
    },
  }
}

export default async function MarketingInformationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  assertPatientLocale(locale)

  return (
    <div className="bg-white min-h-full">
      <section className="w-full bg-slate-50 border-b border-slate-200 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-navy font-medium">
            Consent to Receive Marketing Information
          </h1>
          <p className="text-sm text-text-muted">
            <strong>Effective Date:</strong> April 9, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> April 9, 2026 &nbsp;|&nbsp; <strong>Document Version:</strong> 1.0
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="space-y-10 text-text-body leading-relaxed text-[15px]">
          <nav className="p-6 sm:p-8 bg-slate-50 border border-slate-100 rounded-2xl">
            <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">Table of Contents</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "purpose", label: "1. Purpose of Collection and Use" },
                { id: "categories", label: "2. Categories of Personal Information" },
                { id: "channels", label: "3. Communication Channels" },
                { id: "retention", label: "4. Retention Period" },
                { id: "refuse", label: "5. Right to Refuse and Consequences" },
                { id: "withdrawal", label: "6. Withdrawal of Consent (Opt-Out)" },
                { id: "third-party", label: "7. Third-Party Sharing" },
                { id: "automated", label: "8. Automated Decision-Making" },
                { id: "transfers", label: "9. International Data Transfers" },
                { id: "rights", label: "10. Rights of Data Subjects" },
                { id: "age", label: "11. Age Restriction" },
                { id: "consent-logging", label: "12. Consent Logging" },
                { id: "amendments", label: "13. Amendments" },
                { id: "disputes", label: "14. Dispute Resolution and Remedies" },
                { id: "officer", label: "15. Personal Information Protection Officer" },
                { id: "governing-law", label: "16. Governing Law and Language" },
                { id: "contact", label: "17. Contact Information" },
              ].map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-slate-600 font-medium hover:text-brand-gold transition-colors">{item.label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <p>
            AetherHeal Co., Ltd. (&quot;AetherHeal,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) values your privacy and is committed to transparent communication. This document explains how we collect, use, and manage your personal information for marketing purposes in accordance with the <strong>Personal Information Protection Act (PIPA)</strong> of the Republic of Korea, the <strong>Act on Promotion of Information and Communications Network Utilization and Information Protection</strong>, and applicable international regulations including the <strong>EU General Data Protection Regulation (GDPR)</strong> and the <strong>US CAN-SPAM Act</strong>.
          </p>
          <p>By providing your consent, you agree to the terms set forth below.</p>

          <section id="purpose" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">1. Purpose of Collection and Use</h2>
            <p className="mb-3">We collect and use your personal information for the following marketing purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300">
              <li>Delivery of newsletters, service updates, and platform announcements</li>
              <li>Notification of events, promotions, and special offers</li>
              <li>Provision of personalized content and service recommendations</li>
              <li>Conducting satisfaction surveys and service improvement research</li>
              <li>Sharing information about new features, partner hospitals, and healthcare services available through the AetherHeal platform</li>
            </ul>
          </section>

          <section id="categories" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">2. Categories of Personal Information Collected</h2>
            <p className="mb-4">The following categories of personal information may be collected and used for marketing purposes:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-4 py-3 font-semibold text-brand-navy border-b border-slate-200">Category</th>
                    <th className="text-left px-4 py-3 font-semibold text-brand-navy border-b border-slate-200">Items</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3 font-medium">Identifiers</td>
                    <td className="px-4 py-3">Name, email address, phone number</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3 font-medium">Service Data</td>
                    <td className="px-4 py-3">Service usage history, consultation records, preference settings</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Technical Data</td>
                    <td className="px-4 py-3">Device type, language preference, time zone</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">We do <strong>not</strong> collect or use sensitive medical information for marketing purposes.</p>
          </section>

          <section id="channels" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">3. Communication Channels</h2>
            <p className="mb-3">Marketing information may be delivered through one or more of the following channels:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300">
              <li><strong>Email</strong> (newsletters, service announcements, promotional offers)</li>
              <li><strong>SMS / MMS</strong> (event notifications, time-sensitive promotions)</li>
              <li><strong>Push Notifications</strong> (in-app or browser-based alerts)</li>
              <li><strong>Messaging Platforms</strong> (KakaoTalk, WhatsApp, or equivalent services)</li>
            </ul>
            <p className="mt-4">You may select or modify your preferred channels at any time through your account settings or by contacting us directly.</p>
          </section>

          <section id="retention" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">4. Retention Period</h2>
            <p>
              Your personal information collected for marketing purposes will be retained and used <strong>until you withdraw your consent or terminate your account</strong>, whichever occurs first.
            </p>
            <p className="mt-3">Upon withdrawal of consent, your marketing-related personal information will be promptly destroyed or de-identified, except where retention is required by applicable law:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300 mt-3">
              <li><strong>Act on Consumer Protection in Electronic Commerce:</strong> Records of contracts, subscription withdrawal, payment, and supply of goods — up to 5 years</li>
              <li><strong>Protection of Communications Secrets Act:</strong> Log-in records — up to 3 months</li>
            </ul>
          </section>

          <section id="refuse" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">5. Right to Refuse and Consequences</h2>
            <p>
              <strong>Your consent is entirely voluntary.</strong> You may decline to provide consent for the receipt of marketing information without any restriction on your ability to use the core services of the AetherHeal platform. Refusal to consent will only result in the non-delivery of promotional and marketing communications.
            </p>
          </section>

          <section id="withdrawal" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">6. Withdrawal of Consent (Opt-Out)</h2>
            <p className="mb-3">You may withdraw your consent at any time, free of charge, through any of the following methods:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300">
              <li><strong>Unsubscribe link</strong> included in every marketing email</li>
              <li><strong>Account Settings</strong> on the AetherHeal platform (aetherheal.com)</li>
              <li><strong>Direct request</strong> via email to <a href="mailto:privacy@aetherheal.com" className="text-brand-navy underline underline-offset-2 hover:opacity-80">privacy@aetherheal.com</a></li>
            </ul>
            <p className="mt-4">Upon receipt of your withdrawal request:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300 mt-3">
              <li><strong>Cessation of marketing communications:</strong> We will stop all marketing transmissions <strong>without delay</strong> in accordance with Korean law.</li>
              <li><strong>Deletion of marketing-related personal data:</strong> Your personal information held solely for marketing purposes will be erased or de-identified <strong>within 30 days</strong> of your request, in accordance with GDPR Article 17. Where legal retention obligations apply (see Section 4), the relevant data will be retained separately and used only for the legally mandated purpose.</li>
            </ul>
            <p className="mt-4">We will confirm the processing of your request via the contact method you have provided.</p>
          </section>

          <section id="third-party" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">7. Third-Party Sharing</h2>
            <p className="mb-3">
              AetherHeal does <strong>not</strong> share your personal information with third parties for their independent marketing purposes without obtaining your separate, specific consent. In the event such sharing becomes necessary, we will provide advance notice specifying:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300">
              <li>The identity of the third-party recipient</li>
              <li>The purpose of the information sharing</li>
              <li>The categories of information to be shared</li>
              <li>The retention period applicable to the third party</li>
            </ul>
          </section>

          <section id="automated" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">8. Automated Decision-Making and Profiling</h2>
            <p>
              AetherHeal may use automated systems, including artificial intelligence, to analyze your service usage patterns and preferences in order to deliver personalized marketing content (profiling).
            </p>
            <p className="mt-3">In such cases:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300 mt-3">
              <li>You will be informed of the use of automated decision-making and the general logic involved.</li>
              <li>You have the right to <strong>object to profiling</strong> for marketing purposes at any time.</li>
              <li>You have the right to <strong>request human review</strong> of any decision made solely by automated means that produces legal or similarly significant effects on you (GDPR Article 22).</li>
            </ul>
            <p className="mt-4">To exercise these rights, please contact us at <a href="mailto:privacy@aetherheal.com" className="text-brand-navy underline underline-offset-2 hover:opacity-80">privacy@aetherheal.com</a>.</p>
          </section>

          <section id="transfers" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">9. International Data Transfers</h2>
            <p className="mb-3">
              As AetherHeal serves users across multiple jurisdictions, your personal information may be transferred to and processed in countries outside your country of residence. In such cases, we ensure that adequate safeguards are in place, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300">
              <li><strong>Standard Contractual Clauses (SCCs)</strong> approved by the European Commission, where applicable</li>
              <li>Compliance with <strong>PIPA cross-border transfer requirements</strong> (Articles 28-2 and 28-3)</li>
              <li>Technical and organizational measures to protect data integrity and confidentiality</li>
            </ul>
          </section>

          <section id="rights" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">10. Rights of Data Subjects</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request rectification of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request erasure of your personal information, subject to legal retention obligations</li>
              <li><strong>Restriction:</strong> Request limitation of processing in certain circumstances</li>
              <li><strong>Portability:</strong> Request transfer of your data in a structured, machine-readable format (EU/EEA residents)</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests, including profiling (EU/EEA residents)</li>
            </ul>
            <p className="mt-4">To exercise any of these rights, please contact us at <a href="mailto:privacy@aetherheal.com" className="text-brand-navy underline underline-offset-2 hover:opacity-80">privacy@aetherheal.com</a>.</p>
          </section>

          <section id="age" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">11. Age Restriction</h2>
            <p>
              The AetherHeal platform and its marketing services are intended for individuals aged <strong>14 years or older</strong>. We do not knowingly collect personal information from anyone under the age of 14. If we become aware that personal information has been collected from a person under 14 without verified parental or legal guardian consent, we will take immediate steps to delete such information in accordance with PIPA Article 22 and GDPR Article 8.
            </p>
          </section>

          <section id="consent-logging" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">12. Consent Logging</h2>
            <p className="mb-3">For regulatory compliance and your protection, we maintain a record of your consent, including:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300">
              <li>Date and time of consent</li>
              <li>Method of consent (web form, checkbox, etc.)</li>
              <li>Version of this consent document at the time of agreement</li>
              <li>IP address or device identifier</li>
            </ul>
            <p className="mt-4">
              These records are retained for the duration of your use of the platform and for a minimum of <strong>3 years</strong> following withdrawal or account termination, in accordance with applicable record-keeping obligations.
            </p>
          </section>

          <section id="amendments" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">13. Amendments</h2>
            <p className="mb-3">AetherHeal reserves the right to amend this consent document to reflect changes in applicable law, regulatory guidance, or our services. In the event of any amendment:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300">
              <li>We will notify you via email or platform notification at least <strong>7 days</strong> prior to the effective date of the changes.</li>
              <li><strong>Material changes</strong> — including changes to the purpose of data collection, the categories of information collected, or the introduction of third-party sharing — will require your <strong>renewed consent (re-consent)</strong>. Continued use of the platform alone does not constitute acceptance of material changes.</li>
              <li><strong>Non-material changes</strong> — such as corrections of typographical errors, formatting adjustments, or updates to contact information — will take effect upon notification without requiring re-consent.</li>
            </ul>
            <p className="mt-4">All prior versions of this document will be archived and made available upon request.</p>
          </section>

          <section id="disputes" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">14. Dispute Resolution and Remedies</h2>
            <p className="mb-3">If you believe your personal information has been mishandled, you may seek resolution through the following channels:</p>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">Republic of Korea:</h3>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300">
              <li>Personal Information Dispute Mediation Committee: www.kopico.go.kr / +82-1833-6972</li>
              <li>Korea Internet &amp; Security Agency (KISA) Privacy Report Center: privacy.kisa.or.kr / 118</li>
              <li>Supreme Prosecutors&apos; Office Cyber Investigation Division: +82-2-3480-3573</li>
              <li>National Police Agency Cyber Bureau: ecrm.cyber.go.kr / 182</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">European Economic Area (EEA) Residents:</h3>
            <p>
              You have the right to lodge a complaint with the <strong>Supervisory Authority</strong> of your country of residence in accordance with GDPR Article 77. A list of EU Data Protection Authorities is available at edpb.europa.eu.
            </p>
          </section>

          <section id="officer" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">15. Personal Information Protection Officer</h2>
            <p className="mb-4">
              In accordance with PIPA Article 31, the following individual has been designated as the Personal Information Protection Officer responsible for overseeing all matters related to personal information processing:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3 font-semibold w-32">Name</td>
                    <td className="px-4 py-3">Dr. Jee Hoon Ju</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3 font-semibold">Title</td>
                    <td className="px-4 py-3">Representative Director</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">Email</td>
                    <td className="px-4 py-3"><a href="mailto:privacy@aetherheal.com" className="text-brand-navy underline underline-offset-2 hover:opacity-80">privacy@aetherheal.com</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              For users in the European Economic Area, Dr. Jee Hoon Ju also serves as the designated point of contact for data protection inquiries under GDPR.
            </p>
          </section>

          <section id="governing-law" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">16. Governing Law and Language</h2>
            <p>
              This document is governed by and construed in accordance with the laws of the Republic of Korea. For users residing in the European Economic Area, the provisions of the GDPR shall apply in addition to Korean law where they afford greater protection.
            </p>
            <p className="mt-3">
              This consent document is provided in both Korean and English. <strong>In the event of any discrepancy or conflict between the Korean and English versions, the Korean version shall prevail.</strong>
            </p>
          </section>

          <section id="contact" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">17. Contact Information</h2>
            <p>For inquiries regarding this consent document or your personal information, please contact:</p>
            <div className="mt-4 bg-slate-50 rounded-lg p-6 space-y-2">
              <p className="font-semibold text-[#0F172A]">AetherHeal Co., Ltd.</p>
              <p>Representative: Dr. Jee Hoon Ju</p>
              <p>Business Registration No.: 874-87-03734</p>
              <p>Address: B1, 64, Gingorang-ro 14-gil, Gwangjin-gu, Seoul, Republic of Korea</p>
              <p>Email: <a href="mailto:privacy@aetherheal.com" className="text-brand-navy underline underline-offset-2 hover:opacity-80">privacy@aetherheal.com</a></p>
            </div>
          </section>

          <div className="mt-16 pt-8 border-t border-slate-200">
            <p className="text-sm text-text-muted italic">&copy; 2026 AetherHeal Co., Ltd. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
