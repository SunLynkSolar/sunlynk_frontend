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
  TrendingDown
} from "lucide-react";

export default function CommercialCalculator() {
  const [pincode, setPincode] = useState("226012");
  const [bill, setBill] = useState(50000);

  // Validation
  const isPincodeFilled = pincode.length === 6;
  const isLucknow = pincode.startsWith("226");

  // Commercial tariff parameters
  const TARIFF = 9;
  const UNITS_PER_KW_DAY = 4;
  const COST_PER_KW = 55000;

  // Calculations
  const monthlyUnits = bill / TARIFF;
  const dailyUnitsRequired = monthlyUnits / 30;
  const systemSizekW = dailyUnitsRequired / UNITS_PER_KW_DAY;

  // Commercial panels (550W panels)
  const numberOfPanels = Math.ceil(systemSizekW / 0.55);
  const requiredRoofArea = Math.ceil(systemSizekW * 95); // 95 sq. ft. per kW

  // Savings
  const monthlySavings = bill * 0.90; // 90% bill offset
  const yearlySavings = monthlySavings * 12;
  const lifetimeSavings = yearlySavings * 25; // 25 years lifecycle

  // Commercial USPs: Accelerated Depreciation tax benefits
  // 40% depreciation benefit under section 32, assuming corporate tax rate of 25%
  const totalSystemCost = systemSizekW * COST_PER_KW;
  const taxSavingsAD = totalSystemCost * 0.40 * 0.25;

  // Payback period
  const paybackYears = 3.4;

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
            <span className="text-base uppercase tracking-wider font-bold text-primary">Commercial Savings</span>
            <span className="h-[2px] w-6 bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight">
            Commercial Solar ROI Calculator
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed mt-1">
            Calculate your commercial system sizing, required shadow-free space, tax incentives, and payback timeline in seconds.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white border border-gray-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl shadow-lg">

          {/* Left Panel: Inputs & Graphic */}
          <div className="lg:col-span-5 p-5 sm:p-8 bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col justify-between gap-6 sm:gap-8">

            {/* Illustration */}
            <div className="relative aspect-[21/16] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-gray-150 shadow-inner group order-1 lg:order-3">
              <Image
                src="/assets/IMAGE/solar.webp"
                alt="Commercial Solar savings illustration"
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-4 right-4 flex justify-between items-center text-white z-10">
                <span className="text-[11px] font-extrabold tracking-wide uppercase flex items-center gap-1">
                  <Sparkles size={12} className="text-yellow-400" />
                  High ROI Asset
                </span>
                <span className="text-[10px] font-bold opacity-90 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                  ~3.5 Years Payback
                </span>
              </div>
            </div>

            {/* Pin Code Input */}
            <div className="flex flex-col gap-2 order-2 lg:order-1 text-left">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                <span>Operational Site Pincode</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit Pincode"
                  className="w-full bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3.5 pl-4 pr-28 text-sm font-semibold text-gray-800 transition-all shadow-sm outline-none placeholder:text-gray-400"
                />
                {isPincodeFilled && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                    {isLucknow ? (
                      <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold py-1 px-2 rounded-full border border-emerald-200">
                        Lucknow
                      </span>
                    ) : (
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-bold py-1 px-2 rounded-full border border-blue-200">
                        General India
                      </span>
                    )}
                  </div>
                )}
              </div>
              <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">
                Enter your site pincode to customized regional insulation variables.
              </p>
            </div>

            {/* Bill Slider */}
            <div className="flex flex-col gap-3 order-3 lg:order-2 text-left">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Avg Monthly Bill (commercial rate)</span>
                  <div className="group relative">
                    <HelpCircle size={13} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-dark text-white text-[10px] p-2.5 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 leading-normal font-medium">
                      Your average monthly commercial grid electricity expense in Indian Rupees (INR).
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
                  min={10000}
                  max={500000}
                  step={5000}
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2">
                  <span>Min. ₹10k</span>
                  <span>Max. ₹5.0 Lakhs</span>
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
                  Recommended System Sizing
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
                        {systemSizekW.toFixed(1)} <span className="text-xs font-bold text-gray-400">kWp</span>
                      </p>
                      <p className="text-[10px] text-gray-400 font-semibold mt-1">({numberOfPanels} High-Efficiency Panels)</p>
                    </div>
                  </div>

                  {/* Roof Area Box */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4 group hover:border-primary/20 transition-all duration-300 text-left">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-primary">
                      <Maximize size={24} />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Roof Space Required</p>
                      <p className="text-xl sm:text-2xl font-black text-dark mt-0.5">
                        {requiredRoofArea.toLocaleString()} <span className="text-xs font-bold text-slate-400">sq. ft.</span>
                      </p>
                      <p className="text-[10px] text-gray-400 font-semibold mt-1">(Usable shadow-free concrete/metal roof)</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Result Section 2: Financial Savings & AD Benefits */}
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-left">
                  Corporate Savings & Tax Benefits
                </h3>

                <div className="bg-emerald-50/45 border border-emerald-100/50 rounded-2xl p-6 relative overflow-hidden text-left">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">

                    {/* Monthly */}
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] font-bold text-emerald-800/80 uppercase tracking-wider">Monthly Savings</p>
                      <p className="text-lg sm:text-xl font-black text-emerald-700">
                        {formatRupee(monthlySavings)}
                      </p>
                    </div>

                    {/* Tax Savings */}
                    <div className="flex flex-col gap-1 border-none lg:border-l border-emerald-100 lg:pl-4 sm:pl-0">
                      <p className="text-[10px] font-bold text-emerald-800/80 uppercase tracking-wider flex items-center gap-1">
                        <span>1st Yr AD Tax Benefit</span>
                        <span title="40% Accelerated Depreciation tax write-off in Year 1" className="cursor-pointer flex items-center">
                          <HelpCircle size={10} className="text-emerald-600" />
                        </span>
                      </p>
                      <p className="text-lg sm:text-xl font-black text-indigo-700">
                        {formatRupee(taxSavingsAD)}
                      </p>
                    </div>

                    {/* Lifetime */}
                    <div className="flex flex-col gap-1 border-none lg:border-l border-emerald-100 lg:pl-4 sm:pl-0">
                      <p className="text-[10px] font-bold text-emerald-800/80 uppercase tracking-wider">25-Yr Net Savings</p>
                      <p className="text-lg sm:text-xl font-black text-emerald-700">
                        {formatRupee(lifetimeSavings)}
                      </p>
                    </div>

                  </div>

                  {/* Banner bottom inside savings */}
                  <div className="mt-6 pt-4 border-t border-emerald-100/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-emerald-800 font-bold">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-primary shrink-0" />
                      <span>Payback Period: ~{paybackYears} Years</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded font-extrabold uppercase">
                      Open Access Options Available
                    </span>
                  </div>

                </div>
              </div>

            </div>

            {/* CTAs / Booking info */}
            <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-left">
                <p className="text-xs font-bold text-dark flex items-center gap-1.5">
                  <Award size={14} className="text-primary" />
                  SunLynk Solar EPC Advantage
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">Complimentary feasibility studies, shadow analysis.</p>
              </div>

              <Link
                href="/contact"
                className="group w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold text-sm py-3 px-6 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 active:scale-95 shrink-0"
              >
                <span>Request Feasibility Study</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
