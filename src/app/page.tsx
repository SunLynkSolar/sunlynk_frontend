import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SunLynk Solar - Premium Rooftop Solar Solutions & Subsidies",
  description: "SunLynk Solar is a premier solar panel installation company. We design and install high-efficiency rooftop solar systems for homes, housing societies, and commercial businesses in Lucknow, Uttar Pradesh, and across India.",
  keywords: [
    "solar panel installation",
    "rooftop solar panel installation",
    "solar panel subsidy",
    "government solar subsidy",
    "solar subsidy scheme",
    "PM Surya Ghar Yojana",
    "PM Surya Ghar Muft Bijli Yojana",
    "rooftop solar subsidy registration",
    "national solar portal subsidy",
    "solar panel cost in India",
    "best solar panel company",
    "solar panel installation near me",
    "residential solar panel installation",
    "commercial rooftop solar",
    "industrial solar installation",
    "on grid solar system subsidy",
    "solar EPC contractor India",
    "net metering solar system",
    "solar company in Uttar Pradesh",
    "solar panel installation Lucknow",
    "solar company Lucknow",
    "solar subsidy Lucknow",
    "rooftop solar Uttar Pradesh",
    "sunlynk solar lucknow",
    "sunlynk solar",
    "sunlynk rooftop solar",
    "sunlynk rooftop solar lucknow",
    "sunlynk rooftop solar UP",
    "sunlynk solar subsidy",
    "sunlynk solar subsidy lucknow",
    "sunlynk solar subsidy UP",

  ],
};
import HeroV2 from "@/components/HeroV2";
import TrustBar from "@/components/TrustBar";
import ProblemSection from "@/components/ProblemSection";
import ProductsPreview from "@/components/ProductsPreview";
import FaqAccordion from "@/components/FaqAccordion";
import StatsCounter from "@/components/StatsCounter";
import SolarCalculator from "@/components/SolarCalculator";
import ActualInstallations from "@/components/ActualInstallations";
import ContactForm from "@/components/ContactForm";
import {
  Sun,
  Wind,
  BatteryCharging,
  Trophy,
  Globe,
  Activity,
  ArrowRight,
  Users,
  ShieldCheck,
  Umbrella,
  Zap,
  Clock,
  Percent,
  Coins,
  Briefcase,
  Home as HomeIcon,
  TrendingUp,
  Building2,
  FileText
} from "lucide-react";
import GoogleReviews from "@/components/GoogleReviews";
import ZeroInvestmentCalculator from "@/components/ZeroInvestmentCalculator";
import LynkSureShowcase from "@/components/LynkSureShowcase";
import ServicesSection from "@/components/ServicesSection";
import SunLynkAdvantage from "@/components/SunLynkAdvantage";

export default function Home() {
  const faqs = [
    {
      id: 0,
      question: "How much does rooftop solar cost in Lucknow?",
      answer: "The cost depends on your electricity bill, roof space, system size, panel quality, inverter, and structure requirements. SunLynk gives you a custom quote after a rooftop survey."
    },
    {
      id: 1,
      question: "How much subsidy can I get in Uttar Pradesh?",
      answer: "Eligible residential customers can get central subsidy up to ₹78,000, and UP may offer additional state subsidy as per current rules which as in 2026 is 108,000 at the moment. SunLynk helps you check the latest applicable subsidy before installation."
    },
    {
      id: 2,
      question: "How does SunLynk help with subsidy paperwork?",
      answer: "We assist with registration, documents, application, installation records, and subsidy submission so the process stays simple for you."
    },
    {
      id: 3,
      question: "What is the Lynk Sure generation guarantee?",
      answer: "Lynk Sure is SunLynk’s generation assurance plan. We estimate your system’s expected solar output and commit to performance terms based on your rooftop design."
    },
    {
      id: 4,
      question: "What happens if my system produces less than promised?",
      answer: "We check monitoring data, site conditions, maintenance status, and guarantee terms. If the shortfall qualifies, compensation is handled as per the Lynk Sure plan."
    },
    {
      id: 5,
      question: "Can I install solar with EMI?",
      answer: "Yes. EMI and solar financing options are available for eligible customers, subject to finance partner approval."
    }
  ];

  // We will display the first 4 products on the home page

  const clientLogos = [
    "/assets/IMAGE/client/image25.avif",
    "/assets/IMAGE/client/image26.avif",
    "/assets/IMAGE/client/image27.avif",
    "/assets/IMAGE/client/image28.avif",
    "/assets/IMAGE/client/image29.avif",
    "/assets/IMAGE/client/image30.avif",
    "/assets/IMAGE/client/image31.avif",
    "/assets/IMAGE/client/image32.avif",
  ];

  const projectCases = [
    { src: "/assets/IMAGE/project/p (1).avif", title: "Rooftop Solar Project" },
    { src: "/assets/IMAGE/project/p (2).avif", title: "Industrial Rooftop Installation" },
    { src: "/assets/IMAGE/project/p (3).avif", title: "Commercial Rooftop Solar" },
    { src: "/assets/IMAGE/project/p (4).avif", title: "Residential Solar Installation" },
    { src: "/assets/IMAGE/project/p (5).avif", title: "Hybrid Solar Power Backup" },
  ];

  return (
    <div>
      <HeroV2 />
      <TrustBar />

      <ServicesSection />


      {/* Products Preview — Lynk Lite & Lynk Sure */}
      <ProductsPreview />


      {/* <SunLynkAdvantage /> */}
      <section className="py-8 md:py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <img
            src="/new_assets/advan_mob.webp"
            alt="SunLynk Advantage Mobile"
            className="block md:hidden w-full h-auto"
          />
          <img
            src="/new_assets/advan_desk.webp"
            alt="SunLynk Advantage Desktop"
            className="hidden md:block w-full h-auto"
          />
        </div>
      </section>

      {/* Our Process Section */}
      <section className="relative py-16 overflow-hidden" id="solar-process">
        {/* Dark Primary Gradient Background with Overlay Image */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/new_assets/hero banner.webp"
            alt="Solar rooftop background"
            fill
            className="object-cover mix-blend-overlay"
            priority
          />
          {/* <div className="absolute inset-0 bg-black/40"></div> */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#065F46]/10 via-[#065F46]/70 to-[#065F46]/60" ></div>

        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20 flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-base uppercase tracking-wider font-bold text-primary">How We Work</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Our Simple 4-Step Process
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed mt-1">
              From the initial rooftop evaluation to lifetime maintenance, we manage every detail under one roof to make your solar transition completely seamless.
            </p>

            {/* Speech bubble / Consultant avatar guide */}
            <div className="inline-flex items-center gap-3.5 bg-white/5 border border-white/10 rounded-full py-1.5 pl-2 pr-5 shadow-lg mt-4 hover:border-primary/20 transition-all duration-300 backdrop-blur-md">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 shadow-sm shrink-0">
                <Image
                  src="/new_assets/small_image.webp"
                  alt="SunLynk Guide"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-[11px] sm:text-xs text-white font-medium">
                <span className="text-primary font-bold">SunLynk Expert:</span> We handle all the surveys, 3D layouts, and subsidy papers for you.
              </p>
            </div>
          </div>

          {/* Process Steps */}
          <div className="relative max-w-7xl mx-auto">

            {/* Connecting Dashed Line (Desktop only) — aligned to center of circles */}
            <div className="absolute top-[96px] left-[12%] right-[12%] border-t-2 border-dashed border-primary/35 lg:block z-0" />

            {/* Mobile: Horizontal slider showing ~1.4 cards. Desktop: 4-col grid */}
            <div
              className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 lg:gap-6 relative z-10 snap-x snap-mandatory scroll-smooth pb-6 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >

              {/* Step 1 */}
              <div className="snap-start shrink-0 w-[240px] sm:w-[260px] lg:w-auto flex flex-col items-center text-center group">
                {/* Circle Image */}
                <div className="relative w-44 h-44 lg:w-48 lg:h-48 rounded-full border-4 border-[#fff] bg-[#0A1811] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.5)] group-hover:shadow-[0_12px_40px_-4px_rgba(46,204,113,0.35)] group-hover:border-primary transition-all duration-500 overflow-hidden shrink-0 z-10">
                  <Image
                    src="/new_assets/site_survey.webp"
                    alt="Free Home Visit & Rooftop Survey"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                {/* Step Badge */}
                <div className="bg-primary text-white text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md -mt-4 z-20 relative">
                  Step 01
                </div>
                {/* Text Content */}
                <div className="mt-4 flex flex-col items-center gap-1.5 px-1">
                  <h3 className="font-extrabold text-white text-sm sm:text-base lg:text-lg group-hover:text-primary transition-colors duration-300 leading-snug">
                    Free Home Visit &amp; Survey
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-gray-200 max-w-[220px]">
                    Our experts visit your property to evaluate shade, check roof strength, and measure usable space.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="snap-start shrink-0 w-[240px] sm:w-[260px] lg:w-auto flex flex-col items-center text-center group">
                {/* Circle Image */}
                <div className="relative w-44 h-44 lg:w-48 lg:h-48 rounded-full border-4 border-[#fff] bg-[#0A1811] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.5)] group-hover:shadow-[0_12px_40px_-4px_rgba(46,204,113,0.35)] group-hover:border-primary transition-all duration-500 overflow-hidden shrink-0 z-10">
                  <Image
                    src="/assets/images/process_design.webp"
                    alt="3D Solar Layout Design"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                {/* Step Badge */}
                <div className="bg-primary text-white text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md -mt-4 z-20 relative">
                  Step 02
                </div>
                {/* Text Content */}
                <div className="mt-4 flex flex-col items-center gap-1.5 px-1">
                  <h3 className="font-extrabold text-white text-sm sm:text-base lg:text-lg group-hover:text-primary transition-colors duration-300 leading-snug">
                    3D Solar Design
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-gray-200 max-w-[220px]">
                    We model a customized 3D layout showing optimal panel placement and shading zones.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="snap-start shrink-0 w-[240px] sm:w-[260px] lg:w-auto flex flex-col items-center text-center group">
                {/* Circle Image */}
                <div className="relative w-44 h-44 lg:w-48 lg:h-48 rounded-full border-4 border-[#fff] bg-[#0A1811] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.5)] group-hover:shadow-[0_12px_40px_-4px_rgba(46,204,113,0.35)] group-hover:border-primary transition-all duration-500 overflow-hidden shrink-0 z-10">
                  <Image
                    src="/new_assets/instalation.webp"
                    alt="Govt Approvals & Professional Installation"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                {/* Step Badge */}
                <div className="bg-primary text-white text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md -mt-4 z-20 relative">
                  Step 03
                </div>
                {/* Text Content */}
                <div className="mt-4 flex flex-col items-center gap-1.5 px-1">
                  <h3 className="font-extrabold text-white text-sm sm:text-base lg:text-lg group-hover:text-primary transition-colors duration-300 leading-snug">
                    Installation &amp; Execution
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-gray-200 max-w-[220px]">
                    We handle net metering, DISCOM permissions, and install panels with certified precision.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="snap-start shrink-0 w-[240px] sm:w-[260px] lg:w-auto flex flex-col items-center text-center group">
                {/* Circle Image */}
                <div className="relative w-44 h-44 lg:w-48 lg:h-48 rounded-full border-4 border-[#fff] bg-[#0A1811] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.5)] group-hover:shadow-[0_12px_40px_-4px_rgba(46,204,113,0.35)] group-hover:border-primary transition-all duration-500 overflow-hidden shrink-0 z-10">
                  <Image
                    src="/new_assets/aftersales.webp"
                    alt="After-Sales Service & Performance Monitoring"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                {/* Step Badge */}
                <div className="bg-primary text-white text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md -mt-4 z-20 relative">
                  Step 04
                </div>
                {/* Text Content */}
                <div className="mt-4 flex flex-col items-center gap-1.5 px-1">
                  <h3 className="font-extrabold text-white text-sm sm:text-base lg:text-lg group-hover:text-primary transition-colors duration-300 leading-snug">
                    After-Sales Service
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-gray-200 max-w-[220px]">
                    Enjoy post-commissioning performance checks, warranty claims, and proactive support.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>








      <LynkSureShowcase />


      <ZeroInvestmentCalculator />


      {/* Solar Savings Calculator */}
      <SolarCalculator />

      {/* Actual Installations Gallery */}
      {/* <ActualInstallations /> */}









      {/* Stats Counter Section */}
      {/* <StatsCounter /> */}

      {/* Problem Section — Why SunLynk */}
      <ProblemSection />


      {/* Products Grid Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-base uppercase tracking-wider font-bold text-primary">Our Products</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark">
              A System You Can Count On
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              We distribute the most bankable technology & products for the success of your solar business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full group"
              >
      <div className="relative w-full aspect-[4/3] bg-gray-1000 overflow-hidden">
        <Image
          src={prod.image}
          alt={prod.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-primary text-white text-[10px] uppercase font-bold py-1 px-2.5 rounded-full">
          {prod.categoryName}
        </div>
      </div>

     <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h4 className="font-bold text-gray-800 text-base mb-2 group-hover:text-primary transition-colors">
            {prod.title}
          </h4>
          <p className="text-xs text-gray-500 line-clamp-3">
            {prod.features[0]}
          </p>
        </div>
        <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
          <span className="text-xs font-bold text-primary">{prod.powerRange}</span>
          <Link
            href={`/products/${prod.slug}`}
            className="text-xs font-bold text-dark hover:text-primary transition-colors flex items-center gap-1"
          >
            <span>View Details</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  ))
  }
            </div >

    <div className="flex justify-center mt-12">
      <Link href="/products/n-type-bifacial-double-glass" className="btn-secondary">
        <span>View All Products</span>
      </Link>
    </div>
        </div >
      </section > */}




      {/* About Section */}
      {/* <section className="py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-xl">
              <Image 
                src="/assets/IMAGE/solar.webp" 
                alt="SunLynkSolar Panels" 
                fill 
                className="object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-4 bg-primary text-white p-6 rounded-2xl shadow-xl flex items-center gap-4 max-w-[240px]">
              <span className="text-5xl font-black">10+</span>
              <span className="text-sm font-semibold leading-tight uppercase tracking-wider">
                Years of Solar Experience
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="inline-flex items-center gap-2">
              <Sun className="text-primary" size={20} />
              <span className="text-base uppercase tracking-wider font-bold text-primary">About Us</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight">
              SunLynk Solar – Innovating Renewable Energy with Smart Solutions
            </h2>
            
            <p className="text-base text-gray-700 font-semibold leading-relaxed">
              We are a leading solar PV installation company and solar product specialists for residential & commercial applications.
            </p>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              SunLynk Solar is a premier provider of high-efficiency rooftop solar systems and smart energy tracking solutions. With a commitment to innovation, quality installation, and sustainability, we empower homes, housing societies, and businesses with advanced solar power integration and monitoring systems.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our installations enhance energy savings, optimize power generation, and enable seamless net metering connection, ensuring reliable and green energy management. Backed by deep engineering expertise and a customer-first approach, SunLynk Solar is shaping a cleaner energy future.
            </p>

            <Link href="/about" className="btn-primary self-start mt-2">
              <span>More About Us</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section> */}

      {/* Work Process */}
      {/* <section className="py-16 bg-gray-1000">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-base uppercase tracking-wider font-bold text-primary">Work Process</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark">
              How We Execute Our Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

            
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm relative group flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h4 className="text-lg font-bold text-gray-800">Getting Started</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Initial capacity planning, technical requirement evaluation, and site mapping to match optimal rooftop solar panel placement.
              </p>
            </div>

       
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm relative group flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h4 className="text-lg font-bold text-gray-800">System Installation</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Seamless structural alignment, heavy-duty mechanical mounting, wiring, and solar inverter setup handled by certified SunLynk engineers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm relative group flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h4 className="text-lg font-bold text-gray-800">Ready to Use</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Net-metering connection coordination, testing, commissioning, and cloud dashboard activation for real-time performance tracking.
              </p>
            </div>

          </div>
        </div>
      </section> */}


      {/* Blogs Section */}
      {/* <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-base uppercase tracking-wider font-bold text-primary">News & Articles</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight">
              Latest Insights & Solar Trends
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Stay updated with the latest technological breakthroughs, project case studies, and policy news in the solar industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src="/assets/images/blog_bifacial_panels.webp"
                  alt="Bifacial Solar Technology"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] uppercase font-bold py-1 px-3 rounded-full tracking-wider shadow-sm">
                  Technology
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-xs font-semibold text-gray-400 block mb-2">May 12, 2026 • 5 min read</span>
                  <h4 className="font-bold text-gray-800 text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                    Understanding Bifacial Solar Panel Technology & Albedo Effect
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed text-justify line-clamp-3 mb-6">
                    Bifacial solar modules can generate power from both sides, increasing output by up to 30%. Learn how the albedo effect and ground reflectivity optimize double-glass performance.
                  </p>
                </div>
                <div className="border-t border-gray-50 pt-4 mt-auto">
                  <Link
                    href="/blog"
                    className="text-xs font-bold text-dark hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src="/assets/images/blog_weather_station.webp"
                  alt="Solar Mounting Structures"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] uppercase font-bold py-1 px-3 rounded-full tracking-wider shadow-sm">
                  Engineering
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-xs font-semibold text-gray-400 block mb-2">Apr 28, 2026 • 6 min read</span>
                  <h4 className="font-bold text-gray-800 text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                    Why Professional Mounting Structures are Essential for Rooftop Solar
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed text-justify line-clamp-3 mb-6">
                    Strong mechanical structures are key to ensuring wind resistance and durability. Discover why premium galvanized iron and aluminum structures are required for safe installations.
                  </p>
                </div>
                <div className="border-t border-gray-50 pt-4 mt-auto">
                  <Link
                    href="/blog"
                    className="text-xs font-bold text-dark hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src="/assets/images/blog_battery_storage.webp"
                  alt="Battery Storage Integration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] uppercase font-bold py-1 px-3 rounded-full tracking-wider shadow-sm">
                  Solutions
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-xs font-semibold text-gray-400 block mb-2">Apr 15, 2026 • 7 min read</span>
                  <h4 className="font-bold text-gray-800 text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                    Integrating Smart Hybrid Inverters with Battery Backup
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed text-justify line-clamp-3 mb-6">
                    Hybrid solar systems combining battery storage require smart energy management. We analyze how modern hybrid inverters manage power dispatch during grid outages.
                  </p>
                </div>
                <div className="border-t border-gray-50 pt-4 mt-auto">
                  <Link
                    href="/blog"
                    className="text-xs font-bold text-dark hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-center mt-12">
            <Link href="/blog" className="btn-secondary">
              <span>View All News & Blog</span>
            </Link>
          </div>

        </div>
      </section> */}



      {/* Project Cases Section */}
      {/* <section className="py-18 bg-gray-1000">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-base uppercase tracking-wider font-bold text-primary">We Created</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark">
              Project Case Studies
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {projectCases.map((proj, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
              >
                <Image
                  src={proj.src}
                  alt={proj.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-wider mb-1">Solar Energy</span>
                  <h4 className="text-sm font-bold text-white leading-snug">{proj.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <GoogleReviews />

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-100 shadow-md">
              <Image
                src="/new_assets/faq.webp"
                alt="Faq Intro"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 justify-between">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 shadow-md">
                <Image
                  src="/new_assets/solarHome.webp"
                  alt="Faq Detail"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Play Video Trigger */}
              <div className="relative flex-grow rounded-xl overflow-hidden border border-gray-100 shadow-md group cursor-pointer min-h-[140px]">
                <Image
                  src="/new_assets/sunlynk_solar_pannels.webp"
                  alt="Solar Solutions Overview"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div>
            <div className="flex flex-col gap-4 mb-8">
              <div className="inline-flex items-center gap-2">
                <Sun className="text-primary" size={20} />
                <span className="text-base uppercase tracking-wider font-bold text-primary">Questions For Us</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight">FAQ Questions About Rooftop Solar</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Learn more about solar modules, roof layouts, generation guarantees, subsidies, and installation timelines.
              </p>
            </div>

            {/* Accordion container */}
            <FaqAccordion faqs={faqs} />

            {/* Link to all FAQs */}
            <div className="mt-8 flex justify-start">
              <Link
                href="/faqs"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3.5 px-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span>Know More</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Contact Form Section */}
      {/* <section className="py-20 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 overflow-hidden" id="free-consultation">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="flex flex-col gap-6 text-left lg:col-span-5">
              <div className="inline-flex items-center gap-2 self-start">
                <span className="h-[2px] w-6 bg-[#1C5085]"></span>
                <span className="text-base uppercase tracking-wider font-bold text-[#1C5085]">Start Saving Today</span>
                <span className="h-[2px] w-6 bg-[#1C5085]"></span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark leading-tight tracking-tight">
                Ready to cut your <br />
                <span className="text-[#1C5085]">electricity bills?</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed text-justify">
                Schedule a 1-on-1 free consultation with our solar engineers. We will analyze your roof space, estimate your monthly savings, and design a customized solar transition roadmap.
              </p>
              
              <div className="flex flex-col gap-3 mt-2 text-sm text-gray-700 font-semibold">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-[#DBEAFE] text-[#1C5085] rounded-full flex items-center justify-center text-[10px] font-bold">✓</div>
                  <span>Free 3D Rooftop Simulation Layout</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-[#DBEAFE] text-[#1C5085] rounded-full flex items-center justify-center text-[10px] font-bold">✓</div>
                  <span>Custom Energy Bill Analysis & ROI Report</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-[#DBEAFE] text-[#1C5085] rounded-full flex items-center justify-center text-[10px] font-bold">✓</div>
                  <span>Expert Advice with Zero Purchase Pressure</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section> */}


      {/* Client Logos Carousel Section */}
      {/* <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {clientLogos.map((logo, idx) => (
              <div key={idx} className="relative w-28 h-12 flex items-center justify-center">
                <Image 
                  src={logo} 
                  alt={`Client Logo ${idx + 1}`} 
                  fill 
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}

    </div >
  );
}
