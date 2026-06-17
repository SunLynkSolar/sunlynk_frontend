"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  ShieldCheck,
  Zap,
  Sparkles,
  Coins,
  Check,
} from "lucide-react";

const mainPillars = [
  {
    title: "Money-Back Promise at ₹8/Unit",
    desc: "Direct deficit return guarantee. If your monthly solar generation falls short of our target, we compensate you at ₹8 per unit.",
    icon: Coins,
    colorClass: "text-secondary",
    bgClass: "bg-secondary/8 border-secondary/15",
  },
  {
    title: "Regular Proactive Maintenance",
    desc: "Scheduled checkups, performance diagnostics, and panel cleaning support visits to keep your system performing at peak efficiency.",
    icon: Activity,
    colorClass: "text-primary",
    bgClass: "bg-primary/8 border-primary/15",
  },
  {
    title: "₹0 Repair & Replacement Cost",
    desc: "Complete 5-year coverage. Absolutely zero out-of-pocket expenses for component replacements, labor, or service issues.",
    icon: ShieldCheck,
    colorClass: "text-primary",
    bgClass: "bg-primary/8 border-primary/15",
  },
  {
    title: "App to Track Real-Time Power",
    desc: "Smart cloud-connected dashboard tracking daily generation, carbon reduction, and grid exports live on your phone.",
    icon: Zap,
    colorClass: "text-secondary",
    bgClass: "bg-secondary/8 border-secondary/15",
  },
];

const hardwareSpecs = [
  { label: "Premium Panels", value: "TopCon N-Type Bifacial" },
  { label: "Smart Inverter", value: "Havells Grid-Tied" },
  { label: "Structural Steel", value: "Wind-Resistant HDGI Structure" },
  { label: "Site Quality", value: "Certified Site survey & 3D layout" },
];

export default function ProductsPreview() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden border-y border-slate-100" id="our-plans">
      {/* Subtle grid backdrop for corporate clean-tech style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-secondary/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 bg-primary/8 border border-primary/15 rounded-full py-1.5 px-4 text-xs font-bold text-primary tracking-wide shadow-sm">
            <Sparkles size={12} className="text-primary animate-pulse" />
            <span>Signature Performance Guarantee</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-dark leading-tight tracking-tight">
            Introducing <span className="text-primary">Lynk Sure™</span>
          </h2>
          <h3 className="text-lg sm:text-xl font-bold text-gray-500 mt-2">
            India's only Guaranteed Solar Savings Plan
          </h3>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-5" />
        </div>

        {/* Content Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Side: Guarantees (The 4 Pillars) */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Your investment, fully protected by a complete 5-year insurance envelope. Lynk Sure provides absolute confidence that your solar panels generate what was promised, with zero repair or maintenance bills.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mainPillars.map((pillar, index) => {
                const IconComp = pillar.icon;
                return (
                  <div key={index} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${pillar.bgClass} ${pillar.colorClass} group-hover:scale-105 transition-transform duration-300`}>
                      <IconComp size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-dark group-hover:text-primary transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed mt-1.5">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Sleek Glassmorphic Guarantee Certificate Card */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xl max-w-[400px] w-full flex flex-col gap-6 relative">
              {/* Top border decoration */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-t-2xl" />

              {/* Header */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Policy Document</span>
                  <span className="text-sm font-black text-dark tracking-tight">LYNK SURE™ SYSTEM SECURE</span>
                </div>
                <span className="text-[9px] font-mono text-gray-400">ID: LS-5Y-VERIFIED</span>
              </div>

              {/* Vector Guarantee Seal */}
              <div className="py-2">
                <svg viewBox="0 0 200 200" className="w-44 h-44 mx-auto">
                  {/* Outer ring */}
                  <circle cx="100" cy="100" r="85" fill="none" stroke="#fca311" strokeWidth="2" strokeDasharray="4,4" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#2ecc71" strokeWidth="1.5" />

                  {/* Inner background */}
                  <circle cx="100" cy="100" r="70" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

                  {/* Text labels inside stamp */}
                  <text x="100" y="65" textAnchor="middle" fontSize="10" fontWeight="950" fill="#1c1c1c" letterSpacing="1">5 YEAR</text>
                  <text x="100" y="80" textAnchor="middle" fontSize="12" fontWeight="950" fill="#2ecc71" letterSpacing="0.5">WARRANTY</text>

                  {/* Inner Shield */}
                  <g transform="translate(85, 93) scale(1.25)">
                    <path d="M 12 22 C 12 22 20 18 20 12 L 20 5 L 12 2 L 4 5 L 4 12 C 4 18 12 22 12 22 Z" fill="#2ecc71" />
                    <path d="M 9 12 L 11 14 L 15 10" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>

                  <text x="100" y="152" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1c1c1c" letterSpacing="0.8">LYNK SURE</text>
                  <text x="100" y="165" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fca311" letterSpacing="0.5">SECURED SYSTEM</text>
                </svg>
              </div>

              {/* Quick Policy Specs */}
              <div className="flex flex-col gap-3.5 border-t border-slate-100 pt-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-medium">Generation Insurance</span>
                  <span className="font-extrabold text-primary flex items-center gap-1">
                    <Check size={12} strokeWidth={3} /> Verified Coverage
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-medium">Hardware Repair Cost</span>
                  <span className="font-extrabold text-primary">₹0 / Zero Cost</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-medium">Deficit Return Rate</span>
                  <span className="font-extrabold text-secondary">₹8.00 per Unit</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Horizontal Spec Sheet Section */}
        <div className="mt-16 border-t border-slate-200/60 pt-10">
          <div className="text-left mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Hardware & Survey Standards</span>
            <h4 className="text-base font-extrabold text-dark mt-1">Included Tier-1 Components & Deliverables</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {hardwareSpecs.map((spec, index) => (
              <div key={index} className="bg-white border border-slate-100 p-4.5 rounded-xl shadow-sm text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{spec.label}</span>
                <span className="text-xs sm:text-sm font-black text-dark block mt-1 leading-snug">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button Block */}
        <div className="mt-16 flex flex-col items-center text-center gap-4">
          <Link
            href="/contact"
            className="btn-primary shadow-lg shadow-primary/15 hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 font-bold px-10 py-4"
          >
            <span>Get Started with Lynk Sure</span>
            <ArrowRight size={16} />
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span>Consultation & 3D Site simulation is 100% Free</span>
          </div>
        </div>

      </div>
    </section>
  );
}
