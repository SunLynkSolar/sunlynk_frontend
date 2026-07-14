import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import solutionsData from "@/data/solutions.json";
import SolutionAccordion from "@/components/SolutionAccordion";
import { Sun, CheckCircle, Phone, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutionsData.find((s) => s.slug === slug);
  if (!solution) {
    return {
      title: "Solution Not Found | SunLynk Solar",
    };
  }
  return {
    title: `${solution.title} | SunLynk Solar`,
    description: `Discover ${solution.title} by SunLynk Solar. We provide high-efficiency solar panel installations and customized energy solutions in Uttar Pradesh and across India. ${solution.description}`,
    keywords: [
      solution.title,
      `${solution.title} installation`,
      "solar solutions",
      "solar company India",
      "rooftop solar panels",
      "solar subsidy scheme",
      "clean energy solutions",
      `${solution.title} Lucknow`
    ]
  };
}

export async function generateStaticParams() {
  return solutionsData.map((s) => ({
    slug: s.slug,
  }));
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = solutionsData.find((s) => s.slug === slug);

  if (!solution) {
    notFound();
  }

  const sol = solution as any;

  const sidebarHighlights = sol.highlights || [
    "High-Efficiency Solar Panels",
    "On-Grid & Hybrid System Designs",
    "Real-Time Performance Tracking",
    "Premium Inverters & Mounting structures"
  ];

  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "/" },
          { name: "Solutions", item: "/#solutions" },
          { name: sol.title, item: `/solutions/${slug}` }
        ]}
      />
      {/* Page Header */}
      <section className="relative bg-dark text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/assets/images/backgrounds/page-header-bg-1-1.webp)" }}
        ></div>
        {/* Infinite sliding text banner */}
        <div className="absolute top-0 left-0 w-full overflow-hidden bg-primary/20 py-2.5">
          <div className="whitespace-nowrap flex animate-text-scroll text-xs uppercase font-extrabold tracking-widest text-primary gap-8">
            {Array(10).fill(`* ${sol.title}`).map((text, idx) => (
              <span key={idx}>{text}</span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 mt-6">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Solutions</span>
          <h1 className="text-3xl md:text-5xl font-black">{sol.title}</h1>
          <div className="mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span>Solutions</span>
            <span>/</span>
            <span className="text-white">{sol.title}</span>
          </div>
        </div>
      </section>

      {/* Main Solution Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Solution content Left (col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-8 text-left">
            {/* Main Image */}
            <div className="relative w-full aspect-[16/9] bg-gray-1000 rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <Image
                src={sol.image}
                alt={sol.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-base uppercase tracking-wider font-bold text-primary">{sol.subtitle}</span>
              <h3 className="text-2xl font-extrabold text-dark">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed text-justify">
                {sol.description}
              </p>
            </div>

            {/* Real Benefits */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xl font-bold text-dark">Real Benefits</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sol.benefits.map((b: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start p-4 bg-gray-1000 border border-gray-100 rounded-xl hover:shadow-sm transition-all"
                  >
                    <CheckCircle className="text-primary shrink-0 mt-0.5" size={18} />
                    <span className="text-sm text-gray-700 leading-relaxed font-semibold">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Details / Additional Images */}
            {sol.architectureImage && (
              <div className="flex flex-col gap-4 mt-4">
                <h4 className="text-xl font-bold text-dark">System Architecture</h4>
                <div className="relative w-full aspect-[16/10] bg-gray-1000 rounded-2xl overflow-hidden border border-gray-100 shadow p-4">
                  <Image
                    src={sol.architectureImage}
                    alt="System Architecture diagram"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            )}

            {/* Accordions for detailed breakdown (e.g. Asset Monitoring, Operations) */}
            {sol.accordions && (
              <div className="flex flex-col gap-4 mt-6">
                <h4 className="text-xl font-bold text-dark">Solution Capabilities</h4>
                <SolutionAccordion accordions={sol.accordions} />
              </div>
            )}
          </div>

          {/* Sidebar Right (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* SunLynk Advantage list */}
            <div className="bg-gray-1000 border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-800 text-lg mb-4 border-b border-gray-200 pb-2 uppercase tracking-wider text-xs">
                SunLynk Advantage
              </h4>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                SunLynk Solar revolves around the specific customized needs of every client.
              </p>
              <ul className="flex flex-col gap-3">
                {sidebarHighlights.map((hl: string, idx: number) => (
                  <li key={idx} className="flex gap-2 items-start text-xs text-gray-700 font-semibold">
                    <ShieldCheck className="text-primary shrink-0 mt-0.5" size={16} />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Inquiry CTA card */}
            <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-sm border border-gray-800 flex flex-col gap-4">
              <h4 className="font-bold text-lg">Request Solar Quotation</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Need a comprehensive rooftop solar layout design and subsidy calculation for your home or business?
              </p>
              <Link
                href="/contact"
                className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Quotation</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Sidebar quick support */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col gap-4">
              <h4 className="font-bold text-gray-800 text-lg">Inquire via Phone</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Get immediate assistance regarding solar system sizing, subsidies, and installation timelines.
              </p>
              <div className="flex flex-col gap-2">
                <a href="tel:+918573003001" className="flex items-center gap-2 text-sm font-bold text-dark hover:text-primary transition-colors">
                  <Phone size={16} className="text-primary" />
                  <span>+91 8573003001</span>
                </a>
                <a href="mailto:info@sunlynksolar.com" className="flex items-center gap-2 text-sm font-bold text-dark hover:text-primary transition-colors">
                  <Mail size={16} className="text-primary" />
                  <span>info@sunlynksolar.com</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Process Section */}
      {sol.process && (
        <section className="py-20 bg-gray-50 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2">
                <span className="h-[2px] w-6 bg-primary"></span>
                <span className="text-base uppercase tracking-wider font-bold text-primary">Our Process</span>
                <span className="h-[2px] w-6 bg-primary"></span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                Simple. Transparent. Efficient.
              </h2>
              <p className="text-sm text-gray-500 max-w-xl">
                Here is how we get your rooftop power station up, running, and saving you money.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto relative">
              {sol.process.map((step: any, idx: number) => (
                <div key={idx} className="group relative bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 flex flex-col h-full justify-between hover:-translate-y-1">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm mb-4">
                      0{idx + 1}
                    </div>
                    <h3 className="font-extrabold text-sm text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Bottom CTA Banner */}
      <section className="bg-dark text-white py-20 relative overflow-hidden">
        {/* Soft decorative background circles */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#2ecc71]/10 to-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[#2ecc71]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10 flex flex-col items-center gap-6">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full">
            Ready to Switch to Solar?
          </span>
          <h2 className="text-3xl md:text-5xl font-black leading-tight max-w-2xl">
            Discover how much you can save with a customized solar solution from SunLynk.
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl">
            Book a Free Consultation Today and Start Your Solar Journey with Confidence.
          </p>
          <Link
            href="/contact"
            className="mt-4 bg-primary hover:bg-primary-hover text-white font-extrabold py-4 px-8 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 text-sm flex items-center gap-2 group"
          >
            <span>Book Free Consultation</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
