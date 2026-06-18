import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SunLynk Solar | Leading Rooftop Solar Provider",
  description: "Learn about SunLynk Solar, a leading rooftop solar provider. Discover our mission, values, and expert team delivering high-efficiency solar installations in Lucknow, Uttar Pradesh, and across India.",
  keywords: [
    "about SunLynk Solar",
    "solar company in India",
    "rooftop solar provider",
    "solar panel installation team",
    "best solar provider Lucknow",
    "solar subsidy Uttar Pradesh",
    "SunLynk Solar team",
    "renewable energy company"
  ]
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
