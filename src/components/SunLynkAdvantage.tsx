"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Wrench, Headphones, Users, ArrowRight, Check, X, ChevronLeft, ChevronRight, Zap, ZapOff, Shield, Droplets, CalendarCheck, CalendarX, Receipt, BadgeCheck, CircleDollarSign, Gem, TrendingDown } from "lucide-react";

// 6 Core Advantages exactly matching the layout spec
// const coreAdvantages = [
//   {
//     title: "LynkSure™",
//     subtitle: "Generation\nGuarantee",
//     icon: "/new_assets/advantage/lynksure.svg",
//     link: "#",
//   },
//   {
//     title: "LynkShield™",
//     subtitle: "Waterproof\nProtection",
//     icon: "/new_assets/advantage/lynkshield.svg",
//     link: "#",
//   },
//   {
//     title: "LynkCare™",
//     subtitle: "5-Year\nAMC",
//     icon: "/new_assets/advantage/lynkcare.svg",
//     link: "#",
//   },
//   {
//     title: "LynkRepair™",
//     subtitle: "Repair\nProtection",
//     icon: "/new_assets/advantage/lynkrepair.svg",
//     link: "#",
//   },
//   {
//     title: "LynkFinance™",
//     subtitle: "Easy\nFinancing",
//     icon: "/new_assets/advantage/lynkfinance.svg",
//     link: "#",
//   },
//   {
//     title: "LynkDesign™",
//     subtitle: "Maximum\nGeneration",
//     icon: "/new_assets/advantage/lynkdesign.svg",
//     link: "#",
//   },
// ];

// Why it matters concise details
const whyItMatters = [
  {
    title: "Heavy Rain?",
    description: "LynkShield keeps your roof and system 100% waterproof.",
    icon: "/new_assets/advantage/heavy-rain.svg",
  },
  {
    title: "Lower Generation?",
    description: "LynkSure guarantees the power output we promise.",
    icon: "/new_assets/advantage/lower-generation.svg",
  },
  {
    title: "System Stops?",
    description: "One call is all it takes. Maintenance & repairs covered.",
    icon: "/new_assets/advantage/system-stops.svg",
  },
  {
    title: "High Bills?",
    description: "Precision optimization ensures lower monthly utility bills.",
    icon: "/new_assets/advantage/high-bills.svg",
  },
  {
    title: "Upfront Cost?",
    description: "Flexible EMI options make solar affordable for everyone.",
    icon: "/new_assets/advantage/upfront-cost.svg",
  },
  {
    title: "Long Life?",
    description: "30+ years of active generation with premium components.",
    icon: "/new_assets/advantage/worried-life.svg",
  },
];

// Comparison Matrix Data
const comparisonRows = [
  {
    feature: "Generation Guarantee",
    featureDesc: "Protects your investment against drop in generation.",
    sunlynk: {
      text: "LynkSure™ Guarantee",
      desc: "Guaranteed annual power production; shortfall reimbursed in cash.",
      icon: Zap,
    },
    typical: {
      text: "No Guarantee",
      desc: "Only verbal claims. No reimbursement if generation falls short.",
      icon: ZapOff,
    }
  },
  {
    feature: "Roof Waterproofing",
    featureDesc: "Keeps your roof structure free from water damage.",
    sunlynk: {
      text: "LynkShield™ Warranty",
      desc: "Custom-engineered waterproof mounting with a written safety warranty.",
      icon: Shield,
    },
    typical: {
      text: "No Water Leak Warranty",
      desc: "Standard drilling with basic sealing; high risk of seepage over time.",
      icon: Droplets,
    }
  },
  {
    feature: "Annual Maintenance",
    featureDesc: "Ongoing optimization to maintain maximum efficiency.",
    sunlynk: {
      text: "LynkCare™ 5-Year AMC",
      desc: "Zero-cost preventive checks, regular cleaning, and system checks.",
      icon: CalendarCheck,
    },
    typical: {
      text: "Limited or Paid AMC",
      desc: "High visit fees or complete lack of service after installation.",
      icon: CalendarX,
    }
  },
  {
    feature: "Repair Protection",
    featureDesc: "Handles part replacements and service calls.",
    sunlynk: {
      text: "LynkRepair™ Coverage",
      desc: "No charges for spare parts, accessories, or expert technical labor.",
      icon: Wrench,
    },
    typical: {
      text: "Pay For Every Repair",
      desc: "Customers pay out-of-pocket for technical visits and replacement parts.",
      icon: Receipt,
    }
  },
  {
    feature: "Solar Financing",
    featureDesc: "Ease of payment options for setting up the plant.",
    sunlynk: {
      text: "LynkFinance™ EMIs",
      desc: "Instant approvals, collateral-free loans, and low-interest EMI tenures.",
      icon: BadgeCheck,
    },
    typical: {
      text: "No Finance Support",
      desc: "Requires full upfront cash; customer has to arrange bank loans themselves.",
      icon: CircleDollarSign,
    }
  },
  {
    feature: "Durability & Output",
    featureDesc: "Ensures longevity of materials and clean energy output.",
    sunlynk: {
      text: "LynkDesign™ Optimization",
      desc: "30+ years of high-performance output designed with premium components.",
      icon: Gem,
    },
    typical: {
      text: "Standard Lifespan",
      desc: "Average components that degrade rapidly, losing major efficiency in 5-10 years.",
      icon: TrendingDown,
    }
  }
];

// Bottom trust badges
const trustBadges = [
  {
    title: "Premium Quality",
    desc: "Top-tier components sourced from trusted global solar giants.",
    icon: Sparkles,
  },
  {
    title: "Expert Installation",
    desc: "Certified in-house technicians, zero sub-contracting risk.",
    icon: Wrench,
  },
  {
    title: "Lifetime Support",
    desc: "Dedicated account support team, here for you long term.",
    icon: Headphones,
  },
  {
    title: "Trusted by Homeowners",
    desc: "Hundreds of active systems running smoothly across the country.",
    icon: Users,
  },
];

export default function SunLynkAdvantage() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(1200);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const totalItems = whyItMatters.length;
  // Responsive layout limits for 4-in-a-row format on desktop:
  // Desktop >= 1024px: 4 items visible
  // Tablet >= 768px: 2 items visible
  // Mobile < 768px: 1 item visible
  const itemsPerView = windowWidth >= 1024 ? 4 : windowWidth >= 768 ? 2 : 1;
  const maxIndex = totalItems - itemsPerView;

  // Sync index on window resize to avoid visual overflow bounds
  React.useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [maxIndex, currentIndex]);

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, maxIndex) : prev - 1));
  };

  // Autoplay loop waiting 5 seconds, paused on hover
  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  return (
    <section
      className="relative py-20  to-slate-50/40 overflow-hidden border-t border-slate-100"
      id="sunlynk-advantage"
    >
      {/* Micro tech grid backdrop using theme-colored accents */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_0.015,transparent_1px)] bg-[size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ================= SECTION 1: HEADER & CORE ADVANTAGES ================= */}
        {/* 5-Column Grid: 1 span heading (20%) + 4 span image (80%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-16">

          {/* Left Column (1/5 = 20%): Heading and Subtitle */}
          <div className="lg:col-span-1 flex flex-col justify-center space-y-5 text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-[1.1]">
              The SunLynk <br />
              <span className="text-primary">
                Advantage
              </span>
            </h2>

            <div className="space-y-1.5">
              <p className="text-sm text-slate-800 font-extrabold leading-tight">
                More than installation.
              </p>
              <p className="text-xs text-slate-500 font-bold leading-normal">
                Complete protection. Maximum savings.
              </p>
            </div>
          </div>

          {/* Right Column (4/5 = 80%): Solar Rendering */}
          <div className="lg:col-span-4">
            <div className="relative w-full h-[180px] sm:h-[240px] md:h-[300px] flex items-end justify-centeroverflow-hidden bg-gradient-to-b from-transparent to-transparent">
              {/* Theme primary Glow behind the panel */}
              {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,204,113,0.12)_0%,transparent_60%)] pointer-events-none" /> */}

              <div className="relative w-[100%] h-[100%]">
                <Image
                  src="/new_assets/s2.png"
                  alt="Sleek solar panel rendering"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: WHY IT MATTERS TO YOU (AUTOPLAY CAROUSEL 4-IN-A-ROW) ================= */}
        <div className="text-center mb-8 ">
          <div className="flex justify-center items-center gap-3 mb-3">
            <span className="h-[2px] w-6 bg-primary"></span>
            <span className="text-base uppercase tracking-wider font-bold text-primary">
              Customer Centric Solar
            </span>
            <span className="h-[2px] w-6 bg-primary"></span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Why It Matters To You
          </h3>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mt-2 font-medium">
            Discover the direct impact of SunLynk solar installation on your daily life, roof health, and savings.
          </p>
        </div>

        {/* Autoplay Carousel Wrapper with tighter spacing and professional 4-in-a-row config */}
        <div
          className="relative mx-auto overflow-hidden mb-20 group/carousel-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Inner view container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {whyItMatters.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-1/2 lg:w-1/4 shrink-0 p-3"
                >
                  <div className="h-full bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                    {/* Glowing effect using theme primary background color */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none group-hover:bg-primary/10 transition-all duration-500" />

                    <div>
                      {/* Header Icon + Title */}
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-12 h-12 relative bg-slate-50 rounded-xl flex items-center justify-center p-2 border border-slate-100 group-hover:scale-105 transition-all shrink-0">
                          <Image
                            src={item.icon}
                            alt={item.title}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm leading-snug tracking-tight">
                          {item.title}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom decorative underline accent */}
                    <div className="w-6 h-0.5 bg-slate-200 group-hover:bg-primary group-hover:w-12 transition-all duration-300 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md hover:bg-primary hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-105 opacity-0 group-hover/carousel-wrapper:opacity-100 focus:opacity-100 hover:border-primary"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md hover:bg-primary hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-105 opacity-0 group-hover/carousel-wrapper:opacity-100 focus:opacity-100 hover:border-primary"
            aria-label="Next slide"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>

          {/* Slide Indicator Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-5 bg-primary" : "w-2 bg-slate-200 hover:bg-slate-350"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ================= SECTION 3: COMPARISON MATRIX ================= */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-3">
            <span className="h-[2px] w-6 bg-primary"></span>
            <span className="text-base uppercase tracking-wider font-bold text-primary">
              Brand Matrix
            </span>
            <span className="h-[2px] w-6 bg-primary"></span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            How We Stand Out
          </h3>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mt-2 font-medium">
            A side-by-side breakdown of the SunLynk guarantee versus standard regional installers.
          </p>
        </div>

        {/* Comparative Matrix Section */}
        <div className="relative mb-24">

          {/* Desktop View: Clean Grid Table */}
          <div className="hidden lg:block overflow-hidden bg-white border border-slate-200/80 rounded-2xl shadow-md relative">

            {/* Header row */}
            <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200/80 text-slate-800 font-extrabold text-xs uppercase tracking-wider items-center">
              <div className="col-span-4 p-6">Comparison Parameter</div>
              <div className="col-span-4 p-6  bg-[#6CB327] text-white text-center rounded-t-3xl relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                SunLynk Solar Advantage
              </div>
              <div className="col-span-4 p-6 text-center text-slate-500">Typical Installer</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-100">
              {comparisonRows.map((row, idx) => {
                const SunlynkIcon = row.sunlynk.icon;
                const TypicalIcon = row.typical.icon;
                return (
                  <div key={idx} className="grid grid-cols-12 items-stretch group hover:bg-slate-50/30 transition-colors">

                    {/* Parameter Info */}
                    <div className="col-span-4 p-6 flex flex-col justify-center">
                      <h5 className="font-extrabold text-slate-900 text-sm mb-1 tracking-tight">
                        {row.feature}
                      </h5>
                      <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                        {row.featureDesc}
                      </p>
                    </div>

                    {/* SunLynk Advantage */}
                    <div className="col-span-4 p-6 bg-primary/5 border-x border-primary/10 flex flex-col justify-center relative group-hover:bg-primary/10 transition-all duration-300">
                      <div className="absolute left-0 inset-y-0 w-[3px] bg-[#6CB327]" />

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center shrink-0">
                          <SunlynkIcon size={18} strokeWidth={2} className="text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3" strokeWidth={3.5} />
                            </span>
                            <span className="text-sm font-extrabold text-slate-900 tracking-tight">
                              {row.sunlynk.text}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                            {row.sunlynk.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Typical Installer */}
                    <div className="col-span-4 p-6 flex flex-col justify-center bg-slate-50/5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-slate-100 border border-slate-200/50 rounded-xl flex items-center justify-center shrink-0">
                          <TypicalIcon size={18} strokeWidth={2} className="text-slate-400" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                              <X className="w-3 h-3" strokeWidth={3.5} />
                            </span>
                            <span className="text-sm font-bold text-slate-700 tracking-tight">
                              {row.typical.text}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            {row.typical.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet View: Interactive Card List */}
          <div className="block lg:hidden space-y-6">
            {comparisonRows.map((row, idx) => {
              const SunlynkIcon = row.sunlynk.icon;
              const TypicalIcon = row.typical.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4"
                >
                  <div>
                    <span className="text-[10px] font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-md uppercase tracking-wider">
                      Parameter {idx + 1}
                    </span>
                    <h5 className="font-extrabold text-slate-900 text-base mt-2 tracking-tight">
                      {row.feature}
                    </h5>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">
                      {row.featureDesc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* SunLynk */}
                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 relative overflow-hidden">
                      <div className="absolute left-0 inset-y-0 w-[3px] bg-primary" />
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <SunlynkIcon size={15} strokeWidth={2} className="text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={3} />
                            <span className="text-xs font-extrabold text-slate-900">{row.sunlynk.text}</span>
                          </div>
                          <p className="text-[11px] text-slate-650 font-semibold leading-normal">
                            {row.sunlynk.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Typical Installer */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                          <TypicalIcon size={15} strokeWidth={2} className="text-slate-400" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <X className="w-4 h-4 text-rose-500 shrink-0" strokeWidth={3} />
                            <span className="text-xs font-bold text-slate-700">{row.typical.text}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium leading-normal">
                            {row.typical.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION 4: TRUST BADGES & CONCLUDING PARTNER CTA ================= */}

        {/* Trust badges grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Icon size={20} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight">{badge.title}</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Concluding full width banner styled using premium dark slate matching calculators */}
        <div className="relative bg-[#065F46] rounded-2xl p-8 md:p-12 text-white shadow-xl overflow-hidden border border-slate-800">

          {/* Decorative glows and mesh grid */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <span className="text-[9px] font-extrabold tracking-widest text-white uppercase bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full inline-block">
                SOLAR PARTNER
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                SunLynk isn't just another installer. <br />
                <span className="text-primary">We're your long-term solar partner.</span>
              </h3>
              <p className="text-sm text-white leading-relaxed">
                From custom structural 3D design to waterproof warranties and certified energy generation protection, we stand by your system for the next three decades.
              </p>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <Link
                href="/contact"
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-[#33560f] font-extrabold px-8 py-4.5 rounded-xl shadow-lg transition-all duration-300 group text-sm tracking-wide shrink-0"
              >
                <span>Connect With Our Solar Expert</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
