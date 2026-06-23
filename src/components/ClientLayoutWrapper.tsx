"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageCircle, Phone, Mail, X } from "lucide-react";
import PopupForm from "@/components/PopupForm";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminOrLogin =
    pathname === "/admin" ||
    pathname === "/login" ||
    pathname?.startsWith("/admin/") ||
    pathname?.startsWith("/login/");

  const [isOpen, setIsOpen] = useState(false);

  if (isAdminOrLogin) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <PopupForm />
      <Footer />

      {/* Floating Connect Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {/* Expandable Contact Sub-buttons */}
        <div
          className={`flex flex-col items-center gap-3 transition-all duration-300 origin-bottom ${isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-75 translate-y-4 pointer-events-none"
            }`}
        >
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/918573003001?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20free%20Solar%20Consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label="Chat on WhatsApp"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.758.459 3.474 1.33 4.984L2 22l5.195-1.363c1.458.796 3.09 1.217 4.757 1.217h.005c5.501 0 9.983-4.481 9.983-9.988 0-2.67-1.039-5.18-2.926-7.067C17.147 2.92 14.654 2 12.012 2zm6.012 14.36c-.263.743-1.289 1.352-1.776 1.41-.487.058-1.096.096-1.782-.125-.41-.132-.933-.298-1.587-.58-2.783-1.201-4.577-4.043-4.717-4.229-.139-.185-1.127-1.498-1.127-2.859 0-1.36.709-2.029.96-2.3.251-.27.553-.339.739-.339h.525c.168 0 .385-.064.602.457.222.533.76 1.848.827 1.983.067.135.112.293.023.473-.09.18-.135.293-.27.451-.135.158-.283.353-.404.473-.135.135-.277.283-.12.553.158.27.702 1.157 1.503 1.872.8 1.157 1.474 1.517 1.777 1.677.303.16.482.135.663-.073.18-.208.777-.905.986-1.214.208-.309.416-.259.699-.153.283.107 1.796.848 2.106 1.004.31.156.517.234.593.364.077.13.077.754-.186 1.497z" />
            </svg>
            <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              WhatsApp Us
            </span>
          </a>

          {/* Phone Button */}
          <a
            href="tel:8573003001"
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label="Call 8573003001"
          >
            <Phone size={20} />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Call 8573003001
            </span>
          </a>

          {/* Email Button */}
          <a
            href="mailto:info@sunlynksolar.com"
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label="Email info@sunlynksolar.com"
          >
            <Mail size={20} />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Email Us : info@sunlynksolar.com
            </span>
          </a>
        </div>

        {/* Main Floating Action Button Container */}
        <div className="relative">
          {/* "Connect Now" label that hides when isOpen is true */}
          <span
            className={`absolute right-16 top-1/2 -translate-y-1/2 bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg pointer-events-none whitespace-nowrap transition-all duration-300 border border-emerald-700/50 flex items-center gap-1.5 ${
              isOpen
                ? "opacity-0 scale-75 translate-x-4 pointer-events-none"
                : "opacity-100 scale-100 translate-x-0"
            }`}
          >
            Connect Now
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            <div className="absolute top-1/2 -translate-y-1/2 left-full border-4 border-transparent border-l-emerald-800" />
          </span>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-800 text-white shadow-xl hover:bg-emerald-950 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
            aria-label="Contact Options Menu"
          >
            {/* Icon transition */}
            {isOpen ? (
              <X size={24} className="rotate-0 transition-transform duration-300" />
            ) : (
              <div className="flex items-center justify-center relative">
                <MessageCircle size={24} className="scale-100 transition-transform duration-300" />
                <span className="absolute text-[9px] font-black text-emerald-800 bg-white w-3.5 h-3.5 rounded-full flex items-center justify-center -top-1 -right-1 border border-emerald-800/10 shadow-sm">
                  i
                </span>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
