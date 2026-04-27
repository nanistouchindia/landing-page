import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const BASE_URL = "https://nanistouch.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Nani's Touch | #1 Japa Care & Baby Massage Service in Pune",
    template: "%s | Nani's Touch Pune",
  },

  description:
    "Pune's most trusted pediatrician-certified Japa care service. Professional baby maalish, postpartum massage, traditional dhuri & newborn bathing at your home. 500+ mothers served. Safe, background-checked Japa maids. 30 & 40-day packages. Serving Wakad, Baner, Koregaon Park & all Pune areas.",

  keywords: [
    // Primary — Japa care
    "japa care pune",
    "japa maid pune",
    "japa nurse pune",
    "japa care service pune",
    "professional japa care pune",
    "best japa maid in pune",
    "japa care at home pune",
    "certified japa maid pune",
    "background checked japa maid pune",
    "japa care 40 days pune",
    "japa care 30 days pune",
    "chilla care pune",
    "japa care package pune",
    "traditional japa care pune",

    // Baby massage
    "baby massage pune",
    "baby maalish pune",
    "newborn massage pune",
    "infant massage pune",
    "shishu maalish pune",
    "baby massage at home pune",
    "newborn massage at home pune",
    "baby massage service pune",
    "professional baby massage pune",
    "pediatrician certified baby massage pune",
    "safe baby massage pune",
    "traditional baby massage pune",
    "baby massage oil pune",
    "ayurvedic baby massage pune",
    "maalish wali pune",

    // Postpartum / mother care
    "postpartum care pune",
    "postnatal care pune",
    "postnatal massage pune",
    "postpartum massage pune",
    "new mother care pune",
    "after delivery care pune",
    "post delivery massage pune",
    "mata ka maalish pune",
    "postpartum recovery pune",
    "postpartum depression prevention",

    // Traditional rituals
    "dhuri snaan pune",
    "pehla snaan pune",
    "traditional newborn bath pune",
    "newborn bathing service pune",
    "baby bathing at home pune",

    // Location-specific
    "japa care wakad pune",
    "japa care baner pune",
    "japa care koregaon park pune",
    "japa care kothrud pune",
    "japa care viman nagar pune",
    "japa care andheri pune",
    "japa care hinjewadi pune",
    "baby massage wakad",
    "baby massage baner",
    "newborn care specialist pune",

    // Service terms
    "newborn care pune",
    "neonatal care pune",
    "postnatal services pune",
    "home nursing after delivery pune",
    "post natal nurse pune",
    "baby care expert pune",
    "infant care at home pune",
  ],

  authors: [{ name: "Nani's Touch", url: BASE_URL }],
  creator: "Nani's Touch",
  publisher: "Nani's Touch",
  category: "Healthcare & Childcare Services",

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Nani's Touch",
    title: "Nani's Touch | #1 Japa Care & Baby Massage Service in Pune",
    description:
      "Pune's most trusted pediatrician-certified Japa care. Professional baby maalish, postpartum massage & traditional dhuri at your home. 500+ mothers. Background-checked. Safe.",
    images: [
      {
        url: "/assets/images/Hero-Right-Panel-Main-Feature-Image.png",
        width: 1200,
        height: 630,
        alt: "Nani's Touch - Professional Japa Care and Baby Massage Service in Pune",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nani's Touch | #1 Japa Care & Baby Massage in Pune",
    description:
      "Pediatrician-certified Japa care at home in Pune. Safe baby maalish, postpartum massage & traditional dhuri. 500+ mothers trust us.",
    images: ["/assets/images/Hero-Right-Panel-Main-Feature-Image.png"],
    creator: "@nanistouch",
    site: "@nanistouch",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "add-your-google-search-console-verification-code-here",
  },

  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Pune, Maharashtra, India",
    "geo.position": "18.5204;73.8567",
    ICBM: "18.5204, 73.8567",
    "og:phone_number": "+919112618112",
    "og:locality": "Pune",
    "og:region": "Maharashtra",
    "og:country-name": "India",
    "business:contact_data:locality": "Pune",
    "business:contact_data:region": "Maharashtra",
    "business:contact_data:country_name": "India",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#business`,
      name: "Nani's Touch",
      alternateName: [
        "Nanis Touch",
        "Nani's Touch Japa Care",
        "Nani's Touch Baby Massage Pune",
      ],
      description:
        "Pune's most trusted pediatrician-certified Japa care service offering professional baby maalish, postpartum massage, traditional dhuri and newborn bathing at home. Background-checked professionals, WHO-protocol techniques.",
      url: BASE_URL,
      telephone: "+919112618112",
      priceRange: "₹₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI, Bank Transfer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 18.5204,
        longitude: 73.8567,
      },
      areaServed: [
        { "@type": "City", name: "Pune" },
        { "@type": "Neighborhood", name: "Wakad" },
        { "@type": "Neighborhood", name: "Baner" },
        { "@type": "Neighborhood", name: "Koregaon Park" },
        { "@type": "Neighborhood", name: "Kothrud" },
        { "@type": "Neighborhood", name: "Viman Nagar" },
        { "@type": "Neighborhood", name: "Hinjewadi" },
        { "@type": "Neighborhood", name: "Aundh" },
        { "@type": "Neighborhood", name: "Kalyani Nagar" },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "20:00",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "500",
        bestRating: "5",
        worstRating: "1",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Japa Care Packages",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Silver – Nani's Blessing",
            description:
              "30 sessions, 45 min each. Baby-only Japa care with traditional maalish, warm water bath, swaddling, Ayurvedic oil kit, and missed-session guarantee.",
            price: "18000",
            priceCurrency: "INR",
            availability: "https://schema.org/LimitedAvailability",
          },
          {
            "@type": "Offer",
            name: "Gold – Nani's Care (Flagship)",
            description:
              "30 sessions, 90 min each. Complete Mother + Baby care including daily baby maalish, postpartum massage, abdominal binding (Patti), herbal bath, and WhatsApp daily care log.",
            price: "28000",
            priceCurrency: "INR",
            availability: "https://schema.org/LimitedAvailability",
          },
          {
            "@type": "Offer",
            name: "Platinum – Complete Japa (Most Popular)",
            description:
              "40 sessions, 90 min each. Full chilla period care with Mother + Baby maalish, lactation consultant, postpartum diet guide, and dedicated senior Nani.",
            price: "42000",
            priceCurrency: "INR",
            availability: "https://schema.org/LimitedAvailability",
          },
          {
            "@type": "Offer",
            name: "Diamond – Full Japa Maid",
            description:
              "30-day dedicated full-time Japa maid (8 AM–8 PM, 12 hours/day). Complete household, newborn, and postpartum care. Background-checked, live-in equivalent support.",
            price: "38000",
            priceCurrency: "INR",
            availability: "https://schema.org/LimitedAvailability",
          },
        ],
      },
      sameAs: [
        "https://wa.me/919112618112",
        "https://www.instagram.com/nanistouch.in/",
        "https://www.facebook.com/nanistouch.in",
        "https://www.linkedin.com/company/nanistouchin",
      ],
    },

    {
      "@type": "Service",
      "@id": `${BASE_URL}/#baby-massage`,
      name: "Baby Massage (Shishu Maalish)",
      serviceType: "Newborn Baby Massage",
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: { "@type": "City", name: "Pune" },
      description:
        "Gentle, pediatrician-mapped baby maalish using doctor-approved cold-pressed herbal oils. Vagus nerve strokes that improve sleep, digestion and neurological development in newborns. Zero injuries across 500+ sessions.",
      offers: {
        "@type": "Offer",
        price: "933",
        priceCurrency: "INR",
        description: "Per session as part of 30-day package",
      },
    },

    {
      "@type": "Service",
      "@id": `${BASE_URL}/#postpartum-massage`,
      name: "Postpartum Mother Massage (Mata ka Maalish)",
      serviceType: "Postpartum Massage",
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: { "@type": "City", name: "Pune" },
      description:
        "Professional postpartum massage for new mothers to ease back pain, reduce cortisol, improve oxytocin levels, and accelerate postpartum recovery. Clinically aligned techniques by trained female caregivers.",
    },

    {
      "@type": "Service",
      "@id": `${BASE_URL}/#dhuri`,
      name: "Traditional Newborn First Bath (Pehla Snaan / Dhuri)",
      serviceType: "Newborn Bathing Ritual",
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: { "@type": "City", name: "Pune" },
      description:
        "Sacred Indian first bath ritual for newborns using warm turmeric-infused water, neem leaves and traditional bathing techniques. Culturally rooted, hygienically performed.",
    },

    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Japa care?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Japa care (also spelled Japa or Jaapa) is a traditional Indian postpartum care practice covering the first 40 days after childbirth (the 'chilla' period). It includes daily baby massage (maalish), newborn bathing (dhuri snaan), and postpartum massage and recovery support for the mother.",
          },
        },
        {
          "@type": "Question",
          name: "What is baby maalish and why is it important?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Baby maalish is a traditional Indian infant massage using warm herbal oils. Pediatricians confirm that gentle vagus nerve stimulation through massage improves newborn digestion, deepens sleep (2x longer sleep cycles), reduces colic, and supports neurological development during the critical first 40 days.",
          },
        },
        {
          "@type": "Question",
          name: "Is Nani's Touch safe for my newborn?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All Nani's Touch caregivers are background-checked, medically screened, and trained in pediatrician-mapped techniques. We use only doctor-approved hypoallergenic oils, sanitised kits every visit, and disposable aprons. We have 0 injuries reported across 500+ sessions.",
          },
        },
        {
          "@type": "Question",
          name: "Which areas in Pune does Nani's Touch serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nani's Touch currently serves all areas of Pune including Wakad, Baner, Koregaon Park, Kothrud, Viman Nagar, Hinjewadi, Aundh, Kalyani Nagar, Andheri, and surrounding localities.",
          },
        },
        {
          "@type": "Question",
          name: "What Japa care packages does Nani's Touch offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nani's Touch offers 4 packages: Silver – Nani's Blessing (₹18,000, 30 sessions, baby-only maalish); Gold – Nani's Care (₹28,000, 30 sessions, Mother + Baby, flagship); Platinum – Complete Japa (₹42,000, 40 sessions, most popular, includes lactation consultant & diet guide); Diamond – Full Japa Maid (₹38,000, 30-day full-time 12-hr daily maid). All include Ayurvedic oils, herbal bath, and missed-session guarantee.",
          },
        },
        {
          "@type": "Question",
          name: "What happens in a Nani's Touch session?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your dedicated Nani arrives at 8:55 AM in a fresh sanitised uniform. She performs the baby massage (maalish) from 9:00 AM, followed by your postpartum massage from 9:45 AM. By 11:00 AM, the baby is bathed and she leaves. A full 2-hour care session that restores your privacy and your home.",
          },
        },
        {
          "@type": "Question",
          name: "How do I book a Japa care service in Pune?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can book Nani's Touch Japa care service in Pune by messaging us on WhatsApp at +919112618112 or by joining our priority waitlist on the website. We recommend booking from week 36 of pregnancy or immediately after delivery as slots fill fast.",
          },
        },
      ],
    },

    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Japa Care Services",
          item: `${BASE_URL}/#why`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Packages & Pricing",
          item: `${BASE_URL}/#packages`,
        },
      ],
    },

    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Nani's Touch",
      description:
        "Pune's #1 pediatrician-certified Japa care and baby massage service",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href={BASE_URL} />
        <meta name="theme-color" content="#125A6F" />
        <meta name="msapplication-TileColor" content="#125A6F" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YZMPV4VKY3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YZMPV4VKY3', {
              page_title: "Nani's Touch - Japa Care Pune",
              page_location: window.location.href,
            });
          `}
        </Script>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
