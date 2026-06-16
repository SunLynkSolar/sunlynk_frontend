import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

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
  title: "SunLynk Solar Lucknow - Premium Rooftop Solar Solutions",
  description: "SunLynk Solar is the leading solar panel installation company in Lucknow. We design and install high-efficiency rooftop solar systems for homes, housing societies, and commercial businesses in Lucknow, Uttar Pradesh.",
  keywords: [
    "solar panel Lucknow",
    "rooftop solar Lucknow",
    "solar company Lucknow",
    "best solar installation Lucknow",
    "solar subsidy Lucknow",
    "PM Surya Ghar Yojana Lucknow",
    "solar system Lucknow",
    "Lucknow solar EPC"
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
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
