import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Sensor & Pyranometer Calibration Services | SunLynk Solar",
  description: "Maintain optimal performance ratio (PR) for your solar array with SunLynk Solar calibration and technical validation services.",
  keywords: [
    "solar calibration services",
    "pyranometer calibration",
    "solar sensor calibration",
    "solar maintenance",
    "solar PR calibration",
    "weather station sensor calibration",
    "solar sensor validation",
    "meteorological sensor calibration"
  ]
};

export default function CalibrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
