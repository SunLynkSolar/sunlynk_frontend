import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authorized Brands & Partners | SunLynk Solar",
  description: "We partner with the world's leading Tier-1 solar brands to deliver reliable, high-efficiency solar panel installations. Explore our authorized brand partners.",
  keywords: [
    "solar brands India",
    "authorized solar partner",
    "solar panel companies",
    "Tier 1 solar panels",
    "best solar inverters",
    "SunLynk Solar partners",
    "solar panel distributors",
    "solar equipment suppliers"
  ]
};

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
