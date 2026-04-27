import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the Terms of Service for Nani's Touch Japa care services in Pune.",
};

export default function TermsPage() {
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
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Terms of Service</h1>
          <p className="text-white/65 text-sm">Last updated: April 2026</p>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-6 max-w-4xl py-14">
        <div className="bg-white rounded-2xl shadow-sm border border-brand-teal/8 p-8 md:p-12 space-y-8 text-brand-slate">

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">1. Agreement to Terms</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              By booking or using any service from Nani&apos;s Touch (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;), you agree to be bound by
              these Terms of Service. If you do not agree to these terms, please do not use our services.
              These terms apply to all clients, visitors, and users of our website and services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">2. Our Services</h2>
            <p className="text-brand-slate/75 leading-relaxed mb-3">
              Nani&apos;s Touch provides in-home postpartum Japa care services in Pune, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-brand-slate/75">
              <li>Newborn baby massage (Maalish) using traditional Ayurvedic techniques</li>
              <li>Mother&apos;s postpartum massage and recovery care</li>
              <li>Dhuri Snaan (traditional smoke bath) for mother and baby</li>
              <li>Abdominal binding (Patti) for mothers</li>
              <li>Herbal baths and swaddling</li>
              <li>Lactation support and postpartum diet guidance (select packages)</li>
              <li>Full-day Japa maid services (Diamond package)</li>
            </ul>
            <p className="text-brand-slate/75 leading-relaxed mt-3">
              All our caregivers are trained and operate under pediatrician-certified protocols.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">3. Booking &amp; Payment</h2>
            <ul className="list-disc pl-6 space-y-2 text-brand-slate/75">
              <li>All bookings are confirmed only upon receipt of the advance payment as discussed with our team.</li>
              <li>Pricing is as listed on our packages page and is subject to change. Confirmed bookings are honored at the quoted price.</li>
              <li>Payments can be made via UPI, bank transfer, or other methods communicated by our team.</li>
              <li>Session start dates are mutually agreed upon after baby&apos;s arrival and the client&apos;s discharge from hospital.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">4. Client Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 text-brand-slate/75">
              <li>Provide a safe, clean, and accessible environment for the caregiver.</li>
              <li>Inform us of any medical conditions, allergies, or special requirements of the mother or baby before sessions begin.</li>
              <li>Ensure a responsible adult is present at home during all sessions.</li>
              <li>Follow advice and recommendations given by our trained caregivers in good faith.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">5. Missed Sessions &amp; Rescheduling</h2>
            <ul className="list-disc pl-6 space-y-2 text-brand-slate/75">
              <li>Missed sessions due to caregiver unavailability will be rescheduled at no extra cost under our Missed Session Guarantee.</li>
              <li>Sessions missed by the client with less than 4 hours notice may be counted as completed at the Company&apos;s discretion.</li>
              <li>We allow reasonable rescheduling requests — please contact us via WhatsApp at least 2 hours before a session.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">6. Health &amp; Safety</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              Our caregivers follow strict hygiene protocols. If either the caregiver or the baby/mother shows signs of illness,
              the session may be postponed to protect everyone&apos;s well-being. Nani&apos;s Touch is not a substitute for medical advice —
              please consult your pediatrician or OB-GYN for medical concerns.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">7. Limitation of Liability</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              Nani&apos;s Touch provides care services to the best of our ability. We are not liable for any indirect, incidental,
              or consequential damages arising from the use of our services. Our total liability shall not exceed the amount
              paid by the client for the specific service in question.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">8. Intellectual Property</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              All content on this website — including text, images, logos, and branding — is the intellectual property of
              Nani&apos;s Touch. You may not reproduce, distribute, or create derivative works without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">9. Governing Law</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction
              of the courts in Pune, Maharashtra.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">10. Contact</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              For any questions about these terms:
            </p>
            <address className="not-italic mt-3 text-brand-slate/75 leading-relaxed">
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
        <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
      </div>
    </main>
  );
}
