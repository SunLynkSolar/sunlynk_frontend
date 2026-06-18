import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | SunLynk Solar",
  description: "Review terms of use and service conditions for SunLynk Solar installations and services.",
  keywords: [
    "solar terms",
    "solar service agreement",
    "SunLynk terms and conditions",
    "solar contract terms",
    "solar installation terms"
  ]
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
