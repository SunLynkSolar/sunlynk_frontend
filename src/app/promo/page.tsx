"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Coins,
  CreditCard,
  Users,
  CheckCircle2,
  Award,
  Wind,
  Mountain,
  Layers,
  Wrench,
  Headphones,
  Calendar,
  FileText,
  Building2,
  Sparkles,
  Phone,
  Check,
  MessageCircle,
  ShieldAlert,
  ArrowUpRight,
  Home,
  Factory
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SolarCalculator from "@/components/SolarCalculator";
import ZeroInvestmentCalculator from "@/components/ZeroInvestmentCalculator";
import GoogleReviews from "@/components/GoogleReviews";
import FaqAccordion from "@/components/FaqAccordion";
import ActualInstallations from "@/components/ActualInstallations";

// --- Custom CountDown hook for Hero ---
function useCountDown(target: number, from: number, duration = 2500) {
  const [value, setValue] = useState(from);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    let raf: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(from - (from - target) * eased);
      setValue(current);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, target, from, duration]);

  return { value, ref };
}

// --- Custom Countdown Timer ---
function PromoCountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2027-03-31T23:59:59").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const placeholderTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const displayTime = mounted ? timeLeft : placeholderTime;

  return (
    <div className="w-full bg-[#033325] border-y border-emerald-900/30 py-3.5 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner rounded-xl mt-4">
      <div className="flex flex-col text-center sm:text-left">
        <span className="text-secondary font-black text-xs uppercase tracking-widest flex items-center gap-1.5 justify-center sm:justify-start">
          <span className="animate-pulse text-sm">⚡</span> Limited Time Subsidy Offer
        </span>
        <span className="text-white/90 font-medium text-[11px] sm:text-xs mt-0.5">
          Avail Govt Subsidy under PM Surya Ghar Yojana before March 31, 2027
        </span>
      </div>

      <div className="flex items-center gap-3 font-mono text-sm sm:text-base text-white">
        <div className="flex items-baseline gap-0.5">
          <span className="text-secondary font-black text-base sm:text-lg">{displayTime.days}</span>
          <span className="text-[9px] text-white/50 uppercase font-bold ml-0.5">d</span>
        </div>
        <span className="text-white/30 font-bold">:</span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-secondary font-black text-base sm:text-lg">{displayTime.hours}</span>
          <span className="text-[9px] text-white/50 uppercase font-bold ml-0.5">h</span>
        </div>
        <span className="text-white/30 font-bold">:</span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-secondary font-black text-base sm:text-lg">{displayTime.minutes}</span>
          <span className="text-[9px] text-white/50 uppercase font-bold ml-0.5">m</span>
        </div>
        <span className="text-white/30 font-bold">:</span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-secondary font-black text-base sm:text-lg animate-pulse">{displayTime.seconds}</span>
          <span className="text-[9px] text-white/50 uppercase font-bold ml-0.5">s</span>
        </div>
      </div>
    </div>
  );
}

export default function PromoLandingPage() {
  const [activeTab, setActiveTab] = useState<"mounting" | "guarantee" | "finance">("guarantee");
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const { value: billAmount, ref: billRef } = useCountDown(0, 5000, 5000);

  const faqs = [
    {
      id: 0,
      question: "How does the Government Subsidy under PM Surya Ghar Yojana work in Lucknow?",
      answer: "Lucknow residents are eligible for direct subsidies up to ₹1,08,000 for residential rooftop solar setups of 3kW or higher. SunLynk handles all the documentation, discom net-metering approvals, load alignment, and portal registration end-to-end to ensure the subsidy is directly credited to your bank account."
    },
    {
      id: 1,
      question: "Can I install solar with Zero Upfront Cost using EMIs?",
      answer: "Yes, definitely. We offer collateral-free solar loans in partnership with top PSU banks (like SBI, PNB, and Bank of Baroda) starting at 7% p.a. With our self-paying solar loan structures, your monthly electricity savings are typically larger than the loan EMI, meaning the solar panels pay for themselves from day one."
    },
    {
      id: 2,
      question: "What is the LynkSure Generation Guarantee?",
      answer: "LynkSure is our proprietary generation assurance program. We estimate your rooftop solar system's expected generation during the design phase and commit to those performance parameters for 5 years. If the system underperforms due to equipment issues, SunLynk compensates you ₹8 per unit for the generation shortfall."
    },
    {
      id: 3,
      question: "Does the 5-Year Free AMC cover cleaning and maintenance?",
      answer: "Yes. Our comprehensive 5-Year free Annual Maintenance Contract (AMC) covers regular professional panel washing instructions, structural health checks, AC/DC cabling audits, electrical safety audits, and inverter efficiency diagnostics twice a year, ensuring complete peace of mind."
    },
    {
      id: 4,
      question: "Is there a waterproof warranty to prevent roof leakage?",
      answer: "Absolutely. SunLynk uses HILTI chemical anchoring to anchor structure legs to concrete. Drilling points are sealed using dual-layer waterproofing chemical compounds to prevent concrete cracking and rain seepage. We provide a complete leak-proof structural warranty."
    },
    {
      id: 5,
      question: "What is the physical installation timeline for my home?",
      answer: "The structural mounting and panel layout setup on your rooftop takes less than 8 hours. DISCOM meter synchronization, grid liaisoning, and net-metering commissioning typically take 15 to 30 days depending on local approvals, which are fully handled by SunLynk's liaison team."
    }
  ];

  const mountingFeatures = [
    {
      id: 0,
      title: "Upto 170 km/h Wind Shield",
      desc: "Aerodynamically certified to withstand cyclonic wind speeds. Built robust enough to withstand Lucknow's severe storm seasons without buckling or lifting.",
      icon: Wind,
      x: "25%",
      y: "28%"
    },
    {
      id: 1,
      title: "Chemical Anchoring - HILTI",
      desc: "Leak-proof foundation joints drilled with HILTI chemical anchors, preventing concrete crack damage and rain seepage.",
      icon: Mountain,
      x: "73%",
      y: "92%"
    },
    {
      id: 2,
      title: "80+ Microns HDGI Steel",
      desc: "Hot-Dip Galvanized Iron frame containing a protective zinc layer. Zero rust, zero corrosion even in heavy monsoon rain or high humidity environments.",
      icon: Layers,
      x: "62%",
      y: "62%"
    },
    {
      id: 3,
      title: "C-Section Leg Columns (5 Inches)",
      desc: "Extra thick structural steel columns provide deep mechanical anchorage, maximum deadweight distribution, and rock-solid high-wind load resistance.",
      icon: Wrench,
      x: "32%",
      y: "62%"
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 scroll-smooth">
      {/* ─── 1. MINIMAL MARKETING HEADER ─── */}
      <header className="py-0 bg-white border-b border-gray-100 shadow-xs sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <Link href="/" className="inline-block bg-white p-2 rounded-md">
            <Image
              src="/new_assets/logo.jpeg"
              width={180}
              height={60}
              alt="SunLynk Logo"
              className="object-contain"
              priority
            />
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="tel:8573003001"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/10"
            >
              <Phone size={14} />
              <span>Call +91 8573003001</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── 2. HERO SECTION (HIGH CONVERTING) ─── */}
      <section className="relative bg-slate-50 lg:bg-white overflow-hidden py-8 lg:py-16 border-b border-slate-100">
        {/* Desktop Background image */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <Image
            src="/new_assets/hero_banner.webp"
            alt="Solar background image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-white/10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headline, Promise, Reviews */}
            <div className="lg:col-span-7 relative flex flex-col justify-center text-left py-0 lg:py-8">
              {/* Mobile Background image */}
              <div className="lg:hidden absolute inset-0 -mx-4 -my-8 pointer-events-none z-0 overflow-hidden select-none">
                <Image
                  src="/new_assets/home_hero_mobile_main.webp"
                  alt="Solar background image"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/90" />
              </div>

              {/* Text contents */}
              <div className="relative z-10 flex flex-col gap-5 max-w-xl mt-8 lg:mt-0">
                <div className="inline-flex self-start">
                  <span className="text-white inline-flex items-center gap-2 rounded-full py-1.5 px-4 text-[10px] sm:text-xs font-bold text-emerald-400 tracking-wide border border-emerald-500/20 bg-black/20 backdrop-blur-sm lg:bg-transparent">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    25 Year Performance Warranty
                  </span>
                </div>

                <h1 className="text-3xl lg:text-[42px] text-white font-black leading-[1.1] tracking-tight">
                  Guaranteed Solar Generation.
                  <span className="text-emerald-400 block sm:inline">
                    &nbsp; Or We Pay You Back.
                  </span>
                </h1>

                <p className="text-white text-sm sm:text-base font-semibold leading-relaxed -mt-2">
                  Premium Rooftop Solar in Lucknow <span className="text-secondary font-extrabold">With 5 Year Guaranteed</span> Generation and Support.
                </p>

                {/* Star rating mini block */}
                <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-full py-1.5 px-4 self-start text-[10px] sm:text-xs font-bold text-white shadow-sm backdrop-blur-md">
                  <span className="text-amber-400 text-sm leading-none">★★★★★</span>
                  <span>Rated 4.8 on Google</span>
                  <span className="text-white/30">|</span>
                  <span>12,000+ Happy Homes</span>
                </div>

                {/* USPs Grid */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] shadow-md">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] lg:text-xs font-black text-white uppercase tracking-wider leading-tight">25-Yr Panel Warranty</h4>
                      <span className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">Tier-1 certified modules</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] shadow-md">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Zap size={18} />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] lg:text-xs font-black text-white uppercase tracking-wider leading-tight">5-Yr Output Promise</h4>
                      <span className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">LynkSure guarantee</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] shadow-md">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Coins size={18} />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] lg:text-xs font-black text-white uppercase tracking-wider leading-tight">Govt. Subsidy Help</h4>
                      <span className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">Complete registration</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] shadow-md">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <CreditCard size={18} />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] lg:text-xs font-black text-white uppercase tracking-wider leading-tight">Zero Upfront EMI</h4>
                      <span className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">PSU bank financing</span>
                    </div>
                  </div>
                </div>

                <PromoCountdownTimer />
              </div>
            </div>

            {/* Right Column: Lead Form */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/70 overflow-hidden">
                <ContactForm hideTabs={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. TRUST / BENEFIT STRIP ─── */}
      <section className="bg-[#033325] text-white py-8 border-y border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-primary flex items-center justify-center shadow-md">
              <Coins size={22} className="text-primary" />
            </div>
            <h4 className="text-white font-black text-base">Zero Upfront Cost</h4>
            <p className="text-gray-300 text-xs">Flexible EMI / PSU Bank Loans</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-primary flex items-center justify-center shadow-md">
              <Building2 size={22} className="text-primary" />
            </div>
            <h4 className="text-white font-black text-base">Govt. Subsidy Support</h4>
            <p className="text-gray-300 text-xs">Get Credit up to ₹1,08,000</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-primary flex items-center justify-center shadow-md">
              <Zap size={22} className="text-primary" />
            </div>
            <h4 className="text-white font-black text-base">Hassle-Free Install</h4>
            <p className="text-gray-300 text-xs">Completed in Under 8 Hours</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-primary flex items-center justify-center shadow-md">
              <Wrench size={22} className="text-primary" />
            </div>
            <h4 className="text-white font-black text-base">Lifetime Support</h4>
            <p className="text-gray-300 text-xs">5-Yr Free AMC & Active Auditing</p>
          </div>
        </div>
      </section>

      {/* ─── 4. SOLAR INSTALLATION MADE SIMPLE ─── */}
      <section className="py-12 bg-slate-50 border-b border-slate-100" id="use-cases">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-3">
              <span className="h-[1.5px] w-10 bg-[#00875A]" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#00875A] font-mono">SIMPLE. TRANSPARENT. RELIABLE.</span>
              <span className="h-[1.5px] w-10 bg-[#00875A]" />
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight mt-1">
              Solar Installation Made Simple
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed mt-1">
              Whether it is a home, housing society, or commercial rooftop, <span className="text-emerald-700 font-bold">SunLynk</span> handles survey, design, installation, and after-sales support.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Homes */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 flex flex-col items-center text-center group hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-[#E6FDF4] border border-[#C2F3DF] text-[#00875A] flex items-center justify-center mb-4 shrink-0 shadow-xs">
                <Home size={24} />
              </div>
              <h3 className="text-lg font-black text-[#00875A] mb-2">Homes</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                Lower your electricity bill and enjoy reliable clean energy.
              </p>
              <div className="w-12 h-[2px] bg-[#00875A] mt-auto opacity-70 group-hover:w-16 transition-all duration-300" />
            </div>

            {/* Housing Societies */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 flex flex-col items-center text-center group hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-[#E6FDF4] border border-[#C2F3DF] text-[#00875A] flex items-center justify-center mb-4 shrink-0 shadow-xs">
                <Building2 size={24} />
              </div>
              <h3 className="text-lg font-black text-[#00875A] mb-2">Housing Societies</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                Reduce common area costs and increase property value.
              </p>
              <div className="w-12 h-[2px] bg-[#00875A] mt-auto opacity-70 group-hover:w-16 transition-all duration-300" />
            </div>

            {/* Commercial */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 flex flex-col items-center text-center group hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-[#E6FDF4] border border-[#C2F3DF] text-[#00875A] flex items-center justify-center mb-4 shrink-0 shadow-xs">
                <Factory size={24} />
              </div>
              <h3 className="text-lg font-black text-[#00875A] mb-2">Commercial</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                Lower operating costs and boost your business efficiency.
              </p>
              <div className="w-12 h-[2px] bg-[#00875A] mt-auto opacity-70 group-hover:w-16 transition-all duration-300" />
            </div>
          </div>

          {/* Timeline Block */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 md:p-8 shadow-sm w-full flex flex-col items-center relative overflow-hidden">
            {/* Timeline Row */}
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-5xl">
              {/* Horizontal Connecting Line (Desktop only) */}
              <div className="hidden md:block absolute left-[12.5%] right-[12.5%] top-[11px] h-[1.5px] bg-[#00875A]/80 z-0" />

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-6 h-6 rounded-full bg-[#00875A] text-white font-extrabold text-[10px] flex items-center justify-center border-2 border-white shadow-sm mb-3">
                  1
                </div>
                <div className="w-12 h-12 rounded-full bg-[#E6FDF4] border border-[#C2F3DF] text-[#00875A] flex items-center justify-center mb-3 group-hover:bg-[#00875A] group-hover:text-white transition-all duration-350 shadow-xs">
                  <FileText size={20} />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">Free Survey</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed max-w-[180px]">
                  We visit your site and understand your needs.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-6 h-6 rounded-full bg-[#00875A] text-white font-extrabold text-[10px] flex items-center justify-center border-2 border-white shadow-sm mb-3">
                  2
                </div>
                <div className="w-12 h-12 rounded-full bg-[#E6FDF4] border border-[#C2F3DF] text-[#00875A] flex items-center justify-center mb-3 group-hover:bg-[#00875A] group-hover:text-white transition-all duration-350 shadow-xs">
                  <Layers size={20} />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">3D Design</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed max-w-[180px]">
                  Custom 3D layout and savings estimate for your property.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-6 h-6 rounded-full bg-[#00875A] text-white font-extrabold text-[10px] flex items-center justify-center border-2 border-white shadow-sm mb-3">
                  3
                </div>
                <div className="w-12 h-12 rounded-full bg-[#E6FDF4] border border-[#C2F3DF] text-[#00875A] flex items-center justify-center mb-3 group-hover:bg-[#00875A] group-hover:text-white transition-all duration-350 shadow-xs">
                  <Wrench size={20} />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">Installation</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed max-w-[180px]">
                  Expert installation with quality materials and safety.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-6 h-6 rounded-full bg-[#00875A] text-white font-extrabold text-[10px] flex items-center justify-center border-2 border-white shadow-sm mb-3">
                  4
                </div>
                <div className="w-12 h-12 rounded-full bg-[#E6FDF4] border border-[#C2F3DF] text-[#00875A] flex items-center justify-center mb-3 group-hover:bg-[#00875A] group-hover:text-white transition-all duration-350 shadow-xs">
                  <Headphones size={20} />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">After-Sales Support</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed max-w-[180px]">
                  Ongoing support, monitoring, and maintenance assistance.
                </p>
              </div>
            </div>

            {/* Book Free Survey CTA Button */}
            <div className="mt-8 flex flex-col items-center z-10">
              <a
                href="#quote-form"
                className="bg-[#00875A] hover:bg-[#00704a] text-white font-extrabold py-3 px-6 rounded-lg shadow-md hover:shadow-emerald-700/10 hover:scale-[1.01] active:scale-98 text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <Calendar size={16} />
                <span>Book Free Rooftop Survey</span>
                <ArrowRight size={14} />
              </a>

              {/* Checklist details below button */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[10px] sm:text-xs font-bold text-slate-550 mt-4 tracking-wide uppercase">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-[#00875A] shrink-0" />
                  No Obligation
                </span>
                <span className="text-slate-200 hidden sm:inline">|</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-[#00875A] shrink-0" />
                  Expert Advice
                </span>
                <span className="text-slate-200 hidden sm:inline">|</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-[#00875A] shrink-0" />
                  100% Free
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. INTRODUCING LYNKSURE (BIGGEST SALES HOOK) ─── */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="lynksure">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-80" />
        <div className="absolute right-[-10%] top-[15%] w-[45%] h-[45%] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-left">
          <div className="max-w-3xl mb-16">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest block mb-2 font-mono">SunLynk Exclusive Hook</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Introducing <span className="text-emerald-400 font-extrabold">LynkSure</span> Generation Guarantee
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mt-4 leading-relaxed">
              We do not just mount panels and leave. We commit to the actual units of electricity your system will generate for 5 years. If the generation falls short, we pay you back at ₹8 per unit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Zero Repair Cost */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-6.5 flex flex-col justify-between hover:border-emerald-500 transition-all duration-300 shadow-xl group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <Wrench size={20} />
                </div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-3xl font-black text-emerald-400">₹0</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Repair Cost</span>
                </div>
                <h4 className="text-base font-extrabold text-white mb-2">Zero Repair &amp; Replacement</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Every inverter, breaker, panel node, and structural joint is covered under our 5-year free maintenance and replacement guarantee.
                </p>
              </div>
              <div className="border-t border-slate-800 pt-4 mt-6">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  5yr Parts &amp; Labour Covered
                </span>
              </div>
            </div>

            {/* Card 2: Deficit Payment */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-6.5 flex flex-col justify-between hover:border-emerald-500 transition-all duration-300 shadow-xl group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <Zap size={20} />
                </div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-3xl font-black text-emerald-400">₹8</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">per unit short</span>
                </div>
                <h4 className="text-base font-extrabold text-white mb-2">Deficit Underwrite</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  If your system generates less than estimated due to equipment variance or structural alignment flaws, we pay ₹8/unit cash-back.
                </p>
              </div>
              <div className="border-t border-slate-800 pt-4 mt-6">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  Real Savings Protection
                </span>
              </div>
            </div>

            {/* Card 3: Free AMC */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-6.5 flex flex-col justify-between hover:border-emerald-500 transition-all duration-300 shadow-xl group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <Headphones size={20} />
                </div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-3xl font-black text-emerald-400">5 Yrs</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Free AMC</span>
                </div>
                <h4 className="text-base font-extrabold text-white mb-2">After-Sales Care</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Proactive servicing twice a year. We check the inverters, wash panels, and inspect cable insulation to ensure maximum solar extraction.
                </p>
              </div>
              <div className="border-t border-slate-800 pt-4 mt-6">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  No Maintenance Fees
                </span>
              </div>
            </div>

            {/* Card 4: Active Monitoring */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-6.5 flex flex-col justify-between hover:border-emerald-500 transition-all duration-300 shadow-xl group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <Calendar size={20} />
                </div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-3xl font-black text-emerald-400">24/7</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Plant Tracking</span>
                </div>
                <h4 className="text-base font-extrabold text-white mb-2">Cloud Monitoring</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Real-time smart dashboards on your mobile device. If generation drops, our backend team receives an alert to troubleshoot.
                </p>
              </div>
              <div className="border-t border-slate-800 pt-4 mt-6">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  Performance Supervision
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. WHY SUNLYNK IS BUILT DIFFERENT (COMPARISON) ─── */}
      <section className="py-20 bg-slate-50 border-b border-slate-100" id="comparison">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-emerald-600"></span>
              <span className="text-base uppercase tracking-wider font-bold text-emerald-600">Comparison</span>
              <span className="h-[2px] w-6 bg-emerald-600"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              Why SunLynk Is Built Different
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
              Before choosing a solar installer in Lucknow, review the differences in security, hardware quality, and generation commitments.
            </p>
          </div>

          <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 shadow-xl bg-white text-left">
            <table className="w-full min-w-[768px] border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-6 text-sm font-extrabold uppercase tracking-wider">Features &amp; Benefits</th>
                  <th className="p-6 text-sm font-extrabold uppercase tracking-wider bg-[#044a37] text-emerald-400 border-x border-emerald-800">SunLynk Solar (With LynkSure &amp; LynkShield)</th>
                  <th className="p-6 text-sm font-extrabold uppercase tracking-wider text-gray-400">Ordinary Installers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-6 text-sm font-bold text-slate-800">Generation Guarantee</td>
                  <td className="p-6 text-sm font-extrabold text-emerald-700 bg-emerald-50/40 border-x border-emerald-100/60">
                    ✓ <strong>LynkSure</strong> committed generation (or ₹8/unit cashback deficit underwrite)
                  </td>
                  <td className="p-6 text-sm text-gray-500">❌ No guarantee on actual electricity output</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-6 text-sm font-bold text-slate-800">Structure Strength</td>
                  <td className="p-6 text-sm font-extrabold text-emerald-700 bg-emerald-50/40 border-x border-emerald-100/60">
                    ✓ <strong>LynkShield</strong> layout (tested for winds up to 170 km/h)
                  </td>
                  <td className="p-6 text-sm text-gray-500">❌ Standard generic columns, high risk of storm damage</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-6 text-sm font-bold text-slate-800">Free AMC Maintenance</td>
                  <td className="p-6 text-sm font-extrabold text-emerald-700 bg-emerald-50/40 border-x border-emerald-100/60">
                    ✓ <strong>5 Years AMC</strong> included (two proactive diagnostic checks annually)
                  </td>
                  <td className="p-6 text-sm text-gray-500">❌ Servicing charges apply from day one</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-6 text-sm font-bold text-slate-800">Waterproofing Warranty</td>
                  <td className="p-6 text-sm font-extrabold text-emerald-700 bg-emerald-50/40 border-x border-emerald-100/60">
                    ✓ <strong>100% Leak-Proof Guarantee</strong> (HILTI chemical anchoring + waterproofing compound)
                  </td>
                  <td className="p-6 text-sm text-gray-500">❌ Drill points left unsealed, high risk of rain seepage</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-6 text-sm font-bold text-slate-800">Troubleshooting &amp; Repairs</td>
                  <td className="p-6 text-sm font-extrabold text-emerald-700 bg-emerald-50/40 border-x border-emerald-100/60">
                    ✓ <strong>₹0 cost</strong> for labor/wiring/breaker replacements for 5 years
                  </td>
                  <td className="p-6 text-sm text-gray-500">❌ High cost per visit, slow fault diagnostic turnarounds</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-6 text-sm font-bold text-slate-800">Solar Financing &amp; EMIs</td>
                  <td className="p-6 text-sm font-extrabold text-emerald-700 bg-emerald-50/40 border-x border-emerald-100/60">
                    ✓ <strong>Collateral-free PSU solar loans</strong> (Starting at 7.00% p.a.)
                  </td>
                  <td className="p-6 text-sm text-gray-500">❌ Full upfront payment required, zero banking liaisoning</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-6 text-sm font-bold text-slate-800">Hardware Class</td>
                  <td className="p-6 text-sm font-extrabold text-emerald-700 bg-emerald-50/40 border-x border-emerald-100/60">
                    ✓ Only Tier-1 Monocrystalline modules and smart high-efficiency inverters
                  </td>
                  <td className="p-6 text-sm text-gray-500">❌ Cheap B-grade panel components with rapid degradation rates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 7. ENGINEERED WITH LYNKSHIELD (STRUCTURE QUALITY) ─── */}
      <section className="py-20 bg-white border-b border-slate-100 text-left" id="lynkshield">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Info */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <span className="text-[10px] sm:text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                Structure Quality Claim
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Engineered with <span className="text-emerald-600">LynkShield</span> Structural Safety
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Rooftops are subjected to intense weather patterns, heavy monsoons, and extreme storm winds. Our proprietary LynkShield layout ensures that structural safety is prioritized.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                {mountingFeatures.map((feat) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div
                      key={feat.id}
                      className="group flex gap-4 p-4 border border-slate-100 hover:border-emerald-500 bg-slate-50/50 rounded-xl transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                        <FeatIcon size={18} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">{feat.title}</h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-0.5">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Interactive 3D Mockup Diagram */}
            <div className="lg:col-span-7 relative w-full group flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 flex items-center justify-center">
                <Image
                  src="/assets/images/review/review2.jpeg"
                  alt="LynkShield Solar Mounting Structure"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

                {/* Markers */}
                {mountingFeatures.map((feat) => (
                  <div
                    key={feat.id}
                    className="absolute w-8 h-8 rounded-full flex items-center justify-center z-20"
                    style={{
                      top: feat.y,
                      left: feat.x,
                      transform: "translate(-50%, -50%)"
                    }}
                  >
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-5 w-5 items-center justify-center bg-white text-emerald-600 font-extrabold text-xs shadow-md border border-emerald-250">
                      {feat.id + 1}
                    </span>
                  </div>
                ))}
              </div>

              {/* Grid spec metrics below */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-center">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Wind Shield</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 block mt-1">Upto 170 km/h</span>
                </div>
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-center">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Galvanization</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 block mt-1">80+ Microns</span>
                </div>
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-center">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Columns leg</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 block mt-1">5-Inch Columns</span>
                </div>
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-center">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Sealing system</span>
                  <span className="text-xs sm:text-sm font-black text-emerald-650 block mt-1">HILTI Chemical</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* EMI Calculator */}
      <ZeroInvestmentCalculator />

      {/* Generation & Sizing Calculator */}
      <SolarCalculator />



      <GoogleReviews />


      {/* ─── 11. FAQ SECTION ─── */}
      <section className="py-20 bg-slate-50 border-b border-slate-100 text-left" id="faq">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Block */}
          <div className="lg:col-span-5 flex flex-col gap-4 sticky top-24">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-base uppercase tracking-wider font-bold text-primary">FAQ</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">Frequently Asked Questions</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Get details on government subsidies, chemical anchoring, waterproofing, and our unit guarantee terms.
            </p>
            <div className="p-6 bg-white border border-slate-200/80 rounded-2xl flex flex-col gap-3.5 mt-4">
              <span className="font-extrabold text-sm text-slate-800 block">Have specific queries?</span>
              <div className="flex flex-col gap-2">
                <a href="tel:8573003001" className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-primary transition-colors">
                  <Phone size={14} className="text-primary" />
                  <span>+91 8573003001</span>
                </a>
                <a href="mailto:info@sunlynksolar.com" className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-primary transition-colors">
                  <svg className="w-3.5 h-3.5 text-primary fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span>info@sunlynksolar.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Block */}
          <div className="lg:col-span-7 w-full">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* ─── 12. FINAL CTA SECTION ─── */}
      <section className="py-20 relative overflow-hidden text-center bg-slate-900 text-white">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/15 to-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center gap-6">
          <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
            Start Your Solar Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-black leading-tight max-w-2xl">
            Switch to Solar with Lucknow&apos;s Most Trusted Partner.
          </h2>
          <p className="text-sm md:text-base text-gray-300 max-w-xl">
            Get your free 3D simulation layout, custom bill analysis, and loan eligibility report. No pressure, zero purchase commitment.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <a
              href="#quote-form"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-8 rounded-xl shadow-lg hover:shadow-emerald-600/20 hover:scale-[1.02] active:scale-95 text-sm flex items-center gap-2 group transition-all"
            >
              <span>Get Free Quotation</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://wa.me/918573003001?text=Hi%2C%20I%27d%20like%20to%20know%20more%2520about%2520free%2520Solar%2520Consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-8 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="tel:8573003001"
              className="bg-slate-800 hover:bg-slate-700 text-white font-extrabold py-4 px-8 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 text-sm flex items-center gap-2 transition-all"
            >
              <Phone size={16} />
              <span>Call Us: +91 8573003001</span>
            </a>
          </div>
        </div>
      </section>

      {/* Simplified landing page footer */}
      <footer className="bg-black py-8 border-t border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} SunLynk Solar. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <span className="text-gray-700">·</span>
            <Link href="/terms" className="hover:text-gray-400">Terms of Use</Link>
            <span className="text-gray-700">·</span>
            <Link href="/cancellation-refund" className="hover:text-gray-400">Cancellation &amp; Refund</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
