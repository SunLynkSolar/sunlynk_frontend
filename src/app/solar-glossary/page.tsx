import type { Metadata } from "next";
import GlossaryClient from "@/components/GlossaryClient";
import { getGlossary } from "@/utils/glossaryService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Solar Glossary for Lucknow Homeowners | SunLynk Solar",
  description:
    "Plain-English meanings of every term on a rooftop solar quote: kW vs units, HDGI, net metering, hybrid vs on-grid, the PM Surya Ghar subsidy and each Lynk plan.",
  alternates: {
    canonical: "/solar-glossary",
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    title: "Solar Glossary for Lucknow Homeowners | SunLynk Solar",
    description:
      "Every term on a rooftop solar quote, explained in plain words, with the question worth asking when it shows up.",
    url: "https://www.sunlynksolar.com/solar-glossary",
    images: [
      {
        url: "https://www.sunlynksolar.com/new_assets/hero_banner.webp",
        width: 1200,
        height: 630,
        alt: "SunLynk Solar Glossary",
      },
    ],
  },
};

export default async function SolarGlossaryPage() {
  const data = await getGlossary();

  // Generate DefinedTermSet Schema purely from database data
  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      "@id": "https://www.sunlynksolar.com/solar-glossary/",
      name: "Solar Glossary for Lucknow Homeowners",
      url: "https://www.sunlynksolar.com/solar-glossary/",
      publisher: {
        "@type": "Organization",
        name: "SunLynk Solar",
        url: "https://www.sunlynksolar.com/",
      },
      hasDefinedTerm: data.terms.map((term) => ({
        "@type": "DefinedTerm",
        name: term.title,
        description: term.paragraphs.join(" ").replace(/<[^>]+>/g, ""),
        url: `https://www.sunlynksolar.com/solar-glossary/#${term.id}`,
        inDefinedTermSet: "https://www.sunlynksolar.com/solar-glossary/",
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.sunlynksolar.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Solar Glossary",
          item: "https://www.sunlynksolar.com/solar-glossary/",
        },
      ],
    },
  ];

  return (
    <>
      {data.terms.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      <GlossaryClient initialData={data} />
    </>
  );
}
