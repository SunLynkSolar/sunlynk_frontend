"use client";

import React from "react";
import Image from "next/image";
import { Wrench, Shield, Zap, Headphones, CalendarCheck } from "lucide-react";

const pillars = [
  {
    Icon: Wrench,
    title: "Zero Repair Cost",
    subtitle: "Parts, labour, everything — covered. You never pay for repairs.",
    stat: "₹0",
    statLabel: "repair cost",
  },
  {
    Icon: Shield,
    title: "LynkShield Mounting",
    subtitle: "Our proprietary mounting structure engineered to withstand 25 years.",
    stat: "25yr",
    statLabel: "structure life",
  },
  {
    Icon: Zap,
    title: "Guaranteed Generation",
    subtitle: "Underperform? We pay ₹8 per unit short. Your savings are protected.",
    stat: "₹8",
    statLabel: "per unit paid",
  },
  {
    Icon: Headphones,
    title: "After Sales Service",
    subtitle: "Dedicated support from day one. One call — we handle everything.",
    stat: "5yr+",
    statLabel: "dedicated care",
  },
  {
    Icon: CalendarCheck,
    title: "5 Year Commitment",
    subtitle: "Not a one-time transaction. We stay with you for the entire journey.",
    stat: "1800+",
    statLabel: "days alongside you",
  },
];

export default function TrustBar() {
  return (
    <section className="relative overflow-hidden" id="trust-bar">

      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgrounds/slider-2-1.webp"
          alt="Solar installation background"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay — keeps text legible while letting image breathe */}
        <div className="absolute inset-0" style={{ background: 'rgba(10,20,14,0.85)' }} />
        {/* Subtle green tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(46,204,113,0.08) 0%, transparent 50%, rgba(46,204,113,0.05) 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-0.5 w-8 bg-primary" />
              <span className="text-primary text-[11px] font-black uppercase tracking-[0.2em]">
                Our Promise
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              The SunLynk<br className="hidden sm:block" />
              <span className="text-primary"> Guarantee</span>
            </h2>
          </div>
          <p className="text-white text-sm leading-relaxed max-w-sm">
            Every installation backed by our 5-year commitment — zero repair costs, guaranteed generation, and dedicated after-sales care.
          </p>
        </div>

        {/* ── Featured 3 Circular Badges ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-12">
          {[
            {
              label: "Zero Repair\n& Replacement",
              svg: (
                <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                  {/* Solar panel */}
                  <rect x="4" y="12" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  <line x1="4" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="2" />
                  <line x1="4" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="2" />
                  <line x1="16" y1="12" x2="16" y2="36" stroke="currentColor" strokeWidth="2" />
                  <line x1="28" y1="12" x2="28" y2="36" stroke="currentColor" strokeWidth="2" />
                  <line x1="22" y1="36" x2="22" y2="44" stroke="currentColor" strokeWidth="2.5" />
                  <line x1="14" y1="44" x2="30" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Wrench circle */}
                  <circle cx="44" cy="16" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  <path d="M44 10.5v2M44 19.5v2M38.5 16h2M47.5 16h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="44" cy="16" r="3" fill="currentColor" />
                </svg>
              ),
            },
            {
              label: "LynkShield\nMounting Structure",
              svg: (
                <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                  {/* Shield */}
                  <path d="M28 4L8 14v14c0 11 9 20 20 24 11-4 20-13 20-24V14L28 4z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
                  {/* Solar panel inside shield */}
                  <rect x="17" y="19" width="22" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                  <line x1="17" y1="26" x2="39" y2="26" stroke="currentColor" strokeWidth="1.8" />
                  <line x1="28" y1="19" x2="28" y2="33" stroke="currentColor" strokeWidth="1.8" />
                  <line x1="28" y1="33" x2="28" y2="39" stroke="currentColor" strokeWidth="2" />
                  <line x1="22" y1="39" x2="34" y2="39" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              label: "After Sales\nService",
              svg: (
                <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                  {/* Solar panel */}
                  <rect x="4" y="10" width="28" height="20" rx="2.5" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  <line x1="4" y1="19" x2="32" y2="19" stroke="currentColor" strokeWidth="2" />
                  <line x1="18" y1="10" x2="18" y2="30" stroke="currentColor" strokeWidth="2" />
                  <line x1="18" y1="30" x2="18" y2="36" stroke="currentColor" strokeWidth="2" />
                  <line x1="11" y1="36" x2="25" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  {/* Headset arc */}
                  <path d="M38 26c0-6.6-5.4-12-12-12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="34" y="26" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  <path d="M40 31c3 0 4-1.5 4-4v-4c0-9-7-16-16-16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="46" cy="42" r="4.5" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  <path d="M44.5 42l1.2 1.2L49 39.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <div key={i} className="group flex flex-col items-center gap-3 cursor-default">
              {/* Outer ring */}
              <div
                className="relative rounded-full p-[3px] transition-all duration-300 group-hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(46,204,113,0.6) 0%, rgba(46,204,113,0.15) 50%, rgba(46,204,113,0.5) 100%)",
                  boxShadow: "0 0 28px rgba(46,204,113,0.25), 0 0 0 1px rgba(46,204,113,0.12)",
                }}
              >
                {/* Inner dark circle */}
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-primary"
                  style={{
                    background: "radial-gradient(circle at 40% 40%, rgba(46,204,113,0.18) 0%, rgba(10,20,14,0.95) 70%)",
                  }}
                >
                  {item.svg}
                </div>
                {/* Glow pulse on hover */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none"
                  style={{ background: "rgba(46,204,113,0.2)" }}
                />
              </div>
              {/* Label */}
              <p className="text-white text-[12px] font-bold text-center leading-snug whitespace-pre-line">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Pillar Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pillars.map((pillar, idx) => {
            const { Icon, title, subtitle, stat, statLabel } = pillar;
            return (
              <div
                key={idx}
                className="group relative flex flex-col gap-5 p-6 rounded-2xl cursor-default overflow-hidden transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
              >
                {/* Top green accent line — reveals on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ background: "linear-gradient(90deg, transparent, #2ecc71, transparent)" }}
                />

                {/* Corner step number */}
                <span
                  className="absolute top-4 right-4 text-[11px] font-black tabular-nums leading-none"
                  style={{ color: "rgba(46,204,113,0.25)" }}
                >
                  0{idx + 1}
                </span>

                {/* Icon */}
                <div className="relative w-fit">
                  {/* Glow behind icon — shows on hover */}
                  <div
                    className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: "#2ecc71" }}
                  />
                  <div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center text-primary transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, rgba(46,204,113,0.18) 0%, rgba(46,204,113,0.08) 100%)",
                      border: "1px solid rgba(46,204,113,0.25)",
                    }}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Stat */}
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="text-2xl font-black leading-none"
                    style={{
                      background: "linear-gradient(135deg, #2ecc71 0%, #5eeaa0 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                    {statLabel}
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <h4 className="text-white font-black text-[14px] leading-snug">
                    {title}
                  </h4>
                  <p className="text-white/40 text-[12px] leading-relaxed">
                    {subtitle}
                  </p>
                </div>

                {/* Bottom hover shimmer fill */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(145deg, rgba(46,204,113,0.05) 0%, rgba(46,204,113,0.02) 100%)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
