"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [navOpacity, setNavOpacity] = useState(0);
  const [slots, setSlots] = useState(4);
  const [slotsFontWeight, setSlotsFontWeight] = useState("semibold");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavOpacity(window.scrollY > 20 ? 1 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.97 && slots > 1) {
        setSlots((prev) => {
          if (prev > 1) return prev - 1;
          return prev;
        });
        setSlotsFontWeight("900");
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [slots]);

  return (
    <main>
      {/* ── Waitlist Popup ──────────────────────────────────── */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-brand-slate/60 backdrop-blur-sm transition-opacity" onClick={() => setShowPopup(false)}></div>
          
          <div className="relative w-full max-w-4xl bg-brand-cream rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-[fadeUp_0.5s_ease-out]">
            {/* Close button */}
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-brand-slate backdrop-blur-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left: Reel Video Placeholder */}
            <div className="w-full md:w-5/12 h-[300px] md:h-auto relative bg-brand-teal overflow-hidden flex-shrink-0">
               {/* Subtle pattern or image placeholder */}
               <img src="/Logo-removebg-preview.png" className="absolute -left-10 -bottom-10 w-64 h-64 opacity-10 object-contain" alt="" />
               
               <div className="absolute inset-0 bg-gradient-to-t from-brand-slate/80 via-transparent to-brand-slate/20"></div>
               
               {/* Reel UI Elements */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
               </div>
               <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-peach animate-pulse"></span>
                    Live Care
                  </div>
                  <h3 className="text-white font-serif text-2xl font-semibold leading-snug mb-1">Experience the <br/>Nani's Touch</h3>
                  <p className="text-white/80 text-sm font-light">See why 500+ mothers trust our process.</p>
               </div>
            </div>

            {/* Right: Form */}
            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-brand-peach font-bold text-xs uppercase tracking-widest mb-2">Exclusive Waitlist</div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-teal font-semibold mb-3">Secure Your Slot</h2>
              <p className="text-brand-slate/60 text-sm mb-8 leading-relaxed">
                Our specialized Japa care slots fill up weeks in advance. Join the waitlist today to get priority booking and an exclusive consultation.
              </p>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setShowPopup(false); }}>
                <div>
                  <label className="block text-xs font-semibold text-brand-slate uppercase tracking-wider mb-1.5">Mother's Name</label>
                  <input type="text" required placeholder="e.g. Priya Sharma" className="w-full px-4 py-3 rounded-xl bg-white border border-brand-teal/10 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all placeholder:text-brand-slate/30 text-sm text-brand-slate" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-slate uppercase tracking-wider mb-1.5">WhatsApp Number</label>
                  <input type="tel" required placeholder="+91 99999 99999" className="w-full px-4 py-3 rounded-xl bg-white border border-brand-teal/10 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all placeholder:text-brand-slate/30 text-sm text-brand-slate" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-slate uppercase tracking-wider mb-1.5">Location (Pune)</label>
                  <textarea required placeholder="Your address or area..." rows={2} className="w-full px-4 py-3 rounded-xl bg-white border border-brand-teal/10 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all placeholder:text-brand-slate/30 text-sm text-brand-slate resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-brand-peach text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-brand-peach/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 btn-glow">
                  Join Priority Waitlist
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
              <p className="text-center text-[10px] text-brand-slate/40 mt-5">We respect your privacy. No spam, ever.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Scarcity Bar (top) ──────────────────────────────────── */}
      <div className="scarcity-bar text-white text-center py-2.5 text-xs font-semibold tracking-wide">
        <span className="opacity-90">
          ⚡ Only <span id="slots-count" style={{ fontWeight: slotsFontWeight }}>{slots}</span> new family slots remaining in Pune this week —
        </span>
        <a href="#packages" className="underline font-bold">Secure yours now →</a>
      </div>


  

  {/* ── Navigation ──────────────────────────────────────────── */}
  <nav className={`fixed w-full z-50 transition-all duration-300 ${navOpacity === 1 ? 'top-0' : 'top-8'}`} id="navbar">
    <div
      className="absolute inset-0 bg-brand-cream/92 backdrop-blur-md border-b border-brand-teal/8 shadow-sm transition-all"
      id="nav-bg" style={{ opacity: navOpacity }}></div>
    <div className="container mx-auto px-6 py-4 relative z-10 flex justify-between items-center max-w-7xl">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-brand-teal rounded-full p-1 flex items-center justify-center">
          <img src="/Logo-removebg-preview.png" alt="Nani's Touch" className="w-full h-full object-contain" />
        </div>
        <span className="font-serif text-xl font-bold text-brand-teal">Nani's Touch</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-slate">
        <a href="#why" className="hover:text-brand-peach transition-colors">Why Us</a>
        <a href="#science" className="hover:text-brand-peach transition-colors">The Science</a>
        <a href="#stories" className="hover:text-brand-peach transition-colors">Stories</a>
        <a href="#packages" className="hover:text-brand-peach transition-colors">Packages</a>
      </div>
      <a href="https://wa.me/919999999999?text=Hi%20Nani's%20Touch!%20I'd%20like%20to%20book%20a%20session."
        target="_blank"
        className="bg-brand-peach text-white px-5 py-2.5 rounded-full font-semibold text-sm btn-glow transition-all flex items-center gap-2 shadow-md">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        Book Now
      </a>
    </div>
  </nav>

  {/* ── Hero ────────────────────────────────────────────────── */}
  <section className="relative min-h-[100svh] flex items-center pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
    {/* Background wash */}
    <div
      className="absolute top-0 right-0 w-[700px] h-[700px] bg-brand-lightTeal rounded-full blur-3xl opacity-60 -translate-y-1/3 translate-x-1/4 pointer-events-none">
    </div>
    <div
      className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-peach/6 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none">
    </div>

    <div className="container mx-auto px-6 max-w-7xl relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Left: Text */}
        <div className="opacity-0 fade-up">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/8 border border-brand-teal/15 text-brand-teal text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-peach" style={{"animation": "pulse-soft 2s infinite"}}></span>
            Now in Pune
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-[4.2rem] text-brand-teal font-bold leading-[1.08] mb-6"
            style={{"textWrap": "pretty"}}>
            Your baby's first touch<br />
            <span className="text-brand-peach italic">deserves more than</span><br />
            a stranger's guess.
          </h1>

          <p className="text-lg text-brand-slate/75 font-light leading-relaxed mb-4 max-w-lg">
            You've read every article. You've asked every doctor. Now give your newborn what no Google search can —
            <strong className="font-semibold text-brand-teal">the right hands, on the right nerves, in the right
              way.</strong>
          </p>
          <p className="text-sm text-brand-slate/55 font-medium mb-10 max-w-lg">
            Pediatrician-certified Japa care, delivered to your home in a 2-hour daily session. No live-in stranger. No
            guesswork. No fear.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start mb-10">
            <a href="#packages"
              className="bg-brand-teal text-white px-8 py-4 rounded-full font-semibold text-base btn-teal transition-all text-center shadow-lg w-full sm:w-auto">
              See Packages & Pricing
            </a>
            <a href="#science"
              className="flex items-center gap-2 text-brand-teal font-semibold text-base px-4 py-4 hover:text-brand-peach transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Why the first 40 days matter
            </a>
          </div>

          {/* Social proof strip */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              {/* Stacked avatars */}
              <div className="flex -space-x-2">
                <div
                  className="w-8 h-8 rounded-full bg-brand-teal border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  S</div>
                <div
                  className="w-8 h-8 rounded-full bg-brand-peach border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  P</div>
                <div
                  className="w-8 h-8 rounded-full bg-[#0D5C75] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  A</div>
                <div
                  className="w-8 h-8 rounded-full bg-brand-slate border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  R</div>
              </div>
              <div>
                <div className="text-xs font-bold text-brand-slate">500+ mothers</div>
                <div className="text-xs text-brand-slate/50">trusted us this year</div>
              </div>
            </div>
            <div className="h-8 w-px bg-brand-teal/15"></div>
            <div>
              <div className="flex text-brand-peach text-sm">★★★★★</div>
              <div className="text-xs text-brand-slate/50 mt-0.5">4.9 avg. satisfaction</div>
            </div>
            <div className="h-8 w-px bg-brand-teal/15"></div>
            <div>
              <div className="text-xs font-bold text-brand-slate">Pediatrician</div>
              <div className="text-xs text-brand-slate/50">certified protocols</div>
            </div>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="relative opacity-0 fade-up delay-2 flex justify-center lg:justify-end">
          {/* Main hero illustration: mother holding baby, brand style */}
          <div className="relative w-full max-w-[460px]">

            {/* Large teal circle bg */}
            <div className="absolute inset-0 rounded-[3rem] bg-brand-teal overflow-hidden">
              {/* Subtle dot texture */}
              <div className="absolute inset-0"
                style={{"backgroundImage": "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.06) 1px, transparent 0)", "backgroundSize": "22px 22px"}}>
              </div>
              {/* Organic warm blobs */}
              <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full"
                style={{"background": "rgba(224,122,95,0.12)"}}></div>
              <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full" style={{"background": "rgba(255,255,255,0.04)"}}>
              </div>
            </div>

            {/* SVG Illustration: mother + baby, monoline brand style */}
            <div className="relative z-10 p-12 flex flex-col items-center">

              <img src="/Logo-removebg-preview.png" className="w-full hero-blob float z-10" />

              {/* Logo watermark at bottom */}
              <div className="flex items-center gap-2 opacity-50 mt-2">
                <img src="/Logo-removebg-preview.png" className="w-5 h-5 object-contain" />
                <span className="font-serif text-white text-sm font-semibold tracking-wide">Nani's Touch</span>
              </div>
            </div>

            {/* Floating badge: sessions booked today */}
            <div
              className="absolute -left-8 top-16 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 float border border-brand-teal/10">
              <div
                className="w-9 h-9 bg-brand-lightTeal rounded-xl flex items-center justify-center text-brand-teal flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] text-brand-slate/50 uppercase tracking-wider font-bold">Booked today</div>
                <div className="text-sm font-bold text-brand-teal">3 families in Pune</div>
              </div>
            </div>

            {/* Floating badge: safety */}
            <div
              className="absolute -right-8 bottom-24 bg-brand-teal rounded-2xl shadow-xl p-3.5 flex items-center gap-3 z-50"
              style={{"animation": "float 5s ease-in-out infinite", "animationDelay": "-2.5s"}}>
              <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] text-brand-lightTeal/60 uppercase tracking-wider font-bold">WHO protocols</div>
                <div className="text-sm font-bold text-white">Clinically verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ── The 40-Day Science Section ──────────────────────────── */}
  <section id="science" className="py-24 bg-brand-teal text-white relative overflow-hidden">
    <div
      className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/4 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none">
    </div>
    <div
      className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-peach/10 rounded-full blur-3xl pointer-events-none">
    </div>

    <div className="container mx-auto px-6 max-w-7xl relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block text-brand-peach font-bold text-xs uppercase tracking-widest mb-4">The science your
            doctor hasn't told you</div>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold leading-tight mb-6">
            The first 40 days<br />
            <span className="italic text-brand-peach">shape your baby's brain</span><br />
            for life.
          </h2>
          <p className="text-brand-lightTeal/80 text-lg font-light leading-relaxed mb-8">
            This isn't tradition for tradition's sake. The postpartum period is when your baby's neural pathways are
            most plastic — touch, rhythm, and warmth during <em>maalish</em> directly influence neurological
            development.
          </p>
          <p className="text-brand-lightTeal/70 leading-relaxed border-l-4 border-brand-peach pl-6 text-sm font-medium">
            "Gentle abdominal strokes stimulate the Vagus Nerve, aiding digestion and triggering the parasympathetic
            nervous system — the 'rest and digest' state that helps newborns sleep longer and deeper."
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {/* Stat 1 */}
          <div className="bg-white/8 rounded-2xl p-6 border border-white/10 flex gap-5 items-start">
            <div className="flex-shrink-0 w-14 h-14 bg-brand-peach/20 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-brand-peach" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-white mb-1">47% <span
                  className="text-lg text-brand-lightTeal/60 font-normal font-sans">reduction</span></div>
              <div className="text-brand-lightTeal/70 text-sm leading-relaxed">in postpartum depression risk with consistent
                daily massage and maternal physical care. <span className="text-brand-peach font-medium">Your mental health
                  matters too.</span></div>
            </div>
          </div>
          {/* Stat 2 */}
          <div className="bg-white/8 rounded-2xl p-6 border border-white/10 flex gap-5 items-start">
            <div className="flex-shrink-0 w-14 h-14 bg-brand-lightTeal/20 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-brand-lightTeal" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-white mb-1">2× <span
                  className="text-lg text-brand-lightTeal/60 font-normal font-sans">longer sleep</span></div>
              <div className="text-brand-lightTeal/70 text-sm leading-relaxed">Newborns who receive daily structured maalish
                fall asleep faster and sleep longer. An exhausted mother's most urgent need.</div>
            </div>
          </div>
          {/* Stat 3 */}
          <div className="bg-white/8 rounded-2xl p-6 border border-white/10 flex gap-5 items-start">
            <div className="flex-shrink-0 w-14 h-14 bg-brand-peach/20 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-brand-peach" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-white mb-1">0 <span
                  className="text-lg text-brand-lightTeal/60 font-normal font-sans">injuries reported</span></div>
              <div className="text-brand-lightTeal/70 text-sm leading-relaxed">Across 500+ Nani's Touch sessions. Our
                pediatrician-mapped techniques eliminate the risk of joint damage from aggressive unverified pulling.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ── Fear Bridge: What you're risking ───────────────────── */}
  <section id="why" className="py-24 bg-white relative">
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-brand-peach font-bold text-xs uppercase tracking-widest mb-3">The unspoken risk</div>
        <h2 className="font-serif text-4xl md:text-5xl text-brand-teal font-semibold mb-5" style={{"textWrap": "pretty"}}>
          You're an educated, careful mother.<br />
          <span className="italic text-brand-peach">Don't let the wrong hands undo that.</span>
        </h2>
        <p className="text-brand-slate/65 text-lg font-light leading-relaxed">
          Every day, well-meaning but unvetted workers apply techniques that pediatricians warn can cause joint
          misalignment in newborns under 12 weeks.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* The Risk column */}
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
          <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Without Nani's Touch</div>
          <div className="space-y-5">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5"><svg
                  className="w-3 h-3 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg></div>
              <div>
                <div className="text-brand-slate/80 text-sm leading-relaxed">Unverified worker you found through a neighbour
                  — no background check, no accountability.</div>
                <div className="text-red-400 text-xs font-semibold mt-1">The stranger you can't say no to.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5"><svg
                  className="w-3 h-3 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg></div>
              <div>
                <div className="text-brand-slate/80 text-sm leading-relaxed">Harsh pulling and stretching of newborn limbs —
                  a tradition no pediatrician endorses.</div>
                <div className="text-red-400 text-xs font-semibold mt-1">Your baby's developing joints at risk.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5"><svg
                  className="w-3 h-3 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg></div>
              <div>
                <div className="text-brand-slate/80 text-sm leading-relaxed">Reused oils, unwashed hands, no uniform —
                  infections in a baby with zero immunity.</div>
                <div className="text-red-400 text-xs font-semibold mt-1">The hygiene risk no one talks about.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5"><svg
                  className="w-3 h-3 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg></div>
              <div>
                <div className="text-brand-slate/80 text-sm leading-relaxed">She disappears one morning. No backup. Your
                  recovery stops.</div>
                <div className="text-red-400 text-xs font-semibold mt-1">The reliability crisis at your most vulnerable.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Solution column */}
        <div className="bg-brand-lightTeal/30 rounded-3xl p-8 border border-brand-teal/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-brand-teal rounded-r-none"></div>
          <div className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-6">With Nani's Touch</div>
          <div className="space-y-5">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0 mt-0.5"><svg
                  className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd" />
                </svg></div>
              <div>
                <div className="text-brand-slate font-medium text-sm leading-relaxed">Background-checked, medically screened
                  professional. You see her ID before she enters your home.</div>
                <div className="text-brand-teal text-xs font-bold mt-1">Complete transparency.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0 mt-0.5"><svg
                  className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd" />
                </svg></div>
              <div>
                <div className="text-brand-slate font-medium text-sm leading-relaxed">Pediatrician-mapped, anatomically safe
                  techniques. Gentle strokes that stimulate — never stress.</div>
                <div className="text-brand-teal text-xs font-bold mt-1">Your baby is safe.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0 mt-0.5"><svg
                  className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd" />
                </svg></div>
              <div>
                <div className="text-brand-slate font-medium text-sm leading-relaxed">Fresh sanitised uniform every visit.
                  Doctor-approved hypoallergenic oils. Disposable aprons.</div>
                <div className="text-brand-teal text-xs font-bold mt-1">Clinical hygiene guaranteed.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0 mt-0.5"><svg
                  className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd" />
                </svg></div>
              <div>
                <div className="text-brand-slate font-medium text-sm leading-relaxed">Guaranteed replacement within 24 hours
                  if your Nani is unavailable. No gap in care.</div>
                <div className="text-brand-teal text-xs font-bold mt-1">Reliability you can rely on.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ── How a Session Works (Visual Process) ─────────────────── */}
  <section className="py-20 bg-brand-cream border-t border-brand-teal/5">
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="text-center mb-14">
        <div className="text-brand-peach font-bold text-xs uppercase tracking-widest mb-3">What actually happens</div>
        <h2 className="font-serif text-4xl text-brand-teal font-semibold">A day with your Nani</h2>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-brand-lightTeal rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-teal opacity-60">8:55 AM</div>
          <div><svg className="w-7 h-7 mb-3 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="font-serif text-xl font-semibold mb-2 text-brand-slate">She arrives</div>
            <div className="text-sm leading-relaxed text-brand-slate/70">Fresh uniform. Kit sanitised. Oils ready. She
              greets you — professional, warm, unhurried.</div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-brand-teal/8"></div>
        </div>
        <div className="bg-brand-teal rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-widest text-white opacity-70">9:00 AM</div>
          <div><svg className="w-7 h-7 mb-3 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <div className="font-serif text-xl font-semibold mb-2 text-white">Baby massage</div>
            <div className="text-sm leading-relaxed text-white opacity-80">Gentle vagus-nerve strokes. Anatomically mapped.
              Your baby relaxes visibly. You watch, reassured.</div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/10"></div>
        </div>
        <div className="bg-brand-peach rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-widest text-white opacity-70">9:45 AM</div>
          <div><svg className="w-7 h-7 mb-3 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <div className="font-serif text-xl font-semibold mb-2 text-white">Your turn</div>
            <div className="text-sm leading-relaxed text-white opacity-80">Postpartum massage for you. Back pain eased.
              Cortisol down. Oxytocin up. You actually exhale.</div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/10"></div>
        </div>
        <div className="bg-brand-lightTeal rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-teal opacity-60">11:00 AM</div>
          <div><svg className="w-7 h-7 mb-3 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <div className="font-serif text-xl font-semibold mb-2 text-brand-slate">She leaves</div>
            <div className="text-sm leading-relaxed text-brand-slate/70">Baby bathed. Both of you cared for. Privacy
              restored. Your home is yours again.</div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-brand-teal/8"></div>
        </div>
      </div>
    </div>
  </section>

  {/* ── Testimonials ────────────────────────────────────────── */}
  <section id="stories" className="py-24 bg-brand-teal relative overflow-hidden">
    <div className="absolute inset-0"
      style={{"backgroundImage": "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)", "backgroundSize": "28px 28px"}}>
    </div>
    <div className="container mx-auto px-6 max-w-7xl relative z-10">
      <div className="text-center mb-14">
        <div className="text-brand-peach font-bold text-xs uppercase tracking-widest mb-3">Real mothers. Real stories.</div>
        <h2 className="font-serif text-4xl text-brand-lightTeal font-semibold">They were exactly where you are.</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* T1 */}
        <div
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex flex-col gap-5 hover:bg-white/15 transition-colors">
          <div className="flex gap-1 text-brand-peach text-sm">★★★★★</div>
          <div className="quote-mark select-none">"</div>
          <p className="font-serif text-base leading-relaxed italic text-brand-lightTeal/90 -mt-6">
            I was 26, first baby, terrified. My mother-in-law kept suggesting her didi who 'pulled babies very hard for
            strong bones.' I Googled it at 2 AM — it's dangerous. Nani's Touch was the answer. Savita arrived so
            professionally. My baby now sleeps 5-hour stretches.
          </p>
          <div className="flex items-center gap-3 pt-2 border-t border-white/10">
            <div
              className="w-10 h-10 rounded-full bg-brand-peach flex items-center justify-center text-white font-bold font-serif">
              S</div>
            <div>
              <div className="text-white font-semibold text-sm">Sneha Rao, 27</div>
              <div className="text-brand-lightTeal/50 text-xs uppercase tracking-wide">Wakad, Pune · First-time mother</div>
            </div>
          </div>
        </div>

        {/* T2 — featured */}
        <div className="bg-white rounded-3xl p-8 flex flex-col gap-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-peach"></div>
          <div className="flex gap-1 text-brand-peach text-sm">★★★★★</div>
          <div className="quote-mark select-none" style={{"color": "rgba(18,90,111,0.1)"}}>"</div>
          <p className="font-serif text-base leading-relaxed italic text-brand-slate/80 -mt-6">
            My back pain after delivery was unbearable. Everyone said 'it's normal.' Nani's Touch said 'it shouldn't be
            normal.' After 10 sessions I was moving freely again. They genuinely care about the mother, not just the
            baby.
          </p>
          <div className="flex items-center gap-3 pt-2 border-t border-brand-teal/10">
            <div
              className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center text-white font-bold font-serif">
              P</div>
            <div>
              <div className="text-brand-slate font-semibold text-sm">Priya Mehta, 30</div>
              <div className="text-brand-slate/40 text-xs uppercase tracking-wide">Pune · Second child</div>
            </div>
          </div>
        </div>

        {/* T3 */}
        <div
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex flex-col gap-5 hover:bg-white/15 transition-colors">
          <div className="flex gap-1 text-brand-peach text-sm">★★★★★</div>
          <div className="quote-mark select-none">"</div>
          <p className="font-serif text-base leading-relaxed italic text-brand-lightTeal/90 -mt-6">
            We live in a 2BHK. A live-in was never an option. But I was so anxious about doing this alone. The 2-hour
            model changed everything — professional care, then she leaves. My home stayed our safe space. Worth every
            rupee of the 40-day package.
          </p>
          <div className="flex items-center gap-3 pt-2 border-t border-white/10">
            <div
              className="w-10 h-10 rounded-full bg-[#0D5C75] flex items-center justify-center text-white font-bold font-serif">
              A</div>
            <div>
              <div className="text-white font-semibold text-sm">Anjali Desai, 29</div>
              <div className="text-brand-lightTeal/50 text-xs uppercase tracking-wide">Koregaon Park, Pune</div>
            </div>
          </div>
        </div>
      </div>

      {/* Micro-testimonial strip */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/8 rounded-2xl p-4 border border-white/8">
          <p className="font-serif text-sm italic text-brand-lightTeal/80 leading-relaxed mb-2">"My colicky baby calmed
            within 3 sessions."</p>
          <div className="text-brand-peach text-xs font-semibold">— Ritika S., Powai</div>
        </div>
        <div className="bg-white/8 rounded-2xl p-4 border border-white/8">
          <p className="font-serif text-sm italic text-brand-lightTeal/80 leading-relaxed mb-2">"Finally slept more than 3
            hours."</p>
          <div className="text-brand-peach text-xs font-semibold">— Meghna K., Baner</div>
        </div>
        <div className="bg-white/8 rounded-2xl p-4 border border-white/8">
          <p className="font-serif text-sm italic text-brand-lightTeal/80 leading-relaxed mb-2">"The oils smell divine. Baby
            loves it."</p>
          <div className="text-brand-peach text-xs font-semibold">— Divya P., Viman Nagar</div>
        </div>
        <div className="bg-white/8 rounded-2xl p-4 border border-white/8">
          <p className="font-serif text-sm italic text-brand-lightTeal/80 leading-relaxed mb-2">"I cried the first session —
            relief."</p>
          <div className="text-brand-peach text-xs font-semibold">— Shruti M., Andheri</div>
        </div>
      </div>
    </div>
  </section>

  {/* ── Packages ────────────────────────────────────────────── */}
  <section id="packages" className="py-24 bg-brand-lightTeal/30 relative">
    {/* Urgency notice */}
    <div className="container mx-auto px-6 max-w-4xl mb-12">
      <div className="bg-brand-peach/10 border border-brand-peach/25 rounded-2xl p-4 flex items-center gap-4">
        <div className="w-8 h-8 bg-brand-peach/20 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-brand-peach" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-sm text-brand-slate/80">
          <strong className="text-brand-peach">Availability alert:</strong> Due to high demand, new bookings in Pune are
          filling fast. The earlier you book, the sooner your dedicated Nani is assigned — we recommend booking at
          <strong>week 36 of pregnancy</strong> or immediately after delivery.
        </div>
      </div>
    </div>

    <div className="container mx-auto px-6 max-w-4xl text-center">
      <div className="text-brand-peach font-bold text-xs uppercase tracking-widest mb-3">Transparent pricing. No surprises.
      </div>
      <h2 className="font-serif text-4xl md:text-5xl text-brand-teal font-semibold mb-4">Choose your programme</h2>
      <p className="text-brand-slate/60 mb-12 max-w-xl mx-auto text-lg font-light">Both packages include everything. The
        difference is time — and 40 days is the complete traditional <em>chilla</em> period for good reason.</p>

      <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
        {/* Package 1 */}
        <div
          className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-md relative card-hover transition-all duration-300">
          <div
            className="absolute top-0 right-0 bg-brand-slate/80 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-bl-xl rounded-tr-[2rem]">
            Standard</div>
          <div className="text-brand-teal/60 text-xs font-bold uppercase tracking-widest mb-2 mt-2">30-Day Recovery</div>
          <div className="font-serif text-4xl text-brand-teal font-bold mb-1">₹28,000</div>
          <div className="text-brand-slate/40 text-sm mb-6 pb-6 border-b border-gray-100">₹933 per session · Perfect for
            foundational recovery</div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-sm text-brand-slate/80"><span
                className="text-brand-peach font-bold text-base">✦</span>Daily 1.5–2 hour home session</li>
            <li className="flex items-center gap-3 text-sm text-brand-slate/80"><span
                className="text-brand-peach font-bold text-base">✦</span>Mother + Baby massage (Maalish)</li>
            <li className="flex items-center gap-3 text-sm text-brand-slate/80"><span
                className="text-brand-peach font-bold text-base">✦</span>Traditional newborn bathing routine</li>
            <li className="flex items-center gap-3 text-sm text-brand-slate/80"><span
                className="text-brand-peach font-bold text-base">✦</span>Premium doctor-approved oil kit</li>
            <li className="flex items-center gap-3 text-sm text-brand-slate/80"><span
                className="text-brand-peach font-bold text-base">✦</span>Sanitised kit every visit</li>
            <li className="flex items-center gap-3 text-sm text-brand-slate/80"><span
                className="text-brand-peach font-bold text-base">✦</span>Guaranteed replacement cover</li>
          </ul>
          <a href="https://wa.me/919999999999?text=Hi%20Nani's%20Touch!%20I'm%20interested%20in%20the%2030-Day%20Package."
            target="_blank"
            className="block w-full py-3.5 text-center border-2 border-brand-teal text-brand-teal rounded-full font-semibold hover:bg-brand-teal hover:text-white transition-colors text-sm">
            Enquire on WhatsApp
          </a>
        </div>

        {/* Package 2 */}
        <div
          className="bg-brand-teal rounded-[2rem] p-8 shadow-2xl relative card-hover transition-all duration-300 md:-translate-y-4">
          <div
            className="absolute top-0 right-0 bg-brand-peach text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-bl-xl rounded-tr-[2rem]">
            Most Popular</div>
          <div className="text-brand-lightTeal/60 text-xs font-bold uppercase tracking-widest mb-2 mt-2">40-Day Tradition
          </div>
          <div className="font-serif text-4xl text-white font-bold mb-1">₹36,000</div>
          <div className="text-brand-lightTeal/50 text-sm mb-6 pb-6 border-b border-brand-lightTeal/15">₹900 per session ·
            The complete traditional <em>chilla</em></div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-sm text-brand-lightTeal/90"><span className="hidden">✦</span><span
                className="text-brand-lightTeal/50 text-xs font-semibold">Everything in 30-Day, plus:</span></li>
            <li className="flex items-center gap-3 text-sm text-brand-lightTeal/90"><span
                className="text-brand-peach font-bold text-base">✦</span>10 additional recovery sessions</li>
            <li className="flex items-center gap-3 text-sm text-brand-lightTeal/90"><span
                className="text-brand-peach font-bold text-base">✦</span>Priority Nani assignment (same person daily)</li>
            <li className="flex items-center gap-3 text-sm text-brand-lightTeal/90"><span
                className="text-brand-peach font-bold text-base">✦</span>Lactation support guidance</li>
            <li className="flex items-center gap-3 text-sm text-brand-lightTeal/90"><span
                className="text-brand-peach font-bold text-base">✦</span>Postpartum nutrition check-ins</li>
            <li className="flex items-center gap-3 text-sm text-brand-lightTeal/90"><span
                className="text-brand-peach font-bold text-base">✦</span>Family support call with care coordinator</li>
          </ul>
          <a href="https://wa.me/919999999999?text=Hi%20Nani's%20Touch!%20I'm%20ready%20to%20book%20the%2040-Day%20Tradition%20Package."
            target="_blank"
            className="block w-full py-3.5 text-center bg-brand-peach text-white rounded-full font-semibold hover:bg-white hover:text-brand-teal transition-colors text-sm shadow-lg btn-glow">
            Book the Complete Package
          </a>
          <div className="text-center text-brand-lightTeal/40 text-xs mt-4">Most mothers who start with 30 days extend to
            40. Start with the full programme.</div>
        </div>
      </div>

      {/* Reassurance strip */}
      <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
        <div>
          <div className="font-semibold text-brand-teal text-sm mb-1">No hidden fees</div>
          <div className="text-brand-slate/50 text-xs leading-relaxed">Transparent session pricing, always.</div>
        </div>
        <div>
          <div className="font-semibold text-brand-teal text-sm mb-1">Guaranteed replacement</div>
          <div className="text-brand-slate/50 text-xs leading-relaxed">If your Nani is unwell, we cover it.</div>
        </div>
        <div>
          <div className="font-semibold text-brand-teal text-sm mb-1">Cancel anytime</div>
          <div className="text-brand-slate/50 text-xs leading-relaxed">No lock-in. We earn your trust daily.</div>
        </div>
      </div>
    </div>
  </section>

  {/* ── Final CTA ───────────────────────────────────────────── */}
  <section className="py-20 bg-brand-cream border-t border-brand-teal/8">
    <div className="container mx-auto px-6 max-w-3xl text-center">
      {/* Illustration: simple maternal warmth motif */}
      <div className="w-20 h-20 mx-auto mb-8 bg-brand-teal rounded-full p-3 shadow-lg">
        <img src="/Logo-removebg-preview.png" className="w-full h-full object-contain" />
      </div>
      <h2 className="font-serif text-4xl md:text-5xl text-brand-teal font-semibold mb-4" style={{"textWrap": "pretty"}}>
        Motherhood is beautiful.<br />
        <span className="italic text-brand-peach">It's also okay to need help.</span>
      </h2>
      <p className="text-brand-slate/60 text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed">
        You're already the kind of mother who researches, who questions, who refuses to settle for 'that's how it's
        always been done.' Trust that same instinct here.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <a href="https://wa.me/919999999999?text=Hi%20Nani's%20Touch!%20I'd%20like%20to%20book%20a%20session."
          target="_blank"
          className="bg-brand-peach text-white px-10 py-4 rounded-full font-semibold text-base btn-glow transition-all shadow-lg flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          Chat with an Expert Now
        </a>
        <a href="#packages"
          className="border-2 border-brand-teal text-brand-teal px-10 py-4 rounded-full font-semibold text-base hover:bg-brand-teal hover:text-white transition-all">
          See Packages
        </a>
      </div>
      <div className="text-brand-slate/40 text-sm">Currently serving Pune · Response within 2 hours</div>
    </div>
  </section>

  {/* ── Footer ──────────────────────────────────────────────── */}
  <footer className="bg-white border-t border-brand-teal/8 py-12">
    <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-teal rounded-full p-1 flex items-center justify-center">
          <img src="/Logo-removebg-preview.png" className="w-full h-full object-contain" />
        </div>
        <span className="font-serif text-xl font-bold text-brand-teal">Nani's Touch</span>
      </div>
      <div className="text-xs text-brand-slate/40 text-center md:text-right">
        <div>&copy; 2026 Nani's Touch · Elevating Japa Care · Pune</div>
        <div className="mt-1 flex gap-4 justify-center md:justify-end">
          <a href="#" className="hover:text-brand-teal transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-teal transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>

  {/* ── Floating WhatsApp ───────────────────────────────────── */}
  <a href="https://wa.me/919999999999" target="_blank"
    className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center group">
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
    <span
      className="absolute right-14 bg-white text-brand-slate text-xs font-bold py-1.5 px-3 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Chat
      with us!</span>
  </a>

  
    </main>
  );
}
