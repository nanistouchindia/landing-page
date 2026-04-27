import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Return to Nani's Touch home page.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FDFAF7] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/6 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-peach/6 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-lg">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-brand-teal rounded-full p-1.5 flex items-center justify-center">
            <Image src="/Logo-removebg-preview.png" alt="Nani's Touch" width={40} height={40} className="object-contain" />
          </div>
          <span className="font-serif text-xl font-bold text-brand-teal">Nani&apos;s Touch</span>
        </Link>

        {/* 404 illustration */}
        <div className="mb-8 relative">
          <div className="font-serif text-[9rem] font-bold text-brand-teal/10 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-brand-teal/10 flex items-center justify-center">
              <svg className="w-12 h-12 text-brand-teal" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-teal mb-3">
          Oops! Page not found
        </h1>
        <p className="text-brand-slate/60 text-base leading-relaxed mb-10">
          The page you&apos;re looking for seems to have wandered off — much like a tired new mom at 3 AM.
          Let&apos;s get you back home.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            href="/"
            className="bg-brand-teal text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-brand-teal/90 transition-colors shadow-md"
          >
            Back to Home
          </Link>
          <a
            href="https://wa.me/919112618112?text=Hi%20Nani's%20Touch!%20I%20need%20some%20help."
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-brand-teal text-brand-teal px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-brand-teal hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Quick links */}
        <div className="border-t border-brand-teal/10 pt-8">
          <p className="text-xs text-brand-slate/40 uppercase tracking-widest font-semibold mb-4">
            You might be looking for
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <Link href="/#packages" className="text-brand-teal hover:text-brand-peach transition-colors font-medium">Packages &amp; Pricing</Link>
            <span className="text-brand-slate/20">·</span>
            <Link href="/#faq" className="text-brand-teal hover:text-brand-peach transition-colors font-medium">FAQ</Link>
            <span className="text-brand-slate/20">·</span>
            <Link href="/privacy-policy" className="text-brand-teal hover:text-brand-peach transition-colors font-medium">Privacy Policy</Link>
            <span className="text-brand-slate/20">·</span>
            <Link href="/terms" className="text-brand-teal hover:text-brand-peach transition-colors font-medium">Terms</Link>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="absolute bottom-0 w-full bg-brand-teal/5 border-t border-brand-teal/8 py-4 text-xs text-brand-slate/40 text-center">
        &copy; 2026 Nani&apos;s Touch · Pune, India
      </div>
    </main>
  );
}
