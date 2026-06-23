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
  ShieldCheck
} from "lucide-react";

export default function SolarCalculator() {
  const [pincode, setPincode] = useState("");
  const [bill, setBill] = useState(5000);

  // Validation
  const isValidLucknow = pincode.startsWith("226") && pincode.length === 6;
  const isPincodeFilled = pincode.length === 6;

  // Calculation parameters based on user's exact formula (4 units/kW/day, ₹8/unit tariff, 70 sq. ft. per panel)
  const TARIFF = 8;
  const UNITS_PER_KW_DAY = 4;

  // Calculations
  const monthlyUnits = bill / TARIFF;
  const dailyUnitsRequired = monthlyUnits / 30;
  const systemSizekW = dailyUnitsRequired / UNITS_PER_KW_DAY;

  // Calculate panels (if system size <= 5.5, round up. If above 5.5, add 1 panel for safer side)
  const numberOfPanels = systemSizekW <= 5.5 ? Math.ceil(systemSizekW) : Math.ceil(systemSizekW) + 1;
  const requiredRoofArea = numberOfPanels * 70;

  // Savings (verified by screenshot: ₹6,750 bill -> ₹7,317 savings, multiplier = 1.084)
  const monthlySavings = bill * 1.084;
  const yearlySavings = monthlySavings * 12;
  const lifetimeSavings = yearlySavings * 25; // 25 years lifecycle

  // Currency Formatter
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
            <span className="text-base uppercase tracking-wider font-bold text-primary">Solar Savings</span>
            <span className="h-[2px] w-6 bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight">
            Calculate your Solar Savings
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed mt-1">
            Calculate your recommended system size, required roof area, and estimated electricity savings in seconds.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white border border-gray-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">

          {/* Left Panel: Inputs & Graphic (Col 5) */}
          <div className="lg:col-span-5 p-5 sm:p-8 bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col justify-between gap-6 sm:gap-8">

            {/* Illustration */}
            <div className="relative aspect-[21/16] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-gray-150 shadow-inner group order-1 lg:order-3">
              <img
                src="/new_assets/solarCalculator.webp"
                alt="Solar savings illustration"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-4 right-4 flex justify-between items-center text-white z-10">
                <span className="text-[11px] font-extrabold tracking-wide uppercase flex items-center gap-1">
                  <Sparkles size={12} className="text-yellow-400" />
                  Smart Investment
                </span>
                <span className="text-[10px] font-bold opacity-90 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                  Up to 90% Savings
                </span>
              </div>
            </div>

            {/* Pin Code Input */}
            <div className="flex flex-col gap-2 order-2 lg:order-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                <span>Pin code</span>
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
                    {isValidLucknow ? (
                      <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold py-1 px-2 rounded-full border border-emerald-200">
                        Lucknow
                      </span>
                    ) : (
                      <span className="bg-red-50 text-red-600 text-[10px] font-bold py-1 px-2 rounded-full border border-red-200">
                        Non-Lucknow
                      </span>
                    )}
                  </div>
                )}
              </div>
              {isPincodeFilled && !isValidLucknow && (
                <p className="text-[11px] text-amber-600 font-bold leading-relaxed">
                  ⚠️ Currently serving Lucknow region only (pincodes starting with 226).
                </p>
              )}
              {!isPincodeFilled && (
                <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">
                  Enter your 6-digit Lucknow pincode to calculate.
                </p>
              )}
            </div>

            {/* Bill Slider */}
            <div className="flex flex-col gap-3 order-3 lg:order-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Avg electricity bill</span>
                  <div className="group relative">
                    <HelpCircle size={13} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-dark text-white text-[10px] p-2.5 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 leading-normal font-medium">
                      Your average monthly domestic electricity bill in Indian Rupees (INR).
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
                  min={500}
                  max={10000}
                  step={100}
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2">
                  <span>Min. ₹500</span>
                  <span>Max. ₹10,000</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Panel: Calculations (Col 7) */}
          <div className="lg:col-span-7 p-2 md:p-10 flex flex-col justify-between gap-8">

            {isValidLucknow ? (
              <div className="flex flex-col gap-8">

                {/* Result Section 1: System Details */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Required System Size
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* System Size Box */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center gap-4 group hover:border-primary/20 transition-all duration-300">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-primary">
                        <Sun size={24} />
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">System Size</p>
                        <p className="text-xl sm:text-2xl font-black text-dark mt-0.5">
                          {systemSizekW.toFixed(2)} <span className="text-xs font-bold text-gray-400">kW</span>
                        </p>
                        <p className="text-[10px] text-gray-400 font-semibold mt-1">({numberOfPanels} Panels)</p>
                      </div>
                    </div>

                    {/* Roof Area Box */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center gap-4 group hover:border-primary/20 transition-all duration-300">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-primary">
                        <Maximize size={24} />
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Roof Area</p>
                        <p className="text-xl sm:text-2xl font-black text-dark mt-0.5">
                          {requiredRoofArea} <span className="text-xs font-bold text-gray-400">sq. ft.</span>
                        </p>
                        <p className="text-[10px] text-gray-400 font-semibold mt-1">({requiredRoofArea} sq. ft. required)</p>
                      </div>
                    </div>

                  </div>

                  {/* Small advice notice */}
                  <div className="text-[11px] text-gray-400 font-semibold flex items-center gap-1.5 px-1 mt-1">
                    <Info size={12} className="text-primary" />
                    <span>Do not have required roof area? Our consultants can design custom structures. <Link href="/contact" className="text-primary font-bold hover:underline">Get in touch</Link></span>
                  </div>
                </div>

                {/* Result Section 2: Financial Savings */}
                <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Your Solar Savings
                  </h3>

                  <div className="bg-emerald-50/45 border border-emerald-100/50 rounded-2xl p-6 relative overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">

                      {/* Monthly */}
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-bold text-emerald-800/80 uppercase tracking-wider">Monthly*</p>
                        <p className="text-lg sm:text-xl font-black text-emerald-700">
                          {formatRupee(monthlySavings)}
                        </p>
                      </div>

                      {/* Yearly */}
                      <div className="flex flex-col gap-1 border-none lg:border-l border-emerald-100 lg:pl-4 sm:pl-0">
                        <p className="text-[10px] font-bold text-emerald-800/80 uppercase tracking-wider">Yearly*</p>
                        <p className="text-lg sm:text-xl font-black text-emerald-700">
                          {formatRupee(yearlySavings)}
                        </p>
                      </div>

                      {/* Lifetime */}
                      <div className="flex flex-col gap-1 border-none lg:border-l border-emerald-100 lg:pl-4 sm:pl-0">
                        <p className="text-[10px] font-bold text-emerald-800/80 uppercase tracking-wider">Lifetime*</p>
                        <p className="text-lg sm:text-xl font-black text-emerald-700">
                          {formatRupee(lifetimeSavings)}
                        </p>
                      </div>

                    </div>

                    {/* Banner bottom inside savings */}
                    <div className="mt-6 pt-4 border-t border-emerald-100/80 flex items-center gap-2.5 text-xs text-emerald-800 font-bold">
                      <ShieldCheck size={16} className="text-primary shrink-0" />
                      <span>We offer 5-year guaranteed savings with complete generation protection.</span>
                    </div>

                  </div>
                </div>

              </div>
            ) : (
              // Empty State / How It Works content when pincode is not valid Lucknow
              <div className="flex flex-col gap-6 text-left">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                    How It Works
                  </h3>
                  <p className="text-sm font-semibold text-gray-700 mb-4">
                    Using the solar calculator is simple:
                  </p>
                  <ul className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-gray-600 mb-5">
                    <li>Enter your pin code.</li>
                    <li>Fill in your average electricity bill.</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed text-justify mb-6">
                    In seconds, our solar panel price calculator shows you the required system size, required shadow free space on the roof, monthly and yearly savings, estimated cost of installation, subsidy that you will get, power generation, lifetime savings and Return on investment. The calculator also helps you understand your downpayment, EMI, tenure in case you opt for loan or a financing option. The calculator also helps you understand the impact that you will bring in terms of CO2 mitigation or equivalency of trees planted or distance travelled.
                  </p>

                  <h3 className="text-base font-bold text-gray-800 mb-2">
                    Ready to Go Solar?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed text-justify mb-4">
                    The SunLynk Solar Solar Panel Calculator is built for precision, ease, and speed. As next steps, book a free solar consultation with our solar experts and let us help you make an informed decision.
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-primary leading-relaxed text-justify">
                    Your solar journey starts here. Try the Solar Rooftop Calculator now and take your first step towards clean energy and financial freedom.
                  </p>
                </div>
              </div>
            )}

            {/* CTAs / Booking info */}
            <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-left">
                <p className="text-xs font-bold text-dark flex items-center gap-1.5">
                  <Award size={14} className="text-primary" />
                  SunLynk Solar Guarantee
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">Free rooftop site survey, 3D design & 30 years warranty.</p>
              </div>

              <Link
                href="/contact"
                className="group w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold text-sm py-3 px-6 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 active:scale-95 shrink-0"
              >
                <span>Book Free Consultation</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
