import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Solar Energy Insights & Subsidies | SunLynk Solar",
  description:
    "Expert articles on solar panels, SCADA, weather monitoring, solar subsidies, battery storage, and renewable energy from SunLynk Solar.",
  keywords: [
    "solar energy blog",
    "solar panel articles",
    "solar subsidy guides",
    "solar SCADA systems",
    "weather monitoring station",
    "battery storage system",
    "renewable energy insights",
    "rooftop solar panels India",
    "PM Surya Ghar Yojana guide"
  ]
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
