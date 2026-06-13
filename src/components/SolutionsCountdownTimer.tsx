"use client";

import React, { useState, useEffect } from "react";

export default function SolutionsCountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2027-03-31T23:59:59").getTime();

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const placeholderTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const displayTime = mounted ? timeLeft : placeholderTime;

  return (
    <div className="w-full bg-[#051f1a] border-y border-emerald-900/30 py-3 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
      <div className="flex flex-col text-center sm:text-left">
        <span className="text-secondary font-black text-xs uppercase tracking-widest flex items-center gap-1.5 justify-center sm:justify-start">
          <span className="animate-pulse text-sm">⚡</span> Govt Solar Subsidy Alert
        </span>
        <span className="text-white/90 font-medium text-[11px] sm:text-xs mt-0.5">
          Secure your ₹1,08,000 subsidy benefits before March 31, 2027!
        </span>
      </div>

      <div className="flex items-center gap-3 font-mono text-sm sm:text-base text-white">
        <div className="flex items-baseline gap-0.5">
          <span className="text-secondary font-black text-base sm:text-lg">{displayTime.days}</span>
          <span className="text-[9px] text-white/50 uppercase font-bold ml-0.5">d</span>
        </div>
        <span className="text-white/30 font-bold">:</span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-secondary font-black text-base sm:text-lg">{displayTime.hours}</span>
          <span className="text-[9px] text-white/50 uppercase font-bold ml-0.5">h</span>
        </div>
        <span className="text-white/30 font-bold">:</span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-secondary font-black text-base sm:text-lg">{displayTime.minutes}</span>
          <span className="text-[9px] text-white/50 uppercase font-bold ml-0.5">m</span>
        </div>
        <span className="text-white/30 font-bold">:</span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-secondary font-black text-base sm:text-lg animate-pulse">{displayTime.seconds}</span>
          <span className="text-[9px] text-white/50 uppercase font-bold ml-0.5">s</span>
        </div>
      </div>
    </div>
  );
}
