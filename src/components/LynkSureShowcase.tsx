"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  ShieldCheck,
  Wind,
  Mountain,
  Layers,
  Wrench,
  Zap,
  Headphones,
  Calendar,
  ArrowRight,
  TrendingUp,
  Coins,
  FileText,
  Building2,
  Sparkles,
  CheckCircle2,
  Award
} from "lucide-react";

type TabId = "mounting" | "guarantee" | "finance";

interface FeaturePoint {
  id: number;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  x: string; // absolute position X
  y: string; // absolute position Y
}

export default function LynkSureShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>("mounting");
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const tabs = [
    { id: "mounting", label: "LynkShield Mounting", icon: Shield },
    { id: "guarantee", label: "LynkSure 5-Yr Promise", icon: Award },
    { id: "finance", label: "Subsidy & PSU Loans", icon: Coins },
  ] as const;

  // 4 Core highlighting points with positions on the central 3D structure image
  const mountingFeatures: FeaturePoint[] = [
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
      title: "Chemical Anchoring- HILTI",
      desc: "Versatile, customizable foundation joints that adapt flawlessly to sloped roofs, high parapets, or uneven rooftop surfaces, keeping panels safe.",
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
    <section className="py-24 bg-slate-50/50 border-y border-slate-100 relative overflow-hidden" id="lynk-showcase">

      {/* High-tech engineering grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-80" />

      {/* Decorative ambient glows */}
      <div className="absolute right-[-10%] top-[15%] w-[45%] h-[45%] bg-emerald-100/40 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute left-[-15%] bottom-[15%] w-[40%] h-[40%] bg-[#fca311]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 rounded-full py-1.5 px-4 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-extrabold text-emerald-700">SunLynk Core Technology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Engineered with <span className="text-emerald-600">LynkShield</span> for 25 Yrs.<br className="hidden sm:inline" />

          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
            Discover the proprietary LynkShield structural engineering and the complete peace-of-mind guarantee package that sets our solar installations apart.
          </p>
        </div>

        {/* Dynamic Glassmorphic Tabs Selector */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex flex-wrap sm:flex-nowrap gap-2 p-1.5 bg-slate-100 border border-slate-200/80 rounded-2xl w-full max-w-4xl justify-center sm:justify-between shadow-sm relative">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-sm font-black transition-all duration-300 cursor-pointer outline-none relative z-10 ${isActive
                    ? "text-emerald-700 bg-white border border-emerald-200/50 shadow-md scale-[1.01]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/40"
                    }`}
                >
                  <TabIcon size={16} className={isActive ? "text-emerald-600 animate-pulse" : "text-slate-500"} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(46,204,113,0.4)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabs Content Container */}
        <div className="transition-all duration-500 min-h-[480px]">

          {/* TAB 1: LynkShield Mounting Structure */}
          {activeTab === "mounting" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

              {/* Left Column (Interactive Cards list - 5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                <div className="text-left mb-2">
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                    Proprietary Structure
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    LynkShield Mounting Structure
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    Hover over the features below to highlight their exact locations on the structural engineering layout.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {mountingFeatures.map((feat) => {
                    const FeatIcon = feat.icon;
                    const isHighlighted = hoveredFeature === feat.id;
                    return (
                      <div
                        key={feat.id}
                        onMouseEnter={() => setHoveredFeature(feat.id)}
                        onMouseLeave={() => setHoveredFeature(null)}
                        className={`group relative border rounded-xl p-5 text-left cursor-pointer transition-all duration-300 backdrop-blur-sm ${isHighlighted
                          ? "bg-emerald-50/50 border-emerald-500 shadow-md scale-[1.01]"
                          : "bg-white border-slate-200/60 hover:border-slate-350 shadow-sm"
                          }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isHighlighted ? "bg-emerald-500 text-white scale-110 shadow-md" : "bg-emerald-50 text-emerald-600"
                            }`}>
                            <FeatIcon size={18} />
                          </div>
                          <div>
                            <h4 className={`font-extrabold text-base transition-colors ${isHighlighted ? "text-emerald-700" : "text-slate-900"
                              }`}>
                              {feat.title}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed mt-1">
                              {feat.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column (Hero Product Image Spotlight - 7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6 items-center">

                {/* Visual Glassmorphic Showcase Box */}
                <div className="relative w-full aspect-[4/3] flex items-center justify-center group  overflow-hidden">

                  {/* Soft background glow inside the frame */}
                  <div className="absolute w-56 h-56 bg-emerald-50 rounded-full blur-[80px] pointer-events-none" />

                  {/* Main Product Image */}
                  <div className="relative w-[95%] h-[95%] flex items-center justify-center rounded-xl overflow-hidden">
                    <Image
                      src="/assets/images/review/review2.jpeg"
                      alt="LynkShield Solar Mounting Structure"
                      fill
                      sizes="(max-width: 1024px) 100vw, 900px"
                      priority
                      className="object-cover transition-transform duration-500 scale-[1.02] group-hover:scale-105"
                    />
                  </div>

                  {/* Interactive Glowing Hotspot Markers */}
                  {mountingFeatures.map((feat) => {
                    const isHighlighted = hoveredFeature === feat.id;
                    return (
                      <button
                        key={feat.id}
                        onMouseEnter={() => setHoveredFeature(feat.id)}
                        onMouseLeave={() => setHoveredFeature(null)}
                        className="absolute w-8 h-8 rounded-full flex items-center justify-center z-20 transition-all duration-300 focus:outline-none cursor-pointer"
                        style={{
                          top: feat.y,
                          left: feat.x,
                          transform: "translate(-50%, -50%)"
                        }}
                      >
                        {/* Glowing pulse rings */}
                        <span className={`absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 ${isHighlighted ? "animate-ping scale-150" : "animate-pulse"
                          }`} />
                        {/* Main central core */}
                        <span className={`relative inline-flex rounded-full h-4.5 w-4.5 items-center justify-center shadow-lg border-2 border-white transition-all duration-300 ${isHighlighted ? "bg-emerald-600 text-white scale-125" : "bg-white text-emerald-600 border border-emerald-200"
                          }`}>
                          <span className="text-[9px] font-black leading-none">{feat.id + 1}</span>
                        </span>

                        {/* Tooltip on hover */}
                        <div className={`absolute bottom-9 left-1/2 -translate-x-1/2 bg-white border border-slate-200 text-slate-800 text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 pointer-events-none z-30 ${isHighlighted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
                          }`}>
                          {feat.title}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Quick Spec Specs Bar */}
                <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Wind Resistance */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
                    {/* Circle Icon Badge */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-50 to-emerald-100/30 border border-emerald-100/85 flex items-center justify-center mb-4 relative shadow-sm shrink-0">
                      <div className="absolute inset-1.5 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Wind className="w-7 h-7 text-emerald-650 stroke-[2]" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Wind resistance</span>
                    <span className="w-6 h-0.5 bg-emerald-500 rounded-full mt-1.5 mb-2 block"></span>
                    <span className="text-sm sm:text-base font-black text-slate-900 block">Upto 170 km/h</span>
                  </div>

                  {/* Zinc Protection */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
                    {/* Circle Icon Badge */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-50 to-emerald-100/30 border border-emerald-100/85 flex items-center justify-center mb-4 relative shadow-sm shrink-0">
                      <div className="absolute inset-1.5 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <ShieldCheck className="w-7 h-7 text-emerald-650 stroke-[2]" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Zinc protection</span>
                    <span className="w-6 h-0.5 bg-emerald-500 rounded-full mt-1.5 mb-2 block"></span>
                    <span className="text-sm sm:text-base font-black text-slate-900 block">80+ Microns</span>
                  </div>

                  {/* Structural Steel */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
                    {/* Circle Icon Badge */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-50 to-emerald-100/30 border border-emerald-100/85 flex items-center justify-center mb-4 relative shadow-sm shrink-0">
                      <div className="absolute inset-1.5 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {/* Custom vector SVG for structural steel I-beam */}
                        <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald-650" fill="currentColor">
                          <path d="M5 4h14v3h-5.5v10H19v3H5v-3h5.5V7H5V4z" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Structural Steel</span>
                    <span className="w-6 h-0.5 bg-emerald-500 rounded-full mt-1.5 mb-2 block"></span>
                    <span className="text-sm sm:text-base font-black text-slate-900 block">HDGI Column  (5 Inches)</span>
                  </div>

                  {/* Structure Life */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
                    {/* Circle Icon Badge */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-50 to-emerald-100/30 border border-emerald-100/85 flex items-center justify-center mb-4 relative shadow-sm shrink-0">
                      <div className="absolute inset-1.5 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {/* Custom vector SVG for Shield with 25 YEARS */}
                        <svg viewBox="0 0 24 24" className="w-8 h-8 text-emerald-650" fill="currentColor">
                          <path d="M12 2S5 3.5 5 8v5c0 4.4 7 9 7 9s7-4.6 7-9V8c0-4.5-7-6-7-6zm0 1.8c3.2 1 5.2 2.2 5.2 4.2v4c0 3.2-5.2 7-5.2 7s-5.2-3.8-5.2-7V8c0-2 2-3.2 5.2-4.2z" />
                          <text x="12" y="11.5" textAnchor="middle" fontSize="6.5" fontFamily="sans-serif" fontWeight="900" fill="currentColor">25</text>
                          <text x="12" y="15" textAnchor="middle" fontSize="3" fontFamily="sans-serif" fontWeight="black" fill="currentColor" letterSpacing="0.2">YEARS</text>
                        </svg>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Structure Life</span>
                    <span className="w-6 h-0.5 bg-emerald-500 rounded-full mt-1.5 mb-2 block"></span>
                    <span className="text-sm sm:text-base font-black text-emerald-650 block">25 Years</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: LynkSure Guarantee (5-Year Commitment) */}
          {activeTab === "guarantee" && (
            <div className="flex flex-col gap-10">
              <div className="text-center max-w-5xl mx-auto">
                <span className="text-[10px] sm:text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                  Complete peace-of-mind backing
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                  The LynkSure Warranty Promise
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We don&apos;t just install panels and walk away. Our 5-year guarantee ensures your solar powerhouse performs at peak parameters with absolutely zero maintenance headaches.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Card 1: Zero Repair Cost */}
                <div className="group relative bg-white border border-slate-200/60 hover:border-emerald-500/80 rounded-2xl p-6.5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-100/20 text-left shadow-sm">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Wrench size={20} />
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-3xl font-black text-emerald-600">₹0</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Repair Cost</span>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      Zero Repair &amp; Replacement
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Parts, labor, wiring, transport and inverters — everything is 100% covered. You never pay a single rupee for repairs.
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-4 mt-6">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      5yr Parts &amp; Labour Covered
                    </span>
                  </div>
                </div>

                {/* Card 2: Guaranteed Generation */}
                <div className="group relative bg-white border border-slate-200/60 hover:border-emerald-500/80 rounded-2xl p-6.5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-100/20 text-left shadow-sm">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Zap size={20} />
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-3xl font-black text-emerald-600">₹8</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">per unit short</span>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      Guaranteed Generation
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      We promise 25% higher generation compared to local installers. Underperform? We pay ₹8/unit deficit.
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-4 mt-6">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Savings Protection Guarantee
                    </span>
                  </div>
                </div>

                {/* Card 3: After Sales Service */}
                <div className="group relative bg-white border border-slate-200/60 hover:border-emerald-500/80 rounded-2xl p-6.5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-100/20 text-left shadow-sm">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Headphones size={20} />
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-3xl font-black text-emerald-600">5 yrs+</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dedicated Care</span>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      After Sales Service
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Enjoy a single-window support mechanism. Call our toll-free helpdesk, and our mobile engineers will resolve issues in 24-48 hrs.
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-4 mt-6">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      1800+ Days alongside you
                    </span>
                  </div>
                </div>

                {/* Card 4: 5 Year Commitment */}
                <div className="group relative bg-white border border-slate-200/60 hover:border-emerald-500/80 rounded-2xl p-6.5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-100/20 text-left shadow-sm">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Calendar size={20} />
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-3xl font-black text-emerald-600">30 yrs</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Commitment</span>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      Journey-Long Partnership
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Ours is not a one-time transaction. We continuously monitor your plant&apos;s daily generation and alert you of any efficiency drops.
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-4 mt-6">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Full Lifecycle Monitoring
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: Subsidy & PSU Loans */}
          {activeTab === "finance" && (
            <div className="flex flex-col gap-10">
              <div className="text-center max-w-3xl mx-auto mb-2">
                <span className="text-[10px] sm:text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                  Built to Outlast. Engineered to Perform
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                  LynkShield Mounting Structure
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed mx-auto mt-2">
                  India’s heavy-duty solar mounting system designed for superior strength, higher generation, and decades of reliability.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                {/* Subsidy Process Card */}
                <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 text-left shadow-lg">
                  <div className="flex items-center gap-3.5 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/60 shadow-sm">
                      <FileText size={22} />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest block">
                        Hassle-Free Approval
                      </span>
                      <h3 className="font-extrabold text-xl sm:text-2xl text-slate-900">
                        Rooftop Subsidy Process
                      </h3>
                    </div>
                  </div>

                  {/* Steps Visual Layout */}
                  <div className="flex flex-col gap-8 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">

                    {/* Step 1 */}
                    <div className="flex items-start gap-5 relative group">
                      <div className="w-7.5 h-7.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 z-10 border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-110">
                        1
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">Portal Registration</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                          We register your roof layout and customer metrics on the PM Surya Ghar National Portal.
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-5 relative group">
                      <div className="w-7.5 h-7.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 z-10 border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-110">
                        2
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">DISCOM Liaisoning</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                          We file feasibility reports with grid operators and obtain administrative approvals. No follow-ups needed on your end.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-5 relative group">
                      <div className="w-7.5 h-7.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 z-10 border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-110">
                        3
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">Net-Metering Sync</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                          Following physical installation, we synchronize bidirectional net-meter setups to start tracking power return.
                        </p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex items-start gap-5 relative group">
                      <div className="w-7.5 h-7.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 z-10 border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-110">
                        4
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">Direct Subsidy Credit</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                          Under PM Surya Ghar Muft Bijli Yojana, up to ₹1,08,000 subsidy is deposited directly into your bank account.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* PSU Bank Loans Card */}
                <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 text-left shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3.5 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/60 shadow-sm">
                        <Building2 size={22} />
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest block">
                          Official Bank Financing
                        </span>
                        <h3 className="font-extrabold text-xl sm:text-2xl text-slate-900">
                          PSU Solar Loans
                        </h3>
                      </div>
                    </div>

                    {/* Financing Points */}
                    <div className="flex flex-col gap-6">

                      <div className="flex gap-4 group">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                          <TrendingUp size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 transition-colors group-hover:text-emerald-600">
                            Low Interest Rates
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                            Interest rates starting as low as 7.00% p.a. through official national banking tie-ups.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 group">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                          <Shield size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 transition-colors group-hover:text-emerald-600">
                            Collateral-Free Option
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                            Get loan sanctions up to ₹10 Lakhs with zero collateral required for residential properties.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 group">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                          <Coins size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 transition-colors group-hover:text-emerald-600">
                            Self-Paying EMI Scheme
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                            Zero out-of-pocket investment: monthly solar bill savings are larger than your monthly EMI.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 group">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                          <CheckCircle2 size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 transition-colors group-hover:text-emerald-600">
                            Fast &amp; Simple Sanctions
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                            Streamlined application process through partnered nationalized banks with minimal documentation.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                        Official Lending Partners
                      </span>
                      <span className="text-sm font-black text-slate-700 mt-1 block">
                        SBI • PNB • Bank of Baroda
                      </span>
                    </div>
                    <a
                      href="https://wa.me/918573003001?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20free%20Solar%20Consultation."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-3 px-6 rounded-full inline-flex items-center gap-1.5 shadow-md shadow-emerald-500/10 hover:shadow-lg transition-all self-start sm:self-center cursor-pointer outline-none"
                    >
                      Check Loan Eligibility
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
