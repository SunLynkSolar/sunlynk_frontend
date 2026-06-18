import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SunLynk Solar",
  description: "Read the privacy policy of SunLynk Solar. We are committed to protecting the personal data of our users and clients.",
  keywords: [
    "solar privacy policy",
    "SunLynk privacy",
    "privacy policy",
    "data protection",
    "terms of privacy"
  ]
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
