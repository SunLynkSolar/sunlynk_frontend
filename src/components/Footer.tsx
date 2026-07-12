"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Clock, Phone, Send } from "lucide-react";

const SolarGridBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Deep gradient background base overlay */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Solar Grid Pattern SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Octagonal Clip Path for the Monocrystalline Solar Cell */}
          <clipPath id="solar-cell-clip">
            <path d="M 14,2 L 106,2 L 118,14 L 118,106 L 106,118 L 14,118 L 2,106 L 2,14 Z" />
          </clipPath>

          {/* Deep blue silicon wafer gradient representing light reflection */}
          <linearGradient id="silicon-wafer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b172a" />
            <stop offset="50%" stopColor="#070e1b" />
            <stop offset="100%" stopColor="#020612" />
          </linearGradient>

          {/* Repeating Cell Pattern (120x120px grid layout) */}
          <pattern id="solar-grid-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* The Solar Cell backing and frame */}
            <path
              d="M 14,2 L 106,2 L 118,14 L 118,106 L 106,118 L 14,118 L 2,106 L 2,14 Z"
              fill="url(#silicon-wafer)"
              stroke="#1e293b"
              strokeWidth={1.5}
            />

            {/* Cell electrical details clipped to the octagonal cell area */}
            <g clipPath="url(#solar-cell-clip)">
              {/* Fingers (fine horizontal lines) */}
              <path
                d="M 2,14 H 118 M 2,26 H 118 M 2,38 H 118 M 2,50 H 118 M 2,62 H 118 M 2,74 H 118 M 2,86 H 118 M 2,98 H 118 M 2,110 H 118"
                stroke="#38bdf8"
                strokeWidth={0.5}
                opacity={0.25}
              />

              {/* Busbars (three main vertical conductors) */}
              <path
                d="M 30,2 V 118 M 60,2 V 118 M 96,2 V 118"
                stroke="#94a3b8"
                strokeWidth={1.5}
                opacity={0.4}
              />

              {/* Shading/grain lines for realistic silicon crystal appearance */}
              <path
                d="M 2,2 L 118,118 M -50,50 L 50,150 M 50,-50 L 150,50"
                stroke="#10b981"
                strokeWidth={0.3}
                opacity={0.06}
              />
            </g>

            {/* Vertical interconnect ribbons between cell columns */}
            <path
              d="M 0,0 V 120 M 120,0 V 120"
              stroke="#334155"
              strokeWidth={1}
              opacity={0.2}
            />

            {/* Glowing intersection diamond markers representing green energy conversion */}
            <path
              d="M 120,0 L 118,0 L 120,2 Z M 0,0 L 2,0 L 0,2 Z M 0,120 L 2,120 L 0,118 Z M 120,120 L 118,120 L 120,118 Z"
              fill="#6CB327"
              opacity={0.25}
            />
          </pattern>
        </defs>

        {/* Draw repeating pattern across the entire area */}
        <rect width="100%" height="100%" fill="url(#solar-grid-pattern)" />
      </svg>

      {/* Diagonal solar sweeping glare sheen effect */}
      <div className="absolute inset-0 solar-sweep-bg animate-solar-sweep opacity-40 mix-blend-screen pointer-events-none" />

      {/* Top and bottom blending gradients to ease transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-950 via-slate-950/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </div>
  );
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <footer className="relative bg-slate-950 text-gray-300 overflow-hidden">
      {/* Solar Panel Grid Background */}
      <SolarGridBackground />

      {/* Top Footer: Contact Cards */}
      <div className="relative border-b border-slate-900 py-12 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo / Title */}
          <div className="flex items-center justify-start">
            <Link href="/" className="inline-block bg-white p-3 rounded-md">
              <Image
                src="/new_assets/logo.png"
                width={150}
                height={45}
                alt="SunLynkLogo"
                className="object-contain"
              />
            </Link>
          </div>

          {/* Email Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold">Send Email</span>
              <a href="mailto:info@sunlynksolar.com" className="hover:text-primary transition-colors font-medium">
                info@sunlynksolar.com
              </a>
            </div>
          </div>

          {/* Phone Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold">Call Us</span>
              <a href="tel:+918573003001" className="hover:text-primary transition-colors font-medium">
                +91 8573003001
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Footer: Links & Widgets */}
      <div className="relative py-16 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About widget */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
              About <span className="text-primary font-extrabold">SunLynk Solar</span>
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 text-justify">
              At SunLynk Solar, our mission is simple – We help homeowners, housing societies, and businesses in Uttar Pradesh switch to reliable rooftop solar with subsidy, financing, installation, and lifetime support. </p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/sunlynksolar?mibextid=wwXIfr&mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-900 border border-slate-800 hover:border-primary hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 text-gray-400" aria-label="Facebook">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-900 border border-slate-800 hover:border-primary hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 text-gray-400" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a> */}
              <a href="https://www.instagram.com/SunlynkIndia" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-900 border border-slate-800 hover:border-primary hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 text-gray-400" aria-label="Instagram">
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-900 border border-slate-800 hover:border-primary hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 text-gray-400" aria-label="Youtube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a> */}
              <a href="https://www.linkedin.com/company/sunlynk-solar-energy-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-900 border border-slate-800 hover:border-[#0077B5] hover:bg-[#0077B5] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 text-gray-400" aria-label="LinkedIn">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Our Offerings links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">
              Our <span className="text-primary font-extrabold">Offerings</span>
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/solutions/homes" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> Homes
                </Link>
              </li>
              <li>
                <Link href="/solutions/commercial" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> Commercial
                </Link>
              </li>
              <li>
                <Link href="/solutions/housing-societies" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> Housing Societies
                </Link>
              </li>
              <li>
                <Link href="/solutions/on-grid-solar" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> On Grid Solar
                </Link>
              </li>
              <li>
                <Link href="/solutions/hybrid-solar" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> Hybrid Solar
                </Link>
              </li>
            </ul>
          </div>

          {/* More & Support links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">
              More <span className="text-primary font-extrabold">& Support</span>
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/support/warranty" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> Warranty Claims
                </Link>
              </li>
              {/* <li>
                <Link href="/support/wms-downloads" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> WMS Products
                </Link>
              </li> */}
              {/* <li>
                <Link href="/support/inverter-downloads" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> Inverters & Panels
                </Link>
              </li> */}
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> Careers
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> FAQs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> News & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> Contact Us
                </Link>
              </li>
              {/* <li>
                <Link href="/brands" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>•</span> Our Brands
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Newsletter widget */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">
              Get <span className="text-primary font-extrabold">Notification</span>
            </h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Get notifications about our latest news and product updates. Enter your email below:
            </p>
            <form onSubmit={handleSubscribe} className="relative flex flex-col gap-2">
              <div className="relative">
                {/* <input 
                  type="email" 
                  placeholder="Your Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-md py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-primary transition-all duration-300"
                /> */}
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              {submitted && (
                <span className="text-xs text-primary font-semibold animate-pulse">
                  Subscribed successfully!
                </span>
              )}
            </form>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <Clock size={14} className="text-primary" />
              <span>Mon-Sat: 9am – 6:30pm (Sunday Closed)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Copyright */}
      <div className="bg-black py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center text-xs text-gray-500 flex-col sm:flex-row gap-4">
          <p>© Copyright {new Date().getFullYear()} by SunLynk Solar. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <span className="text-gray-700">·</span>
            <Link href="/terms" className="hover:text-gray-400">Terms of Use</Link>
            <span className="text-gray-700">·</span>
            <Link href="/cancellation-refund" className="hover:text-gray-400">Cancellation & Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
