"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const GoogleGLogoSvg = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

const GoogleGLogoTiny = () => (
  <svg className="w-4 h-4 opacity-50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

const StarRating = ({ size = 4 }: { size?: number }) => (
  <div className="flex text-[#fca311]">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-${size} h-${size} fill-current`} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

interface Review {
  initials: string;
  name: string;
  time: string;
  text: string;
  avatarBg: string;
  avatarText: string;
  image?: string;
}

const reviews: Review[] = [
  {
    initials: "RS",
    name: "Rajesh Sharma",
    time: "1 month ago • Verified Partner",
    text: "Excellent experience with SunLynk Solar. The weather monitoring SCADA system they set up for our commercial PV rooftop has been flawless. Customer support is very prompt and technical expert advice was valuable.",
    avatarBg: "bg-primary/10",
    avatarText: "text-primary",
    image: "/assets/images/review/review1.jpeg",
  },
  {
    initials: "AP",
    name: "Amit Patel",
    time: "2 weeks ago • Verified Buyer",
    text: "Best solar product distributor in Delhi! They offered highly competitive pricing for bifacial N-type double glass modules. Fast delivery, perfect condition, and seamless Modbus connectivity guidelines.",
    avatarBg: "bg-secondary/10",
    avatarText: "text-secondary",
    image: "/assets/images/review/review2.jpeg",
  },
  {
    initials: "SK",
    name: "Sanjay Krishnan",
    time: "3 weeks ago • Homeowner",
    text: "Superb installation and paperwork support for solar subsidy. Highly professional team, they handled all the government approvals without me having to follow up even once. Excellent solar energy generation!",
    avatarBg: "bg-dark",
    avatarText: "text-white",
    image: "/new_assets/reviewimage.png",
  },
  {
    initials: "NV",
    name: "Neha Verma",
    time: "1 month ago • Homeowner",
    text: "Very pleased with the residential hybrid inverter and energy storage setup. It has been running for 6 months now without any issues, saving us 80% on bills! Highly recommend SunLynk Solar.",
    avatarBg: "bg-blue-100",
    avatarText: "text-blue-600",
    image: "/assets/images/review/review4.jpeg",
  },
];

function ReviewCard({ review, isDark = false }: { review: Review; isDark?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 shadow-sm transition-all duration-300 flex flex-col justify-between h-full ${isDark
      ? "bg-[#071813]/80 border border-emerald-950/45 hover:border-emerald-500/35 hover:shadow-2xl hover:shadow-emerald-950/20"
      : "bg-white border border-gray-100 hover:border-primary/30 hover:shadow-md"
      }`}>
      <div className="flex flex-col flex-grow">
        {/* Rating Stars & Google badge */}
        <div className="flex justify-between items-center mb-4">
          <StarRating size={4} />
          <GoogleGLogoTiny />
        </div>
        <p className={`text-sm leading-relaxed mb-4 flex-grow ${isDark ? "text-slate-300" : "text-gray-600"}`}>
          &quot;{review.text}&quot;
        </p>

        {review.image && (
          <div className={`relative w-full h-40 rounded-xl overflow-hidden mb-6 group/img border shrink-0 ${isDark ? "border-emerald-950/30" : "border-slate-100"
            }`}>
            <Image
              src={review.image}
              alt={`${review.name}'s solar installation`}
              fill
              className="object-cover transition-transform duration-500 group-hover/img:scale-105"
            />
            {/* Subtle overlay badge */}
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-1 rounded">
              Actual Installation
            </div>
          </div>
        )}
      </div>

      {/* User details */}
      <div className={`flex items-center gap-3 border-t pt-4 ${isDark ? "border-emerald-950/40" : "border-gray-50"}`}>
        <div className={`w-10 h-10 ${review.avatarBg} ${review.avatarText} font-bold rounded-full flex items-center justify-center shrink-0`}>
          {review.initials}
        </div>
        <div>
          <span className={`block text-sm font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{review.name}</span>
          <span className={`block text-[10px] ${isDark ? "text-slate-400" : "text-gray-400"}`}>{review.time}</span>
        </div>
      </div>
    </div>
  );
}

export default function GoogleReviews({ isDark = false }: { isDark?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>("[data-review-card]")?.offsetWidth || 300;
    el.scrollBy({ left: direction === "left" ? -cardWidth - 24 : cardWidth + 24, behavior: "smooth" });
  };

  return (
    <section className={`py-16 border-t ${isDark ? "bg-[#020C09] border-white/[0.06]" : "bg-white border-gray-100"
      }`} id="google-reviews">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header Area */}
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 border-b pb-10 ${isDark ? "border-white/[0.06]" : "border-gray-100"
          }`}>
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className={`h-[2px] w-6 ${isDark ? "bg-emerald-500" : "bg-primary"}`}></span>
              <span className={`text-base uppercase tracking-wider font-bold ${isDark ? "text-emerald-400" : "text-primary"}`}>Reviews</span>
              <span className={`h-[2px] w-6 ${isDark ? "bg-emerald-500" : "bg-primary"}`}></span>
            </div>
            <h2 className={`text-3xl md:text-5xl font-extrabold leading-tight tracking-tight ${isDark ? "text-white" : "text-dark"
              }`}>
              Google Reviews & Customer Feedback
            </h2>
            <p className={`text-sm sm:text-base mt-2 ${isDark ? "text-slate-300" : "text-gray-500"
              }`}>
              Discover what our partners, clients, and homeowners say about our engineering standards, premium modules, and solar subsidy support.
            </p>
          </div>

          {/* Google Aggregate Box */}
          <div className={`rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow duration-300 shrink-0 ${isDark ? "bg-[#071813]/60 border border-emerald-900/20" : "bg-slate-50 border border-slate-100"
            }`}>
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
              <GoogleGLogoSvg />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-800"}`}>4.9</span>
                <StarRating size={5} />
              </div>
              <p className={`text-xs font-bold mt-1 uppercase tracking-wide ${isDark ? "text-slate-400" : "text-gray-500"
                }`}>
                142 Reviews on Google
              </p>
            </div>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows (visible on tablet+) */}
          <button
            onClick={() => scroll("left")}
            className={`absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200 hidden md:flex ${!canScrollLeft ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200 hidden md:flex ${!canScrollRight ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 lg:mx-0 lg:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review, idx) => (
              <div
                key={idx}
                data-review-card
                className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[calc(25%-18px)]"
              >
                <ReviewCard review={review} isDark={isDark} />
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 pt-4 border-t ${isDark ? "border-emerald-950/40" : "border-gray-50"
          }`}>
          <span className={`text-sm ${isDark ? "text-slate-400" : "text-gray-500"}`}>Are you a satisfied customer?</span>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${isDark ? "text-emerald-400 hover:text-emerald-300" : "text-primary hover:text-primary-hover"
              }`}
          >
            <span>Write a Google Review</span>
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
