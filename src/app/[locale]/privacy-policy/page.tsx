import type { Metadata } from "next"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: "Privacy Policy | AetherHeal",
    description: "Learn how AetherHeal collects, uses, and protects your personal data. Our privacy policy explains your rights and how we safeguard your information.",
    alternates: {
      canonical: `https://aetherheal.com/${locale}/privacy-policy`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://aetherheal.com/${l}/privacy-policy`])),
    },
  }
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <div className="bg-white min-h-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-28">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] font-medium mb-4">
          AetherHeal Privacy Policy
        </h1>
        <p className="text-text-body text-sm mb-12">
          Effective Date: March 6, 2026 | Last Updated: March 6, 2026
        </p>

        <div className="space-y-10 text-text-body leading-relaxed text-[15px]">
          <p>
            AetherHeal Co., Ltd. (&quot;AetherHeal,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting the personal data you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the AetherHeal platform (website, mobile applications, or related services). By accessing or using our services, you acknowledge that you have read and understood this Privacy Policy.
          </p>

          <section>
            <h2 className="font-serif text-2xl text-[#0F172A] font-medium mb-4">1. Scope and Role of AetherHeal</h2>
            <p>
              AetherHeal is a medical tourism coordination platform that facilitates the connection between international patients and licensed healthcare providers in South Korea. AetherHeal is not a medical provider, hospital, or clinic. We do not render medical diagnoses, treatments, or advice. All medical services are independently provided by partner medical institutions.
            </p>
            <p className="mt-3">
              This Privacy Policy applies to all personal data processed by AetherHeal in connection with our platform and coordination services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#0F172A] font-medium mb-4">2. Personal Data We Collect</h2>

            <h3 className="font-semibold text-[#0F172A] text-lg mt-6 mb-3">2.1 Information You Provide Directly</h3>
            <p className="mb-3">When you register for an account, submit a consultation request, or otherwise interact with our platform, we may collect:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Full name</li>
              <li>Nationality</li>
              <li>Date of birth</li>
              <li>Gender</li>
              <li>Phone number (including country code)</li>
              <li>Email address</li>
              <li>Messenger account information (e.g., WhatsApp, LINE, WeChat, Telegram, KakaoTalk)</li>
              <li>Passport or travel document information (for travel and visa coordination)</li>
              <li>Booking preferences and appointment details</li>
              <li>Consultation requests and related details (e.g., procedure types, desired treatment areas)</li>
              <li>Photographs, medical history, medical records, or documents you upload for consultation purposes</li>
            </ul>

            <h3 className="font-semibold text-[#0F172A] text-lg mt-6 mb-3">2.2 Information Collected During Platform Use</h3>
            <p className="mb-3">When you access or use our platform, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Login credentials and account activity</li>
              <li>Device information (device type, operating system, unique device identifiers)</li>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Access logs and timestamps</li>
              <li>Pages viewed and usage patterns</li>
              <li>Communication history with AetherHeal support or coordination teams</li>
            </ul>

            <h3 className="font-semibold text-[#0F172A] text-lg mt-6 mb-3">2.3 Payment-Related Information</h3>
            <p>
              All payment transactions are processed through third-party payment service providers. AetherHeal does not directly collect or store full credit card numbers or banking credentials. We may receive limited payment confirmation data (e.g., transaction ID, payment status, last four digits of card number) to manage booking and deposit records.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#0F172A] font-medium mb-4">3. Purposes of Processing</h2>
            <p className="mb-3">We process your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Creating and managing your AetherHeal account</li>
              <li>Facilitating consultation requests between you and partner medical institutions</li>
              <li>Coordinating appointments, travel logistics, and accommodation arrangements</li>
              <li>Communicating with you regarding your inquiries, bookings, and service updates</li>
              <li>Providing travel coordination support (e.g., airport pickup, visa documentation assistance)</li>
              <li>Processing deposits, refunds, and related financial transactions</li>
              <li>Responding to customer inquiries and support requests</li>
              <li>Ensuring platform security and preventing fraud or unauthorized access</li>
              <li>Complying with applicable laws and regulations, including South Korean personal information protection laws</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#0F172A] font-medium mb-4">4. Third-Party Disclosure</h2>

            <h3 className="font-semibold text-[#0F172A] text-lg mt-6 mb-3">4.1 Provision to Partner Medical Institutions</h3>
            <p className="mb-3">
              To facilitate your consultation and treatment, we may share relevant portions of your personal data with licensed partner medical institutions in South Korea. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Name, date of birth, gender, nationality</li>
              <li>Consultation details, photographs, and medical history you have provided</li>
              <li>Appointment and scheduling information</li>
            </ul>
            <p className="mt-3">
              These institutions are independent data controllers responsible for their own handling of your data under applicable medical and privacy laws.
            </p>

            <h3 className="font-semibold text-[#0F172A] text-lg mt-6 mb-3">4.2 Provision to Coordination Partners</h3>
            <p className="mb-3">We may share limited personal data with trusted service partners to support your experience, including:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Payment processors (for deposit and refund handling)</li>
              <li>Communication service vendors (for messaging and notification delivery)</li>
              <li>Travel and accommodation coordination partners</li>
              <li>IT infrastructure and cloud hosting providers</li>
            </ul>

            <h3 className="font-semibold text-[#0F172A] text-lg mt-6 mb-3">4.3 Legal Basis</h3>
            <p>
              Data sharing with third parties is conducted based on your consent, the performance of a contract with you, our legitimate interests, or compliance with legal obligations, as applicable under the Personal Information Protection Act (PIPA) of South Korea and other relevant regulations.
            </p>

            <h3 className="font-semibold text-[#0F172A] text-lg mt-6 mb-3">4.4 No Sale of Personal Data</h3>
            <p>
              AetherHeal does not sell, rent, or trade your personal data to any third party for marketing or advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#0F172A] font-medium mb-4">5. Cross-Border Transfer</h2>
            <p className="mb-4">
              As an international medical tourism platform, your personal data may be transferred to and processed in countries outside your country of residence, including South Korea.
            </p>

            <h3 className="font-semibold text-[#0F172A] text-lg mt-6 mb-3">5.1 Overseas Transfer to Partners</h3>
            <p>
              Your data may be transferred to partner medical institutions and coordination partners located in South Korea or other jurisdictions as necessary to provide our services.
            </p>

            <h3 className="font-semibold text-[#0F172A] text-lg mt-6 mb-3">5.2 Overseas Outsourcing to Service Providers</h3>
            <p>
              We may outsource certain processing activities (e.g., cloud hosting, data analytics, customer support tools) to service providers located outside South Korea. Such providers are contractually required to protect your data in accordance with applicable laws.
            </p>

            <h3 className="font-semibold text-[#0F172A] text-lg mt-6 mb-3">5.3 Items Potentially Transferred</h3>
            <p>
              Personal data transferred may include any of the categories listed in Section 2 above, depending on the nature of the service being provided.
            </p>

            <h3 className="font-semibold text-[#0F172A] text-lg mt-6 mb-3">5.4 Purpose</h3>
            <p>
              Cross-border transfers are made solely for the purposes described in Section 3 of this Privacy Policy.
            </p>

            <h3 className="font-semibold text-[#0F172A] text-lg mt-6 mb-3">5.5 Retention Period</h3>
            <p>
              Data transferred overseas is retained for the same period as described in Section 7 of this Privacy Policy.
            </p>

            <h3 className="font-semibold text-[#0F172A] text-lg mt-6 mb-3">5.6 Safeguards</h3>
            <p>
              We implement appropriate safeguards, including contractual data protection clauses, encryption, and access controls, to protect your data during cross-border transfers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#0F172A] font-medium mb-4">6. Entrustment of Processing</h2>
            <p>
              AetherHeal may entrust certain personal data processing activities to third-party service providers (e.g., cloud hosting, customer communication tools, analytics platforms). In such cases, we enter into data processing agreements that require the entrusted parties to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 mt-3">
              <li>Process data only for the designated purposes</li>
              <li>Implement technical and organizational security measures</li>
              <li>Not re-entrust data to additional parties without our consent</li>
              <li>Return or destroy data upon completion of the entrusted task</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#0F172A] font-medium mb-4">7. Retention and Deletion</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law. When your data is no longer needed, we will securely delete or anonymize it.
            </p>
            <p className="mt-3">Specific retention periods may include:</p>
            <ul className="list-disc pl-6 space-y-1.5 mt-3">
              <li>Account and consultation records: retained for the duration of your account and up to 3 years after account closure, unless longer retention is required by law</li>
              <li>Payment and transaction records: retained as required under applicable tax and commercial laws (typically 5 years)</li>
              <li>Communication records: retained for up to 3 years for service improvement and dispute resolution</li>
              <li>Access and usage logs: retained for up to 1 year for security and fraud prevention purposes</li>
            </ul>
            <p className="mt-3">
              Upon expiration of the retention period, your data will be promptly destroyed in a manner that prevents recovery.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#0F172A] font-medium mb-4">8. Your Rights</h2>
            <p className="mb-3">
              Depending on your jurisdiction, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Right of Access:</strong> You may request access to the personal data we hold about you.</li>
              <li><strong>Right of Correction:</strong> You may request correction of inaccurate or incomplete personal data.</li>
              <li><strong>Right of Deletion:</strong> You may request deletion of your personal data, subject to legal retention requirements.</li>
              <li><strong>Right to Suspend Processing:</strong> You may request that we suspend certain processing activities related to your data.</li>
              <li><strong>Right to Withdraw Consent:</strong> Where processing is based on your consent, you may withdraw your consent at any time. Withdrawal of consent does not affect the lawfulness of processing conducted prior to the withdrawal.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us using the information provided in Section 11 below. We will respond to your request within a reasonable time frame, in compliance with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#0F172A] font-medium mb-4">9. Security</h2>
            <p>
              AetherHeal implements reasonable technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 mt-3">
              <li>Encryption of data in transit and at rest</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Regular security assessments and monitoring</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="mt-3">
              While we strive to protect your personal data, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#0F172A] font-medium mb-4">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make material changes, we will notify you by posting the updated policy on our platform and updating the &quot;Last Updated&quot; date at the top of this page. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#0F172A] font-medium mb-4">11. Contact Information</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please contact us at:</p>
            <div className="mt-4 bg-slate-50 rounded-lg p-6 space-y-2">
              <p className="font-semibold text-[#0F172A]">AetherHeal Co., Ltd.</p>
              <p>Email: <a href="mailto:support@aetherheal.com" className="text-brand-navy underline underline-offset-2 hover:opacity-80">support@aetherheal.com</a></p>
              <p>Website: <a href="https://www.aetherheal.com" className="text-brand-navy underline underline-offset-2 hover:opacity-80">www.aetherheal.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
