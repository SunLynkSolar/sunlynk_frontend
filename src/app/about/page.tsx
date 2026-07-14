"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sun,
  Play,
  ChevronDown,
  Check,
  Globe,
  ShieldCheck,
  Heart,
  Award,
  ArrowLeft,
  ArrowRight,
  Mail,
  Home,
  Users,
  Building2,
  Layers
} from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };




  const teamMembers = [
    {
      name: "Michael Johnson",
      role: "Founder & CEO",
      image: "/assets/images/team_michael.png",
    },
    {
      name: "Robert Williams",
      role: "Lead Technician",
      image: "/assets/images/team_robert.png",
    },
    {
      name: "Sarah Martinez",
      role: "Installation Supervisor",
      image: "/assets/images/team_sarah.png",
    },
    {
      name: "Maria Rodriguez",
      role: "Marketing Manager",
      image: "/assets/images/team_maria.png",
    },
    {
      name: "David Chen",
      role: "Senior Operations Director",
      image: "/assets/images/team_david.png",
    },
    {
      name: "Emily Taylor",
      role: "Renewable Project Coordinator",
      image: "/assets/images/team_emily.png",
    },
  ];

  return (
    <div className=" min-h-screen">
      {/* Page Header Banner */}
      <section className="px-4 md:px-8 pt-6 pb-2">
        <div className="max-w-7xl mx-auto relative rounded-2xl overflow-hidden py-24 md:py-32 bg-dark text-white flex items-center justify-center">
          {/* Background video & gradient overlay */}
          <div className="absolute inset-0 z-0">
            <video
              src="https://madebydesignesia.com/themes/solaria/video/1.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full absolute inset-0 object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-slate-950/20 to-dark/90" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center px-4">
            {/* Float Breadcrumb Pill */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs text-white/90 shadow-inner">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white font-medium">About Us</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-black tracking-tight text-white mt-2 drop-shadow-md">
              About Our Company
            </h1>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-1 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Image with organic curves and circular stamp */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px] aspect-[1] rounded-[3rem] rounded-tr-[120px] rounded-bl-[120px] overflow-hidden shadow-2xl border-4 border-emerald-500/10">
              <Image
                src="/new_assets/sunlynksolar truck.webp"
                alt="Clean energy engineers collaborating"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Curved rotating text stamp overlapping image edge */}
            <div className="absolute -top-8 right-10 w-36 h-36 animate-[spin_25s_linear_infinite] select-none pointer-events-none hidden md:block z-20 bg-white rounded-full p-1.5 shadow-xl border border-emerald-500/5">
              <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-800">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                <text className="text-[7px] font-extrabold uppercase tracking-[0.2em]" fill="currentColor">
                  <textPath href="#circlePath">
                    Sustainable Future • Clean Energy • Solar •
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* Right Column: Text content & tabs */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2"><span className="h-[2px] w-6 bg-primary"></span><span className="text-base uppercase tracking-wider font-bold text-primary">About Us</span><span className="h-[2px] w-6 bg-primary"></span></div>
              <h2 className="text-3xl md:text-4xl font-black text-dark leading-tight tracking-tight">
                A Future Where Every Rooftop Powers Progress
              </h2>
            </div>

            {/* Interactive Tabs */}
            <div className="border-b border-gray-100 pb-2">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab("mission")}
                  className={`pb-3 font-bold text-sm uppercase tracking-wider border-b-2 transition-all relative ${activeTab === "mission"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                >
                  Our Mission
                </button>
                <button
                  onClick={() => setActiveTab("vision")}
                  className={`pb-3 font-bold text-sm uppercase tracking-wider border-b-2 transition-all relative ${activeTab === "vision"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                >
                  Our Vision
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div className="min-h-[100px] text-sm text-gray-600 leading-relaxed flex flex-col gap-4 text-justify">
              {activeTab === "mission" ? (
                <>
                  <p>
                    To deliver innovative solar energy solutions that help customers save money, achieve energy independence, and contribute to a greener tomorrow.
                  </p>
                  <p>
                    Our mission is to make clean energy accessible to everyone while promoting sustainability and reducing carbon footprint.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    To power a brighter, cleaner, and more sustainable future by making solar energy accessible, reliable, and affordable for every home, business, and community.
                  </p>
                  <p>
                    At SunLynk Solar Energy, we envision a world where renewable energy is the primary source of power, reducing dependence on conventional fuels and creating a healthier planet for future generations.
                  </p>
                </>
              )}
            </div>

            {/* Stats Block */}
            <div className="grid grid-cols-2 gap-8 py-4 border-t border-b border-gray-100">
              <div>
                <span className="text-4xl md:text-5xl font-black text-dark block mb-1">
                  259<span className="text-primary">+</span>
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Solar Installation 2025
                </span>
              </div>
              <div>
                <span className="text-4xl md:text-5xl font-black text-dark block mb-1">
                  25<span className="text-primary">+</span>
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Year Experience
                </span>
              </div>
            </div>

            {/* Green Accent Checklist */}
            <div className="bg-emerald-50/50 border border-emerald-500/10 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <Check size={12} className="stroke-[3]" />
                </span>
                <span className="text-sm font-semibold text-emerald-800">Sustainability Impact</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <Check size={12} className="stroke-[3]" />
                </span>
                <span className="text-sm font-semibold text-emerald-800">Trusted Projects</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <Check size={12} className="stroke-[3]" />
                </span>
                <span className="text-sm font-semibold text-emerald-800">Affordable & Reliable</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <Check size={12} className="stroke-[3]" />
                </span>
                <span className="text-sm font-semibold text-emerald-800">Expert Team Members</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solar Energy Solutions Section */}
      <section className="py-20 bg-dark border-t border-b border-gray-900/50 relative overflow-hidden">
        {/* Background image & gradient overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/new_assets/hero banner.webp"
            alt="Solar panels background"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 via-teal-900/0 to-dark/10" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2"><span className="h-[2px] w-6 bg-primary"></span><span className="text-base uppercase tracking-wider font-bold text-primary">Our Solutions</span><span className="h-[2px] w-6 bg-primary"></span></div>

            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Our Solar Energy Solutions
            </h2>
            <p className="text-sm text-white/90 leading-relaxed max-w-2xl">
              We provide innovative and sustainable solar energy services from residential rooftops to large-scale commercial installations — designed to deliver clean, reliable, and cost-effective power for every need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Residential Solar Systems */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Home className="w-8 h-8 stroke-[1.75]" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                  Residential Rooftop Solar
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Save up to 90% on home electricity bills. Systems designed for maximum generation, backed by government subsidies, and installed hassle-free.
                </p>
              </div>
            </div>

            {/* Card 2: Housing Society Solar */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Users className="w-8 h-8 stroke-[1.75]" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                  Housing Society Solar
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Reduce common-area power costs for lifts, pumps, lighting, and EV charging with shared solar systems that cut maintenance bills significantly.
                </p>
              </div>
            </div>

            {/* Card 3: Commercial & Industrial Solar */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Building2 className="w-8 h-8 stroke-[1.75]" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                  Commercial & Industrial Solar
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Power your business with green energy. Engineered for high performance, quick ROI, and energy independence for factories and offices.
                </p>
              </div>
            </div>

            {/* Card 4: Solar PV Distribution */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Layers className="w-8 h-8 stroke-[1.75]" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                  Solar PV Distribution
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We distribute the most bankable technology and solar PV products to help developers and installers scale clean energy projects efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Leadership & Team Section */}
      {/* <section className="py-20 bg-white border-t border-gray-150 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 mb-12">
            <div className="lg:w-1/3 flex flex-col gap-4">
              <span className="inline-block bg-emerald-50 text-primary border border-emerald-100 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider self-start">
                Our Team
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-dark tracking-tight leading-tight">
                Leadership & Expertise You Can Trust
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Our specialized team combines decades of clean energy experience, engineering excellence, and customer focus to deliver world-class sustainable power systems.
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => scroll("left")}
                  className="w-12 h-12 rounded-full border border-gray-200 hover:border-primary bg-white hover:bg-primary text-dark hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm cursor-pointer"
                  aria-label="Previous Team Member"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-12 h-12 rounded-full border border-gray-200 hover:border-primary bg-white hover:bg-primary text-dark hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm cursor-pointer"
                  aria-label="Next Team Member"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="lg:w-2/3 relative">
              <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {teamMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="min-w-[270px] sm:min-w-[300px] max-w-[300px] bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 snap-start flex-shrink-0 group"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <a href="#" className="w-10 h-10 rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow" aria-label="LinkedIn">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow" aria-label="Twitter">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow" aria-label="Mail">
                          <Mail size={16} />
                        </a>
                      </div>
                    </div>

                    <div className="p-6 text-center">
                      <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-gray-400 mt-1">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
