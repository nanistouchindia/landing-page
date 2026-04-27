import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read Nani's Touch privacy policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
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
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-white/65 text-sm">Last updated: April 2026</p>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-6 max-w-4xl py-14 prose prose-slate max-w-none">
        <div className="bg-white rounded-2xl shadow-sm border border-brand-teal/8 p-8 md:p-12 space-y-8 text-brand-slate">

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">1. Introduction</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              Welcome to Nani&apos;s Touch (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). We are committed to protecting the personal information
              of our clients and website visitors. This Privacy Policy explains what information we collect, how we use it,
              and your rights regarding your data when you use our website at <strong>nanistouch.in</strong> or engage with
              our Japa care services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">2. Information We Collect</h2>
            <p className="text-brand-slate/75 leading-relaxed mb-3">We may collect the following categories of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-brand-slate/75">
              <li><strong>Personal identification:</strong> Name, phone number (WhatsApp), and email address when you fill out our waitlist or contact form.</li>
              <li><strong>Service information:</strong> Expected due date, locality/area in Pune, and package preference to match you with the right care plan.</li>
              <li><strong>Usage data:</strong> Browser type, pages visited, and referral source collected automatically via Google Analytics.</li>
              <li><strong>Communication records:</strong> WhatsApp messages or emails you send us for service coordination.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-brand-slate/75">
              <li>To contact you about our Japa care packages and schedule sessions.</li>
              <li>To send service reminders, care tips, and session logs via WhatsApp.</li>
              <li>To improve our website and services using aggregated analytics data.</li>
              <li>To comply with applicable laws and regulations in India.</li>
            </ul>
            <p className="text-brand-slate/75 leading-relaxed mt-3">
              We do <strong>not</strong> sell, rent, or share your personal data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">4. Data Storage &amp; Security</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              Your data is stored securely using Supabase (PostgreSQL database with row-level security). We implement
              industry-standard measures including encrypted connections (HTTPS), access controls, and regular security reviews.
              However, no digital transmission is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">5. Cookies &amp; Tracking</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              We use Google Analytics to understand how visitors interact with our website. This may set cookies on your
              browser. You can opt out of Google Analytics tracking by installing the{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer"
                className="text-brand-teal hover:underline">Google Analytics Opt-out Browser Add-on</a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">6. Your Rights</h2>
            <p className="text-brand-slate/75 leading-relaxed mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-brand-slate/75">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your data (subject to legal obligations).</li>
              <li>Withdraw consent for marketing communications at any time.</li>
            </ul>
            <p className="text-brand-slate/75 leading-relaxed mt-3">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:support@nanistouch.in" className="text-brand-teal hover:underline">support@nanistouch.in</a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">7. Children&apos;s Privacy</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              Our services are provided to new mothers and caregivers. We do not knowingly collect personal information
              directly from children under 18. Information about newborns is only collected as part of the care service
              and is treated with the same privacy protections.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">8. Changes to This Policy</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated date.
              Continued use of our services after any changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-brand-teal mb-3">9. Contact Us</h2>
            <p className="text-brand-slate/75 leading-relaxed">
              For any privacy-related queries, please reach out:
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
        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        {" · "}
        <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
      </div>
    </main>
  );
}
