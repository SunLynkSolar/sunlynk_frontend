"use client";

import React from "react";
import { Wallet, BadgeCheck, Wrench, HeartHandshake } from "lucide-react";

export default function TrustBar() {
  const pillars = [
    {
      title: "Zero Upfront Payment",
      subtitle: "Easy EMI Available",
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#f6fbe8] border border-[#ebf5d2]/80 flex items-center justify-center text-[#6CB327] shrink-0 shadow-sm hover:scale-105 hover:bg-[#ebf5d2]/50 transition-all duration-300">
          <Wallet className="w-6 h-6 stroke-[2]" />
        </div>
      )
    },
    {
      title: "Govt. Subsidy Support",
      subtitle: "Up to ₹1,08,000",
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#f6fbe8] border border-[#ebf5d2]/80 flex items-center justify-center text-[#6CB327] shrink-0 shadow-sm hover:scale-105 hover:bg-[#ebf5d2]/50 transition-all duration-300">
          <BadgeCheck className="w-6 h-6 stroke-[2]" />
        </div>
      )
    },
    {
      title: "Hassle-Free Installation",
      subtitle: "In Just 8 Hours",
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#f6fbe8] border border-[#ebf5d2]/80 flex items-center justify-center text-[#6CB327] shrink-0 shadow-sm hover:scale-105 hover:bg-[#ebf5d2]/50 transition-all duration-300">
          <Wrench className="w-6 h-6 stroke-[2]" />
        </div>
      )
    },
    {
      title: "Lifetime Support",
      subtitle: "We're With You Always",
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#f6fbe8] border border-[#ebf5d2]/80 flex items-center justify-center text-[#6CB327] shrink-0 shadow-sm hover:scale-105 hover:bg-[#ebf5d2]/50 transition-all duration-300">
          <HeartHandshake className="w-6 h-6 stroke-[2]" />
        </div>
      )
    }
  ];

  return (
    <section className="py-6 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 rounded-sm">
        <div className="bg-[#f5faeb]/80 border border-[#ebf5d2]/50 rounded-sm shadow-[0_4px_20px_rgba(108,179,39,0.03)] py-5 px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y sm:divide-y-0 md:divide-x divide-[#ebf5d2]/60 items-center">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className={`flex gap-4 items-center text-left py-3 sm:py-2 ${idx === 0 ? "" : "sm:pt-2 md:pt-0 md:pl-6 lg:pl-10"
                  }`}
              >
                {pillar.icon}
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5 leading-snug">
                    {pillar.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
