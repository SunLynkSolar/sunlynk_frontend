import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sunlynksolar.com"),
  alternates: {
    canonical: "./",
  },
  title: "SunLynk Solar - Premium Rooftop Solar Solutions & Subsidies",
  description: "SunLynk Solar is a premier solar panel installation company. We design and install high-efficiency rooftop solar systems for homes, housing societies, and commercial businesses in Lucknow, Uttar Pradesh, and across India.",
  keywords: [
    "solar panel installation",
    "rooftop solar panel installation",
    "solar panel subsidy",
    "government solar subsidy",
    "solar subsidy scheme",
    "PM Surya Ghar Yojana",
    "PM Surya Ghar Muft Bijli Yojana",
    "rooftop solar subsidy registration",
    "national solar portal subsidy",
    "solar panel cost in India",
    "best solar panel company",
    "solar panel installation near me",
    "residential solar panel installation",
    "commercial rooftop solar",
    "industrial solar installation",
    "on grid solar system subsidy",
    "solar EPC contractor India",
    "net metering solar system",
    "solar company in Uttar Pradesh",
    "solar panel installation Lucknow",
    "solar company Lucknow",
    "solar subsidy Lucknow",
    "rooftop solar Uttar Pradesh"
  ],
  icons: {
    icon: "/fav.png",
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-dark">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TGLLBLFT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TGLLBLFT');
          `}
        </Script>

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3JCL4E7G8P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3JCL4E7G8P');
          `}
        </Script>

        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}

