import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Solar Energy Insights | SunLynk Solar",
  description:
    "Expert articles on solar panels, SCADA, weather monitoring, battery storage and renewable energy from SunLynk Solar — Lucknow's leading solar EPC company.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
