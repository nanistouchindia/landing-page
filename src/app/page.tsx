"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { submitWaitlist, getSiteSettings } from "@/app/actions";

export default function Home() {
  const [navOpacity, setNavOpacity] = useState(0);
  const [slots, setSlots] = useState(4);
  const [slotsFontWeight, setSlotsFontWeight] = useState("semibold");
  const [showPopup, setShowPopup] = useState(false);
  const [barText, setBarText] = useState("⚡ Only 4 new family slots remaining in Pune this week — Secure yours now →");
  const [barVisible, setBarVisible] = useState<boolean | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", location: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitWaitlist({
        name: formData.name,
        phone: formData.phone,
        location: formData.location
      });

      if (result.error) {
        throw new Error(result.error);
      }

      setIsSuccess(true);
      setTimeout(() => {
        setShowPopup(false);
        setIsSuccess(false);
        setFormData({ name: "", phone: "", location: "" });
      }, 3000);
    } catch (error: any) {
      console.error("Error submitting waitlist:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    getSiteSettings().then((result) => {
      if (result.data) {
        if (result.data.scarcity_bar_text) setBarText(result.data.scarcity_bar_text);
        setBarVisible(result.data.scarcity_bar_visible !== "false");
      } else {
        setBarVisible(true);
      }
    }).catch(() => setBarVisible(true));
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

          <div className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-brand-cream rounded-3xl shadow-2xl flex flex-col md:flex-row animate-[fadeUp_0.5s_ease-out]">
            {/* Close button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[110] w-8 h-8 flex items-center justify-center rounded-full bg-white/60 hover:bg-white/90 text-brand-teal backdrop-blur-md transition-all shadow-md"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left: Lifestyle Image */}
            <div className="w-full md:w-5/12 h-[200px] sm:h-[250px] md:h-auto relative bg-brand-teal overflow-hidden flex-shrink-0">
              <img
                src="/assets/images/Popup-Modal.png"
                alt="Gentle newborn care"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-slate/85 via-brand-teal/30 to-brand-teal/40"></div>

              {/* Play icon removed */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-peach animate-pulse"></span>
                  Live Care
                </div>
                <h3 className="text-white font-serif text-2xl font-semibold leading-snug mb-1">Experience the <br />Nani's Touch</h3>
                <p className="text-white/80 text-sm font-light">See why 500+ mothers trust our process.</p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
              <div className="text-brand-peach font-bold text-xs uppercase tracking-widest mb-2">Exclusive Waitlist</div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-teal font-semibold mb-3">Secure Your Slot</h2>
              <p className="text-brand-slate/60 text-sm mb-6 leading-relaxed">
                Our specialized Japa care slots fill up weeks in advance. Join the waitlist today to get priority booking and an exclusive consultation.
              </p>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-8 animate-[fadeUp_0.3s_ease-out]">
                  <div className="w-16 h-16 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-brand-teal font-semibold">You're on the list!</h3>
                  <p className="text-brand-slate/60 text-sm text-center">We'll reach out on WhatsApp shortly.</p>
                </div>
              ) : (
                <form className="space-y-4 sm:space-y-5" onSubmit={handleWaitlistSubmit}>
                  <div>
                    <label className="block text-xs font-semibold text-brand-slate uppercase tracking-wider mb-1.5">Mother's Name</label>
                    <input type="text" required placeholder="e.g. Priya Sharma" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white border border-brand-teal/10 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all placeholder:text-brand-slate/30 text-sm text-brand-slate" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-slate uppercase tracking-wider mb-1.5">WhatsApp Number</label>
                    <input type="tel" required placeholder="+91 91126 18112" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white border border-brand-teal/10 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all placeholder:text-brand-slate/30 text-sm text-brand-slate" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-slate uppercase tracking-wider mb-1.5">Location (Pune)</label>
                    <textarea required placeholder="Your address or area..." rows={2} value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white border border-brand-teal/10 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all placeholder:text-brand-slate/30 text-sm text-brand-slate resize-none"></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-brand-peach text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-brand-peach/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 btn-glow disabled:opacity-70 disabled:hover:translate-y-0">
                    {isSubmitting ? 'Securing slot...' : 'Join Priority Waitlist'}
                    {!isSubmitting && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
              <p className="text-center text-[10px] text-brand-slate/40 mt-5">We respect your privacy. No spam, ever.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Sticky Header Wrapper ──────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 flex flex-col">
        {/* ── Scarcity Bar ──────────────────────────────────── */}
        {barVisible && (
          <div className={`scarcity-bar text-white text-center px-4 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 overflow-hidden ${navOpacity === 1 ? 'max-h-0 py-0 opacity-0' : 'max-h-[80px] py-2.5 opacity-100'}`}>
            <span className="opacity-90 inline-block leading-tight">{barText}</span>
          </div>
        )}

        {/* ── Navigation ──────────────────────────────────────────── */}
        <nav className="w-full relative transition-all duration-300" id="navbar">
          <div
            className="absolute inset-0 bg-brand-cream/92 backdrop-blur-md border-b border-brand-teal/8 shadow-sm transition-all duration-300"
            id="nav-bg" style={{ opacity: navOpacity }}></div>
          <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 relative z-10 flex justify-between items-center max-w-7xl">
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
            <a href="https://wa.me/919112618112?text=Hi%20Nani's%20Touch!%20I'd%20like%20to%20book%20a%20session."
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
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex items-center pt-32 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
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
                <span className="w-2 h-2 rounded-full bg-brand-peach" style={{ "animation": "pulse-soft 2s infinite" }}></span>
                Now in Pune
              </div>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-[4.2rem] text-brand-teal font-bold leading-[1.08] mb-6"
                style={{ "textWrap": "pretty" }}>
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
                    style={{ "backgroundImage": "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.06) 1px, transparent 0)", "backgroundSize": "22px 22px" }}>
                  </div>
                  {/* Organic warm blobs */}
                  <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full"
                    style={{ "background": "rgba(224,122,95,0.12)" }}></div>
                  <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full" style={{ "background": "rgba(255,255,255,0.04)" }}>
                  </div>
                </div>

                {/* Hero image: mother caring for newborn */}
                <div className="relative z-10 w-full h-full min-h-[420px]">
                  <img
                    src="/assets/images/Hero-Right-Panel-Main-Feature-Image.png"
                    alt="Loving postpartum care for mother and baby"
                    className="w-full h-full object-cover rounded-[3rem]"
                    style={{ minHeight: "420px" }}
                  />
                  {/* Warm gradient overlay at bottom */}
                  <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-t from-brand-teal/70 via-transparent to-transparent pointer-events-none"></div>
                  {/* Logo watermark at bottom */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-80">
                    <img src="/Logo-removebg-preview.png" className="w-5 h-5 object-contain" alt="Nani's Touch Mini Logo" />
                    <span className="font-serif text-white text-sm font-semibold tracking-wide drop-shadow">Nani's Touch</span>
                  </div>
                </div>

                {/* Floating badge: sessions booked today */}
                <div
                  className="absolute z-20 -left-8 top-16 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 float border border-brand-teal/10">
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
                  style={{ "animation": "float 5s ease-in-out infinite", "animationDelay": "-2.5s" }}>
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

      {/* ── Our Services Gallery ────────────────────────────────── */}
      <section className="py-20 bg-brand-cream overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-14">
            <div className="text-brand-peach font-bold text-xs uppercase tracking-widest mb-3">What we bring to your home</div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-teal font-semibold mb-4" style={{ "textWrap": "pretty" }}>
              Ancient wisdom.<br />
              <span className="italic text-brand-peach">Modern care.</span>
            </h2>
            <p className="text-brand-slate/60 text-lg font-light max-w-2xl mx-auto">Every session is a ritual — rooted in generations of Indian postpartum tradition, verified by modern pediatric science.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card 1: Baby Maalish — featured tall */}
            <div className="relative rounded-3xl overflow-hidden group h-[480px] lg:row-span-2">
              <img src="/assets/images/Gallery-Card-1.png" alt="Baby maalish - traditional newborn massage" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/90 via-brand-teal/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-peach/90 text-white text-[10px] font-bold uppercase tracking-widest mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>Shishu Maalish
                </div>
                <h3 className="font-serif text-2xl text-white font-semibold mb-2">Baby Massage</h3>
                <p className="text-white/75 text-sm leading-relaxed">Gentle vagus-nerve strokes using doctor-approved oils. Aids digestion, deepens sleep, and stimulates your baby's growing nervous system.</p>
              </div>
            </div>

            {/* Card 2: Postpartum Mother Care */}
            <div className="relative rounded-3xl overflow-hidden group h-[220px]">
              <img src="/assets/images/Gallery-Card-2.png" alt="Postpartum mother massage and recovery care" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-slate/85 via-brand-slate/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-peach/90 text-white text-[10px] font-bold uppercase tracking-widest mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>Mata ka Maalish
                </div>
                <h3 className="font-serif text-xl text-white font-semibold">Postpartum Recovery</h3>
                <p className="text-white/70 text-xs leading-relaxed mt-1">Targeted massage to ease back pain, reduce cortisol, and restore your body's natural strength.</p>
              </div>
            </div>

            {/* Card 3: Traditional Dhuri / First Bath */}
            <div className="relative rounded-3xl overflow-hidden group h-[220px]">
              <img src="/assets/images/Gallery-Card-3.png" alt="Traditional dhuri and first bath ceremony for newborn" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/85 via-brand-teal/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-peach/90 text-white text-[10px] font-bold uppercase tracking-widest mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>Pehla Snaan
                </div>
                <h3 className="font-serif text-xl text-white font-semibold">Traditional Dhuri & Bath</h3>
                <p className="text-white/70 text-xs leading-relaxed mt-1">The sacred first bath ritual — warm water, turmeric, neem, and the hands that know exactly how.</p>
              </div>
            </div>

            {/* Card 4: Herbal Oil Kit — wide banner */}
            <div className="relative rounded-3xl overflow-hidden group h-[220px] lg:col-span-2">
              <img src="/assets/images/Gallery-Card-4.png" alt="Doctor-approved herbal oils and natural care products" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-slate/85 via-brand-slate/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 max-w-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-peach/90 text-white text-[10px] font-bold uppercase tracking-widest mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>Aushadhi Oils
                </div>
                <h3 className="font-serif text-xl text-white font-semibold">Doctor-Approved Herbal Kit</h3>
                <p className="text-white/70 text-xs leading-relaxed mt-1">Pure sesame, coconut, and fenugreek-infused oils. Hypoallergenic, cold-pressed, pediatrician-verified — a new kit prepared fresh every visit.</p>
              </div>
            </div>

          </div>

          <div className="mt-10 text-center">
            <p className="text-brand-slate/50 text-sm font-medium italic">"Every technique we use is mapped by our pediatric advisor. Nothing random. Nothing rough. Only what your baby's body and your body actually need."</p>
          </div>
        </div>
      </section>

      {/* ── Fear Bridge: What you're risking ───────────────────── */}
      <section id="why" className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-brand-peach font-bold text-xs uppercase tracking-widest mb-3">The unspoken risk</div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-teal font-semibold mb-5" style={{ "textWrap": "pretty" }}>
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

            {/* Step 1: She Arrives */}
            <div className="bg-brand-lightTeal rounded-3xl flex flex-col overflow-hidden relative">
              <div className="relative h-36 overflow-hidden">
                <img src="/assets/images/Session-Timeline-Step-1.png" alt="Professional caregiver arriving at home" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-lightTeal/80"></div>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-teal opacity-60">8:55 AM</div>
                <div className="font-serif text-xl font-semibold mb-2 text-brand-slate">She arrives</div>
                <div className="text-sm leading-relaxed text-brand-slate/70">Fresh uniform. Kit sanitised. Oils ready. She greets you — professional, warm, unhurried.</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-brand-teal/8"></div>
            </div>

            {/* Step 2: Baby Massage */}
            <div className="bg-brand-teal rounded-3xl flex flex-col overflow-hidden relative">
              <div className="relative h-36 overflow-hidden">
                <img src="/assets/images/Session-Timeline-Step-2.png" alt="Gentle baby massage with warm oils" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-teal/80"></div>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-widest text-white opacity-70">9:00 AM</div>
                <div className="font-serif text-xl font-semibold mb-2 text-white">Baby massage</div>
                <div className="text-sm leading-relaxed text-white opacity-80">Gentle vagus-nerve strokes. Anatomically mapped. Your baby relaxes visibly. You watch, reassured.</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/10"></div>
            </div>

            {/* Step 3: Your Turn */}
            <div className="bg-brand-peach rounded-3xl flex flex-col overflow-hidden relative">
              <div className="relative h-36 overflow-hidden">
                <img src="/assets/images/Session-Timeline-Step-3.png" alt="Postpartum massage for the mother" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-peach/80"></div>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-widest text-white opacity-70">9:45 AM</div>
                <div className="font-serif text-xl font-semibold mb-2 text-white">Your turn</div>
                <div className="text-sm leading-relaxed text-white opacity-80">Postpartum massage for you. Back pain eased. Cortisol down. Oxytocin up. You actually exhale.</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/10"></div>
            </div>

            {/* Step 4: She Leaves */}
            <div className="bg-brand-lightTeal rounded-3xl flex flex-col overflow-hidden relative">
              <div className="relative h-36 overflow-hidden">
                <img src="/assets/images/Session-Timeline-Step-4.png" alt="Happy mother and baby after a care session" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-lightTeal/80"></div>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-teal opacity-60">11:00 AM</div>
                <div className="font-serif text-xl font-semibold mb-2 text-brand-slate">She leaves</div>
                <div className="text-sm leading-relaxed text-brand-slate/70">Baby bathed. Both of you cared for. Privacy restored. Your home is yours again.</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-brand-teal/8"></div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────── */}
      <section id="stories" className="py-24 bg-brand-teal relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ "backgroundImage": "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)", "backgroundSize": "28px 28px" }}>
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
              <div className="quote-mark select-none" style={{ "color": "rgba(18,90,111,0.1)" }}>"</div>
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
        <div className="container mx-auto px-6 max-w-7xl">

          {/* Header */}
          <div className="text-center mb-4">
            <div className="text-brand-peach font-bold text-xs uppercase tracking-widest mb-3">Japa Care · Pune</div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-teal font-semibold mb-4">Care Packages 2025</h2>
            <p className="text-brand-slate/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Every package combines ancestral Japa wisdom with clinical-grade hygiene — choose the level of care that feels right for your family.
            </p>
          </div>

          {/* Urgency notice */}
          <div className="max-w-3xl mx-auto mb-12 mt-8">
            <div className="bg-brand-peach/10 border border-brand-peach/25 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-8 h-8 bg-brand-peach/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-brand-peach" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-brand-slate/80">
                <strong className="text-brand-peach">Slots filling fast:</strong> We recommend booking at <strong>week 36 of pregnancy</strong> or immediately after delivery. The earlier you book, the sooner your dedicated specialist is assigned.
              </p>
            </div>
          </div>

          {/* 4 Package cards — 2×2 grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-14 text-left items-stretch">

            {/* SILVER */}
            <div className="bg-white rounded-[2rem] p-7 border border-gray-100 shadow-md relative card-hover transition-all duration-300 flex flex-col">
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/40 mb-1">⭐ Silver</div>
              <h3 className="font-serif text-2xl text-brand-teal font-semibold mb-1">Nani's Blessing</h3>
              <p className="text-brand-slate/50 text-xs italic mb-4">"A gentle start — every newborn's first right."</p>
              <div className="text-brand-slate/40 text-xs mb-5 pb-5 border-b border-gray-100">30 sessions · 45 min each · Baby only</div>
              <ul className="space-y-2.5 mb-6 flex-1">
                <li className="flex gap-2 text-sm text-brand-slate/75"><span className="text-brand-peach font-bold">✦</span>Traditional oil baby massage</li>
                <li className="flex gap-2 text-sm text-brand-slate/75"><span className="text-brand-peach font-bold">✦</span>Warm water bath & swaddling</li>
                <li className="flex gap-2 text-sm text-brand-slate/75"><span className="text-brand-peach font-bold">✦</span>Ayurvedic oil kit included</li>
                <li className="flex gap-2 text-sm text-brand-slate/75"><span className="text-brand-peach font-bold">✦</span>WhatsApp daily care log</li>
                <li className="flex gap-2 text-sm text-brand-slate/75"><span className="text-brand-peach font-bold">✦</span>Missed session guarantee</li>
                <li className="flex gap-2 text-sm text-brand-slate/75"><span className="text-brand-peach font-bold">✦</span>Welcome gift hamper</li>
              </ul>
              <a href="https://wa.me/919112618112?text=Hi%20Nani's%20Touch!%20I'm%20interested%20in%20the%20Silver%20Nani's%20Blessing%20package." target="_blank" rel="noopener noreferrer"
                className="block w-full py-3 text-center border-2 border-brand-teal text-brand-teal rounded-full font-semibold hover:bg-brand-teal hover:text-white transition-colors text-sm">
                Enquire on WhatsApp
              </a>
            </div>

            {/* GOLD — Flagship */}
            <div className="bg-white rounded-[2rem] p-7 border-2 border-brand-teal shadow-lg relative card-hover transition-all duration-300 flex flex-col">
              <div className="absolute top-0 right-0 bg-brand-teal text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-bl-xl rounded-tr-[2rem]">Flagship</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-teal/60 mb-1">⭐⭐ Gold</div>
              <h3 className="font-serif text-2xl text-brand-teal font-semibold mb-1">Nani's Care</h3>
              <p className="text-brand-slate/50 text-xs italic mb-4">"Because you deserve to heal, while your baby thrives."</p>
              <div className="text-brand-slate/40 text-xs mb-5 pb-5 border-b border-brand-teal/10">30 sessions · 90 min each · Mother + Baby</div>
              <ul className="space-y-2.5 mb-6 flex-1">
                <li className="flex gap-2 text-sm text-brand-slate/75"><span className="text-brand-peach font-bold">✦</span>Baby massage + bath + swaddling</li>
                <li className="flex gap-2 text-sm text-brand-slate/75"><span className="text-brand-peach font-bold">✦</span>Mother full postnatal body massage</li>
                <li className="flex gap-2 text-sm text-brand-slate/75"><span className="text-brand-peach font-bold">✦</span>Abdominal binding (Patti)</li>
                <li className="flex gap-2 text-sm text-brand-slate/75"><span className="text-brand-peach font-bold">✦</span>Warm compress therapy</li>
                <li className="flex gap-2 text-sm text-brand-slate/75"><span className="text-brand-peach font-bold">✦</span>Full oil kit — Mother + Baby</li>
                <li className="flex gap-2 text-sm text-brand-slate/75"><span className="text-brand-peach font-bold">✦</span>Welcome gift hamper</li>
              </ul>
              <a href="https://wa.me/919112618112?text=Hi%20Nani's%20Touch!%20I'm%20interested%20in%20the%20Gold%20Nani's%20Care%20package." target="_blank" rel="noopener noreferrer"
                className="block w-full py-3 text-center bg-brand-teal text-white rounded-full font-semibold hover:bg-brand-teal/90 transition-colors text-sm shadow-md">
                Enquire on WhatsApp
              </a>
            </div>

            {/* PLATINUM — Most Popular */}
            <div className="bg-brand-teal rounded-[2rem] p-7 shadow-2xl relative card-hover transition-all duration-300 flex flex-col xl:-translate-y-3">
              <div className="absolute top-0 right-0 bg-brand-peach text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-bl-xl rounded-tr-[2rem]">Most Popular</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-lightTeal/60 mb-1">⭐⭐⭐ Platinum</div>
              <h3 className="font-serif text-2xl text-white font-semibold mb-1">Complete Japa</h3>
              <p className="text-white/50 text-xs italic mb-4">"The full 40-day ritual — tradition honored, completely."</p>
              <div className="text-brand-lightTeal/50 text-xs mb-5 pb-5 border-b border-brand-lightTeal/15">40 sessions · 90 min each · + Lactation & Nutrition</div>
              <ul className="space-y-2.5 mb-6 flex-1">
                <li className="flex gap-2 text-sm text-brand-lightTeal/90"><span className="text-brand-peach font-bold">✦</span>Everything in Gold, for 40 days</li>
                <li className="flex gap-2 text-sm text-brand-lightTeal/90"><span className="text-brand-peach font-bold">✦</span>2 lactation consultant sessions</li>
                <li className="flex gap-2 text-sm text-brand-lightTeal/90"><span className="text-brand-peach font-bold">✦</span>Printed postnatal diet guide</li>
                <li className="flex gap-2 text-sm text-brand-lightTeal/90"><span className="text-brand-peach font-bold">✦</span>Priority slot lock — never rescheduled</li>
                <li className="flex gap-2 text-sm text-brand-lightTeal/90"><span className="text-brand-peach font-bold">✦</span>Coordinator check-in call</li>
                <li className="flex gap-2 text-sm text-brand-lightTeal/90"><span className="text-brand-peach font-bold">✦</span>Premium Ayurvedic oil upgrade kit</li>
              </ul>
              <a href="https://wa.me/919112618112?text=Hi%20Nani's%20Touch!%20I'm%20interested%20in%20the%20Platinum%20Complete%20Japa%20package." target="_blank" rel="noopener noreferrer"
                className="block w-full py-3 text-center bg-brand-peach text-white rounded-full font-semibold hover:bg-white hover:text-brand-teal transition-colors text-sm shadow-lg btn-glow">
                Book Complete Japa
              </a>
              <div className="text-center text-brand-lightTeal/40 text-[11px] mt-3">40-day complete chilla period — most mothers prefer this.</div>
            </div>

            {/* DIAMOND */}
            <div className="bg-brand-slate rounded-[2rem] p-7 shadow-xl relative card-hover transition-all duration-300 flex flex-col">
              <div className="absolute top-0 right-0 bg-brand-peach/80 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-bl-xl rounded-tr-[2rem]">Maximum Care</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">💎 Diamond</div>
              <h3 className="font-serif text-2xl text-white font-semibold mb-1">Full Japa Maid</h3>
              <p className="text-white/40 text-xs italic mb-4">"Your home, fully covered — sunrise to sunset."</p>
              <div className="text-white/30 text-xs mb-5 pb-5 border-b border-white/10">12-hr daily specialist · 8am–8pm · 30 days</div>
              <ul className="space-y-2.5 mb-6 flex-1">
                <li className="flex gap-2 text-sm text-white/75"><span className="text-brand-peach font-bold">✦</span>Daily baby massage, bath & swaddling</li>
                <li className="flex gap-2 text-sm text-white/75"><span className="text-brand-peach font-bold">✦</span>Mother postnatal massage + binding</li>
                <li className="flex gap-2 text-sm text-white/75"><span className="text-brand-peach font-bold">✦</span>Feeding & latching assistance</li>
                <li className="flex gap-2 text-sm text-white/75"><span className="text-brand-peach font-bold">✦</span>Full newborn care 8am–8pm</li>
                <li className="flex gap-2 text-sm text-white/75"><span className="text-brand-peach font-bold">✦</span>Daily coordinator oversight</li>
                <li className="flex gap-2 text-sm text-white/75"><span className="text-brand-peach font-bold">✦</span>Same-day replacement guarantee</li>
              </ul>
              <a href="https://wa.me/919112618112?text=Hi%20Nani's%20Touch!%20I'm%20interested%20in%20the%20Diamond%20Full%20Japa%20Maid%20package." target="_blank" rel="noopener noreferrer"
                className="block w-full py-3 text-center border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white hover:text-brand-slate transition-colors text-sm">
                Enquire on WhatsApp
              </a>
            </div>
          </div>

          {/* Add-ons strip */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-brand-teal/10 shadow-sm mb-10">
            <div className="text-center mb-6">
              <div className="text-brand-peach font-bold text-xs uppercase tracking-widest mb-1">À La Carte</div>
              <h3 className="font-serif text-2xl text-brand-teal font-semibold">Add-On Services</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              {[
                { name: "Lactation Consultant", price: "₹1,500", unit: "/ session" },
                { name: "Postnatal Diet Guide", price: "₹500", unit: "one-time" },
                { name: "Premium Oil Upgrade", price: "₹1,000", unit: "one-time" },
                { name: "Baby Gift Hamper", price: "₹1,800", unit: "one-time" },
                { name: "Continuation Sessions", price: "₹600", unit: "/ session" },
                { name: "5-Session Top-Up Pack", price: "₹2,500", unit: "5 sessions" },
              ].map((addon) => (
                <div key={addon.name} className="bg-brand-lightTeal/30 rounded-2xl p-4 border border-brand-teal/10">
                  <div className="text-brand-teal font-semibold text-xs leading-snug mb-2">{addon.name}</div>
                  <div className="font-serif text-lg font-bold text-brand-teal">{addon.price}</div>
                  <div className="text-brand-slate/40 text-[10px]">{addon.unit}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reassurance strip */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
            <div>
              <div className="font-semibold text-brand-teal text-sm mb-1">No hidden fees</div>
              <div className="text-brand-slate/50 text-xs">Transparent pricing, always.</div>
            </div>
            <div>
              <div className="font-semibold text-brand-teal text-sm mb-1">Missed session covered</div>
              <div className="text-brand-slate/50 text-xs">Backup specialist on standby.</div>
            </div>
            <div>
              <div className="font-semibold text-brand-teal text-sm mb-1">Welcome hamper included</div>
              <div className="text-brand-slate/50 text-xs">In every package, from Day 1.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <div className="text-brand-peach font-bold text-xs uppercase tracking-widest mb-3">Got questions?</div>
            <h2 className="font-serif text-4xl text-brand-teal font-semibold">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "What is Japa care and who is it for?",
                a: "Japa care (also known as jaapa or chilla care) is traditional Indian postnatal care covering the first 30–40 days after childbirth. It includes daily baby massage (maalish), newborn bathing, and postpartum recovery support for the mother. It is for any new mother who wants safe, professional, and culturally rooted care at home."
              },
              {
                q: "Which package should I choose?",
                a: "If you want baby care only, start with Silver (₹18,000 · 45 min). For mother + baby care, Gold is our flagship (₹28,000 · 90 min). For the complete 40-day chilla with lactation and nutrition support, choose Platinum (₹42,000). If you need a full-day specialist at home from 8am–8pm, Diamond is your answer (₹38,000)."
              },
              {
                q: "Does the Silver package include mother massage?",
                a: "No. The Silver (Nani's Blessing) package is designed for baby care only — 45-minute sessions covering baby maalish, warm bath, and swaddling. Mother postnatal massage starts from the Gold package (90-minute sessions)."
              },
              {
                q: "What if my specialist can't come one day?",
                a: "Every package includes a Missed Session Guarantee. A trained backup specialist is always on standby. If your primary Nani is unwell or unavailable, a replacement arrives the same morning — you never lose a session you've paid for."
              },
              {
                q: "Are the oils and techniques safe for my newborn?",
                a: "Yes, completely. We use only cold-pressed, doctor-approved Ayurvedic oils (sesame/coconut based) that are hypoallergenic and pediatrician-verified. Every technique is anatomically mapped — no harsh pulling, no improvisation. We have zero injuries reported across 500+ sessions."
              },
              {
                q: "When should I book?",
                a: "We recommend booking at week 36 of pregnancy or immediately after delivery. Our slots fill up weeks in advance in Pune. Early booking also ensures your preferred daily time slot and dedicated specialist assignment."
              },
              {
                q: "Which areas in Pune do you serve?",
                a: "We currently serve all major areas of Pune including Wakad, Baner, Koregaon Park, Kothrud, Viman Nagar, Hinjewadi, Aundh, Kalyani Nagar, and surrounding localities. WhatsApp us to confirm availability in your area."
              },
              {
                q: "Can I add services to my existing package?",
                a: "Absolutely. All our à la carte add-ons — lactation consultant sessions (₹1,500), postnatal diet guide (₹500), premium oil upgrade (₹1,000), baby gift hamper (₹1,800), and continuation sessions (₹600) — can be added to any package at any time."
              },
            ].map((item, i) => (
              <div key={i} className="border border-brand-teal/12 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-brand-lightTeal/20 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-brand-slate text-sm leading-snug">{item.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal transition-transform duration-300" style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-brand-slate/65 text-sm leading-relaxed border-t border-brand-teal/8 pt-4 bg-brand-lightTeal/10 animate-[fadeUp_0.2s_ease-out]">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-brand-slate/50 text-sm mb-4">Still have questions? We're happy to help.</p>
            <a href="https://wa.me/919112618112?text=Hi%20Nani's%20Touch!%20I%20have%20a%20question%20about%20your%20packages." target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-teal text-white px-7 py-3 rounded-full font-semibold text-sm btn-teal transition-all shadow-md">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────── */}
      <section className="py-20 bg-brand-cream border-t border-brand-teal/8 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <img
            src="/assets/images/Final-CTA-Section.png"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          {/* Illustration: simple maternal warmth motif */}
          <div className="w-20 h-20 mx-auto mb-8 bg-brand-teal rounded-full p-3 shadow-lg">
            <img src="/Logo-removebg-preview.png" className="w-full h-full object-contain" alt="Nani's Touch Maternal Care Motif" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-teal font-semibold mb-4" style={{ "textWrap": "pretty" }}>
            Motherhood is beautiful.<br />
            <span className="italic text-brand-peach">It's also okay to need help.</span>
          </h2>
          <p className="text-brand-slate/60 text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed">
            You're already the kind of mother who researches, who questions, who refuses to settle for 'that's how it's
            always been done.' Trust that same instinct here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="https://wa.me/919112618112?text=Hi%20Nani's%20Touch!%20I'd%20like%20to%20book%20a%20session."
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
      <footer className="bg-brand-teal text-white">
        {/* Main footer grid */}
        <div className="container mx-auto px-6 max-w-7xl py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-full p-1.5 flex items-center justify-center">
                <img src="/Logo-removebg-preview.png" className="w-full h-full object-contain brightness-0 invert" alt="Nani's Touch Logo" />
              </div>
              <span className="font-serif text-2xl font-bold">Nani&apos;s Touch</span>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-6">
              Pune&apos;s most trusted Japa care service — pediatrician-certified, home-delivered, and deeply rooted in Indian postpartum tradition.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              <a href="https://www.instagram.com/nanistouch.in/" target="_blank" rel="noopener noreferrer"
                aria-label="Follow Nani's Touch on Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/nanistouchin" target="_blank" rel="noopener noreferrer"
                aria-label="Connect with Nani's Touch on LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/nanistouch.in" target="_blank" rel="noopener noreferrer"
                aria-label="Follow Nani's Touch on Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://wa.me/919112618112" target="_blank" rel="noopener noreferrer"
                aria-label="Chat with Nani's Touch on WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/65">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Our Packages</a></li>
              <li><a href="#science" className="hover:text-white transition-colors">Why Japa Care?</a></li>
              <li><a href="#why" className="hover:text-white transition-colors">Why Nani&apos;s Touch?</a></li>
              <li><a href="#stories" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-5">Legal</h4>
            <ul className="space-y-3 text-sm text-white/65">
              <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/refund-policy" className="hover:text-white transition-colors">Refund &amp; Cancellation</a></li>
            </ul>
            <h4 className="font-serif text-lg font-semibold mt-8 mb-5">Service Areas</h4>
            <p className="text-sm text-white/65 leading-relaxed">
              Wakad · Baner · Aundh · Hinjewadi · Kothrud · Koregaon Park · Viman Nagar · Kalyani Nagar · Kharadi · Hadapsar
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-white/65">
              <li>
                <a href="https://wa.me/919112618112" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition-colors group">
                  <span className="mt-0.5 w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  </span>
                  <span>+91 91126 18112<br /><span className="text-white/40 text-xs">WhatsApp preferred</span></span>
                </a>
              </li>
              <li>
                <a href="mailto:support@nanistouch.in"
                  className="flex items-start gap-3 hover:text-white transition-colors group">
                  <span className="mt-0.5 w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </span>
                  <span>support@nanistouch.in<br /><span className="text-white/40 text-xs">We reply within 24 hrs</span></span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </span>
                  <span>Pune, Maharashtra<br /><span className="text-white/40 text-xs">Home visits across Pune</span></span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 max-w-7xl py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
            <span>&copy; 2026 Nani&apos;s Touch. All rights reserved. · Pune, India</span>
            <div className="flex gap-5">
              <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp ───────────────────────────────────── */}
      <a href="https://wa.me/919112618112" target="_blank"
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
