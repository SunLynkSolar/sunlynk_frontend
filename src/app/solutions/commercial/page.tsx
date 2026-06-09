import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { CheckCircle, ArrowRight, Sun, ShieldCheck, Zap, Sparkles, Phone, Mail, Building2, Factory, Shield, Cpu, BarChart3, TrendingUp, Check, Users } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import CommercialCalculator from "@/components/CommercialCalculator";
import FaqAccordion from "@/components/FaqAccordion";
import GoogleReviews from "@/components/GoogleReviews";

export const metadata: Metadata = {
  title: "Commercial & Industrial (C&I) Solar Solutions | SunLynk Solar",
  description: "Reduce company operational costs and hit clean energy goals with SunLynk. We design and install high-performance commercial rooftop solar systems with quick ROI and Accelerated Depreciation benefits.",
  keywords: ["commercial solar Lucknow", "industrial rooftop solar", "C&I solar EPC company", "solar SCADA systems", "accelerated depreciation solar"],
};

export default function CommercialPage() {
  const benefits = [
    {
      title: "Reduce Operating Costs",
      desc: "Cut commercial utility bills instantly, turning operational electricity expenses into direct cash flow savings.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M6 3h12M6 8h12M6 13h8.5a3.5 3.5 0 1 0 0-7M6 13v9M14.5 13L9 22" />
          <path d="M21 21v-4m0 0l-3 3m3-3h-4" />
        </svg>
      )
    },
    {
      title: "Accelerated Payback",
      desc: "Average system ROI achieved in 3 to 4 years, followed by 20+ years of free energy generation.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 15 15" />
          <path d="M13 18l-3-6h6z" className="text-emerald-500 fill-current opacity-30" />
        </svg>
      )
    },
    {
      title: "Tax Depreciation Benefits",
      desc: "Leverage 40% Accelerated Depreciation in Year 1 to write off assets and offset corporate income taxes.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="1" />
          <circle cx="15" cy="15" r="1" />
          <line x1="16" y1="8" x2="8" y2="16" />
        </svg>
      )
    },
    {
      title: "ESG & Carbon Compliance",
      desc: "Fulfill green mandates and enhance carbon offset parameters for corporate sustainability metrics.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 0 8.5C17 15 15 20 11 20z" />
          <path d="M19 2L9.8 11.2" />
        </svg>
      )
    },
    {
      title: "Scalable Engineering",
      desc: "Custom structures designed to scale and support future additions like battery storage or EV points.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    },
    {
      title: "SCADA Integrated Control",
      desc: "Real-time generation dashboards and meteorological calibration standard on all C&I installations.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <path d="M6 10l3-3 3 3 6-5" />
        </svg>
      )
    }
  ];

  const suitableFor = [
    {
      name: "Factories",
      desc: "Offsets heavy daytime machinery loads and lowers per-unit utility tariffs.",
      image: "/new_assets/commercial/factories.webp"
    },
    {
      name: "Warehouses",
      desc: "Utilizes vast flat roof areas for massive generation and cold storage offsets.",
      image: "/new_assets/commercial/warehouse.png"
    },
    {
      name: "Educational Institutions",
      desc: "Reduces high daytime lighting and computer lab loads while promoting green campus values.",
      image: "/new_assets/commercial/school.jpeg"
    },
    {
      name: "Hospitals",
      desc: "Secures reliable hybrid solar backup for critical care units, cooling, and diagnostic loads.",
      image: "/new_assets/commercial/hospital.jpg"
    },
    {
      name: "Hotels",
      desc: "Powers 24/7 central air conditioning, heating, and laundry systems with maximum savings.",
      image: "/new_assets/commercial/hotels.jpg"
    },
    {
      name: "Office Buildings",
      desc: "Offsets heavy HVAC overheads and meets corporate ESG carbon compliance goals.",
      image: "/new_assets/commercial/offices.png"
    },
    {
      name: "Retail Establishments",
      desc: "Cuts daytime lighting, elevators, and air conditioning costs for a lower carbon footprint.",
      image: "/new_assets/commercial/retail.webp"
    },
    {
      name: "Industrial Facilities",
      desc: "Leverages open-access grids, large-scale structures, and high Accelerated Depreciation tax benefits.",
      image: "/new_assets/commercial/industry.webp"
    }
  ];

  const solutions = [
    {
      title: "Commercial On-Grid Solar Systems",
      desc: "Designed for industrial setups with steady daytime loads. Direct DISCOM utility connection allows exporting surplus capacity under industrial net metering.",
      points: ["Maximized tariff offsets", "Near-zero maintenance overheads", "Accelerated depreciation eligible"],
      theme: "border-[#1E293B] bg-[#0E1524]/60"
    },
    {
      title: "Commercial Hybrid Systems with BESS",
      desc: "Integrates solar panels with smart Battery Energy Storage Systems (BESS). Rest assured that critical machinery, laboratory tools, and servers remain live during grid drops.",
      points: ["Seamless backup switchovers", "Peak load shaving features", "Zero voltage dip protection"],
      theme: "border-[#1E293B] bg-[#0E1524]/60"
    },
  ];

  const faqs = [
    {
      id: 0,
      question: "How does Accelerated Depreciation (AD) save taxes for my business?",
      answer: "Under the Income Tax Act section 32, businesses installing commercial rooftop solar systems are eligible for 40% Accelerated Depreciation in the first year. This write-off reduces the corporate taxable income, yielding direct cash-flow savings that effectively offset up to 10% of the initial solar system investment in Year 1."
    },
    {
      id: 1,
      question: "What is the typical lifespan and maintenance cost of commercial solar installations?",
      answer: "A Tier-1 solar panel has an operational life of 25+ years with a performance guarantee. Maintenance is extremely minimal, consisting primarily of regular cleaning of panels to ensure high irradiance absorption, and electrical inspections. We provide automated SCADA diagnostics to flag when cleaning is required."
    },
    {
      id: 2,
      question: "Can we install solar panels if our roof structure is metallic or has high elevations?",
      answer: "Yes, our engineers specialize in multiple structural configurations. We install custom non-penetrative mounting clamps on metal roofs (preventing water leaks) and construct raised structural columns for flat concrete roofs, preserving the space below for operational tasks or recreation."
    },
    {
      id: 3,
      question: "How do we monitor generation efficiency across large multi-site installations?",
      answer: "SunLynk integrates standard SCADA architectures, weather monitoring stations (WMS), and cloud-based analytics with all commercial systems. Managers can check generation parameters, performance ratios (PR), and receive alert notifications on their smartphones or office screens."
    }
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* Premium Light Corporate Hero Section */}
      <section className="relative overflow-hidden bg-white">
        {/* Desktop-only background image (bottom-left) */}
        <div className="absolute left-0 bottom-0 w-[62%] h-[80%] z-0 pointer-events-none overflow-hidden hidden lg:block">
          <Image
            src="/assets/images/service/solar_commercial.webp"
            alt="Commercial solar rooftop background"
            fill
            className="object-cover object-bottom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/50 to-white" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-white" />
        </div>

        {/* Desktop-only right panel */}
        <div className="absolute top-0 right-0 h-full w-[45%] bg-slate-50/50 hidden lg:block z-0" />

        {/* Mobile background tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 to-white lg:hidden z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-start min-h-[unset] lg:min-h-[600px]">

            {/* Left Column: Context */}
            <div className="lg:col-span-7 flex flex-col gap-5 text-left pt-8 sm:pt-10 pb-2 lg:py-16">

              {/* Rated badge */}
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full py-1.5 px-3.5 self-start text-[11px] sm:text-xs font-bold text-slate-600 shadow-sm">
                <span className="text-amber-500 text-sm leading-none">★★★★★</span>
                <span>Accredited C&I EPC Partner</span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="hidden sm:inline">40% Year 1 Depreciation</span>
              </div>

              <h1 className="text-3xl  lg:text-5xl font-extrabold leading-[1.12] text-slate-950 tracking-tight">
                Turn Rooftop <br />
                <span className="text-primary relative inline-block">
                  Assets Into Profit
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-semibold max-w-xl">
                Utility costs represent a major chunk of operational overhead. Stabilize your business expenses with a custom engineered commercial solar network featuring quick payback structures and premium SCADA controls.
              </p>

              {/* Trust/Key Features row — mobile only */}
              <div className="flex flex-wrap gap-2 lg:hidden mt-1">
                {["40% Yr 1 AD Tax Savings", "SCADA Active Monitoring", "~3.5 Yrs Payback"].map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-semibold text-slate-600 bg-slate-100 rounded-full px-3 py-1"
                  >
                    ✓ {t}
                  </span>
                ))}
              </div>

              {/* Corporate Specs HUD layout — desktop only */}
              <div className="hidden lg:grid grid-cols-3 gap-4 mt-4 max-w-xl">
                <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <Cpu className="text-primary mb-2" size={20} />
                  <span className="block text-slate-950 font-extrabold text-sm">SCADA Ready</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mt-0.5">Real-time control</span>
                </div>
                <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <BarChart3 className="text-primary mb-2" size={20} />
                  <span className="block text-slate-950 font-extrabold text-sm">~3.5 Yrs Payback</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mt-0.5">High IRR Yield</span>
                </div>
                <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <TrendingUp className="text-primary mb-2" size={20} />
                  <span className="block text-slate-950 font-extrabold text-sm">40% Year 1 AD</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mt-0.5">Tax write-off asset</span>
                </div>
              </div>
            </div>

            {/* Right Column: Form card */}
            <div className="lg:col-span-5 w-full pt-2 pb-8 sm:pb-10 lg:py-16">
              <div className="bg-white rounded-xl sm:rounded-xl shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-slate-200/60 overflow-hidden">
                <ContactForm hideTabs={true} defaultTab="commercial" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Solutions Available */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-base uppercase tracking-wider font-bold text-primary">C&I Systems</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-950 leading-tight">
              Commercial Engineering Setups
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed">
              We design and construct systems matching the utility parameters, factory layouts, and compliance requirements of Indian industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {solutions.map((sol, index) => (
              <div
                key={index}
                className="border border-slate-200 bg-white rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col gap-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Sun size={24} />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-950 group-hover:text-primary transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-justify">
                    {sol.desc}
                  </p>
                  <ul className="flex flex-col gap-2.5 mt-2">
                    {sol.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex gap-2 items-center text-xs font-bold text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                          <Check size={10} className="stroke-[3]" />
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100 text-left">
                  <Link href="#solar-calculator" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-primary hover:underline">
                    <span>Calculate Payback</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Creative Interactive Suitability Grid */}
      <section className="py-20 bg-[#065F46] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-emerald-500"></span>
              <span className="text-base uppercase tracking-wider font-bold text-emerald-400">Suitability Profile</span>
              <span className="h-[2px] w-6 bg-emerald-500"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Sectors and Adaptability
            </h2>
            <p className="text-sm sm:text-base text-gray-100 max-w-2xl leading-relaxed">
              Our engineering systems are custom configured according to specific sector utility consumption footprints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {suitableFor.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#071813]/90 border border-emerald-950/45 rounded-md overflow-hidden hover:border-emerald-500/35 hover:shadow-2xl hover:shadow-emerald-950/40 hover:-translate-y-1.5 transition-all duration-500 text-left group flex flex-col"
              >
                {/* Image Showcase */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-emerald-950/20">
                  <img
                    src={item.image}
                    alt={`${item.name} with solar panel installation`}

                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col gap-1.5 flex-grow">
                  <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Benefits and Technical Details */}
      <section className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
        {/* Tech Radial Grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(46,204,113,0.025)_1.5px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Side: Technical benefits */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2">
                  <span className="h-[2px] w-6 bg-primary"></span>
                  <span className="text-base uppercase tracking-wider font-bold text-primary">Benefits</span>
                  <span className="h-[2px] w-6 bg-primary"></span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-950 leading-tight">
                  High-Performance Engineering Advantages
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((b, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50/70 border border-slate-200/60 p-6 rounded-xl shadow-sm hover:border-primary/25 transition-all duration-300 text-left flex flex-col gap-3 hover:shadow-md hover:bg-white group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {b.icon}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-950 mt-1">{b.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Showcase Image */}
            <div className="lg:col-span-5 relative w-full group">
              {/* Floating Card Top-Right: Tier-1 Hardware */}
              <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-xl p-4 flex items-center gap-3 max-w-[240px] shadow-xl z-20">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-950 leading-none block">Tier-1 Hardware</span>
                  <span className="block text-[9px] text-emerald-600 font-extrabold uppercase mt-1">● 25-Yr Guarantee</span>
                </div>
              </div>

              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-slate-200/60 z-10">
                <Image
                  src="/assets/images/service/solar_commercial.webp"
                  alt="Industrial commercial building solar array setup"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-xl p-4 flex items-center gap-3 max-w-[240px] shadow-xl z-20">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-950 leading-none block">SCADA Smart Grid</span>
                  <span className="block text-[9px] text-emerald-600 font-extrabold uppercase mt-1">● Active Monitoring</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose SunLynk */}
      <section className="py-24 bg-[#065F46] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full py-1 px-3.5 shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-300">Why Partner with Us</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Why Choose SunLynk
            </h2>
            <p className="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed mt-2 font-semibold">
              India's trusted commercial solar partner, delivering unmatched engineering capability, financial returns, and lifetime support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

            {/* Left Column: Visual Showcase */}
            <div className="lg:col-span-6 flex flex-col justify-between text-left">
              <div>
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-slate-200/60 bg-slate-100">
                  <Image
                    src="/assets/images/sunlynk_guy.webp"
                    alt="SunLynk Commercial Solar Expert"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-6 leading-tight">
                  Quality that lasts more than 25+ years
                </h3>
                <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2.5 font-semibold text-justify">
                  From custom engineering design and flawless execution to active SCADA monitoring and lifetime maintenance, we provide end-to-end support for your enterprise energy transition.
                </p>
              </div>
            </div>

            {/* Right Column: 2x2 Stats Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Stat 1: 10+ Years */}
              <div className="bg-white border border-slate-200/60 rounded-xl p-6 flex flex-col justify-between h-[200px]  hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                    <Sun size={20} />
                  </div>
                  <div>
                    <span className="block text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                      10+ Years
                    </span>
                    <span className="block text-xs font-bold text-slate-500 uppercase mt-2 tracking-wider leading-relaxed">
                      Industry Experience
                    </span>
                  </div>
                </div>
              </div>

              {/* Stat 2: 500+ */}
              <div className="bg-white border border-slate-200/60 rounded-xl p-6 flex flex-col justify-between h-[200px] hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <span className="block text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                      500+
                    </span>
                    <span className="block text-xs font-bold text-slate-500 uppercase mt-2 tracking-wider leading-relaxed">
                      Commercial & RWA Sites Solarized
                    </span>
                  </div>
                </div>
              </div>

              {/* Stat 3: 27,000+ */}
              <div className="bg-white border border-slate-200/60 rounded-xl p-6 flex flex-col justify-between h-[200px] hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <span className="block text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                      27,000+
                    </span>
                    <span className="block text-xs font-bold text-slate-500 uppercase mt-2 tracking-wider leading-relaxed">
                      Happy Customers
                    </span>
                  </div>
                </div>
              </div>

              {/* Stat 4: 800 Cr+ */}
              <div className="bg-white border border-slate-200/60 rounded-xl p-6 flex flex-col justify-between h-[200px] hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <span className="block text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                      800 Cr+
                    </span>
                    <span className="block text-xs font-bold text-slate-500 uppercase mt-2 tracking-wider leading-relaxed">
                      Cumulative Savings Generated
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Commercial Solar ROI Calculator */}
      <CommercialCalculator />

      {/* Real Projects Portfolio */}
      {/* <section className="py-20 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-base uppercase tracking-wider font-bold text-primary">C&I Portfolio</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-950 leading-tight">
              Real Commercial Implementations
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
              Explore actual industrial and commercial solar installations engineered by SunLynk, driving significant energy bill offsets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative overflow-hidden rounded-xl border border-slate-200 aspect-[4/3] shadow-md hover:border-primary/20 transition-all duration-300">
              <Image
                src="/assets/IMAGE/project/p (2).avif"
                alt="150kW Industrial Solar"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left text-white z-10">
                <span className="text-[10px] bg-primary text-white font-extrabold uppercase py-1 px-2.5 rounded-full">150kW On-Grid</span>
                <h3 className="text-xl font-extrabold mt-2">Industrial Rooftop, Factory</h3>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-slate-200 aspect-[4/3] shadow-md hover:border-primary/20 transition-all duration-300">
              <Image
                src="/assets/IMAGE/solar.webp"
                alt="500kW Commercial Rooftop Solar"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left text-white z-10">
                <span className="text-[10px] bg-primary text-white font-extrabold uppercase py-1 px-2.5 rounded-full">500kW Grid-Tied</span>
                <h3 className="text-xl font-extrabold mt-2">Commercial Office Hub</h3>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-slate-200 aspect-[4/3] shadow-md hover:border-primary/20 transition-all duration-300">
              <Image
                src="/assets/IMAGE/project/p (3).avif"
                alt="Solar SCADA Automation Console"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left text-white z-10">
                <span className="text-[10px] bg-sky-500 text-white font-extrabold uppercase py-1 px-2.5 rounded-full">SCADA Control</span>
                <h3 className="text-xl font-extrabold mt-2">Smart Grid SCADA Panel</h3>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <GoogleReviews />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-5 text-left flex flex-col gap-4 static lg:sticky top-24">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-xs uppercase tracking-widest font-extrabold text-primary">FAQ</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-950 leading-tight">Frequently Asked Questions</h3>
            <p className="text-sm text-slate-500 leading-relaxed text-justify">
              Critical parameters related to corporate asset capitalization, project funding options, structural wind loads, and net-metering clear codes.
            </p>
            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col gap-3.5 mt-4">
              <span className="text-base font-extrabold text-slate-950 block">Consult Our C&I Engineers</span>
              <div className="flex flex-col gap-2">
                <a href="tel:+918922036792" className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-primary transition-colors">
                  <Phone size={14} className="text-primary" />
                  <span>+91 8922036792</span>
                </a>
                <a href="mailto:info@SunLynkSolar.com" className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-primary transition-colors">
                  <Mail size={14} className="text-primary" />
                  <span>info@SunLynkSolar.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Accordion list with customized light styles */}
          <div className="lg:col-span-7 w-full text-left">
            <FaqAccordion faqs={faqs} />
          </div>

        </div>
      </section>
    </div>
  );
}
