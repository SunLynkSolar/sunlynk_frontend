import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import Script from "next/script";
import AnalyticsTracker from "@/components/AnalyticsTracker";

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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.sunlynksolar.com",
    title: "SunLynk Solar | Premium Rooftop Solar Solutions in Lucknow",
    description: "SunLynk Solar is a premier solar panel installation company. We design and install high-efficiency rooftop solar systems for homes, housing societies, and commercial businesses in Lucknow, Uttar Pradesh, and across India.",
    siteName: "SunLynk Solar",
    images: [
      {
        url: "/new_assets/hero_banner.webp",
        width: 1200,
        height: 630,
        alt: "SunLynk Solar - Premium Rooftop Solar Solutions in Lucknow",
      },
    ],
  },
  facebook: {
    appId: "1041595695118356",
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
        <AnalyticsTracker />
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

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1041595695118356');
            fbq('track', 'PageView');
            console.log("Facebook Pixel Initialized");
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1041595695118356&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Schema Markup: Organization, LocalBusiness, Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://www.sunlynksolar.com/#organization",
                "name": "SunLynk Solar",
                "url": "https://www.sunlynksolar.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.sunlynksolar.com/new_assets/logo.png"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+918573003001",
                  "contactType": "customer service",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"]
                },
                "sameAs": [
                  "https://www.facebook.com/sunlynksolar?mibextid=wwXIfr&mibextid=wwXIfr",
                  "https://www.instagram.com/SunlynkIndia",
                  "https://www.linkedin.com/company/sunlynk-solar-energy-pvt-ltd/"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": "https://www.sunlynksolar.com/#localbusiness",
                "name": "SunLynk Solar",
                "image": "https://www.sunlynksolar.com/new_assets/logo.jpeg",
                "url": "https://www.sunlynksolar.com",
                "telephone": "+918573003001",
                "email": "info@sunlynksolar.com",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Vibhuti Khand",
                  "addressLocality": "Lucknow",
                  "addressRegion": "Uttar Pradesh",
                  "postalCode": "226010",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 26.8640,
                  "longitude": 81.0075
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                  ],
                  "opens": "09:00",
                  "closes": "18:30"
                },
                "sameAs": [
                  "https://www.facebook.com/sunlynksolar?mibextid=wwXIfr&mibextid=wwXIfr",
                  "https://www.instagram.com/SunlynkIndia",
                  "https://www.linkedin.com/company/sunlynk-solar-energy-pvt-ltd/"
                ],
                "areaServed": [
                  {
                    "@type": "AdministrativeArea",
                    "name": "Lucknow"
                  },
                  {
                    "@type": "AdministrativeArea",
                    "name": "Uttar Pradesh"
                  }
                ],
                "description": "SunLynk Solar is a rooftop solar installation company in Lucknow offering residential, commercial, and housing society solar solutions with subsidy and EMI support."
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.sunlynksolar.com/#website",
                "name": "SunLynk Solar",
                "url": "https://www.sunlynksolar.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.sunlynksolar.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ])
          }}
        />

        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}

