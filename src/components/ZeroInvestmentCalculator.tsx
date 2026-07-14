"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SystemSize = "3kW" | "4kW" | "5kW";
type Tenure = 60;

interface CalculatorData {
  suitable: string;
  saving: string;
  emi: Record<Tenure, string>;
}

const calculatorData: Record<SystemSize, CalculatorData> = {
  "3kW": {
    suitable: "Suitable for Rs. 1500 to Rs. 2500 monthly bill",
    saving: "2900",
    emi: {
      60: "2200",
    },
  },
  "4kW": {
    suitable: "Suitable for Rs. 2500 to Rs. 4000 monthly bill",
    saving: "4200",
    emi: {
      60: "3100",
    },
  },
  "5kW": {
    suitable: "Suitable for Rs. 4000 to Rs. 8000 monthly bill",
    saving: "5500",
    emi: {
      60: "4000",
    },
  },
};

export default function ZeroInvestmentCalculator() {
  const [selectedSize, setSelectedSize] = useState<SystemSize>("3kW");
  const [selectedTenure, setSelectedTenure] = useState<Tenure>(60);

  const activeData = calculatorData[selectedSize];

  return (
    <section id="calculator" className="py-20 bg-[#065F46] text-white overflow-hidden relative">
      {/* Decorative ambient background glows */}
      <div className="absolute right-[-10%] top-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute left-[-10%] bottom-[-10%] w-[40%] h-[40%] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Headings & Got Questions Card */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight text-white mb-4">
                Go Solar with <br />
                <span className="text-primary">Zero Investment</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed max-w-md">
                Government subsidy covers your downpayment, and monthly solar saving covers your EMI.
              </p>
            </div>

            {/* Got Questions Card */}
            <div className="relative bg-gradient-to-br from-[#E6FDF4] to-[#C2F3DF] rounded-xl p-6 md:p-8 flex items-center justify-between shadow-xl shadow-emerald-950/20 border border-emerald-200/50 overflow-hidden group mt-4">
              {/* Corner soft glow */}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none" />

              <div className="flex flex-col gap-2.5 z-10 text-slate-900 max-w-[65%]">
                <h3 className="font-extrabold text-lg sm:text-xl text-emerald-950 tracking-tight">Got questions?</h3>
                <p className="text-[11px] sm:text-xs text-emerald-800 font-bold leading-normal">
                  Our solar experts are just a call away.
                </p>
                <a
                  href="https://wa.me/918573003001?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20EMI%20Interest%20rates%20and%20Subsidy%20Process."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-800 hover:bg-emerald-950 text-white font-black text-xs py-2.5 px-5 rounded-full inline-flex items-center gap-1.5 shadow-md shadow-emerald-950/15 hover:shadow-lg hover:shadow-emerald-950/25 active:scale-98 transition-all self-start mt-2"
                >
                  Talk to our expert <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Cropped Expert Image */}
              <div className="absolute right-0 top-0 bottom-0 h-full aspect-[287/307] z-0">
                {/* Soft glow behind the avatar to integrate it into the card */}
                {/* <div className="absolute inset-x-4 bottom-2 top-4 bg-emerald-400/30 rounded-full blur-md -z-10" /> */}
                <Image
                  src="/new_assets/avatar.webp"
                  alt="Solar Expert"
                  fill
                  sizes="(max-width: 768px) 128px, 150px"
                  priority
                  className="object-cover object-bottom select-none pointer-events-none group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Calculator Estimates */}
          <div className="lg:col-span-7 bg-[#111827]/40 border border-white/[0.06] rounded-xl p-6 sm:p-8 backdrop-blur-md flex flex-col gap-6 text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Get Savings and EMI Estimates
              </h3>
            </div>

            {/* System Size selector */}
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                System Size
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(calculatorData) as SystemSize[]).map((size) => {
                  const isActive = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-4 rounded-xl text-left border transition-all duration-300 flex flex-col gap-1 outline-none cursor-pointer ${isActive
                        ? "border-primary bg-[#0A1611]/80 shadow-lg ring-2 ring-primary/20"
                        : "border-white/[0.08] bg-[#111827]/60 hover:border-white/[0.15]"
                        }`}
                    >
                      <span className={`text-base font-extrabold ${isActive ? "text-primary" : "text-white"}`}>
                        {size}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-400 leading-normal font-semibold">
                        {calculatorData[size].suitable}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-450 mt-2.5 leading-normal">
                For other system sizes,{" "}
                <Link href="/contact" className="text-primary hover:underline font-bold transition-all">
                  contact our expert
                </Link>
                {" "}or chat with us on{" "}
                <a
                  href="https://wa.me/918573003001?text=Hi, I'd like to know more about EMI Interest rates and Subsidy Process."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-bold transition-all"
                >
                  WhatsApp
                </a>
                {" "}to get custom EMI plans.
              </p>
            </div>

            {/* EMI Tenure selector */}
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                EMI Tenure
              </span>
              <div className="flex flex-wrap gap-2.5">
                {([60] as Tenure[]).map((tenure) => {
                  const isActive = selectedTenure === tenure;
                  return (
                    <button
                      key={tenure}
                      onClick={() => setSelectedTenure(tenure)}
                      className={`px-6 py-2.5 rounded-xl font-bold text-xs border transition-all duration-300 outline-none cursor-pointer ${isActive
                        ? "border-primary bg-[#0A1611] text-white"
                        : "border-white/[0.08] bg-[#111827]/60 text-slate-400 hover:border-white/[0.15] hover:text-white"
                        }`}
                    >
                      {tenure} Months
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Output Display */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6 border-t border-white/[0.08] mt-2">
              <div>
                <span className="block text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Your Monthly Saving
                </span>
                <span className="block text-2xl sm:text-3xl font-black text-emerald-400">
                  ₹{activeData.saving}
                </span>
                <span className="block text-[10px] sm:text-[11px] text-slate-400 font-semibold mt-0.5">
                  for 25 years!
                </span>
              </div>
              <div>
                <span className="block text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Monthly EMI
                </span>
                <span className="block text-2xl sm:text-3xl font-black text-white">
                  ₹{activeData.emi[selectedTenure]}
                </span>
                <span className="block text-[10px] sm:text-[11px] text-slate-400 font-semibold mt-0.5">
                  {selectedTenure} months
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
