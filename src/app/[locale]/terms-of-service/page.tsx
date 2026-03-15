import type { Metadata } from "next"
import { assertPatientLocale } from "@/i18n/assert-locale"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  assertPatientLocale(locale)
  return {
    title: "Terms of Service | AetherHeal",
    description: "Terms and conditions governing the use of the AetherHeal platform, including booking services, user responsibilities, and decision support coordination.",
    openGraph: {
      title: "Terms of Service | AetherHeal",
      description: "Terms and conditions governing the use of the AetherHeal platform, including booking services, user responsibilities, and decision support coordination.",
      url: `https://aetherheal.com/${locale}/terms-of-service`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Terms of Service | AetherHeal",
      description: "Terms and conditions governing the use of the AetherHeal platform, including booking services, user responsibilities, and decision support coordination.",
    },
    alternates: {
      canonical: `https://aetherheal.com/${locale}/terms-of-service`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://aetherheal.com/${l}/terms-of-service`])),
    },
  }
}

export default async function TermsOfServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  assertPatientLocale(locale)
  const dict = await getDictionary(locale as Locale)

  return (
    <div className="min-h-full bg-white">
      <section className="w-full bg-slate-50 border-b border-slate-200 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-navy font-medium">
            AetherHeal Terms of Service
          </h1>
          <p className="text-sm text-text-muted">
            <strong>Effective Date:</strong> March 6, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> March 6, 2026
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="space-y-12">

          <nav className="p-6 sm:p-8 bg-slate-50 border border-slate-100 rounded-2xl">
            <h2 className="font-serif text-sm text-brand-navy font-bold uppercase tracking-widest mb-6">Table of Contents</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "introduction", label: "1. Introduction" },
                { id: "definitions", label: "2. Definitions" },
                { id: "nature-of-the-platform", label: "3. Nature of the Platform" },
                { id: "user-accounts", label: "4. User Accounts" },
                { id: "services-provided", label: "5. Services Provided" },
                { id: "booking-services", label: "6. Booking Services" },
                { id: "payments", label: "7. Payments" },
                { id: "refund-policy-reference", label: "8. Refund Policy Reference" },
                { id: "responsibilities-of-medical-institutions", label: "9. Responsibilities of Medical Institutions" },
                { id: "user-responsibilities", label: "10. User Responsibilities" },
                { id: "prohibited-conduct", label: "11. Prohibited Conduct" },
                { id: "intellectual-property", label: "12. Intellectual Property" },
                { id: "privacy", label: "13. Privacy" },
                { id: "limitation-of-liability", label: "14. Limitation of Liability" },
                { id: "indemnification", label: "15. Indemnification" },
                { id: "service-availability-and-modification", label: "16. Service Availability and Modification" },
                { id: "termination-of-service", label: "17. Termination of Service" },
                { id: "governing-law", label: "18. Governing Law" },
                { id: "dispute-resolution", label: "19. Dispute Resolution" },
                { id: "contact-information", label: "20. Contact Information" },
              ].map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-slate-600 font-medium hover:text-brand-gold transition-colors">{item.label}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div id="introduction" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">1. Introduction</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">1.1 Purpose</h3>
                <p className="text-text-body text-base leading-relaxed">
                  These Terms of Service (&quot;Terms&quot;) govern your access to and use of the AetherHeal platform (&quot;Platform&quot;), operated by AetherHeal Co., Ltd. (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). The Platform provides information about medical institutions and facilitates consultation requests and appointment bookings for medical services.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">1.2 Acceptance</h3>
                <p className="text-text-body text-base leading-relaxed">
                  By accessing or using the Platform, you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Platform.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">1.3 Eligibility</h3>
                <p className="text-text-body text-base leading-relaxed">
                  You must be at least 18 years of age to use the Platform. By using the Platform, you represent and warrant that you meet this age requirement.
                </p>
              </div>
            </div>
          </div>

          <div id="definitions" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">2. Definitions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">2.1 Platform</h3>
                <p className="text-text-body text-base leading-relaxed">
                  The AetherHeal website and any associated mobile applications or digital services operated by the Company.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">2.2 User</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Any individual who accesses or uses the Platform.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">2.3 Partner Medical Institution</h3>
                <p className="text-text-body text-base leading-relaxed">
                  A licensed hospital, clinic, or healthcare provider listed on the Platform.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">2.4 Medical Services</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Medical treatments, consultations, procedures, and other healthcare services provided directly by Partner Medical Institutions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">2.5 Booking Services</h3>
                <p className="text-text-body text-base leading-relaxed">
                  The scheduling and coordination services provided through the Platform that connect Users with Partner Medical Institutions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">2.6 Deposit</h3>
                <p className="text-text-body text-base leading-relaxed">
                  A partial advance payment made by a User to confirm a booking through the Platform.
                </p>
              </div>
            </div>
          </div>

          <div id="nature-of-the-platform" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">3. Nature of the Platform</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">3.1 Role and Scope</h3>
                <p className="text-text-body text-base leading-relaxed">
                  AetherHeal serves as an intermediary platform that connects Users with Partner Medical Institutions. The Company does not provide, endorse, or guarantee any medical services. All medical services are provided solely by the relevant Partner Medical Institution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">3.2 No Medical Advice</h3>
                <p className="text-text-body text-base leading-relaxed">
                  The information provided on the Platform is for general informational purposes only and does not constitute medical advice. Users should consult qualified healthcare professionals before making any medical decisions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">3.3 No Provider-Patient Relationship</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Use of the Platform does not create a provider-patient relationship between the User and the Company. Any provider-patient relationship exists exclusively between the User and the Partner Medical Institution.
                </p>
              </div>
            </div>
          </div>

          <div id="user-accounts" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">4. User Accounts</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">4.1 Registration</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Certain features of the Platform may require you to create an account. You agree to provide accurate and complete information during the registration process.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">4.2 Accuracy</h3>
                <p className="text-text-body text-base leading-relaxed">
                  You are responsible for maintaining the accuracy of your account information and for updating it promptly if it changes.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">4.3 Security</h3>
                <p className="text-text-body text-base leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </div>
            </div>
          </div>

          <div id="services-provided" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">5. Services Provided</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">5.1 Institution Information</h3>
                <p className="text-text-body text-base leading-relaxed">
                  The Platform provides curated information about Partner Medical Institutions, including but not limited to their specialties, available treatments, accreditations, and general pricing information.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">5.2 Consultation Requests</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Users may submit consultation requests through the Platform. These requests are forwarded to the relevant Partner Medical Institution for review and response.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">5.3 Appointment Scheduling</h3>
                <p className="text-text-body text-base leading-relaxed">
                  The Platform facilitates appointment scheduling between Users and Partner Medical Institutions. Confirmation of appointments is subject to the availability and acceptance by the Partner Medical Institution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">5.4 International Patient Assistance</h3>
                <p className="text-text-body text-base leading-relaxed">
                  For international Users, the Platform may provide additional coordination services such as translation assistance, travel guidance, and logistical support related to medical appointments.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">5.5 Communication Tools</h3>
                <p className="text-text-body text-base leading-relaxed">
                  The Platform provides communication channels between Users and Partner Medical Institutions or our support team for the purpose of coordinating medical services.
                </p>
              </div>
            </div>
          </div>

          <div id="booking-services" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">6. Booking Services</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">6.1 Requests</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Users may submit booking requests through the Platform for medical consultations or procedures at Partner Medical Institutions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">6.2 Confirmation</h3>
                <p className="text-text-body text-base leading-relaxed">
                  A booking is considered confirmed only after the Partner Medical Institution accepts the request and, where applicable, the required deposit has been received.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">6.3 Deposit</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Certain bookings may require a deposit to secure the appointment. The deposit amount, payment terms, and application toward the final cost of medical services will be specified at the time of booking.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">6.4 Modifications</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Requests to modify or cancel a booking must be submitted through the Platform. Modifications are subject to the availability and policies of the relevant Partner Medical Institution.
                </p>
              </div>
            </div>
          </div>

          <div id="payments" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">7. Payments</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">7.1 Deposit Payments</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Users may be required to pay a deposit through the Platform to confirm certain bookings. The deposit is applied toward the total cost of medical services at the Partner Medical Institution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">7.2 Processing</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Payments are processed through secure third-party payment processors. By making a payment, you agree to the terms and conditions of the applicable payment processor.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">7.3 Currency</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Prices and payments may be displayed and processed in various currencies. Any currency conversion fees or exchange rate differences are the responsibility of the User.
                </p>
              </div>
            </div>
          </div>

          <div id="refund-policy-reference" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">8. Refund Policy Reference</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">8.1 Conditions</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Refunds of deposits are subject to the conditions outlined in our separate Refund Policy.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">8.2 Separate Policy</h3>
                <p className="text-text-body text-base leading-relaxed">
                  The Refund Policy is incorporated by reference into these Terms. Users are encouraged to review the Refund Policy in full before making any payments through the Platform.
                </p>
              </div>
            </div>
          </div>

          <div id="responsibilities-of-medical-institutions" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">9. Responsibilities of Medical Institutions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">9.1 Provision of Services</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Partner Medical Institutions are solely responsible for the provision of medical services, including diagnosis, treatment, and follow-up care.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">9.2 Qualifications</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Partner Medical Institutions represent that they hold all necessary licenses, certifications, and accreditations required to provide the medical services listed on the Platform.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">9.3 Outcome</h3>
                <p className="text-text-body text-base leading-relaxed">
                  The Company does not guarantee any specific medical outcomes. Medical results vary depending on individual circumstances, and the Partner Medical Institution is responsible for discussing expected outcomes with the User.
                </p>
              </div>
            </div>
          </div>

          <div id="user-responsibilities" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">10. User Responsibilities</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">10.1 Accurate Information</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Users are responsible for providing accurate and complete personal and medical information when using the Platform. Inaccurate information may affect the quality and safety of medical services.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">10.2 Compliance</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Users agree to comply with all applicable laws and regulations when using the Platform, including but not limited to health and safety regulations, immigration laws, and local regulations of the country where medical services are provided.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">10.3 Lawful Use</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Users agree to use the Platform only for lawful purposes and in accordance with these Terms.
                </p>
              </div>
            </div>
          </div>

          <div id="prohibited-conduct" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">11. Prohibited Conduct</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">11.1 Misuse</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Users shall not misuse the Platform, including but not limited to using it for any purpose other than its intended use as described in these Terms.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">11.2 Fraud</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Users shall not provide false, misleading, or fraudulent information on the Platform, including during the registration, booking, or payment processes.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">11.3 Interference</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Users shall not interfere with or disrupt the operation of the Platform, including through the use of viruses, bots, or other harmful technologies.
                </p>
              </div>
            </div>
          </div>

          <div id="intellectual-property" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">12. Intellectual Property</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">12.1 Content</h3>
                <p className="text-text-body text-base leading-relaxed">
                  All content on the Platform, including text, graphics, logos, images, and software, is the property of the Company or its licensors and is protected by intellectual property laws.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">12.2 Restrictions</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Users may not reproduce, distribute, modify, or create derivative works from any content on the Platform without prior written consent from the Company.
                </p>
              </div>
            </div>
          </div>

          <div id="privacy" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">13. Privacy</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">13.1 Collection</h3>
                <p className="text-text-body text-base leading-relaxed">
                  We collect and process personal data in accordance with our Privacy Policy. By using the Platform, you consent to the collection, use, and sharing of your information as described in the Privacy Policy.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">13.2 Policy Reference</h3>
                <p className="text-text-body text-base leading-relaxed">
                  Our Privacy Policy is available on the Platform and is incorporated by reference into these Terms.
                </p>
              </div>
            </div>
          </div>

          <div id="limitation-of-liability" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">14. Limitation of Liability</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">14.1 Service Limitation</h3>
                <p className="text-text-body text-base leading-relaxed">
                  To the fullest extent permitted by applicable law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Platform or Booking Services.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">14.2 Medical Disclaimer</h3>
                <p className="text-text-body text-base leading-relaxed">
                  The Company is not liable for any medical outcomes, complications, or damages resulting from medical services provided by Partner Medical Institutions. Users acknowledge that all medical decisions are made between the User and the Partner Medical Institution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">14.3 Third-Party</h3>
                <p className="text-text-body text-base leading-relaxed">
                  The Company is not responsible for the actions, products, or services of any third party, including Partner Medical Institutions, payment processors, or travel service providers.
                </p>
              </div>
            </div>
          </div>

          <div id="indemnification" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">15. Indemnification</h2>
            <div className="space-y-4">
              <p className="text-text-body text-base leading-relaxed">
                You agree to indemnify, defend, and hold harmless the Company, its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or in connection with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text-body text-base leading-relaxed marker:text-slate-300">
                <li>Your use of the Platform;</li>
                <li>Your violation of these Terms;</li>
                <li>Your violation of any applicable law or regulation;</li>
                <li>Any information you provide through the Platform.</li>
              </ul>
            </div>
          </div>

          <div id="service-availability-and-modification" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">16. Service Availability and Modification</h2>
            <div className="space-y-4">
              <p className="text-text-body text-base leading-relaxed">
                The Company reserves the right to modify, suspend, or discontinue any part of the Platform or its services at any time, with or without notice. The Company shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Platform.
              </p>
              <p className="text-text-body text-base leading-relaxed">
                We may update these Terms from time to time. Continued use of the Platform after any changes constitutes acceptance of the updated Terms.
              </p>
            </div>
          </div>

          <div id="termination-of-service" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">17. Termination of Service</h2>
            <div className="space-y-4">
              <p className="text-text-body text-base leading-relaxed">
                The Company may terminate or suspend your access to the Platform at any time, with or without cause, and with or without notice. Upon termination, your right to use the Platform will immediately cease.
              </p>
              <p className="text-text-body text-base leading-relaxed">
                Provisions of these Terms that by their nature should survive termination shall remain in effect, including but not limited to intellectual property provisions, disclaimers, indemnification, and limitations of liability.
              </p>
            </div>
          </div>

          <div id="governing-law" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">18. Governing Law</h2>
            <div className="space-y-4">
              <p className="text-text-body text-base leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the Republic of Korea, without regard to its conflict of law principles.
              </p>
            </div>
          </div>

          <div id="dispute-resolution" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">19. Dispute Resolution</h2>
            <div className="space-y-4">
              <p className="text-text-body text-base leading-relaxed">
                Any disputes arising out of or in connection with these Terms shall be resolved through good-faith negotiations between the parties. If the dispute cannot be resolved through negotiation, it shall be submitted to the exclusive jurisdiction of the courts of the Republic of Korea.
              </p>
            </div>
          </div>

          <div id="contact-information" className="scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">20. Contact Information</h2>
            <div className="space-y-4">
              <p className="text-text-body text-base leading-relaxed">
                If you have any questions or concerns about these Terms, please contact us:
              </p>
              <div className="text-text-body text-base leading-relaxed space-y-1">
                <p className="font-bold text-text-deep">AetherHeal Co., Ltd.</p>
                <p>
                  Email:{" "}
                  <a href="mailto:support@aetherheal.com" className="text-brand-navy underline hover:text-brand-navy/80 transition-colors">
                    support@aetherheal.com
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a href="https://www.aetherheal.com" className="text-brand-navy underline hover:text-brand-navy/80 transition-colors">
                    www.aetherheal.com
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
