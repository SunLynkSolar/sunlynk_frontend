"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Wrench, Headphones, Users, ArrowRight } from "lucide-react";

// 6 Core Advantages
const coreAdvantages = [
  {
    title: "LynkSure™",
    subtitle: "Generation\nGuarantee",
    icon: "/new_assets/advantage/lynksure.svg",
    link: "#",
  },
  {
    title: "LynkShield™",
    subtitle: "Waterproof\nProtection",
    icon: "/new_assets/advantage/lynkshield.svg",
    link: "#",
  },
  {
    title: "LynkCare™",
    subtitle: "5-Year\nAMC",
    icon: "/new_assets/advantage/lynkcare.svg",
    link: "#",
  },
  {
    title: "LynkRepair™",
    subtitle: "Repair\nProtection",
    icon: "/new_assets/advantage/lynkrepair.svg",
    link: "#",
  },
  {
    title: "LynkFinance™",
    subtitle: "Easy\nFinancing",
    icon: "/new_assets/advantage/lynkfinance.svg",
    link: "#",
  },
  {
    title: "LynkDesign™",
    subtitle: "Maximum\nGeneration",
    icon: "/new_assets/advantage/lynkdesign.svg",
    link: "#",
  },
];

// Why it matters 6 columns
const whyItMatters = [
  {
    title: "Heavy Rain?",
    description: "LynkShield keeps your roof & system 100% protected.",
    icon: "/new_assets/advantage/heavy-rain.svg",
  },
  {
    title: "Lower Generation?",
    description: "LynkSure guarantees the generation we promise.",
    icon: "/new_assets/advantage/lower-generation.svg",
  },
  {
    title: "System Stops?",
    description: "One call is all it takes. Covered by LynkCare & LynkRepair.",
    icon: "/new_assets/advantage/system-stops.svg",
  },
  {
    title: "High Electricity Bills?",
    description: "Higher generation means lower bills, every single month.",
    icon: "/new_assets/advantage/high-bills.svg",
  },
  {
    title: "Large Upfront Cost?",
    description: "Easy EMI options make solar affordable for everyone.",
    icon: "/new_assets/advantage/upfront-cost.svg",
  },
  {
    title: "Worried About Life?",
    description: "30+ years of assured performance with premium components.",
    icon: "/new_assets/advantage/worried-life.svg",
  },
];

// SunLynk core comparison features
const sunlynkFeatures = [
  { text: "Higher Generation", icon: "/new_assets/advantage/lynkdesign.svg" },
  { text: "Waterproof Warranty", icon: "/new_assets/advantage/lynkshield.svg" },
  { text: "5-Year AMC", icon: "/new_assets/advantage/lynkcare.svg" },
  { text: "Repair Protection", icon: "/new_assets/advantage/lynkrepair.svg" },
  { text: "Easy Financing", icon: "/new_assets/advantage/lynkfinance.svg" },
  { text: "30+ Year Performance", icon: "/new_assets/advantage/worried-life.svg" },
];

// Typical Installer drawbacks
const typicalInstallerDrawbacks = [
  { text: "No Generation Guarantee", icon: "/new_assets/advantage/typical-no-generation.svg" },
  { text: "No Waterproof Warranty", icon: "/new_assets/advantage/typical-no-waterproof.svg" },
  { text: "Limited or No AMC", icon: "/new_assets/advantage/typical-no-amc.svg" },
  { text: "Pay for Every Repair", icon: "/new_assets/advantage/typical-pay-repair.svg" },
  { text: "No Financing Support", icon: "/new_assets/advantage/typical-no-financing.svg" },
  { text: "Standard Performance", icon: "/new_assets/advantage/typical-standard-performance.svg" },
];

// Bottom trust badges
const trustBadges = [
  {
    title: "Premium Quality",
    desc: "Top-tier components from trusted global brands.",
    icon: Sparkles,
  },
  {
    title: "Expert Installation",
    desc: "Trained professionals, zero compromise.",
    icon: Wrench,
  },
  {
    title: "Lifetime Support",
    desc: "We're with you, long after installation.",
    icon: Headphones,
  },
  {
    title: "Trusted by Homeowners",
    desc: "Hundreds of happy homes and growing.",
    icon: Users,
  },
];

export default function SunLynkAdvantage() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#fbfcfa] via-[#f7f9f6]/40 to-[#fbfcfa] overflow-hidden border-t border-slate-200/60" id="sunlynk-advantage">
      {/* Micro tech dots backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,204,113,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= SECTION 1: HEADER & CORE ADVANTAGES ================= */}
        {/* 12-Column Grid on Desktop: Header (left 4), Image & Cards (right 8) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          
          {/* Left Column (span 4): Title and Explore Button */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-8 text-left py-4">
            {/* Logo placeholder/Header */}
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7">
                <Image 
                  src="/new_assets/logo.jpeg" 
                  alt="SunLynk logo symbol" 
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-wider text-slate-800 uppercase leading-none">SUNLYNK</span>
                <span className="text-[9px] font-bold text-emerald-700 tracking-widest uppercase mt-0.5 leading-none">SOLAR</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-slate-900 tracking-tight leading-[1.05]">
                The SunLynk <br />
                <span className="text-[#044a37]">
                  Advantage
                </span>
              </h2>
              
              <div className="space-y-1">
                <p className="text-base text-slate-650 font-bold leading-normal">
                  More than installation.
                </p>
                <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                  Complete protection. Maximum savings.
                </p>
              </div>
            </div>
            
            <div>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-[#044a37] text-white hover:bg-emerald-900 font-bold px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group text-sm"
              >
                <span>Explore the SunLynk Advantage</span>
                <span className="w-5 h-5 rounded-full bg-white text-[#044a37] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={12} strokeWidth={3} />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column (span 8): Solar Image (top) + 6 Cards Row (bottom) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            
            {/* Solar Panel Render Container */}
            <div className="relative w-full h-[180px] sm:h-[240px] md:h-[260px] flex items-end justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-[#f3f9f6] to-transparent border border-slate-100/50">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,204,113,0.06)_0%,transparent_70%)] pointer-events-none" />
              <div className="relative w-[90%] h-[95%]">
                <Image 
                  src="/new_assets/advantage/sunlynk_advantage_solar.png"
                  alt="Sleek solar panel rendering"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Row of 6 cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 relative">
              {coreAdvantages.map((card, idx) => (
                <div 
                  key={idx} 
                  className="relative bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between group"
                >
                  {/* Floating connector plus symbol on desktop */}
                  {idx < 5 && (
                    <div className="hidden lg:flex absolute right-[-11px] top-[40%] -translate-y-1/2 w-5.5 h-5.5 rounded-full bg-[#f6f9f7] border border-slate-200/50 items-center justify-center text-emerald-600 font-bold z-20 shadow-sm text-xs select-none">
                      +
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className="w-13 h-13 relative mb-4 transition-transform duration-300 group-hover:scale-105">
                    <Image 
                      src={card.icon}
                      alt={card.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Text Details */}
                  <div className="space-y-1 mb-3.5 flex-grow">
                    <h4 className="font-extrabold text-slate-800 text-xs tracking-tight">{card.title}</h4>
                    <p className="text-[10px] text-slate-450 font-bold leading-snug whitespace-pre-line">{card.subtitle}</p>
                  </div>

                  {/* Learn More link */}
                  <Link 
                    href={card.link}
                    className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 hover:text-emerald-800 transition-colors mt-auto"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={8} strokeWidth={3} />
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ================= SECTION 2: WHY IT MATTERS TO YOU ================= */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2.5">
            <span className="h-[1.5px] w-6 bg-slate-200"></span>
            <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">
              WHY IT <span className="text-emerald-600">MATTERS</span> TO YOU
            </span>
            <span className="h-[1.5px] w-6 bg-slate-200"></span>
          </div>
        </div>

        {/* Single container wrapper for clean border & dividers */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {whyItMatters.map((item, idx) => (
              <div 
                key={idx} 
                className="p-6 flex flex-col items-center text-center group hover:bg-[#fafcfa]/60 transition-colors duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 relative mb-4 transition-transform duration-300 group-hover:scale-105">
                  <Image 
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Text Title */}
                <h4 className="font-extrabold text-slate-800 text-xs mb-1.5 leading-snug">{item.title}</h4>
                {/* Description */}
                <p className="text-[11px] text-slate-500 leading-normal max-w-[150px] mb-4 min-h-[44px]">
                  {item.description}
                </p>
                
                {/* Bottom line */}
                <div className="w-6 h-[2px] bg-slate-200 group-hover:bg-emerald-500 group-hover:w-10 transition-all duration-300 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 3: COMPARISON MATRIX ================= */}
        <div className="relative mb-24">
          {/* side-by-side on desktop, stacked on mobile */}
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-0 relative">
            
            {/* LEFT: SunLynk Advantage Column */}
            <div className="w-full lg:w-[49%] bg-[#044a37] rounded-3xl p-6 lg:p-8 text-white shadow-lg relative overflow-hidden border border-emerald-950/20 flex flex-col justify-between">
              {/* Corner soft glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="grid grid-cols-12 gap-5 items-center">
                {/* Left section inside card: SunLynk brand vertical cell */}
                <div className="col-span-12 sm:col-span-3 flex sm:flex-col items-center justify-center text-center py-2 sm:border-r border-emerald-800/60 sm:pr-4">
                  <div className="relative w-8 h-8 mr-2 sm:mr-0 sm:mb-2">
                    <Image 
                      src="/new_assets/logo.jpeg" 
                      alt="SunLynk Logo" 
                      fill
                      className="object-contain mix-blend-screen"
                    />
                  </div>
                  <div className="flex flex-col leading-none text-left sm:text-center">
                    <span className="text-base font-black tracking-wider uppercase">SUNLYNK</span>
                  </div>
                </div>

                {/* Right section inside card: 6 advantages */}
                <div className="col-span-12 sm:col-span-9 grid grid-cols-3 sm:grid-cols-6 gap-3.5 pl-2">
                  {sunlynkFeatures.map((feat, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center space-y-2 group/item">
                      <div className="w-10 h-10 relative bg-emerald-950 rounded-full flex items-center justify-center p-2 border border-emerald-700 transition-transform duration-300 group-hover/item:scale-105 shadow-sm">
                        <Image 
                          src={feat.icon} 
                          alt={feat.text} 
                          fill
                          className="object-contain p-1.5"
                        />
                      </div>
                      <span className="text-[9px] font-bold text-emerald-50/90 leading-tight max-w-[64px] tracking-tight">{feat.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MIDDLE: VS Circle badge */}
            <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-30 flex items-center justify-center my-2 lg:my-0">
              <div className="w-11 h-11 rounded-full bg-white text-[#044a37] border-4 border-[#fafcfa] flex items-center justify-center font-black text-xs shadow-md">
                VS
              </div>
            </div>

            {/* RIGHT: Typical Installer Column */}
            <div className="w-full lg:w-[49%] bg-[#1e293b] rounded-3xl p-6 lg:p-8 text-white shadow-lg relative overflow-hidden border border-slate-800/30 flex flex-col justify-between">
              
              <div className="flex flex-col space-y-5">
                {/* Header label bar */}
                <div className="text-center border-b border-slate-800 pb-3 mb-2 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">TYPICAL INSTALLER</span>
                </div>

                {/* 6 Drawbacks */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3.5">
                  {typicalInstallerDrawbacks.map((feat, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center space-y-2 group/item">
                      <div className="w-10 h-10 relative bg-slate-950 rounded-full flex items-center justify-center p-2 border border-slate-800 transition-transform duration-300 group-hover/item:scale-105 shadow-sm">
                        <Image 
                          src={feat.icon} 
                          alt={feat.text} 
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 leading-tight max-w-[70px] tracking-tight">{feat.text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ================= SECTION 4: TRUST BADGES & FOOTNOTE ================= */}
        <div className="border-t border-slate-100 pt-12">
          {/* 5-Column Grid Layout: 4 badges on left, 1 card on right */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            
            {/* Columns 1-4: The 4 trust badges */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {trustBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start text-left group">
                    {/* Circle icon on left */}
                    <div className="w-9 h-9 rounded-full border border-emerald-600/30 text-emerald-700 flex items-center justify-center shrink-0 bg-emerald-50/40 transition-transform duration-300 group-hover:scale-105">
                      <Icon size={16} strokeWidth={2.5} />
                    </div>
                    {/* Text details on right */}
                    <div className="space-y-0.5">
                      <h5 className="font-extrabold text-slate-800 text-xs tracking-tight">{badge.title}</h5>
                      <p className="text-[10px] text-slate-450 leading-relaxed font-bold">{badge.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 5: Right Footnote Box */}
            <div className="lg:col-span-1 bg-white border border-slate-100 rounded-2xl p-5 text-left shadow-[0_4px_15px_rgba(0,0,0,0.015)] relative">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 leading-none">SunLynk solar</p>
              <h4 className="text-xs font-bold text-slate-600 leading-relaxed">
                SunLynk isn't just another installer. <br />
                <span className="text-[#044a37] font-black">We're your long-term solar partner.</span>
              </h4>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
