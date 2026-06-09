import React from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import HeroV2 from "@/components/HeroV2";
import TrustBar from "@/components/TrustBar";
import ProblemSection from "@/components/ProblemSection";
import ProductsPreview from "@/components/ProductsPreview";
import FaqAccordion from "@/components/FaqAccordion";
import StatsCounter from "@/components/StatsCounter";
import productsData from "@/data/products.json";
import SolarCalculator from "@/components/SolarCalculator";
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

export default function Home() {
  const faqs = [
    {
      id: 0,
      question: "How do solar panels work?",
      answer: "Solar panels work by absorbing sunlight with photovoltaic cells, generating direct current (DC) energy, and then converting it into usable alternating current (AC) energy with the help of inverter technology."
    },
    {
      id: 1,
      question: "What are the main types of solar energy systems?",
      answer: "There are three main types: Grid-tied systems (connected to the utility grid), Off-grid systems (independent systems with battery storage), and Hybrid systems (connected to the grid but equipped with battery storage for backup)."
    },
    {
      id: 2,
      question: "What are the advantages of solar energy?",
      answer: "Solar energy is a clean, renewable, and abundant source of power. It reduces electricity bills, has low maintenance costs, helps mitigate carbon emissions, and supports energy independence."
    },
    {
      id: 3,
      question: "How much space do I need for solar panels?",
      answer: "Space requirements depend on the solar panel efficiency and your energy needs. Typically, residential installations require 100 to 400 square feet of roof area, while commercial systems scale much larger."
    }
  ];

  // We will display the first 4 products on the home page
  const featuredProducts = productsData.slice(0, 4);

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
    { src: "/assets/IMAGE/project/p (1).avif", title: "Utility Scale PV Project" },
    { src: "/assets/IMAGE/project/p (2).avif", title: "Industrial Rooftop Installation" },
    { src: "/assets/IMAGE/project/p (3).avif", title: "Commercial Smart Grid SCADA" },
    { src: "/assets/IMAGE/project/p (4).avif", title: "Residential BESS Solution" },
    { src: "/assets/IMAGE/project/p (5).avif", title: "Solar Microgrid Storage" },
  ];

  return (
    <div>
      <HeroV2 />
      <TrustBar />

      {/* Services Grid Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-base uppercase tracking-wider font-bold text-primary">Our Solutions</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark">
              Solar for Every Need
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed mt-2">
              From <strong className="text-dark font-semibold">Residential Solar in Lucknow</strong> to robust <strong className="text-dark font-semibold">Housing Society Solar Solutions</strong> and setups engineered by a leading <strong className="text-dark font-semibold">Commercial Solar EPC Company</strong>, we design custom systems that slash electricity bills and deliver long-term value.
            </p>
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

            {/* Card 1: Homes */}
            <div className="group relative bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden flex flex-col">
              {/* Image Header */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src="/new_assets/solarHome.png"
                  alt="Solar panels on a modern home rooftop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Stat Badge */}
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-extrabold py-1.5 px-4 rounded-full shadow-md z-10">
                  Save up to 90%
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow gap-5">
                {/* Title and Green Subtitle */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md">
                    <HomeIcon size={22} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-primary transition-colors duration-300">
                      Homes
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-emerald-600 mt-0.5">
                      Reduce Your Electricity Bill by Up to 90%
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed min-h-[40px]">
                  Perfect for independent houses looking for maximum savings and government subsidies.
                </p>

                <div className="border-t border-dashed border-gray-200 my-1" />

                {/* Specification Bar */}
                <div className="grid grid-cols-3 gap-1 py-1 text-left">
                  <div className="flex items-center gap-1.5 border-r border-gray-100 pr-1">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Clock size={13} className="stroke-[2.5]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">Payback in</span>
                      <span className="text-[11px] font-extrabold text-gray-800 mt-0.5 leading-none">4 - 6 Years</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 border-r border-gray-100 pl-1.5 pr-1">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <ShieldCheck size={13} className="stroke-[2.5]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">25 Years</span>
                      <span className="text-[11px] font-extrabold text-gray-800 mt-0.5 leading-none">Warranty</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pl-1.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Percent size={13} className="stroke-[2.5]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">Up to 90%</span>
                      <span className="text-[11px] font-extrabold text-gray-800 mt-0.5 leading-none">Savings</span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center justify-between gap-4 mt-2">
                  <Link
                    href="/contact"
                    className="flex-grow bg-emerald-600 text-white font-extrabold py-2.5 px-4 rounded-lg text-center text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <span>Get Free Quote</span>
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-800 hover:text-primary transition-colors duration-300 shrink-0"
                  >
                    <span>Know More</span>
                    <ArrowRight size={14} className="text-emerald-600" />
                  </Link>
                </div>

                {/* Bottom Best for Pill */}
                <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl px-3.5 py-2.5 flex items-center gap-2 mt-auto">
                  <TrendingUp size={15} className="text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-gray-700">
                    Best for: <span className="font-normal text-gray-600">Independent Houses, Villas, Bungalows</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Housing Societies */}
            <div className="group relative bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden flex flex-col">
              {/* Image Header */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src="/new_assets/housingSocities.png"
                  alt="Housing society with rooftop solar installation"
                  className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Stat Badge */}
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-extrabold py-1.5 px-4 rounded-full shadow-md z-10">
                  Save Lakhs Every Year
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow gap-5">
                {/* Title and Green Subtitle */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md">
                    <Building2 size={22} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-primary transition-colors duration-300">
                      Housing Societies
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-emerald-600 mt-0.5">
                      Reduce Common Area Costs Significantly
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed min-h-[40px]">
                  Smart solar solutions for RWAs & Apartment Complexes to lower electricity expenses.
                </p>

                <div className="border-t border-dashed border-gray-200 my-1" />

                {/* Specification Bar */}
                <div className="grid grid-cols-3 gap-1 py-1 text-left">
                  <div className="flex items-center gap-1.5 border-r border-gray-100 pr-1">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Coins size={13} className="stroke-[2.5]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">Save ₹10-50</span>
                      <span className="text-[11px] font-extrabold text-gray-800 mt-0.5 leading-none">Lakhs Annually</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 border-r border-gray-100 pl-1.5 pr-1">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Clock size={13} className="stroke-[2.5]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">Payback in</span>
                      <span className="text-[11px] font-extrabold text-gray-800 mt-0.5 leading-none">3 - 5 Years</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pl-1.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <ShieldCheck size={13} className="stroke-[2.5]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">25 Years</span>
                      <span className="text-[11px] font-extrabold text-gray-800 mt-0.5 leading-none">Warranty</span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center justify-between gap-4 mt-2">
                  <Link
                    href="/contact"
                    className="flex-grow bg-emerald-600 text-white font-extrabold py-2.5 px-4 rounded-lg text-center text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <span>Get Free Consultation</span>
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-800 hover:text-primary transition-colors duration-300 shrink-0"
                  >
                    <span>Know More</span>
                    <ArrowRight size={14} className="text-emerald-600" />
                  </Link>
                </div>

                {/* Bottom Best for Pill */}
                <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl px-3.5 py-2.5 flex items-center gap-2 mt-auto">
                  <Users size={15} className="text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-gray-700">
                    Best for: <span className="font-normal text-gray-600">Apartments, RWAs, Gated Communities</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Commercial */}
            <div className="group relative bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden flex flex-col">
              {/* Image Header */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src="/new_assets/commercial.PNG"
                  alt="Commercial building with solar panel installation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Stat Badge */}
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-extrabold py-1.5 px-4 rounded-full shadow-md z-10">
                  Boost Your Profits
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow gap-5">
                {/* Title and Green Subtitle */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md">
                    <Briefcase size={22} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-primary transition-colors duration-300">
                      Commercial
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-emerald-600 mt-0.5">
                      Lower Operating Costs. Increase Profits.
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed min-h-[40px]">
                  High-performance solar systems for factories, warehouses, offices & commercial spaces.
                </p>

                <div className="border-t border-dashed border-gray-200 my-1" />

                {/* Specification Bar */}
                <div className="grid grid-cols-3 gap-1 py-1 text-left">
                  <div className="flex items-center gap-1.5 border-r border-gray-100 pr-1">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <TrendingUp size={13} className="stroke-[2.5]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">ROI in</span>
                      <span className="text-[11px] font-extrabold text-gray-800 mt-0.5 leading-none">3 - 4 Years</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 border-r border-gray-100 pl-1.5 pr-1">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <FileText size={13} className="stroke-[2.5]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">Tax Benefits</span>
                      <span className="text-[11px] font-extrabold text-gray-800 mt-0.5 leading-none">Available</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pl-1.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <ShieldCheck size={13} className="stroke-[2.5]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">25 Years</span>
                      <span className="text-[11px] font-extrabold text-gray-800 mt-0.5 leading-none">Warranty</span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center justify-between gap-4 mt-2">
                  <Link
                    href="/contact"
                    className="flex-grow bg-emerald-600 text-white font-extrabold py-2.5 px-4 rounded-lg text-center text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <span>Get Free Consultation</span>
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-800 hover:text-primary transition-colors duration-300 shrink-0"
                  >
                    <span>Know More</span>
                    <ArrowRight size={14} className="text-emerald-600" />
                  </Link>
                </div>

                {/* Bottom Best for Pill */}
                <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl px-3.5 py-2.5 flex items-center gap-2 mt-auto">
                  <Building2 size={15} className="text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-gray-700">
                    Best for: <span className="font-normal text-gray-600">Factories, Warehouses, Offices, Hotels</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>



      {/* Our Process Section */}
      <section className="relative py-16 overflow-hidden" id="solar-process">
        {/* Dark Primary Gradient Background with Overlay Image */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/new_assets/hero banner.JPG"
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
                  src="/assets/images/sunlynk_guy.webp"
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
                    src="/assets/images/process_survey.webp"
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
                    src="/assets/images/process_installation.webp"
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
                    src="/assets/images/process_service.webp"
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





      {/* Products Preview — Lynk Lite & Lynk Sure */}
      <ProductsPreview />



      <LynkSureShowcase />

      <ZeroInvestmentCalculator />


      {/* Solar Savings Calculator */}
      <SolarCalculator />









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
              We are a leading solar PV product distributor and solar product specialists for residential & commercial headquartered in New Delhi, India.
            </p>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              SunLynk Solar is a leading provider of weather stations, solar forecasting, SCADA, and energy storage solutions (ESS) for the renewable energy sector. With a commitment to innovation, precision, and sustainability, we empower solar and wind energy projects with advanced monitoring, control, and automation technologies.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our solutions enhance efficiency, optimize performance, and enable seamless grid integration, ensuring reliable, data-driven energy management. Backed by deep industry expertise and a forward-thinking approach, SunLynk Solar is shaping the future of smart renewable energy solutions.
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
                Initial capacity planning, technical requirement evaluation, and site mapping to match optimal weather station or SCADA architectures.
              </p>
            </div>

       
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm relative group flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h4 className="text-lg font-bold text-gray-800">System Installation</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Seamless calibration, heavy-duty mechanical mounting, wiring, and sensor configuration handled by certified SunLynkengineers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm relative group flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h4 className="text-lg font-bold text-gray-800">Ready to Use</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Universal Modbus RTU/TCP data normalization, local HMI testing, and cloud dashboard activation for real-time tracking.
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
                  alt="Class-A Weather Monitoring"
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
                    Why Class-A Weather Monitoring is Essential for Utility PV
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed text-justify line-clamp-3 mb-6">
                    Precise meteorological data is key to calculating performance ratio (PR). Discover why Class-A pyranometers and weather monitoring stations are required by grid operators.
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
                    Integrating Battery Storage (BESS) with SCADA for Grid Stability
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed text-justify line-clamp-3 mb-6">
                    Hybrid solar systems combining battery energy storage require intelligent SCADA dispatch algorithms. We analyze how Modbus control loops maintain zero-export grid compliance.
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
                src="/assets/IMAGE/solar.webp"
                alt="Faq Intro"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 justify-between">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 shadow-md">
                <Image
                  src="/assets/IMAGE/forecasting.webp"
                  alt="Faq Detail"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Play Video Trigger */}
              <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-3">
                  <Sun size={20} />
                </div>
                <h5 className="font-bold text-gray-800 text-sm">Watch Our Intro</h5>
                <p className="text-xs text-gray-500 mt-1">Solar PV & SCADA Solutions Overview</p>
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
              <h3 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight">Some FAQ Questions</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Learn more about solar modules, meteorological data loggers, SCADA platforms, and storage integration technologies.
              </p>
            </div>

            {/* Accordion container */}
            <FaqAccordion faqs={faqs} />
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
