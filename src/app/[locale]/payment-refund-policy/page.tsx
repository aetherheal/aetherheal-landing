import type { Metadata } from "next"
import { locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: "Payment & Refund Policy | AetherHeal",
    description:
      "Learn how AetherHeal handles payments, deposits, scheduling changes, and refunds for international medical coordination services.",
    alternates: {
      canonical: `https://aetherheal.com/${locale}/payment-refund-policy`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://aetherheal.com/${l}/payment-refund-policy`])
      ),
    },
  }
}

export default async function PaymentRefundPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  return (
    <div className="min-h-full bg-white">
      <section className="w-full bg-slate-50 border-b border-slate-200 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-navy font-medium">
            AetherHeal Payment &amp; Refund Policy
          </h1>
          <p className="text-lg text-text-body italic">
            (Deposit Payment, Scheduling, and Refund Policy)
          </p>
          <p className="text-sm text-text-muted">
            <strong>Effective Date:</strong> March 6, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> March 6, 2026
          </p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="prose prose-slate max-w-none space-y-10 text-text-body leading-relaxed text-[15px] sm:text-base">
          <p>
            This Payment &amp; Refund Policy (&ldquo;Policy&rdquo;) outlines the terms and conditions governing deposit
            payments, appointment scheduling, rescheduling, cancellation, and refund procedures for services coordinated
            through AetherHeal Co., Ltd. (&ldquo;AetherHeal,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;). By making a deposit payment, you acknowledge and agree to the terms set forth in this
            Policy.
          </p>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">
              1. Deposit Requirement
            </h2>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">1.1 Purpose</h3>
            <p>
              AetherHeal requires a deposit payment equal to 10% of the estimated treatment cost at the time of
              appointment booking. This deposit serves to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300 mt-3">
              <li>Reserve your appointment slot and confirm availability at the chosen medical institution.</li>
              <li>Confirm your commitment to the scheduled appointment.</li>
              <li>Allow the medical institution to allocate resources, staff, and materials for your visit.</li>
              <li>Prevent scheduling disruptions that may affect other patients.</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">1.2 Application</h3>
            <p>
              The deposit will be applied toward the final cost of treatment. Please note that the final treatment cost
              may differ from the initial estimate, depending on the medical institution&rsquo;s assessment and any
              changes to the treatment plan.
            </p>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">1.3 Deposit Agreement</h3>
            <p>
              By submitting a deposit payment, you confirm that you have reviewed and accepted this Policy, agree to the
              appointment terms, and understand the conditions under which the deposit may or may not be refundable.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">
              2. Payment Processing
            </h2>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">2.1 Payment Methods</h3>
            <p>
              AetherHeal accepts deposit payments via the following methods:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300 mt-3">
              <li>Credit cards (Visa, Mastercard, American Express, and other major networks)</li>
              <li>Debit cards</li>
              <li>Other international payment methods as available through our payment processing partners</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">2.2 Payment Providers</h3>
            <p>
              Payments are processed through secure, PCI-compliant third-party payment providers. AetherHeal does not
              directly store your full payment card details. All transactions are encrypted and handled in accordance
              with industry-standard security protocols.
            </p>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">2.3 Currency and International Fees</h3>
            <p>
              Payments are processed in the currency displayed at checkout. If your bank or card issuer uses a different
              base currency, currency conversion fees or foreign transaction fees may apply. These fees are determined by
              your financial institution and are not controlled or charged by AetherHeal.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">
              3. Appointment Confirmation
            </h2>
            <p>
              Your appointment is considered confirmed only after:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300 mt-3">
              <li>The medical institution has reviewed and approved your case for scheduling.</li>
              <li>The deposit payment has been successfully processed.</li>
            </ul>
            <p className="mt-4">
              Once confirmed, the medical institution may begin preparation for your visit, including but not limited to
              reviewing your medical records, coordinating specialist availability, and reserving treatment-specific
              resources.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">
              4. Appointment Rescheduling Policy
            </h2>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">4.1 First Schedule Change</h3>
            <p>
              You may reschedule your appointment one (1) time at no additional cost, provided that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300 mt-3">
              <li>The rescheduling request is made at least 7 calendar days before the original appointment date.</li>
              <li>The new appointment date is within a reasonable timeframe as determined by the medical institution&rsquo;s availability.</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">4.2 Second Schedule Change</h3>
            <p>
              A second rescheduling request is not permitted. If you are unable to attend the rescheduled appointment,
              the booking will be treated as a cancellation, and the applicable cancellation and refund terms in this
              Policy will apply.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">
              5. Cancellation Policy
            </h2>
            <p>
              If you wish to cancel your appointment, please contact AetherHeal as soon as possible. Cancellation
              requests should be submitted in writing via email to{" "}
              <a href="mailto:support@aetherheal.com" className="text-brand-navy underline underline-offset-2 hover:text-brand-gold transition-colors">
                support@aetherheal.com
              </a>.
            </p>
            <p className="mt-4">
              The refundability of your deposit depends on the timing of cancellation and the extent to which the medical
              institution has begun preparation for your visit. Specific refund conditions are detailed in Section 6
              below.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">
              6. Refund Conditions
            </h2>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">6.1 Cancellation Before Medical Preparation Begins</h3>
            <p>
              If you cancel your appointment before the medical institution has initiated any preparation (e.g., no
              records have been reviewed, no resources have been reserved):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300 mt-3">
              <li>Your deposit is refundable.</li>
              <li>A reasonable administrative processing fee may be deducted from the refund amount.</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">6.2 Cancellation After Case Review or Resource Allocation</h3>
            <p>
              If the medical institution has already begun reviewing your medical records, coordinating specialists, or
              allocating treatment-specific resources:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300 mt-3">
              <li>Your deposit may be partially or fully non-refundable, depending on the extent of preparation completed.</li>
              <li>AetherHeal will make reasonable efforts to communicate the non-refundable portion before finalizing the cancellation.</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">6.3 Cancellation After First Rescheduling</h3>
            <p>
              If you cancel after having already used your one-time free rescheduling:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300 mt-3">
              <li>The deposit is generally non-refundable, as the medical institution has accommodated multiple scheduling changes.</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">6.4 No-Show Policy</h3>
            <p>
              If you fail to attend the scheduled appointment without prior notice:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300 mt-3">
              <li>The full deposit amount is forfeited.</li>
              <li>No refund will be issued.</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">6.5 Cancellation Initiated by the Medical Institution</h3>
            <p>
              In the event that the medical institution cancels your appointment due to operational reasons, scheduling
              conflicts, or other institutional decisions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300 mt-3">
              <li>AetherHeal will assist you in rescheduling with the same or an alternative institution, or</li>
              <li>A full refund of your deposit will be issued.</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">6.6 Medical Ineligibility</h3>
            <p>
              If, after case review, the medical institution determines that you are not eligible for the requested
              treatment:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-body marker:text-slate-300 mt-3">
              <li>A full refund of your deposit will be issued, unless administrative processing has already occurred, in which case a reasonable fee may be deducted.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">
              7. Refund Processing
            </h2>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">7.1 Method</h3>
            <p>
              All approved refunds will be returned to the original payment method used at the time of the deposit.
            </p>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">7.2 Timeline</h3>
            <p>
              Refunds are typically processed within 5 to 15 business days from the date the refund is approved. The
              actual time for the refund to appear in your account may vary depending on your financial institution.
            </p>

            <h3 className="text-lg font-semibold text-text-deep mt-8 mb-3">7.3 Transaction Fees</h3>
            <p>
              Any third-party transaction fees (e.g., payment gateway fees, currency conversion fees) incurred during
              the original payment may not be refundable, as these are charged by external payment processors and are
              outside of AetherHeal&rsquo;s control.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">
              8. Payment Disputes and Chargebacks
            </h2>
            <p>
              If you believe a payment was processed in error or wish to dispute a charge, please contact AetherHeal at{" "}
              <a href="mailto:support@aetherheal.com" className="text-brand-navy underline underline-offset-2 hover:text-brand-gold transition-colors">
                support@aetherheal.com
              </a>{" "}
              before initiating a chargeback through your bank or card issuer. We are committed to resolving payment
              concerns promptly and fairly.
            </p>
            <p className="mt-4">
              Initiating a chargeback without first contacting AetherHeal may result in delays in resolution and may
              affect your ability to use our services in the future.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">
              9. Policy Updates
            </h2>
            <p>
              AetherHeal reserves the right to update or modify this Policy at any time. Any changes will be posted on
              our website with a revised &ldquo;Last Updated&rdquo; date. Continued use of our services after changes
              are posted constitutes your acceptance of the revised Policy. We encourage you to review this Policy
              periodically.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy mt-12 mb-6 pb-2 border-b border-slate-100">
              10. Contact Information
            </h2>
            <p>
              For questions, concerns, or requests related to payments, deposits, or refunds, please contact us:
            </p>
            <div className="mt-4 p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-[15px]">
              <p className="font-semibold text-brand-navy">AetherHeal Co., Ltd.</p>
              <p>
                Email:{" "}
                <a href="mailto:support@aetherheal.com" className="text-brand-navy underline underline-offset-2 hover:text-brand-gold transition-colors">
                  support@aetherheal.com
                </a>
              </p>
              <p>
                Website:{" "}
                <a href="https://www.aetherheal.com" className="text-brand-navy underline underline-offset-2 hover:text-brand-gold transition-colors">
                  www.aetherheal.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </article>
    </div>
  )
}
