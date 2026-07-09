"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Play, Maximize2, X, Star } from "lucide-react";
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
  <div className="flex gap-0.5 text-[#fca311]">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="fill-current text-[#fca311]" style={{ width: `${size * 4}px`, height: `${size * 4}px` }} />
    ))}
  </div>
);

interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface Review {
  initials: string;
  name: string;
  location: string;
  projectSize?: string;
  time: string;
  text: string;
  avatarBg: string;
  avatarText: string;
  media: MediaItem[];
}

const reviews: Review[] = [
  {
    initials: "FF",
    name: "Franky lawrance",
    location: "Shanti Nagar, Tedhi Puliya, Lucknow",
    projectSize: "3KW Plant",
    time: "1 month ago • Verified Owner",
    text: "The entire process was smooth and transparent. The SunLynk Solar team guided me from site inspection to subsidy documentation and installation and even Meter installation was done very timely, proactively. I am happy with my 3KW Plant installation.",
    avatarBg: "bg-emerald-100 dark:bg-emerald-950/40",
    avatarText: "text-emerald-600 dark:text-emerald-400",
    media: [
      { type: "video", url: "/review/franky/VIDEO-2026-06-19-18-54-36.mp4" },
      { type: "image", url: "/review/franky/WhatsApp Image 2026-06-20 at 09.09.33.jpeg" },
      { type: "image", url: "/review/franky/WhatsApp Image 2026-06-20 at 09.09.33 (1).jpeg" },
      { type: "image", url: "/review/franky/WhatsApp Image 2026-06-20 at 09.09.36.jpeg" },
      { type: "image", url: "/review/franky/WhatsApp Image 2026-06-20 at 09.09.37.jpeg" },
      { type: "image", url: "/review/franky/WhatsApp Image 2026-06-20 at 09.09.37 (1).jpeg" },
    ],
  },
  {
    initials: "AM",
    name: "Mr. Ajit Kumar Mishra",
    location: "Ratan Khand, TeliBagh, Lucknow",
    projectSize: "5KW Plant",
    time: "2 weeks ago • Verified Owner",
    text: "Project Size 5KW - What impressed us most was the quality of the structure and workmanship. The team explained every detail before installation and delivered exactly what was promised. Highly professional and reliable. Definitely Recommended",
    avatarBg: "bg-blue-100 dark:bg-blue-950/40",
    avatarText: "text-blue-600 dark:text-blue-400",
    media: [
      { type: "video", url: "/review/ajit/VIDEO-2026-06-23-00-11-48.mp4" },
      { type: "image", url: "/review/ajit/WhatsApp Image 2026-06-22 at 17.54.41.jpeg" },
      { type: "image", url: "/review/ajit/WhatsApp Image 2026-06-22 at 17.54.41 (1).jpeg" },
      { type: "image", url: "/review/ajit/WhatsApp Image 2026-06-22 at 17.54.41 (2).jpeg" },
      { type: "image", url: "/review/ajit/WhatsApp Image 2026-06-22 at 17.54.42.jpeg" },
    ],
  },
  {
    initials: "VS",
    name: "Vijay Shankar",
    location: "Lucknow",
    projectSize: "3KW Plant",
    time: "3 weeks ago • Verified Owner",
    text: "Kaam time se ho gaya aur installation bhi saaf-suthra tha. Team ne poore process me accha support diya. Project - 3KW. Humne Kuch referal bhi diye hain SunLynk Solar ko.",
    avatarBg: "bg-amber-100 dark:bg-amber-950/40",
    avatarText: "text-amber-600 dark:text-amber-400",
    media: [
      { type: "image", url: "/new_assets/actual_installtion (1).jpeg" },
      { type: "image", url: "/new_assets/actual_installtion (2).jpeg" },
      { type: "image", url: "/new_assets/actual_installtion (4).jpeg" },
      { type: "image", url: "/new_assets/actual_installtion (5).jpeg" },
      { type: "image", url: "/new_assets/actual_installtion (6).jpeg" },
    ],
  },
  {
    initials: "SM",
    name: "Sunita Mishra",
    location: "Indira Nagar, Lucknow",
    projectSize: "3Kw Plant",
    time: "1 month ago • Verified Customer",
    text: "Best solar product supplier in Lucknow! They offered highly competitive pricing. Fast delivery, perfect condition, and seamless Modbus connectivity guidelines.",
    avatarBg: "bg-pink-100 dark:bg-pink-950/40",
    avatarText: "text-pink-600 dark:text-pink-400",
    media: [
      { type: "image", url: "/review/Sunita Mishra/sunita_review_1.webp" },
    ],
  },
];

interface ReviewCardProps {
  review: Review;
  reviewIdx: number;
  isDark?: boolean;
  onOpenLightbox: (reviewIndex: number, mediaIndex: number) => void;
}

function ReviewCard({ review, reviewIdx, isDark = false, onOpenLightbox }: ReviewCardProps) {
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const activeMedia = review.media[activeMediaIdx];

  // Find the first image in the media array to use as a video poster
  const videoPoster = review.media.find(m => m.type === "image")?.url || "";

  // Helper to get descriptive content count text
  const getMediaCountText = () => {
    const videos = review.media.filter(m => m.type === "video").length;
    const images = review.media.filter(m => m.type === "image").length;

    const parts = [];
    if (videos > 0) parts.push(`${videos} Video${videos > 1 ? "s" : ""}`);
    if (images > 0) parts.push(`${images} Photo${images > 1 ? "s" : ""}`);
    return parts.join(" • ");
  };

  return (
    <div className={`rounded-2xl p-6 shadow-sm transition-all duration-300 flex flex-col justify-between h-full group ${isDark
      ? "bg-[#071813]/90 border border-emerald-950/45 hover:border-emerald-500/35 hover:shadow-2xl hover:shadow-emerald-950/20"
      : "bg-white border border-gray-100 hover:border-primary/30 hover:shadow-md"
      }`}>
      <div className="flex flex-col flex-grow">
        {/* Rating Stars & Google badge */}
        <div className="flex justify-between items-center mb-4">
          <StarRating size={4} />
          <GoogleGLogoTiny />
        </div>

        {/* Testimonial Text with fixed height for visual symmetry */}
        <div className="h-[120px] overflow-y-auto mb-5 scrollbar-none pr-1">
          <p className={`text-sm leading-relaxed font-medium ${isDark ? "text-slate-300" : "text-gray-600"}`}>
            &quot;{review.text}&quot;
          </p>
        </div>

        {/* Media Block */}
        {review.media.length > 0 && activeMedia && (
          <div className="mb-5">
            {/* Primary Media Display */}
            <div
              onClick={() => onOpenLightbox(reviewIdx, activeMediaIdx)}
              className={`relative w-full h-48 rounded-xl overflow-hidden group/media border cursor-zoom-in shrink-0 ${isDark ? "border-emerald-950/30" : "border-slate-100"
                }`}
            >
              {activeMedia.type === "video" ? (
                <div className="w-full h-full relative bg-black flex items-center justify-center">
                  {videoPoster ? (
                    <Image
                      src={videoPoster}
                      alt={`${review.name}'s video testimonial`}
                      fill
                      className="object-cover opacity-75 transition-transform duration-500 group-hover/media:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900" />
                  )}
                  {/* Pulsing Play Button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 hover:bg-black/45 transition-colors duration-300">
                    <span className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-500/90 text-white shadow-lg animate-pulse hover:scale-110 transition-transform duration-300">
                      <Play className="fill-current text-white translate-x-[2px]" size={20} />
                    </span>
                    <span className="text-[10px] text-white font-bold tracking-wider mt-2 uppercase drop-shadow-md">
                      Play Testimonial
                    </span>
                  </div>
                </div>
              ) : (
                <Image
                  src={activeMedia.url}
                  alt={`${review.name}'s solar installation`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover/media:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              )}

              {/* Zoom overlay indicator */}
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Maximize2 size={12} className="text-white" />
              </div>

              {/* Badge Overlay */}
              <div className="absolute bottom-2 left-2 bg-black/65 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-md tracking-wider">
                {activeMedia.type === "video" ? "Video Testimony" : "Actual Installation"}
              </div>

              {/* Counter Overlay */}
              {review.media.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-emerald-950/80 backdrop-blur-sm text-white text-[9px] font-semibold px-2 py-1 rounded-md">
                  {getMediaCountText()}
                </div>
              )}
            </div>

            {/* Thumbnail Navigation Row (Guarantees consistent height layout across all cards) */}
            {review.media.length > 1 ? (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-emerald-800 h-12">
                {review.media.slice(0, 5).map((item, idx) => {
                  const isActive = idx === activeMediaIdx;
                  const isLastIdx = idx === 4 && review.media.length > 5;

                  return (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMediaIdx(idx);
                      }}
                      className={`relative w-11 h-11 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${isActive
                        ? "border-emerald-500 scale-105 shadow-sm"
                        : isDark
                          ? "border-emerald-950 hover:border-emerald-800/60"
                          : "border-slate-100 hover:border-slate-300"
                        }`}
                    >
                      {item.type === "video" ? (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
                          {videoPoster ? (
                            <Image
                              src={videoPoster}
                              alt="Video poster thumbnail"
                              fill
                              className="object-cover opacity-60"
                              sizes="44px"
                            />
                          ) : null}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Play size={10} className="text-white fill-current" />
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={item.url}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      )}

                      {isLastIdx && (
                        <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-white text-[10px] font-bold">
                          +{review.media.length - 4}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="h-12 mt-3" />
            )}
          </div>
        )}
      </div>

      {/* User Details Block */}
      <div className={`flex items-center gap-3 border-t pt-4 ${isDark ? "border-emerald-950/40" : "border-gray-50"}`}>
        <div className={`w-10 h-10 ${review.avatarBg} ${review.avatarText} font-black rounded-full flex items-center justify-center shrink-0 shadow-inner`}>
          {review.initials}
        </div>
        <div>
          <span className={`block text-sm font-extrabold ${isDark ? "text-white" : "text-gray-800"}`}>
            {review.name}
          </span>
          <span className={`block text-[10px] font-medium leading-normal ${isDark ? "text-slate-400" : "text-gray-400"}`}>
            {review.location}
          </span>
          {review.projectSize && (
            <span className={`inline-block text-[9px] font-bold mt-0.5 px-1.5 py-0.5 rounded ${isDark ? "bg-emerald-950/40 text-emerald-400" : "bg-emerald-50 text-emerald-700"
              }`}>
              {review.projectSize}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface MediaLightboxProps {
  review: Review;
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectMedia: (index: number) => void;
}

function MediaLightbox({ review, activeIndex, onClose, onPrev, onNext, onSelectMedia }: MediaLightboxProps) {
  const activeMedia = review.media[activeIndex];
  const videoPoster = review.media.find(m => m.type === "image")?.url || "";

  // Lock body scroll on mount
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!activeMedia) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none p-4 md:p-6"
      onClick={onClose}
    >
      {/* Lightbox Header */}
      <div className="flex justify-between items-start w-full relative z-10" onClick={e => e.stopPropagation()}>
        <div className="text-left text-white max-w-[80%]">
          <span className="inline-block text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-2.5 py-1 rounded mb-1">
            Customer Testimonial
          </span>
          <h4 className="text-base sm:text-lg font-black">{review.name}</h4>
          <p className="text-xs text-slate-400">{review.location} • {review.projectSize}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          aria-label="Close Gallery"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Display Container */}
      <div className="relative flex-grow flex items-center justify-center my-4" onClick={e => e.stopPropagation()}>
        {/* Navigation Arrows */}
        {review.media.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-0 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-emerald-400 transition-all cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-0 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-emerald-400 transition-all cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Selected Media Viewer */}
        <div className="max-h-[60vh] max-w-full relative flex items-center justify-center">
          {activeMedia.type === "video" ? (
            <video
              src={activeMedia.url}
              controls
              autoPlay
              className="max-h-[60vh] max-w-[90vw] md:max-w-[70vw] rounded-xl shadow-2xl border border-white/15 object-contain"
            />
          ) : (
            <img
              src={activeMedia.url}
              alt="Installation view"
              className="max-h-[60vh] max-w-[85vw] md:max-w-[70vw] rounded-xl shadow-2xl border border-white/15 object-contain"
            />
          )}
        </div>
      </div>

      {/* Lightbox Footer */}
      <div className="w-full text-center relative z-10" onClick={e => e.stopPropagation()}>
        {/* Review Text */}
        <p className="text-slate-300 text-xs sm:text-sm italic max-w-2xl mx-auto line-clamp-2 px-4 mb-4">
          &quot;{review.text}&quot;
        </p>

        {/* Thumbnail bar */}
        {review.media.length > 1 && (
          <div className="flex justify-center gap-2 overflow-x-auto py-2 px-4 max-w-full">
            {review.media.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => onSelectMedia(idx)}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${isActive
                    ? "border-emerald-500 scale-105 shadow-md shadow-emerald-500/20"
                    : "border-white/10 hover:border-white/30"
                    }`}
                >
                  {item.type === "video" ? (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
                      {videoPoster ? (
                        <img src={videoPoster} alt="Video thumbnail preview" className="w-full h-full object-cover opacity-60" />
                      ) : null}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play size={10} className="text-white fill-current" />
                      </div>
                    </div>
                  ) : (
                    <img src={item.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        <div className="text-[10px] font-semibold text-slate-500 mt-1">
          {activeIndex + 1} of {review.media.length} items
        </div>
      </div>
    </div>
  );
}

export default function GoogleReviews({ isDark = false }: { isDark?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Lightbox State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    reviewIdx: number;
    mediaIdx: number;
  }>({
    isOpen: false,
    reviewIdx: 0,
    mediaIdx: 0,
  });

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
    const cardWidth = el.querySelector<HTMLElement>("[data-review-card]")?.offsetWidth || 340;
    el.scrollBy({ left: direction === "left" ? -cardWidth - 24 : cardWidth + 24, behavior: "smooth" });
  };

  // Lightbox Handlers
  const openLightbox = (reviewIndex: number, mediaIndex: number) => {
    setLightbox({
      isOpen: true,
      reviewIdx: reviewIndex,
      mediaIdx: mediaIndex,
    });
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  };

  const nextLightboxMedia = () => {
    setLightbox(prev => {
      const totalMedia = reviews[prev.reviewIdx].media.length;
      return {
        ...prev,
        mediaIdx: (prev.mediaIdx + 1) % totalMedia,
      };
    });
  };

  const prevLightboxMedia = () => {
    setLightbox(prev => {
      const totalMedia = reviews[prev.reviewIdx].media.length;
      return {
        ...prev,
        mediaIdx: (prev.mediaIdx - 1 + totalMedia) % totalMedia,
      };
    });
  };

  const selectLightboxMedia = (idx: number) => {
    setLightbox(prev => ({ ...prev, mediaIdx: idx }));
  };

  const activeReview = reviews[lightbox.reviewIdx];

  return (
    <section className={`py-20 border-t ${isDark ? "bg-[#020C09] border-white/[0.06]" : "bg-white border-gray-100"}`} id="google-reviews">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header Area */}
        <div className={`flex flex-col justify-between items-center gap-8 mb-16 border-b pb-12 text-center ${isDark ? "border-white/[0.06]" : "border-gray-100"
          }`}>
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className={`h-[2px] w-6 ${isDark ? "bg-emerald-500" : "bg-primary"}`}></span>
              <span className={`text-sm uppercase tracking-wider font-extrabold ${isDark ? "text-emerald-400" : "text-primary"}`}>
                Reviews
              </span>
              <span className={`h-[2px] w-6 ${isDark ? "bg-emerald-500" : "bg-primary"}`}></span>
            </div>

            <h2 className={`text-3xl md:text-5xl font-black leading-tight tracking-tight ${isDark ? "text-white" : "text-dark"
              }`}>
              Google Reviews & Customer Feedback
            </h2>

            <p className={`text-sm sm:text-base mt-3 leading-relaxed ${isDark ? "text-slate-300" : "text-gray-500"
              }`}>
              Discover what our partners, clients, and homeowners say about our engineering standards, premium modules, and solar subsidy support.
            </p>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows (visible on tablet+) */}
          <button
            onClick={() => scroll("left")}
            className={`absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200 hidden md:flex ${!canScrollLeft ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scroll("right")}
            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200 hidden md:flex ${!canScrollRight ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
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
                className="snap-start shrink-0 w-[300px] sm:w-[350px] lg:w-[calc(33.333%-16px)]"
              >
                <ReviewCard
                  review={review}
                  reviewIdx={idx}
                  isDark={isDark}
                  onOpenLightbox={openLightbox}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Global Lightbox Portal (using fixed div overlay in Client component) */}
        {lightbox.isOpen && activeReview && (
          <MediaLightbox
            review={activeReview}
            activeIndex={lightbox.mediaIdx}
            onClose={closeLightbox}
            onPrev={prevLightboxMedia}
            onNext={nextLightboxMedia}
            onSelectMedia={selectLightboxMedia}
          />
        )}

      </div>
    </section>
  );
}
