"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Info,
  ArrowRight,
  HelpCircle,
  Sun,
  Maximize,
  TrendingUp,
  Award,
  Sparkles,
  ShieldCheck,
  Building
} from "lucide-react";

export default function SocietyCalculator() {
  const [pincode, setPincode] = useState("226016");
  const [bill, setBill] = useState(30000);
  const [flatCount, setFlatCount] = useState(120);

  // Validation
  const isPincodeFilled = pincode.length === 6;
  const isLucknow = pincode.startsWith("226");

  // Society tariff parameters
  const TARIFF = 8.5;
  const UNITS_PER_KW_DAY = 4;

  // Calculations
  const monthlyUnits = bill / TARIFF;
  const dailyUnitsRequired = monthlyUnits / 30;
  const systemSizekW = dailyUnitsRequired / UNITS_PER_KW_DAY;

  // High-efficiency panels (550W)
  const numberOfPanels = Math.ceil(systemSizekW / 0.55);
  const requiredRoofArea = Math.ceil(systemSizekW * 85); // 85 sq. ft. per kW for raised structures

  // Savings
  const monthlySavings = bill * 0.90; // 90% common load offset
  const yearlySavings = monthlySavings * 12;
  const lifetimeSavings = yearlySavings * 25; // 25 years lifecycle

  // Maintenance cost reduction per flat
  const perFlatMonthlyReduction = flatCount > 0 ? monthlySavings / flatCount : 0;

  const formatRupee = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100" id="solar-calculator">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2">
            <span className="h-[2px] w-6 bg-primary"></span>
            <span className="text-base uppercase tracking-wider font-bold text-primary">Society Savings</span>
            <span className="h-[2px] w-6 bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight">
            Housing Society Solar Sizer
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed mt-1">
            Estimate the system size needed for your common-area utilities, lifts, pumps, and calculate flat-wise maintenance savings.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white border border-gray-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">

          {/* Left Panel: Inputs & Graphic */}
          <div className="lg:col-span-5 p-5 sm:p-8 bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col justify-between gap-6 sm:gap-8">

            {/* Illustration */}
            <div className="relative aspect-[21/16] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-gray-150 shadow-inner group order-1 lg:order-3">
              <Image
                src="/assets/images/service/solar_housing_society.webp"
                alt="Housing Society Solar illustration"
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-4 right-4 flex justify-between items-center text-white z-10">
                <span className="text-[11px] font-extrabold tracking-wide uppercase flex items-center gap-1">
                  <Sparkles size={12} className="text-yellow-400" />
                  Shared Community Savings
                </span>
                <span className="text-[10px] font-bold opacity-90 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                  Lifts, Pumps & Lights
                </span>
              </div>
            </div>

            {/* Pincode & Flats Count Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 lg:order-1">
              {/* Pin Code */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={13} className="text-primary" />
                  <span>Pincode</span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="226xxx"
                  className="w-full bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-3 pr-3 text-xs font-bold text-gray-800 transition-all outline-none"
                />
              </div>

              {/* Flat Count */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Building size={13} className="text-primary" />
                  <span>Total Flats</span>
                </label>
                <input
                  type="number"
                  min={10}
                  max={1000}
                  value={flatCount}
                  onChange={(e) => setFlatCount(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 px-3 text-xs font-bold text-gray-800 transition-all outline-none"
                />
              </div>
            </div>

            {/* Bill Slider */}
            <div className="flex flex-col gap-3 order-3 lg:order-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Common-area Electricity Bill</span>
                  <div className="group relative">
                    <HelpCircle size={13} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-dark text-white text-[10px] p-2.5 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 leading-normal font-medium">
                      Average monthly common utility bill (Elevators, common illumination, pumping systems).
                    </div>
                  </div>
                </label>
                <span className="bg-dark text-white text-xs font-black py-1 px-2.5 rounded">
                  {formatRupee(bill)}
                </span>
              </div>

              <div className="relative mt-2">
                <input
                  type="range"
                  min={5000}
                  max={200000}
                  step={2000}
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2">
                  <span>Min. ₹5,000</span>
                  <span>Max. ₹2.0 Lakhs</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Panel: Calculations */}
          <div className="lg:col-span-7 p-5 md:p-10 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-8">

              {/* Result Section 1: System Details */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-left">
                  Required System Capacity
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* System Size Box */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4 group hover:border-primary/20 transition-all duration-300 text-left">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-primary">
                      <Sun size={24} />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">System Size</p>
                      <p className="text-xl sm:text-2xl font-black text-dark mt-0.5">
                        {systemSizekW.toFixed(1)} <span className="text-xs font-bold text-gray-400">kW</span>
                      </p>
                      <p className="text-[10px] text-gray-400 font-semibold mt-1">({numberOfPanels} Panels Required)</p>
                    </div>
                  </div>

                  {/* Roof Area Box */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4 group hover:border-primary/20 transition-all duration-300 text-left">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-primary">
                      <Maximize size={24} />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Roof Area Space</p>
                      <p className="text-xl sm:text-2xl font-black text-dark mt-0.5">
                        {requiredRoofArea.toLocaleString()} <span className="text-xs font-bold text-gray-400">sq. ft.</span>
                      </p>
                      <p className="text-[10px] text-gray-400 font-semibold mt-1">(Elevated designs available for play-areas)</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Result Section 2: Collective Savings & Resident Relief */}
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-left">
                  Society Savings Breakdown
                </h3>

                <div className="bg-[#f6fbe8]/45 border border-[#ebf5d2]/50 rounded-2xl p-6 relative overflow-hidden text-left">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">

                    {/* Monthly */}
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] font-bold text-[#416c17]/80 uppercase tracking-wider">Monthly Savings</p>
                      <p className="text-lg sm:text-xl font-black text-[#568f1f]">
                        {formatRupee(monthlySavings)}
                      </p>
                    </div>

                    {/* Resident Flat Relief */}
                    <div className="flex flex-col gap-1 border-none lg:border-l border-[#ebf5d2] lg:pl-4 sm:pl-0">
                      <p className="text-[10px] font-bold text-[#416c17]/80 uppercase tracking-wider flex items-center gap-1">
                        <span>Flat-wise Relief/Mo.</span>
                        <span title="Estimated reduction in maintenance bill per flat, assuming collective sharing" className="cursor-pointer flex items-center">
                          <HelpCircle size={10} className="text-[#568f1f]" />
                        </span>
                      </p>
                      <p className="text-lg sm:text-xl font-black text-indigo-700">
                        {formatRupee(perFlatMonthlyReduction)}
                      </p>
                    </div>

                    {/* Lifetime Collective */}
                    <div className="flex flex-col gap-1 border-none lg:border-l border-[#ebf5d2] lg:pl-4 sm:pl-0">
                      <p className="text-[10px] font-bold text-[#416c17]/80 uppercase tracking-wider">25-Yr Total Savings</p>
                      <p className="text-lg sm:text-xl font-black text-[#568f1f]">
                        {formatRupee(lifetimeSavings)}
                      </p>
                    </div>

                  </div>

                  {/* Banner bottom inside savings */}
                  <div className="mt-6 pt-4 border-t border-[#ebf5d2]/80 flex items-center gap-2 text-xs text-[#416c17] font-bold">
                    <ShieldCheck size={16} className="text-primary shrink-0" />
                    <span>Reduces community carbon footprint while cutting maintenance overhead.</span>
                  </div>

                </div>
              </div>

            </div>

            {/* CTAs / Booking info */}
            <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-left">
                <p className="text-xs font-bold text-dark flex items-center gap-1.5">
                  <Award size={14} className="text-primary" />
                  SunLynk Society Assistance
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">We assist in AGM representations, project financing & standard vendor contracts.</p>
              </div>

              <Link
                href="/contact"
                className="group w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold text-sm py-3 px-6 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 active:scale-95 shrink-0"
              >
                <span>Request Society Survey</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
