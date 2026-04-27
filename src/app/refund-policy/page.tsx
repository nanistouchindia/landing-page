import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Understand Nani's Touch refund and cancellation policy for Japa care packages in Pune.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF7]">
      {/* Header */}
      <div className="bg-brand-teal text-white">
        <div className="container mx-auto px-6 max-w-4xl py-14">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Refund &amp; Cancellation Policy</h1>
          <p className="text-white/65 text-sm">Last updated: April 2026</p>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-6 max-w-4xl py-14">
        <div className="bg-white rounded-2xl shadow-sm border border-brand-teal/8 p-8 md:p-12 space-y-8 text-brand-slate">

          <section>
            <p className="text-brand-slate/75 leading-relaxed bg-brand-teal/5 border border-brand-teal/15 rounded-xl px-5 py-4">
              We understand that welcoming a new baby comes with many uncertainties. Our cancellation policy is designed
              to be fair to both our clients and our caregivers who rely on scheduled work.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">1. Booking Advance</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              A non-refundable booking advance is required to confirm your package and reserve a caregiver for your
              expected due date. This advance holds your slot and is adjusted against the total package fee.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">2. Cancellation by Client</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-brand-slate/75 border-collapse mt-2">
                <thead>
                  <tr className="bg-brand-teal/8">
                    <th className="text-left px-4 py-3 rounded-tl-lg font-semibold text-brand-slate">Cancellation Timing</th>
                    <th className="text-left px-4 py-3 rounded-tr-lg font-semibold text-brand-slate">Refund Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-brand-teal/8">
                    <td className="px-4 py-3">More than 14 days before start date</td>
                    <td className="px-4 py-3 text-green-700 font-medium">75% of amount paid (advance non-refundable)</td>
                  </tr>
                  <tr className="border-b border-brand-teal/8 bg-brand-teal/3">
                    <td className="px-4 py-3">7–14 days before start date</td>
                    <td className="px-4 py-3 text-yellow-700 font-medium">50% of amount paid</td>
                  </tr>
                  <tr className="border-b border-brand-teal/8">
                    <td className="px-4 py-3">Less than 7 days before start date</td>
                    <td className="px-4 py-3 text-red-700 font-medium">No refund</td>
                  </tr>
                  <tr className="bg-brand-teal/3">
                    <td className="px-4 py-3">After sessions have begun</td>
                    <td className="px-4 py-3 text-red-700 font-medium">No refund for completed sessions; partial credit for remaining sessions (case-by-case)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">3. Medical Emergency Exception</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              If a cancellation is required due to a documented medical emergency affecting the mother or newborn,
              we will review refund eligibility on a case-by-case basis with compassion. Please contact us as soon
              as possible with relevant documentation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">4. Cancellation by Nani&apos;s Touch</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              In the unlikely event that we need to cancel your booking (due to caregiver unavailability or force
              majeure), you will receive:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-brand-slate/75 mt-3">
              <li>A full refund of all amounts paid, <strong>or</strong></li>
              <li>The option to reschedule with a priority booking at no extra cost.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">5. Missed Sessions</h2>
            <p className="text-brand-slate/75 leading-relaxed mb-3">
              Our <strong>Missed Session Guarantee</strong> (Silver, Gold, Platinum packages) works as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-brand-slate/75">
              <li>Sessions missed due to our caregiver&apos;s absence are rescheduled at no extra cost.</li>
              <li>Sessions missed by the client with less than 4 hours notice may be forfeited.</li>
              <li>Accumulated unused sessions may be extended beyond the package duration at our discretion.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">6. How to Request a Refund</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              To request a cancellation or refund, please contact us via:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-brand-slate/75 mt-3">
              <li>WhatsApp: <a href="https://wa.me/919112618112" className="text-brand-teal hover:underline">+91 91126 18112</a></li>
              <li>Email: <a href="mailto:support@nanistouch.in" className="text-brand-teal hover:underline">support@nanistouch.in</a></li>
            </ul>
            <p className="text-brand-slate/75 leading-relaxed mt-3">
              Approved refunds are processed within <strong>7–10 business days</strong> to the original payment method.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">7. Add-On Services</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              Add-on services (Dhuri Snaan, herbal bath kit, lactation consultant visits, etc.) are non-refundable
              once scheduled or materials have been sourced. Please confirm add-ons carefully before payment.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">8. Contact Us</h2>
            <address className="not-italic text-brand-slate/75 leading-relaxed">
              <strong>Nani&apos;s Touch</strong><br />
              Pune, Maharashtra, India<br />
              Email: <a href="mailto:support@nanistouch.in" className="text-brand-teal hover:underline">support@nanistouch.in</a><br />
              WhatsApp: <a href="https://wa.me/919112618112" className="text-brand-teal hover:underline">+91 91126 18112</a>
            </address>
          </section>

        </div>
      </article>

      {/* Footer strip */}
      <div className="bg-brand-teal text-white/50 text-xs text-center py-4">
        &copy; 2026 Nani&apos;s Touch · Pune, India ·{" "}
        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
        {" · "}
        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
      </div>
    </main>
  );
}
