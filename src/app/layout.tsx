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

export const metadata: Metadata = {
  title: "Nani's Touch | Premium Japa Care in Pune",
  description: "Pediatrician-certified Japa care and newborn massage delivered to your home in Pune. Ensure your baby's first 40 days are safe, hygienic, and expertly managed.",
  keywords: [
    "Japa care Pune", 
    "newborn massage Pune", 
    "postpartum care", 
    "maalish for baby", 
    "pediatrician certified japa maid", 
    "post-delivery care Pune",
    "professional japa maid"
  ],
  authors: [{ name: "Nani's Touch" }],
  openGraph: {
    title: "Nani's Touch | Premium Japa Care in Pune",
    description: "Pediatrician-certified Japa care and newborn massage delivered to your home. Ensure your baby's first 40 days are safe, hygienic, and expertly managed.",
    url: "https://nanistouch.com", // update to actual domain when deploying
    siteName: "Nani's Touch",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nani's Touch | Premium Japa Care in Pune",
    description: "Pediatrician-certified Japa care and newborn massage delivered to your home in Pune.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YZMPV4VKY3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YZMPV4VKY3');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
