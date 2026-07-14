"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Coins, CreditCard } from "lucide-react";
import ContactForm from "./ContactForm";

function useCountDown(target: number, from: number, duration = 2500) {
  const [value, setValue] = useState(from);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    let raf: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuad for a satisfying deceleration
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(from - (from - target) * eased);
      setValue(current);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, target, from, duration]);

  return { value, ref };
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const targetDate = new Date("2027-03-31T23:59:59").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
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
    <div className="w-full bg-[#033325] border-y border-emerald-900/30 py-3 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
      <div className="flex flex-col text-center sm:text-left">
        <span className="text-secondary font-black text-xs uppercase tracking-widest flex items-center gap-1.5 justify-center sm:justify-start">
          <span className="animate-pulse text-sm">⚡</span> Limited Time Subsidy Offer
        </span>
        <span className="text-white/90 font-medium text-[11px] sm:text-xs mt-0.5">
          Avail Govt Subsidy under PM Surya Ghar Yojana before March 31, 2027
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

export default function HeroV2() {
  const { value: billAmount, ref: billRef } = useCountDown(0, 5000, 5000);

  const formattedBill = billAmount.toLocaleString("en-IN");

  return (
    <section className="relative bg-slate-50 lg:bg-white overflow-hidden py-0 lg:py-14">
      {/* Desktop Background image */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <Image
          src="/new_assets/hero_banner.webp"
          alt="Solar background image"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle gradient overlay to soften the image on the left and keep text highly readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-white/15" />
      </div>

      <div className="max-w-7xl mx-auto px-0 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 items-stretch">

          {/* Left Column — Text Content + Mobile Banner Background */}
          <div className="relative flex flex-col justify-between text-left h-auto lg:h-[80vh] lg:h-auto pt-16 pb-0 lg:py-16 -mx-4 sm:-mx-6 md:-mx-8 lg:mx-0 lg:px-0 z-10">
            {/* Mobile Background image */}
            <div className="lg:hidden absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
              <Image
                src="/new_assets/home_hero_mobile_main.webp"
                alt="Solar background image"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 px-4 pt-12 pb-6 md:px-8 lg:px-0 lg:py-0 flex flex-col gap-5 lg:gap-6 max-w-xl mb-6 lg:mb-0 mt-auto">
              {/* Badge */}
              <div className="inline-flex self-start">
                <span className="text-white inline-flex items-center gap-2 rounded-full py-1.5 px-4 text-xs font-bold text-primary tracking-wide border border-primary/20 bg-black/20 backdrop-blur-sm lg:bg-transparent">
                  <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  25 Year Performance Warranty
                </span>
              </div>

              {/* Heading */}
              <div className="px-4">
                <h1 className="text-2xl lg:text-[38px] text-white font-black leading-[1.1] tracking-tight">
                  Guaranteed Solar Generation.
                  <span className="text-primary">
                    &nbsp; Or We Pay You Back.
                  </span>
                </h1>
              </div>

              {/* Subheading */}
              <p className="px-4 text-white text-base sm:text-base font-medium leading-relaxed -mt-2">
                Premium Rooftop Solar in Lucknow <span className="text-secondary font-extrabold">With 5 Year Guaranteed </span> Generation              </p>

              {/* Body */}
              <p className="px-4 text-white/80 text-sm leading-relaxed max-w-md hidden lg:block">
                SunLynk Solar helps homeowners, housing societies, and businesses install solar with subsidy support, EMI options, and our Lynk Sure generation guarantee.
              </p>

              {/* Trust mini */}


              {/* USPs Grid */}
              <div className="px-4 grid grid-cols-2 gap-3 mt-1">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-2 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:-translate-y-0.5 shadow-md">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[10px] lg:text-xs text-normal lg:font-bold text-white uppercase tracking-wider leading-tight">25-Yr Panel Warranty</h4>
                    <span className="text-[10px] text-gray-400 font-medium leading-none mt-0.5">Premium panels</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:-translate-y-0.5 shadow-md">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <Zap size={18} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[10px] lg:text-xs text-normal lg:font-bold text-white uppercase tracking-wider leading-tight">5-Yr Unit Protection</h4>
                    <span className="text-[10px] text-gray-400 font-medium leading-none mt-0.5">Output guarantee</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:-translate-y-0.5 shadow-md">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <Coins size={18} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[10px] lg:text-xs text-normal lg:font-bold text-white uppercase tracking-wider leading-tight">Govt. Subsidy Help</h4>
                    <span className="text-[10px] text-gray-400 font-medium leading-none mt-0.5">Complete registration</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:-translate-y-0.5 shadow-md">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <CreditCard size={18} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[10px] lg:text-xs text-normal lg:font-bold text-white uppercase tracking-wider leading-tight">EMI Options</h4>
                    <span className="text-[10px] text-gray-400 font-medium leading-none mt-0.5">Flexible financing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subsidy Countdown Timer Separator */}
            {/* <div className="relative z-10 w-full lg:hidden">
              <CountdownTimer />
            </div> */}


          </div>

          {/* Right — Contact Form Container */}
          <div id="quote-form" className="relative flex justify-center lg:justify-end z-10 scroll-mt-24 rounded-xl">
            <ContactForm hideTabs={true} />
          </div>
        </div>
      </div>
    </section>
  );
}


// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import ContactForm from "./ContactForm";

// function useCountDown(target: number, from: number, duration = 2500) {
//   const [value, setValue] = useState(from);
//   const [started, setStarted] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setStarted(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.5 }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!started) return;
//     const startTime = performance.now();
//     let raf: number;

//     const animate = (now: number) => {
//       const elapsed = now - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       // easeOutQuad for a satisfying deceleration
//       const eased = 1 - (1 - progress) * (1 - progress);
//       const current = Math.round(from - (from - target) * eased);
//       setValue(current);
//       if (progress < 1) raf = requestAnimationFrame(animate);
//     };

//     raf = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(raf);
//   }, [started, target, from, duration]);

//   return { value, ref };
// }

// export default function HeroV2() {
//   const { value: billAmount, ref: billRef } = useCountDown(0, 5000, 5000);
//   const formattedBill = billAmount.toLocaleString("en-IN");

//   const sectionRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const mouseRef = useRef({ x: -1000, y: -1000, active: false });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const section = sectionRef.current;
//     if (!canvas || !section) return;

//     // Photon particle drifting along sun rays
//     class Photon {
//       x: number = 0;
//       y: number = 0;
//       speed: number = 0;
//       radius: number = 0;
//       opacity: number = 0;
//       color: string = "";
//       angleOffset: number = 0;
//       pulseSpeed: number = 0;

//       constructor(w: number, h: number) {
//         this.reset(w, h, true);
//       }

//       reset(w: number, h: number, randomStart = false) {
//         const sunX = w * 0.88;
//         const sunY = h * 0.15;
//         if (randomStart) {
//           this.x = Math.random() * w;
//           this.y = Math.random() * h;
//         } else {
//           this.x = sunX + (Math.random() - 0.5) * 80;
//           this.y = sunY + (Math.random() - 0.5) * 80;
//         }
//         this.speed = 0.6 + Math.random() * 1.4;
//         this.radius = 0.8 + Math.random() * 1.6;
//         this.opacity = 0.08 + Math.random() * 0.35;
//         this.angleOffset = Math.random() * Math.PI * 2;
//         this.pulseSpeed = 0.01 + Math.random() * 0.02;
//         this.color = Math.random() > 0.45 ? "rgba(46, 204, 113, 1)" : "rgba(252, 163, 17, 1)";
//       }

//       update(w: number, h: number, mouse: { x: number; y: number; active: boolean }, time: number) {
//         if (mouse.active) {
//           const dx = mouse.x - this.x;
//           const dy = mouse.y - this.y;
//           const d = Math.hypot(dx, dy);
//           if (d < 160) {
//             const pull = (1 - d / 160) * 0.4;
//             this.x += (dx / d) * pull;
//             this.y += (dy / d) * pull;
//           }
//         }

//         const driftAngle = Math.PI * 0.78 + Math.sin(time + this.angleOffset) * 0.05;
//         this.x += Math.cos(driftAngle) * this.speed;
//         this.y += Math.sin(driftAngle) * this.speed;

//         if (this.x < -20 || this.y > h + 20 || this.x > w + 20 || this.y < -20) {
//           this.reset(w, h, false);
//         }

//         this.opacity += Math.sin(time * this.pulseSpeed * 100) * 0.005;
//         this.opacity = Math.max(0.05, Math.min(0.5, this.opacity));
//       }

//       draw(ctx: CanvasRenderingContext2D) {
//         ctx.fillStyle = this.color.replace("1)", this.opacity.toFixed(3));
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     }

//     // Energy pulse traveling along perspective grid lines
//     class EnergyPulse {
//       radialIndex: number;
//       progress: number;
//       speed: number;
//       size: number;

//       constructor(radialCount: number) {
//         this.radialIndex = Math.floor(Math.random() * radialCount);
//         this.progress = Math.random();
//         this.speed = 0.0015 + Math.random() * 0.0025;
//         this.size = 2 + Math.random() * 3;
//       }

//       update(radialCount: number) {
//         this.progress += this.speed;
//         if (this.progress > 1) {
//           this.progress = 0;
//           this.radialIndex = Math.floor(Math.random() * radialCount);
//           this.speed = 0.0015 + Math.random() * 0.0025;
//         }
//       }

//       draw(ctx: CanvasRenderingContext2D, radialLines: Array<{ x1: number; y1: number; x2: number; y2: number }>) {
//         const line = radialLines[this.radialIndex];
//         if (!line) return;

//         const dx = line.x2 - line.x1;
//         const dy = line.y2 - line.y1;
//         const pT = Math.pow(this.progress, 2.2);
//         const x = line.x1 + pT * dx;
//         const y = line.y1 + pT * dy;

//         const opacity = Math.sin(this.progress * Math.PI) * 0.6;
//         const pulseGrad = ctx.createRadialGradient(x, y, 0, x, y, this.size * 3.5);
//         pulseGrad.addColorStop(0, `rgba(46, 204, 113, ${opacity})`);
//         pulseGrad.addColorStop(0.3, `rgba(46, 204, 113, ${opacity * 0.3})`);
//         pulseGrad.addColorStop(1, "rgba(46, 204, 113, 0)");

//         ctx.fillStyle = pulseGrad;
//         ctx.beginPath();
//         ctx.arc(x, y, this.size * 3.5, 0, Math.PI * 2);
//         ctx.fill();

//         ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.95})`;
//         ctx.beginPath();
//         ctx.arc(x, y, this.size * 0.6, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     }

//     // Handle high DPI resizing
//     const handleResize = () => {
//       const dpr = window.devicePixelRatio || 1;
//       canvas.width = section.clientWidth * dpr;
//       canvas.height = section.clientHeight * dpr;
//       canvas.style.width = `${section.clientWidth}px`;
//       canvas.style.height = `${section.clientHeight}px`;

//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.setTransform(1, 0, 0, 1, 0, 0); // clear any previous scaling
//         ctx.scale(dpr, dpr);
//       }
//     };

//     const handleMouseMove = (e: MouseEvent) => {
//       const rect = section.getBoundingClientRect();
//       mouseRef.current = {
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top,
//         active: true,
//       };
//     };

//     const handleMouseLeave = () => {
//       mouseRef.current.active = false;
//     };

//     window.addEventListener("resize", handleResize);
//     section.addEventListener("mousemove", handleMouseMove);
//     section.addEventListener("mouseleave", handleMouseLeave);

//     handleResize();

//     const wInit = canvas.width / (window.devicePixelRatio || 1);
//     const hInit = canvas.height / (window.devicePixelRatio || 1);

//     // Initialize particles and energy pulses
//     const particles: Photon[] = [];
//     const numParticles = 35;
//     for (let i = 0; i < numParticles; i++) {
//       particles.push(new Photon(wInit, hInit));
//     }

//     const numRadialLines = 20;
//     const pulses: EnergyPulse[] = [];
//     const numPulses = 12;
//     for (let i = 0; i < numPulses; i++) {
//       pulses.push(new EnergyPulse(numRadialLines));
//     }

//     let animationFrameId: number;
//     let time = 0;

//     const render = () => {
//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;

//       const dpr = window.devicePixelRatio || 1;
//       const w = canvas.width / dpr;
//       const h = canvas.height / dpr;

//       ctx.clearRect(0, 0, w, h);
//       time += 0.005;

//       const mouse = mouseRef.current;

//       // 1. Draw Perspective Solar Grid
//       const vpX = w * 0.35; // Vanishing point behind text
//       const vpY = h * 0.12;

//       const radialLines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];

//       for (let i = 0; i <= numRadialLines; i++) {
//         const progress = i / numRadialLines;
//         const angle = -Math.PI * 0.05 + progress * Math.PI * 1.1;
//         const length = Math.max(w, h) * 1.5;
//         const x2 = vpX + Math.cos(angle) * length;
//         const y2 = vpY + Math.sin(angle) * length;

//         radialLines.push({ x1: vpX, y1: vpY, x2, y2 });

//         const grad = ctx.createLinearGradient(vpX, vpY, x2, y2);
//         grad.addColorStop(0, "rgba(46, 204, 113, 0)");
//         grad.addColorStop(0.2, "rgba(46, 204, 113, 0.015)");
//         grad.addColorStop(0.8, "rgba(46, 204, 113, 0.1)");
//         grad.addColorStop(1, "rgba(46, 204, 113, 0.03)");

//         ctx.strokeStyle = grad;
//         ctx.lineWidth = 1;
//         ctx.beginPath();
//         ctx.moveTo(vpX, vpY);
//         ctx.lineTo(x2, y2);
//         ctx.stroke();
//       }

//       // Horizontal perspective dividers
//       const numHorizontalLines = 12;
//       const horizontalY: number[] = [];
//       for (let i = 0; i <= numHorizontalLines; i++) {
//         const t = i / numHorizontalLines;
//         const y = vpY + (h - vpY) * Math.pow(t, 2.2);
//         horizontalY.push(y);

//         ctx.beginPath();
//         ctx.moveTo(0, y);
//         ctx.lineTo(w, y);

//         const opacity = t * 0.1;
//         ctx.strokeStyle = `rgba(46, 204, 113, ${opacity})`;
//         ctx.stroke();
//       }

//       // Render grid cells (representing individual solar panels)
//       ctx.lineWidth = 0.5;
//       for (let i = 0; i < radialLines.length - 1; i++) {
//         const line1 = radialLines[i];
//         const line2 = radialLines[i + 1];

//         for (let j = 4; j < horizontalY.length - 1; j++) {
//           const y1 = horizontalY[j];
//           const y2 = horizontalY[j + 1];

//           const intersectPoint = (line: typeof line1, targetY: number) => {
//             const dx = line.x2 - line.x1;
//             const dy = line.y2 - line.y1;
//             if (Math.abs(dy) < 0.001) return { x: line.x1, y: targetY };
//             const t = (targetY - line.y1) / dy;
//             return { x: line.x1 + t * dx, y: targetY };
//           };

//           const p1 = intersectPoint(line1, y1);
//           const p2 = intersectPoint(line2, y1);
//           const p3 = intersectPoint(line2, y2);
//           const p4 = intersectPoint(line1, y2);

//           const cellCenterX = (p1.x + p2.x + p3.x + p4.x) / 4;
//           const cellCenterY = (y1 + y2) / 2;
//           const distToMouse = mouse.active ? Math.hypot(mouse.x - cellCenterX, mouse.y - cellCenterY) : 9999;

//           if (distToMouse < 140) {
//             // Interactive illumination of grid panels
//             const activeIntensity = (1 - distToMouse / 140) * 0.15;
//             ctx.fillStyle = `rgba(46, 204, 113, ${activeIntensity})`;
//             ctx.beginPath();
//             ctx.moveTo(p1.x, p1.y);
//             ctx.lineTo(p2.x, p2.y);
//             ctx.lineTo(p3.x, p3.y);
//             ctx.lineTo(p4.x, p4.y);
//             ctx.closePath();
//             ctx.fill();

//             ctx.strokeStyle = `rgba(46, 204, 113, ${activeIntensity * 2.5})`;
//             ctx.stroke();

//             // Photovoltaic grid subdivisions within hovered panels
//             ctx.strokeStyle = `rgba(255, 255, 255, ${activeIntensity * 0.4})`;
//             ctx.beginPath();
//             ctx.moveTo((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
//             ctx.lineTo((p4.x + p3.x) / 2, (p4.y + p3.y) / 2);
//             ctx.stroke();
//           } else {
//             ctx.strokeStyle = "rgba(46, 204, 113, 0.02)";
//             ctx.beginPath();
//             ctx.moveTo(p1.x, p1.y);
//             ctx.lineTo(p2.x, p2.y);
//             ctx.stroke();
//           }
//         }
//       }

//       // Draw automated running currents (energy pulses)
//       pulses.forEach((pulse) => {
//         pulse.update(numRadialLines);
//         pulse.draw(ctx, radialLines);
//       });

//       // 2. Volumetric Sun Rays (Radiating from Top Right)
//       const sunX = w * 0.88;
//       const sunY = h * 0.15;

//       // Draw Sun Core
//       const sunCore = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 130);
//       sunCore.addColorStop(0, "rgba(252, 163, 17, 0.15)");
//       sunCore.addColorStop(0.4, "rgba(252, 163, 17, 0.04)");
//       sunCore.addColorStop(1, "rgba(252, 163, 17, 0)");
//       ctx.fillStyle = sunCore;
//       ctx.beginPath();
//       ctx.arc(sunX, sunY, 130, 0, Math.PI * 2);
//       ctx.fill();

//       // Volumetric Rays
//       const numRays = 8;
//       ctx.globalCompositeOperation = "screen";

//       for (let i = 0; i < numRays; i++) {
//         const offset = Math.sin(time * 0.8 + i * 1.5) * 0.02;
//         let baseAngle = Math.PI * 0.76 + (i - (numRays - 1) / 2) * 0.05;

//         if (mouse.active) {
//           const angleToMouse = Math.atan2(mouse.y - sunY, mouse.x - sunX);
//           baseAngle = baseAngle * 0.75 + angleToMouse * 0.25;
//         }

//         const angle = baseAngle + offset;
//         const len = Math.max(w, h) * 1.4;
//         const spread = 0.035;

//         const p1x = sunX;
//         const p1y = sunY;
//         const p2x = sunX + Math.cos(angle - spread) * len;
//         const p2y = sunY + Math.sin(angle - spread) * len;
//         const p3x = sunX + Math.cos(angle + spread) * len;
//         const p3y = sunY + Math.sin(angle + spread) * len;

//         const rayGrad = ctx.createRadialGradient(sunX, sunY, 20, sunX, sunY, len * 0.7);
//         rayGrad.addColorStop(0, "rgba(252, 163, 17, 0.05)");
//         rayGrad.addColorStop(0.3, "rgba(252, 163, 17, 0.02)");
//         rayGrad.addColorStop(1, "rgba(252, 163, 17, 0)");

//         ctx.fillStyle = rayGrad;
//         ctx.beginPath();
//         ctx.moveTo(p1x, p1y);
//         ctx.lineTo(p2x, p2y);
//         ctx.lineTo(p3x, p3y);
//         ctx.closePath();
//         ctx.fill();
//       }
//       ctx.globalCompositeOperation = "source-over";

//       // Lens flare camera optics rendering
//       if (mouse.active) {
//         const dx = mouse.x - sunX;
//         const dy = mouse.y - sunY;
//         const dist = Math.hypot(dx, dy);

//         // Flare configurations (distance factors, radius, color)
//         const flares = [
//           { factor: 0.25, r: 28, color: "rgba(252, 163, 17, 0.03)" },
//           { factor: 0.55, r: 45, color: "rgba(46, 204, 113, 0.02)" },
//           { factor: 0.8, r: 12, color: "rgba(252, 163, 17, 0.04)" },
//         ];

//         flares.forEach((f) => {
//           const fx = sunX + dx * f.factor;
//           const fy = sunY + dy * f.factor;
//           const flareGrad = ctx.createRadialGradient(fx, fy, 0, fx, fy, f.r);
//           flareGrad.addColorStop(0, f.color);
//           flareGrad.addColorStop(0.8, f.color.replace("0.0", "0.005"));
//           flareGrad.addColorStop(1, "rgba(252, 163, 17, 0)");
//           ctx.fillStyle = flareGrad;
//           ctx.beginPath();
//           ctx.arc(fx, fy, f.r, 0, Math.PI * 2);
//           ctx.fill();
//         });
//       }

//       // 3. Draw and Update Particles (Photons)
//       particles.forEach((p) => {
//         p.update(w, h, mouse, time);
//         p.draw(ctx);
//       });

//       // 4. Draw Technical HUD around cursor
//       if (mouse.active) {
//         ctx.strokeStyle = "rgba(46, 204, 113, 0.25)";
//         ctx.lineWidth = 0.5;

//         // Crosshairs
//         ctx.beginPath();
//         ctx.moveTo(mouse.x - 20, mouse.y);
//         ctx.lineTo(mouse.x + 20, mouse.y);
//         ctx.moveTo(mouse.x, mouse.y - 20);
//         ctx.lineTo(mouse.x, mouse.y + 20);
//         ctx.stroke();

//         // Technical HUD Ring
//         ctx.beginPath();
//         ctx.arc(mouse.x, mouse.y, 12, 0, Math.PI * 2);
//         ctx.stroke();

//         ctx.beginPath();
//         ctx.setLineDash([2, 2]);
//         ctx.arc(mouse.x, mouse.y, 28, 0, Math.PI * 2);
//         ctx.stroke();
//         ctx.setLineDash([]);

//         // Bounding box L-brackets
//         const bs = 38; // bounding size
//         const bl = 6;  // line length

//         // Top-Left
//         ctx.beginPath();
//         ctx.moveTo(mouse.x - bs, mouse.y - bs + bl);
//         ctx.lineTo(mouse.x - bs, mouse.y - bs);
//         ctx.lineTo(mouse.x - bs + bl, mouse.y - bs);
//         ctx.stroke();

//         // Top-Right
//         ctx.beginPath();
//         ctx.moveTo(mouse.x + bs, mouse.y - bs + bl);
//         ctx.lineTo(mouse.x + bs, mouse.y - bs);
//         ctx.lineTo(mouse.x + bs - bl, mouse.y - bs);
//         ctx.stroke();

//         // Bottom-Left
//         ctx.beginPath();
//         ctx.moveTo(mouse.x - bs, mouse.y + bs - bl);
//         ctx.lineTo(mouse.x - bs, mouse.y + bs);
//         ctx.lineTo(mouse.x - bs + bl, mouse.y + bs);
//         ctx.stroke();

//         // Bottom-Right
//         ctx.beginPath();
//         ctx.moveTo(mouse.x + bs, mouse.y + bs - bl);
//         ctx.lineTo(mouse.x + bs, mouse.y + bs);
//         ctx.lineTo(mouse.x + bs - bl, mouse.y + bs);
//         ctx.stroke();

//         // Monospace coordinate typography
//         ctx.fillStyle = "rgba(46, 204, 113, 0.45)";
//         ctx.font = "8px monospace";
//         ctx.fillText(`SYS.COORD // X:${Math.round(mouse.x)} Y:${Math.round(mouse.y)}`, mouse.x + 44, mouse.y - 3);
//         ctx.fillText(`PWR.GRID  // ACTIVE_NODES`, mouse.x + 44, mouse.y + 7);
//       }

//       animationFrameId = requestAnimationFrame(render);
//     };

//     render();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       section.removeEventListener("mousemove", handleMouseMove);
//       section.removeEventListener("mouseleave", handleMouseLeave);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/30 overflow-hidden py-12 md:py-20"
//     >
//       {/* Interactive solar canvas background */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 pointer-events-none z-0 select-none"
//       />

//       <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

//           {/* Left — Text Content */}
//           <div className="flex flex-col gap-5 lg:gap-6 max-w-xl z-10">
//             {/* Badge */}
//             <div className="inline-flex self-start">
//               <span className="inline-flex items-center gap-2 bg-primary/10 rounded-full py-1.5 px-4 text-xs font-bold text-primary tracking-wide border border-primary/20">
//                 <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//                 5 Year Solar Commitment
//               </span>
//             </div>

//             {/* Heading */}
//             <div>
//               <h1 className="text-[2.75rem] sm:text-5xl md:text-[3.5rem] font-black text-dark leading-[1.1] tracking-tight">
//                 Say goodbye to
//               </h1>
//               <h2 className="text-[2.75rem] sm:text-5xl md:text-[3.5rem] font-black text-primary leading-[1.1] tracking-tight">
//                 electricity bills.
//               </h2>
//             </div>

//             {/* Subheading */}
//             <p className="text-base sm:text-lg text-gray-400 font-medium leading-relaxed -mt-2">
//               For the next <span className="text-secondary font-extrabold">25 years</span> — and beyond.*
//             </p>

//             {/* Body */}
//             <p className="text-sm text-gray-500 leading-relaxed max-w-md hidden lg:block">
//               SunLynk Solar brings you guaranteed solar generation with zero repair and zero replacement cost. We commit to your generation — and if we fall short, <span className="text-dark font-semibold">we pay you back.</span>
//             </p>

//             {/* CTAs */}
//             {/* <div className="flex flex-wrap items-center gap-4">
//               <a
//                 href="#quote-form"
//                 className="group bg-primary hover:bg-primary-hover text-white font-bold text-md py-3.5 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 flex items-center gap-2 cursor-pointer"
//               >
//                 <span>Get free quote</span>
//                 <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
//               </a>
//               <a
//                 href="#solar-process"
//                 className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors py-4 px-2 hidden lg:flex"
//               >
//                 <span className="w-10 h-10 rounded-full border-2 border-gray-200 group-hover:border-primary flex items-center justify-center transition-colors">
//                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//                   </svg>
//                 </span>
//                 <span>See how it works</span>
//               </a>
//             </div> */}

//             {/* Trust mini */}
//             <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
//               <div className="flex items-center gap-2">
//                 <div className="flex text-secondary">
//                   {[...Array(5)].map((_, i) => (
//                     <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                 </div>
//                 <span className="text-sm font-bold text-dark">4.9</span>
//               </div>
//               <span className="text-[13px] text-gray-400 font-medium">142+ Google Reviews</span>
//               <span className="text-[13px] text-gray-400 font-medium">• 10+ Years Experience</span>
//             </div>
//           </div>

//           {/* Right — Contact Form Container */}
//           <div id="quote-form" className="relative flex justify-center lg:justify-end z-10 scroll-mt-24">
//             <ContactForm />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
