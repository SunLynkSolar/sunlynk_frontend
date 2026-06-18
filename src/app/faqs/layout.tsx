import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar FAQs — Frequently Asked Questions | SunLynk Solar",
  description: "Find answers to common questions about residential solar, housing society setups, commercial systems, subsidies, net metering, and maintenance.",
  keywords: [
    "solar FAQs",
    "solar panel subsidy FAQs",
    "residential solar price",
    "housing society solar net metering",
    "how solar panels work",
    "solar ROI calculation",
    "PM Surya Ghar subsidy FAQ",
    "solar net metering rules"
  ]
};

export default function FaqsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
