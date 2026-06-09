"use client";

import React from "react";

export default function TrustBar() {
  const pillars = [
    {
      title: "Zero Upfront Payment",
      subtitle: "Easy EMI Available",
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-11 h-11 text-emerald-500 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9a3 3 0 0 0-3-3h-1.2c-.3-1.7-1.7-3-3.5-3s-3.2 1.3-3.5 3H6.6a3 3 0 0 0-3 3c0 1.2.7 2.2 1.7 2.7l.7 5.3C6.3 21 7.2 22 8.5 22h7c1.3 0 2.2-1 2.5-2.0l.7-5.3c1-.5 1.7-1.5 1.7-2.7z" />
          </svg>
          <span className="absolute text-white font-black text-[13px] select-none translate-y-0.5">₹</span>
        </div>
      )
    },
    {
      title: "Govt. Subsidy Support",
      subtitle: "Up to ₹78,000",
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-11 h-11 text-emerald-500 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l2.4 1.7L17 3l.8 2.8 2.8.8-.3 2.9 1.7 2.4-1.7 2.4.3 2.9-2.8.8-.8 2.8-2.6-.7L12 22l-2.4-1.7-2.6.7-.8-2.8-2.8-.8.3-2.9-1.7-2.4 1.7-2.4-.3-2.9 2.8-.8.8-2.8 2.6.7L12 2z" />
          </svg>
          <svg viewBox="0 0 24 24" className="absolute w-5 h-5 text-white stroke-[4.5]" fill="none" stroke="currentColor">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )
    },
    {
      title: "Hassle-Free Installation",
      subtitle: "In Just 7-15 Days",
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center shrink-0 text-emerald-500">
          {/* Custom Crossed Tools SVG */}
          <svg viewBox="0 0 24 24" className="w-11 h-11 fill-none stroke-[2.2]" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            {/* Screwdriver */}
            <line x1="5" y1="19" x2="19" y2="5" />
            <path d="M19 5l-2.5 2.5m-3.5 1L19 4M4.5 16.5L6 18" />
            {/* Wrench */}
            <path d="M15.5 8.5L8 16" />
            <path d="M7.5 14.5l-2.3 2.3c-.6.6-.6 1.6 0 2.2l.6.6c.6.6 1.6.6 2.2 0l2.3-2.3" />
            <path d="M14.5 7.5l2-2c.6-.6.4-1.6-.3-2.2l-.6-.6c-.6-.7-1.6-.9-2.2-.3l-2 2" />
          </svg>
        </div>
      )
    },
    {
      title: "Lifetime Support",
      subtitle: "We're With You Always",
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center shrink-0 text-emerald-500">
          <svg viewBox="0 0 24 24" className="w-11 h-11 fill-none stroke-[2.2]" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            {/* Small heart */}
            <path d="M12 11c.5-.8 1.2-1 1.8-.5a1.2 1.2 0 0 1 0 1.8L12 14l-1.8-1.7a1.2 1.2 0 0 1 0-1.8c.6-.5 1.3-.3 1.8.5z" fill="currentColor" className="stroke-none text-emerald-500" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <section className="py-6 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#f4faf6]/80 border border-emerald-100/50 rounded-sm shadow-[0_4px_20px_rgba(46,204,113,0.03)] py-5 px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y sm:divide-y-0 md:divide-x divide-emerald-100/60 items-center">
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
