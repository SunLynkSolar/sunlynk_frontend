import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at SunLynk Solar | Join Our Renewable Energy Team",
  description: "Join our team of dedicated solar engineers, technicians, and operations experts. Explore career opportunities with SunLynk Solar in Lucknow, Uttar Pradesh, and across India.",
  keywords: [
    "solar jobs India",
    "solar engineer careers",
    "solar panel installer jobs",
    "green energy jobs",
    "careers in solar industry",
    "work at SunLynk Solar",
    "renewable energy jobs Lucknow"
  ]
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
