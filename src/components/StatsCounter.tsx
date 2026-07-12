"use client";

import React, { useEffect, useState, useRef } from "react";
import { Home, Sun, IndianRupee, Shield, Map } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
  useComma?: boolean;
}

const StatCard: React.FC<StatItemProps> = ({ icon, target, prefix = "", suffix, label, useComma = false }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000; // 2 seconds animation
    const startTime = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * target);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, target]);

  const formatNumber = (num: number) => {
    if (!useComma) return num.toString();
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-start p-5 sm:p-8 bg-white border border-gray-300 rounded-2xl hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group overflow-hidden w-full"
    >
      {/* Icon with glowing brand background */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shadow-sm shrink-0 border border-primary/5">
        {icon}
      </div>

      <div className="flex flex-col items-start mt-4 sm:mt-6">
        <span className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 leading-tight tracking-tight select-none">
          {prefix}{formatNumber(count)}{suffix}
        </span>
        <span className="text-xs sm:text-sm font-semibold text-slate-505 text-slate-500 mt-1.5 sm:mt-2">
          {label}
        </span>
      </div>
    </div>
  );
};

export default function StatsCounter() {
  return (
    <section className="relative py-16 bg-white border-y border-slate-100 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Title matches screenshot */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-dark text-center mb-10 tracking-tight leading-tight">
          Powering Homes Across India
        </h2>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            icon={<Home size={22} />}
            target={40000}
            suffix="+"
            label="Homes Solarized"
            useComma={true}
          />
          <StatCard
            icon={<Sun size={22} />}
            target={150}
            suffix="+ MW"
            label="Power Installed"
          />
          <StatCard
            icon={<IndianRupee size={22} />}
            target={250}
            prefix="₹"
            suffix="+ Cr"
            label="Subsidy Delivered"
          />
          <StatCard
            icon={<Shield size={22} />}
            target={1}
            prefix="#"
            suffix=" Home Solar"
            label="On National Portal"
          />
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-slate-50 to-[#f6fbe8]/20 border border-gray-300 rounded-xl p-6 md:p-8 flex flex-col lg:flex-row justify-between items-center gap-6 mt-10 w-full shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 text-center sm:text-left">
            <div className="relative w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-primary/10">
              {/* <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-ping scale-75 opacity-75" /> */}
              <Map size={26} className="relative z-10" />
            </div>
            <div>
              <p className="text-base md:text-lg font-bold text-slate-800 leading-tight">
                Rapidly expanding across major cities
              </p>
              <p className="text-sm text-slate-505 text-slate-500 mt-1 font-medium leading-relaxed">
                We are actively solarizing 29+ cities across 9 states, scaling our operations daily to build a greener India.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="w-full lg:w-auto text-center bg-primary hover:bg-primary-hover text-white font-extrabold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-primary/15 hover:shadow-primary/25 hover:scale-[1.01] active:scale-95 shrink-0 text-sm tracking-wide cursor-pointer"
          >
            Unlock Your Solar Savings
          </a>
        </div>

      </div>
    </section>
  );
}
