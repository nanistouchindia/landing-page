"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#FDFAF7] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/6 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-peach/6 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-lg">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-brand-teal rounded-full p-1.5 flex items-center justify-center">
            <img
              src="/Logo-removebg-preview.png"
              alt="Nani's Touch"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-serif text-xl font-bold text-brand-teal">Nani&apos;s Touch</span>
        </Link>

        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-brand-peach/10 flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-brand-peach" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-teal mb-3">
          Something went wrong
        </h1>
        <p className="text-brand-slate/60 text-base leading-relaxed mb-10">
          We hit an unexpected error. Our team has been notified. Please try again — or reach us on WhatsApp if the issue persists.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <button
            onClick={reset}
            className="bg-brand-teal text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-brand-teal/90 transition-colors shadow-md"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border-2 border-brand-teal text-brand-teal px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-brand-teal hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <a
          href="https://wa.me/919112618112?text=Hi%20Nani's%20Touch!%20I%20encountered%20an%20error%20on%20the%20website."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-brand-slate/50 hover:text-brand-teal transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          Report issue on WhatsApp
        </a>
      </div>

      {/* Footer strip */}
      <div className="absolute bottom-0 w-full bg-brand-teal/5 border-t border-brand-teal/8 py-4 text-xs text-brand-slate/40 text-center">
        &copy; 2026 Nani&apos;s Touch · Pune, India
      </div>
    </main>
  );
}
