import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | SunLynk Solar",
  description: "Read the cancellation and refund policy of SunLynk Solar for solar panel installations and products.",
  keywords: [
    "solar refund policy",
    "solar panel cancellation",
    "SunLynk refund policy",
    "solar installation refund",
    "refund terms"
  ]
};

export default function CancellationRefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
