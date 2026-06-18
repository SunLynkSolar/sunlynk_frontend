import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Warranty Registration & Support | SunLynk Solar",
  description: "Register your solar rooftop equipment warranty or submit a performance claim for your solar installation.",
  keywords: [
    "solar warranty registration",
    "solar panel warranty",
    "solar inverter warranty",
    "solar maintenance support",
    "solar installation warranty claim",
    "SunLynk solar support"
  ]
};

export default function WarrantyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
