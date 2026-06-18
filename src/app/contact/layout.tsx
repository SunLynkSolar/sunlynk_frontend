import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact SunLynk Solar | Request a Free Consultation & Site Survey",
  description: "Get in touch with SunLynk Solar. Contact our engineers for site surveys, custom quotes, or technical assistance regarding rooftop solar solutions in Lucknow, Uttar Pradesh, and across India.",
  keywords: [
    "contact SunLynk Solar",
    "solar company contact",
    "solar quote",
    "free solar site survey",
    "get solar quote India",
    "solar consultation",
    "solar installation enquiry",
    "solar contact Lucknow"
  ]
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
