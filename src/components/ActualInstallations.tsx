"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Zap,
  Info,
  Calendar
} from "lucide-react";

interface InstallationItem {
  id: number;
  src: string;
  title: string;
  // Commented information fields as requested
  /*
  capacity: string;
  type: string;
  location: string;
  panels: string;
  completionDate: string;
  */
}

const installations: InstallationItem[] = [
  { id: 1, src: "/new_assets/actual_installtion (1).jpeg", title: "Rooftop Solar View 1" },
  { id: 2, src: "/new_assets/actual_installtion (2).jpeg", title: "Rooftop Solar View 2" },
  { id: 3, src: "/new_assets/actual_installtion (3).jpeg", title: "Rooftop Solar View 3" },
  { id: 4, src: "/new_assets/actual_installtion (4).jpeg", title: "Rooftop Solar View 4" },
  { id: 5, src: "/new_assets/actual_installtion (5).jpeg", title: "Rooftop Solar View 5" },
  { id: 6, src: "/new_assets/actual_installtion (6).jpeg", title: "Rooftop Solar View 6" }
];

export default function ActualInstallations() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setSelectedIdx(index);
    document.body.style.overflow = "hidden"; // Prevent scrolling when lightbox is open
  };

  const handleCloseLightbox = useCallback(() => {
    setSelectedIdx(null);
    document.body.style.overflow = ""; // Re-enable scrolling
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIdx !== null) {
      setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : installations.length - 1));
    } else {
      setActiveIdx((prev) => (prev > 0 ? prev - 1 : installations.length - 1));
    }
  }, [selectedIdx]);

  const handleNext = useCallback(() => {
    if (selectedIdx !== null) {
      setSelectedIdx((prev) => (prev !== null && prev < installations.length - 1 ? prev + 1 : 0));
    } else {
      setActiveIdx((prev) => (prev < installations.length - 1 ? prev + 1 : 0));
    }
  }, [selectedIdx]);

  // Handle keyboard events for lightbox & main carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedIdx !== null) handleCloseLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIdx, handleCloseLightbox, handlePrev, handleNext]);

  // Cleanup body scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section className="py-20 bg-slate-50/50 border-t border-b border-gray-200/50 overflow-hidden" id="actual-installations">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2">
            <span className="h-[2px] w-6 bg-primary"></span>
            <span className="text-base uppercase tracking-wider font-bold text-primary">Project Showcase</span>
            <span className="h-[2px] w-6 bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight">
            Our Actual Installation
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed mt-1">
            Explore different angles of our premium residential solar installation, delivering high-efficiency clean energy and maximum savings.
          </p>
        </div>

        {/* Featured Layout: Main Viewer + Thumbnails (Better design to show complete images) */}
        <div className="max-w-5xl mx-auto bg-white border border-gray-200/80 rounded-xl p-4 md:p-6 shadow-sm flex flex-col gap-6">

          {/* Main Large Viewer Container */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900 border border-gray-150 group">
            {/* Display COMPLETE, UN-CROPPED image using object-contain */}
            <Image
              src={installations[activeIdx].src}
              alt={`Actual solar installation view ${activeIdx + 1}`}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1024px"
              className="object-contain transition-all duration-700 select-none"
            />

            {/* Subtle overlay gradients for controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />

            {/* Left Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-dark p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 active:scale-95 z-10"
              aria-label="Previous view"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-dark p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 active:scale-95 z-10"
              aria-label="Next view"
            >
              <ChevronRight size={20} />
            </button>

            {/* View Fullscreen Button */}
            <button
              onClick={() => handleOpenLightbox(activeIdx)}
              className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <Maximize2 size={14} />
              <span>Fullscreen</span>
            </button>

            {/* Image Counter Badge */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-semibold select-none">
              View {activeIdx + 1} of {installations.length}
            </div>
          </div>

          {/* Thumbnail strip for navigation */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
              Select perspective / view
            </h4>

            <div className="grid grid-cols-6 gap-2.5 sm:gap-4">
              {installations.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative h-[50px]  h-[50px] lg:h-[100px] overflow-hidden border-2 transition-all duration-300 outline-none ${idx === activeIdx
                    ? "border-primary ring-2 ring-primary/20 shadow-md scale-[1.03]"
                    : "border-gray-200 hover:border-gray-400 bg-slate-50"
                    }`}
                >
                  <Image
                    src={item.src}
                    alt={`Thumbnail view ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 15vw, 150px"
                    className="object-cover"
                  />
                  {/* Active highlight overlay */}
                  {idx !== activeIdx && (
                    <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Commented Out technical specs as requested */}
          {/* 
          <div className="p-5 flex flex-col gap-3 flex-grow border-t border-gray-100 mt-2">
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 font-semibold border-b border-gray-100 pb-3">
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="text-primary shrink-0" />
                <span>On-Grid System</span>
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <Calendar size={14} className="text-gray-400 shrink-0" />
                <span>May 2026</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold mt-1">
              <div className="flex items-center gap-1.5 text-gray-500">
                <MapPin size={14} className="text-primary shrink-0" />
                <span className="text-gray-700">Lucknow, Uttar Pradesh</span>
              </div>
              <span className="text-[10px] text-gray-400 font-medium">
                Mono PERC Half-Cut
              </span>
            </div>
          </div>
          */}

        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300">

          {/* Close button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-55 shadow-md active:scale-95"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Left Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3.5 rounded-full transition-all z-55 shadow-md active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Image Container */}
          <div className="max-w-5xl w-full max-h-[85vh] px-4 flex flex-col justify-center items-center gap-4">
            <div className="relative w-full aspect-[4/3] md:aspect-[3/2] max-h-[75vh] rounded-xl overflow-hidden shadow-2xl">
              {/* Show COMPLETE, UN-CROPPED image inside lightbox */}
              <Image
                src={installations[selectedIdx].src}
                alt={`Full view ${selectedIdx + 1}`}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Commented Out Lightbox Details Overlay as requested */}
            {/* 
            <div className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-5 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                  10kW System
                </span>
                <h4 className="font-extrabold text-xl mt-1.5">
                  Residential Installation
                </h4>
                <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1 font-medium">
                  <MapPin size={12} className="text-primary" />
                  Lucknow, Uttar Pradesh
                </p>
              </div>

              <div className="flex flex-col gap-1 items-start sm:items-end text-xs text-gray-300 font-semibold shrink-0">
                <span className="bg-white/10 px-3 py-1 rounded-lg text-white">
                  Mono PERC Panels
                </span>
                <span className="text-[10px] text-gray-400 font-normal mt-0.5">
                  Completed: May 2026
                </span>
              </div>
            </div>
            */}

            {/* Minimalist image indicator at bottom of lightbox */}
            <div className="text-white/60 text-xs font-semibold select-none bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
              View {selectedIdx + 1} of {installations.length}
            </div>
          </div>

          {/* Right Navigation */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3.5 rounded-full transition-all z-55 shadow-md active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
